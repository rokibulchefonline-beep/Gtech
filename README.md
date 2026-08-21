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

## Homepage sections

Fourteen sections, structured after the reference UI and populated with GTech's own
content:

| # | Section | Ground | Pattern |
|---|---|---|---|
| 1 | Hero | Gradient | Preserved from the live site |
| 2 | Proof band | Dark | Figures + client logos, merged |
| 3 | Ticker | Dark | Scrolling capability strip |
| 4 | Services | Paper | Accordion with sub-service chips |
| 5 | Who We Are | White | Bento stat grid |
| 6 | Industries We Serve | Dark | Six sector cards |
| 7 | Success Stories | Paper | Three project cards |
| 8 | Solutions | White | Tabs (Startups / SMEs / Enterprise) over pastel cards |
| 9 | Why Partner | Paper-deep | Numbered connected flow |
| 10 | Technologies | Dark | Platform grid |
| 11 | Testimonials | White | Six-slide carousel |
| 12 | Capabilities + CTA band | Paper | Chip cloud, mid-page CTA |
| 13 | Blog | White | Three post cards |
| 14 | Contact | Dark | Enquiry form with service + budget selection |
| 15 | FAQ | Paper | Six-question accordion |

Interactive: service accordion, testimonial slider, solution tabs (arrow-key
navigable), FAQ accordion, animated counters, mega-menu, mobile drawer, sticky mobile
CTA. All degrade to readable static content without JavaScript.

## Content still needed

Sections 6, 7, 8, 10, 13 and 15 use **placeholder copy** written to demonstrate the
layout. Replace before launch:

- Success story results and client names
- Blog posts (pull from the existing `/blog`)
- FAQ answers, particularly pricing
- Technology marks (simplified paths, pending official assets)
- The £12.4M and 200+ figures, both labelled `(placeholder)` on the page
