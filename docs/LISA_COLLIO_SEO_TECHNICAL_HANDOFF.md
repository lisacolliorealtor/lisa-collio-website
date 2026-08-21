# Lisa Collio Website — SEO Technical Handoff

**Audit date:** 21 August 2026
**Repository:** `lisacolliorealtor/lisa-collio-website`
**Branch audited:** `claude/lisa-collio-seo-audit-17xp8z` (cut from `main`)
**Commit:** `5db404515b57b18e8253fda87caed07485dfd20b` (merge of PR #154, 20 August 2026)
**Scope:** Facts only. No code, content, configuration, or asset was modified by this audit.
**Purpose:** Input document for a downstream competitive/strategic SEO audit. This document reports **what is implemented**, not what should change.

### How to read this document

Every claim is one of:

| Marker | Meaning |
|---|---|
| **VERIFIED** | Measured directly from the committed files, a local render, or a local HTTP request. Reproducible with the commands in §22. |
| **PLANNED / NOT IMPLEMENTED** | Described in a project document but absent from the code. |
| **NOT VERIFIED** | Requires access this audit did not have (production DNS, Search Console, GBP, analytics, the legacy site). Collected in §19. |

Counts in this document come from parsing the committed HTML, not from the sitemap and not from the project's planning documents. Where the repository's own documents disagree with the code, the code is reported and the disagreement is named.

---

## 1. Executive Summary

### What the site actually is

157 committed HTML pages: 82 English, 75 Spanish. 113 blog articles (57 EN, 56 ES), 7 blog hub pages, 35 main/legal/utility pages, one 404. All 157 render, all return HTTP 200 locally, zero broken internal links, zero broken images, zero console errors. Every asset reference is content-hashed. The repository's own audit harness (`npm run audit`, 156 pages / 23 checks) passes with one warning.

**This is an unusually well-built static site.** The technical hygiene that most agent sites fail — canonical correctness, hreflang reciprocity, schema entity consistency, alt-text discipline, redirect coverage — is largely done, and done properly. The findings below are not a rescue list; they are the gap between "correctly built" and "competitive for the target queries."

### The five findings that matter most

1. **CRITICAL — The on-page language switcher points at the wrong page on 77 of 134 paired pages.** Every blog article's "Hablo español" / "English" badge falls back to the *language home page* instead of that article's twin, while the `<link rel="alternate">` in the same page's `<head>` points correctly. The badge carries an explicit `hreflang` attribute, so the page emits two contradictory language signals, and a bilingual reader who clicks it is dumped on a hub. Because the header/footer chrome is the *only* EN↔ES link on the site (in-content cross-language links measure **zero**), this is the entire bilingual user journey for 77 pages. §5, §9, §15.

2. **CRITICAL — Open Graph is 6% implemented.** Zero of 157 pages carry `og:title`, `og:description`, `og:url`, `og:type`, `og:site_name`, or `og:locale`. Only `og:image` (96 pages) and `twitter:card`/`twitter:image` (90 pages) exist; 61 pages — including **the homepage, `/es/`, `/buyers/`, `/sellers/`, `/about/`, `/contact/`, and every Spanish main page** — have no Open Graph tags at all. This is already tracked as an open item in the project's own punch list (§443). §3.

3. **HIGH — 22 of 67 EN/ES pairs are asymmetric in FAQ coverage, and it is real content divergence, not a schema slip.** 14 Spanish articles have **no FAQ section and no `FAQPage` schema** while their English twins have both — all 12 twins of the `/blog/sellers/` cluster, plus `/blog/spanish/buen-momento-comprar-casa-goshen/` and `/blog/spanish/que-hace-diferente-lisa-collio/`. 7 English Elkhart community articles have the inverse. Verified by checking for the visible `Preguntas frecuentes` / `Frequently Asked Questions` heading, not only the schema. This is the direct cause of the word-count deficit on those pairs (ES/EN ratio 0.37–0.54). It is **not** tracked in `docs/EN_ES_DIVERGENCE_INVENTORY.md`, which covers only the community cluster and is marked CLOSED. §2, §10.

4. **HIGH — There is no `sameAs` property anywhere on the site.** Zero occurrences across 157 pages. Lisa Collio's `Person` and `RealEstateAgent` entities are internally consistent and correctly cross-referenced by `@id`, but they are connected to **nothing external** — no Google Business Profile, no Facebook, no Instagram, no LinkedIn, no Zillow, no realtor.com, no RE/MAX agent page. Neither entity carries an `image` either. For the entity-resolution work the target queries depend on, this is the single largest structured-data gap. §7, §8.

5. **HIGH — Page weight is 4.3 MB – 20 MB per page.** Hero images are 1.6–3.1 MB JPEGs delivered through a CSS custom property (`--hero-img:url(...)`), which bypasses the `<picture>`/WebP negotiation the rest of the site uses correctly. `/blog/` transfers ~20 MB, `/blog/spanish/` ~16 MB, `/about/` 8.4 MB, the homepage 6.6 MB. 124 raster images have no `.webp` sibling. Core Web Vitals will not pass in this state. §16.

### Directly relevant to the stated query targets

| Target query | Dedicated page? | Status |
|---|---|---|
| REALTOR® in Goshen, Indiana | No | Phrase "realtor in Goshen" appears **0 times** sitewide, in any field |
| Real estate agent in Goshen, Indiana | Partial | In `<title>` on 2 pages, `<h1>` on 5; no dedicated page |
| Spanish-speaking REALTOR® in Goshen | **No dedicated page** | One blog article (`/blog/community/does-lisa-collio-speak-spanish/`) is the only asset. §11 |
| bilingual REALTOR® in Goshen | **No dedicated page** | "bilingual" in `<title>` on exactly 1 page, `<h1>` on 1 |
| realtor que habla español en Goshen | **No dedicated page** | Exact phrase: **0 occurrences**. §12 |
| agente de bienes raíces en Goshen Indiana | Partial | Strong: in 8 ES titles, 4 ES H1s |
| **agente inmobiliario en Goshen Indiana** | **No** | The term "agente inmobiliario" appears **0 times on the entire site** |
| Goshen Indiana real estate | Partial | Covered by community pillars; exact phrase 0 times |
| Elkhart County real estate | Weak | `areaServed` schema names Goshen and Elkhart **cities only**, never Elkhart County |

### Issue counts

| Severity | Count |
|---|---|
| CRITICAL | 2 |
| HIGH | 8 |
| MEDIUM | 11 |
| LOW | 9 |
| VERIFIED GOOD | 18 |

Full list with file paths: §20.

---

## 2. Complete URL Inventory

**VERIFIED.** 157 HTML pages exist in the repository (excluding `components/`, `docs/`, `assets/`). All 157 returned HTTP 200 from a local static server replaying `netlify.toml`'s rules.

Machine-readable full inventory — every field the brief asked for, per page — is in the companion file **`docs/LISA_COLLIO_SEO_DATA.json`**, key `pages[]`. Summary here.

### 2.1 Totals

| Metric | Count |
|---|---|
| HTML pages in repo | 157 |
| English (`<html lang="en">`) | 82 |
| Spanish (`<html lang="es">`) | 75 |
| Sitemap entries | 154 |
| Pages in sitemap | 154 (100% of indexable pages) |
| Pages NOT in sitemap | 3 — all deliberate (`/404.html`, both thank-you pages) |
| Pages with `noindex` | 3 (the same 3) |
| Indexable pages | 154 |
| Blog articles | 113 (57 EN, 56 ES) |
| Blog hub / category pages | 7 |
| Main content pages | 24 |
| Legal pages | 12 |
| Utility (404, thank-you) | 3 |
| hreflang pairs declared | 67 (134 pages) |
| Pages with real content (>150 words) | 152 |
| Pages that are thin/utility | 5 |
| Pages with placeholder content | **0** |
| Broken internal links | **0** |
| Pages linked from navigation chrome | 157 (all pages carry header + footer) |

### 2.2 Main pages — English

| URL | Source file | Type | ES equivalent | In nav | Sitemap | Indexable | Words | FAQs |
|---|---|---|---|---|---|---|---|---|
| `/` | `index.html` | homepage | `/es/` | Yes | Yes | Yes | 1244 | 4 |
| `/about/` | `about/index.html` | bio | `/es/conozca-a-lisa/` | Yes | Yes | Yes | 1452 | 6 |
| `/buyers/` | `buyers/index.html` | service hub | `/es/compradores/` | Yes | Yes | Yes | 1992 | 8 |
| `/sellers/` | `sellers/index.html` | service hub | `/es/vendedores/` | Yes | Yes | Yes | 2360 | 11 |
| `/moving-to-goshen/` | `moving-to-goshen/index.html` | location pillar | `/es/mudarse-a-goshen/` | Yes | Yes | Yes | 2328 | 6 |
| `/living-in-goshen/` | `living-in-goshen/index.html` | location pillar | `/es/viviendo-en-goshen/` | Yes | Yes | Yes | 2331 | 5 |
| `/moving-to-elkhart/` | `moving-to-elkhart/index.html` | location pillar | `/es/mudarse-a-elkhart/` | Yes | Yes | Yes | 2112 | 6 |
| `/living-in-elkhart/` | `living-in-elkhart/index.html` | location pillar | `/es/viviendo-en-elkhart/` | Yes | Yes | Yes | 1298 | 5 |
| `/next-chapter-method/` | `next-chapter-method/index.html` | method | `/es/tu-proximo-capitulo/` | Yes | Yes | Yes | 1102 | 5 |
| `/market-stats/` | `market-stats/index.html` | data | `/es/estadisticas-del-mercado/` | Yes | Yes | Yes | 1080 | 5 |
| `/contact/` | `contact/index.html` | contact | `/es/contacto/` | Yes | Yes | Yes | 541 | 0 |
| `/blog/` | `blog/index.html` | blog hub | `/blog/spanish/` | Yes | Yes | Yes | 2306 | 0 |

### 2.3 Main pages — Spanish

| URL | Source file | Type | EN equivalent | In nav | Sitemap | Indexable | Words | FAQs |
|---|---|---|---|---|---|---|---|---|
| `/es/` | `es/index.html` | homepage | `/` | Yes | Yes | Yes | 1216 | 4 |
| `/es/conozca-a-lisa/` | `es/conozca-a-lisa/index.html` | bio | `/about/` | Yes | Yes | Yes | 1394 | 6 |
| `/es/compradores/` | `es/compradores/index.html` | service hub | `/buyers/` | Yes | Yes | Yes | 1762 | 7 |
| `/es/vendedores/` | `es/vendedores/index.html` | service hub | `/sellers/` | Yes | Yes | Yes | 2350 | 11 |
| `/es/mudarse-a-goshen/` | `es/mudarse-a-goshen/index.html` | location pillar | `/moving-to-goshen/` | Yes | Yes | Yes | 2818 | 6 |
| `/es/viviendo-en-goshen/` | `es/viviendo-en-goshen/index.html` | location pillar | `/living-in-goshen/` | Yes | Yes | Yes | 2678 | 5 |
| `/es/mudarse-a-elkhart/` | `es/mudarse-a-elkhart/index.html` | location pillar | `/moving-to-elkhart/` | Yes | Yes | Yes | 2576 | 6 |
| `/es/viviendo-en-elkhart/` | `es/viviendo-en-elkhart/index.html` | location pillar | `/living-in-elkhart/` | Yes | Yes | Yes | 1375 | 5 |
| `/es/tu-proximo-capitulo/` | `es/tu-proximo-capitulo/index.html` | method | `/next-chapter-method/` | Yes | Yes | Yes | 1325 | 5 |
| `/es/estadisticas-del-mercado/` | `es/estadisticas-del-mercado/index.html` | data | `/market-stats/` | Yes | Yes | Yes | 1308 | 5 |
| `/es/contacto/` | `es/contacto/index.html` | contact | `/contact/` | Yes | Yes | Yes | 696 | 0 |
| `/blog/spanish/` | `blog/spanish/index.html` | blog hub | `/blog/` | Yes | Yes | Yes | 2490 | 0 |

> **Note on `/es/estadisticas-del-mercado/`:** `CLAUDE.md` still describes Market Stats as "EN only at launch (documented exception)". The Spanish page **exists, is live, is in the sitemap, and is paired**. The CLAUDE.md line is stale. (Master Plan v2.21 corrected this; the CLAUDE.md architecture block was not updated with it.)

### 2.4 Legal pages

| EN URL | ES URL | Paired | Sitemap | Words EN/ES |
|---|---|---|---|---|
| `/terms/` | `/es/terminos/` | Yes | Both | 717 / 785 |
| `/privacy/` | `/es/privacidad/` | Yes | Both | 1766 / 1961 |
| `/accessibility/` | `/es/accesibilidad/` | Yes | Both | 161 / 165 |
| `/fair-housing/` | `/es/vivienda-justa/` | Yes | Both | 282 / 312 |
| `/disclaimers/` | `/es/disclaimers/` | Yes | Both | 608 / 737 |
| `/sources/` | `/es/fuentes/` | Yes | Both | 2217 / 2554 |

> `/es/disclaimers/` is the only Spanish URL that does not use a Spanish word. All others follow the Spanish-slug convention. **LOW.**

### 2.5 Utility pages

| URL | Type | Robots | In sitemap | In nav | Notes |
|---|---|---|---|---|---|
| `/404.html` | error | `noindex` | No | No | Bilingual wayfinding page. Only true orphan (correct). No canonical (correct). |
| `/contact/thank-you/` | confirmation | `noindex, follow` | No | No | Reached post-form-submit. Paired with ES twin. |
| `/es/contacto/gracias/` | confirmation | `noindex, follow` | No | No | Same. |

### 2.6 Blog hub pages

| URL | Articles listed | Language | Twin | Words |
|---|---|---|---|---|
| `/blog/` | 57 (all EN) | EN | `/blog/spanish/` | 2306 |
| `/blog/spanish/` | 56 (all ES) | ES | `/blog/` | 2490 |
| `/blog/buyers/` | 10 | EN | none | 542 |
| `/blog/sellers/` | 12 | EN | none | 603 |
| `/blog/community/` | 32 | EN | none | 1212 |
| `/blog/relocation/` | 2 | EN | none | 239 |
| `/blog/market-updates/` | 1 | EN | none | 174 |

> **Structural asymmetry (MEDIUM):** English articles are split across 5 topical category folders; **all 56 Spanish articles live in one flat folder, `/blog/spanish/`**. There is no Spanish equivalent of `/blog/buyers/`, `/blog/sellers/`, `/blog/community/`, `/blog/relocation/` or `/blog/market-updates/`. Consequence: Spanish has no topical hub pages to rank or to concentrate internal link equity, and `/blog/spanish/` alone carries 56 outbound links.

### 2.7 Blog articles

**113 articles.** Per-article detail (URL, language, title, H1, pillar, twin, word count, in/outbound links, date, author, category, sitemap, canonical, hreflang) is in `LISA_COLLIO_SEO_DATA.json` → `pages[]` filtered to `type: "article"`.

| Folder | Count | Language | Word range | FAQ schema |
|---|---|---|---|---|
| `/blog/buyers/` | 10 | EN | 542–1306 | 3 on most; 0 on 2 |
| `/blog/sellers/` | 12 | EN | 603–1513 | 3 on all 12 |
| `/blog/community/` | 32 | EN | 485–1972 | 3 on 25; **0 on 7** |
| `/blog/relocation/` | 2 | EN | 1118–1625 | 3 on both |
| `/blog/market-updates/` | 1 | EN | 1233 | 0 |
| `/blog/spanish/` | 56 | ES | 514–2048 | 3 on 42; **0 on 14** |

### 2.8 Dynamic routes

**VERIFIED: none.** This is a fully static committed-HTML site. `netlify.toml` sets `publish = "."` with no build command. There is no server-side rendering, no framework, no route generation at deploy time. `build.js` is a *pre-commit* partial injector that writes expanded HTML into the committed files; `npm run check` confirms every page is currently up to date with its components.

### 2.9 Pages that exist but are not in the navigation

All 157 pages carry the full header + footer, so every page is reachable from every page via the nav. The pages **not directly named in the nav menu** are the 113 blog articles and the 12 legal pages — reachable via the blog hubs and the footer links respectively. **No page is unreachable.**

---

## 3. English ↔ Spanish Pairing Matrix

**VERIFIED.** The pair map is declared as data in `content/hreflang-pairs.json` (67 pairs) and applied by `hreflang.js`. `node hreflang.js --check` reports `67 pairs (134 pages). 0 page(s) would change.`

Full 67-row matrix with every column the brief requested is in `LISA_COLLIO_SEO_DATA.json` → `pairs[]`. Consolidated results here.

### 3.1 Pair health summary

| Check | Result |
|---|---|
| Pairs declared | 67 |
| Both pages exist on disk | **67 / 67** |
| hreflang `en` tag present on both halves | **67 / 67** |
| hreflang `es` tag present on both halves | **67 / 67** |
| `x-default` present on both halves | **67 / 67** |
| hreflang references reciprocal | **67 / 67** |
| Canonical is self-referential on both halves | **67 / 67** |
| Canonical/hreflang conflicts | **0** |
| `hreflang` value points to a page whose `<html lang>` matches | **67 / 67** |
| **EN page's on-page badge links to its ES twin** | **28 / 67** |
| **ES page's on-page badge links to its EN twin** | **29 / 67** |
| **Pairs where BOTH badges are correct** | **28 / 67** |
| In-content (editorial) cross-language links | **0 sitewide** |
| Pairs where FAQ count matches | **45 / 67** |
| Pairs where ES word count < 70% of EN | **17 / 67** |
| Pairs where image count differs by >2 | **1 / 67** (`/blog/` 64 vs `/blog/spanish/` 53) |

### 3.2 Main-page pairs (all verified correct on every axis including the badge)

| EN | ES | hreflang | x-default | canonical | badge EN→ES | badge ES→EN | FAQ EN/ES | ES/EN words |
|---|---|---|---|---|---|---|---|---|
| `/` | `/es/` | ✅ | ✅ → `/` | ✅ self | ✅ | ✅ | 4/4 | 0.98 |
| `/about/` | `/es/conozca-a-lisa/` | ✅ | ✅ | ✅ | ✅ | ✅ | 6/6 | 0.96 |
| `/buyers/` | `/es/compradores/` | ✅ | ✅ | ✅ | ✅ | ✅ | **8/7** | 0.88 |
| `/sellers/` | `/es/vendedores/` | ✅ | ✅ | ✅ | ✅ | ✅ | 11/11 | 1.00 |
| `/moving-to-goshen/` | `/es/mudarse-a-goshen/` | ✅ | ✅ | ✅ | ✅ | ✅ | 6/6 | 1.21 |
| `/living-in-goshen/` | `/es/viviendo-en-goshen/` | ✅ | ✅ | ✅ | ✅ | ✅ | 5/5 | 1.15 |
| `/moving-to-elkhart/` | `/es/mudarse-a-elkhart/` | ✅ | ✅ | ✅ | ✅ | ✅ | 6/6 | 1.22 |
| `/living-in-elkhart/` | `/es/viviendo-en-elkhart/` | ✅ | ✅ | ✅ | ✅ | ✅ | 5/5 | 1.06 |
| `/next-chapter-method/` | `/es/tu-proximo-capitulo/` | ✅ | ✅ | ✅ | ✅ | ✅ | 5/5 | 1.20 |
| `/market-stats/` | `/es/estadisticas-del-mercado/` | ✅ | ✅ | ✅ | ✅ | ✅ | 5/5 | 1.21 |
| `/contact/` | `/es/contacto/` | ✅ | ✅ | ✅ | ✅ | ✅ | 0/0 | 1.29 |
| `/blog/` | `/blog/spanish/` | ✅ | ✅ | ✅ | ✅ | ✅ | 0/0 | 1.08 |
| 6 legal pairs | | ✅ | ✅ | ✅ | ✅ | ✅ | 0/0 | 1.02–1.21 |
| `/contact/thank-you/` | `/es/contacto/gracias/` | ✅ | ✅ | ✅ | ✅ | ✅ | 0/0 | 1.06 |

**All 28 main/legal/utility pairs are fully correct.** Every failure below is in the blog.

### 3.3 Pairs where the on-page language switcher is WRONG (39 pairs / 77 pages)

Every one of the 39 blog-article pairs. Pattern is uniform:

- **EN article badge → `/es/`** (the Spanish home page) instead of the ES article.
- **ES article badge → `/blog/`** (the English blog hub) instead of the EN article.

Sample (full list in `LISA_COLLIO_SEO_DATA.json` → `pairs[]` where `languageSwitcherCorrect: false`):

| EN page | Badge goes to | Should go to (per its own hreflang) |
|---|---|---|
| `/blog/sellers/why-sell-home-goshen-indiana-lisa-collio/` | `/es/` | `/blog/spanish/vender-casa-goshen-lisa-collio/` |
| `/blog/community/does-lisa-collio-speak-spanish/` | `/es/` | `/blog/spanish/proceso-completo-en-espanol-lisa-collio/` |
| `/blog/community/downtown-goshen-indiana/` | `/es/` | `/blog/spanish/centro-de-goshen-indiana/` |
| `/blog/sellers/what-is-an-sres-seniors-real-estate-specialist/` | `/es/` | `/blog/spanish/que-es-sres-adultos-mayores/` |
| `/blog/spanish/vender-casa-goshen-lisa-collio/` | `/blog/` | `/blog/sellers/why-sell-home-goshen-indiana-lisa-collio/` |
| `/blog/spanish/que-es-tu-proximo-capitulo/` | `/blog/` | `/blog/community/what-is-the-next-chapter-method/` |

**Mechanism** — `components/header.html:60`:

```html
<a class="hablo-badge" href="{{esHref}}" hreflang="es" lang="es"
   aria-label="Hablo español — ver esta página en español">
```

`build.js:36-37` supplies the fallback when a page's marker omits the parameter:

```js
const DEFAULTS = {
  esHref: "/es/", // "Hablo español" badge target; overridden per page via marker JSON
  enHref: "/",    // "English" badge target on /es/ pages
```

Main pages override it. Blog articles do not — `blog/sellers/why-sell-home-goshen-indiana-lisa-collio/index.html:128` is simply:

```html
<!-- build:header -->
```

whereas `buyers/index.html` is:

```html
<!-- build:header {"esHref": "/es/compradores/", "curBuyers": " aria-current=\"page\""} -->
```

Spanish articles do override, but to the wrong granularity — `blog/spanish/vender-casa-goshen-lisa-collio/index.html`:

```html
<!-- build:header-es {"enHref": "/blog/"} -->
```

**Why this is CRITICAL rather than cosmetic:** the badge's `aria-label` promises "ver esta página en español" / "view this page in English"; the anchor carries `hreflang="es"`/`hreflang="en"`, making it a machine-readable language link that contradicts the `<head>` annotation on the same page. And since in-content cross-language links measure **zero sitewide**, this badge *is* the bilingual navigation. A Spanish speaker who lands on an English seller article and clicks the badge lands on the Spanish home page, not the Spanish version of what they were reading.

`audit.js` does not check this — its hreflang check (lines 288–350) validates the `<link rel="alternate">` tags and the pair map, never the badge target.

### 3.4 Unpaired pages

**English with no Spanish twin — 15 pages** (all documented as intentional in `audit.js:293-324`):

| URL | Words | Reason given in repo |
|---|---|---|
| `/blog/buyers/are-homes-goshen-indiana-competitive-to-buy/` | 1148 | "English buyer articles with no Spanish counterpart written" |
| `/blog/buyers/elkhart-indiana-good-place-invest-real-estate/` | 1158 | same |
| `/blog/buyers/how-to-compete-with-other-buyers-elkhart-indiana/` | 1142 | same |
| `/blog/buyers/is-goshen-indiana-good-place-to-buy-home/` | 1085 | same |
| `/blog/buyers/what-to-look-for-buying-home-elkhart-indiana/` | 1306 | same |
| `/blog/buyers/what-to-prioritize-buying-house-goshen-indiana/` | 1213 | same |
| `/blog/buyers/why-buy-home-elkhart-indiana-lisa-collio/` | 1263 | same |
| `/blog/buyers/why-buy-home-goshen-indiana-lisa-collio/` | 1035 | same |
| `/blog/market-updates/elkhart-county-mid-year-market-update-2026/` | 1233 | "English-only at launch (documented exception)" |
| `/blog/buyers/`, `/blog/sellers/`, `/blog/community/`, `/blog/relocation/`, `/blog/market-updates/` | 174–1212 | "Section indexes with no per-language counterpart" |
| `/404.html` | 48 | exempt |

**Spanish with no English twin — 8 pages:**

| URL | Words | Reason given in repo |
|---|---|---|
| `/blog/spanish/como-comprar-una-casa-en-indiana/` | 1447 | "Spanish-only buyer cluster (cluster-1-compradores), no English twin" |
| `/blog/spanish/costos-de-cierre-que-son/` | 1260 | same |
| `/blog/spanish/cuanto-dinero-necesito-para-comprar-una-casa/` | 1316 | same |
| `/blog/spanish/errores-comunes-al-comprar-casa/` | 1357 | same |
| `/blog/spanish/no-se-si-califico-credito-y-preaprobacion/` | 1430 | same |
| `/blog/spanish/prestamos-fha-y-usda-en-espanol/` | 1425 | same |
| `/blog/spanish/renta-o-compra-como-decidir/` | 1345 | same |
| `/blog/spanish/actualizacion-del-mercado-elkhart-county-mitad-2026/` | 1767 | "a parallel market update, not a translated pair" |

**Orphan analysis:** there are no *orphaned* pages in the crawl sense — every unpaired page is in the sitemap, carries a self-referential canonical, and is linked from its hub. What they lack is an hreflang annotation (correct: an unpaired page must not declare one).

**Notable asymmetry for strategy:** the 8 Spanish-only articles form a coherent, high-quality **first-time-buyer education cluster in Spanish** (down payment, closing costs, credit/pre-approval, FHA/USDA, rent-vs-buy, common mistakes, how-to-buy-in-Indiana) averaging **1,368 words**. The 8 English-only articles are a **buyer-intent cluster** (is it a good place to buy, competing with other buyers, what to prioritize) averaging **1,169 words**. Neither cluster has a counterpart in the other language.

### 3.5 Translation vs cultural adaptation

**VERIFIED, structurally.** The Spanish pages are not literal translations. Evidence measurable from the code:

- URL slugs are natural Spanish, not transliterations (`/es/viviendo-en-goshen/`, `/blog/spanish/lugares-emblematicos-elkhart-indiana/`).
- 31 of 67 pairs have Spanish **longer** than English (ratio > 1.10) — inconsistent with mechanical translation.
- Titles diverge in framing, not just language: `Does Lisa Collio Speak Spanish? Bilingual Real Estate Agent in IN` ↔ `El proceso completo en español con Lisa Collio`. The Spanish reframes from "does she speak it?" to "can I do the whole process in it?" — a different search intent, deliberately.
- H2 sets differ in count and framing between twins (e.g. `/es/compradores/` has "Encontrar la casa correcta en Goshen" / "…en Elkhart" as separate H2s; `/buyers/` structures that section differently).
- `docs/SPANISH_STYLE_DECISIONS.md` exists and records per-term choices.

**Not verifiable from the repository:** whether the Spanish reads natively to a Latin-American Indiana audience. That is a native-speaker editorial judgment, not a code measurement. **NOT VERIFIED.**

---

## 4. SEO Metadata Matrix

**VERIFIED.** Per-page literal values for `<title>`, meta description, canonical, robots, H1, all H2s, and every `og:`/`twitter:` tag found are in `LISA_COLLIO_SEO_DATA.json` → `pages[]`.

### 4.1 What is present, sitewide

| Field | Coverage | Notes |
|---|---|---|
| `<title>` | **157 / 157** | 0 duplicates |
| `meta description` | **157 / 157** | 0 duplicates, 0 missing |
| `<link rel="canonical">` | **156 / 157** | Only `/404.html` lacks one (correct) |
| `meta robots` | 3 / 157 | Only where `noindex` is intended |
| `<h1>` | **157 / 157** | Exactly one per page; 0 pages with multiple; 0 duplicate H1 strings |
| `<h2>` | 152 / 157 | 5 pages have none (404, 2 thank-you, `/es/accesibilidad/`, `/es/vivienda-justa/`) |
| `BreadcrumbList` schema | 152 / 157 | Absent on `/`, `/es/` (correct) and the 3 utility pages |
| `og:image` | 96 / 157 | |
| `og:image:width` / `:height` / `:alt` | 96 / 157 | |
| `twitter:card` | 90 / 157 | all `summary_large_image` |
| `twitter:image` | 96 / 157 | |
| **`og:title`** | **0 / 157** | |
| **`og:description`** | **0 / 157** | |
| **`og:url`** | **0 / 157** | |
| **`og:type`** | **0 / 157** | |
| **`og:site_name`** | **0 / 157** | |
| **`og:locale`** | **0 / 157** | |
| **`twitter:title`** | **0 / 157** | |
| **`twitter:description`** | **0 / 157** | |
| **`twitter:image:alt`** | **0 / 157** | |

### 4.2 Title quality

| Metric | Result |
|---|---|
| Duplicate titles | **0** |
| Titles > 60 chars | **1** — `/blog/community/does-lisa-collio-speak-spanish/` at 65 (the one `npm run audit` warning) |
| Titles < 30 chars | **1** — `/blog/spanish/que-es-tu-proximo-capitulo/` at 29 |
| Length distribution | <40: 8 · 40–50: 37 · 50–60: 111 · 60+: 1 |
| Titles containing a location token (Goshen/Elkhart/Indiana/IN) | 121 / 157 (77%) |
| **Titles without any location token** | **36** |

The 36 without location are: all 12 legal pages, the 3 utility pages, the 5 Next Chapter Method articles (EN), the 5 Tu Próximo Capítulo articles (ES), and 11 Spanish articles that are topic-only (`Costos de cierre explicados en español`, `Préstamos FHA y USDA explicados en español`, `¿Cuánto dinero necesito para comprar casa?`, `Crédito y preaprobación para comprar casa`, `El proceso completo en español con Lisa Collio`, `¿Por qué los clientes eligen a Lisa Collio?`, etc.).

> **Strategic note for the downstream audit:** the 11 Spanish topic-only titles are the highest-value Spanish assets on the site (1,183–1,447 words each, first-time-buyer intent) and **none of them carry a geographic qualifier**. They compete nationally against much larger Spanish-language real-estate sites rather than locally where Lisa can win.

**Brand-suffix inconsistency (LOW).** 15 distinct title suffix patterns exist:

| Pattern | Pages |
|---|---|
| `\| Lisa Collio` | 81 |
| *(no pipe — question-form titles)* | 43 |
| `\| Lisa Collio, Real Estate Agent` | 9 |
| `\| Lisa Collio, Agente de Bienes Raíces` | 6 |
| `\| Lisa Collio, Goshen & Elkhart, IN` | 6 |
| `\| Lisa Collio, Bienes Raíces` | 2 |
| `\| Goshen & Elkhart` | 2 |
| 8 further one-off patterns | 1 each |

### 4.3 Meta description quality

| Metric | Result |
|---|---|
| Duplicates | **0** |
| Missing | **0** |
| Over 160 chars | **0** |
| Under 120 chars | **0** |
| Distribution | 140–155: 113 · 155–160: 44 |

This is the strongest metadata dimension on the site — 157 unique descriptions, all inside a disciplined 140–160 band. `audit.js` check 18 enforces it, and `docs/PR89_DESCRIPTION_AUDIT.md` records the pass that produced it.

**Phone-number phrasing differs by language, deliberately.** EN: `Call or text (574) 370-5410.` ES: `Llame o escriba al (574) 370-5410.` This is a *documented* decision (CLAUDE.md, PAGE STANDARDS, 5 August 2026) — the on-page CTA Spanish form (`Llame o mande un mensaje de texto`) costs ~50 of 160 characters, so the description form is shortened. **Not a defect; do not "unify" it.**

### 4.4 H1 quality

| Metric | Result |
|---|---|
| Pages with exactly one H1 | **157 / 157** |
| Pages with zero H1 | 0 |
| Pages with multiple H1 | 0 |
| Duplicate H1 strings across pages | **0** |
| H1 identical to `<title>` | 10 |
| Longest H1 | 91 chars (`/blog/community/does-lisa-collio-speak-spanish/`) |

**H1 intent separation is genuinely good.** The four location pillars are cleanly differentiated:

- `/moving-to-goshen/` → "Moving to Goshen, Indiana: What to Know Before You Move"
- `/living-in-goshen/` → "Living in Goshen, Indiana: A Local Agent's Guide to the City"
- `/moving-to-elkhart/` → "Moving to Elkhart, Indiana: What to Know Before You Move"
- `/living-in-elkhart/` → "Living in Elkhart, Indiana: A Local Agent's Guide to the City"

Goshen and Elkhart share an H1 template but differ by city, which is correct for a two-market agent. No cannibalization between Moving and Living.

### 4.5 Metadata problems found

| Problem | Count | Detail |
|---|---|---|
| Duplicate title | 0 | — |
| Title too long | 1 | `/blog/community/does-lisa-collio-speak-spanish/` (65) |
| Title too short | 1 | `/blog/spanish/que-es-tu-proximo-capitulo/` (29) |
| Title without location | 36 | §4.2 |
| Title without search intent | 0 | all titles are topic- or question-shaped |
| Duplicate meta description | 0 | — |
| Meta description absent | 0 | — |
| H1 absent | 0 | — |
| Multiple H1 | 0 | — |
| H1 identical between pages with different intent | 0 | — |
| Metadata translated into the wrong language | **0** | every ES page's title/description/H1 is in Spanish; every EN page's in English. Verified by language-token scan. |
| Canonical pointing at another page | 0 | all 156 are self-referential |
| Canonical pointing at the wrong language | 0 | — |
| Accidental `noindex` | 0 | the 3 `noindex` pages are all intentional |
| **Open Graph title/description/url/type/site_name/locale** | **157** | absent sitewide |
| **`twitter:title` / `twitter:description` / `twitter:image:alt`** | **157** | absent sitewide |
| `og:image` present but `twitter:card` absent | 6 | `/blog/community/elkhart-indiana-location-nearby-cities/`, `/blog/spanish/distrito-escolar-elkhart-indiana/`, `/blog/spanish/industrias-empleadores-elkhart-indiana/`, `/blog/spanish/lugares-emblematicos-elkhart-indiana/`, `/blog/spanish/por-que-es-conocido-elkhart-indiana/`, `/blog/spanish/ubicacion-elkhart-indiana-ciudades-cercanas/` |
| No `og:image` at all | 61 | includes `/`, `/es/`, `/buyers/`, `/sellers/`, `/about/`, `/contact/`, `/market-stats/`, `/next-chapter-method/` and every Spanish main page |

**Consequence of the OG gap, stated precisely:** with no `og:title` or `og:description`, Facebook/LinkedIn/WhatsApp fall back to `<title>` and `meta description`. That means **the meta description is live advertising copy on social platforms**, and it cannot be tuned separately from search copy. With no `og:image` on the homepage or any hub page, a share of `lisacolliorealtor.com` renders with no image card at all. This is already logged in `docs/PRE_LAUNCH_PUNCH_LIST.md:443` as an open decision.

---

## 5. Hreflang Audit

### 5.1 Where it is generated

**Three independent places, all consistent:**

1. **`hreflang.js`** (repo root) — the generator. Reads `content/hreflang-pairs.json`, writes a three-tag block into both halves of each pair, anchored immediately after `<link rel="canonical">`. Idempotent. Run via `npm run hreflang`; `--check` previews.
2. **`content/hreflang-pairs.json`** — the source of truth. 67 objects of shape `{"en": "/buyers/", "es": "/es/compradores/"}`.
3. **`sitemap.xml`** — carries `xhtml:link` alternates on **56 of 154** entries (see §5.6).

Validation lives in `audit.js` lines 288–350 (pair-map coverage, tag presence, reciprocity) with an explicit 23-entry exemption list for pages that have no twin.

### 5.2 Exact output

`hreflang.js:44-50`:

```js
const block = (en, es) =>
  [
    `<link rel="alternate" hreflang="en" href="${SITE}${en}">`,
    `<link rel="alternate" hreflang="es" href="${SITE}${es}">`,
    `<link rel="alternate" hreflang="x-default" href="${SITE}${en}">`,
  ].join("\n");
```

As rendered on `/es/compradores/` (`es/compradores/index.html:12-15`):

```html
<link rel="canonical" href="https://lisacolliorealtor.com/es/compradores/">
<link rel="alternate" hreflang="en" href="https://lisacolliorealtor.com/buyers/">
<link rel="alternate" hreflang="es" href="https://lisacolliorealtor.com/es/compradores/">
<link rel="alternate" hreflang="x-default" href="https://lisacolliorealtor.com/buyers/">
```

And on `/buyers/` — identical block, confirming reciprocity by construction.

### 5.3 Language codes declared

**Exactly three values sitewide: `en`, `es`, `x-default`.**

- **No region subtags.** No `en-US`, no `es-US`, no `es-MX`, no `es-419`.
- **x-default always points to the English URL** on every pair, without exception (verified 67/67).

> **Strategic observation (not a defect):** bare `es` targets all Spanish speakers globally. For a Goshen-only agent competing against national Spanish-language real-estate sites, `es-US` would be a defensible narrowing. This is a strategy decision for the downstream audit, not a technical error — bare `es` is valid and is what Google recommends when you do not need regional differentiation.

### 5.4 Coverage

| Metric | Count |
|---|---|
| Pages carrying hreflang tags | **134** |
| Pages with no hreflang | **23** |
| Of those 23, listed as exempt in `audit.js` | **23 / 23** |
| Silent omissions (no tag, no exemption) | **0** |

The 23: `/404.html`, 5 blog section indexes, 8 EN-only buyer articles, the EN mid-year market update, 7 ES-only buyer-cluster articles, and the ES market update.

### 5.5 Errors found in the `<head>` implementation

**Zero.** Every one of the following returned no violations across all 134 pages:

- ✅ Self-referencing hreflang present and correct on every page
- ✅ Every `hreflang` target resolves to an existing file
- ✅ Every reference is reciprocal (A→B implies B→A with matching URLs)
- ✅ Every `hreflang` value matches the target page's `<html lang>` attribute
- ✅ `x-default` present on every paired page
- ✅ `x-default` equals the `en` URL on every pair
- ✅ Absolute URLs, HTTPS, canonical host, trailing slash — consistent throughout
- ✅ No canonical/hreflang conflict on any page
- ✅ No page canonicalizes to its other-language twin

**This is the cleanest hreflang implementation this audit could construct a test for.**

### 5.6 Errors found OUTSIDE the `<head>`

**Two, both real:**

**(a) The on-page language switcher contradicts the `<head>` on 77 pages.** Full detail in §3.3. The badge is an `<a hreflang="es">` — a language annotation in its own right — pointing somewhere the `<link rel="alternate">` on the same page does not.

**(b) Sitemap hreflang coverage is incomplete (MEDIUM).**

| Metric | Count |
|---|---|
| `<url>` entries in `sitemap.xml` | 154 |
| Entries carrying `xhtml:link` alternates | **56** |
| Entries without | 98 |
| **Paired pages whose sitemap entry omits hreflang** | **76** |

Every main page and legal page has sitemap hreflang. **No blog article pair does.** Example — `/about/` has it:

```xml
<url>
  <loc>https://lisacolliorealtor.com/about/</loc>
  <xhtml:link rel="alternate" hreflang="en" href="https://lisacolliorealtor.com/about/"/>
  <xhtml:link rel="alternate" hreflang="es" href="https://lisacolliorealtor.com/es/conozca-a-lisa/"/>
  <xhtml:link rel="alternate" hreflang="x-default" href="https://lisacolliorealtor.com/about/"/>
</url>
```

…while `/blog/buyers/good-time-to-buy-home-goshen-indiana/` — which *is* paired, and *does* carry the tags in its HTML — is a bare entry:

```xml
<url>
  <loc>https://lisacolliorealtor.com/blog/buyers/good-time-to-buy-home-goshen-indiana/</loc>
</url>
```

Impact is redundancy loss, not signal loss: the HTML tags carry the annotation. But the two declarations now disagree in completeness, and the sitemap is generated/maintained by hand rather than by `hreflang.js`.

---

## 6. Canonical Audit

**VERIFIED.**

| Check | Result |
|---|---|
| Pages with a canonical | 156 / 157 |
| Pages without | 1 — `/404.html` (correct: an error page should not canonicalize) |
| Canonicals that are self-referential | **156 / 156** |
| Canonicals pointing at a different page | **0** |
| Canonicals pointing at the wrong language | **0** |
| Canonicals using a non-HTTPS scheme | 0 |
| Canonicals using `www.` | 0 |
| Canonicals missing the trailing slash | 0 |
| Canonicals with a query string or fragment | 0 |
| Canonical present on `noindex` pages | 2 (`/contact/thank-you/`, `/es/contacto/gracias/`) — harmless, both `noindex, follow` |
| Canonical / hreflang conflicts | **0** |
| Canonical / `og:url` conflicts | N/A — `og:url` does not exist on any page |

Canonical host is `https://lisacolliorealtor.com` (no `www`) on all 156. This matches `robots.txt`'s sitemap declaration and every absolute URL in the schema graph.

**VERIFIED GOOD — no action needed in this dimension.**

---

## 7. Schema / Structured Data Audit

**VERIFIED.** 154 of 157 pages carry JSON-LD. The 3 without are `/404.html` and the two thank-you pages. **Zero JSON-LD parse errors sitewide.**

### 7.1 Type census

| `@type` | Occurrences |
|---|---|
| `BreadcrumbList` | 152 |
| `RealEstateAgent` | 138 |
| `Person` | 125 |
| `FAQPage` | 112 |
| `BlogPosting` | 109 |
| `WebPage` | 24 |
| `Article` | 12 |
| `City` (inside `areaServed`) | 10 |
| `CollectionPage` | 7 |
| `WebPage` + `Article` (dual type) | 4 |
| `HowTo` | 3 |
| `AboutPage` | 2 |
| `ContactPage` | 2 |
| `WebSite` | 2 |
| `Event` | 1 |

**Types NOT implemented anywhere:** `Organization` as a standalone node with its own `@id`, `Service`, `Offer`, `Place` with `geo`, `LocalBusiness` (superseded by the more specific `RealEstateAgent`, which is correct), `ImageObject`, `VideoObject`, `Review` outside the agent node, `SearchAction`, `Speakable`.

### 7.2 The entity graph — the central question

**There IS a single consistent entity for Lisa Collio, and it is used correctly across the site.**

| Entity `@id` | Type | Pages carrying it |
|---|---|---|
| `https://lisacolliorealtor.com/#agent` | `RealEstateAgent` | **138** |
| `https://lisacolliorealtor.com/#lisa` | `Person` | **125** |
| `https://lisacolliorealtor.com/#website` | `WebSite` | 2 (`/` and `/es/`) |

Cross-references are correct and directional:

- `WebSite.publisher` → `{"@id": ".../#agent"}`
- `RealEstateAgent.employee` → `{"@id": ".../#lisa"}` (on `/` and `/es/` only)
- `WebPage.about` → `{"@id": ".../#agent"}` (on all 24 `WebPage` nodes)
- `WebPage.isPartOf` → `{"@id": ".../#website"}`
- `BlogPosting.author` → `{"@id": ".../#lisa"}` on **121 of 125** article nodes

**VERIFIED GOOD.** Only 4 article nodes break the `@id` reference and inline a bare `Person` instead (see §7.6).

### 7.3 `RealEstateAgent` — full property list

From `index.html:32-83`. This exact node (minus `employee`) appears on 132 further pages.

```json
{
  "@type": "RealEstateAgent",
  "@id": "https://lisacolliorealtor.com/#agent",
  "name": "Lisa Collio, Real Estate Agent",
  "url": "https://lisacolliorealtor.com/",
  "telephone": "+1-574-370-5410",
  "email": "lisacolliorealtor@gmail.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "1918 Elkhart Rd",
    "addressLocality": "Goshen",
    "addressRegion": "IN",
    "postalCode": "46526",
    "addressCountry": "US"
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
    "opens": "08:00", "closes": "19:00"
  },
  "areaServed": [
    {"@type": "City", "name": "Goshen",  "address": {...}},
    {"@type": "City", "name": "Elkhart", "address": {...}}
  ],
  "knowsLanguage": ["en", "es"],
  "memberOf": {"@type": "Organization", "name": "RE/MAX Results, The Viruez Team"},
  "employee": {"@id": "https://lisacolliorealtor.com/#lisa"},
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0", "reviewCount": "39", "bestRating": "5"
  },
  "review": [ /* 2 full Review nodes with author, rating, reviewBody */ ]
}
```

| Property | Present | Value / note |
|---|---|---|
| `@id` | ✅ | stable, absolute, used on 138 pages |
| `name` | ✅ | `Lisa Collio, Real Estate Agent` — matches the locked brand string exactly |
| `url` | ✅ | site root |
| `telephone` | ✅ | `+1-574-370-5410`, E.164, single value |
| `email` | ✅ | |
| `address` | ✅ | complete `PostalAddress` |
| `openingHoursSpecification` | ✅ | Mon–Fri 08:00–19:00 |
| `areaServed` | ✅ | Goshen, IN + Elkhart, IN as `City` nodes |
| `knowsLanguage` | ✅ | `["en","es"]` — the bilingual signal, machine-readable |
| `memberOf` | ⚠️ | inline `Organization`, **no `@id`, no `url`** — not a resolvable entity |
| `aggregateRating` | ✅ | 5.0 / 39, Google-sourced |
| `review` | ✅ | 2 full reviews inline |
| **`sameAs`** | ❌ | **absent on all 138** |
| **`image`** | ❌ | **absent on all 138** |
| **`logo`** | ❌ | absent |
| **`geo`** | ❌ | no lat/long |
| **`hasMap`** | ❌ | absent |
| **`priceRange`** | ❌ | absent |
| **`description`** | ❌ | absent |
| **`makesOffer` / `hasOfferCatalog`** | ❌ | absent — no buyer/seller service entities |
| **`slogan`** | ❌ | absent |
| **`founder` / `parentOrganization`** | ❌ | absent |

### 7.4 `Person` — full property list

Four near-identical shapes, all sharing `@id: .../#lisa`. Richest is on `/about/` and `/es/conozca-a-lisa/`:

```json
{
  "@type": "Person",
  "@id": "https://lisacolliorealtor.com/#lisa",
  "name": "Lisa Collio",
  "jobTitle": "Real Estate Agent",
  "url": "https://lisacolliorealtor.com/about/",
  "worksFor": {"@type": "Organization", "name": "RE/MAX Results, The Viruez Team"},
  "knowsLanguage": ["en", "es"],
  "hasCredential": [
    {"@type":"EducationalOccupationalCredential","credentialCategory":"designation","name":"REALTOR®"},
    {"@type":"EducationalOccupationalCredential","credentialCategory":"membership","name":"NAR® Member"},
    {"@type":"EducationalOccupationalCredential","credentialCategory":"designation","name":"SRES® Seniors Real Estate Specialist"},
    {"@type":"EducationalOccupationalCredential","credentialCategory":"license","name":"Indiana Real Estate License"}
  ],
  "identifier": [
    {"@type":"PropertyValue","propertyID":"NRDS","value":"387056478"},
    {"@type":"PropertyValue","propertyID":"Indiana Real Estate License","value":"RB21002460"}
  ],
  "award": ["2025 RE/MAX Executive Club","2024 RE/MAX 100% Club",
            "2023 RE/MAX 100% Club","2022 RE/MAX Executive Club"],
  "alumniOf": [
    {"@type":"EducationalOrganization","name":"Word of Life Bible Institute"},
    {"@type":"EducationalOrganization","name":"Children's Ministries Institute®"},
    {"@type":"CollegeOrUniversity","name":"Bethel College"}
  ]
}
```

The four shapes differ only in optional enrichment:

| Shape | Pages | Extra properties |
|---|---|---|
| Base | 121 (all articles) | — |
| Bio | 2 (`/about/`, `/es/conozca-a-lisa/`) | `award`, `alumniOf` |
| Home EN | 1 (`/`) | `telephone`, `email`, `award` |
| Home ES | 1 (`/es/`) | `telephone`, `email` |

| Property | Present | Note |
|---|---|---|
| `@id`, `name`, `jobTitle`, `url`, `worksFor`, `knowsLanguage`, `hasCredential`, `identifier` | ✅ | consistent |
| `award`, `alumniOf` | ✅ | on bio + home only |
| **`sameAs`** | ❌ | **absent on all 125** |
| **`image`** | ❌ | absent — no headshot is declared as an entity image anywhere |
| **`description`** | ❌ | absent |
| **`address` / `workLocation`** | ❌ | absent |
| **`memberOf`** | ❌ | on the agent node, not the person node |
| **`brand` / `owns`** | ❌ | the four ™ method brands are not entities |

### 7.5 Connection to the entities the brief asked about

| Should connect to | How it connects today | Resolvable entity? |
|---|---|---|
| **RE/MAX Results** | `memberOf` / `worksFor` → inline `{"@type":"Organization","name":"RE/MAX Results, The Viruez Team"}` | ❌ **No `@id`, no `url`, no `sameAs`.** Google cannot tie this string to the real RE/MAX Results entity. |
| **The Viruez Team** | Same string, concatenated into the brokerage name — never its own node | ❌ Not an entity |
| **Goshen** | `areaServed[0]` = `City` "Goshen" with a `PostalAddress`; also `address.addressLocality` | ✅ Reasonably strong |
| **Elkhart** | `areaServed[1]` = `City` "Elkhart" with a `PostalAddress` | ✅ Reasonably strong |
| **Elkhart County** | **Nowhere in any schema.** Appears in body copy on 40 pages and in one title. | ❌ **Not modelled at all** despite being a stated target query |
| **Website** | `WebSite` node with `@id .../#website`, `publisher` → `#agent`, `inLanguage: ["en","es"]` | ✅ Correct, but only on 2 pages |
| **Social profiles** | — | ❌ **`sameAs` count sitewide: 0** |
| **Google Business Profile** | — | ❌ No `sameAs`, no `hasMap`, no `geo` |

### 7.6 Article schema

| Metric | Result |
|---|---|
| Nodes with `datePublished` | 125 |
| Distinct `datePublished` values | **6** — 2026-07-21 (×39), 07-22 (×42), 07-24 (×16), 07-25 (×20), 07-27 (×7), 08-18 (×1) |
| Nodes with `dateModified` | 123 (2 missing) |
| `author` → `{"@id": ".../#lisa"}` | **121** |
| `author` → inline bare `Person` (no `@id`) | **4** |
| `publisher` present | 121 |
| `publisher` absent | 4 (the same 4) |
| Article nodes with no `image` | **29** |
| `mainEntityOfPage` present | 125 |
| `inLanguage` present | 125 |
| `articleSection` / `keywords` / `wordCount` | absent everywhere |

**The 4 entity-fragmenting nodes** (dual-typed `WebPage` + `Article`, on the four hub-style pages):

```json
"author": {"@type": "Person", "name": "Lisa Collio", "jobTitle": "Real Estate Agent"}
```

on `/market-stats/`, `/es/estadisticas-del-mercado/`, `/next-chapter-method/`, `/es/tu-proximo-capitulo/`. These create an anonymous second Lisa Collio rather than referencing `#lisa`. **MEDIUM.**

**Date clustering:** 124 of 125 articles carry one of five July 2026 dates, and `dateModified` largely equals `datePublished`. Every article on the site will read to a crawler as published in a single ~7-day window and never updated since. **MEDIUM** — a freshness signal problem for a market-data-adjacent site.

### 7.7 Other schema issues

| Issue | Severity | Detail |
|---|---|---|
| `aggregateRating` (5.0 / 39) + 2 full `Review` nodes replicated on **134 pages**, including every blog article | MEDIUM | Google's review-snippet policy discourages self-serving reviews on the reviewed entity. Blanket sitewide replication is a policy-risk surface, not a technical error. Flagging for strategic review only. |
| `/contact/` and `/es/contacto/` declare `RealEstateAgent @id .../#agent` in **two separate `<script>` blocks** — one with identity data, one with only `aggregateRating` + `review` | LOW | Files: `contact/index.html:20` and `contact/index.html:309`. JSON-LD merges by `@id`, so it resolves; it is structurally inconsistent with every other page. The second block's `AggregateRating` also omits `bestRating`. |
| `/es/index.html` puts `FAQPage` in a **separate `<script>` tag** rather than the single `@graph` the EN homepage uses (2 blocks vs 1) | LOW | Already logged in `docs/PRE_LAUNCH_PUNCH_LIST.md:291`. |
| `HowTo` used on 3 pages | INFO | `/blog/relocation/moving-to-goshen-indiana-from-out-of-state/`, `/blog/community/moving-to-elkhart-indiana-from-out-of-state/`, `/blog/spanish/mudarse-a-goshen-desde-otro-estado/`. Note that the ES twin of the Elkhart one has no `HowTo`. |
| `Event` used on exactly 1 page | INFO | `/blog/spanish/eventos-comunitarios-goshen-indiana/#firstfridays` — the EN twin `/blog/community/community-events-in-goshen-indiana/` has no `Event` node. Asymmetric. |
| `Place` nodes on 7 pages | INFO | `#place` IDs on the Goshen/Elkhart living pages and 5 community articles. No `geo` coordinates on any. |
| No `SearchAction` on `WebSite` | LOW | No sitelinks-searchbox eligibility (site has no search). |

---

## 8. Entity / NAP Audit

**VERIFIED — and this section corrects an initial false positive in this audit's own method.** A first pass reported "Lisa Collio Real Estate Agent" (no comma) on 36 pages and "RE/MAX Results The Viruez Team" (no comma) on 75. Both were artifacts of stripping HTML tags across element boundaries in the footer signature. A direct search of the raw HTML returns **0 matches for either string**. The corrected results follow.

### 8.1 NAP consistency

| Element | Distinct forms found in raw HTML | Verdict |
|---|---|---|
| **Phone** | **1** — `(574) 370-5410` (156 pages, visible) + `+1-574-370-5410` (schema/`tel:`/`sms:`) | ✅ Consistent. The banned legacy number `574-975-0141` appears **0 times**. The only other number sitewide is HUD's `800-669-9777` on the two Fair Housing pages — correct. |
| **Email** | **1** — `lisacolliorealtor@gmail.com` (19 pages) | ✅ Consistent |
| **Address** | **1** — `1918 Elkhart Rd, Goshen, IN 46526` (6 pages visible + schema on 138) | ✅ Consistent |
| **Website** | **1** — `https://lisacolliorealtor.com` (no `www`) | ✅ Consistent across canonical, schema, sitemap, robots |
| **Business name** | See §8.2 | ✅ Consistent, context-appropriate |
| **Brokerage** | **1** — `RE/MAX Results, The Viruez Team` (with comma) everywhere in prose | ✅ Consistent. `REMAX` (slash-free) appears only in logo filenames, per the locked rule. |
| **License** | **1** — `RB21002460` | ✅ Present on **159/159** HTML files including components |
| **NRDS** | **1** — `387056478` | ✅ Schema `identifier` only, never visible copy — matches the locked rule |

**Finding: no NAP inconsistency exists.** For a site this size with two languages, that is unusual and worth stating plainly.

### 8.2 Name-form inventory

| Form | Where used | Count | Correct? |
|---|---|---|---|
| `Lisa Collio` | body copy, `Person.name`, article author | 153 pages | ✅ |
| `Lisa Collio, Real Estate Agent` | `RealEstateAgent.name`, EN titles, footer | 10 pages visible + 138 schema | ✅ locked brand string, comma present |
| `Lisa Collio, Agente de Bienes Raíces` | ES titles, ES footer | 9 pages | ✅ Spanish equivalent |
| `Lisa Collio, Realtor` | 5 pages | 5 | ⚠️ see below |
| `Lisa Alford-Collio` | — | **0** | ✅ banned form absent |
| `Lisa Collio Real Estate` (as a business name) | — | **0** | ✅ banned form absent (876 IAC 8-1-8) |

**The 5 `Lisa Collio, Realtor` instances (LOW).** `REALTOR` appears without the ® on 18 pages; `REALTOR®` with it on 91. CLAUDE.md's locked rule requires ® on `REALTOR®` and says never to lead with it. Worth a targeted check by the strategist against the actual rendering context — some of the 18 are inside `hasCredential` name strings and inside prose where the ® is carried by an adjacent instance. **Not confirmed as a violation by this audit; flagged for review.**

### 8.3 Professional title / credential consistency

| Credential | Pages | Form |
|---|---|---|
| `REALTOR®` | 91 | ® present |
| `REALTOR` (no ®) | 18 | see §8.2 |
| `NAR®` | 82 | ® present |
| `SRES®` | 122 | ® present |
| `Seniors Real Estate Specialist` | 92 | spelled out |
| `Especialista` (ES form) | 75 | Spanish rendering |

### 8.4 Service-area consistency

| Form | Pages | Notes |
|---|---|---|
| `Goshen and Elkhart, Indiana` | 50 | EN canonical form |
| `Goshen y Elkhart, Indiana` | 62 | ES canonical form |
| `Goshen & Elkhart` (ampersand) | 3 | `/market-stats/`, `/blog/market-updates/`, and its one article — title-length compression |
| `Elkhart County` | 40 | Used inside verifiable stats context, which CLAUDE.md permits |
| `Michiana` | 8 | **Not in the locked vocabulary.** Appears in body copy. Not a banned term (the ban is on "Northern Indiana" as a service-area descriptor), but it is a regional descriptor outside the approved set — worth a compliance read. |
| `Northern Indiana` (as service area) | **0** | ✅ banned form absent |
| `surrounding areas` | **0** | ✅ banned form absent |

### 8.5 Track-record claim consistency

| Claim form | Pages | Verdict |
|---|---|---|
| `$20M+` | 91 | ✅ |
| `120+ casas` | 75 | ✅ ES footer |
| `120+ homes` | 17 | ✅ |
| `Top 20%` | 75 | ✅ |
| `over 120 families` / `more than 120 homes` | prose on `/`, `/about/`, 3 articles | ✅ correct prose forms |
| `100+` (superseded legacy claim) | **0** | ✅ absent |

One initial hit for "100 casas" was traced to `/blog/spanish/actualizacion-del-mercado-elkhart-county-mitad-2026/:191` — *"De cada 100 casas listadas, cerca de 72 lograron venderse"* — a market statistic, not a track-record claim. **Not a violation.**

### 8.6 The entity gap

Everything above is internally consistent. What is missing is the **external** half:

| Signal | Status |
|---|---|
| `sameAs` to Google Business Profile | ❌ absent |
| `sameAs` to Facebook / Instagram / LinkedIn | ❌ absent |
| `sameAs` to Zillow / realtor.com / RE/MAX agent page | ❌ absent |
| Outbound links to any Lisa Collio social profile | ❌ **0** — the only external links on the entire site are 8 to consumerfinance.gov, 2 to hud.gov, 2 to in.gov, 2 to google.com (review links) |
| `geo` coordinates | ❌ absent |
| `hasMap` | ❌ absent |
| Entity `image` on `Person` or `RealEstateAgent` | ❌ absent |

**A search engine reading this site can build a complete, consistent internal picture of Lisa Collio and cannot connect it to a single external corroborating source.**

---

## 9. Internal Linking Audit

**VERIFIED.** Two graphs were built: the **full** graph (all `<a href>` in `<body>`) and the **editorial** graph (excluding the `build:header`/`build:footer` chrome regions, which are identical on every page). The editorial graph is the meaningful one; the full graph inflates every page to ~83 inbound because the footer links to everything.

> **Method note:** an initial pass under-stripped the Spanish chrome (`build:header-es` / `build:footer-es` do not match a `build:header`…`endbuild:header` pattern), which inflated every Spanish page's editorial link count by ~15 and produced a false "Spanish articles link to pillars 57 times" result. Corrected below.

### 9.1 Headline numbers

| Metric | Result |
|---|---|
| Total internal links parsed | 5,452 |
| **Links to non-existent pages** | **0** |
| Relative (non-root-absolute) links | **0** — every internal link is root-absolute |
| External link hosts | 4 (consumerfinance.gov ×8, google.com ×2, hud.gov ×2, in.gov ×2) |
| Pages with 0 editorial inbound links | 9 |
| Avg editorial outbound links, EN articles | 7.4 |
| Avg editorial outbound links, ES articles | 6.8 |
| Cross-language editorial links | **0** |

### 9.2 Editorial orphans (0 in-content inbound links; reachable only via nav/footer)

| URL | Assessment |
|---|---|
| `/404.html` | ✅ correct |
| `/contact/thank-you/`, `/es/contacto/gracias/` | ✅ correct (post-submit only) |
| `/accessibility/`, `/es/accesibilidad/`, `/fair-housing/`, `/es/vivienda-justa/` | ✅ expected (footer-linked legal) |
| **`/about/`** | ⚠️ **The Meet Lisa page — the site's primary E-E-A-T asset — receives zero in-content links from any of the 157 pages.** |
| **`/moving-to-elkhart/`** | ⚠️ **A location pillar receives zero in-content links.** |

### 9.3 Commercial page editorial link equity

| Page | In-content inbound | In-content outbound |
|---|---|---|
| `/contact/` | **80** | 4 |
| `/es/contacto/` | **70** | 4 |
| `/` | 76 | 10 |
| `/es/` | 70 | 10 |
| `/market-stats/` | 10 | 3 |
| `/es/estadisticas-del-mercado/` | 9 | 2 |
| `/es/tu-proximo-capitulo/` | 12 | 6 |
| `/es/vendedores/` | 12 | 15 |
| `/es/compradores/` | 10 | 9 |
| `/next-chapter-method/` | 8 | 8 |
| `/es/conozca-a-lisa/` | 6 | 8 |
| `/living-in-elkhart/` | 5 | 7 |
| `/es/viviendo-en-elkhart/` | 4 | 8 |
| `/moving-to-goshen/` | **3** | 11 |
| **`/buyers/`** | **2** | 10 |
| **`/sellers/`** | **2** | 15 |
| **`/living-in-goshen/`** | **2** | 10 |
| **`/es/mudarse-a-goshen/`** | **2** | 11 |
| **`/es/viviendo-en-goshen/`** | **1** | 10 |
| **`/es/mudarse-a-elkhart/`** | **1** | 10 |
| **`/about/`** | **0** | 8 |
| **`/moving-to-elkhart/`** | **0** | 10 |

**The pattern is stark:** the two conversion endpoints (`/contact/`, `/es/contacto/`) absorb 150 editorial inbound links between them, while the pages that should rank for the commercial queries — `/buyers/`, `/sellers/`, the four location pillars — receive between **0 and 5 each**.

### 9.4 Pillar ↔ article linking (the hub-and-spoke test)

| Pillar | Article links OUT | Article links IN |
|---|---|---|
| `/buyers/` | 8 | **0** |
| `/sellers/` | 11 | **0** |
| `/living-in-goshen/` | 5 | **0** |
| `/moving-to-goshen/` | 6 | **1** |
| `/living-in-elkhart/` | 5 | **2** |
| `/moving-to-elkhart/` | 6 | **0** |
| `/market-stats/` | 1 | 5 |
| `/es/compradores/` | 7 | **8** |
| `/es/vendedores/` | 11 | **10** |
| `/es/viviendo-en-goshen/` | 5 | **0** |
| `/es/mudarse-a-goshen/` | 6 | **0** |
| `/es/viviendo-en-elkhart/` | 5 | **2** |
| `/es/mudarse-a-elkhart/` | 6 | **0** |
| `/es/estadisticas-del-mercado/` | 0 | 4 |

**The hub-and-spoke is one-directional.** Pillars link down to their articles correctly (5–11 links each). Articles almost never link back up. English is worse than Spanish: `/es/compradores/` and `/es/vendedores/` do receive 8–10 article links, while `/buyers/` and `/sellers/` receive **zero**.

**All 57 English articles exist and not one of them links to `/buyers/` or `/sellers/`.** Including the 6 English blog hub pages, that is 63 English blog pages with zero links to either service hub.

### 9.5 Where articles do link

English articles link laterally — to sibling articles in the same cluster, to `/blog/`, to `/contact/`, and to `/`. The most-linked article destinations:

| Article | Editorial inbound |
|---|---|
| `/blog/sellers/good-time-to-sell-home-elkhart-indiana/` | 14 |
| `/blog/sellers/how-long-to-sell-house-goshen-indiana/` | 14 |
| `/blog/sellers/how-much-is-my-home-elkhart-indiana-worth/` | 14 |
| `/blog/community/does-lisa-collio-speak-spanish/` | 11 |
| `/blog/community/how-many-homes-lisa-collio-sold-goshen-elkhart/` | 11 |
| `/blog/spanish/como-comprar-una-casa-en-indiana/` | 11 |

Lowest-inbound content pages:

| Page | Editorial inbound |
|---|---|
| `/blog/spanish/trabajar-en-la-industria-de-rv-y-comprar-casa-en-elkhart-indiana/` | 2 |
| `/blog/spanish/que-es-sres-adultos-mayores/` | 3 |
| `/blog/market-updates/elkhart-county-mid-year-market-update-2026/` | 3 |
| `/blog/spanish/actualizacion-del-mercado-elkhart-county-mitad-2026/` | 3 |

### 9.6 Pages with too many links

None problematic. Highest editorial outbound: `/blog/` (64), `/blog/spanish/` (58), `/blog/community/` (35) — all listing pages, where that is the function. No content page exceeds 15 editorial outbound links.

### 9.7 EN/ES pages that do not link to each other

**All of them, in content.** In-content cross-language links: **0 sitewide.** The header badge is the sole mechanism, and §3.3 documents that it is wrong on 77 pages.

---

## 10. Content Cluster Inventory

**VERIFIED. 113 articles exist.** Per-article rows in `LISA_COLLIO_SEO_DATA.json`.

> **Reconciliation:** `content/blog-articles.json` and `content/blog-topics.json` are build inputs for the listing pages. The counts here come from the filesystem, not from those files.

### 10.1 Clusters as implemented

| Cluster | EN pages | ES pages | ES twin coverage | Pillar |
|---|---|---|---|---|
| **Home** | `/` | `/es/` | 1:1 | — |
| **Buyers** | `/buyers/` + 10 articles | `/es/compradores/` + 0 dedicated articles | **2 of 10 EN articles have twins** | `/buyers/` ← 0 article links |
| **Sellers** | `/sellers/` + 12 articles | `/es/vendedores/` + 12 twins | 12 of 12 — **all 12 ES twins lack the FAQ block** | `/sellers/` ← 0 article links |
| **Meet Lisa / About Lisa** | `/about/` + 7 articles | `/es/conozca-a-lisa/` + 7 twins | 7 of 7 | `/about/` ← 0 links |
| **Moving to Goshen** | `/moving-to-goshen/` + 1 article | `/es/mudarse-a-goshen/` + 1 twin | 1:1 | ← 1 article link |
| **Living in Goshen** | `/living-in-goshen/` + 8 articles | `/es/viviendo-en-goshen/` + 8 twins | 8 of 8 | ← 0 article links |
| **Moving to Elkhart** | `/moving-to-elkhart/` + 1 article | `/es/mudarse-a-elkhart/` + 1 twin | 1:1 | ← 0 article links |
| **Living in Elkhart** | `/living-in-elkhart/` + 8 articles | `/es/viviendo-en-elkhart/` + 8 twins | 8 of 8 — **7 EN twins lack the FAQ block** | ← 2 article links |
| **Relocation** | `/blog/relocation/` + 2 articles | (flat in `/blog/spanish/`) | 2 of 2 | — |
| **Life Chapters / Next Chapter Method** | `/next-chapter-method/` + 5 articles | `/es/tu-proximo-capitulo/` + 5 twins | 5 of 5 | ← 8 article links |
| **Market Updates** | `/blog/market-updates/` + 1 article | 1 parallel ES article, deliberately unpaired | n/a | `/market-stats/` ← 5 |
| **Spanish first-time-buyer cluster** | **none** | 7 ES-only articles | **no EN counterpart** | `/es/compradores/` ← 8 |
| **RV industry** | 2 EN articles | 2 ES twins | 2:2 | spans Goshen + Elkhart |

### 10.2 Articles with no equivalent in the other language

Full lists in §3.4. Summary: **15 EN pages** (8 buyer articles, 1 market update, 5 section indexes, 404) and **8 ES pages** (7 first-time-buyer cluster + 1 market update).

### 10.3 Articles with no pillar page

**None.** Every one of the 113 articles is linked from at least one hub page (`/blog/`, `/blog/spanish/`, or a category index), and every article's breadcrumb schema names its parent.

### 10.4 Isolated articles

By editorial inbound links, the four weakest are listed in §9.5 (2–3 inbound each). None is fully isolated.

### 10.5 Articles with overlapping search intent

Measurable candidates for the strategist to evaluate (this audit does not judge intent, only names the overlaps):

| Group | Pages | Note |
|---|---|---|
| "Best price" selling | `/blog/sellers/sell-home-goshen-indiana-best-price/`, `/blog/sellers/sell-home-elkhart-indiana-best-price/` | Same question, two cities — likely intentional |
| "Why sell with Lisa" | `/blog/sellers/why-sell-home-goshen-indiana-lisa-collio/`, `/blog/sellers/why-sell-home-elkhart-indiana-lisa-collio/` | Same |
| "Why buy with Lisa" | `/blog/buyers/why-buy-home-goshen-indiana-lisa-collio/`, `/blog/buyers/why-buy-home-elkhart-indiana-lisa-collio/` | Same |
| **"Why choose Lisa" family** | `/blog/community/what-makes-lisa-collio-different/`, `/blog/community/why-clients-choose-lisa-collio/`, `/blog/community/what-is-it-like-to-work-with-lisa-collio/`, `/blog/community/why-lisa-collio-became-real-estate-agent/` | **4 EN articles on near-identical intent**, plus 4 ES twins. Highest cannibalization candidate on the site. |
| Older homes | `/blog/buyers/buying-an-older-home-in-goshen-indiana/`, `/blog/community/buying-an-older-home-in-elkhart-indiana/` | Note the two live in **different category folders** despite being the same series |
| Moving from out of state | `/blog/relocation/moving-to-goshen-indiana-from-out-of-state/`, `/blog/community/moving-to-elkhart-indiana-from-out-of-state/` | Same series, different folders |
| RV industry | `/blog/relocation/rv-industry-buying-a-home-goshen-indiana/`, `/blog/community/working-in-the-rv-industry-and-buying-a-home-in-elkhart-indiana/` | Same series, different folders |
| **Bilingual** | `/blog/community/does-lisa-collio-speak-spanish/` vs `/blog/spanish/proceso-completo-en-espanol-lisa-collio/` | Paired, different intent by design |

**Structural note:** the Goshen/Elkhart article series are split across `/blog/buyers/`, `/blog/community/` and `/blog/relocation/` inconsistently. Three matched Goshen/Elkhart pairs sit in different folders, which weakens the category hubs and produces different breadcrumb trails for the same content type.

### 10.6 Shared boilerplate across articles

| Repeated H2 | Pages |
|---|---|
| "Your next chapter starts with a smart move." | 80 |
| "What Lisa's clients say" | 74 |
| "Su próximo capítulo comienza con una decisión inteligente." | 70 |
| "Lo que dicen sus clientes" | 62 |
| "Frequently Asked Questions" | 58 |
| "Preguntas frecuentes" | 50 |
| "Artículos relacionados" | 27 |

Every article ends with the same three sections (More from Lisa · client reviews · CTA band). On a 500-word article this boilerplate is a substantial fraction of the page. Worth measuring against unique-content ratio in the strategic audit.

---

## 11. Spanish-Speaking REALTOR® Opportunity

### Verdict

**MISSING — NO DEDICATED PAGE FOUND.**

There is no page on this site whose primary target is *"Spanish-speaking REALTOR® in Goshen, Indiana"* or *"Agente de bienes raíces que habla español en Goshen, Indiana."*

### What exists instead

**One English blog article and its Spanish twin.**

#### `/blog/community/does-lisa-collio-speak-spanish/`

| Field | Value |
|---|---|
| **File** | `blog/community/does-lisa-collio-speak-spanish/index.html` |
| **Title** | `Does Lisa Collio Speak Spanish? Bilingual Real Estate Agent in IN` (65 chars — the only over-length title on the site) |
| **Meta description** | `Does Lisa Collio speak Spanish? Yes — native-level. A bilingual real estate agent serving Goshen and Elkhart, Indiana families in English and Spanish.` |
| **H1** | `Does Lisa Collio Speak Spanish? A Bilingual Real Estate Agent in Goshen and Elkhart, Indiana` |
| **H2s** | Native-level, not "gets by" · Why it matters more than convenience · What clients say — in both languages · The seller's side of bilingual · A bridge, not just a translation · Frequently Asked Questions · Final thoughts |
| **Words** | 1,021 |
| **FAQ** | 3 questions, `FAQPage` schema present |
| **Schema** | `BlogPosting`, `Person`, `BreadcrumbList`, `FAQPage`, `RealEstateAgent` |
| **Canonical** | self ✅ |
| **hreflang** | ✅ paired with the ES article |
| **Editorial inbound links** | **11** — the most-linked bilingual asset on the site |
| **Linked from** | `/about/`, `/blog/`, `/blog/community/`, and 8 sibling community articles |
| **Links out to** | `/`, `/blog/`, `/blog/community/`, `/es/compradores/`, `/contact/`, 3 sibling articles |
| **Language switcher badge** | ❌ points to `/es/` instead of its twin |

Opening content:

> "It's one of the most common questions families in this area type into a search bar, and it deserves a direct answer rather than a footnote on a bio page. So, directly: **The short answer:** yes — Lisa Collio speaks Spanish at a native level. She was raised in Latin America, serves English- and Spanish-speaking families across Goshen and Elkhart with equal clarity, and for sellers, that bilingual reach means marketing a home to two buyer pools instead of one. Hablo español isn't a line on her card; it's half her practice."

#### `/blog/spanish/proceso-completo-en-espanol-lisa-collio/`

| Field | Value |
|---|---|
| **File** | `blog/spanish/proceso-completo-en-espanol-lisa-collio/index.html` |
| **Title** | `El proceso completo en español con Lisa Collio` (46 chars — **no geographic qualifier**) |
| **Meta description** | `¿Puede manejar todo el proceso de comprar o vender en español con Lisa Collio? Sí, completamente: documentos, negociaciones e inspecciones en Goshen y Elkhart.` |
| **H1** | `¿Puedo manejar todo el proceso de comprar o vender mi casa completamente en español con Lisa Collio?` |
| **Words** | 708 |
| **FAQ** | 3 questions, `FAQPage` schema present |
| **Editorial inbound links** | 5 |
| **Language switcher badge** | ❌ points to `/blog/` instead of its twin |

### Why this is not a dedicated page

Measured against the query set:

| Query | Where it could match | Status |
|---|---|---|
| `Spanish-speaking REALTOR® in Goshen, Indiana` | — | Exact phrase "Spanish-speaking" appears in body copy on 19 pages, in **0 titles** and **0 H1s**. `REALTOR®` never co-occurs with "Spanish-speaking" in any title or H1. |
| `bilingual REALTOR® in Goshen, Indiana` | — | "bilingual" in **1 title**, **1 H1** — both the article above. `bilingual REALTOR` as a phrase: **0**. |
| `realtor que habla español en Goshen Indiana` | — | Exact phrase: **0**. "habla español" appears in body copy on 5 ES pages, **0 ES titles**, **0 ES H1s**. |
| `agente de bienes raíces que habla español` | — | Exact phrase: **0** |
| `agente inmobiliario` | — | **0 occurrences on the entire site, in any field, in any language** |
| `corredor de bienes raíces` | — | **0** |

Structurally the asset is a `/blog/community/` article — it sits under a Community breadcrumb, carries `BlogPosting` schema rather than a service/`WebPage` type, receives no links from `/buyers/` or `/sellers/`, and is not in the navigation.

**No page was created. This is a report only.**

---

## 12. Spanish SEO Audit

**VERIFIED.** Term-presence measured across all 75 Spanish pages, by field (body / `<title>` / `<h1>` / meta description). No keywords were added.

### 12.1 Term coverage

| Term | Body (of 75) | In `<title>` | In `<h1>` | In meta desc |
|---|---|---|---|---|
| `agente de bienes raíces` | 75 | **8** | **4** | 5 |
| `bienes raíces` | 75 | 11 | 5 | 5 |
| **`agente inmobiliario`** | **0** | **0** | **0** | **0** |
| **`corredor de bienes raíces`** | **0** | **0** | **0** | **0** |
| `inmobiliaria` | 6 | 0 | 0 | 0 |
| `realtor` (any case) | 75 | 0 | 0 | 4 |
| `comprar una casa` | 26 | 3 | **6** | 5 |
| `comprar casa` | 20 | 6 | 3 | 6 |
| `vender su casa` | 16 | 5 | 1 | 5 |
| `vender mi casa` | 17 | 0 | **4** | 0 |
| `vender casa` | 3 | 0 | 0 | 1 |
| **`casas en venta`** | **1** | 0 | 0 | 0 |
| `Goshen, Indiana` | 26 | **13** | **19** | 16 |
| `Goshen Indiana` (no comma) | 0 | 0 | 0 | 0 |
| `Elkhart, Indiana` | 64 | **15** | **33** | 36 |
| `Elkhart Indiana` (no comma) | 0 | 0 | 0 | 0 |
| `Elkhart County` | 8 | 1 | 1 | 0 |
| `condado de Elkhart` | 75 | **0** | **0** | **0** |
| `hablo español` | 75 (nav badge) | **0** | **0** | 0 |
| `habla español` | 5 | **0** | **0** | 0 |
| `en español` | 75 | 4 | 2 | 18 |
| `bilingüe` | 16 | **0** | **0** | 2 |
| `primera casa` | 11 | 0 | 0 | 0 |
| `mi primera casa` | 2 | 0 | 0 | 0 |
| `mudarse a Goshen` | 75 (nav) | 2 | 2 | 1 |
| `vivir en Goshen` | 75 (nav) | 1 | 1 | 2 |
| `mudarse a Elkhart` | 75 (nav) | 2 | 2 | 0 |
| `vivir en Elkhart` | 75 (nav) | 1 | 1 | 2 |
| `preaprobación` | 17 | 1 | 1 | 3 |
| `enganche` | 10 | 0 | 0 | 3 |
| `hipoteca` | 75 (footer) | 0 | 0 | 0 |
| `prestamista` | 75 (footer) | 0 | 0 | 1 |

> **Reading note:** counts of exactly **75** mean the term is in shared chrome (nav/footer), not in page-unique content. Treat those as "present sitewide, ranking-neutral."

### 12.2 Page-level Spanish detail

| URL | Title | H1 | Primary topic | Secondary topics | EN twin |
|---|---|---|---|---|---|
| `/es/` | `Lisa Collio, Agente de Bienes Raíces \| Goshen y Elkhart, IN` | `Lisa Collio, Agente de Bienes Raíces en Goshen y Elkhart, Indiana` | agent identity + market | acompañamiento, confianza, mudanza | `/` |
| `/es/compradores/` | `Compre su casa en Goshen y Elkhart, IN \| Lisa Collio` | `Comprar una casa en Goshen y Elkhart, Indiana` | buying process | proceso paso a paso, encontrar casa en Goshen/Elkhart, FAQ ×7 | `/buyers/` |
| `/es/vendedores/` | *(see JSON)* | `Vender su casa en Goshen y Elkhart, Indiana` | selling process | precio, marketing, FAQ ×11 | `/sellers/` |
| `/es/conozca-a-lisa/` | `Conozca a Lisa Collio \| Agente en Goshen y Elkhart` | `Conozca a Lisa Collio, Agente de Bienes Raíces en Goshen y Elkhart, Indiana` | bio / E-E-A-T | premios, servicio en su idioma, fe y comunidad, credenciales | `/about/` |
| `/es/mudarse-a-goshen/` | `Mudarse a Goshen, Indiana \| Lisa Collio` | `Mudarse a Goshen, Indiana: Lo que debe saber antes de dar el paso` | relocation | trabajo, escuelas, casas, costos | `/moving-to-goshen/` |
| `/es/viviendo-en-goshen/` | *(see JSON)* | `Vivir en Goshen, Indiana: Guía local de la ciudad` | local life | centro, parques, eventos, recursos | `/living-in-goshen/` |
| `/es/mudarse-a-elkhart/` | `Mudarse a Elkhart, Indiana \| Lisa Collio` | `Mudarse a Elkhart, Indiana: Lo que debe saber antes de dar el paso` | relocation | trabajo, escuelas, casas, costos, "¿Elkhart o Goshen?" | `/moving-to-elkhart/` |
| `/es/viviendo-en-elkhart/` | *(see JSON)* | `Vivir en Elkhart, Indiana: Guía local de la ciudad` | local life | museos, ríos, historia | `/living-in-elkhart/` |
| `/es/estadisticas-del-mercado/` | `Estadísticas del Mercado en Goshen y Elkhart, IN` | `Estadísticas del Mercado en Goshen y Elkhart, Indiana` | market data | condado de Elkhart, datos por zona, desempeño de Lisa | `/market-stats/` |
| `/es/tu-proximo-capitulo/` | `Tu Próximo Capítulo™ \| Lisa Collio, Agente de Bienes Raíces` | `Tu Próximo Capítulo™` | branded method | capítulos de vida | `/next-chapter-method/` |
| `/es/contacto/` | `Contacte a Lisa Collio \| Bienes Raíces en Goshen y Elkhart` | `Contacte a Lisa Collio` | contact | oficina, horarios | `/contact/` |
| `/blog/spanish/` | *(see JSON)* | `Artículos sobre comprar, vender y mudarse en Goshen y Elkhart, Indiana` | article hub | 56 articles | `/blog/` |

### 12.3 Search-intent differences between twins

Measurable divergences where the Spanish page targets a different query than its English twin:

| EN intent | ES intent | Assessment |
|---|---|---|
| `Does Lisa Collio Speak Spanish?` | `El proceso completo en español con Lisa Collio` | ES reframes from a yes/no identity question to a capability question — arguably better intent for a Spanish searcher, but drops the geographic qualifier the EN title carries |
| `Selling Your Home in Goshen and Elkhart, Indiana` | `Vender su casa en Goshen y Elkhart, Indiana` | Direct equivalent |
| `Living in Goshen, Indiana: A Local Agent's Guide to the City` | `Vivir en Goshen, Indiana: Guía local de la ciudad` | Direct equivalent |
| `What Is The Next Chapter Method™?` | `¿Qué es Tu Próximo Capítulo™?` | Branded, low-volume both sides |
| — | `¿Cuánto dinero necesito para comprar casa?` | **ES-only, high commercial intent, no geographic qualifier, no EN twin** |
| — | `Préstamos FHA y USDA explicados en español` | Same |
| — | `Crédito y preaprobación para comprar casa` | Same |

### 12.4 Structural observations (facts, not recommendations)

1. **The Spanish site is built for Spanish readers, not assembled from English.** Slugs, H2 framing, article set, and per-term style decisions (`docs/SPANISH_STYLE_DECISIONS.md`) all support this.
2. **`agente de bienes raíces` is the only agent term used.** The site is consistent, and consequently has **zero** coverage of `agente inmobiliario` / `corredor de bienes raíces` — synonyms that Spanish speakers in the US do use.
3. **No Spanish title or H1 contains a bilingual/language marker.** `bilingüe`, `hablo español`, `habla español`, `en su idioma` appear in body copy but never in a title or H1. The differentiator is invisible in the SERP snippet.
4. **`condado de Elkhart` appears on all 75 pages (footer) and in zero titles, H1s or descriptions.** The Spanish site has effectively no page-level county targeting.
5. **The strongest Spanish commercial assets carry no geography.** The 7 first-time-buyer articles average 1,368 words and none has Goshen or Elkhart in its title.
6. **`casas en venta`** — the highest-volume Spanish real-estate query class — **appears once on the whole site.** There is no listings/inventory surface (the site has no IDX/MLS search).

---

## 13. Image / ALT Audit

**VERIFIED.** 1,314 `<img>` tags across 157 pages, referencing 402 unique source files.

### 13.1 Technical hygiene

| Check | Result | Verdict |
|---|---|---|
| `<img>` tags total | 1,314 | |
| Unique image files referenced | 402 | |
| **Images with NO `alt` attribute** | **0** | ✅ |
| Images with `alt=""` (decorative) | 318 | ✅ appropriate — logos, icons, chrome |
| Images with descriptive alt | 996 | ✅ |
| **Images missing `width` or `height`** | **0** | ✅ CLS-safe |
| `loading="lazy"` | 904 | ✅ |
| `loading="eager"` | 94 | ✅ above-fold |
| No `loading` attribute | 316 | ⚠️ mostly chrome logos/icons |
| `decoding` attribute present | 493 | |
| `<picture>` / `<source>` elements | 883 | ✅ WebP negotiation |
| **Broken `<source srcset>` targets** | **0** | ✅ all 298 resolve |
| **Referenced image files missing from disk** | **0** | ✅ |
| Alt text carrying content-hash query strings | 0 | ✅ |

### 13.2 Format distribution

| Format | `<img>` references |
|---|---|
| `.jpg` | 767 |
| `.svg` | 316 |
| `.png` | 231 |

Plus 883 `<source>` elements offering `.webp`.

**WebP coverage gap:** of 726 raster files on disk, **602 have a `.webp` sibling and 124 do not**. The 124 are concentrated in `assets/images/elkhart/` — including several multi-megabyte files that are actively served:

| File | Size | Served as |
|---|---|---|
| `assets/images/elkhart/elkhart-living-downtown.jpg` | **3,989 KB** | raw JPEG (no WebP alternative exists) |
| `assets/images/elkhart/elkhart-moving-location-commute.jpg` | **2,339 KB** | raw JPEG |
| 20 further `elkhart-*.jpg` files | 0.5–3 MB each | raw JPEG |

### 13.3 Alt text quality

**Alt text on this site is unusually good.** Sampled strings are specific and descriptive:

- `"A covered brick front porch with a hanging egg chair beside a dark front door."`
- `"An empty bedroom with soft lavender walls, a ceiling fan, and wood floors."`
- `"RE/MAX awards and trophies earned by Lisa Collio, displayed in her Goshen office."`
- `"Premios y trofeos RE/MAX obtenidos por Lisa Collio, exhibidos en su oficina de Goshen."`

Only 5 distinct alt strings are shorter than 25 characters, and 4 of those are `"Google Reviews"` / `"Reseñas de Google"` on review-badge images — appropriate.

`audit.js` checks 15, 16 and 23 enforce alt-text correspondence, rejected-asset blocking, and same-source consistency; all pass.

### 13.4 Generic alt text on client photos (MEDIUM)

Two placeholder-style strings are reused across many different photographs:

| Alt string | Distinct image files carrying it |
|---|---|
| `"Client of Lisa Collio in Goshen and Elkhart, Indiana"` | **24** |
| `"Clients of Lisa Collio celebrating a home purchase in Goshen and Elkhart, Indiana"` | **28** |
| Spanish equivalents (`"Cliente de Lisa Collio en Goshen y Elkhart, Indiana"`) | similar |

These are the generic client-photo carousel strings. They do not violate any project rule and they are not empty — but 52 distinct photographs share two descriptions.

### 13.5 Same file, different alt (12 groups)

The same photograph carries a specific alt on one page and the generic string on another, within the same language:

| File | Alt A | Alt B |
|---|---|---|
| `client-reviews/review-maria-baltazar.jpg` | `"Maria Baltazar celebrating her new home"` | `"Client of Lisa Collio in Goshen and Elkhart, Indiana"` |
| `client-reviews/review-lourdes-peay.jpg` | `"Lourdes Peay, Goshen home seller"` | `"Client of Lisa Collio in Goshen and Elkhart, Indiana"` |
| `client-reviews/review-natalie-tiscareno.jpg` | `"Natalie Tiscareno's parents at their closing"` | `"Client of Lisa Collio…"` |
| `client-reviews/review-noel-trejo.jpg` (ES) | `"Noel Trejo celebrando la compra de su casa"` | `"Cliente de Lisa Collio…"` |
| …8 more groups | | |

Both strings are accurate; the difference is specificity by context (review block vs carousel). **LOW** — flagged because `audit.js` check 23 exists specifically to catch same-source alt divergence and does not flag these (they are in different component contexts).

### 13.6 Attention areas the brief named

| Subject | Findings |
|---|---|
| **Lisa** | `assets/images/lisa/` (67 files, 0 referenced from any page), `assets/images/meet-lisa/` (16 unreferenced), `hero/about.jpg` (1.7 MB). Alt text on Lisa's photos is specific and good. **No image of Lisa is declared as a schema `image` on `Person` or `RealEstateAgent`.** |
| **Goshen** | `assets/images/goshen/` — 36 files unreferenced. `assets/images/sections/goshen-*` in active use, mostly with WebP siblings. |
| **Elkhart** | `assets/images/elkhart/` — 26 unreferenced; the referenced ones are the WebP-less multi-megabyte files above. |
| **Homes** | `homes-general/` (140 unreferenced), `homes-goshen/` + `homes-elkhart/` (address-keyed folders, ~100 unreferenced). Sold-listing framing is used only in `<figcaption>` on `/sellers/` and `/es/vendedores/` (`"1765 N Bay Drive, Elkhart — Sold by Lisa Collio"`), which is the consented-listing path. |
| **RE/MAX** | `logos/remax-balloon-black.svg` — `alt=""` + `aria-hidden="true"`, with the brokerage name as adjacent live text. Correct for 876 IAC 8-1-8 prominence. |
| **Spanish / bilingual content** | Spanish alt strings exist for every Spanish page's images and are of comparable specificity to English (the EN/ES Parity Standard's "substance, not just count" test passes on inspection). One image, `get-pre-approved-first.png`, carries English baked-in text; a Spanish version `get-pre-approved-first-es.png` exists and is wired to `/es/compradores/`. |

### 13.7 Repository / deploy weight (HIGH)

| Metric | Value |
|---|---|
| `assets/images/` total on disk | **763 MB** |
| Image files on disk | 1,364 |
| Referenced by at least one page | 700 |
| **Unreferenced** | **664 files, ~504 MB** |
| `assets/css/` | 116 KB |
| `assets/fonts/` | 200 KB |
| `assets/js/` | 12 KB |

`netlify.toml` sets `publish = "."`, so **all 504 MB of unreferenced images are deployed to production** and served under `Cache-Control: immutable`. Largest unreferenced folders: `homes-general/` (140), `sections/` (127), `blog-headers/` (119), `lisa/` (67).

Individual files over 250 KB: **128**, up to 6,434 KB (`client-reviews/review-eber-trejo-1.jpg`).

---

## 14. Sitemap / Robots / Indexing Audit

### 14.1 `robots.txt` — complete contents

```
User-agent: *
Allow: /

Sitemap: https://lisacolliorealtor.com/sitemap.xml
```

| Check | Result |
|---|---|
| Blocks anything | No |
| Sitemap declared | ✅ absolute, HTTPS, canonical host |
| `llms.txt` declared | ❌ — `llms.txt` exists (46 KB, generated by `llms.js`) but robots.txt does not point to it |
| Crawl-delay | none |
| AI-crawler directives (GPTBot, ClaudeBot, PerplexityBot, CCBot…) | **none** — all allowed by the wildcard |

### 14.2 `sitemap.xml`

| Check | Result |
|---|---|
| Entries | 154 |
| Entries in the repo with no matching file | **0** |
| Pages on disk absent from the sitemap | 3 (404 + 2 thank-you) — correct |
| Duplicate entries | **0** |
| Non-HTTPS or non-canonical-host URLs | **0** |
| Trailing-slash consistency | ✅ all consistent |
| **`<lastmod>`** | **0 of 154** |
| `<changefreq>` | 8 of 154 |
| `<priority>` | 8 of 154 |
| `xhtml:link` hreflang | 56 of 154 (§5.6) |
| Sitemap index | none (single file, well under limits) |
| Image sitemap | none |

The 8 entries carrying `changefreq`/`priority` are `/disclaimers/`, `/sources/`, `/es/disclaimers/`, `/es/fuentes/` and their neighbours — leftovers, not a system.

**No `<lastmod>` anywhere (MEDIUM).** Combined with the article `datePublished` clustering (§7.6), the site gives crawlers no freshness signal at all.

### 14.3 Indexing controls

| Control | Where | Value |
|---|---|---|
| `meta robots` | `/404.html` | `noindex` |
| `meta robots` | `/contact/thank-you/` | `noindex, follow` |
| `meta robots` | `/es/contacto/gracias/` | `noindex, follow` |
| `X-Robots-Tag` header | `netlify.toml` | **not set anywhere** |
| `rel="nofollow"` | any page | **0 occurrences** |
| `rel="noopener"` / `rel="noreferrer"` | external links | not audited in depth; only 14 external links exist |

### 14.4 URL policy

| Property | Implementation |
|---|---|
| Case | lowercase throughout ✅ |
| Word separator | hyphen ✅ |
| Trailing slash | **always present**, on canonicals, hreflang, sitemap, internal links, and redirect targets ✅ |
| `www` vs non-`www` | **non-`www` is canonical.** Enforced in canonical tags, schema `@id`s, sitemap, robots.txt. **The `www` → non-`www` redirect is NOT in `netlify.toml`** — Netlify handles this at the DNS/domain level, outside the repo. **NOT VERIFIED** — must be confirmed in the Netlify dashboard after DNS cutover. |
| HTTP → HTTPS | **Not in `netlify.toml`.** Netlify forces HTTPS by default once a certificate is provisioned. **NOT VERIFIED** from the repo. |
| Dates in URLs | none ✅ |
| Query parameters | only `?v=<hash>` on assets, never on pages ✅ |
| URL depth | max 3 segments (`/blog/community/slug/`) |

### 14.5 Headers (`netlify.toml`)

| Header | Value |
|---|---|
| `X-Content-Type-Options` | `nosniff` |
| `X-Frame-Options` | `DENY` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Content-Security-Policy` | Self-hosted default, widened 19 Aug 2026 for `googletagmanager.com`, `connect.facebook.net`, `google-analytics.com`, `analytics.google.com`, `www.facebook.com` |
| `Cache-Control` `/assets/css/*`, `/assets/images/*`, `/favicon*`, `/apple-touch-icon.png` | `public, max-age=31536000, immutable` |
| `Cache-Control` `/assets/fonts/*`, `/assets/js/*` | `public, max-age=604800, must-revalidate` |
| `Cache-Control` `/*.html` | `public, max-age=0, must-revalidate` |

**Known open risk, recorded in the file itself:** the CSP `connect-src` list was derived from Google's and Meta's published docs, not from a live network trace (this sandbox blocks those hosts). Google's own GA4 guidance recommends `*.google-analytics.com` / `*.analytics.google.com` wildcards because collection endpoints are region-sharded. **A blocked collection host fails silently.** A post-deploy console check is required. **NOT VERIFIED.**

### 14.6 Which URLs will be presented to Google

**154 URLs**, all `https://lisacolliorealtor.com/…` with a trailing slash: 154 sitemap entries = 154 self-canonicalizing, indexable pages. Plus 7 legacy paths that 301 into that set. Nothing else is discoverable — there are no parameterized URLs, no pagination, no faceted navigation, no IDX/listing routes.

### 14.7 Analytics — a divergence from the project's own documentation

`CLAUDE.md` line 12 states: *"Host: Netlify (server-side, cookie-less analytics)."*

**The implementation as of 19 August 2026 is different:**

| Tag | ID | Loading |
|---|---|---|
| Google Analytics 4 | `G-K02P9DZ2JL` | via `gtag.js` |
| Google Ads | `AW-10807670744` | via the same `gtag.js` |
| Meta Pixel | `1510998314037084` | `connect.facebook.net` |

All three load through `assets/js/consent.js`, which is **load-on-accept, not load-then-suppress**: nothing is requested from the network until the visitor clicks Accept, and declining or ignoring the banner produces zero third-party activity. The banner is bilingual and reads `document.documentElement.lang`.

This is a correctly-implemented consent gate. **The CLAUDE.md line describing the site as cookie-less is stale** and should not be relied on by the downstream auditor.

---

## 15. Redirect / Migration Audit

### 15.1 Redirects that exist

All in `netlify.toml`. **All 7 verified locally as 301 with the correct destination**, plus the 404 catch-all.

| From | To | Status | Verified |
|---|---|---|---|
| `/communities/goshen/` | `/living-in-goshen/` | 301 | ✅ |
| `/communities/elkhart/` | `/living-in-elkhart/` | 301 | ✅ |
| `/es/comunidades/goshen/` | `/es/viviendo-en-goshen/` | 301 | ✅ |
| `/es/comunidades/elkhart/` | `/es/viviendo-en-elkhart/` | 301 | ✅ |
| `/blog/community/elkhart-indiana-school-district/` | `/blog/community/elkhart-indiana-school-districts/` | 301 | ✅ |
| `/blog/community/elkhart-indiana-landmarks-attractions/` | `/blog/community/elkhart-indiana-landmarks-amenities/` | 301 | ✅ |
| `/blog/buyers/what-makes-goshen-indiana-desirable-place-to-live/` | `/blog/buyers/is-goshen-indiana-good-place-to-buy-home/` | 301 | ✅ |
| `/*` | `/404.html` | 404 | ✅ |

**All four redirects the brief specifically asked about exist and work.** Ordering is correct — the `/*` catch-all is last, and Netlify's first-match-wins semantics are respected.

### 15.2 Redirect chains and loops

**None.** Every redirect target is a live 200 page. No redirect points at another redirect.

### 15.3 Renames found in the repository

Searching commit history and the project documents, these are the renames this codebase has performed:

| Old path | New path | Redirect exists |
|---|---|---|
| `/communities/goshen/` | `/living-in-goshen/` | ✅ |
| `/communities/elkhart/` | `/living-in-elkhart/` | ✅ |
| `/es/comunidades/goshen/` | `/es/viviendo-en-goshen/` | ✅ |
| `/es/comunidades/elkhart/` | `/es/viviendo-en-elkhart/` | ✅ |
| `/blog/community/elkhart-indiana-school-district/` | `…-districts/` | ✅ |
| `/blog/community/elkhart-indiana-landmarks-attractions/` | `…-amenities/` | ✅ |
| `/blog/buyers/what-makes-goshen-indiana-desirable-place-to-live/` | `/blog/buyers/is-goshen-indiana-good-place-to-buy-home/` | ✅ |

**No rename found in this repository lacks a redirect.**

### 15.4 Migration from the legacy `lisacolliorealtor.com`

**NOT VERIFIED — and this is the single largest unverifiable gap in the audit.**

The brief states the current `lisacolliorealtor.com` will be replaced by this codebase. This audit can establish what redirects exist **for paths this repository has itself renamed**. It cannot establish anything about the legacy site because:

1. `CLAUDE.md` records that DNS has not cut over: *"Until DNS cutover, `lisacolliorealtor.com` does not point at this codebase and testing against it returns false 404s."*
2. The repository contains **no** inventory, crawl, export, or URL list of the legacy site. Searched: `docs/`, `content/`, `netlify.toml`, `docs/LAUNCH_RUNBOOK.md`, `docs/LAUNCH_CHECKLIST.md`.
3. This session has no network access to fetch the live site.

**What is therefore unknown:**

- Every legacy URL not in the 7-row table above
- Which legacy URLs currently hold rankings or backlinks
- Whether the legacy site used a different URL structure (`/listings/`, `/blog/YYYY/MM/`, `.html` extensions, query-string pages, `www`)
- Whether any legacy Spanish URLs exist and where they should map
- Whether the legacy site had an IDX/listings section that must be redirected or gracefully retired

**Missing redirects: cannot be enumerated without a legacy URL inventory.** The required input is a crawl or export of the current production site (or its Search Console "Pages" report), which must be obtained before cutover. Without it, every legacy URL not in the table above will resolve to the `/*` → `404.html` catch-all.

`docs/LAUNCH_RUNBOOK.md` and `docs/LAUNCH_CHECKLIST.md` exist and cover the cutover mechanics; neither contains a legacy URL map.

---

## 16. Navigation Audit

**VERIFIED** by parsing `components/header.html`, `components/header-es.html`, `components/footer.html`, `components/footer-es.html` and by rendering 25 pages in Chromium at 1366×900.

### 16.1 Structure

Header and footer are single-sourced components injected into every page by `build.js` between marker comments. `npm run check` confirms all 157 pages are current with their components. There is **one** header design and **one** footer design per language — no page has a divergent nav.

### 16.2 English navigation

| Item | Target | Type |
|---|---|---|
| Home | `/` | link |
| Buyers | `/buyers/` | link |
| Sellers | `/sellers/` | link |
| Communities ▾ | — | dropdown |
| ⤷ Goshen ▸ Moving to Goshen | `/moving-to-goshen/` | link |
| ⤷ Goshen ▸ Living in Goshen | `/living-in-goshen/` | link |
| ⤷ Elkhart ▸ Moving to Elkhart | `/moving-to-elkhart/` | link |
| ⤷ Elkhart ▸ Living in Elkhart | `/living-in-elkhart/` | link |
| Meet Lisa | `/about/` | link |
| Life Chapters | `/next-chapter-method/` | link |
| Resources ▾ ▸ Market Stats | `/market-stats/` | link |
| Resources ▾ ▸ Blog | `/blog/` | link |
| Contact | `/contact/` | link |
| 🌐 Hablo español | `{{esHref}}` | **language switcher** |
| Call (574) 370-5410 | `tel:+15743705410` | CTA |
| Text | `sms:+15743705410` | CTA |

### 16.3 Spanish navigation — structurally identical

| Item | Target |
|---|---|
| Inicio | `/es/` |
| Compradores | `/es/compradores/` |
| Vendedores | `/es/vendedores/` |
| Comunidades ▾ ▸ Goshen ▸ Mudarse a Goshen | `/es/mudarse-a-goshen/` |
| ⤷ Goshen ▸ Vivir en Goshen | `/es/viviendo-en-goshen/` |
| ⤷ Elkhart ▸ Mudarse a Elkhart | `/es/mudarse-a-elkhart/` |
| ⤷ Elkhart ▸ Vivir en Elkhart | `/es/viviendo-en-elkhart/` |
| Conozca a Lisa | `/es/conozca-a-lisa/` |
| Capítulos de Vida | `/es/tu-proximo-capitulo/` |
| Recursos ▾ ▸ Estadísticas del Mercado | `/es/estadisticas-del-mercado/` |
| Recursos ▾ ▸ Blog | `/blog/spanish/` |
| Contacto | `/es/contacto/` |
| 🌐 English | `{{enHref}}` |
| Llamar al (574) 370-5410 | `tel:+15743705410` |
| Enviar mensaje | `sms:+15743705410` |

**✅ The Goshen Moving/Living and Elkhart Moving/Living structure the brief asked about is present and identical in both languages.**

### 16.4 Desktop vs mobile

**One navigation, one markup.** Mobile uses a CSS-only checkbox toggle (`<input type="checkbox" id="nav-open">` + `<label class="nav-toggle">`), no JavaScript. There is no separate mobile menu, so desktop and mobile expose exactly the same links — a structural strength.

Dropdowns open on hover and on `tabindex="0"` focus. The `<span class="nav-drop__label">` group headers ("Communities", "Resources", "Goshen", "Elkhart") are **not links** — they are labels. Consequence: there is no `/communities/` or `/resources/` landing page, by design.

### 16.5 Language switcher

Detailed in §3.3. **Correct on 57 pages (all main/legal/utility). Wrong on 77 of the 134 paired pages (every blog article).** Renders as an `<a class="hablo-badge" hreflang="es" lang="es">` with a globe glyph and an arrow.

### 16.6 Footer

Identical on all 157 pages, in the locked seven-item order:

1. Footer signature (single line, includes `$20M+ Sold`, `120+ homes sold`, `Top 20% Elkhart County`, `Hablo español`, `REALTOR®`, `NAR® Member`, `SRES®`, `RE/MAX Results, The Viruez Team`, `Licensed in Indiana #RB21002460`)
2. Composite-story disclaimer
3. Content reliability disclaimer
4. Agent-not-lender statement
5. Equal Housing Opportunity statement + logo
6. "Each Office Independently Owned and Operated."
7. Legal links: `/terms/` `/privacy/` `/accessibility/` `/fair-housing/` `/disclaimers/` `/sources/` + Blog + `/privacy/#cookies`

Footer link count per page: 8 EN / 8 ES. **Verified present on 157/157 pages.**

### 16.7 Breadcrumbs

| Aspect | Status |
|---|---|
| `BreadcrumbList` schema | 152 / 157 pages |
| Visible breadcrumb trail | ✅ present on article and interior pages (e.g. `Home · Blog · Community · Does Lisa Speak Spanish`) |
| Absent on | `/`, `/es/` (correct), and the 3 utility pages |
| Breadcrumbs match URL hierarchy | ✅ |
| Breadcrumbs localized | ✅ (`Inicio · Artículos en español · Todo en español`) |

### 16.8 Accessibility features observed

- `<a class="skip-link" href="#main">` on every page, localized
- `aria-label` on the brand lockup, nav, menu toggle, language badge, and both CTAs
- `aria-current="page"` set on the active nav item via build parameters
- `aria-hidden="true"` on all decorative glyphs and logos
- `aria-labelledby` linking dropdown sublists to their group labels

### 16.9 Accessibility of every important page

**Every one of the 157 pages is reachable within 2 clicks** from any other page: the 24 main pages and 12 legal pages are direct nav/footer links; the 113 articles are one click from a hub, which is itself a nav link.

---

## 17. Technical Build / Runtime Audit

### 17.1 Build

There is no deploy-time build. `netlify.toml` has `publish = "."` and no `command`. Every page is committed, expanded HTML.

Repo scripts (all run read-only or in `--check` mode for this audit):

| Command | Result |
|---|---|
| `node build.js --check` | ✅ `All pages are up to date.` (exit 0) |
| `node hash-assets.js --check` | ✅ `Manifest: 1348 asset files hashed. All asset references are correctly hashed.` (exit 0) |
| `node hreflang.js --check` | ✅ `67 pairs (134 pages). 0 page(s) would change.` (exit 0) |
| `node audit.js` | ✅ `Audited 156 pages / 166 HTML files. All hard checks passed.` — **1 warning** (exit 0) |

The single warning: `[seo] /blog/community/does-lisa-collio-speak-spanish/ title 65 chars (target <=60)`.

**Build errors: 0.**

Asset reference hashing covers 3,679 references across 6 patterns (href/src 2,369 · srcset 976 · og/twitter meta 192 · JSON-LD image 96 · `--hero-img` 24 · heroImg marker JSON 22).

### 17.2 Runtime — HTTP

A local static server replaying `netlify.toml`'s redirect and 404 rules was used.

| Test | Result |
|---|---|
| All 157 page URLs | **157 × HTTP 200** |
| 7 legacy redirect paths | **7 × HTTP 301**, correct destinations |
| `/nonexistent-page/` | **HTTP 404**, serves `404.html` |
| `/sitemap.xml`, `/robots.txt`, `/llms.txt` | 200 |
| **Total non-200 among page URLs** | **0** |

### 17.3 Runtime — rendered (Chromium via Playwright, 1366×900, `networkidle`)

25 representative pages rendered — both homepages, all 4 service hubs, all 4 location pillars EN, 4 ES pillars, both bios, both contacts, both market-stats, both method pages, both blog hubs, the bilingual article pair, and the 404.

| Check | Result |
|---|---|
| Pages rendering successfully | **25 / 25** |
| **JavaScript errors** | **0** |
| **Console errors** | **0** |
| **Console warnings** | **0** |
| **Failed network requests** | **0** |
| **HTTP ≥400 subresource responses** | **0** |
| **Broken images** (`complete && naturalWidth === 0`) | **0** |
| CSS load failures | 0 |
| Font load failures | 0 |
| `<html lang>` correct on every page | ✅ 25 / 25 |
| Exactly one `<h1>` rendered per page | ✅ 25 / 25 |
| Rendered body text present | ✅ 1,595–17,957 chars |

The site is fully functional with JavaScript disabled — the only script is `consent.js` (the cookie banner), and navigation, dropdowns and the mobile menu are CSS-only.

### 17.4 Page weight (HIGH)

Measured by summing actual response bodies, after scrolling to the bottom to trigger lazy loads.

| Page | Total transfer | Requests | HTML | CSS | Fonts | Images |
|---|---|---|---|---|---|---|
| **`/blog/`** | **19.97 MB** | 73 | 76 KB | 35 KB | 122 KB | **19.64 MB** |
| **`/blog/spanish/`** | **15.89 MB** | 58 | 70 KB | 35 KB | 122 KB | **15.57 MB** |
| **`/about/`** | **8.41 MB** | 35 | 44 KB | 35 KB | 122 KB | 8.11 MB |
| `/sellers/` | 7.35 MB | 61 | 63 KB | 35 KB | 122 KB | 7.03 MB |
| `/es/` | 6.89 MB | 28 | 34 KB | 35 KB | 122 KB | 6.60 MB |
| `/` | 6.64 MB | 29 | 33 KB | 35 KB | 122 KB | 6.36 MB |
| `/es/compradores/` | 6.29 MB | 36 | 42 KB | 35 KB | 122 KB | 6.00 MB |
| `/es/vendedores/` | 6.06 MB | 62 | 65 KB | 35 KB | 122 KB | 5.74 MB |
| `/living-in-goshen/` | 5.71 MB | 29 | 42 KB | 35 KB | 122 KB | 5.41 MB |
| `/buyers/` | 4.94 MB | 37 | 44 KB | 35 KB | 122 KB | 4.64 MB |
| `/moving-to-goshen/` | 4.64 MB | 30 | 42 KB | 35 KB | 122 KB | 4.35 MB |
| `/living-in-elkhart/` | 4.29 MB | 28 | 36 KB | 35 KB | 122 KB | 4.00 MB |
| `/market-stats/` | 2.91 MB | 14 | 24 KB | 35 KB | 122 KB | 2.63 MB |
| `/contact/` | **1.60 MB** | 14 | 21 KB | 35 KB | 122 KB | 1.32 MB |

**HTML, CSS and fonts are excellent** — 21–76 KB HTML, a constant 35 KB CSS, 122 KB self-hosted WOFF2, and never more than 73 requests. **Images are 95–98% of every page's weight.**

### 17.5 The hero-image mechanism (root cause of the LCP problem)

Heroes are set through a CSS custom property, `index.html:214`:

```html
<section class="hero hero--photo"
         style="--hero-img:url('/assets/images/hero/home.jpg?v=ab9cb318');
                --hero-focal-x:58%;--hero-focal-y:25%">
```

A CSS `url()` cannot participate in `<picture>`/`type="image/webp"` negotiation, so **the `.jpg` is always served even though a `.webp` sits beside it**:

| Hero | `.jpg` served | `.webp` on disk, unused |
|---|---|---|
| `living-in-goshen.jpg` | **3,056 KB** | 2,866 KB |
| `buyers.jpg` | **2,543 KB** | 2,302 KB |
| `moving-to-elkhart.jpg` | **2,538 KB** | 2,200 KB |
| `moving-to-goshen.jpg` | **2,010 KB** | 1,609 KB |
| `home.jpg` | **1,810 KB** | 1,367 KB |
| `about.jpg` | **1,731 KB** | 1,257 KB |
| `next-chapter-method.jpg` | **1,612 KB** | 1,129 KB |
| `living-in-elkhart.jpg` | **1,633 KB** | 1,242 KB |
| `market-stats.jpg` | **1,150 KB** | 1,057 KB |
| `contact.jpg` | **916 KB** | 772 KB |
| `blog.jpg` | **741 KB** | 701 KB |

Every hero is also a single fixed-resolution file with no `srcset` — a phone downloads the same multi-megabyte asset as a desktop.

**The LCP element on every Tier-1 and Tier-2 page is a 0.7–3.1 MB unoptimized JPEG.** Core Web Vitals will not pass in this state. **NOT VERIFIED:** actual field CWV / PageSpeed scores require production.

### 17.6 Other runtime notes

| Item | Status |
|---|---|
| Third-party requests before consent | **0** — verified in the render (all 25 pages loaded with zero external hosts contacted) |
| Render-blocking resources | 2 stylesheets, both self-hosted, 35 KB combined |
| Font loading | `<link rel="preload">` for both WOFF2, self-hosted, no CDN |
| Layout shift risk | Low — every `<img>` has explicit `width`/`height` |
| Broken links (internal) | 0 |
| Broken images | 0 |
| Redirect chains | 0 |
| Mixed content | 0 — no `http://` resource references |

---

## 18. AEO / AI Readiness

**VERIFIED** structurally. No ranking predictions are made.

### 18.1 Structural signals present

| Signal | Coverage |
|---|---|
| `FAQPage` schema | **112 / 157 pages (71%)** |
| Total FAQ questions in schema | 378 |
| H2s phrased as questions | 25 pages |
| Article titles phrased as questions | 43 pages (the "no pipe" title group) |
| Direct-answer patterns (`The short answer:` / bolded lead answer) | present on the sampled Q-titled articles |
| `HowTo` schema | 3 pages |
| `BreadcrumbList` | 152 pages |
| `speakable` | 0 |
| Comparison tables / definition lists | present on market-stats and community pages |
| Cited sources | `/sources/` + `/es/fuentes/` — 2,217 / 2,554 words of per-page citation, unusually thorough |
| Verifiable data | Market figures carry source + date and route to `/market-stats/` as canonical |
| First-hand experience markers | consistent — "Based in Goshen, not just serving it", agent-voice throughout |
| `llms.txt` | ✅ present, 46 KB, lists **every** page in both languages with its description, and explicitly tells a model the ES pages are adaptations, not translations |

### 18.2 FAQ coverage against the project's own 5-question standard

| FAQ count | Pages |
|---|---|
| 0 | 45 |
| 3 | **89** |
| 4 | 3 |
| 5 | 10 |
| 6 | 6 |
| 7 | 1 |
| 8 | 1 |
| 11 | 2 |

CLAUDE.md's standard is "every page carries a 5-question FAQ section." Implemented reality:

- Both homepages: **4**
- 89 blog articles: **3**
- `/contact/` and `/es/contacto/`: **0**
- `/blog/` and `/blog/spanish/`: **0**
- Hub pages overshoot: `/buyers/` 8, `/es/compradores/` 7, `/sellers/` and `/es/vendedores/` 11

This is already logged as an open decision at `docs/PRE_LAUNCH_PUNCH_LIST.md:290` ("FAQ count runs below the 5-question standard on several page types… Not blocking broker review — Lisa's ruling").

### 18.3 Pages with the strongest current AEO structure

Ranked by measurable structure only (question-form H1 + `FAQPage` + direct-answer opening + word count + `HowTo`/`Place` enrichment):

| Page | Why |
|---|---|
| `/blog/community/does-lisa-collio-speak-spanish/` | Question H1, `The short answer:` opening, FAQPage, 1,021 words, 11 inbound |
| `/blog/community/how-many-homes-lisa-collio-sold-goshen-elkhart/` | Question H1, direct numeric answer, FAQPage |
| `/blog/sellers/what-is-an-sres-seniors-real-estate-specialist/` | Definitional question, FAQPage, 1,336 words |
| `/market-stats/` + `/es/estadisticas-del-mercado/` | Dated, sourced, tabular data; dual `WebPage`+`Article` type |
| `/blog/relocation/moving-to-goshen-indiana-from-out-of-state/` | **`HowTo` schema** + FAQPage + 1,118 words |
| `/blog/community/moving-to-elkhart-indiana-from-out-of-state/` | `HowTo` schema (but **no FAQ** — see below) |
| `/moving-to-goshen/`, `/es/mudarse-a-goshen/` | 6 FAQs, 2,328 / 2,818 words, 11 H2s |
| `/blog/community/things-to-do-in-goshen-indiana/` | 1,972 words, `Place` schema, FAQPage |
| The 7 Spanish first-time-buyer articles | Question-form titles, direct answers, FAQPage, 1,183–1,447 words — **the strongest AEO cluster on the site in either language** |

### 18.4 AEO weaknesses

| Weakness | Detail |
|---|---|
| **14 Spanish articles have no FAQ block at all** | All 12 twins of the `/blog/sellers/` cluster, plus one buyers and one community twin. Zero PAA / FAQ-rich-result eligibility in Spanish for selling queries. §10 |
| **7 English Elkhart articles have no FAQ block** | `downtown-elkhart-indiana`, `things-to-do-in-elkhart-indiana`, `community-events-in-elkhart-indiana`, `cost-of-living-in-elkhart-indiana`, `moving-to-elkhart-indiana-from-out-of-state`, `buying-an-older-home-in-elkhart-indiana`, `working-in-the-rv-industry-and-buying-a-home-in-elkhart-indiana` — **their Spanish twins all have one** |
| **No visible author byline or date on any page** | §19 |
| **No `speakable` markup** | 0 pages |
| `/contact/` has no FAQ | A high-intent page with no question coverage |
| 89 articles capped at 3 FAQs | Below the project's own standard |
| `dateModified` ≈ `datePublished` sitewide | No "freshness" signal for an AI summarizer |
| No `sameAs` | An AI answer engine cannot corroborate the entity externally |

---

## 19. E-E-A-T / Authority Signals

### 19.1 Where each signal appears

| Signal | Pages carrying it | Where |
|---|---|---|
| `120+` families/homes | **156** (footer) + prose on `/`, `/about/`, `/next-chapter-method/`, 3 articles | footer signature + body |
| `$20M+` closed | **156** (footer) + 91 in body | footer + body |
| `Top 20% Elkhart County` | **156** (footer) + 75 body | footer + body |
| `SRES®` | **156** (footer) + 122 body | footer + `hasCredential` schema |
| `REALTOR®` | **156** (footer) + 91 body | footer + `hasCredential` |
| `NAR® Member` | **156** (footer) + 82 body | footer + `hasCredential` |
| `RE/MAX Results, The Viruez Team` | **157** (header + footer) + 122 body | header lockup, footer, `memberOf`/`worksFor` |
| Indiana license `#RB21002460` | **159 / 159 HTML files** | footer + `identifier` schema |
| NRDS `387056478` | 138 (schema only) | `identifier` — never visible, per the locked rule |
| Bilingual EN/ES | **157** (nav badge) + `knowsLanguage: ["en","es"]` on 138 agent + 125 person nodes | header + schema |
| Goshen expertise | 157 | nav, H1s, `areaServed`, 4 pillars, 40+ articles |
| Elkhart expertise | 157 | same |
| **Elkhart County expertise** | 40 body pages + footer | **not in any schema field** |
| Awards (`RE/MAX Executive Club`, `100% Club`) | 3 pages | `Person.award` on `/`, `/about/`, `/es/conozca-a-lisa/` |
| Education (`Bethel College`, etc.) | 2 pages | `Person.alumniOf` |
| Client reviews (verbatim) | 74 EN + 62 ES pages | visible sections + `Review` schema |
| `AggregateRating` 5.0 / 39 | 134 pages | schema |
| Cited sources | `/sources/`, `/es/fuentes/` | dedicated pages, per-article citations |

### 19.2 What is strong

- **The credential stack is on every single page** and is machine-readable via `hasCredential` and `identifier`, not just prose.
- **`knowsLanguage: ["en","es"]`** appears on 263 schema nodes — the bilingual claim is structured data, not marketing copy.
- **`/sources/` and `/es/fuentes/`** are 2,217 / 2,554 words of per-page source citation. For a local agent site this is exceptional.
- **`docs/VERIFIED_FACTS.md`** exists as a canonical fact register with sources, and the build procedure requires facts be registered there before use.
- **`/about/` and `/es/conozca-a-lisa/`** carry awards, education, faith/community background, and 6 FAQs each.
- **Verbatim review discipline**, with a documented Review Language Standard for translated reviews.

### 19.3 What is missing

| Gap | Severity | Detail |
|---|---|---|
| **No visible author byline on any page** | **HIGH** | Searched all 157 pages for a byline class, "By Lisa Collio", "Por Lisa Collio", or any `<time>` element. **Result: 0 pages.** All 12 apparent hits were false positives (alt text, legal-page prose, figcaptions). `BlogPosting.author` is declared in schema on 125 pages and rendered nowhere. A reader cannot see who wrote any article. |
| **No visible publication or updated date on any page** | **HIGH** | **`<time>` element count sitewide: 0.** `datePublished` / `dateModified` exist in schema only. |
| **No author bio block on articles** | MEDIUM | Articles end with "More from Lisa" + reviews + CTA, never with an author card linking to `/about/` |
| **`/about/` receives 0 in-content links** | MEDIUM | §9.2 — the primary E-E-A-T page is nav-only |
| **`sameAs`: 0** | **HIGH** | §8.6 — no external corroboration of any kind |
| **No `image` on `Person` or `RealEstateAgent`** | MEDIUM | No headshot is declared as the entity's image |
| **4 articles fragment the author entity** | MEDIUM | §7.6 — inline `Person` without `@id` |
| Elkhart County absent from schema | MEDIUM | Body-copy-only, despite being a target query |
| Date clustering | MEDIUM | 124 of 125 articles dated within one July 2026 week |
| No testimonials attributed to named local institutions | LOW | Reviews are client-only |

### 19.4 Author attribution — precise finding

| Attribution mechanism | Present? |
|---|---|
| `BlogPosting.author` → `@id .../#lisa` | ✅ 121 pages |
| `BlogPosting.author` → inline Person | ⚠️ 4 pages |
| `BlogPosting.publisher` | ✅ 121 pages |
| `meta name="author"` | ❌ 0 pages |
| Visible byline text | ❌ **0 pages** |
| Visible `<time datetime="…">` | ❌ **0 pages** |
| Author avatar / bio card on articles | ❌ 0 pages |
| Link from article to `/about/` | ❌ 0 articles |

---

## 20. Missing Pages / Missing Signals

### 20.1 Missing pages (PLANNED / NOT IMPLEMENTED, or simply absent)

| Missing | Status | Evidence |
|---|---|---|
| **Dedicated "Spanish-speaking REALTOR® in Goshen" page** | **Absent** — never planned in any repo document | §11 |
| **Dedicated "agente de bienes raíces que habla español en Goshen" page** | **Absent** | §11, §12 |
| Spanish blog category hubs (`/blog/spanish/compradores/`, `/vendedores/`, `/comunidad/`) | **Absent** — 5 EN category hubs have no ES counterpart | §2.6 |
| Spanish twins for 8 English buyer articles | **Absent, documented as intentional** | `audit.js:308-316` |
| English twins for 7 Spanish first-time-buyer articles | **Absent, documented as intentional** | `audit.js:318-324` |
| Testimonials / reviews landing page | Absent — reviews are embedded sitewide, no dedicated page | — |
| Listings / IDX / "homes for sale" surface | Absent — no MLS integration in the repo | — |
| Neighborhood-level pages (below city) | Absent | — |
| Service pages for buyer/seller sub-intents (first-time buyer, downsizing, relocation service) | Absent as pages; covered as article topics | — |
| `/communities/` or `/resources/` landing pages | Absent by design — nav group labels are `<span>`, not links | §16.4 |

### 20.2 Missing signals

| Missing | Where it should live |
|---|---|
| `og:title`, `og:description`, `og:url`, `og:type`, `og:site_name`, `og:locale` | all 157 pages |
| `twitter:title`, `twitter:description`, `twitter:image:alt` | all 157 pages |
| `og:image` | 61 pages including `/`, `/es/`, `/buyers/`, `/sellers/`, `/about/`, `/contact/` |
| `sameAs` | `Person` + `RealEstateAgent` |
| `image` | `Person` + `RealEstateAgent` |
| `geo`, `hasMap`, `priceRange`, `description`, `slogan` | `RealEstateAgent` |
| `@id` + `url` + `sameAs` on the RE/MAX Results organization | `memberOf` / `worksFor` |
| Elkhart County | `areaServed` |
| `Service` / `Offer` nodes for buyer + seller representation | `/buyers/`, `/sellers/` + ES twins |
| Visible author byline | all 113 articles |
| Visible `<time>` published/updated | all 113 articles |
| `<lastmod>` | all 154 sitemap entries |
| `xhtml:link` hreflang | 76 paired sitemap entries |
| `llms.txt` declaration | `robots.txt` |
| AI-crawler directives | `robots.txt` |
| FAQ block | 14 ES articles + 7 EN articles |
| Correct language-switcher target | 77 pages |
| WebP siblings | 124 raster files |
| Responsive `srcset` on heroes | 11 hero images |
| Legacy-site URL inventory | `docs/` — required before DNS cutover |

---

## 21. Issues by Severity

### CRITICAL

| # | Issue | File(s) | Evidence |
|---|---|---|---|
| C1 | **Language-switcher badge points at the wrong page on 77 of 134 paired pages** — every blog article. Contradicts the page's own `<link rel="alternate">`; the badge itself carries `hreflang`. In-content cross-language links are 0, so this *is* the bilingual journey. | `components/header.html:60`, `components/header-es.html:60`, `build.js:36-37`, + 77 page files | §3.3, §5.6 |
| C2 | **Open Graph is 6% implemented.** 0/157 pages have `og:title`, `og:description`, `og:url`, `og:type`, `og:site_name`, `og:locale`; 0/157 have `twitter:title`/`twitter:description`; 61 pages have no `og:image` at all, including the homepage and every Spanish main page. | all 157 page files | §4.1, tracked at `docs/PRE_LAUNCH_PUNCH_LIST.md:443` |

### HIGH

| # | Issue | File(s) | Evidence |
|---|---|---|---|
| H1 | **14 Spanish articles have no FAQ section and no FAQPage schema** while their English twins have both — all 12 twins of `/blog/sellers/`, plus one buyers twin and one community twin. Real content divergence, verified against the visible `Preguntas frecuentes` heading. **Not tracked in any repo document.** | `blog/spanish/{como-vender-casa-elkhart-mejor-precio, cuanto-tiempo-vender-casa-goshen, buen-momento-comprar-casa-goshen, que-hace-diferente-lisa-collio, vender-casa-goshen-lisa-collio, cuanto-vale-mi-casa-elkhart, buen-momento-vender-casa-elkhart, que-es-sres-adultos-mayores, errores-evitar-vender-casa-goshen, por-que-casas-elkhart-tardan-venderse, como-se-promociona-mi-casa-elkhart, vender-casa-elkhart-lisa-collio, vender-casa-goshen-mejor-precio, preparar-casa-goshen-para-vender}/index.html` | §3.1, §10, §18.4 |
| H2 | **7 English Elkhart articles have no FAQ section** while their Spanish twins do — the inverse of H1. | `blog/community/{downtown-elkhart-indiana, things-to-do-in-elkhart-indiana, community-events-in-elkhart-indiana, cost-of-living-in-elkhart-indiana, moving-to-elkhart-indiana-from-out-of-state, buying-an-older-home-in-elkhart-indiana, working-in-the-rv-industry-and-buying-a-home-in-elkhart-indiana}/index.html` | §18.4 |
| H3 | **`sameAs` count sitewide: 0.** No external entity corroboration — no GBP, social, Zillow, realtor.com, or RE/MAX profile. No `image` on either entity. | every page carrying `#agent` / `#lisa` | §7.3, §7.4, §8.6 |
| H4 | **Hero images are 0.7–3.1 MB JPEGs delivered via CSS `--hero-img`**, bypassing the site's own WebP negotiation, with no `srcset`. LCP element on every Tier-1/Tier-2 page. | `assets/images/hero/*.jpg`, inline `style` on each page's `<section class="hero hero--photo">` | §17.4, §17.5 |
| H5 | **Page weight 4.3–20 MB.** `/blog/` 19.97 MB, `/blog/spanish/` 15.89 MB, `/about/` 8.41 MB, `/` 6.64 MB. Images are 95–98% of every page. | `assets/images/` | §17.4 |
| H6 | **No visible author byline on any of 157 pages. No `<time>` element anywhere.** Schema declares author + dates; nothing renders. | all article files | §19.4 |
| H7 | **All 57 English articles, zero links to `/buyers/` or `/sellers/`** (63 English blog pages including hubs). Pillar↔article linking is one-directional; `/about/` and `/moving-to-elkhart/` have 0 in-content inbound links. | all EN article files | §9.2, §9.4 |
| H8 | **No legacy-site URL inventory exists in the repo.** 7 redirects cover this repo's own renames; nothing covers the site being replaced. Every unmapped legacy URL will 404 at cutover. | `netlify.toml`, `docs/LAUNCH_RUNBOOK.md` | §15.4 |

### MEDIUM

| # | Issue | File(s) | Evidence |
|---|---|---|---|
| M1 | 124 raster images have no `.webp` sibling, including actively-served multi-MB Elkhart files | `assets/images/elkhart/*.jpg` (+104 others) | §13.2 |
| M2 | 664 unreferenced image files (~504 MB) are deployed to production under `immutable` caching | `assets/images/`, `netlify.toml` | §13.7 |
| M3 | 76 paired sitemap entries omit `xhtml:link` hreflang (56 of 154 have it) | `sitemap.xml` | §5.6 |
| M4 | No `<lastmod>` on any of 154 sitemap entries | `sitemap.xml` | §14.2 |
| M5 | 124 of 125 articles carry one of five July 2026 dates; `dateModified` ≈ `datePublished` | article JSON-LD | §7.6 |
| M6 | 4 pages inline a bare `Person` as `author` instead of referencing `@id .../#lisa` | `market-stats/`, `es/estadisticas-del-mercado/`, `next-chapter-method/`, `es/tu-proximo-capitulo/` | §7.6 |
| M7 | `memberOf`/`worksFor` RE/MAX Results has no `@id`, `url`, or `sameAs` — not a resolvable entity | all pages with `#agent`/`#lisa` | §7.5 |
| M8 | Elkhart County appears in body copy on 40 pages and in **no schema field** — `areaServed` is cities only | all schema | §7.5, §19.3 |
| M9 | `aggregateRating` + 2 full `Review` nodes replicated on 134 pages including every article — self-serving-review policy surface | all pages with `#agent` | §7.7 |
| M10 | 52 distinct client photographs share 2 generic alt strings | `client-reviews/`, `client-general/` | §13.4 |
| M11 | All 56 Spanish articles are in one flat folder; no Spanish equivalent of the 5 English category hubs | `blog/spanish/` | §2.6 |

### LOW

| # | Issue | File(s) | Evidence |
|---|---|---|---|
| L1 | `/blog/community/does-lisa-collio-speak-spanish/` title is 65 chars (the one `npm run audit` warning) | that file | §4.2 |
| L2 | `/blog/spanish/que-es-tu-proximo-capitulo/` title is 29 chars | that file | §4.2 |
| L3 | 15 distinct title brand-suffix patterns | all pages | §4.2 |
| L4 | 6 pages have `og:image` but no `twitter:card` | listed in §4.5 | §4.5 |
| L5 | `/contact/` + `/es/contacto/` split `#agent` across two `<script>` blocks; second omits `bestRating` | `contact/index.html:20,309`, `es/contacto/index.html` | §7.7 |
| L6 | `/es/index.html` puts `FAQPage` in a separate script rather than the `@graph` | `es/index.html` | tracked at punch list :291 |
| L7 | `/es/disclaimers/` is the only Spanish URL not using a Spanish word | `es/disclaimers/` | §2.4 |
| L8 | `robots.txt` does not declare `llms.txt`; no AI-crawler directives | `robots.txt` | §14.1 |
| L9 | 12 image groups carry a specific alt on one page and a generic alt on another | `client-reviews/` | §13.5 |

### VERIFIED GOOD

| # | Finding |
|---|---|
| G1 | **0 broken internal links** across 3,141 parsed links |
| G2 | **0 broken images**; 0 missing files; 0 broken `<source srcset>` targets |
| G3 | **157/157 pages return HTTP 200**; all 7 redirects 301 correctly; 404 works |
| G4 | **0 JavaScript errors, 0 console errors/warnings, 0 failed requests** across 25 rendered pages |
| G5 | **0 duplicate titles, 0 duplicate meta descriptions, 0 duplicate H1s** across 157 pages |
| G6 | **157/157 pages have exactly one H1**; 0 missing, 0 multiple |
| G7 | **157/157 pages have a unique meta description**, all within 140–160 chars |
| G8 | **156/156 canonicals are self-referential**; 0 cross-page, 0 cross-language, 0 conflicts |
| G9 | **hreflang in `<head>` is flawless** — 67/67 pairs reciprocal, self-referencing, `x-default` correct, lang-attribute-matched |
| G10 | **0 silent hreflang omissions** — all 23 unpaired pages are explicitly exempted in `audit.js` |
| G11 | **A single consistent entity graph** — `#agent` on 138 pages, `#lisa` on 125, correctly cross-referenced; 121/125 articles use the `@id` reference |
| G12 | **0 JSON-LD parse errors** across 154 pages |
| G13 | **NAP is fully consistent** — one phone, one email, one address, one brokerage form, one license number, no banned legacy number |
| G14 | **0 images without an `alt` attribute; 0 images without `width`/`height`** (CLS-safe by construction) |
| G15 | **All 4 renames the brief asked about have working 301s**; no redirect chains or loops |
| G16 | **Identical navigation structure in both languages**, including the Goshen/Elkhart Moving/Living hierarchy; one markup for desktop and mobile; CSS-only, no JS dependency |
| G17 | **All 154 indexable pages are in the sitemap**; the 3 excluded are correctly `noindex` |
| G18 | **Consent gate is load-on-accept**: zero third-party network activity before consent, verified in the render |

---

## 22. Recommended Next Steps — NOT IMPLEMENTED

**Nothing in this section was carried out.** Ordered by measured impact for the stated query targets. The strategic audit should validate each against competitive data before any of it is actioned.

### Investigate first (blocking, needs external input)

1. **Obtain a legacy-site URL inventory before DNS cutover** (H8). Source: Search Console "Pages" export, an analytics landing-page report, or a crawl of the current production site. Without it the redirect map cannot be written and existing rankings will be lost at cutover. This is the only genuinely time-sensitive item.
2. **Confirm `www` → non-`www` and HTTP → HTTPS enforcement** in the Netlify dashboard (§14.4) — neither is in the repo.
3. **Run the post-deploy CSP console check** the `netlify.toml` comment itself requires (§14.5) — a blocked GA4 collection host fails silently.

### Highest measured impact on the target queries

4. **Fix the 77 language-switcher targets** (C1) — a per-page `esHref`/`enHref` marker parameter, mechanically derivable from `content/hreflang-pairs.json`. Consider adding an `audit.js` check that asserts badge target == hreflang twin, since the existing check validates only the `<head>`.
5. **Author `og:` and `twitter:` title/description/url/type/site_name/locale sitewide, and `og:image` for the 61 pages without one** (C2). Note the existing decision recorded in the punch list: authoring these lets social copy diverge from search copy, which today it cannot.
6. **Add `sameAs` and `image` to `#lisa` and `#agent`; give RE/MAX Results a resolvable `@id`/`url`/`sameAs`** (H3, M7). This is the single highest-leverage structured-data change for entity resolution.
7. **Decide whether "Spanish-speaking REALTOR® in Goshen" warrants a dedicated page** (§11) — currently a `/blog/community/` article carrying `BlogPosting` schema, receiving no links from `/buyers/` or `/sellers/`, and absent from the navigation.
8. **Add `Elkhart County` to `areaServed`** (M8) — a stated target query with zero schema representation.

### Content parity

9. **Close the 21-article FAQ asymmetry** (H1, H2) — 14 ES seller articles and 7 EN Elkhart articles. Consider re-opening `docs/EN_ES_DIVERGENCE_INVENTORY.md`, which is marked CLOSED but covers only the community cluster.
10. **Add visible bylines and `<time>` elements** to all 113 articles (H6) — the schema already carries the data.
11. **Evaluate the 11 geography-free Spanish titles** (§12.4) — the site's strongest Spanish commercial assets currently compete nationally rather than locally.
12. **Evaluate the "why choose Lisa" cluster of 4 EN + 4 ES articles** for intent overlap (§10.5).

### Internal linking

13. **Add article → pillar links** (H7): 63 English articles currently link to `/buyers/` or `/sellers/` zero times. Spanish already does this (8–10 links each) and can serve as the pattern.
14. **Give `/about/` and `/moving-to-elkhart/` in-content inbound links** (§9.2).

### Performance

15. **Deliver heroes through `<picture>` or `image-set()` with WebP + `srcset`** (H4) — the WebP files already exist and are 15–30% smaller.
16. **Generate the 124 missing WebP siblings**, prioritizing the `assets/images/elkhart/` files served at 2–4 MB (M1).
17. **Address `/blog/` and `/blog/spanish/` at 20 MB / 16 MB** (H5) — thumbnail derivatives rather than full-size images in listing cards.
18. **Decide the fate of 664 unreferenced images / 504 MB** currently deployed (M2).

### Housekeeping

19. Add `<lastmod>` to all sitemap entries; add `xhtml:link` to the 76 paired entries missing it; consider generating `sitemap.xml` from `hreflang-pairs.json` the way the HTML tags already are (M3, M4).
20. Reconcile the 4 entity-fragmenting `author` nodes (M6).
21. Declare `llms.txt` in `robots.txt`; decide an AI-crawler policy (L8).
22. **Update `CLAUDE.md`** where it has gone stale against the code: the "cookie-less analytics" line (§14.7) and the "`/market-stats/` EN only at launch" architecture line (§2.3).

---

## 23. What I Could Not Verify

Everything in this section requires access this audit did not have. **None of it should be treated as either confirmed or refuted.**

### Requires production / DNS

- Whether `lisacolliorealtor.com` currently serves this codebase (`CLAUDE.md` says DNS has not cut over)
- Real HTTP status codes, headers, and redirect behavior in production — all status testing was done against a local server replaying `netlify.toml`'s rules by hand
- Whether Netlify's `www` → non-`www` redirect is configured (it is not in the repo)
- Whether HTTP → HTTPS is enforced (not in the repo)
- Whether the SSL certificate covers both apex and `www`
- Actual `Cache-Control`, CSP, and security headers as served
- Whether the CSP actually permits GA4/Ads/Meta collection endpoints — the file itself records this as an open risk, and this sandbox's network blocks those hosts
- Whether the GA4, Google Ads, and Meta tags fire correctly after consent

### Requires the legacy site

- **Any URL of the site being replaced.** No inventory, crawl, export, or list exists in the repository.
- Which legacy URLs hold rankings, traffic, or backlinks
- The legacy URL structure (extensions, date paths, query strings, listing pages)
- Whether legacy Spanish URLs exist
- **Therefore: the complete redirect map cannot be produced, and "missing redirects" cannot be enumerated.**

### Requires Google Search Console

- Indexation status of any of the 154 URLs
- Whether Google honors the hreflang annotations (and any "no return tag" errors)
- Impressions, clicks, average position for any query
- Crawl stats, crawl budget, discovered-not-indexed pages
- Core Web Vitals field data
- Manual actions or structured-data errors as Google sees them
- Whether the `AggregateRating` on 134 pages triggers a rich-result policy issue

### Requires Google Business Profile

- Whether a GBP exists for Lisa Collio
- NAP consistency between the site and GBP
- Review count/rating on GBP vs the site's `5.0 / 39`
- Category, service area, and hours consistency
- **Note:** the site declares no `sameAs`, so no GBP link is asserted anywhere in the code

### Requires analytics

- Traffic, conversions, bounce, or engagement for any page
- Which language version users actually land on
- Whether the broken language switcher measurably loses Spanish-speaking users
- Form submission volume (forms live in GoHighLevel, not this repo)

### Requires external SEO tooling

- Backlink profile, referring domains, anchor text
- Competitor rankings for any target query
- Keyword volume for any Spanish or English term in §12 — **this audit measured term *presence*, never term *value***
- SERP feature ownership (PAA, local pack, featured snippets)
- Local pack rankings for Goshen or Elkhart

### Requires real-user or lab measurement

- Actual LCP, CLS, INP — page weights in §17.4 were measured on localhost with no network latency; real-world figures will be worse
- PageSpeed Insights / Lighthouse scores
- Mobile rendering on real devices (rendering was verified at 1366×900 desktop only)

### Requires human judgment

- Whether the Spanish reads natively to a Latin-American Indiana audience — §3.5 verifies adaptation *structurally* (slugs, length ratios, divergent H2 framing) but a native-speaker editorial read is not a code measurement
- Whether "Michiana" (8 pages) is acceptable under the locked service-area vocabulary
- Whether the 18 `REALTOR` instances without ® are violations in their rendering context
- Whether replicating `aggregateRating` on 134 pages is the desired policy posture
- Whether the composite-story disclaimer correctly covers every illustrative story
- Broker approval status of any content — `docs/PRE_LAUNCH_PUNCH_LIST.md:516` records the complete-site broker pass as **still outstanding**

### Requires the GoHighLevel account

- Form behavior, funnel structure, lead capture, booking flow — none of it is in this repository
- Whether `/contact/thank-you/` and `/es/contacto/gracias/` are actually reached by the live forms

---

## 24. Files Inspected

### Root configuration and build

```
package.json                   netlify.toml                robots.txt
sitemap.xml                    llms.txt                    CLAUDE.md
README.md                      .gitignore
build.js                       hreflang.js                 hash-assets.js
hash-util.js                   minify-css.js               audit.js
build-blog-listing.js          build-reviews.js            llms.js
index.html                     404.html
```

### Components (all 9)

```
components/header.html         components/header-es.html
components/footer.html         components/footer-es.html
components/hero-tier2.html     components/talk-to-lisa.html
components/talk-to-lisa-es.html
components/verify-details.html components/verify-details-es.html
```

### Content data

```
content/hreflang-pairs.json    content/blog-articles.json
content/blog-topics.json       content/reviews.json
content/image-parity-baseline.json
content/thank-you-messages.json
content/featured-image-rotation-log.md
content/home-photo-catalog.md  content/photo-usage-audit.md
content/review-photo-map.md
content/source/  (14 files — licensed-assets.txt, rejected-assets.txt,
                  fair-housing-terms.txt, retail-business-names.txt,
                  sold-listing-consent.txt, + approved source docs)
content/approved/ (19 approved-copy markdown files)
```

### Documentation

```
docs/PRE_LAUNCH_PUNCH_LIST.md          docs/EN_ES_DIVERGENCE_INVENTORY.md
docs/VERIFIED_FACTS.md                 docs/SPANISH_STYLE_DECISIONS.md
docs/LAUNCH_CHECKLIST.md               docs/LAUNCH_REPORT.md
docs/LAUNCH_RUNBOOK.md                 docs/PR89_DESCRIPTION_AUDIT.md
docs/FEATURED_IMAGE_OVERLAY_AUDIT.md   docs/SECTION_19_REGISTRY_AUDIT.md
docs/FAQ_GAP_PAGE_CONTENT.md           docs/DRIVE_TIME_INVENTORY.md
docs/PUNCH_LIST_BRANCH_DIVERGENCE.md
docs/ELKHART_IMAGE_PHASE_0_RECONCILIATION.md
docs/ELKHART_IMAGE_PHASE_2_VALIDATION.md
docs/ELKHART_IMAGE_PR1_PREFLIGHT.md
```

### Every HTML page (157)

Parsed in full — `<head>` metadata, JSON-LD, heading structure, `<body>` link graph, image attributes, and body text — by a purpose-written extractor. Read in depth as samples:

```
index.html                                   es/index.html
buyers/index.html                            es/compradores/index.html
sellers/index.html                           es/vendedores/index.html
about/index.html                             es/conozca-a-lisa/index.html
contact/index.html                           es/contacto/index.html
moving-to-goshen/index.html                  es/mudarse-a-goshen/index.html
living-in-goshen/index.html                  es/viviendo-en-goshen/index.html
moving-to-elkhart/index.html                 es/mudarse-a-elkhart/index.html
living-in-elkhart/index.html                 es/viviendo-en-elkhart/index.html
market-stats/index.html                      es/estadisticas-del-mercado/index.html
next-chapter-method/index.html               es/tu-proximo-capitulo/index.html
blog/index.html                              blog/spanish/index.html
blog/community/does-lisa-collio-speak-spanish/index.html
blog/spanish/proceso-completo-en-espanol-lisa-collio/index.html
blog/sellers/why-sell-home-goshen-indiana-lisa-collio/index.html
blog/spanish/vender-casa-goshen-lisa-collio/index.html
blog/community/downtown-elkhart-indiana/index.html
blog/spanish/centro-de-elkhart-indiana/index.html
blog/buyers/good-time-to-buy-home-goshen-indiana/index.html
blog/spanish/actualizacion-del-mercado-elkhart-county-mitad-2026/index.html
404.html
```

### Assets

```
assets/js/consent.js                         (read in full)
assets/images/     — 1,364 files enumerated: size, format, WebP-sibling
                     presence, reference status. Not opened visually.
assets/css/        — size only (116 KB)
assets/fonts/      — size only (200 KB)
scripts/           — enumerated; check-image-scope.py referenced
```

---

## 25. Commands / Methods Used

Every command below is **read-only or `--check`-mode**. No repository file was created, modified, renamed, or deleted by this audit, other than the two report files written to `docs/`.

### Environment

```bash
git rev-parse HEAD          # 5db404515b57b18e8253fda87caed07485dfd20b
node --version              # v22.22.2
# Chromium: /opt/pw-browsers/chromium-1194/chrome-linux/chrome
# Playwright installed in a scratchpad dir, not in the repo
```

### 1 — Page inventory

```bash
find . -name "*.html" -not -path "./.git/*" -not -path "./node_modules/*" | sort
ls -R docs scripts components content
```

### 2 — Structured extraction (the core method)

A Node.js extractor parsed all 157 pages and emitted one JSON record per page: `lang`, `<title>`, meta description, `robots`, canonical, every `<link rel="alternate">`, every `og:`/`twitter:` meta, all H1/H2 text, H3 count, every JSON-LD block (parsed *and* raw), every `<a href>` with anchor text, every `<img>` with all attributes, every `<source srcset>`, body word count with the header/footer chrome removed, and full body text.

```bash
node extract.js     # → pages.json (157 records)
```

**Two method corrections made mid-audit, both material:**

- The chrome-stripping regex `build:header … endbuild:header` does **not** match the Spanish `build:header-es … endbuild:header-es`. Uncorrected, this inflated every Spanish page's word count by ~200 (nav + footer text) and its editorial link count by ~15. Both the word-count parity table (§3.1) and the entire internal-link graph (§9) were recomputed after fixing the regex to `build:header(?:-es)?…endbuild:header(?:-es)?`. The pre-correction ES/EN ratios were wrong by roughly +0.3 to +0.8.
- Stripping HTML tags to a space merges text across element boundaries, which produced false NAP positives ("Lisa Collio Real Estate Agent" without the comma on 36 pages). Every NAP finding in §8 was re-verified with `grep` against the **raw** HTML; both apparent violations returned 0 matches.

### 3 — Sitemap / canonical / hreflang

```bash
node an1.js   # sitemap ↔ filesystem set difference, duplicates, host/scheme
node an2.js   # canonical self-reference; hreflang self-ref, reciprocity,
              # x-default, lang-attribute match, canonical/hreflang conflict
node an6.js   # language-switcher badge target vs hreflang twin, from the
              # build:header marker JSON on every page
```

### 4 — Metadata

```bash
node an3.js   # duplicate/length checks for title, description, H1; og/twitter
              # coverage; og:url vs canonical; og:title vs <title>
node an12.js  # location tokens in titles, length distributions, brand-suffix
              # patterns, breadcrumb coverage, repeated-H2 detection
```

### 5 — Internal link graph

```bash
node an5.js   # two graphs: full (incl. chrome) and editorial (chrome removed).
              # Orphans, inbound/outbound per page, cross-language links,
              # broken-target detection, chrome link-signature grouping.
node an11.js  # pillar↔article directionality, cluster inventory, E-E-A-T matrix
```

### 6 — Structured data

```bash
node an7.js   # distinct shapes per entity type, with full property dumps
node an10.js  # FAQPage coverage, byline/<time> detection, heading structure
grep -rn "sameAs" --include=*.html .          # → 0 results
grep -rl "sameAs" --include=*.html . | wc -l  # → 0
```

### 7 — NAP / entity sweep

```bash
node nap.js   # regex sweep over extracted body text for phone, email, name,
              # brokerage, geo, address, track-record, credential, license forms
# Every hit then re-verified against raw HTML:
grep -rl "Lisa Collio Real Estate Agent" --include=*.html . | wc -l   # → 0
grep -rl "RE/MAX Results The Viruez"     --include=*.html . | wc -l   # → 0
grep -rl "RB21002460"                    --include=*.html . | wc -l   # → 159
grep -rn "100 casas\|100+ homes\|100+ families" --include=*.html .
```

### 8 — Images

```bash
node an8.js   # alt coverage, loading/dimension attrs, formats, generic-alt
              # reuse, same-src-different-alt groups, file existence, sizes
python3 -c "..."   # WebP sibling coverage across assets/images/
du -sh assets/images assets/css assets/fonts assets/js
```

### 9 — Repo's own checks (all `--check`, no writes)

```bash
node audit.js               # 156 pages / 23 checks → pass, 1 warning
node build.js --check       # → All pages are up to date
node hash-assets.js --check # → All asset references are correctly hashed
node hreflang.js --check    # → 67 pairs (134 pages). 0 page(s) would change
```

### 10 — Local HTTP server + status testing

A ~25-line Node static server replaying `netlify.toml`'s 7 redirect rules and the `/*` → `404.html` fallback:

```bash
node serve.js &     # port 8099, serves the repo read-only
while read u; do
  code=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:8099$u")
  [ "$code" != "200" ] && echo "$code  $u"
done < urls_all.txt
```

168 URLs tested: 157 pages + 7 legacy redirect paths + `sitemap.xml` + `robots.txt` + `llms.txt` + one deliberate 404.

### 11 — Rendered inspection

```bash
node render.js   # 25 pages in Chromium @1366×900, waitUntil networkidle.
                 # Captures: console errors/warnings, pageerror, requestfailed,
                 # ≥400 responses, broken images (naturalWidth===0), rendered
                 # H1s, <html lang>, live .hablo-badge href, body text length.
node weight.js   # per-page transfer measured from actual response bodies,
                 # after scrolling to the bottom to trigger lazy loads.
                 # Breaks down html / css / fonts / images.
```

### 12 — Cross-checking findings against the project's own records

```bash
grep -n "^#" docs/PRE_LAUNCH_PUNCH_LIST.md
grep -rn -i "open graph\|og:title" docs/*.md CLAUDE.md README.md
grep -rn "vender-casa-goshen-lisa-collio" docs/*.md   # → 0 (finding untracked)
sed -n '285,340p' audit.js                            # hreflang exemption list
```

Each finding was checked against `docs/PRE_LAUNCH_PUNCH_LIST.md`, `docs/EN_ES_DIVERGENCE_INVENTORY.md`, and `CLAUDE.md`, and is labelled above as already-tracked or newly-found.

### Reproducing this audit

The extractor and analysis scripts live in the session scratchpad, not the repository, so as not to add untracked files. Every one is reconstructible from the descriptions above; the raw dataset every table was computed from is committed as `docs/LISA_COLLIO_SEO_DATA.json`. The four `--check` commands in step 9 are permanent repository tooling and can be re-run at any time.

### Note on secrets

No API key, token, password, credential, or sensitive environment variable appears in this report. The Google Analytics, Google Ads, and Meta Pixel IDs referenced in §14.7 are **public client-side identifiers** committed to `assets/js/consent.js` and `netlify.toml`, visible in the page source of every deployed page. No `.env` file, no secret store, and no credential of any kind was found in the repository.

---

## Companion files

**`docs/LISA_COLLIO_AI_LLM_DISCOVERABILITY_AUDIT.md`** — a separate audit answering whether public AI systems and LLM-powered search can discover, crawl, parse, understand, and cite this site. Covers robots.txt per crawler token, raw-HTML vs rendered-DOM comparison on 14 pages, entity modelling for AI, first-hand-experience measurement, citation readiness, AI blocking risks, and the `netlify.app` duplicate-domain question. Its §11 contains "HOW AN AI SYSTEM WOULD UNDERSTAND THIS WEBSITE", plus ranked AI discoverability risks and strengths.

**`docs/LISA_COLLIO_SEO_DATA.json`** — machine-readable dataset backing every table above.

| Key | Contents |
|---|---|
| `meta` | commit, method, totals |
| `pages[]` | 157 records: url, file, lang, type, title + length, meta description + length, canonical, robots, indexable, h1, h2[], h3Count, og{}, twitter{}, hreflang[], hreflangTwin, languageSwitcherTarget, languageSwitcherMatchesTwin, inSitemap, sitemapHasHreflang, schemaTypes[], schemaIds[], faqQuestions, wordCount, imageCount, imagesWithEmptyAlt, inContentInboundLinks, inContentInboundFrom[], inContentOutboundLinks[], httpStatusLocal, contentStatus |
| `pairs[]` | 67 records: en, es, existence, word counts + ratio, FAQ counts + parity, image counts, hreflang reciprocity, both language-switcher targets, `languageSwitcherCorrect`, sitemap hreflang presence |
| `unpairedPages` | `enNoEsTwin[]`, `esNoEnTwin[]` with word counts |
| `redirects[]` | all 8 rules with locally-verified status |

---

*End of technical handoff. No code, content, configuration, or asset in this repository was modified by this audit.*
