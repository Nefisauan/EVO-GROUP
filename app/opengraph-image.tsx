export const dynamic = "force-static";
import { ImageResponse } from "next/og";
export const runtime = "nodejs";
export const alt = "EVO Group — The Next Evolution of Business";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 70,
        background: "linear-gradient(120deg,#080c12,#142844)",
        color: "#f5f7fa",
      }}
    >
      <div style={{ display: "flex", fontSize: 34, letterSpacing: 8 }}>
        EVO GROUP
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 88,
          lineHeight: 1.05,
          letterSpacing: -5,
        }}
      >
        The next evolution
        <br />
        of business.
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 18,
          color: "#a5b1c2",
          letterSpacing: 4,
        }}
      >
        STRATEGY. INTELLIGENCE. EVOLUTION.
      </div>
    </div>,
    size,
  );
}
