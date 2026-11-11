# Murphy Ventures Technical Services — Website

A production-ready marketing site for **Murphy Ventures Technical Services**, a Lagos-based supplier of new and fairly used banking & office equipment and provider of equipment repairs.

Built with React, Vite, TypeScript, Tailwind CSS v4 and Framer Motion. No e-commerce, accounts, admin or backend — enquiries are prepared locally and handed off to WhatsApp.

---

## Quick start

```bash
npm install
npm run dev        # local dev server
npm run typecheck  # TypeScript only
npm run build      # typecheck + production build to dist/
npm run preview    # serve the production build locally
```

Requires Node 20+.

The production output is a static site in `dist/` — deploy to any static host (Netlify, Vercel, Cloudflare Pages, S3 + CDN, Nginx). Configure an **SPA fallback** (`/* → /index.html`) so deep links such as `/products/fireproof-safe` resolve.

---

## Pages / routes

| Route | Purpose |
| --- | --- |
| `/` | Home — hero, categories, featured equipment, services, about, contact |
| `/about` | Company profile and approach |
| `/products` | Catalogue with search, category and condition filters (URL-synced) |
| `/products/:slug` | Product detail with enquiry handoff |
| `/services` | Repair and maintenance services |
| `/request-repair` | Repair request form → prepared WhatsApp message |
| `/contact` | Contact details, map, enquiry form |
| `/faq` | Grouped FAQs with anchor navigation |
| `*` | Branded 404 page |

---

## Editing content

Everything that changes regularly is data or config — no component edits needed.

| What | File |
| --- | --- |
| Phone numbers, WhatsApp line, address, domain, price guidance, nav | `src/config/site.ts` |
| Product catalogue | `src/data/products.ts` |
| Product categories | `src/data/categories.ts` |
| Services | `src/data/services.ts` |
| FAQs | `src/data/faq.ts` |
| Form fields and validation rules | `src/lib/validation.ts` |
| WhatsApp / enquiry message wording | `src/lib/whatsapp.ts` |
| Shared SEO + JSON-LD helpers | `src/lib/schema.ts`, `src/hooks/useSeo.ts` |
| Theme tokens (colours, fonts, shadows) | `src/styles/index.css` |

### Contact details

All phone links, WhatsApp links, the address, map links, price guidance and canonical URLs read from `src/config/site.ts`. Update it once and the whole site follows.

### WhatsApp (important)

`whatsapp.number` is set to `2348023310563` (the primary line). **The client has not confirmed which line is WhatsApp** — confirm before launch and change only `whatsapp.number` / `whatsapp.display`.

---

## Enquiry flow (no backend)

Both forms (`/request-repair`, `/contact`) validate client-side with React Hook Form + Zod. On a valid submission the site:

1. builds a pre-written WhatsApp message,
2. displays it in an editable/read-only preview,
3. offers **Open WhatsApp to send**, **Copy message** and **Edit details**.

Nothing is transmitted by the website and no "sent" confirmation is shown. The visitor presses send inside WhatsApp. See `src/components/forms/FormHandoff.tsx` and `src/lib/whatsapp.ts`.

---

## Design system

- **Colours:** Midnight Navy `#091B3B`, Royal Blue `#153B75`, Champagne Gold `#C49A45`, Warm Ivory `#F7F6F2`, Steel Slate `#26364B`, Muted Grey `#667085`, White, Soft Border `#E5E7EB`.
- **Type:** Manrope (display/headings), Inter (body), self-hosted variable fonts via `@fontsource-variable`.
- **Tokens:** defined CSS-first in `src/styles/index.css` under `@theme` (Tailwind v4).
- **Motion:** Framer Motion with `prefers-reduced-motion` respected globally; reveals and accordions fall back to static content.

---

## Assets

```
public/images/branding/   emblem, full logo, favicons, apple-touch icon, og-image.jpg
public/images/products/   six hand-drawn SVG product illustrations
```

- The supplied emblem is used unmodified; the header pairs it with a typographic lockup, while the full supplied logo is used in larger brand contexts.
- **No product photography was supplied.** Product visuals are original line illustrations labelled “Illustration shown” on detail pages. Replace them with real photos when available.
- `og-image.jpg` (1200×630) is generated from the brand palette and emblem.

---

## SEO

- Per-route `<title>`, description, canonical, Open Graph and Twitter tags via `useSeo`.
- JSON-LD: `LocalBusiness` (home), `BreadcrumbList` (inner pages), `Product` (detail), `ItemList` (catalogue), `FAQPage` (FAQ).
- `public/sitemap.xml` (21 URLs) and `public/robots.txt`.
- **Before launch:** set the real domain in `src/config/site.ts` (`site.url`), then update the absolute URLs in `index.html`, `public/sitemap.xml` and `public/robots.txt` to match.

---

## Accessibility

- Skip link, single H1 per page, landmark regions, labelled form controls with inline errors (`aria-invalid`, `aria-describedby`), `aria-live` result counts, focus moved to the handoff heading after submit.
- Accordions use `aria-expanded` / `aria-controls`; mobile menu traps body scroll, closes on Escape and restores focus.
- Visible focus styles, reduced-motion support, 320px+ responsive layout.

---

## Quality checks performed

- `npm run typecheck` — clean.
- `npm run build` — production build succeeds.
- Manual/automated browser QA across 320 / 375 / 430 / 768 / 1024 / 1440 px: zero horizontal overflow; one H1 per page; no missing image alts, unnamed controls or unlabelled fields.
- Filters, search, empty state, URL parameters, product deep links, accordions, mobile menu + Escape, form validation and WhatsApp handoff verified.
- 404 routes (unknown page and unknown product slug) return the branded not-found page with `noindex`.

---

## Known gaps / client input required

1. **WhatsApp line confirmation** — which number receives WhatsApp messages.
2. **Live domain** — `murphyventures.ng` is a placeholder used for canonical URLs, OG tags, sitemap and robots.
3. **Opening hours** — deliberately not published; the site asks visitors to call first.
4. **Email address** — not supplied; shown as “Email not yet published”.
5. **Confirmed prices, models and stock** — every listing is “Price on Request” with availability “unknown”; the ₦120,000–₦1,800,000 range is guidance only.
6. **Product photography** — illustrations are temporary placeholders.
7. Optional: delivery/coverage policy, warranty terms, staff/company history details, testimonials (none were supplied and none were invented).

---

## Deployment

Not deployed. To publish:

1. Set the real domain in `src/config/site.ts` and update absolute URLs in `index.html`, `public/sitemap.xml`, `public/robots.txt`.
2. `npm run build`.
3. Upload `dist/` to the host and enable SPA fallback to `index.html`.
4. Submit `https://<domain>/sitemap.xml` to Google Search Console.
