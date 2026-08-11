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

The page uses the client's own assets from `gtechdigital.co.uk`, referenced by absolute
URL:

| Asset | Used for |
|---|---|
| `logo.png` | Header and mobile drawer |
| `background-index-page.webp` | Hero background |
| `google-logo.webp` | Google Partner badge |
| `meta-logo.webp` | Meta Business Partner badge — **URL is a guess, see below** |
| `Digital-Marketing.webp` | Digital Marketing service panel |
| `Web-Development.webp` | Web Development panel + mega-menu |
| `Software-Development.webp` | Custom Software panel |
| `App-Development.webp` | Mobile App panel |

**They are hot-linked, not downloaded.** This build environment's proxy denies all
outbound hosts, so the files cannot be pulled into the repo here — but they load
normally in any browser. **Before production, serve them locally from
`assets/img/`** rather than cross-origin: hot-linking adds a third-party DNS lookup and
connection to the critical path, and breaks if the source path ever changes.

**The Meta badge URL is unverified.** The brief supplied the Google URL twice, once
labelled as Meta, so `meta-logo.webp` is inferred from the naming convention. Both
badges carry an `onerror` fallback to an inline SVG mark, so a wrong URL degrades to a
tidy fallback instead of a broken image. Confirm the real filename.

Service artwork is rendered with `object-fit: contain` on a tinted panel, because the
intrinsic ratios are unknown and `cover` would crop the illustrations.

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
