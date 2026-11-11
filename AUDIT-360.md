# Murphy Ventures — 360 Audit

**Target:** https://murphy-ventures.vercel.app
**Repo:** https://github.com/Abdurrahman-code19/murphy-ventures (HEAD `7561d3f`)
**Date:** 11 November 2026
**Method:** 21st.dev `review` (62 files, 62 findings) + 21st `get_inspiration` + Playwright/axe runtime audit (9 routes × 6 widths) + manual source validation

> **Status:** the approved **P0 + P1** fixes have been applied. See [§0](#0-fix-status-applied) for before/after measurements. P0-4 (prerender + real 404) remains deferred by decision.

---

## 1. Verdict

The visual system and content are strong. The site is production-presentable today, but it has **four ship-blocking issues** that the 21st lint alone does not catch: a mobile menu that lets keyboard focus escape, poor Core Web Vitals CLS on catalogue routes, effectively invisible focus indicators on form controls, and metadata that only exists after JavaScript runs.

| Dimension | Score | Basis |
|---|---:|---|
| Visual design & brand | 8.5 / 10 | Typography, spacing, colour system, cohesive navy/gold identity |
| UX & content | 8.0 / 10 | Clear journey, real product imagery, honest price/reference wording |
| Responsive | 9.0 / 10 | No horizontal overflow at 320–1440; one intentional FAQ chip scroller |
| Accessibility | 5.5 / 10 | Focus trap, focus visibility, lists, contrast, landmarks |
| Performance / CWV | 5.0 / 10 | CLS 0.26–0.32 on catalogue routes; cache headers set to revalidate |
| SEO & metadata | 6.0 / 10 | Runtime SEO is complete; raw HTML is not; soft 404 |
| Code / design system | 7.5 / 10 | Clean components; some motion and colour drift |

**Overall: 7.3 / 10** — fix P0 before promoting the URL widely.

---

## 0. Fix status (applied)

P0 + P1 fixes are implemented and verified against a local production build (`vite preview`). No visual redesign; desktop navigation and routing unchanged.

| Item | Change | Before → After (measured) |
|---|---|---|
| **P0-1** focus trap | `Header.tsx`: dialog `ref`, Tab/Shift+Tab cycling, `inert` on all `#root` siblings while open, focus restored to the trigger on Escape **and** on the close button | 20 Tab stops stay inside the dialog (was escaping at stop 12); `main`/`header` inert: `true`; focus returns to “Open site menu” |
| **P0-2** CLS | `PageFallback.tsx`: `min-h-[60vh]` → `min-h-[calc(100svh-7rem)]` | `/products` **0.323 → 0.0022** (1440), **0.2635 → 0.0014** (375); `/products/fireproof-safe` **0.0021 / 0.0085** |
| **P0-3** focus rings | Removed `outline-none` from `Fields.tsx`, `ProductFilters.tsx`, `FormHandoff.tsx` (heading + textarea), `Layout.tsx` main | Contact name / catalogue search: `2px solid` outline, `:focus-visible` = true (was `2px none` + 1.1:1 ring) |
| **P0-4** metadata / soft 404 | **Deferred** (separate decision) | unchanged: raw HTML still one title; unknown route still HTTP 200 |
| **P1-1** list semantics | `ServicesOverview.tsx`, `WhyChoose.tsx`: `ul > li > Reveal` | axe `list`/`listitem`: 13 nodes → **0**; all `<ul>` children are now `li` |
| **P1-2** contrast | `muted/80`, `muted/70` → `muted`; `white/35`, `white/40` → `white/55`; `white/30` → `white/55`; `white/45` → `white/60` | axe `color-contrast`: **0** on home, products, product detail, contact, request-repair |
| **P1-3** landmarks | Utility bar `role="region" aria-label="Location and contact"`; FAB wrapped in `<aside aria-label="WhatsApp contact">` | axe `region`: 3–4 nodes/route → **0** |
| **P1-4** nested aside | `RequestRepair.tsx`: `<aside>` → `<section aria-label="Before you send">` | axe `landmark-complementary-is-top-level`: **0** |
| **P1-5** target size | Footer + home contact strip + product detail phone links: `py-1` (≥ 24 px) | axe `target-size`: 2–4 nodes → **0** |
| **P1-6** caching | `vercel.json`: `/assets/(.*)` → 1 yr immutable; `/images/(.*)` → 7 d + SWR | applies on next production deploy |

**Verification totals**

- Runtime axe (WCAG 2.2 AA + best-practice), 5 routes × 2 widths: **all clean** except one non-reproducible `page-has-heading-one` timing artefact on `/request-repair@1440` (a direct re-check confirms exactly one `<h1>`: “Request a repair.”).
- CLS on all four catalogue route/width combinations: **≤ 0.009** (was 0.26–0.32).
- 21st `review`: **62 findings → 57**; all 5 `focus-outline-none` errors resolved. The remaining 57 are the previously triaged items (38 hardcoded-colour, 9 false-positive `responsive-fixed-width`, 10 low-severity motion/pointer hints).
- Responsive: no horizontal overflow at 1440 or 390 on home, products and request-repair; 14 product cards and the live result count still render.
- Dock: unchanged geometry (70 px, 5 × 46 px items, `aria-current`), FAB now in a landmark, **no footer content covered**.
- `npm run typecheck` and `npm run build` pass.

Raw evidence: `qa/audit/verify-after.json`, `qa/audit/21st-review-after.json`, `qa/audit/layout-check.cjs`, `qa/audit/shots-after/`.

---

## 2. Findings, ordered by severity

### P0 — ship blockers

#### P0-1. Mobile menu is a modal that does not trap focus — **FIXED**
**Where:** `src/components/layout/Header.tsx:250–340`
**Evidence:** `qa/audit/runtime3.json` → `menuTrap`
**Observed:** the dialog declares `role="dialog" aria-modal="true"`, but after the 11th Tab stop (`Close menu`), focus moves to **“Explore Products”** in the page behind it (`inDialog: false`). `main` and `header` are neither `inert` nor `aria-hidden` (`mainInert: false, headerInert: false`).
**Impact:** keyboard and screen-reader users can interact with content that is visually hidden. WCAG 2.4.3 / 2.1.2. This is the most serious defect found.
**Fix:** trap Tab/Shift+Tab inside the dialog and apply `inert` (or `aria-hidden` + `tabindex="-1"`) to the rest of the page while open. Restore focus to the trigger on close (already works for Escape).

#### P0-2. Catalogue routes score “poor” on CLS (0.26–0.32) — **FIXED**
**Where:** `src/components/shared/PageFallback.tsx:3` (`min-h-[60vh]`)
**Evidence:** `qa/audit/footer-probe.json`, `qa/audit/runtime2.json` → `cls`
**Observed:** React first paints a 60vh spinner (540 px at 900 px viewport). Header + fallback = 651 px, so the **footer is visible in the first viewport**. When the lazy route chunk resolves ~1 s later, main grows from 540 px to 3 989 px, the footer moves from y=651 to y=4 100, and the document grows 1 152 → 4 601 px. Entire footer exits the viewport → CLS **0.323** desktop / **0.2635** mobile on `/products` and `/products/fireproof-safe`. Google’s “good” threshold is ≤ 0.1; > 0.25 is “poor”.
**Fix:** reserve at least one viewport of height in the fallback (`min-h-[calc(100svh-7rem)]`). Then the footer starts below the fold and route growth cannot shift visible content. Re-measure; target CLS < 0.05.

#### P0-3. Form / search focus indicators are effectively invisible — **FIXED**
**Where:** `src/components/forms/Fields.tsx:11`, `src/components/products/ProductFilters.tsx:53`, `src/components/forms/FormHandoff.tsx:83`
**Evidence:** `qa/audit/focus-check.json`
**Observed:** `outline-none` is a utility-layer class, so it **overrides the base-layer `:focus-visible` rule** in `src/styles/index.css:76`. Keyboard focus on the contact name field and catalogue search computed as `outline: 2px none` with only `box-shadow … royal/10` (~1.1:1 against white). The handoff textarea gets only a 1 px border colour change. WCAG 2.4.7 + 1.4.11.
**Note:** the 21st `focus-outline-none` errors are **not false positives** — this audit initially suspected they were; runtime proves them.
**Fix:** remove `outline-none` from these controls (the global `:focus-visible` then works) or add `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-royal`. Raise the ring to at least `royal/30` if kept.

#### P0-4. Per-route metadata exists only after JavaScript; unknown routes return HTTP 200 — **DEFERRED**
**Where:** `index.html` (static head), `src/hooks/useSeo.ts` (runtime injection), `vercel.json` (SPA rewrite)
**Evidence:** `qa/audit/seo-check.cjs` + raw `curl`
**Observed:** raw HTML for `/`, `/about`, `/products`, `/products/fireproof-safe`, `/services`, `/request-repair`, `/contact`, `/faq` all return the **same homepage title** and **no canonical, no description, no JSON-LD**. After JS, every route correctly sets unique title/description/canonical/OG and valid `LocalBusiness` / `Product` / `BreadcrumbList` / `FAQPage` / `ItemList` JSON-LD.
**Also:** `/definitely-not-a-page` returns **HTTP 200** (soft 404); `noindex` is applied only client-side.
**Impact:** WhatsApp/Facebook/LinkedIn/Slack previews and crawlers that do not execute JS see one page. Google may render JS, but this is avoidable risk.
**Fix:** prerender the 9 routes at build time (or generate static HTML per route). If prerendering is too large a change, at minimum add static canonical/OG defaults and return a real 404 for unknown paths (Vercel function or static 404 fallback).

### P1 — high value, low risk

#### P1-1. Home page has invalid list semantics — **FIXED**
**Where:** `src/components/home/ServicesOverview.tsx:67–70`, `src/components/home/WhyChoose.tsx:71–76`
**Evidence:** `qa/audit/runtime.json` → axe `list` (2) + `listitem` (11), serious, on home at 375 and 1440
**Observed:** `<ul>` contains `<Reveal>` (a `<div>`) as a direct child, and 11 `<li>` elements therefore have no list parent.
**Fix:** move the animation wrapper inside the list item: `<li><Reveal>…</Reveal></li>`, or make `Reveal` render `as="li"`.

#### P1-2. Text contrast failures — **FIXED**
**Evidence:** axe + computed WCAG ratios (`qa/audit/runtime.json`)
| Where | Class | Ratio | Size | Required |
|---|---|---:|---:|---:|
| `ProductFilters.tsx:117` | `text-muted/80` on white | **3.34** | 11 px | 4.5 |
| `ProductFilters.tsx:53` | placeholder `muted/80` | **3.34** | 13.5 px | 4.5 |
| `RequestRepair.tsx:363` | `text-white/35` on navy | **3.17** | 10 px | 4.5 |
| `Services.tsx:210` | `text-white/35` on navy | **3.17** | 11 px | 4.5 |
| `Footer.tsx:116` | `text-white/40` on navy | **3.72** | 11.5 px | 4.5 |
| `CtaBand.tsx:70`, `ConditionShowcase.tsx:50` | `text-white/40` | **3.72** | 11–11.5 px | 4.5 |
| `Header.tsx:294` | `text-white/30` (01–06) | **2.65** | 10 px | 4.5 |
| `Header.tsx:349` | `text-white/45` (Close menu) | **4.40** | 12 px | 4.5 |
| `WhyChoose.tsx:81` | `text-muted/70` (01) | **2.67** | 9.5 px | 4.5 |
**Fix:** `muted/80 → muted` (4.97), `white/35–40 → white/55` (5.87), `white/45 → white/60` (6.80), `muted/70 → muted`. Decorative index numbers can also be `aria-hidden` once contrast is acceptable.

#### P1-3. Landmark coverage — **FIXED**
**Where:** `src/components/layout/Header.tsx:56` (utility bar), `src/components/layout/MobileDock.tsx:88` (WhatsApp FAB)
**Evidence:** axe `region`, 3–4 nodes on every route
**Observed:** address, phone links and “Sales · Repairs · Maintenance” sit outside any landmark; the FAB is a bare `<a>`.
**Fix:** give the utility bar `role="region" aria-label="Location and contact"` (or move it inside the banner `<header>`), and place the FAB inside the existing `nav aria-label="Quick navigation"` or a labelled complementary region.

#### P1-4. `<aside>` nested inside `<main>` — **FIXED**
**Where:** `src/pages/RequestRepair.tsx:324`
**Evidence:** axe `landmark-complementary-is-top-level` (moderate) on `/request-repair`
**Fix:** change to `<section aria-label="Direct contact">` or a plain `<div>`.

#### P1-5. Footer phone links are 19.5 px tall — **FIXED**
**Where:** `src/components/layout/Footer.tsx:103–108`
**Evidence:** axe `target-size` (serious), 2 nodes on home and product detail
**Fix:** add `py-1` / `min-h-6` so the target is ≥ 24×24 px.

#### P1-6. Static assets revalidate on every visit — **FIXED** (pending deploy)
**Where:** `vercel.json` (no `headers`)
**Evidence:** `curl -I`
**Observed:** hashed JS and product WebP files return `cache-control: public, max-age=0, must-revalidate` (JS 483.9 KB uncompressed / ~145 KB gzip; image library 3.9 MB).
**Fix:** add `headers` rules — `/assets/(.*)` → `public, max-age=31536000, immutable`; `/images/(.*)` → `public, max-age=604800, stale-while-revalidate=86400` (names are not content-hashed, so avoid a year-long immutable cache for images).

### P2 — polish

- **Motion lint (21st):** 6 × `transition-all` (`CategoryGrid:73`, `ConditionShowcase:64`, `ServicesOverview:85`, `ProductCard:18,42`, `Button:38`), 2 × `hover:scale` (`CategoryGrid:123`, `ProductCard:33`), 1 × 700 ms image zoom (`ProductCard:33`). Replace `transition-all` with `transition-[transform,border-color,box-shadow]`; no runtime jank observed, reduced-motion pass is clean.
- **Disabled affordance:** `Button.tsx:38` uses `disabled:pointer-events-none`, so a disabled button never shows `cursor: not-allowed`. Add `disabled:cursor-not-allowed`.
- **Image weight:** `Logo.tsx:17` loads `emblem.webp` at 65.9 KB for a 46 px render; home category thumbs load 1200 px masters at ~128 px. Generate 128/256 px variants. Hero image already has `fetchpriority="high"` and uses the 640 px variant.
- **FAQ chip scroller:** `FAQ.tsx:55` overflows horizontally below 430 px. It is intentional and the page itself does not overflow, but add a visible scroll cue or `aria-label` on the scroll region.
- **Design tokens:** of 38 `design-hardcoded-color` findings, **21 are the token definitions in `src/styles/index.css`** (false positives). The other 17 are real drift: error reds (`#B42318`, `#D92D20`), success green (`#256B45`), WhatsApp green (`#25d366`), badge tints. Add `--color-danger`, `--color-success`, `--color-whatsapp` and use them.
- **Micro focus management:** closing the desktop Products dropdown with Escape leaves focus on `<body>` instead of the trigger (`Header.tsx`). Return focus to the trigger.
- **Logo tagline:** 7 px on mobile / 8.5 px desktop (`Logo.tsx:29`) is below a comfortable legibility floor; consider 8.5/10 px.

---

## 3. 21st.dev deterministic review — triage

Command: `npx --yes @21st-dev/cli@latest review src index.html --json` → 62 files, 62 findings.

| Rule | Count | Verdict |
|---|---:|---|
| `focus-outline-none` | 5 | **Genuine** (confirmed in runtime). Fields, ProductFilters, FormHandoff textarea are user-facing; the two programmatic-focus targets (Layout `<main>`, FormHandoff `<h2>`) are lower impact. |
| `responsive-fixed-width` | 9 | **All false positives.** Decorative absolute circles inside `overflow-hidden`, `max-w-[640px]` headings, and `max-w-[1280px]` containers with padding. Runtime found no document overflow at 320/375/430/768/1024/1440. |
| `motion-transition-all` | 6 | Genuine, low severity. |
| `motion-hover-scale` | 2 | Genuine, low / subjective (transform-only, no layout shift). |
| `motion-long-duration` | 1 | Genuine, subjective (700 ms zoom). |
| `interaction-disabled-pointer` | 1 | Genuine, low (`cursor: not-allowed`). |
| `design-hardcoded-color` | 38 | 21 false positives (token definitions in `index.css`); 17 valid design-system drift. |

**21st inspiration benchmark** (metadata-only ranking; confidence 0.54–0.66):
- Hero: “Classy Hero” (0.61), “Hero 45” (0.58) — the current asymmetric editorial hero already matches this tier; no redesign justified.
- Catalogue: “Shop by Category Grid” (0.60), “Product Card” (0.54) — current cards are comparable; adding price/spec badges would be a product decision, not a fix.
- Dock: “Floating Dock” (0.66), “Mac-Style Floating Dock” (0.62) — current glass dock is already in the same pattern and intentionally avoids magnification.
- Services: “Services” (0.60), “Services List” (0.59) — current numbered list matches.
- Contact: “CTA Section” (0.62) — current split contact/handoff is stronger for a WhatsApp-first business.

No 21st result justified a visual redesign. All recommendations above are correctness/performance fixes.

---

## 4. What passed

- **Responsive:** 54 route × width combinations (9 routes × 320/375/430/768/1024/1440). No document-level horizontal overflow, no console errors, no failed requests. Only the intentional FAQ chip strip scrolls horizontally.
- **Images:** 30 WebP files (14 products × 1200×900 + 640×480, plus branding), 3.9 MB total, all local. After a full scroll there are **0 broken images**; all `<img>` have `width`/`height`; product cards use `srcset`/`sizes`; alt text is meaningful; no external image URLs in source or `dist`.
- **Forms:** empty submit produces 7 (`/contact`) and 9 (`/request-repair`) `aria-invalid` fields, `role="alert"` messages, and moves focus to the first invalid field. Valid submit reaches “Your message is ready” / “Your repair request is ready” with 0 errors. Nothing is auto-sent; WhatsApp handoff is explicit.
- **Keyboard:** skip link is visible on first Tab, moves focus to `#main`; 2 px visible outline on nav links/buttons; Escape closes the mobile menu and returns focus; body scroll locks. Desktop Products dropdown: `aria-expanded` toggles, Tab enters the menu, Escape closes.
- **Mobile dock:** fixed, 70 px tall, 24 px backdrop blur, safe-area padding, 5 items with `aria-current="page"`, 46 px targets. Footer spacer clears it; automated bottom-of-page check found **no footer link covered**.
- **Reduced motion:** 0 elements with animations/transitions > 0.05 s under `prefers-reduced-motion: reduce`; H1 remains visible.
- **Runtime SEO:** unique titles, descriptions, canonicals and OG per route; JSON-LD types correct; 404 `noindex`; sitemap 21 URLs; robots.txt valid.
- **Content honesty:** no lorem/TODO/placeholder text; prices are “on request”; reference photos labelled; the Targetmax image is explicitly flagged as a reference.
- **Perf baseline:** 413–626 KB transfer, 0 long tasks, LCP 1.8–3.9 s, TTFB 0.5–0.95 s (observed from this network; route-chunk timing drives the CLS).

---

## 5. Recommended sequence

1. ~~**P0-1** mobile focus trap + inert background~~ — done
2. ~~**P0-2** fallback min-height + verify CLS < 0.05~~ — done (CLS ≤ 0.009)
3. ~~**P0-3** restore visible focus outlines~~ — done
4. ~~**P1-1/3/4/5** list semantics, landmarks, aside, footer targets~~ — done
5. ~~**P1-2** contrast token pass~~ — done
6. ~~**P1-6** cache headers~~ — done (deploy to activate)
7. **P0-4** prerender + real 404 (~2–4 h, separate change) — **open**
8. **P2** motion/token/image polish (optional)

Verification already run: `21st review` (57 findings, 0 focus errors), `npm run typecheck`, `npm run build`, and `qa/audit/verify-after.cjs` (CLS, axe, focus trap, dock).

---

## 6. Evidence index

| File | Contents |
|---|---|
| `qa/audit/21st-review.json` | Full 21st CLI output (62 findings) |
| `qa/audit/runtime.json` | 54 route×width checks, axe violations, images, touch targets, console/network |
| `qa/audit/runtime2.json` | CLS sources, dock geometry, menu state, form completion, full-scroll image check |
| `qa/audit/runtime3.json` | Focus-trap sequence, forms, focus ring, headings, link crawl |
| `qa/audit/focus-check.json` | Keyboard focus measurements on inputs/textarea |
| `qa/audit/footer-probe.json` | Timeline proving the CLS cause |
| `qa/audit/axe-states.cjs` | Axe on contact, menu-open and form-error states |
| `qa/audit/shots/` | Desktop/mobile screenshots |

*Visual-design notes are labelled subjective. The vision helper was rate-limited during this run, so visual observations are based on the rendered screenshots from prior QA and on the design tokens/source.*
