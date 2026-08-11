# GTech Digital — Site Audit & Overall Concept Document

**Project:** Enterprise repositioning and full site redesign
**Current site:** https://www.gtechdigital.co.uk/
**Phase:** 1 of 3 — Site Audit & Strategy
**Date:** 11 August 2026
**Status:** For review and approval before Phase 2 (HTML prototyping) begins

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Methodology & Evidence Base](#2-methodology--evidence-base)
3. [Current Sitemap & Information Architecture](#3-current-sitemap--information-architecture)
4. [Homepage Section-by-Section Content Audit](#4-homepage-section-by-section-content-audit)
5. [Cross-Site Issues](#5-cross-site-issues)
6. [Enterprise-Readiness Gap Analysis](#6-enterprise-readiness-gap-analysis)
7. [Recommended Target Information Architecture](#7-recommended-target-information-architecture)
8. [New Enterprise Sections — Specification](#8-new-enterprise-sections--specification)
9. [Design System Direction](#9-design-system-direction)
10. [Page-by-Page Briefs for Phase 2](#10-page-by-page-briefs-for-phase-2)
11. [Known Limitations & Follow-Ups](#11-known-limitations--follow-ups)
12. [Appendix](#12-appendix)

---

## 1. Executive Summary

GTech Digital is a UK digital marketing agency holding two credentials that most of its
competitors do not have: **verified Google Partner** and **Meta Business Partner** status.
It offers a genuinely broad service range — SEO, Google Ads, Meta Ads, TikTok Ads, social
media marketing, web development, mobile app development, and custom software — and has
been building websites since 2014.

The website does not reflect any of that. It currently presents as a capable SME web-and-
marketing shop: a services list, a bulleted feature rundown per service, a short "why us"
block, one testimonial, and a footer. It tells visitors **what GTech does**. It does not
tell them **what happens to a business that hires GTech**.

That distinction is the entire gap between an SME site and an enterprise agency site. An
enterprise buyer — a marketing director with a six-figure budget and a procurement process
— arrives asking a different set of questions than an SME owner. They want to know: who
else like me have you done this for, what numbers did you move, what is your methodology,
who is on my account team, what does this cost, and how do you handle data and compliance.
The current site answers none of these.

### Top five recommendations, ranked by impact against effort

| # | Recommendation | Impact | Effort | Why it matters |
|---|---|---|---|---|
| 1 | **Replace the four bullet-list service blocks with outcome-led sections carrying metrics, process, and proof** | Very High | Medium | This is ~60% of the homepage's vertical space and currently its weakest content. Roughly 30 undifferentiated bullets, zero numbers, zero proof. |
| 2 | **Build a real case-studies system with quantified results** | Very High | High | The single biggest credibility gap. Enterprise buyers shortlist on evidence, and there is currently none on the site. |
| 3 | **Add pricing transparency with multi-tier packaging** | High | Medium | The current packages page describes two options qualitatively ("cost-effective" vs "expensive") with no figures. Enterprise buyers self-qualify on budget before they ever make contact. |
| 4 | **Restructure the IA around a `/services` hub with normalised child URLs, plus 301 redirects** | High | Low | Fixes inconsistent URL taxonomy, a footer link pointing at a page that does not exist, and consolidates topical authority for SEO. |
| 5 | **Foreground the Google Partner and Meta Business Partner credentials throughout, not just in the hero** | High | Low | The strongest trust assets GTech owns are currently used once and then abandoned. |

### The strategic reframe

Everything in this document points at one repositioning:

> **From:** "We provide digital marketing services."
> **To:** "We are the accountable growth partner for ambitious UK businesses — here is
> the proof, here is the method, and here is what it costs."

Same services. Same brand. Fundamentally different posture.

---

## 2. Methodology & Evidence Base

### An important constraint, stated plainly

**The live site could not be crawled during this audit.** The analysis environment's
network egress proxy refuses all outbound HTTP connections at the CONNECT stage with a
403 — this affects `gtechdigital.co.uk`, third-party fetch proxies, and unrelated control
domains such as `example.com` equally. It is an environment policy, not a problem with
the GTech site.

The audit therefore proceeds from indirect evidence. This section exists so that no
reader mistakes an inference for a verified fact.

### Sources used

| Source | What it provided |
|---|---|
| **Full-page homepage screenshot** (supplied in the project brief) | Complete homepage section structure, navigation, footer, headings, body copy, visual treatment |
| **Search-engine index** (page URLs, `<title>` tags, meta descriptions, indexed body snippets) | Page inventory, page titles, service descriptions, positioning language |
| **Third-party business listings and press coverage** | Company history, contact details, credential claims, service scope |

### Confidence levels used throughout this document

Every substantive claim in this audit carries one of three confidence levels. Where a
claim is not marked, it is a recommendation rather than an observation.

| Marker | Meaning |
|---|---|
| **[Verified]** | Directly visible in the screenshot or in indexed page metadata. High confidence. |
| **[Inferred]** | Reasoned from indexed snippets or partial evidence. Likely accurate but should be spot-checked. |
| **[Unverified]** | Could not be assessed at all without live markup. Listed in §11 with a method for closing the gap. |

### What this audit can and cannot tell you

**Fully assessable:** site structure and IA, page inventory, homepage content and layout,
positioning and messaging, conversion architecture, competitive posture, title-tag
quality, URL taxonomy, and every strategic recommendation in §6–§10.

**Not assessable without live access:** Core Web Vitals and page speed, schema.org
structured data, canonical tags, `robots.txt` and XML sitemap contents, image alt text and
file weights, semantic heading hierarchy, actual mobile rendering, accessibility
conformance, form behaviour, and analytics configuration.

The strategy in this document does not depend on the unverified items. Those are
technical-remediation findings that can be gathered in an hour once the domain is
reachable — and Phase 2 will build to modern standards regardless of what the current
site scores.

**To close the gap:** either allowlist `gtechdigital.co.uk` in the environment's network
policy, or export the site's HTML into this repository. Either unblocks a full technical
SEO and accessibility pass. See §11.

---

## 3. Current Sitemap & Information Architecture

### 3.1 Discovered pages

| URL | Page | Indexed `<title>` | Evidence |
|---|---|---|---|
| `/` | Homepage | Best Digital Marketing Agency in the UK \| GTech Digital | **[Verified]** |
| `/about-us` | About Us | About Us - Contact Us \| GTech Digital | **[Verified]** |
| `/digital-marketing` | Digital Marketing | Looking for a Digital Marketing & SEO hand? - GTech Digital | **[Verified]** |
| `/web-development` | Web Design & Development | Web Design and Development Services in UK - GTech Digital | **[Verified]** |
| `/custom-software-development` | Custom Software Development | Custom Software Development in UK \| GTech Digital | **[Verified]** |
| `/mobile-app-development` | Mobile App Development | Mobile App Development UK \| Android & iOS Apps | **[Verified]** |
| `/service-social-media` | Social Media Marketing | Social Media Marketing service in UK \| GTech Digital | **[Verified]** |
| `/service-restaurant-seo` | Restaurant SEO | Restaurant SEO & Digital Marketing Service - GTech Digital | **[Verified]** |
| `/packages-and-pricing` | SEO Packages | Affordable SEO Packages in UK \| GTech Digital | **[Verified]** |
| `/portfolio` | Portfolio | Global Tech Digital \| Portfolio - Gtech | **[Verified]** |
| `/contact` | Contact | Contact GTech Digital \| Digital Marketing Agency UK | **[Verified]** |
| `/faq` | FAQ | Contact Us \| GTech Digital | **[Verified]** |
| `/blog` | Blog | — | **[Inferred]** — present in header nav; no individual posts surfaced in the index |
| *(unknown)* | Privacy Policy | — | **[Verified]** in footer; URL not captured |
| *(unknown)* | How do we use cookies? | — | **[Verified]** in footer; URL not captured |
| `test.gtechdigital.co.uk` | **Publicly indexed staging mirror** | GTech \| Digital Marketing Agency in the UK \| SEO,WebApp & SMM | **[Verified]** — see §5.3 |

**Approximate site size: 13–15 pages.** Small for an agency positioning at enterprise
level — competitors at that tier typically run 40–80+ pages across services, sectors,
case studies, and a resource library.

### 3.2 Header navigation **[Verified — screenshot]**

```
[GTech logo]   Home   Services ▾   Seo Packages   Portfolio   Blog   Contact Us   [BOOK INTRO CALL]
```

Structurally sound: six items plus one prominent CTA is a sensible primary nav, and
having a distinct visual treatment on "Book Intro Call" is correct practice.

Problems:

- **"Services ▾" has no landing page.** It is a dropdown only. There is no `/services`
  hub URL, which costs a significant SEO opportunity (the highest-commercial-intent page
  an agency can own) and forces every visitor to pick a specific service before they can
  see the range.
- **"Seo Packages" capitalisation is wrong** — should be "SEO Packages". A small detail,
  but on a site selling SEO expertise it is a poor look.
- **The nav label and the URL disagree**: "Seo Packages" points at
  `/packages-and-pricing`.
- **No "About" in the primary nav.** `/about-us` exists but is reachable only from the
  footer. For an enterprise buyer evaluating who they would be working with, the team and
  company story are decision-grade content, not footer content.

### 3.3 Footer **[Verified — screenshot]**

Four columns: **Social Media** (Facebook, Twitter/X, Instagram, Pinterest, LinkedIn),
**Newsletter Signup** (single email field), **Quick Links** (FAQ, About Us, Contact Us,
Blog, Services, How do we use cookies?, Privacy Policy), and a **Google Partner badge**.

Copyright line: `© 2026 Global Tech Digital. All Rights Reserved.`

Problems:

- **"Services" in Quick Links points to a page that does not exist** — this is either a
  broken link or a redirect to something unexpected. **[Inferred]**
- **The footer is doing almost no work.** On an enterprise site the footer is a serious
  navigational and trust surface: full service index, sector index, case studies, office
  addresses, company registration number, VAT number, accreditations, and legal links.
  This one carries five links and a newsletter box.
- **No physical address or company registration details.** For UK B2B credibility — and
  for local SEO — this is a real omission.
- **The newsletter signup has no value proposition.** "Enter your e-mail" with no
  statement of what the subscriber receives or how often converts very poorly.

### 3.4 Structural assessment

The current IA is a **flat service list**. It works if the visitor already knows which
service they want. It fails for the enterprise buyer, who typically arrives with a
*business problem* ("our lead volume is flat", "we are launching in a new region"), not a
*service name*, and who needs to see sector relevance and evidence before service detail.

There is also **no content depth anywhere**: no resources, no guides, no insights, no
research. Enterprise buyers spend months in a research phase before they contact anyone.
A site with nothing to read during that phase is invisible for most of the buying cycle.

---

## 4. Homepage Section-by-Section Content Audit

Working top to bottom through the supplied full-page screenshot. **[Verified]** unless
otherwise marked.

### 4.1 Header / Navigation

**Current:** Logo left, six nav items centre, red "BOOK INTRO CALL" pill right.

**Works:** Clean, uncluttered, correct CTA prominence. "Book Intro Call" is well-chosen —
low-commitment and specific, much better than a generic "Contact Us".

**Fails at enterprise level:** No phone number in the header despite two numbers existing
on the site. No secondary CTA for visitors not ready to book. The mega-menu opportunity is
unused — an enterprise services dropdown should show the full service architecture with
descriptions, not a plain link list. **[Inferred]** — the dropdown contents were not
visible in the screenshot.

---

### 4.2 Hero Section — **STRUCTURE PRESERVED PER BRIEF**

**Current:** Deep blue gradient with a subtle circuit-pattern background. Centred badge
pill reading "AUTHORIZED GOOGLE & META PARTNER". H1: *"Best Digital Marketing Agency for
Scalable Growth"* with "Scalable Growth" highlighted in cyan. Supporting paragraph.
Flanking credential cards — Google Partner (left), Meta Business Partner (right). Two
CTAs: "Our Services" (outline) and "Get Offer" (solid red).

**The brief specifies this section's structure and concept remain unchanged.** The
following are copy and labelling notes only — no layout changes are proposed.

**What works, and works well:** The dual-credential flanking layout is genuinely strong
and is the most distinctive thing on the site. The partner badges carry real weight. The
trust pill above the headline is good practice. Two-CTA structure is correct.

**Copy-level notes for consideration:**

- *"Best Digital Marketing Agency"* is an unsubstantiated superlative. Enterprise buyers
  discount these automatically, and under UK advertising guidance an unqualified "best"
  claim is difficult to defend. A specific, provable claim would carry far more weight.
- *"Get Offer"* is ambiguous. It is unclear what the visitor receives — a quote, a
  discount, a proposal? "Get Your Free Growth Audit" or similar states the value and sets
  expectations.
- The supporting paragraph runs long and repeats "more leads, more sales, more returning
  customers" — three near-synonyms where one specific outcome would land harder.
- **No numbers in the hero.** A single credibility stat ("£12M+ in tracked client revenue"
  or "200+ UK businesses") would strengthen it considerably without touching the layout.

---

### 4.3 "Services We Provide" — Four Cards

**Current:** Centred heading, a four-line paragraph of intro copy, then four equal cards
(Digital Marketing, Web Development, App Development, Software Development), each with a
small illustration, a title, and a "Read More →" link.

**Works:** Correct card count for scannability. Clear categorisation.

**Fails at enterprise level:**

- **The cards are empty.** Title plus icon plus "Read More" gives the visitor nothing to
  evaluate. Every card needs a one-line outcome statement, 3–4 sub-service tags, and
  ideally a proof point.
- **The intro paragraph is 60+ words of generic agency copy** — "help businesses grow,
  scale, and succeed online", "improve visibility, attract the right audience, and drive
  measurable results". Nothing here distinguishes GTech from any other agency. It should
  be one sharp sentence, or removed.
- **No hierarchy.** All four services are given identical weight. If digital marketing is
  the core revenue driver, the layout should say so.
- **No pricing or engagement signal.** Enterprise buyers want to know the shape of the
  engagement — retainer, project, or hybrid — before clicking through.
- **Weak CTA.** "Read More →" is passive. "See how we do it" or "View SEO results" is
  active and specific.

---

### 4.4–4.7 The Four Alternating Service Blocks

Four consecutive sections in the same alternating text/image pattern:

| # | Section | Layout | Bullets |
|---|---|---|---|
| 4.4 | Digital Marketing Services | Text left, megaphone illustration right | 8 |
| 4.5 | Web Design and Development | Monitor illustration left, text right | 6 |
| 4.6 | Custom Software Development | Text left, laptop/gears illustration right | 7 |
| 4.7 | Mobile App Development | Phone illustration left, text right | 7 |

Each: small heading, 2–3 line paragraph, a bulleted feature list, and a red "VIEW
DETAILS" button.

**This is the single biggest structural weakness on the homepage**, and it is treated as
one finding because the problem is identical across all four.

**What works:** Alternating layout gives visual rhythm. Illustrations are consistent in
style. Each block covers its service comprehensively.

**What fails:**

- **~28 bullets in a row.** Four consecutive sections with the same visual pattern and
  the same content type produce total scan fatigue. By the third block visitors stop
  reading entirely.
- **Every bullet is a feature, not an outcome.** "Google Ads campaigns for high-intent
  leads", "Technical SEO optimisation", "API integration and workflow automation" — these
  describe activity, not result. Enterprise buyers assume you can do the activity; they
  are buying the result.
- **Zero proof.** Across roughly 28 bullets and four service areas there is not one
  metric, client name, case study link, or piece of evidence.
- **No process.** How does an engagement actually run? What are the stages, the
  timelines, the deliverables, the reporting cadence? This is one of the first things an
  enterprise buyer looks for, and it is entirely absent.
- **No differentiation.** Every bullet listed here appears on hundreds of UK agency
  sites. Nothing states why GTech specifically.
- **The heading hierarchy is visually flat.** "Digital Marketing Services" is set at
  roughly the same weight as body copy, so the sections do not read as distinct
  destinations.
- **Text sits low-contrast on light grey backgrounds** in several blocks — a likely
  WCAG AA contrast failure. **[Inferred]** — needs measurement against live CSS values.

**Direction:** collapse the four blocks into a differentiated set. Lead with the flagship
service given full treatment (outcome headline, 3 key metrics, a numbered process map, a
mini case study, and a clear CTA), then present the remaining three as a compact
comparative grid. Trade ~28 bullets for perhaps 12 substantiated claims and three real
numbers.

---

### 4.8 "Why Partner with GTech Digital"

**Current:** Centred heading, a two-line intro, then five stacked full-width rows inside
a rounded container. Each row is a bold label followed by explanatory text: Trusted
Partnership, Local Expertise, Performance-Driven Solutions, Data-Driven Approach,
End-to-End Support.

**Works:** The five points are genuinely well chosen — they are the right differentiators
for this business, and the intro line *"You need growth; we provide the assist"* has more
personality than the rest of the page.

**Fails at enterprise level:**

- **The visual treatment buries strong content.** Five stacked text rows is the lowest-
  impact layout available. These are the site's best arguments and they read as fine
  print.
- **No icons, no numbers, no visual anchors.** Pure text at small size.
- **The claims are unsubstantiated.** "Data-Driven Approach" is asserted, not
  demonstrated. Show the reporting dashboard. "Local Expertise" — name the cities and
  sectors. "Trusted Partnership" — show the badges again, here.
- **Each row is too long to scan** and too short to be substantial.
- **No CTA closing the section.** The visitor has just read the five best reasons to hire
  GTech and is then given nowhere to go.

---

### 4.9 Client Testimonial

**Current:** "Testimonial" eyebrow, "Client Testimonial" heading, a red quote icon, a
sub-heading ("Top-Notch SEO Services"), the quote body, attribution as "Angela M" in a
red pill, and five carousel dots.

**Works:** The testimonial content itself is good — it opens with scepticism and resolves
to a result, which reads as authentic rather than manufactured.

**Fails at enterprise level:**

- **"Angela M" is not a usable attribution.** No surname, no job title, no company, no
  photo. For enterprise buyers, an anonymous testimonial carries close to zero weight —
  and can actively suggest the reviews are not real.
- **Still no numbers.** "Increased my organic traffic manifold" is vague where "increased
  organic traffic 340% in 7 months" would be persuasive.
- **One testimonial visible at a time**, requiring interaction to see the other four.
  Enterprise sites show social proof in volume — a wall or grid, not a single slot.
- **This is the only social proof on the entire homepage.** No client logos, no ratings,
  no review-platform integration, no case studies, no press.

---

### 4.10 Footer

Covered in §3.3.

---

### 4.11 What the homepage is missing entirely

Sections an enterprise agency homepage is expected to carry, none of which are present:

- Client logo wall
- Quantified results / statistics band
- Case studies or featured work
- Process or methodology overview
- Team or leadership visibility
- Sector and industry specialisation
- Pricing or engagement-model signal
- Certifications and compliance beyond the two partner badges
- Interactive tools (ROI calculator, audit tool, assessment)
- Content and thought leadership
- Awards or press mentions
- FAQ
- A meaningful final CTA section — the page currently ends on a testimonial and drops
  straight into the footer

---

## 5. Cross-Site Issues

### 5.1 Inconsistent URL taxonomy **[Verified]**

Service pages follow two incompatible patterns:

```
/service-social-media          <- "service-" prefix
/service-restaurant-seo        <- "service-" prefix
/web-development               <- no prefix
/mobile-app-development        <- no prefix
/custom-software-development   <- no prefix
/digital-marketing             <- no prefix
```

This suggests the site was built in stages without a URL convention. It fragments
topical authority, makes analytics segmentation awkward, and looks unconsidered to anyone
technical. **Fix:** normalise to `/services/<slug>` with 301 redirects from every current
URL (§7).

### 5.2 Title tag errors **[Verified]**

| URL | Current title | Problem |
|---|---|---|
| `/faq` | Contact Us \| GTech Digital | Completely wrong — this is the FAQ page, and it also holds substantial link-building content |
| `/about-us` | About Us - Contact Us \| GTech Digital | Two page names concatenated |
| `/portfolio` | Global Tech Digital \| Portfolio - Gtech | Uses "Global Tech Digital" and "Gtech" — neither matches the "GTech Digital" brand |

Wrong titles on `/faq` and `/about-us` mean those pages compete with `/contact` for the
same query intent and cannibalise each other. This is a same-day fix with real SEO value.

### 5.3 Publicly indexed staging environment — **HIGH PRIORITY** **[Verified]**

`test.gtechdigital.co.uk` is live, crawlable, and appearing in search results with the
title "GTech | Digital Marketing Agency in the UK | SEO,WebApp & SMM".

Risks: duplicate content competing with the production site; potential exposure of
unreleased work, test data, or client information; and a professional credibility problem
for an agency that sells technical SEO. Search visibility for a staging environment is
precisely the error GTech would be hired to fix for a client.

**Fix immediately, before any redesign work:** HTTP authentication on the subdomain,
`X-Robots-Tag: noindex, nofollow` on all responses, `Disallow: /` in its `robots.txt`, and
removal requests for the indexed URLs.

### 5.4 Brand naming inconsistency **[Verified]**

Three variants are in active use: **"GTech Digital"** (primary brand), **"Global Tech
Digital"** (footer copyright, portfolio title tag), and **"Gtech"** (portfolio title tag).

If "Global Tech Digital" is the registered legal entity, that is legitimate — but the
convention should be explicit: brand name everywhere in the interface, legal name confined
to the copyright line and legal pages.

### 5.5 Feature-led rather than outcome-led copy **[Verified]**

Consistent across every page examined. The site describes services; it does not describe
results. There is not a single quantified outcome anywhere in the content reviewed. This
is the through-line behind most other findings in this audit.

### 5.6 Trust assets are underused **[Verified]**

Google Partner and Meta Business Partner appear in the hero and the footer, and then
nowhere else. These are verifiable third-party credentials — meaningfully harder to obtain
than a self-declared claim — and they should appear on every service page, in the pricing
context, adjacent to CTAs, and in the footer's accreditation strip.

### 5.7 NAP inconsistency risk **[Inferred]**

Two phone numbers are in circulation: **0203 598 5956** and **0330 380 1000**. No physical
address was found in the footer. For a UK agency selling local SEO, inconsistent Name-
Address-Phone data across the site and directory listings is a direct local-ranking
liability. Establish one canonical set and apply it uniformly, including in
LocalBusiness structured data.

### 5.8 No services hub page **[Verified]**

The footer links "Services" and the nav has a "Services ▾" dropdown, but no `/services`
URL exists. This forfeits the single highest-commercial-intent page an agency site can
rank for, and leaves a probably-broken footer link in place.

### 5.9 Thin content depth **[Inferred]**

A blog exists in the navigation but no posts surfaced in the search index, suggesting it
is empty, near-empty, or not indexed. With 13–15 total pages the site has very little
surface area for organic acquisition — a serious limitation for an agency whose core
product is organic acquisition.

### 5.10 Technical SEO — **[Unverified]**

Structured data, canonicals, `robots.txt`, XML sitemap, hreflang, heading hierarchy,
image optimisation, and Core Web Vitals could not be assessed. See §11.

---

## 6. Enterprise-Readiness Gap Analysis

Scored across the dimensions an enterprise buyer evaluates during agency selection.
Severity indicates how much each gap costs in a competitive shortlist.

| Dimension | Current state | Enterprise benchmark | Gap |
|---|---|---|---|
| **Proof of outcomes** | No metrics anywhere on the site | Quantified results on every service page; case studies with before/after data | 🔴 **Critical** |
| **Case studies** | A `/portfolio` page exists; contents unknown **[Unverified]** | 8–15 detailed case studies, filterable by sector and service, each with challenge / approach / results | 🔴 **Critical** |
| **Social proof** | One testimonial, first-name attribution | Client logo wall, 10+ attributed testimonials, video case studies, third-party review ratings | 🔴 **Critical** |
| **Pricing transparency** | Two packages described qualitatively, no figures **[Inferred]** | Multi-tier pricing with real figures or clear "from £X" anchors, plus a custom enterprise tier | 🔴 **Critical** |
| **Process & methodology** | Not present | Named, documented framework with defined stages, deliverables, and timelines | 🔴 **Critical** |
| **Sector specialisation** | Restaurant SEO only | 5–8 sector pages with sector-specific proof and benchmarks | 🟠 **High** |
| **Team & credibility** | `/about-us` in footer only | Leadership profiles, team size, credentials, company history, offices | 🟠 **High** |
| **Thought leadership** | Blog appears empty **[Inferred]** | Regular insights, original research, downloadable guides, webinars | 🟠 **High** |
| **Interactive tools** | None | ROI calculators, free audit tools, maturity assessments — high-value lead capture | 🟠 **High** |
| **Lead funnel maturity** | Single conversion path (Book Intro Call) | Layered funnel: high-intent booking, mid-intent audit or calculator, low-intent content download | 🟠 **High** |
| **Compliance & security** | Not addressed | GDPR statement, data-handling policy, ISO/Cyber Essentials if held, DPA availability | 🟠 **High** |
| **Service architecture** | Flat list, no hub | Hub-and-spoke with tiered offerings and clear packaging | 🟡 **Medium** |
| **Credentials** | Google Partner + Meta Business Partner, shown twice | Same credentials plus platform certifications, surfaced throughout | 🟡 **Medium** |
| **Brand consistency** | Three name variants in use | One brand name, legal name confined to legal contexts | 🟡 **Medium** |
| **Content depth** | 13–15 pages | 40–80+ pages across services, sectors, cases, and resources | 🟡 **Medium** |
| **Technical foundation** | Not assessable **[Unverified]** | Core Web Vitals green, full schema coverage, WCAG 2.1 AA | ⚪ **Unknown** |

**Five critical gaps, all of which reduce to a single root cause: the site asserts
capability without evidencing outcome.**

---

## 7. Recommended Target Information Architecture

### 7.1 Proposed sitemap

```
/                                   Homepage
│
├── /services                       ★ NEW — services hub
│   ├── /services/seo
│   ├── /services/paid-media                 (Google Ads, Meta, TikTok)
│   ├── /services/social-media-marketing
│   ├── /services/link-building              ★ NEW — surfaces existing FAQ content
│   ├── /services/web-development
│   ├── /services/mobile-app-development
│   ├── /services/custom-software
│   └── /services/aeo-geo                    ★ NEW — AI search optimisation
│
├── /industries                     ★ NEW — sector hub
│   ├── /industries/hospitality              (absorbs restaurant SEO)
│   ├── /industries/ecommerce
│   ├── /industries/professional-services
│   ├── /industries/healthcare
│   └── /industries/b2b-saas
│
├── /case-studies                   ★ NEW — replaces /portfolio
│   └── /case-studies/<client-slug>          Individual case studies
│
├── /pricing                        Replaces /packages-and-pricing
│
├── /about
│   ├── /about/team                 ★ NEW
│   ├── /about/process              ★ NEW — the methodology framework
│   └── /about/partners             ★ NEW — credentials and accreditations
│
├── /resources                      ★ NEW — replaces bare /blog
│   ├── /resources/blog
│   ├── /resources/guides           ★ NEW — gated lead magnets
│   └── /resources/tools            ★ NEW — ROI calculator, free audit
│
├── /contact
│   └── /contact/book-a-call        ★ NEW — dedicated booking page
│
├── /faq
└── /legal/privacy-policy  ·  /legal/cookies  ·  /legal/terms
```

**Growth: ~14 pages → ~40 pages**, matching enterprise-tier competitors and dramatically
expanding organic surface area.

### 7.2 Redirect map

Every current URL must 301 to its new location. No exceptions — losing existing rankings
during a redesign is the most common and most expensive redesign mistake.

| Current URL | → New URL | Note |
|---|---|---|
| `/digital-marketing` | `/services` | Its content maps to the hub |
| `/web-development` | `/services/web-development` | |
| `/custom-software-development` | `/services/custom-software` | |
| `/mobile-app-development` | `/services/mobile-app-development` | |
| `/service-social-media` | `/services/social-media-marketing` | |
| `/service-restaurant-seo` | `/industries/hospitality` | Broadened from restaurants to hospitality |
| `/packages-and-pricing` | `/pricing` | |
| `/portfolio` | `/case-studies` | |
| `/about-us` | `/about` | |
| `/blog` | `/resources/blog` | |
| `/contact`, `/faq` | unchanged | |

Pre-launch checklist: export all current URLs from Search Console and the server logs to
catch pages this audit could not discover; verify every redirect resolves in a single hop;
submit an updated XML sitemap on launch day; monitor Search Console coverage and rankings
daily for the first fortnight.

### 7.3 Navigation redesign

```
[GTech logo]  Services ▾  Industries ▾  Case Studies  Pricing  Resources ▾  About ▾   📞 0203 598 5956  [Book Intro Call]
```

"Services ▾" becomes a mega-menu with three columns — Marketing, Development, Emerging —
each item carrying a one-line description, plus a promoted panel featuring a case study or
the ROI calculator. The dropdown title links through to `/services`.

---

## 8. New Enterprise Sections — Specification

Each specification below defines purpose, placement, content model, and behaviour. The
**content model** is deliberately expressed as data fields — these become the React
component props in Phase 3, so the structure is settled once rather than reworked twice.

### 8.1 Interactive ROI / Service Calculator ★ BRIEF REQUIREMENT

**Purpose:** Convert research-phase visitors who are not ready to book a call. The
calculator makes GTech's value concrete and personal in under 60 seconds, and captures a
qualified lead in exchange for the result.

**Placement:** Dedicated page at `/resources/tools/roi-calculator`; embedded summary
version on the homepage between the process and case-study sections; contextual variants
on `/services/seo` and `/services/paid-media`; promoted panel in the Services mega-menu.

**Inputs**

| Field | Control | Notes |
|---|---|---|
| Industry | Select | Sets the benchmark conversion rate and average order value |
| Monthly website visitors | Slider, 500–100,000 | Log scale for usability |
| Current conversion rate | Slider, 0.5%–10% | Pre-filled with the industry benchmark |
| Average order / deal value | Input, £ | Pre-filled with the industry benchmark |
| Monthly marketing budget | Slider, £1,000–£50,000 | Drives the investment side of the ratio |
| Primary goal | Radio | Traffic growth / conversion improvement / both |

**Outputs**

- Current estimated monthly revenue from digital
- Projected revenue after 6 and 12 months
- Additional monthly revenue attributable to the engagement
- Projected ROI as a ratio and a percentage
- Estimated break-even point in months
- A visual comparison chart: current vs. projected trajectory

**Calculation approach:** transparent and conservative. Uplift assumptions must be
industry-benchmarked, stated openly on the page, and set at the low end of GTech's actual
results. An inflated calculator destroys credibility with exactly the sophisticated buyer
it is meant to attract, and creates a real risk of a misleading-claims complaint. Display
the assumptions inline and include a clear "estimate, not a guarantee" statement.

**Lead capture:** show the headline result immediately, ungated — the visitor must get
value before being asked for anything. Gate only the extras: the full PDF breakdown, the
12-month projection detail, and a personalised roadmap. Fields: name, work email, company,
phone (optional). Route into CRM tagged with every calculator input as qualification data.

**Behaviour:** results update live as inputs change; all state in the URL query string so
results are shareable; fully keyboard accessible with number inputs alongside every
slider; mobile layout stacks inputs above results.

---

### 8.2 Enterprise Case Studies with Visual Metrics ★ BRIEF REQUIREMENT

**Purpose:** The highest-impact addition in this entire document. Enterprise buyers
shortlist on evidence, and GTech currently provides none.

**Placement:** `/case-studies` index with filtering; individual pages at
`/case-studies/<slug>`; featured cards on the homepage; sector-relevant cards on every
service and industry page; a compact proof card inside the pricing page.

**Case study card content model**

```
client_name          Company name, or "A UK hospitality group" if under NDA
client_logo          Image, or a sector icon fallback
industry             Filter facet
services[]           Filter facet
hero_metric          { value: "+340%", label: "Organic traffic", timeframe: "7 months" }
supporting_metrics[] Two more metrics, same shape
summary              One sentence: the outcome
slug                 Link target
featured             Boolean, for homepage selection
```

**Case study detail page structure**

1. **Hero** — client, sector, services delivered, engagement length, and three headline
   metrics displayed prominently
2. **The challenge** — the business problem in the client's terms, with starting-position
   context
3. **Our approach** — the strategy and the reasoning behind it, broken into phases
4. **What we did** — specific, concrete work with real screenshots and artefacts
5. **The results** — a metrics dashboard with before/after comparison charts, over a
   stated timeframe
6. **Client quote** — full attribution: name, job title, company, photo
7. **Related case studies** — three cards
8. **CTA** — "Get results like these" → booking flow

**Filtering on the index:** by industry, by service, and by result type (traffic /
revenue / leads / rankings). Client-side filtering with URL state so filtered views are
shareable and linkable.

**Metric visualisation:** large numerals in the brand accent colour with a directional
arrow, a small sparkline or bar comparison beneath, the timeframe always stated, and the
measurement basis noted. Never present a metric without its timeframe — it reads as
evasive to anyone experienced.

**Content requirement — the real constraint:** this section is only as good as the data
GTech supplies. Producing 6–8 substantiated case studies requires pulling real client
data, securing approval to publish, and confirming what may be named versus anonymised.
**This should start now, in parallel with Phase 2 design work** — it is the long-lead item
in the whole project, and the prototypes will use placeholder data until it lands.

---

### 8.3 Multi-Tier Service Offerings & Process Frameworks ★ BRIEF REQUIREMENT

#### Multi-tier offerings

**Purpose:** Let buyers self-qualify by budget and scope. Tiering also anchors value —
the presence of an enterprise tier makes the mid tier read as reasonable.

**Placement:** `/pricing` as the primary home; a service-specific tier block on each
service page; a condensed three-tier summary on the homepage.

**Structure — four tiers:**

| Tier | Positioning | Buyer |
|---|---|---|
| **Essentials** | Entry point, defined deliverables | Small businesses, single-channel |
| **Growth** ★ | Recommended — multi-channel, dedicated account management | Established SMEs |
| **Enterprise** | Full-service, strategic partnership, custom scope | Larger organisations |
| **Custom** | Bespoke — consultative, "let's talk" | Complex or multi-region requirements |

Each tier carries: name, positioning line, price ("from £X/month" or "Custom"), the buyer
it suits, a feature list with tier-to-tier differences visually emphasised, deliverables
and reporting cadence, account-management level, minimum term, and its own CTA.

**Present alongside:** a full feature-comparison matrix, a pricing FAQ, and a "not sure
which tier?" path into the ROI calculator or a consultation.

**On real figures:** publishing actual numbers is a commercial decision for GTech.
Enterprise buyers strongly prefer transparency and will exclude agencies that hide
pricing entirely — but "from £X" anchors are an acceptable middle ground and are what the
prototypes will assume unless directed otherwise.

#### Process frameworks

**Purpose:** Demonstrate methodology. A named, documented process is one of the clearest
signals separating an enterprise agency from a freelancer — it says the outcome is
repeatable rather than dependent on one person.

**Placement:** `/about/process` as the full framework; a condensed process map on the
homepage replacing part of the current bullet-list blocks; a service-specific variant on
every service page.

**Recommended framework — five stages:**

| Stage | Name | Deliverable | Typical timing |
|---|---|---|---|
| 01 | **Discover** | Audit, competitor analysis, opportunity sizing | Weeks 1–2 |
| 02 | **Strategise** | Roadmap, KPI framework, channel plan | Weeks 3–4 |
| 03 | **Build** | Implementation, campaign launch, technical fixes | Weeks 5–8 |
| 04 | **Optimise** | Testing, iteration, scaling what works | Ongoing |
| 05 | **Report & Scale** | Dashboards, reviews, expansion planning | Monthly |

Each stage needs: number, name, one-line summary, 3–4 concrete activities, deliverables,
timeline, and who is involved. The framework should be given a proprietary name so it
becomes a memorable asset rather than a generic diagram.

**Visualisation:** a horizontal connected timeline on desktop, a vertical stepper on
mobile, with each stage expandable to reveal detail. Animate progressively on scroll.
Never a plain numbered list — the visual treatment is the point.

---

### 8.4 Client Logos / Social Proof Carousel ★ BRIEF REQUIREMENT

**Purpose:** Instant credibility transfer. A recognisable logo row communicates in two
seconds what several paragraphs of copy cannot.

**Placement:** Homepage immediately below the hero — the highest-value position on the
site, and where enterprise buyers expect it. Also as a compact strip on service pages, on
`/pricing` near the tiers, and above the footer site-wide.

**Content model**

```
client_name       For alt text and accessibility
logo_mono         Greyscale SVG — the default state
logo_colour       Full colour — the hover state
case_study_slug   Optional link to the relevant case study
sector            For contextual filtering on industry pages
```

**Treatment:** greyscale at rest, colour on hover, uniform optical sizing (normalise by
visual weight, not bounding box — the most common error in logo walls). A quiet
continuous marquee, pausing on hover and respecting `prefers-reduced-motion`. Static grid
on mobile. Logos link through to their case study where one exists, turning passive proof
into a navigation path.

**Requires:** written permission to display each client's mark, and clean vector assets.
Where NDAs prevent naming, use sector descriptors ("A national restaurant group") in a
consistent styled treatment rather than omitting the proof.

**Extend into a broader social proof band:** third-party review ratings with real scores
and volumes, a testimonial grid with photographed and fully attributed quotes, an
accreditation strip, and any awards or press mentions.

---

### 8.5 CTA Strategy & Lead Funnels ★ BRIEF REQUIREMENT

**The core problem today:** one conversion path ("Book Intro Call"), which only serves
visitors already near a decision. Research-phase visitors — the large majority — have
nothing to do but leave.

**The fix: a three-tier funnel.**

| Tier | Intent | Offer | Ask | Placement |
|---|---|---|---|---|
| **Primary** | High — ready to talk | Book a strategy call | Full contact details | Header, hero, end of every page |
| **Secondary** | Mid — evaluating | Free growth audit; ROI calculator result | Email + company | Mid-page on services, after case studies, in the mega-menu |
| **Tertiary** | Low — researching | Guide download; benchmark report; newsletter | Email only | Blog posts, resources, exit intent, footer |

**Per-page primary CTA:**

| Page | Primary CTA | Secondary |
|---|---|---|
| Homepage | Book Your Free Strategy Call | Calculate your ROI |
| `/services` | Book a strategy call | Compare service tiers |
| Service pages | Get a free [service] audit | See [service] case studies |
| `/case-studies` | Get results like these | Download the full case study |
| `/pricing` | Book a call to confirm scope | Calculate your ROI |
| `/about` | Meet the team | See our process |
| Blog posts | Download the related guide | Subscribe |

**Rules for Phase 2:** exactly one primary CTA per page, repeated rather than competed
with; every long page carries a mid-scroll CTA, since visitors who scroll past 60% and
find nothing to act on are lost; every page ends with a full-width CTA band (the current
homepage ends on a testimonial and drops into the footer with no ask); progressive form
disclosure — email first, qualification later; and a sticky mobile CTA bar, since mobile
visitors will not scroll back to the header.

**Instrumentation:** every CTA needs event tracking, source attribution through to CRM,
and defined micro-conversions (calculator completion, case study read, guide download,
pricing page view) so the funnel can be optimised rather than guessed at.

---

### 8.6 Supporting enterprise sections

**Statistics / results band** — a full-width band of 4–6 headline numbers with animated
count-up on scroll: clients served, revenue generated for clients, average ROI, campaigns
managed, years operating, retention rate. Placed immediately below the client logos.
*Every number must be defensible.*

**Certifications & compliance strip** — Google Partner and Meta Business Partner given
prominence, plus platform certifications, GDPR compliance, ISO or Cyber Essentials if
held, and DPA availability. Enterprise procurement checks these.

**Industry / sector solutions grid** — 5–8 sector cards, each with a sector-specific
outcome metric, linking to full industry pages. Converts a generalist agency into a
specialist in each buyer's eyes.

**Team & leadership** — leadership profiles with photos, credentials, and LinkedIn links;
team size and structure; office locations. Enterprise buyers want to know who they will
actually be working with.

**Technology & integrations** — the platforms and tools GTech works across (GA4, Search
Console, Semrush/Ahrefs, HubSpot/Salesforce, Shopify, WordPress, Meta Business Manager).
Signals technical maturity and helps buyers confirm compatibility with their stack.

**FAQ with schema** — a substantial accordion on relevant pages, marked up with FAQPage
structured data for rich results.

---

## 9. Design System Direction

Direction only. The complete buildable specification is a Phase 2 deliverable.

### 9.1 Typography — Poppins **(brief requirement)**

Poppins across all pages, weights 300–700. It is geometric, modern, and reads as
confident at large sizes — a good fit for the repositioning. It needs generous letter
spacing at small sizes and tightened tracking at display sizes to stay comfortable.

| Token | Size (desktop) | Weight | Line height | Use |
|---|---|---|---|---|
| `display` | 64px | 700 | 1.1 | Hero headline |
| `h1` | 48px | 700 | 1.15 | Page titles |
| `h2` | 36px | 600 | 1.2 | Section headings |
| `h3` | 28px | 600 | 1.3 | Subsections |
| `h4` | 22px | 600 | 1.4 | Card titles |
| `body-lg` | 18px | 400 | 1.7 | Intro paragraphs |
| `body` | 16px | 400 | 1.7 | Default |
| `body-sm` | 14px | 400 | 1.6 | Captions, meta |
| `overline` | 13px | 600 | 1.4 | Eyebrows — uppercase, +0.08em tracking |
| `metric` | 56px | 700 | 1.0 | Statistics — tabular numerals |

Fluid scaling via `clamp()` between 375px and 1440px. Self-host the font as WOFF2 subsets
with `font-display: swap` — faster than Google Fonts and avoids a third-party GDPR
consideration.

### 9.2 Colour

Sampled from the supplied screenshot. **These are approximations and must be confirmed
against GTech's actual brand values before Phase 2 build.**

| Token | Approx. value | Use |
|---|---|---|
| `--brand-primary` | `#0B4FD8` | Primary blue — hero, headings, links |
| `--brand-primary-dark` | `#062E82` | Hero gradient end, footer |
| `--brand-primary-light` | `#3B7BF0` | Hover states, accents |
| `--brand-accent` | `#E8332A` | Red — primary CTAs, metric highlights |
| `--brand-accent-dark` | `#C41E14` | Accent hover |
| `--brand-cyan` | `#22D3EE` | Highlight — as used on "Scalable Growth" |
| `--neutral-900 … 000` | Grey scale | Text and surfaces |
| `--success` / `--warning` | `#10B981` / `#F59E0B` | Positive metrics; attention states |

Red is currently used for both CTAs and decorative elements. Reserve it strictly for
actions and metric emphasis — an accent that appears everywhere directs attention nowhere.

**Accessibility is non-negotiable:** every combination must meet WCAG 2.1 AA (4.5:1 for
body text, 3:1 for large text and UI components). The current site appears to have
low-contrast text on light grey in the service blocks **[Inferred]**; the new system must
not repeat it.

### 9.3 Grid, spacing, and radii

12-column grid, 1280px max content width (1440px for full-bleed sections), 24px gutters
desktop / 16px mobile. Breakpoints: 375 / 640 / 768 / 1024 / 1280 / 1440.

Spacing on a 4px base: 4, 8, 12, 16, 24, 32, 48, 64, 80, 96, 128. Section padding 96px
desktop / 64px tablet / 48px mobile.

Radii: 8px inputs and small elements, 12px cards, 16px large panels, 999px pills.
Shadows: three elevation levels, all soft and low-opacity — the current site's flat cards
lack depth hierarchy.

### 9.4 Component inventory for Phase 2

**Foundations:** buttons (primary, secondary, ghost, link — four sizes, all states),
inputs, selects, sliders, checkboxes, radios, badges, pills, tags.

**Content:** service card, case study card, metric tile, testimonial card, team card,
pricing tier card, logo tile, stat counter, icon feature block, accordion, tab set.

**Composite:** hero (preserved from current), section header with eyebrow, process
stepper, comparison table, filter bar, carousel, CTA band, mega-menu, footer.

**Interactive:** ROI calculator, filterable case study grid, animated counters, tabbed
service explorer, sticky mobile CTA.

**Motion:** subtle and purposeful. Fade-and-rise on scroll entry (24px, 400ms, ease-out),
staggered by 60ms across grids. Counters animate once on entry. Every animation respects
`prefers-reduced-motion` — non-negotiable, and doubly so for an agency selling technical
competence.

---

## 10. Page-by-Page Briefs for Phase 2

Five standalone HTML/CSS prototypes sharing one design system, in `/prototype`.

### 10.1 `index.html` — Homepage

**Hero preserved exactly per brief.** Everything below is redesigned.

1. Header with mega-menu
2. **Hero — unchanged structure**
3. Client logo carousel *(new)*
4. Statistics band *(new)*
5. Services — redesigned cards with outcomes, sub-services, and proof
6. Process framework — 5-stage visual map *(new, replaces bullet blocks)*
7. Featured case studies — 3 cards with metrics *(new)*
8. ROI calculator — embedded summary *(new)*
9. Why GTech — redesigned from stacked rows into an icon grid with substantiation
10. Testimonial wall — multiple, fully attributed *(redesigned)*
11. Industries grid *(new)*
12. Certifications & compliance strip *(new)*
13. Final CTA band *(new)*
14. Expanded footer

**Primary CTA:** Book Your Free Strategy Call. **Proof required:** logos, stats band, 3
case studies, 4+ testimonials, partner badges.

### 10.2 `services.html` — Services Overview

Hero with value proposition → filter/toggle between Marketing and Development →
interactive service grid with expand-on-hover detail → service comparison table → process
overview → tier summary → case studies filtered by service → FAQ → CTA band.

**Primary CTA:** Book a strategy call. **Secondary:** Compare tiers.

### 10.3 `service-single.html` — Single Service (SEO as the worked example)

Hero with the service's headline outcome metric → problem statement → what's included
(grouped, outcome-led — not a flat bullet list) → service-specific 5-stage process →
results proof with 2 case studies → tier options for this service → tools and platforms →
team credentials → service-specific FAQ with schema → CTA band.

**Primary CTA:** Get a free SEO audit. **Proof required:** headline metric in the hero, 2
case studies, 3+ testimonials, certifications.

### 10.4 `portfolio.html` — Case Studies

Hero with aggregate results ("£12M+ generated across 200+ campaigns") → filter bar
(industry / service / result type) → featured case study, full width → filterable grid →
results summary band → testimonial wall → CTA band.

**Primary CTA:** Get results like these. Filtering client-side with URL state.

### 10.5 `pricing.html` — Pricing

Hero framing value not cost → billing toggle (monthly / annual) → four tier cards with
Growth highlighted → full feature comparison matrix → what's included in every tier → ROI
calculator embed → pricing FAQ → client logos and testimonials → custom quote form → CTA
band.

**Primary CTA:** Book a call to confirm scope. **Secondary:** Calculate your ROI.

### 10.6 Build standards for all prototypes

Semantic HTML5 throughout (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`,
`<footer>`) with a correct single-`<h1>` heading hierarchy per page. Mobile-first
responsive. WCAG 2.1 AA: keyboard navigable, visible focus states, ARIA where needed,
alt text on every image. Inline SVG icons — no icon fonts. Vanilla JS only, progressively
enhanced. Shared `assets/css/design-system.css` plus per-page CSS. Structured every step
of the way for clean extraction into React components in Phase 3.

---

## 11. Known Limitations & Follow-Ups

Everything below could not be assessed because the live site was unreachable (§2). None
of it changes the strategy in this document — these are technical-remediation items to
gather once access is available.

**To close all of these at once:** allowlist `gtechdigital.co.uk` in the environment's
network policy, or export the site's HTML into this repository.

| # | Item | Why it matters | How to close |
|---|---|---|---|
| 1 | Core Web Vitals (LCP, INP, CLS) | Ranking factor and conversion driver | PageSpeed Insights + CrUX field data |
| 2 | Schema.org structured data | Organization, LocalBusiness, Service, FAQPage, Review markup drive rich results | Rich Results Test on each template |
| 3 | Canonical tags | Duplicate-content control — critical given the staging mirror | Inspect `<head>` per page |
| 4 | `robots.txt` and XML sitemap | Crawl control and index coverage | Fetch both directly |
| 5 | Image alt text and file weights | Accessibility and page speed | Crawl with Screaming Frog |
| 6 | Heading hierarchy | Semantic structure and screen-reader navigation | Automated audit |
| 7 | Real mobile rendering | The screenshot is desktop only | Device testing |
| 8 | Accessibility conformance | Contrast, focus, ARIA, keyboard traps | axe DevTools + manual keyboard pass |
| 9 | Form behaviour and validation | Conversion-critical | Manual testing of each form |
| 10 | Analytics and tag configuration | Whether conversions are tracked at all | Tag Assistant + GA4 review |
| 11 | Actual figures on `/packages-and-pricing` | Directly informs the new tier structure | Read the live page |
| 12 | Actual `/portfolio` contents | Determines how much case-study material already exists | Read the live page |
| 13 | Blog post inventory | Confirms whether the blog is genuinely empty | Read the live page |
| 14 | Services dropdown contents | Confirms the full service list | Read the live nav |
| 15 | Privacy and cookie policy URLs | Needed for the redirect map | Read the live footer |
| 16 | Backlink profile and rankings | Establishes the SEO baseline to protect through migration | Search Console + Ahrefs/Semrush |
| 17 | Current traffic and conversion baseline | Without it, redesign impact cannot be measured | GA4 export |

### Items needing GTech's input, not technical access

These are the genuine long-lead items. **Case study data (18) should start immediately —
it gates the most valuable section of the new site.**

| # | Item | Needed for |
|---|---|---|
| 18 | **Client results data and permission to publish** | Case studies — start now, longest lead time |
| 19 | Client logo assets and display permission | Logo carousel |
| 20 | Real pricing figures, or approved "from £X" anchors | Pricing tiers |
| 21 | Exact brand colour values, logo files, brand guidelines | Design system |
| 22 | Team photos, bios, credentials | Team section |
| 23 | Canonical phone number and registered address | NAP consistency, footer, LocalBusiness schema |
| 24 | Legal entity name convention | Resolving the brand naming inconsistency |
| 25 | Accreditations held (ISO, Cyber Essentials, etc.) | Compliance strip |
| 26 | Real defensible statistics | Statistics band |
| 27 | Full testimonials with permission for names, titles, photos | Testimonial wall |

---

## 12. Appendix

### 12.1 Immediate actions — do not wait for the redesign

1. **Secure `test.gtechdigital.co.uk`** — noindex, auth, and index removal. Highest
   priority; it is a live risk today (§5.3).
2. **Fix the title tags** on `/faq` and `/about-us` (§5.2). Same-day change, real SEO
   value.
3. **Fix the "Services" footer link** currently pointing at a non-existent page (§5.8).
4. **Begin gathering case study data** (§11, item 18). Longest lead time in the project.
5. **Establish canonical NAP details** (§5.7).

### 12.2 File layout convention

```
/site-audit-and-concept.md      Phase 1 — this document
/README.md                      Project overview and status
/prototype/                     Phase 2 — HTML/CSS prototypes
  index.html
  services.html
  service-single.html
  portfolio.html
  pricing.html
  /assets/css/design-system.css
  /assets/css/<page>.css
  /assets/js/
  /assets/img/
/                               Reserved for the Phase 3 Next.js application
```

### 12.3 Phase roadmap

| Phase | Deliverable | Status |
|---|---|---|
| **1** | Site audit and concept document | ✅ This document — awaiting approval |
| **2** | Five HTML/CSS prototypes on a shared design system | ⏳ Blocked on Phase 1 approval |
| **3** | Next.js application with reusable React components, dynamic routing, optimised performance | ⏳ Blocked on Phase 2 approval |

### 12.4 Sources

- [GTech Digital homepage](https://www.gtechdigital.co.uk/)
- [About Us](https://www.gtechdigital.co.uk/about-us)
- [Digital Marketing](https://www.gtechdigital.co.uk/digital-marketing)
- [Web Development](https://www.gtechdigital.co.uk/web-development)
- [Custom Software Development](https://www.gtechdigital.co.uk/custom-software-development)
- [Mobile App Development](https://www.gtechdigital.co.uk/mobile-app-development)
- [Social Media Marketing](https://www.gtechdigital.co.uk/service-social-media)
- [Restaurant SEO](https://www.gtechdigital.co.uk/service-restaurant-seo)
- [Packages and Pricing](https://www.gtechdigital.co.uk/packages-and-pricing)
- [Portfolio](https://www.gtechdigital.co.uk/portfolio)
- [Contact](https://www.gtechdigital.co.uk/contact)
- [FAQ](https://www.gtechdigital.co.uk/faq)
- [Staging environment (should not be public)](https://test.gtechdigital.co.uk/)
- [GTech Digital company profile — Tracxn](https://tracxn.com/d/companies/gtechdigital.co.uk/__-0cG2Xn7W0fY3Mqk3K6Rl6ba94XEitU2LnztGoyakV8)
- [GTech Digital Expands Services as Google Partner Agency — openPR](https://www.openpr.com/news/4524420/gtech-digital-expands-services-as-google-partner-agency)
- Full-page homepage screenshot supplied in the project brief

---

*End of Phase 1. On approval, Phase 2 begins with the design system and the five HTML
prototypes.*
