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

## Supplying the real media

Every image region on the homepage is a labelled placeholder that names the exact asset
belonging there, at a fixed aspect ratio. To swap in a real file:

1. Drop the image into `prototype/assets/img/`.
2. Inside the `.media` element, add `<img src="assets/img/<file>" alt="…">`.
3. Delete the sibling `<div class="media__spec">…</div>`.

Aspect ratios are already set, so nothing reflows when the real image lands.

| Placeholder | Ratio | What it needs |
|---|---|---|
| `digital-marketing.jpg` | 3:2 | Campaign dashboard, GA4/Ads screenshot, or team working |
| `web-development.jpg` | 3:2 | A real site you built, desktop + mobile |
| `custom-software.jpg` | 3:2 | A real interface you shipped — not stock code imagery |
| `mobile-app.jpg` | 3:2 | Real app screens in device frames |
| `client-portrait.jpg` | 4:5 | Headshot of the person quoted |
| `work-featured.jpg` | 4:3 | Featured project, shown in the Services mega-menu |

Client logos in the marquee are text placeholders — replace with real SVGs (permission
required from each client).

## Constraints

- **Typography:** Poppins across all pages
- **Hero:** the homepage hero structure and concept are preserved unchanged
- **Everything else:** redesigned with modern, high-converting layout principles and
  semantic HTML5

## Repository layout

```
site-audit-and-concept.md   Phase 1 audit and concept document
prototype/                  Phase 2 HTML/CSS prototypes (not yet created)
  assets/css/               Shared design system + per-page styles
  assets/js/                Vanilla JS (calculator, filters, carousels)
  assets/img/
/                           Reserved for the Phase 3 Next.js application
```

## Note on the Phase 1 audit

The live site could not be crawled from the analysis environment — outbound HTTP is
blocked by the network egress proxy. The audit was built from the supplied full-page
homepage screenshot and search-engine-indexed content, and every claim is marked
`[Verified]`, `[Inferred]`, or `[Unverified]`. Section 11 lists everything that needs
live access to confirm.
