# GTech Digital — Website Redesign

Enterprise repositioning and full redesign of [gtechdigital.co.uk](https://www.gtechdigital.co.uk/).

The goal is to elevate the site from an SME web-and-marketing presentation to an
enterprise-level digital marketing agency, keeping the homepage hero structure and brand
continuity intact while redesigning everything else.

## Status

| Phase | Deliverable | Status |
|---|---|---|
| **1 — Audit & Strategy** | [`site-audit-and-concept.md`](./site-audit-and-concept.md) | ✅ Complete — awaiting approval |
| **2 — HTML/CSS Prototypes** | `/prototype` — index, services, service-single, portfolio, pricing | ⏳ Blocked on Phase 1 approval |
| **3 — Next.js Migration** | React application with reusable components and dynamic routing | ⏳ Blocked on Phase 2 approval |

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
