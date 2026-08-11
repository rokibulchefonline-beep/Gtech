# GTech Digital — Website Redesign

Enterprise repositioning and full redesign of [gtechdigital.co.uk](https://www.gtechdigital.co.uk/).

The goal is to elevate the site from an SME web-and-marketing presentation to an
enterprise-level digital marketing agency, keeping the homepage hero structure and brand
continuity intact while redesigning everything else.

## Status

| Phase | Deliverable | Status |
|---|---|---|
| **1 — Audit & Strategy** | [`site-audit-and-concept.md`](./site-audit-and-concept.md) | ✅ Complete |
| **2 — HTML/CSS Prototypes** | `/prototype` — index, services, service-single, portfolio, pricing | 🟡 In progress — **homepage built**, four pages remain |
| **3 — Next.js Migration** | React application with reusable components and dynamic routing | ⏳ Blocked on Phase 2 approval |

### Phase 2 progress

| Page | File | Status |
|---|---|---|
| Design system | `prototype/assets/css/design-system.css` | ✅ Built |
| Homepage | `prototype/index.html` | ✅ Built |
| Services overview | `prototype/services.html` | ⏳ Not started |
| Single service | `prototype/service-single.html` | ⏳ Not started |
| Portfolio / case studies | `prototype/portfolio.html` | ⏳ Not started |
| Pricing | `prototype/pricing.html` | ⏳ Not started |

Open `prototype/index.html` directly in a browser — no build step, no server needed.

**All metrics, client names, logos and testimonials in the prototype are placeholder
data**, marked by a banner at the top of the page. They demonstrate the layout and
content model. Replace with real, approved client data before production.

## Imagery

**No images could be downloaded.** The sandbox network proxy denies every outbound
host — the live site, Unsplash, Picsum and Pixabay all return 403 at CONNECT, verified
repeatedly. Stock photography and the existing site assets are therefore unavailable in
this environment.

Instead, `prototype/assets/img/` contains purpose-built SVG mockups. They are real,
swappable assets, not grey placeholders:

| File | Used for | Depicts |
|---|---|---|
| `digital-marketing.svg` | Digital Marketing panel | Campaign dashboard: impressions, conversions, CPA, channel split |
| `web-development.svg` | Web Development panel, mega-menu | Responsive site on desktop and mobile |
| `custom-software.svg` | Custom Software panel | System architecture: core platform + integrations |
| `mobile-app.svg` | Mobile App panel | App screens in device frames with store badges |

To swap in a photograph, replace the `src` with your file at the same aspect ratio
(3:2 for the service panels). Ratios are fixed in CSS, so nothing reflows.

**To get real imagery in:** either commit photographs to `prototype/assets/img/`, or add
`gtechdigital.co.uk` to the environment's network policy and I can pull the live assets
directly.

## Homepage features

- **Services** — indexed accordion, one row per service with icon, expanding to that
  service's copy and image. Replaces the four cards plus four repeated bullet blocks.
- **Testimonial slider** — six testimonials, one visible at a time, with prev/next,
  dots, keyboard arrows and touch swipe. Each carries a service tag with an icon.
  Without JS the slides stack and all stay readable.
- **Enquiry form** — name, company, email, phone, a grouped service dropdown
  (12 options across Digital Marketing / Build / Other), budget selection as chips
  (six bands), and an optional message.
- **Figures band** — animated counters that degrade to the correct static numbers if
  JavaScript never runs.

The ROI calculator was removed at the client's request.
