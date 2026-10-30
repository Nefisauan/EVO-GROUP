import { NextRequest, NextResponse } from "next/server";
import { validateInquiry } from "@/lib/contact-validation.mjs";
export const runtime = "nodejs";
export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (origin) {
    let permitted = false;
    try {
      const parsed = new URL(origin);
      permitted =
        parsed.host === host && ["http:", "https:"].includes(parsed.protocol);
      if (process.env.NEXT_PUBLIC_SITE_URL)
        permitted =
          permitted ||
          parsed.origin === new URL(process.env.NEXT_PUBLIC_SITE_URL).origin;
    } catch {
      permitted = false;
    }
    if (!permitted)
      return NextResponse.json(
        { error: "This submission origin is not permitted." },
        { status: 403 },
      );
  }
  if (Number(request.headers.get("content-length") || 0) > 24000)
    return NextResponse.json(
      { error: "This inquiry is too large." },
      { status: 413 },
    );
  let body;
  try {
    const raw = await request.text();
    if (raw.length > 24000)
      return NextResponse.json(
        { error: "This inquiry is too large." },
        { status: 413 },
      );
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json(
      { error: "Invalid form submission." },
      { status: 400 },
    );
  }
  const result = validateInquiry(body);
  if (result.error)
    return NextResponse.json({ error: result.error }, { status: 400 });
  const endpoint = process.env.CONTACT_WEBHOOK_URL;
  if (!endpoint)
    return NextResponse.json(
      {
        error:
          "Inquiry delivery is not configured yet. Your message has not been sent. Please return when EVO Group has enabled contact delivery.",
      },
      { status: 503 },
    );
  try {
    const url = new URL(endpoint);
    if (url.protocol !== "https:") throw new Error("HTTPS required");
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.CONTACT_WEBHOOK_SECRET
          ? { Authorization: `Bearer ${process.env.CONTACT_WEBHOOK_SECRET}` }
          : {}),
      },
      body: JSON.stringify({
        source: "evo-group-website",
        ...result.data,
        consentAt: new Date().toISOString(),
      }),
      signal: AbortSignal.timeout(10000),
      redirect: "error",
    });
    if (!response.ok) throw new Error("Delivery failed");
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      {
        error:
          "We couldn’t deliver your inquiry. Please try again later. Your message has not been confirmed.",
      },
      { status: 502 },
    );
  }
}
