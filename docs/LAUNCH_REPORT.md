# Launch Audit Report — lisacolliorealtor.com

**PR 8 — Launch audit + fixes · July 21, 2026**
Scope: all 64 HTML pages (63 public pages + the 404 utility page), sitewide CSS,
images, sitemap, robots, and Netlify configuration. Statuses: **PASS** (already
correct), **FIXED** (defect corrected in this PR), **FLAGGED** (needs Lisa
and/or managing-broker review — no change made).

---

## 1 · Compliance audit

### 1.1 Identity
| Check | Status | Notes |
| --- | --- | --- |
| Brand name "Lisa Collio, Real Estate Agent" (with comma) | PASS | No comma-less "Lisa Collio Real Estate" anywhere. Article outro blocks stack "Lisa Collio" / "Real Estate Agent" on separate lines — rendered correctly. |
| Phone only (574) 370-5410 | PASS | Every Lisa phone reference and every `tel:` link is (574) 370-5410. The only other number on the site is HUD's fair-housing complaint line 800-669-9777 on /fair-housing/ — that is part of the approved legal page and refers to HUD, not Lisa (see FLAGGED note F3). |
| Email only lisacolliorealtor@gmail.com | PASS | No other email appears. |
| License #RB21002460 in every footer | PASS | Present on all 64 pages via the locked footer signature. |

### 1.2 Banned strings
| Check | Status | Notes |
| --- | --- | --- |
| "Northern Indiana" | **FIXED** | Two occurrences of "in Elkhart County in northern Indiana" (living-in-goshen line 135, living-in-elkhart line 135 — pages renamed from communities/* in Batch 2f) → now "in Elkhart County, Indiana". |
| "norte de Indiana" (ES equivalent) | **FIXED** | Four occurrences on /es/comunidades/goshen/ and /es/comunidades/elkhart/ → now "del/en el condado de Elkhart, Indiana". |
| 574-975-0141 | PASS | Zero occurrences. |
| "surrounding areas" as service area | PASS | Zero occurrences (EN and ES equivalents checked). |
| "Elkhart County" outside verifiable-stat contexts | PASS / FLAGGED | All blog/article occurrences are MLS source citations ("Elkhart County Board of REALTORS® MLS") or the mid-year-post title — verifiable-stat contexts. Remaining uses are Census/geographic facts on the community pages and the jurisdiction clause in the approved Terms of Use — see F1. |
| Superlatives Top/Best/#1 | PASS | All 80+ hits reviewed individually. Every one is either (a) the locked "Top 20% Elkhart County" / MLS-sourced "top 18%" stat, (b) an approved article title ("…for the Best Price"), or (c) generic lowercase prose inside approved articles ("the best next step is a conversation", "overpricing is the number one reason homes sit"). No self-promotional "Top/Best/#1 agent" claim exists — two articles explicitly disclaim such claims. |

### 1.3 Brokerage naming
| Check | Status | Notes |
| --- | --- | --- |
| Full "RE/MAX Results, The Viruez Team" when named in text | PASS | Header/footer lockups carry both lines sitewide; prose references use the full form. |
| RE/MAX always slashed in text | PASS | Slash-free "REMAX" appears only inside logo image files/filenames. |

### 1.4 Marks
| Check | Status | Notes |
| --- | --- | --- |
| ™ on all four method brands | PASS | The Next Chapter Method™, Tu Próximo Capítulo™, Smart Move Framework™, Unlocking Smart Moves™ — no unmarked occurrence. |
| ® only on third-party marks | PASS | REALTOR®/REALTORS®, NAR®, SRES®, RE/MAX®, plus Children's Ministries Institute® (a third-party institution's own registered mark, used in Lisa's approved bio). No ® on any Lisa brand; no ™ on any third-party mark. |

### 1.5 Footer stack
| Check | Status | Notes |
| --- | --- | --- |
| Six locked items, verbatim, in order, on every page incl. 404 | PASS | Single-sourced from components/footer.html; verified byte-for-byte on all 64 pages. |

### 1.6 Language purity
| Check | Status | Notes |
| --- | --- | --- |
| EN pages: no Spanish beyond the badge | **FIXED** / PASS | The /blog/ index card for the Spanish section carried a Spanish description sentence → now English ("Spanish-language articles for buyers — clear, complete, and pressure-free."). The card title "En Español" remains as the section's name, lang-tagged `lang="es"` (wayfinding, like the badge). Remaining diacritics on EN pages are proper nouns only (José Luis M., María Baltazar) inside approved articles. |
| ES pages: no English beyond the toggle + proper nouns | PASS | The locked EN footer signature/statements are the documented exception; "RV Capital of the World" on /es/comunidades/elkhart/ is an English epithet correctly tagged `lang="en"`. |
| 404 bilingual | PASS | Documented exception (bilingual wayfinding page). |

### 1.7 Reviews
| Check | Status | Notes |
| --- | --- | --- |
| Reviews verbatim | PASS | All 16 review cards checked. Quotes match their approved sources character-for-character, including preserved typos and emojis ("vienes y raises", "Alyuda", 😊, 💯, 👍). Noel Trejo's review appears on two pages — byte-identical in both. Names display exactly as on Google (EliteGodGamer, fitness_pacojf P.F kept as-is). |
| Photos only per pairing map | PASS | Every review photo pairs with that client's own review per content/review-photo-map.md. Natalie Tiscareno's photo (shows her parents) is used only with her review, per the map. |
| Lender names never with photos | PASS | Sergio Gomez, Lucia Sanchez, and Zachary Fletcher appear nowhere on the site (neither text nor photos). |
| Google badge + 5.0 ★ · 39 | PASS | Consistent everywhere reviews appear; schema matches (see §4). |

### 1.8 Addresses
| Check | Status | Notes |
| --- | --- | --- |
| Street addresses only in Recently Sold bands | PASS | The four sold-listing addresses appear only inside the Recently Sold bands on /sellers/ and /es/vendedores/ (captions + matching alt text inside the band). Office address 1918 Elkhart Rd appears in contact/footer/schema contexts as intended. |
| homes-general/ carries no address or city name | PASS | Filenames, captions, and alt text checked. |

### 1.9 RESPA
| Check | Status | Notes |
| --- | --- | --- |
| No dollar figures outside approved market-stats/mid-year figures | PASS | All "$" hits are the locked "$20M+" track record or MLS-sourced figures inside the market-stats page/mid-year post and source-cited approved articles. |
| No interest-rate references | PASS | The single rates FAQ ("Should I wait for interest rates to go down?") answers with no numeric or directional rate claim — compliant with the no-rate rule's allowance for general, non-numeric statements. |
| Program percentages | PASS | FHA 3.5% / USDA 0% down-payment minimums appear only in the approved Spanish article set and the /es/compradores/ hub FAQ, verbatim from the approved source, CFPB-cited. The approved set's own RESPA note documents these as published program facts, not lending offers. |
| No qualification predictions | PASS | Language consistently defers to "a licensed lender" / "un prestamista con licencia". |
| Agent-not-lender statement in every footer | PASS | Locked footer item 3, all 64 pages. |

---

## 2 · Accessibility

| Check | Status | Notes |
| --- | --- | --- |
| Meaningful, language-matched alt on every img | PASS | All images carry alt; decorative images (RE/MAX balloon next to the visible wordmark, icons) use empty alt + aria-hidden. ES pages have Spanish alt text. |
| One H1 per page | PASS | Exactly one on all 64 pages. |
| Logical heading order | **FIXED** | The five blog index pages (blog/buyers, sellers, community, market-updates, spanish) jumped h1 → h3 on article cards. Card headings are now h2 (36 headings), with CSS updated so the visual size is unchanged. |
| Contrast / gray never text | PASS | `--gray #AAAAAA` is used exclusively for borders/dividers in the CSS; body text is black/navy-ink on warm-white; red/crimson only on buttons, badges, and display elements. |
| Visible focus states | PASS | Global `:focus-visible` outline (3px RE/MAX blue) on all interactive elements; skip link visible on focus; the hidden mobile-menu checkbox forwards focus styling to its label. |
| Keyboard-operable nav | PASS | Mobile menu uses a focusable checkbox + label (Space toggles). The Communities dropdown opens on hover **and** `:focus-within`, so keyboard users can Tab into it; menu items are plain links. CSS-only, no ARIA state to desync. |
| html lang per page | PASS | `lang="en"` / `lang="es"` correct on all pages; inline `lang` attributes on cross-language snippets (badge, "En Español" card, English epithet). |
| Skip-to-content link | PASS | Present on all 64 pages, targets `#main`. |
| Tap targets | **FIXED** | Open-mobile-menu links enlarged to ≥44px; footer legal links given padded ≥30px targets. Buttons/CTAs were already ~48px. |
| Width/height on images (CLS) | **FIXED** | 13 review photos lacked width/height attributes → added actual pixel dimensions. Hero and Recently Sold dimensions refreshed to match the recompressed files. |

---

## 3 · Performance

| Check | Status | Notes |
| --- | --- | --- |
| WebP with fallback | PASS | Every content photo is served via `<picture>` with a WebP source + JPEG fallback. |
| No multi-MB images shipped | **FIXED** | 15 referenced image pairs recompressed and resized to display-appropriate dimensions (1200–1600px long edge, JPEG q82 / WebP q78): total referenced image weight dropped from ~30 MB to ~3 MB. Worst offenders: buyers hero 4.7 MB → 386 KB (+ WebP 2.0 MB → 265 KB), homepage hero 3.2 MB → 231 KB, review photos up to 4.4 MB → 100–390 KB each. |
| Header logo | **FIXED** | assets/images/logos/lisa-collio-logo.svg contained two 938×938 embedded rasters (1.06 MB, loaded on every page). Rasters downscaled to 400px and re-encoded (mask PNG + JPEG artwork): now 101 KB. Rendering verified in-browser at desktop and mobile sizes. |
| Below-the-fold lazy loading | **FIXED** | Added `loading="lazy"` to the footer EHO logo (all pages via the footer partial), the Google-reviews badge (8 pages), the fair-housing body EHO logo, and remaining below-fold photos. Hero/LCP images intentionally stay eager. |
| Fonts | PASS | Both families self-hosted woff2, preloaded on every page, `font-display: swap`. |
| CSS minified | **FIXED** | Readable sources moved to assets/css/src/; pages now serve minified tokens.css + site.css (30.5 KB → 19.9 KB) generated by `npm run css` (wired into `npm run build`; README updated). |
| Zero third-party requests | PASS | No external scripts, styles, fonts, images, or connects anywhere — enforced by the Netlify CSP (`default-src 'self'`). Outbound *links* exist only as citations/navigation: CFPB citations required by the approved Spanish articles, HUD/Indiana Civil Rights Commission on the fair-housing page, and a Google Maps directions link on the contact pages. Links trigger no page-load requests. |

---

## 4 · SEO / technical

| Check | Status | Notes |
| --- | --- | --- |
| Titles 50–60 chars, unique, language-matched | **FIXED** | 19 pages had short titles (38–49 chars) → rewritten to 50–60, brand rules intact, all unique. Matching JSON-LD `name` fields synced. |
| Meta descriptions 145–160 | **FIXED** | 7 pages out of range (137–181) → rewritten to 145–160, language-matched. |
| Canonical, https origin, trailing slashes | PASS | Every public page carries a correct self-canonical. 404.html intentionally has **no canonical + `noindex`** (utility page — documented exception). |
| hreflang bidirectional, x-default → EN | PASS | All 8 EN/ES pairs verified both directions on-page **and** in sitemap annotations; every x-default points to the EN twin. |
| sitemap.xml = exactly the public pages | **FIXED** | One duplicate `<url>` entry (good-time-to-buy article) removed → 63 URLs = 63 public pages; 404 correctly excluded; robots.txt references the sitemap. |
| JSON-LD parses; schema facts match locked identity | PASS | Every ld+json block on all 64 pages parses. areaServed = Goshen, IN + Elkhart, IN only; AggregateRating 5.0 / 39 (Google only); RealEstateAgent facts match the locked identity. |
| BreadcrumbList on articles | PASS | Present on all 33 article pages. |
| Internal links | PASS | Zero broken internal links or assets; zero orphan pages (every public page reachable). |

---

## 5 · Mobile

| Check | Status | Notes |
| --- | --- | --- |
| Viewport meta | PASS | All 64 pages. |
| No horizontal scroll at 360px | PASS | Verified in headless Chromium across 15 representative pages (homepage pair, hubs, articles EN/ES, market-stats, contact, blog indexes, 404): 0px overflow everywhere. |
| Mobile nav | PASS | Checkbox-toggle menu opens/closes on every template; verified at 360px. |
| Tap targets | **FIXED** | See §2. |
| Recently Sold bands / review cards stack cleanly | PASS | Verified visually at 360px. |

---

## 6 · Fixes made (summary list)

1. Removed "northern Indiana" (EN ×2) and "norte de Indiana" (ES ×4) phrasing on the four community pages.
2. English description for the "En Español" card on /blog/.
3. Removed duplicate sitemap entry for /blog/buyers/good-time-to-buy-home-goshen-indiana/.
4. Blog index card headings h3 → h2 on five index pages (heading order), CSS updated to keep the visual size.
5. Added width/height to 13 review photos; refreshed stale dimension attributes on 3 hero and 8 Recently Sold images.
6. Recompressed/resized 15 referenced image pairs (~30 MB → ~3 MB).
7. Optimized the header logo SVG's embedded rasters (1.06 MB → 101 KB).
8. Added `loading="lazy"` to footer EHO logo (sitewide), Google-reviews badge, fair-housing body EHO logo, and remaining below-fold photos.
9. Minified served CSS with readable sources under assets/css/src/ (`npm run css`; README updated).
10. Rewrote 19 page titles to 50–60 chars and 7 meta descriptions to 145–160 chars (JSON-LD names synced).
11. Enlarged mobile-menu and footer-link tap targets.

## 7 · FLAGGED for Lisa / managing broker (no changes made)

- **F1 — "Elkhart County" geographic facts.** The community pages use "Elkhart County" in Census-sourced geography ("county seat of Elkhart County", "roughly 208,000 residents", RV-industry facts), and the approved Terms of Use uses it in the courts-jurisdiction clause. These read as verifiable facts, not service-area claims, and the article/MLS citations are clearly allowed — but the community-page uses sit outside the three contexts enumerated in the launch checklist (market-stats page, mid-year post, footer stat). Please confirm they may stand; if not, the community pages need re-approved copy.
- **F2 — FHA/USDA program percentages on /es/compradores/.** Verbatim from the approved Cluster 1 hub FAQ with CFPB sourcing (the approved set's internal RESPA note explicitly covers them as published program facts). Flagged only so the broker sign-off explicitly covers a hub page (not just articles) carrying program percentages.
- **F3 — /fair-housing/ third-party contact info.** The approved legal page lists HUD's complaint line 800-669-9777 and links to hud.gov / in.gov/icrc. This is standard and clearly attributed to HUD; noted here because the launch checklist says the site's only phone number is Lisa's.
- **F4 — CLAUDE.md path note.** CLAUDE.md (which mirrors the Master Plan) says the design system lives in `assets/css/tokens.css`; the editable sources now live in `assets/css/src/` (the served files are generated). Fold this into the next CLAUDE.md regeneration — not changed here since that file updates with Master Plan version bumps.

## 8 · Verification basis for reviews

Review texts were verified against, in order: the approved content sets in
content/approved/ (where the review or its excerpt appears), the PR-approved
review texts supplied with each page build, and content/review-photo-map.md
for pairing rules. Cross-page duplicates (Noel Trejo) are byte-identical. No
discrepancies found; nothing needed the "shown as written" disclaimer removed
or altered.
