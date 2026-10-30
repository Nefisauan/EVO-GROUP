# EVO Group

A custom, responsive Next.js / TypeScript website built directly in this repository. Real-time Three.js geometry forms a metallic evolution sculpture; pointer movement and scroll influence the composition. No stock 3D models or external environment assets are required.

## Run

```sh
npm install
npm run dev
```

Open http://localhost:3000. Production: `npm run build` then `npm start`.

## Configure before launch

Copy `.env.example` to `.env.local` and set:

- `NEXT_PUBLIC_SITE_URL`: actual canonical HTTPS domain, used for SEO and sitemap.
- `CONTACT_WEBHOOK_URL`: HTTPS form provider / CRM webhook that returns 2xx only after accepting the inquiry.
- `CONTACT_WEBHOOK_SECRET`: optional server-only bearer token.
- `NEXT_PUBLIC_BOOKING_URL`: optional Calendly or equivalent URL. The inquiry form is always available.

The contact route validates input, checks same-origin submissions, enforces payload limits, uses a honeypot and minimum completion time, and times out upstream delivery. It returns a visible error when configuration is absent or delivery fails. It does not save inquiries locally or log their contents. Configure provider or hosting rate limits and abuse protection before public launch; the lightweight form checks are not a substitute for infrastructure-level protection.

No email, address, founder credentials, client claims, or social profiles have been invented. Complete the authentic founder biography, LinkedIn URL, and legal policies before public launch. Privacy and terms pages are clearly marked templates requiring review.

## Edit content

- `lib/content.ts`: services, process stages, department examples, and three labeled insight drafts.
- `app/[page]/page.tsx`: supporting pages, founder section, and legal templates.
- `components/home.tsx`: homepage narrative and interactive diagrams.
- `components/evolution-scene.tsx`: procedural WebGL sculpture with static fallback.
- `app/globals.css`: reusable brand tokens, typography, responsive layouts, and motion preferences.
- `components/site.tsx`: architectural wordmark, navigation, shared CTA, footer.

The CSS wordmark works in monochrome and at small sizes; `public/icon.svg` provides a compact brand avatar. The palette and spacing tokens live at the top of the stylesheet.

## Analytics

No external analytics or cookies are enabled. On confirmed form delivery, the client dispatches an `evo:conversion` CustomEvent with `{ type: 'inquiry_submitted' }`. Integrate an approved analytics provider using this event without transmitting form content. Booking links can be tracked through an approved provider when configured. Update privacy disclosures as needed.

## Quality checks

```sh
npm test
npm run typecheck
npm run build
```

Reduced-motion visitors receive a stationary sculpture and no scroll/hover animation. Devices without WebGL receive a CSS sculpture fallback. The 3D scene is client-loaded, uses procedural lighting, and caps pixel ratio. Keyboard-accessible process tabs, department controls, mobile navigation, skip link, and form status messages are included.
