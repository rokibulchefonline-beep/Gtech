---
name: single-service-page
description: Architecture, design system rules, and markup blueprint for GTech Digital Single Service Pages. Use whenever designing, building, restructuring, writing, or reviewing any single service page (e.g. SEO, Local SEO, Restaurant SEO, Link Building, Performance Marketing, Social Media Marketing, Web Development, Mobile App Development, Custom Software Development, Brand & UI/UX Design).
license: MIT
---

# GTech Digital — Single Service Page Design System Skill

This skill provides the mandatory architectural blueprint, component hierarchy, copy standards, and visual specifications required for all single service pages across the GTech Digital website.

---

## 1. When to Use This Skill

Activate and follow this skill whenever:
- Creating a new single service page or landing page.
- Auditing, refactoring, or redesigning an existing single service page.
- Standardizing hero visual animations (`.flow-ecosystem`), H1 headlines, bento cards, or section spacing.
- Ensuring compliance with GTech Digital's design system tokens, typography, and responsive layouts.

---

## 2. Core Architecture: The 6-Section Blueprint

Every single service page MUST follow this exact semantic structure:

```
├── <head> (Metadata, OpenGraph, JSON-LD Service & FAQ Schema, Fonts, CSS)
├── <header class="site-header"> (Synchronized MegaMenu, Phone Link, Mobile Nav)
├── <main id="main">
│   ├── [HERO] <section class="hero hero--split"> (H1 7-10 words, Lead, Dual CTAs, Flow Ecosystem)
│   ├── [SECTION 1] <section class="section" id="capabilities"> (4-5 Alternating Showcase Cards)
│   ├── [SECTION 2] <section class="section section--paper" id="why-choose-us"> (2-Col Media & 2x2 Points)
│   ├── [SECTION 3] <section class="section section--blue-stats stats-band"> (11+ Years Stats & Logo Marquee)
│   ├── [SECTION 4] <section class="section section--paper" id="process"> (4-Stage Royal Blue Process Cards)
│   ├── [SECTION 5] <section class="section section--paper" id="faq"> (2-Col Interactive Accordion)
│   └── [SECTION 6] <section class="section cta" id="contact"> (2-Col Lead Consultation & Direct Phone)
└── <footer class="site-footer"> (4 Partner Badges, Nav Columns, Legal Links)
```

---

## 3. Section-by-Section Specifications

### 3.1 `<head>` & Structured Data
- **Title Tag**: `[Primary Service Keyword] in the UK | [Key Specialism] | GTech Digital`
- **Meta Description**: 140–160 characters highlighting commercial ROI, certifications, and UK coverage.
- **CSS Dependencies**:
  ```html
  <link rel="stylesheet" href="/assets/css/design-system.css">
  <link rel="stylesheet" href="/assets/css/index.css">
  ```
- **JSON-LD Schema**:
  - `@type: "Service"` with `provider` ("GTech Digital"), `areaServed` ("GB"), and `hasOfferCatalog` with 4–5 core offerings.
  - `@type: "FAQPage"` matching the on-page FAQ questions verbatim.

---

### 3.2 Site Header & MegaMenu
- Text brand mark with blue accent: `<span class="logo__mark">G</span><span>G<span class="logo__accent">Tech</span> Digital</span>`.
- Synchronized mega-menu with 4 tabs:
  1. Performance Marketing (`data-mega-tab="performance"`)
  2. SEO, AEO & GEO (`data-mega-tab="seo"`)
  3. Web & App Development (`data-mega-tab="web"`)
  4. Brand & UI/UX Design (`data-mega-tab="design"`)
- Direct phone link: `0203 598 5956` (`tel:+442035985956`).
- CTA button: `Book Intro Call` (`#contact`).

---

### 3.3 Hero Section (`.hero.hero--split`)
- **H1 Headline Rule**: Must be concise, exactly **7 to 10 words**, containing the primary keyword and closing with `<span class="hero__accent">...</span>`.
  - *Example*: `Web Development Agency in the UK <span class="hero__accent">Engineering High-Performance Platforms</span>` (9 words)
  - *Example*: `SEO & AI Search Agency <span class="hero__accent">Driving Organic Revenue Growth</span>` (8 words)
- **Hero Lead**: 2–3 concise sentences explaining methodology and outcomes, bolding 3–4 key frameworks or tech stacks.
- **Dual CTA Buttons**:
  - Primary: `Request a [Service] Proposal` / `Book Intro Call` (`btn--primary btn--arrow`).
  - Secondary: `Explore Capabilities` / `View Packages` (`btn--outline btn--arrow`).
- **Interactive Flow Ecosystem (`.flow-ecosystem`)**:
  - SVG `viewBox="0 0 540 460"`.
  - Must define `<linearGradient id="flowGrad">` and `<radialGradient id="centerGlow">` in `<defs>`.
  - 12 base dashed paths (`.flow-path-base`).
  - 12 active gradient animated paths (`.flow-path-active`).
  - 12 moving energy particle circles (`<circle class="flow-particle">` with `<animateMotion>`).
  - Central Glowing Hub (`.hub-center` > `.hub-ring--outer`, `.hub-ring--inner`, `.hub-core` with contextual icon).
  - 12 contextual floating nodes (`.flow-node.node-1` through `node-12`) with SVG icons and labels.

---

### 3.4 Section 1: Capabilities Showcase (`#capabilities`)
- Background: `style="background:var(--surface)"`.
- Header: `.grid12.mb-10` with `t-label`, `t-h2`, `t-lead` (aligned at top baseline via `align-self:end` on lead).
- List: `.svc-showcase-list` containing 4 to 5 cards alternating between:
  - `.svc-showcase` (Image Left / Content Right)
  - `.svc-showcase.svc-showcase--reverse` (Content Left / Image Right)
- Card Elements:
  - High-resolution Unsplash imagery (600x540, `loading="lazy"`).
  - H2 Title (`.svc-showcase__title`).
  - Paragraph description (`.svc-showcase__desc`).
  - Checklist (`.svc-checklist` with green/blue SVG checkmarks).
  - Primary button (`btn btn--primary btn--arrow`).
- Divider between cards: `<div class="svc-divider"></div>`.

---

### 3.5 Section 2: Why Partner with GTech Digital (`#why-choose-us`)
- Background: `class="section section--paper"`.
- Layout: `.why-choose-grid` (2-column layout).
- Left Media: `.why-choose__media-card` with aspect ratio ~1.1/1, rounded 20px, clean without floating badges.
- Right Content:
  - `t-label`: "Why Partner With GTech Digital"
  - `t-h2`: High-level value proposition.
  - `t-body-lg`: Commercial credibility copy.
  - `.why-points`: 2x2 grid of 4 core advantages with SVG icons (e.g. 100% IP Ownership, Sub-Second Speed, Rapid Delivery, 24/7 SLA).
  - CTA button: `Schedule Technical Discovery` (`btn--primary btn--arrow`).

---

### 3.6 Section 3: Company Numbers & Dual Marquee (`.section--blue-stats.stats-band`)
- Background: Royal blue background with white text.
- Header: `11+ Years of Digital Engineering`, H2, and descriptive lead.
- `.stats-row`: 4 live metric boxes (`.stat` > `.stat__value` with `.stat__accent`, `.stat__label`, `.stat__note`).
  - *Metrics*: Completed Projects/Apps, Client Rating/Revenue, SLA/Crash-Free Uptime, 100% IP Ownership.
- Dual Marquee Ticker: `.clients-marquee` with infinite CSS track containing client logos/names (ChefOnline, Townley, BritAsia TV, Curry Life, Ocean Pearl, Spice Fusion, The Raj, Aura Lounge).

---

### 3.7 Section 4: 4-Stage Methodology / Process (`#process`)
- Background: `class="section section--paper"`.
- Layout: `.process-steps--4` (CSS grid with 4 equal columns on desktop, 2 on tablet, 1 on mobile).
- Cards: `.process-card` with royal blue gradient background, white text:
  - Glowing number badge: `.process-card__number` (`01`, `02`, `03`, `04`).
  - Title: `.process-card__title` (e.g. Discovery, Engineering, QA Testing, Deployment).
  - Description: `.process-card__desc`.

---

### 3.8 Section 5: FAQ Accordion (`#faq`)
- Background: `class="section section--paper"`.
- Layout: 2-column grid (`.grid12`).
  - Column 1 (5 cols): `t-label`, `t-h2`, lead copy, and `btn--primary` CTA.
  - Column 2 (7 cols): `.faq-accordion` with 4–5 `.faq-item` elements with `data-faq-toggle`, animated chevrons, and rich HTML answers.

---

### 3.9 Section 6: Consultation & Lead CTA Form (`#contact`)
- Background: Dark navy gradient CTA block (`class="section cta"`).
- Layout: `.cta__grid` (2-column layout).
  - Left: `.cta__content` with cyan label (`#38BDF8`), H2 title, lead description, 3 trust bullet points with cyan checkmarks, and clickable phone CTA (`0203 598 5956`).
  - Right: `.cta__form-card` containing form fields (Name, Work Email, Phone Number, Service Selection Dropdown, Project Description textarea, and `Submit Brief` button).

---

### 3.10 Site Footer
- Global `.site-footer` with:
  - Left column: Text logo, company intro, 4 official partner badges (Google Partner, Meta Partner, TikTok Partner, Semrush Partner), and social links.
  - Middle columns: Structured Services links and Company links.
  - Right column: Newsletter subscribe form and direct contact telephone/email.
  - Legal bar: Copyright © 2026 GTech Digital, Privacy Policy, Cookies Policy, Terms of Service.

---

## 4. URL & File Routing Convention

Every single service page MUST be available in two locations to support clean extensionless URLs on static web servers:
1. `prototype/services/[service-slug].html`
2. `prototype/services/[service-slug]/index.html`

Both files must remain 100% identical in markup and synced whenever edits are made.

---

## 5. Design System Checklist Before Publishing

- [ ] **H1 Word Count**: Is the H1 between 7 and 10 words total?
- [ ] **Accent Styling**: Does the H1 contain `<span class="hero__accent">`?
- [ ] **SVG Gradient IDs**: Does the SVG hero visual use `id="flowGrad"` and `id="centerGlow"`?
- [ ] **Animated Particles**: Are all 12 `<circle class="flow-particle">` present with `<animateMotion>`?
- [ ] **Hub Core Icon**: Does the central hub have `.hub-ring--outer`, `.hub-ring--inner`, and `.hub-core`?
- [ ] **Floating Badges Removed**: Are all legacy `.why-badge` overlays removed from media cards?
- [ ] **Grid Alignment**: Is the Capabilities header top-aligned?
- [ ] **Process Layout**: Does the process section use `.process-steps--4` with royal blue `.process-card` components?
- [ ] **Partner Badges**: Are all 4 partner badges (Google, Meta, TikTok, Semrush) rendered in the footer?
- [ ] **Both Files Synced**: Are both `services/[name].html` and `services/[name]/index.html` updated?