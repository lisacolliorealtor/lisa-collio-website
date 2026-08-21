# Lisa Collio Website — AI / LLM Discoverability Audit

**Audit date:** 21 August 2026
**Repository:** `lisacolliorealtor/lisa-collio-website`
**Branch:** `claude/lisa-collio-seo-audit-17xp8z`
**Commit:** `5db404515b57b18e8253fda87caed07485dfd20b`
**Scope:** Facts only. Nothing was modified.
**Companion to:** `docs/LISA_COLLIO_SEO_TECHNICAL_HANDOFF.md` and `docs/LISA_COLLIO_SEO_DATA.json`

This report answers one question: **can public AI systems and LLM-powered search systems discover, crawl, parse, understand, summarize, cite, and correctly identify Lisa Collio from this website?**

### Marker convention

| Marker | Meaning |
|---|---|
| **VERIFIED** | Measured directly from committed files, a local HTTP response, or a headless-browser render. Reproducible — see §12. |
| **BACKGROUND KNOWLEDGE** | Not a repository fact. Used only to explain what a given crawler token *does*; crawler operators change these, so re-confirm against each operator's current published documentation. |
| **NOT VERIFIED** | Requires production, DNS, or an external service this audit could not reach. Collected in §11. |

### One-paragraph answer

**Technically, this site is close to an ideal case for AI crawlers, and it is undermined by one thing.** Every page is pre-rendered static HTML — the entire site has exactly one JavaScript file (a cookie banner), so a crawler that executes no JavaScript at all sees **99.998% of the same text** a full browser sees. Nothing is blocked: robots.txt allows every crawler with no exceptions, there is no CAPTCHA, no authentication, no JS-gated content, no collapsed FAQ widgets. Structured data is extensive, valid, and present in the raw HTML on 154 of 157 pages, with a single consistent `@id` for Lisa Collio used across 138 pages. **The undermining fact is that this consistent entity is connected to nothing outside the website.** `sameAs` appears zero times. No `image`. No `geo`. The brokerage is an untyped string. And the three claims that most distinguish Lisa — 120+ homes, $20M+, Top 20% of Elkhart County — exist as prose on 91–156 pages and as typed structured data on **none**. An AI system can parse this site perfectly and still be unable to corroborate that Lisa Collio exists anywhere else, or to state her track record as a fact rather than as a quotation from her own marketing copy.

---

## 1. robots.txt — Crawler Access

### 1.1 The complete file

**VERIFIED.** `robots.txt` is 75 bytes. This is its entire contents, verbatim:

```
User-agent: *
Allow: /

Sitemap: https://lisacolliorealtor.com/sitemap.xml
```

**VERIFIED, by exhaustive search:**

| Check | Result |
|---|---|
| `User-agent` groups in the file | **1** — the wildcard `*` |
| Named crawler groups (any bot named explicitly) | **0** |
| `Disallow` directives | **0** |
| `Allow` directives | 1 (`/`) |
| `Crawl-delay` | none |
| `Noindex` (non-standard) | none |
| Sitemap declarations | 1 |
| `llms.txt` declared | **No** — the file exists (46 KB) but is not referenced |
| Other robots files in the repo | none — `find . -name "robots*"` returns only this file |
| `_headers` / `_redirects` files | **do not exist** |
| `X-Robots-Tag` anywhere in `netlify.toml`, `robots.txt`, or components | **0 occurrences** |

### 1.2 What each crawler actually gets

Because no crawler is named, **every** user agent matches the `*` group and receives `Allow: /`. There is no group for any bot to prefer over the wildcard.

The **Directive** column below is VERIFIED repository fact. The **Purpose** column is BACKGROUND KNOWLEDGE about what each token controls — crawler operators change these, so re-confirm against each operator's current published documentation before acting.

| Crawler token | Operator | Purpose (background knowledge — verify externally) | Directive this site gives it | Effect |
|---|---|---|---|---|
| **Googlebot** | Google | Classic search index. Also the source corpus that feeds AI Overviews. | `Allow: /` (via `*`) | **Full access** |
| **Google-Extended** | Google | **Not a crawler.** A robots.txt control token governing whether already-crawled content may be used for Gemini model training and grounding. | No directive → **not opted out** | **Content usable for Gemini training/grounding** |
| **GPTBot** | OpenAI | Crawls to collect data for **model training**. | `Allow: /` (via `*`) | **Full access** |
| **OAI-SearchBot** | OpenAI | Crawls for **ChatGPT search surfacing and linking**. Distinct from GPTBot — blocking one does not block the other, and blocking this one removes the site from ChatGPT search results. | `Allow: /` (via `*`) | **Full access** |
| **OAI-AdsBot** | OpenAI | Crawls for **advertising-related** verification/quality. | `Allow: /` (via `*`) | **Full access** |
| **ChatGPT-User** | OpenAI | **User-initiated** fetch when a person asks ChatGPT to open a URL. Not a bulk crawler. | `Allow: /` (via `*`) | **Full access** |
| **ClaudeBot** | Anthropic | General crawler. | `Allow: /` (via `*`) | **Full access** |
| **Claude-User** | Anthropic | **User-initiated** fetch on a person's request. | `Allow: /` (via `*`) | **Full access** |
| **Claude-SearchBot** | Anthropic | Search-result surfacing. | `Allow: /` (via `*`) | **Full access** |
| **PerplexityBot** | Perplexity | Index + citation surfacing. | `Allow: /` (via `*`) | **Full access** |
| **Bingbot** | Microsoft | Bing index; also feeds Copilot. | `Allow: /` (via `*`) | **Full access** |
| **Applebot** | Apple | Siri / Spotlight index. | `Allow: /` (via `*`) | **Full access** |
| **Applebot-Extended** | Apple | Control token for Apple **generative model training**. | No directive → not opted out | **Usable for training** |
| **meta-externalagent** | Meta | Meta AI training/indexing. | `Allow: /` (via `*`) | **Full access** |
| **CCBot** | Common Crawl | Public corpus used as a training input by many labs. | `Allow: /` (via `*`) | **Full access** |
| **Amazonbot** | Amazon | Alexa / Amazon services. | `Allow: /` (via `*`) | **Full access** |
| **Bytespider** | ByteDance | Training crawler. | `Allow: /` (via `*`) | **Full access** |
| **Any other agent** | — | — | `Allow: /` (via `*`) | **Full access** |

### 1.3 Findings

| # | Finding | Assessment |
|---|---|---|
| R1 | **Nothing is blocked. Every AI crawler has full access to all 154 indexable URLs.** | For the stated goal — maximum AI discoverability — this is the correct configuration. |
| R2 | **The site does not distinguish between crawler purposes, because it names none of them.** Search-surfacing crawlers (OAI-SearchBot, Claude-SearchBot, PerplexityBot) and training crawlers (GPTBot, CCBot, Bytespider) are treated identically. | Currently aligned with the goal. Worth recording as a **conscious** decision rather than a default, since the two categories can be controlled independently: opting out of training does not remove the site from AI search, and opting out of search does. |
| R3 | **`llms.txt` exists but is not declared in `robots.txt`.** | The file is thorough — 46 KB listing every page in both languages with descriptions, and stating explicitly that Spanish pages are adaptations rather than translations. Nothing points a crawler to it. |
| R4 | **No `X-Robots-Tag` header anywhere.** No `_headers` file; `netlify.toml` sets no robots header. | No accidental header-level suppression. Also means no header-level protection for the `netlify.app` domain — see §10. |
| R5 | `robots.txt` names the canonical host in its Sitemap line. | Correct: `https://lisacolliorealtor.com/sitemap.xml`. |

---

## 2. Server-Side vs Client-Side Content

### 2.1 Method

Three separate captures of each of the 14 requested pages:

1. **Raw HTTP response** — the exact bytes a crawler receives, fetched over plain HTTP with no browser.
2. **Rendered DOM with JavaScript DISABLED** — Chromium, `javaScriptEnabled: false`.
3. **Rendered DOM with JavaScript ENABLED** — Chromium, `waitUntil: networkidle`.

### 2.2 Results

**VERIFIED.** `Δ` is the character difference between the JS-enabled and JS-disabled rendered body text.

| Page | Raw HTML | Raw text chars | No-JS body text | JS body text | Δ | H1 raw/noJS/JS | H2 raw/noJS/JS | Links raw/noJS/JS |
|---|---|---|---|---|---|---|---|---|
| `/` | 33 KB | 8,636 | 8,465 | 8,680 | **+215** | 1/1/1 | 8/8/8 | 44/44/45 |
| `/es/` | 34 KB | 9,015 | 8,817 | 9,073 | **+256** | 1/1/1 | 8/8/8 | 44/44/45 |
| `/buyers/` | 44 KB | 12,571 | 12,398 | 12,613 | **+215** | 1/1/1 | 10/10/10 | 52/49/50 |
| `/es/compradores/` | 42 KB | 11,670 | 11,473 | 11,729 | **+256** | 1/1/1 | 9/9/9 | 50/47/48 |
| `/sellers/` | 63 KB | 15,185 | 14,970 | 15,185 | **+215** | 1/1/1 | 11/11/11 | 61/58/59 |
| `/es/vendedores/` | 65 KB | 15,743 | 15,508 | 15,764 | **+256** | 1/1/1 | 11/11/11 | 61/58/59 |
| `/moving-to-goshen/` | 42 KB | 15,179 | 15,005 | 15,220 | **+215** | 1/1/1 | 13/13/13 | 47/46/47 |
| `/es/mudarse-a-goshen/` | 46 KB | 17,890 | 17,701 | 17,957 | **+256** | 1/1/1 | 13/13/13 | 48/47/48 |
| `/living-in-goshen/` | 42 KB | 15,541 | 15,358 | 15,573 | **+215** | 1/1/1 | 14/14/14 | 46/45/46 |
| `/es/viviendo-en-goshen/` | 45 KB | 17,278 | 17,076 | 17,332 | **+256** | 1/1/1 | 14/14/14 | 46/45/46 |
| `/market-stats/` | 24 KB | 7,575 | 7,398 | 7,613 | **+215** | 1/1/1 | 8/8/8 | 34/33/34 |
| `/es/estadisticas-del-mercado/` | 26 KB | 9,084 | 8,897 | 9,153 | **+256** | 1/1/1 | 8/8/8 | 33/32/33 |
| `/blog/` | 76 KB | 15,325 | 15,153 | 15,368 | **+215** | 1/1/1 | 4/4/4 | 212/211/212 |
| `/blog/spanish/` | 69 KB | 16,435 | 16,240 | 16,496 | **+256** | 1/1/1 | 64/64/64 | 146/145/146 |

### 2.3 What the delta is

**VERIFIED.** The delta is a **constant 215 characters on every English page and 256 on every Spanish page** — it does not scale with page size. It is the cookie-consent banner text injected by `assets/js/consent.js`:

> EN: *"This site uses cookies to measure traffic and to show Lisa's ads to people who have visited. You can accept or decline — declining doesn't affect anything you came here to do. See the Privacy Policy."*

**No editorial content whatsoever requires JavaScript.** The banner is additive, not an overlay that hides content — the no-JS render returned the complete body text on all 14 pages.

The 1–3 link difference between raw and rendered counts is the two banner buttons (Accept / Decline) plus browser DOM normalization, not missing navigation.

### 2.4 Total JavaScript on the site

**VERIFIED, by exhaustive count across all 157 pages:**

| Script type | Count |
|---|---|
| `<script>` tags total | 449 |
| `<script type="application/ld+json">` (data, not executable) | 290 |
| **Executable `<script>` tags** | **159** |
| **Distinct executable scripts** | **1** — `<script defer src="/assets/js/consent.js">` |
| Inline executable JavaScript | **0** |
| Third-party script tags in the HTML | **0** |
| `<noscript>` blocks | **0** (none needed) |
| React / Vue / Angular / htmx / any framework | **0** |

The single script is 12 KB, loaded `defer`, and does one thing: render a consent banner and — only after a click on Accept — inject the Google and Meta tags. **Before consent, zero third-party network requests occur.** Verified across 25 rendered pages in the companion audit: no external host was contacted on any of them.

### 2.5 Is everything a crawler needs in the raw HTML?

**VERIFIED per element, on all 14 pages:**

| Element | In raw HTML? | Evidence |
|---|---|---|
| **Main body text** | ✅ Yes, 100% | Raw text chars ≈ no-JS body text on every page |
| **H1** | ✅ Yes | 1 H1 in raw HTML on all 14; identical string to the rendered H1 |
| **All H2s** | ✅ Yes | Raw count == no-JS count == JS count on all 14 |
| **All H3s** | ✅ Yes | Present in raw HTML |
| **Navigation links** | ✅ Yes | Header/footer are pre-expanded into every file by `build.js` |
| **Article/listing links** | ✅ Yes | `/blog/` carries 212 `<a href>` in the raw HTML |
| **FAQ questions** | ✅ Yes | Plain `<h3>` + `<p>`, not `<details>`/`<summary>`, no `aria-expanded` toggles |
| **FAQ answers** | ✅ Yes | Full answer prose in raw HTML outside JSON-LD. Verified on `/buyers/` and `/es/compradores/` |
| **JSON-LD structured data** | ✅ Yes | In the raw HTTP response on 154 of 157 pages |
| **Entity information** | ✅ Yes | `RealEstateAgent` + `Person` nodes in the raw HTML of the head |
| **Images + alt text** | ✅ Yes | No lazy-injection; `src` and `alt` are literal attributes |
| **Client reviews** | ✅ Yes | Rendered as static HTML and duplicated in `Review` schema |
| **Breadcrumbs** | ✅ Yes | Both visible trail and `BreadcrumbList` schema |

### 2.6 One notable H1 result

`/market-stats/` was the only page where the raw H1 did not string-match the rendered H1. **This is an artifact of the audit's own entity-stripping, not a site defect.** The raw markup is:

```html
<h1 class="hero__identity">Goshen &amp; Elkhart, Indiana Market Stats</h1>
```

The browser decodes `&amp;` to `&`; the raw-text comparison stripped the entity. Content is identical. **Not a finding.**

### 2.7 FAQ schema present in raw HTML, per page

**VERIFIED** — counted from the raw HTTP response:

| Page | `Question` nodes in raw HTML | Schema types in raw HTML |
|---|---|---|
| `/` | 4 | `WebSite`, `RealEstateAgent`, `Person`, `FAQPage` |
| `/es/` | 4 | `WebSite`, `RealEstateAgent`, `Person`, `FAQPage` |
| `/buyers/` | 8 | `WebPage`, `BreadcrumbList`, `FAQPage`, `RealEstateAgent` |
| `/es/compradores/` | 7 | `WebPage`, `BreadcrumbList`, `FAQPage`, `RealEstateAgent` |
| `/sellers/` | 11 | `WebPage`, `BreadcrumbList`, `FAQPage`, `RealEstateAgent` |
| `/es/vendedores/` | 11 | `WebPage`, `BreadcrumbList`, `FAQPage`, `RealEstateAgent` |
| `/moving-to-goshen/` | 6 | `WebPage`, `Article`, `Person`, `BreadcrumbList`, `FAQPage`, `RealEstateAgent` |
| `/es/mudarse-a-goshen/` | 6 | `WebPage`, `Article`, `Person`, `BreadcrumbList`, `FAQPage`, `RealEstateAgent` |
| `/living-in-goshen/` | 5 | `WebPage`, `Article`, `Person`, `BreadcrumbList`, `City`, `FAQPage`, `RealEstateAgent` |
| `/es/viviendo-en-goshen/` | 5 | `WebPage`, `Article`, `Person`, `BreadcrumbList`, `City`, `FAQPage`, `RealEstateAgent` |
| `/market-stats/` | 5 | `WebPage`+`Article`, `BreadcrumbList`, `FAQPage`, `RealEstateAgent` |
| `/es/estadisticas-del-mercado/` | 5 | `WebPage`+`Article`, `BreadcrumbList`, `FAQPage`, `RealEstateAgent` |
| `/blog/` | **0** | `CollectionPage`, `BreadcrumbList`, `RealEstateAgent` |
| `/blog/spanish/` | **0** | `CollectionPage`, `BreadcrumbList`, `RealEstateAgent` |

### 2.8 Verdict

**There is no client-side rendering problem on this site, in any form.** A text-only crawler that executes no JavaScript, follows no redirects beyond 301s, and renders nothing receives the complete content of every page. This is the strongest possible starting position for AI discoverability, and it is a consequence of a deliberate architectural choice recorded in `build.js`: *"Every page keeps the shared header/footer inline (so Netlify serves plain committed HTML with no deploy-time build)."*

---

## 3. AI Entity Understanding

### 3.1 Is there a single consistent entity for Lisa Collio?

**VERIFIED: Yes.** Three stable `@id`s, used consistently:

| `@id` | `@type` | Pages carrying it |
|---|---|---|
| `https://lisacolliorealtor.com/#agent` | `RealEstateAgent` | **138 / 157** |
| `https://lisacolliorealtor.com/#lisa` | `Person` | **125 / 157** |
| `https://lisacolliorealtor.com/#website` | `WebSite` | 2 (`/` and `/es/`) |

Cross-references resolve correctly:

- `WebSite.publisher` → `{"@id": ".../#agent"}`
- `RealEstateAgent.employee` → `{"@id": ".../#lisa"}`
- `WebPage.about` → `{"@id": ".../#agent"}` on all 24 `WebPage` nodes
- `WebPage.isPartOf` → `{"@id": ".../#website"}`
- `BlogPosting.author` → `{"@id": ".../#lisa"}` on **121 of 125** article nodes

**VERIFIED: 0 JSON-LD parse errors across all 154 pages carrying structured data.**

### 3.2 Which required connections exist in structured data

**VERIFIED** by scanning every JSON-LD block on all 157 pages.

| Required connection | Modelled in structured data? | How | Pages |
|---|---|---|---|
| **REALTOR®** | ✅ **Yes, typed** | `Person.hasCredential` → `EducationalOccupationalCredential`, `credentialCategory: "designation"`, `name: "REALTOR®"` | 127 |
| **Real Estate Agent** | ✅ **Yes, typed** | `Person.jobTitle: "Real Estate Agent"` + `@type: RealEstateAgent` | 138 |
| **RE/MAX Results** | ⚠️ **String only** | `memberOf` / `worksFor` → `{"@type":"Organization","name":"RE/MAX Results, The Viruez Team"}` — **no `@id`, no `url`, no `sameAs`** | 142 |
| **The Viruez Team** | ⚠️ **String only** | Concatenated into the same `Organization.name`; never its own node | 142 |
| **Goshen, Indiana** | ✅ **Yes, typed** | `areaServed[0]` → `{"@type":"City","name":"Goshen","address":{PostalAddress, addressLocality:"Goshen", addressRegion:"IN", addressCountry:"US"}}` + `address.addressLocality` | 142 |
| **Elkhart** (city) | ✅ **Yes, typed** | `areaServed[1]` → same shape | 142 |
| **Elkhart County** | ❌ **Not modelled** | Appears in 21 pages' JSON-LD only inside free-text `description`/`text` strings. **Not in `areaServed`, not as an `AdministrativeArea`, not as any typed node.** Appears in visible body copy on 40 pages. | 0 as an entity |
| **Indiana** | ✅ **Yes, typed** | `addressRegion: "IN"` on every `PostalAddress` | 142 |
| **English** | ✅ **Yes, typed** | `knowsLanguage: ["en","es"]` | 142 |
| **Spanish** | ✅ **Yes, typed** | same property | 142 |
| **Bilingual services** | ⚠️ **Partial** | `knowsLanguage` is the machine-readable signal and it is correct. The **word** "bilingual"/"bilingüe" appears in JSON-LD on 29 pages, only inside `description` strings. No `Service`, `Offer`, or `availableLanguage` node exists. | 29 (prose) |
| **SRES®** | ✅ **Yes, typed** | `Person.hasCredential` → `credentialCategory: "designation"`, `name: "SRES® Seniors Real Estate Specialist"` | 125 |
| **NAR® Member** | ✅ **Yes, typed** | `Person.hasCredential` → `credentialCategory: "membership"` | 125 |
| **Indiana license RB21002460** | ✅ **Yes, typed** | `Person.identifier` → `PropertyValue`, `propertyID: "Indiana Real Estate License"` | 125 |
| **NRDS 387056478** | ✅ **Yes, typed** | `Person.identifier` → `PropertyValue`, `propertyID: "NRDS"` | 125 |
| **120+ homes / families** | ❌ **Prose only** | In JSON-LD on **7 of 157** pages, and on all 7 only inside a free-text `description` or FAQ-answer `text` string — never a typed property. Visible in the footer on 156 pages. | 0 as a typed value |
| **$20M+ in sales** | ❌ **Prose only** | In JSON-LD on **3 of 157** pages, all inside free-text strings. Visible on 91 pages. | 0 as a typed value |
| **Top 20% of Elkhart County agents** | ❌ **Prose only** | In JSON-LD on **3 of 157** pages, all inside free-text strings. Visible on 75+ pages. | 0 as a typed value |
| **Awards (RE/MAX Executive Club, 100% Club)** | ✅ **Yes, typed** | `Person.award` array | 3 |
| **Education (Bethel College, etc.)** | ✅ **Yes, typed** | `Person.alumniOf` | 2 |
| **5.0 rating / 39 reviews** | ✅ **Yes, typed** | `RealEstateAgent.aggregateRating` | 134 |

### 3.3 The three headline claims, precisely

This is the most consequential finding in this section, so it is stated exactly.

**VERIFIED.** The only places `120+`, `$20M` or `Top 20%` appear inside any JSON-LD block on the entire site:

| Page | Property | Value |
|---|---|---|
| `/` | `text` (FAQ answer) | *"A strategy-first approach, communication you never have to chase, bilingual service, and a track record you can verify — 120+ homes sold and $20M+ in …"* |
| `/about/` | `text` (FAQ answer) | *"Honest guidance over pressure, communication that arrives before you ask, bilingual service, and results you can verify — 120+ homes sold and a 5.0★ G…"* |
| `/blog/community/how-many-homes-lisa-collio-sold-goshen-elkhart/` | `description` | *"How many homes has Lisa Collio sold? 120+ homes and $20M+ in closed sales across Goshen and Elkhart, Indiana — and what that experience means for you."* |
| `/blog/community/how-many-homes-lisa-collio-sold-goshen-elkhart/` | `text` (FAQ answer) | *"More than 120 homes in Goshen and Elkhart, Indiana, with over $20M in closed sales — placing her in the top 20% of Elkhart County agents."* |

**In all four cases the claim is inside a prose string, not a typed property.** There is no `interactionStatistic`, no `knowsAbout`, no quantified `award`, no `Rating` beyond the review aggregate, and no `PropertyValue` carrying any of these numbers.

**Consequence for an AI system:** the credentials (REALTOR®, SRES®, NAR®, license number) are machine-readable facts an AI can assert with confidence. The performance claims are marketing prose an AI must attribute — *"her website states 120+ homes sold"* — rather than state.

### 3.4 Types not implemented anywhere

**VERIFIED — 0 occurrences sitewide:** `Service`, `Offer`, `OfferCatalog`, `LocalBusiness` (superseded correctly by the more specific `RealEstateAgent`), `Organization` as a standalone node with its own `@id`, `Place` with `geo`, `ImageObject`, `SearchAction`, `speakable`, `AdministrativeArea`.

| Type | Present | Count |
|---|---|---|
| `RealEstateAgent` | ✅ | 138 |
| `Person` | ✅ | 125 |
| `WebSite` | ✅ | 2 |
| `WebPage` | ✅ | 24 (+4 dual-typed) |
| `Article` | ✅ | 12 (+4 dual-typed) |
| `BlogPosting` | ✅ | 109 |
| `BreadcrumbList` | ✅ | 152 |
| `FAQPage` | ✅ | 112 |
| `CollectionPage` | ✅ | 7 |
| `AboutPage` / `ContactPage` | ✅ | 2 / 2 |
| `HowTo` | ✅ | 3 |
| `City` | ✅ | 10 |
| `Event` | ✅ | 1 |
| **`Service`** | ❌ | **0** |
| **`Organization` (standalone, with `@id`)** | ❌ | **0** |
| **`LocalBusiness`** | ❌ | 0 (by design) |

---

## 4. Entity Consistency

**VERIFIED**, property by property, across every page carrying the entity.

| Property | On `#lisa` (`Person`) | On `#agent` (`RealEstateAgent`) | Consistent? |
|---|---|---|---|
| **`@id`** | `https://lisacolliorealtor.com/#lisa` — identical on **125/125** | `https://lisacolliorealtor.com/#agent` — identical on **138/138** | ✅ **Perfectly consistent** |
| **`name`** | `"Lisa Collio"` on 125/125 | `"Lisa Collio, Real Estate Agent"` on 138/138 (matches the locked brand string, comma included) | ✅ Consistent; the two differ **by design** — one is the person, one is the practice |
| **`url`** | `https://lisacolliorealtor.com/about/` on 123; **absent on 2** (`/` and `/es/`) | `https://lisacolliorealtor.com/` on 138/138 | ⚠️ Near-consistent — 2 pages omit `Person.url` |
| **`jobTitle`** | `"Real Estate Agent"` on 125/125 | n/a | ✅ |
| **`worksFor`** | `{"@type":"Organization","name":"RE/MAX Results, The Viruez Team"}` on 125/125 | n/a | ✅ string-consistent, ❌ not a resolvable entity |
| **`memberOf`** | absent | same `Organization` string on 138/138 | ✅ string-consistent, ❌ not resolvable |
| **`knowsLanguage`** | `["en","es"]` on 125/125 | `["en","es"]` on 138/138 | ✅ **Exactly two literal forms exist sitewide**, differing only in JSON whitespace |
| **`areaServed`** | absent | Goshen + Elkhart `City` nodes, byte-identical on 138/138 | ✅ Consistent |
| **`telephone`** | present on 2 pages (`/`, `/es/`) as `+1-574-370-5410` | `+1-574-370-5410` on 138/138 | ✅ One E.164 form sitewide |
| **`email`** | present on 2 pages | `lisacolliorealtor@gmail.com` on 138/138 | ✅ One form |
| **`address`** | absent | full `PostalAddress` (1918 Elkhart Rd, Goshen, IN 46526, US) on 138/138 | ✅ Consistent |
| **`hasCredential`** | 4 credentials on 125/125 | absent | ✅ |
| **`identifier`** | NRDS + license on 125/125 | absent | ✅ |
| **`sameAs`** | ❌ **absent — 0 occurrences** | ❌ **absent — 0 occurrences** | ❌ **The entity has no external anchor** |
| **`image`** | ❌ **absent on all 125** | ❌ **absent on all 138** | ❌ **No entity image anywhere** |
| **`description`** | ❌ absent | ❌ absent | ❌ |
| **`geo`** | ❌ absent | ❌ **absent — 0 occurrences sitewide** | ❌ |
| **`hasMap`** | ❌ absent | ❌ absent | ❌ |
| **`priceRange`** | n/a | ❌ **absent — 0 occurrences sitewide** | ❌ |
| **`openingHoursSpecification`** | n/a | Mon–Fri 08:00–19:00 on 138/138 | ✅ |
| **`aggregateRating`** | n/a | 5.0 / 39 on 134 | ✅ |

### 4.1 The four entity-fragmenting pages

**VERIFIED.** Four pages inline a bare `Person` as the article author instead of referencing `#lisa`:

```json
"author": {"@type": "Person", "name": "Lisa Collio", "jobTitle": "Real Estate Agent"}
```

on `/market-stats/`, `/es/estadisticas-del-mercado/`, `/next-chapter-method/`, `/es/tu-proximo-capitulo/`.

These create an anonymous second "Lisa Collio" node with no `@id`, no credentials and no identifiers. An AI system doing strict `@id`-based entity resolution will treat these four authorships as unattributed. Notably, two of the four are `/market-stats/` and its Spanish twin — **the site's most citable original-data pages.**

### 4.2 Verdict on consistency

**Internal consistency is close to exemplary.** One `@id` per entity, one phone form, one email, one address, one `knowsLanguage` value, one `areaServed` structure, one brokerage string, across 138 pages. The companion audit found the same for visible NAP: no conflicting variants exist in the rendered copy either.

**External consistency does not exist**, because the site asserts no external identity at all. `sameAs`: 0. Outbound links to any Lisa Collio profile: 0. The only external links on the entire site are 8 to consumerfinance.gov, 2 to hud.gov, 2 to in.gov, and 2 to google.com.

---

## 5. AI-Readable Content Structure

**VERIFIED** across all 157 pages.

### 5.1 Sitewide structural signals

| Signal | Coverage | Verdict |
|---|---|---|
| Exactly one `<h1>` per page | **157 / 157** | ✅ |
| Zero pages with missing or duplicate H1 | **157 / 157** | ✅ |
| Zero duplicate H1 strings across pages | **157 / 157** | ✅ |
| Descriptive H2s | 152 pages have ≥1; average 9.0 per page | ✅ |
| H2 phrased as a question | 25 pages | — |
| Article title phrased as a question | 43 pages | ✅ |
| `FAQPage` schema | **112 / 157 (71%)**, 378 total questions | ✅ |
| FAQ content in raw HTML, not collapsed | **All** — no `<details>`, no `<summary>`, no `aria-expanded` toggles anywhere | ✅ Strong |
| Direct-answer patterns (`The short answer:` / bolded lead) | Present on the question-titled articles | ✅ |
| `HowTo` schema | 3 pages | — |
| `BreadcrumbList` + visible trail | 152 pages | ✅ |
| Lists and tables | Present on market-stats, community and cost-of-living pages | ✅ |
| Source attribution | `/sources/` + `/es/fuentes/` cover **28 pages each**, in exact EN/ES parity | ✅ Strong |
| Inline source citation in body | 52 pages carry a `Source:` / `Fuente:` / `according to` / MLS attribution pattern | ✅ |
| **Visible author byline** | **0 / 157** | ❌ |
| **Visible `<time>` element** | **0 / 157** | ❌ |
| `meta name="author"` | 0 / 157 | ❌ |
| `speakable` markup | 0 / 157 | ❌ |
| `llms.txt` | ✅ 46 KB, every page in both languages, with descriptions | ✅ Strong |

### 5.2 Per-page structure, the 14 requested pages

| Page | H1 | H2s | H3s | FAQ Qs | Lists/tables | Direct answers | Author visible | Date visible | Sources cited |
|---|---|---|---|---|---|---|---|---|---|
| `/` | ✅ 1 | 8 | ✓ | 4 | ✓ | ✓ | ❌ | ❌ | ❌ |
| `/es/` | ✅ 1 | 8 | ✓ | 4 | ✓ | ✓ | ❌ | ❌ | ❌ |
| `/buyers/` | ✅ 1 | 10 | ✓ | 8 | ✓ | ✓ | ❌ | ❌ | ❌ |
| `/es/compradores/` | ✅ 1 | 9 | ✓ | 7 | ✓ | ✓ | ❌ | ❌ | ❌ |
| `/sellers/` | ✅ 1 | 11 | ✓ | 11 | ✓ | ✓ | ❌ | ❌ | ❌ |
| `/es/vendedores/` | ✅ 1 | 11 | ✓ | 11 | ✓ | ✓ | ❌ | ❌ | ✓ |
| `/moving-to-goshen/` | ✅ 1 | 13 | ✓ | 6 | ✓ | ✓ | ❌ | ❌ | ✓ |
| `/es/mudarse-a-goshen/` | ✅ 1 | 13 | ✓ | 6 | ✓ | ✓ | ❌ | ❌ | ✓ |
| `/living-in-goshen/` | ✅ 1 | 14 | ✓ | 5 | ✓ | ✓ | ❌ | ❌ | ✓ |
| `/es/viviendo-en-goshen/` | ✅ 1 | 14 | ✓ | 5 | ✓ | ✓ | ❌ | ❌ | ✓ |
| `/market-stats/` | ✅ 1 | 8 | ✓ | 5 | ✓ | ✓ | ❌ | ❌ | ✓ |
| `/es/estadisticas-del-mercado/` | ✅ 1 | 8 | ✓ | 5 | ✓ | ✓ | ❌ | ❌ | ✓ |
| `/blog/` | ✅ 1 | **4** | **66** | 0 | ✓ | — | ❌ | ❌ | ✓ |
| `/blog/spanish/` | ✅ 1 | **64** | **8** | 0 | ✓ | — | ❌ | ❌ | ✓ |

### 5.3 A structural EN/ES inconsistency in the blog hubs

**VERIFIED.** The two blog hub pages use **different heading levels for the same component**:

`blog/index.html` — article/topic cards are `<h3>`:

```html
<h3><a href="/blog/buyers/">Buyers</a></h3>
<p>Guidance for buying a home in Goshen and Elkhart — timing, readiness, and process.</p>
```

`blog/spanish/index.html` — article cards are `<h2>`:

```html
<h2><a href="/blog/spanish/como-comprar-una-casa-en-indiana/">Cómo comprar una casa en Indiana, paso a paso</a></h2>
<p>¿Cómo comprar una casa en Indiana? Guía paso a paso en español para familias de Goshen y Elkhart — desde la preaprobación hasta el cierre. Hable con Lisa Collio.</p>
```

Heading census:

| Page | H1 | H2 | H3 |
|---|---|---|---|
| `/blog/` | 1 | **4** | **66** |
| `/blog/spanish/` | 1 | **64** | **8** |

Both are valid HTML and neither hides content. But a retrieval system building a document outline gets a materially different structure from the two hubs: in Spanish each article title is a top-level section; in English all 57 article titles sit two levels down under a single "All articles" H2. **MEDIUM.**

### 5.4 The one interactive-content risk that does not exist

Worth stating explicitly because it is the most common AEO failure on real-estate sites: **there are no accordion FAQs.** No `<details>`, no `<summary>`, no `aria-expanded`, no JS toggles anywhere on the site. Every FAQ question and its full answer is plain, always-visible HTML, followed by a `Read the full article:` link to the authority article. Verified on `/buyers/` and `/es/compradores/`; the pattern is component-generated and uniform.

---

## 6. First-Hand Experience Signals

### 6.1 Method

Because "first-hand" is not directly measurable, eight explicit regex proxies were run over the body text of all 149 pages longer than 300 words. Every pattern is stated so the result is reproducible and falsifiable. A ninth proxy (first-person pronouns) was **built, measured, and discarded** — it matched quoted client reviews and CTA copy, making it too noisy to report.

| Proxy | What it matches |
|---|---|
| `agentVoice` | `Lisa has/works/sees/helped/walks/told/remembers…`, `In Lisa's experience`, `Lisa Collio explains`, Spanish equivalents |
| `clientAnecdote` | `one client`, `a client who`, `a recent buyer/seller`, `un cliente`, `una familia que` |
| `localNamed` | Goshen College, Elkhart County, Concord, Fairfield, Wa-Nee, Baugo, Middlebury, Millersburg, Bristol, Nappanee, Wakarusa, New Paris, Maple City, Elkhart River, Pumpkinvine, Winona, Downtown Goshen, RV/MH Hall of Fame, Ruthmere, Wellfield |
| `marketNumbers` | dollar figures, `days on market`, `median sale price`, `list-to-sale`, `% of list`, Spanish equivalents |
| `datedData` | a 2024–2029 year reference |
| `sourceCited` | `Source:`, `Fuente:`, `according to`, `según`, `MLS`, `Board of REALTORS`, `Census`, `BLS`, `STATS Indiana` |
| `bilingualExp` | `bilingual`, `bilingüe`, `in Spanish`, `en español`, `both languages`, `Hablo español` |
| `sresExp` | `SRES`, `seniors`, `downsiz`, `adultos mayores`, `reducir su hogar` |

### 6.2 Sitewide totals (149 pages measured)

| Signal | Pages carrying it |
|---|---|
| `bilingualExp` | **125** |
| `sresExp` | **107** |
| `localNamed` | **75** |
| `agentVoice` | **64** |
| `sourceCited` | **52** |
| `datedData` | 26 |
| `marketNumbers` | **19** |
| `clientAnecdote` | **10** |

**The two weakest signals are the two that matter most for citability:** only 19 pages carry a real market number, and only 10 carry a client anecdote.

### 6.3 Main pages, scored /8

| Page | agentVoice | anecdote | localNamed | marketNums | dated | sourced | bilingual | SRES | Score |
|---|---|---|---|---|---|---|---|---|---|
| `/blog/` | ✓ | – | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | **7** |
| `/es/mudarse-a-goshen/` | ✓ | ✓ | ✓ | ✓ | – | ✓ | ✓ | ✓ | **7** |
| `/es/viviendo-en-goshen/` | ✓ | ✓ | ✓ | ✓ | – | ✓ | ✓ | ✓ | **7** |
| `/living-in-goshen/` | ✓ | – | ✓ | ✓ | – | ✓ | ✓ | ✓ | **6** |
| `/market-stats/` | – | – | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | **6** |
| `/moving-to-goshen/` | ✓ | – | ✓ | ✓ | – | ✓ | ✓ | ✓ | **6** |
| `/moving-to-elkhart/` | ✓ | – | ✓ | ✓ | – | ✓ | ✓ | ✓ | **6** |
| `/es/mudarse-a-elkhart/` | ✓ | – | ✓ | ✓ | – | ✓ | ✓ | ✓ | **6** |
| `/es/estadisticas-del-mercado/` | – | – | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | **6** |
| `/about/` | ✓ | – | ✓ | – | ✓ | – | ✓ | ✓ | **5** |
| `/living-in-elkhart/` | ✓ | – | ✓ | – | – | – | ✓ | ✓ | **4** |
| `/es/viviendo-en-elkhart/` | ✓ | – | ✓ | – | – | ✓ | ✓ | ✓ | **5** |
| `/next-chapter-method/` | ✓ | – | ✓ | – | – | ✓ | – | ✓ | **4** |
| `/blog/spanish/` | – | – | ✓ | – | ✓ | ✓ | ✓ | ✓ | **5** |
| `/es/conozca-a-lisa/` | ✓ | – | – | – | ✓ | – | ✓ | ✓ | **4** |
| `/` | ✓ | – | – | – | – | – | ✓ | ✓ | **3** |
| `/es/` | ✓ | – | – | – | – | – | ✓ | ✓ | **3** |
| `/buyers/` | ✓ | – | – | – | – | – | ✓ | – | **2** |
| `/contact/` | ✓ | – | – | – | – | – | ✓ | – | **2** |
| `/es/compradores/` | ✓ | – | – | – | – | – | ✓ | – | **2** |
| `/es/vendedores/` | – | – | – | – | – | ✓ | ✓ | – | **2** |
| `/sellers/` | ✓ | – | – | – | – | – | – | – | **1** |
| `/es/contacto/` | – | – | – | – | – | – | ✓ | – | **1** |

**The pattern is inverted from what conversion would want.** The location pillars and market-stats pages — informational content — carry the strongest first-hand evidence (6–7/8). The four commercial hub pages that should convert (`/buyers/`, `/sellers/`, `/es/compradores/`, `/es/vendedores/`) score **1–2 out of 8**: no local place names, no market numbers, no dates, no client anecdotes, and on `/sellers/` not even a bilingual mention.

### 6.4 Articles with the strongest first-hand evidence

| Score | Words | FAQ | In-links | Page |
|---|---|---|---|---|
| **7/8** | 1,293 | 3 | 14 | `/blog/sellers/good-time-to-sell-home-elkhart-indiana/` |
| **7/8** | 1,233 | 5 | 3 | `/blog/market-updates/elkhart-county-mid-year-market-update-2026/` |
| **7/8** | 1,148 | 3 | 6 | `/blog/buyers/are-homes-goshen-indiana-competitive-to-buy/` |
| **6/8** | 1,525 | 5 | 1 | `/blog/spanish/actualizacion-del-mercado-elkhart-county-mitad-2026/` |
| **6/8** | 1,344 | 3 | 5 | `/blog/buyers/good-time-to-buy-home-goshen-indiana/` |
| **6/8** | 1,283 | 3 | 14 | `/blog/sellers/how-long-to-sell-house-goshen-indiana/` |
| **6/8** | 1,267 | 3 | 3 | `/blog/sellers/why-homes-elkhart-indiana-sit-on-market/` |
| **5/8** | 1,625 | 3 | 5 | `/blog/relocation/rv-industry-buying-a-home-goshen-indiana/` |
| **5/8** | 1,589 | 3 | 5 | `/blog/spanish/industria-rv-comprar-casa-goshen-indiana/` |
| **5/8** | 1,394 | 3 | 4 | `/blog/community/what-makes-lisa-collio-different/` |
| **5/8** | 1,180 | 3 | 7 | `/blog/spanish/costo-de-vida-goshen-indiana/` |
| **5/8** | 1,117 | 3 | 9 | `/blog/community/cost-of-living-in-goshen-indiana/` |

### 6.5 Most generic articles

| Score | Words | Page |
|---|---|---|
| **0/8** | 568 | `/blog/community/buying-an-older-home-in-elkhart-indiana/` |
| 1/8 | 485 | `/blog/community/goshen-indiana-industries-employers/` |
| 1/8 | 487 | `/blog/community/downtown-elkhart-indiana/` |
| 1/8 | 552 | `/blog/community/elkhart-indiana-landmarks-amenities/` |
| 1/8 | 556 | `/blog/community/working-in-the-rv-industry-and-buying-a-home-in-elkhart-indiana/` |
| 1/8 | 565 | `/blog/community/what-is-goshen-indiana-known-for/` |
| 1/8 | 576 | `/blog/community/community-events-in-elkhart-indiana/` |
| 1/8 | 589 | `/blog/community/downtown-goshen-indiana/` |
| 1/8 | 633 | `/blog/community/elkhart-indiana-industries-employers/` |
| 1/8 | 645 | `/blog/community/moving-to-elkhart-indiana-from-out-of-state/` |
| 1/8 | 679 | `/blog/community/goshen-indiana-landmarks-amenities/` |
| 1/8 | 694 | `/blog/community/what-is-elkhart-indiana-known-for/` |

**All twelve are in `/blog/community/`.** These are the short EN community articles (485–694 words). **Five of the twelve** — `buying-an-older-home-in-elkhart-indiana`, `downtown-elkhart-indiana`, `community-events-in-elkhart-indiana`, `moving-to-elkhart-indiana-from-out-of-state`, `working-in-the-rv-industry-and-buying-a-home-in-elkhart-indiana` — are also among the seven English articles carrying no FAQ block while their Spanish twins do (§7.5). That overlap means those five are simultaneously the thinnest in first-hand evidence and the weakest in answer structure, in English only.

### 6.6 Specific experience types the brief asked about

| Experience type | Where it demonstrably appears |
|---|---|
| **Lisa's actual experience** | `/about/`, `/es/conozca-a-lisa/` (awards, education, career history); 64 pages carry agent-voice narration |
| **Actual transaction experience** | Weak. `/sellers/` and `/es/vendedores/` carry two named sold listings in `<figcaption>` (`1765 N Bay Drive, Elkhart — Sold by Lisa Collio`; `117 N 6th Street, Goshen — Vendida por Lisa Collio`). Only 10 pages sitewide carry a client anecdote. |
| **Local market data** | 19 pages. Concentrated in `/market-stats/`, `/es/estadisticas-del-mercado/`, the two mid-year market updates, and 4 seller-timing articles. |
| **Local communities** | 75 pages carry a specifically-named local institution, school district, river, park or landmark. **The strongest content dimension on the site.** |
| **Specific Goshen/Elkhart knowledge** | The 4 location pillars (1,298–2,818 words each, 5–6 FAQs, sourced) plus ~30 community articles |
| **Bilingual client experience** | `/blog/community/does-lisa-collio-speak-spanish/` and its ES twin are the only dedicated treatments. 125 pages mention bilingual service, but almost all via the footer/nav. |
| **SRES experience** | `/blog/sellers/what-is-an-sres-seniors-real-estate-specialist/` (1,336 words), `/blog/community/lisa-collio-helps-seniors-families-downsize/`, and their ES twins. 107 pages mention SRES®, again mostly footer. |

---

## 7. English ↔ Spanish AI Understanding

**VERIFIED.** All 67 declared pairs checked on every axis.

### 7.1 Pair connection results

| Check | Result |
|---|---|
| Pairs declared in `content/hreflang-pairs.json` | 67 (134 pages) |
| Both halves exist on disk | **67 / 67** |
| `hreflang="en"` present on both halves | **67 / 67** |
| `hreflang="es"` present on both halves | **67 / 67** |
| `x-default` present on both halves | **67 / 67** |
| `x-default` points to the English URL | **67 / 67** |
| **References reciprocal** (A→B implies B→A) | **67 / 67** |
| `hreflang` value matches the target's `<html lang>` | **67 / 67** |
| Canonical self-referential on both halves | **67 / 67** |
| Canonical/hreflang conflicts | **0** |
| Canonical pointing to the other language | **0** |
| `<html lang>` correct | **157 / 157** (82 `en`, 75 `es`) |
| Structured data present on both halves | **67 / 67** |
| Structured data `inLanguage` set correctly | ✅ `"en"` / `"es"` per page |
| Same entity `@id` on both halves | ✅ `#agent` / `#lisa` — identical across languages |
| Equivalent topic | ✅ verified by H1/title inspection on all 67 |
| **On-page language switcher points at the twin** | **28 / 67 pairs correct — 39 pairs wrong (77 pages)** |
| In-content (editorial) cross-language links | **0 sitewide** |
| Sitemap `xhtml:link` hreflang | **56 of 154** entries — 76 paired pages omit it |

### 7.2 The head-level annotation, exactly as emitted

`es/compradores/index.html:12–15`:

```html
<link rel="canonical" href="https://lisacolliorealtor.com/es/compradores/">
<link rel="alternate" hreflang="en" href="https://lisacolliorealtor.com/buyers/">
<link rel="alternate" hreflang="es" href="https://lisacolliorealtor.com/es/compradores/">
<link rel="alternate" hreflang="x-default" href="https://lisacolliorealtor.com/buyers/">
```

`buyers/index.html` carries the byte-identical block. Only three language values exist sitewide: `en`, `es`, `x-default`. No region subtags.

### 7.3 The contradiction

**VERIFIED.** On 77 of the 134 paired pages — every blog article — the on-page language switcher points somewhere the page's own `<link rel="alternate">` does not.

The badge is not a plain link. `components/header.html:60`:

```html
<a class="hablo-badge" href="{{esHref}}" hreflang="es" lang="es"
   aria-label="Hablo español — ver esta página en español">
```

It carries `hreflang="es"` and `lang="es"` — a machine-readable language annotation in the body, contradicting the head annotation on the same page.

Cause — `build.js:36–37` supplies a fallback when a page's marker omits the parameter:

```js
const DEFAULTS = {
  esHref: "/es/", // "Hablo español" badge target; overridden per page via marker JSON
  enHref: "/",    // "English" badge target on /es/ pages
```

Main pages override it (`<!-- build:header {"esHref": "/es/compradores/"} -->`). Blog articles do not (`<!-- build:header -->`), so every English article's badge resolves to `/es/`. Spanish articles override to the wrong granularity (`<!-- build:header-es {"enHref": "/blog/"} -->`), so every Spanish article's badge resolves to `/blog/`.

**Why this matters more for AI than for classic SEO:** Google reconciles conflicting language signals using the `<head>` annotation, which is correct here. A retrieval system that crawls the body link graph — and finds that 77 pages' only cross-language link goes to a hub — may infer that those page pairs are not equivalents. And since in-content cross-language links measure **zero sitewide**, this badge is the *entire* body-level connection between the two languages.

### 7.4 Entity equivalence across languages

**VERIFIED — this is done correctly.**

| Aspect | Result |
|---|---|
| Same `@id` for the agent on EN and ES pages | ✅ `https://lisacolliorealtor.com/#agent` on both |
| Same `@id` for the person | ✅ `https://lisacolliorealtor.com/#lisa` on both |
| Localized `name` | ✅ `Lisa Collio, Real Estate Agent` / `Lisa Collio, Agente de Bienes Raíces` in visible copy, while schema `name` stays constant |
| `inLanguage` on `WebPage`/`BlogPosting` | ✅ correct per page |
| `knowsLanguage: ["en","es"]` on both language versions | ✅ |
| `areaServed` identical across languages | ✅ byte-identical |
| Credentials identical across languages | ✅ |

An AI system correctly sees **one Lisa Collio described in two languages**, not two people. That is the right outcome and it is achieved.

### 7.5 Content-level divergence that affects AI parity

| Divergence | Count | Effect |
|---|---|---|
| ES twins with **no FAQ section and no `FAQPage` schema** while EN has both | **14** — all 12 `/blog/sellers/` twins plus `/blog/spanish/buen-momento-comprar-casa-goshen/` and `/blog/spanish/que-hace-diferente-lisa-collio/` | Spanish loses FAQ/PAA eligibility for the entire selling topic |
| EN articles with **no FAQ section** while their ES twins have one | **7** — all `/blog/community/` Elkhart articles | English loses it for Elkhart community topics |
| Pairs where ES body is <70% of EN word count | 17 (14 of them the FAQ-less ones above) | — |
| `HowTo` schema on EN but not the ES twin | 1 — `/blog/community/moving-to-elkhart-indiana-from-out-of-state/` | — |
| `Event` schema on ES but not the EN twin | 1 — `/blog/spanish/eventos-comunitarios-goshen-indiana/#firstfridays` | — |
| Blog hub heading levels differ | 2 hubs | §5.3 |

---

## 8. AI Citation Readiness

### 8.1 Criteria applied

A page was scored citable on measurable properties only: unique local information (`localNamed`), first-hand markers (`agentVoice`, `clientAnecdote`), original or dated market data (`marketNumbers`, `datedData`), clear answers (`FAQPage` + question-form headings), source attribution (`sourceCited` or a `/sources/` entry), and sufficient length.

### 8.2 Highest citation-readiness

| Rank | Page | Why | Weakness |
|---|---|---|---|
| 1 | **`/market-stats/`** + **`/es/estadisticas-del-mercado/`** | **The only original-data pages on the site.** Elkhart County MLS figures with source and date, tables, 5 FAQs, dual `WebPage`+`Article` type, full EN/ES parity | ❌ Author is an inline `Person` with **no `@id`** (§4.1) — the site's most citable page has its weakest authorship |
| 2 | **`/blog/market-updates/elkhart-county-mid-year-market-update-2026/`** | 7/8 first-hand score, 1,233 words, 5 FAQs, dated MLS data | Only 3 in-content inbound links; no ES twin (deliberate) |
| 3 | **`/blog/spanish/actualizacion-del-mercado-elkhart-county-mitad-2026/`** | 6/8, 1,525 words, 5 FAQs — **original Spanish-language local market data, a genuinely rare asset** | Only **1** in-content inbound link — the least-linked substantive page on the site |
| 4 | **`/moving-to-goshen/`** + **`/es/mudarse-a-goshen/`** | 2,328 / 2,818 words, 13 H2s, 6 FAQs, named local institutions, `/sources/` citations, `HowTo`-adjacent structure | No visible author or date |
| 5 | **`/living-in-goshen/`** + **`/es/viviendo-en-goshen/`** | 2,331 / 2,678 words, 14 H2s, 5 FAQs, `City` + `Place` schema, sourced | Same |
| 6 | **`/moving-to-elkhart/`** + **`/es/mudarse-a-elkhart/`** | 2,112 / 2,576 words, 6 FAQs, sourced | `/moving-to-elkhart/` has **0** in-content inbound links |
| 7 | **`/blog/community/does-lisa-collio-speak-spanish/`** | The site's only substantive treatment of bilingual practice; question H1, `The short answer:` opening, FAQPage, 11 inbound links — the most-linked bilingual asset | Its ES twin's title carries no geography; badge points to `/es/` |
| 8 | **`/blog/sellers/good-time-to-sell-home-elkhart-indiana/`** and **`/blog/sellers/how-long-to-sell-house-goshen-indiana/`** | 7/8 and 6/8, 14 inbound links each, market numbers, FAQPage | **Their Spanish twins have no FAQ at all** |
| 9 | **`/blog/relocation/moving-to-goshen-indiana-from-out-of-state/`** | `HowTo` schema + FAQPage + 1,118 words | — |
| 10 | **The 7 Spanish first-time-buyer articles** (`como-comprar-una-casa-en-indiana`, `costos-de-cierre-que-son`, `cuanto-dinero-necesito-para-comprar-una-casa`, `errores-comunes-al-comprar-casa`, `no-se-si-califico-credito-y-preaprobacion`, `prestamos-fha-y-usda-en-espanol`, `renta-o-compra-como-decidir`) | 1,183–1,447 words each, question-form titles, direct answers, FAQPage — **the strongest AEO cluster in either language** | ❌ **No geographic qualifier in any of the 7 titles.** They compete nationally against far larger Spanish real-estate sites instead of locally. No English twin. |
| 11 | **`/sources/`** + **`/es/fuentes/`** | 2,217 / 2,554 words of per-page source citation covering 28 pages each, exact EN/ES parity. Unusual and genuinely valuable for citation trust | No `Article`/`Dataset` schema; not linked from articles that rely on it |

### 8.3 What blocks citation of these pages

| Blocker | Affected |
|---|---|
| **No visible author byline anywhere** | All 157 pages. An AI extracting authorship from rendered text finds none. |
| **No visible date anywhere** | All 157. `<time>` count: 0. A summarizer cannot state when market data was published without parsing JSON-LD. |
| **Author entity fragmented on the top data pages** | `/market-stats/`, `/es/estadisticas-del-mercado/` |
| **No `sameAs`** | The whole site — no external corroboration of the author's identity |
| **Track record is prose, not typed data** | An AI must attribute rather than assert 120+/$20M+/Top 20% |
| **Date clustering** | 124 of 125 articles carry one of five July 2026 dates, and `dateModified` ≈ `datePublished`. No freshness signal for time-sensitive market content. |
| **Low internal links to the best assets** | ES market update: 1 inbound. EN market update: 3. `/moving-to-elkhart/`: 0. |

---

## 9. AI Blocking Risks

**VERIFIED — exhaustive check of every blocking mechanism the brief named.**

| # | Potential blocker | Present? | Evidence |
|---|---|---|---|
| 1 | **robots.txt disallow** | ❌ **None** | 0 `Disallow` directives; single `*` group with `Allow: /` |
| 2 | **`noindex` meta** | ⚠️ **3 pages, all intentional** | `/404.html` (`noindex`), `/contact/thank-you/` and `/es/contacto/gracias/` (`noindex, follow`). None is a content page; none is in the sitemap. |
| 3 | **`X-Robots-Tag` header** | ❌ **None** | 0 occurrences in `netlify.toml`; no `_headers` file exists |
| 4 | **Authentication / password protection** | ❌ **None** | No basic-auth, no login form, no gated route in `netlify.toml` |
| 5 | **CAPTCHA** | ❌ **None** | 0 occurrences of `captcha` or `recaptcha`. The 4 forms use `netlify-honeypot="bot-field"`, a hidden field that does not gate page content. |
| 6 | **JavaScript-only content** | ❌ **None** | §2 — one deferred script sitewide; content delta with JS disabled is 215/256 constant characters of cookie-banner text |
| 7 | **Blocked resources (CSS/JS/images)** | ❌ **None** | robots.txt blocks nothing; all assets are same-origin; 0 failed requests across 25 rendered pages |
| 8 | **Third-party / CDN dependencies** | ❌ **None** | Fonts, CSS, JS, and images are all self-hosted. 0 third-party script tags in the HTML. |
| 9 | **WAF / rate limiting** | **NOT VERIFIED** | Netlify platform-level; not configurable from this repository and not observable from here |
| 10 | **Redirect problems** | ❌ **None** | 7 redirects, all 301, all verified locally; **0 chains, 0 loops**; every target is a live 200 |
| 11 | **Canonical problems** | ❌ **None** | 156/156 self-referential; 0 cross-page, 0 cross-language, 0 conflicts with hreflang |
| 12 | **Duplicate domains** | ⚠️ **Risk exists** | §10 |
| 13 | **Netlify deploy-preview indexing** | ⚠️ **Partly mitigated by platform default** | Netlify applies `X-Robots-Tag: noindex` to Deploy Previews and branch deploys by default; **this is platform behavior, not repository configuration**, and nothing in this repo enforces it. **NOT VERIFIED** in production. |
| 14 | **Content-Security-Policy blocking crawlers** | ❌ **No** | CSP restricts what the *browser* may load; it does not affect a crawler fetching HTML. `frame-ancestors 'none'` and `X-Frame-Options: DENY` prevent embedding, not crawling or text extraction. |
| 15 | **Cookie wall / consent gate hiding content** | ❌ **No** | The banner is additive. The no-JS render returned complete body text on all 14 tested pages. Content is never gated behind consent. |
| 16 | **Infinite scroll / pagination requiring JS** | ❌ **None** | `/blog/` renders all 212 links in the raw HTML; no pagination exists |
| 17 | **`nofollow` on internal links** | ❌ **None** | 0 occurrences of `rel="nofollow"` sitewide |
| 18 | **Soft 404s** | ❌ **None found** | All 154 sitemap URLs returned 200 with real content; thinnest content page is 161 words |
| 19 | **Page weight causing crawler timeouts** | ⚠️ **Possible** | HTML itself is 21–76 KB (fine). But `/blog/` transfers ~20 MB and `/blog/spanish/` ~16 MB in full, and heroes are 0.7–3.1 MB JPEGs. A text-only crawler fetching HTML alone is unaffected; a rendering crawler on a budget may be. |
| 20 | **`llms.txt` undiscoverable** | ⚠️ **Yes** | Exists at `/llms.txt`, 46 KB, not declared in `robots.txt` and not linked from any page |

### 9.1 Net assessment

**Nothing on this site blocks an AI crawler from reaching or parsing any content.** Items 1–8 and 10–11 — the mechanisms that actually break AI discoverability in practice — are all clean. The two real risks are the duplicate-domain question (§10) and, for rendering crawlers only, page weight.

---

## 10. Netlify Domain vs Production Domain

### 10.1 The question

Could `https://lisacolliorealtor.netlify.app/` be indexed alongside `https://lisacolliorealtor.com/`?

### 10.2 What the repository does and does not do

**VERIFIED:**

| Control | Status | Detail |
|---|---|---|
| **Canonical tags** | ✅ **Absolute, hardcoded to the `.com` host** | All 156 canonicals are `https://lisacolliorealtor.com/…`. A crawler fetching `lisacolliorealtor.netlify.app/buyers/` receives `<link rel="canonical" href="https://lisacolliorealtor.com/buyers/">`. **This is the primary protection and it is in place on every page.** |
| **hreflang URLs** | ✅ Absolute `.com` | `hreflang.js:20` hardcodes `const SITE = "https://lisacolliorealtor.com"` |
| **Schema `@id` and `url`** | ✅ Absolute `.com` | All 138 `#agent` and 125 `#lisa` nodes use the `.com` host |
| **`og:image` / `twitter:image`** | ✅ Absolute `.com` | 96 pages |
| **Sitemap** | ✅ Only `.com` URLs | All 154 `<loc>` values; 0 non-canonical hosts |
| **`robots.txt` Sitemap line** | ✅ Points at `.com` | `https://lisacolliorealtor.com/sitemap.xml` |
| **Host-conditional redirect (`netlify.app` → `.com`)** | ❌ **Does not exist** | `netlify.toml` has 8 redirect rules, none with a `conditions`, `Host`, `force` or domain clause. Searched explicitly. |
| **`X-Robots-Tag: noindex` for the `netlify.app` host** | ❌ **Does not exist** | 0 occurrences anywhere; no `_headers` file |
| **Host-specific `robots.txt`** | ❌ Not possible | One static `robots.txt` serves both hosts identically, saying `Allow: /` and naming the `.com` sitemap |
| **`netlify.app` referenced anywhere in the repo** | ❌ **0 references** | The only `netlify` strings are 4 `data-netlify="true"` form attributes and code comments |

### 10.3 Assessment

**A crawler that reaches `lisacolliorealtor.netlify.app` will be served the site with a 200 and an `Allow: /` robots.txt.** Nothing at the HTTP or robots layer redirects it or tells it not to index.

**What prevents duplicate indexing is the canonical tag alone** — present on every page, absolute, and pointing at `.com`. Search engines and AI crawlers generally honor a cross-domain canonical, so the practical risk of *duplicate indexing* is low. But canonical is a **hint**, not a directive: the mitigation is one layer deep, where a host redirect or an `X-Robots-Tag` on the `netlify.app` host would be two.

Two secondary points, both VERIFIED from the repo:

- **Nothing links to `netlify.app`.** No page, sitemap entry, schema `@id`, or `og:` tag references it. Discovery would have to come from an external link, a Netlify-related directory, or the certificate transparency log — not from the site itself.
- **`CLAUDE.md` instructs testing against `https://lisacolliorealtor.netlify.app`** ("Until DNS cutover, `lisacolliorealtor.com` does not point at this codebase and testing against it returns false 404s"), which confirms the subdomain is publicly reachable and in active use.

### 10.4 What could not be checked

**NOT VERIFIED — this sandbox's outbound proxy refuses CONNECT to both hosts (HTTP 403), so neither could be fetched:**

```
$ curl -sS -o /dev/null -w "%{http_code}" https://lisacolliorealtor.netlify.app/
curl: (56) CONNECT tunnel failed, response 403

$ curl -sS -o /dev/null -w "%{http_code}" https://lisacolliorealtor.com/
curl: (56) CONNECT tunnel failed, response 403
```

Unverifiable from here:

- Whether the `netlify.app` subdomain currently returns 200, 301, or 404
- Whether Netlify's domain settings already force a redirect to the primary domain (a dashboard setting, not a repository file)
- Whether `lisacolliorealtor.netlify.app` is already in any index
- Whether Deploy Previews are receiving Netlify's default `noindex` header
- Whether `www.lisacolliorealtor.com` redirects to the apex
- Whether HTTP → HTTPS is enforced

All six require the Netlify dashboard or a live request.

---

## 11. AI / LLM Summary

## HOW AN AI SYSTEM WOULD UNDERSTAND THIS WEBSITE

*A factual reconstruction of what the site currently communicates — derived only from what is actually present in the HTML and structured data.*

---

**Identity.** There is one person, `https://lisacolliorealtor.com/#lisa`, named **Lisa Collio**, whose job title is **Real Estate Agent**. There is one business entity, `https://lisacolliorealtor.com/#agent`, of type `RealEstateAgent`, named **Lisa Collio, Real Estate Agent**. The person is declared an `employee` of the business; the business is the `publisher` of the website `https://lisacolliorealtor.com/#website`. These three identifiers are used without variation across 138, 125 and 2 pages respectively, and 121 of 125 articles name `#lisa` as their author by reference. **The site describes exactly one professional, unambiguously.**

**Credentials, stated as machine-readable facts.** She holds four credentials: the **REALTOR®** designation, **NAR® membership**, the **SRES® Seniors Real Estate Specialist** designation, and an **Indiana Real Estate License**. She carries two identifiers: NRDS **387056478** and Indiana license **RB21002460**. She has received RE/MAX Executive Club and 100% Club awards (2022–2025) and studied at Bethel College, the Word of Life Bible Institute, and Children's Ministries Institute®. All of this is typed structured data, not prose.

**Contact and location, stated identically everywhere.** Phone **+1-574-370-5410**. Email **lisacolliorealtor@gmail.com**. Office at **1918 Elkhart Rd, Goshen, IN 46526, US**. Open **Monday–Friday, 08:00–19:00**. No conflicting variant of any of these appears anywhere on the site.

**Service area, as declared.** Two cities: **Goshen, Indiana** and **Elkhart, Indiana**, each modelled as a `City` with a full postal address. **Elkhart County is not part of the declared service area** — it appears in body copy on 40 pages and inside free-text schema strings on 21, but it is not a typed area, place, or administrative region anywhere.

**Languages.** `knowsLanguage: ["en","es"]` on 142 pages. The site is published in parallel English and Spanish: 82 English pages, 75 Spanish pages, 67 explicitly declared equivalent pairs with correct reciprocal `hreflang` and `x-default`. The Spanish pages are not translations — `llms.txt` states this directly, and the structure supports it: Spanish slugs are natural Spanish, 31 of 67 Spanish pages are *longer* than their English twin, and headings diverge in framing rather than tracking the English. **An AI would correctly conclude: one agent, genuinely bilingual, with a Spanish site written for Spanish readers.**

**Brokerage.** She works for and is a member of an organization named **"RE/MAX Results, The Viruez Team"**. This is a name string with no identifier, no URL, and no external reference. An AI can read the string; it cannot resolve it to the RE/MAX Results entity, nor separate "The Viruez Team" as a distinct group.

**Reputation.** An aggregate rating of **5.0 from 39 reviews** appears on 134 pages, alongside two full review texts with named authors. The source of the rating is stated in body copy as Google.

**Track record — and this is where the register changes.** The site asserts, in the footer of all 156 content pages and in body copy on 75–91 pages, that she has sold **120+ homes**, closed **$20M+**, and ranks in the **Top 20% of Elkhart County agents**. None of these is a typed property. Inside structured data they appear only four times in total, always embedded in a prose `description` or FAQ-answer `text` string. **An AI system would report these as claims the website makes, not as facts about Lisa Collio.**

**Expertise, as evidenced.** 75 pages name specific local institutions — Goshen College, Concord, Fairfield, Wa-Nee and Baugo school districts, the Elkhart River, the Pumpkinvine Trail, the RV/MH Hall of Fame, Ruthmere, Wellfield, downtown Goshen. 52 pages cite a source. Two dedicated pages (`/sources/`, `/es/fuentes/`) carry per-page source citations for 28 pages each, in exact parity. Local market figures — median price, days on market, list-to-sale ratio, sourced to the Elkhart County Board of REALTORS® MLS and dated — appear on 19 pages, concentrated in `/market-stats/`, its Spanish twin, and two mid-year market updates. **The community and local-knowledge dimension is the strongest evidentiary content on the site.**

**What she does, by page.** Buying (`/buyers/`, `/es/compradores/`), selling (`/sellers/`, `/es/vendedores/`), relocation and local guidance for Goshen and Elkhart (four pillar pages per language), market data (`/market-stats/` and its twin), and a branded process she calls **The Next Chapter Method™** / **Tu Próximo Capítulo™**. There is no `Service` or `Offer` node — the services are described in prose and headings, never typed.

**What the site does not say about her.** It provides **no link to any external profile of Lisa Collio** — no Google Business Profile, no Facebook, Instagram or LinkedIn, no Zillow or realtor.com listing, no RE/MAX agent page. `sameAs` appears zero times. No photograph is declared as the entity's `image`. No geographic coordinates are given. No page carries a visible author byline or a visible publication date. **An AI system can build a complete and internally consistent picture of Lisa Collio from this website and cannot corroborate a single element of it against any other source the website points to.**

**Overall characterization an AI would produce:** *Lisa Collio is a licensed Indiana real estate agent (RB21002460) and REALTOR® with the SRES® designation, working with RE/MAX Results, The Viruez Team from an office at 1918 Elkhart Rd in Goshen, Indiana. She serves the cities of Goshen and Elkhart, works in both English and Spanish, and publishes an extensive bilingual library of local buying, selling, relocation and community content, with sourced local market data updated as of mid-2026. Her website states a track record of 120+ homes sold and $20M+ in closed sales, and displays a 5.0 rating from 39 reviews.*

---

## AI DISCOVERABILITY RISKS

Ordered by measured severity.

| # | Risk | Severity | Evidence |
|---|---|---|---|
| **1** | **The entity has no external anchor.** `sameAs`: **0 occurrences sitewide**. No `image` on `Person` or `RealEstateAgent`. No `geo`, no `hasMap`. Outbound links to any Lisa Collio profile: **0**. An AI system cannot connect this internally-perfect entity to a Google Business Profile, a social account, a brokerage page, or any third-party listing — so it cannot verify that she exists outside her own website. | **CRITICAL** | §4 |
| **2** | **The differentiating claims are not machine-readable.** 120+ homes, $20M+, Top 20% appear as typed structured data on **zero** pages. Inside JSON-LD they occur four times total, all inside prose strings. An AI will attribute them ("her website states…") rather than assert them. | **CRITICAL** | §3.3 |
| **3** | **The body-level language graph contradicts the head.** On 77 of 134 paired pages the `hreflang`-carrying language badge points at a hub, not the twin — and in-content cross-language links are **0 sitewide**, so this badge is the only body-level EN↔ES connection. | **HIGH** | §7.3 |
| **4** | **No visible authorship or dates anywhere.** 0 of 157 pages carry a byline; `<time>` element count sitewide: **0**. An AI extracting authorship or recency from rendered text finds neither, on any page, in either language. | **HIGH** | §5.1 |
| **5** | **RE/MAX Results is an untyped string.** `memberOf`/`worksFor` carry a name and nothing else — no `@id`, no `url`, no `sameAs`. The brokerage affiliation, one of the strongest available trust signals, is not resolvable. | **HIGH** | §3.2 |
| **6** | **Elkhart County is not modelled.** A stated strategic target appears in body copy on 40 pages and as a typed entity on **0**. `areaServed` names only the two cities. | **HIGH** | §3.2 |
| **7** | **21 EN/ES pairs are FAQ-asymmetric.** 14 Spanish articles have no FAQ block at all (the entire seller cluster plus two others); 7 English Elkhart articles have the inverse. This is missing content, not missing markup. | **HIGH** | §7.5 |
| **8** | **The best citable assets are the least linked.** `/blog/spanish/actualizacion-del-mercado-elkhart-county-mitad-2026/` — original Spanish local market data — has **1** in-content inbound link. The English market update has 3. `/moving-to-elkhart/` and `/about/` have **0**. | **MEDIUM** | §8.3 |
| **9** | **The top data pages fragment the author entity.** `/market-stats/` and `/es/estadisticas-del-mercado/` inline a bare `Person` with no `@id` instead of referencing `#lisa` — the two most citable pages have the weakest authorship on the site. | **MEDIUM** | §4.1 |
| **10** | **No freshness signal.** 124 of 125 articles carry one of five July 2026 dates; `dateModified` ≈ `datePublished` throughout; `<lastmod>` absent from all 154 sitemap entries. Time-sensitive market content reads as frozen. | **MEDIUM** | §8.3 |
| **11** | **`netlify.app` has only one layer of protection.** No host redirect, no `X-Robots-Tag`. The absolute canonical is the sole mitigation — a hint, not a directive. | **MEDIUM** | §10 |
| **12** | **`llms.txt` is undiscoverable.** A thorough 46 KB file exists and nothing — robots.txt, any page, the sitemap — points to it. | **MEDIUM** | §1.3 |
| **13** | **Commercial pages carry almost no first-hand evidence.** `/buyers/`, `/sellers/`, `/es/compradores/`, `/es/vendedores/` score **1–2 of 8** on measured first-hand signals: no named local places, no market numbers, no dates, no client anecdotes. | **MEDIUM** | §6.3 |
| **14** | **Blog hub heading levels differ by language.** Article cards are `<h3>` in English (4 H2 / 66 H3) and `<h2>` in Spanish (64 H2 / 8 H3), producing materially different document outlines for the same component. | **MEDIUM** | §5.3 |
| **15** | **Page weight may exhaust rendering crawlers.** `/blog/` ~20 MB, `/blog/spanish/` ~16 MB, heroes 0.7–3.1 MB each. Text-only crawlers are unaffected (HTML is 21–76 KB); rendering crawlers on a budget may be. | **MEDIUM** | §9 |
| **16** | **No `Service` or `Offer` nodes.** What Lisa actually sells — buyer representation, seller representation, bilingual service, senior downsizing — is described in prose and typed nowhere. | **LOW** | §3.4 |
| **17** | **`aggregateRating` + two full reviews replicated on 134 pages**, including every blog article. A self-serving-review policy surface, and it dilutes the signal. | **LOW** | §3.2 |
| **18** | **Crawler policy is a default, not a decision.** Training crawlers and search-surfacing crawlers are treated identically because none is named. Currently aligned with the goal — but unrecorded as a choice. | **LOW** | §1.3 |

---

## AI DISCOVERABILITY STRENGTHS

Ordered by how much they matter for the stated goal.

| # | Strength | Evidence |
|---|---|---|
| **1** | **Zero client-side rendering dependency.** The entire site has **one** executable script (a deferred cookie banner). A crawler executing no JavaScript sees a constant 215/256 characters less than a full browser — cookie-banner text — and nothing else. Verified on all 14 requested pages, three ways each. **This is the single most important property for AI discoverability and it is perfect.** | §2 |
| **2** | **Nothing is blocked, anywhere.** No `Disallow`. No `X-Robots-Tag`. No CAPTCHA. No authentication. No JS-gated content. No blocked assets. No third-party dependencies. No `nofollow`. No redirect chains or loops. Every AI crawler — training, search-surfacing, user-initiated — has full access to all 154 indexable URLs. | §1, §9 |
| **3** | **One consistent, correctly cross-referenced entity graph.** `#agent` on 138 pages, `#lisa` on 125, `#website` on 2, with `employee`/`publisher`/`about`/`isPartOf`/`author` all resolving by `@id`. 121 of 125 articles reference the author by `@id`. **0 JSON-LD parse errors across 154 pages.** | §3.1, §4 |
| **4** | **Structured data is extensive and in the raw HTML.** 15 schema types, 378 FAQ questions, 152 `BreadcrumbList`, 112 `FAQPage`, 109 `BlogPosting` — all present in the initial HTTP response, none injected. | §2.7, §3.4 |
| **5** | **Credentials are typed facts, not marketing prose.** REALTOR®, NAR®, SRES® and the Indiana license are `hasCredential` nodes; NRDS and the license number are `identifier` `PropertyValue`s. An AI can assert these with confidence. | §3.2 |
| **6** | **FAQ content is never collapsed.** No `<details>`, no `<summary>`, no `aria-expanded`, no JS toggles anywhere. Every question and its full answer is always-visible HTML followed by a link to the full authority article. | §5.4 |
| **7** | **Head-level hreflang is flawless.** 67/67 pairs reciprocal, self-referencing, `x-default` correct, `hreflang` value matching each target's `<html lang>`, 0 canonical conflicts. `<html lang>` correct on 157/157. | §7.1 |
| **8** | **The bilingual claim is machine-readable.** `knowsLanguage: ["en","es"]` on 142 pages, with exactly two literal forms differing only in whitespace — and the same entity `@id` on both language versions, so an AI sees one bilingual agent, not two people. | §7.4 |
| **9** | **NAP is perfectly consistent.** One phone form, one email, one address, one brokerage string, one license number, across 157 pages and two languages. No conflicting variant exists in visible copy or in schema. | §4 |
| **10** | **Canonicals are absolute and self-referential on 156/156 pages** — the single control currently protecting against `netlify.app` duplication, and it is applied without exception. | §10.2 |
| **11** | **Source attribution is unusually thorough.** `/sources/` and `/es/fuentes/` carry per-page citations for 28 pages each in exact parity, plus 52 pages with inline source attribution. Market figures carry source and date. | §5.1 |
| **12** | **Genuine local specificity.** 75 pages name specific local institutions, districts, rivers, trails and landmarks — not generic real-estate filler. This is the site's strongest evidentiary dimension. | §6.2 |
| **13** | **`llms.txt` exists and is substantive.** 46 KB listing every page in both languages with descriptions, and stating explicitly that Spanish pages are adaptations rather than translations — precisely the disambiguation an LLM needs. | §1.3 |
| **14** | **Original local data exists in both languages.** `/market-stats/` + `/es/estadisticas-del-mercado/` and two mid-year market updates carry sourced, dated Elkhart County MLS figures. Original Spanish-language local market data is a rare asset. | §8.2 |
| **15** | **Clean heading and URL structure.** Exactly one H1 per page on 157/157, 0 duplicate H1 strings, 0 duplicate titles, 0 duplicate meta descriptions, 152 breadcrumb trails, lowercase hyphenated URLs with consistent trailing slashes, max depth 3. | §5.1 |
| **16** | **Sitemap integrity.** All 154 indexable pages present, 0 phantom entries, 0 duplicates, 0 non-canonical hosts, and the 3 excluded pages are correctly `noindex`. | §9 |
| **17** | **Consent gate does not block content.** Load-on-accept, not load-then-suppress: zero third-party network activity before consent, and the banner never hides body text. | §2.4 |

---

## 12. What Could Not Be Verified

| Item | Why |
|---|---|
| Live behavior of `https://lisacolliorealtor.com` | Sandbox proxy refuses CONNECT (403). DNS has not cut over per `CLAUDE.md`. |
| Live behavior of `https://lisacolliorealtor.netlify.app` | Same 403. Cannot confirm whether it 200s, 301s, or is already indexed. |
| Whether Netlify's domain settings force `netlify.app` → `.com` | Dashboard setting, not a repository file |
| Whether Deploy Previews carry Netlify's default `noindex` header | Platform behavior; not observable from the repo |
| `www` → non-`www` and HTTP → HTTPS enforcement | Not in `netlify.toml`; Netlify domain-level |
| Whether any AI system currently cites, indexes, or names Lisa Collio | Requires querying those systems |
| Whether `lisacolliorealtor.netlify.app` appears in any index | Requires a live search |
| Whether Googlebot/GPTBot/ClaudeBot etc. have actually fetched the site | Requires server logs or Search Console |
| Whether a Google Business Profile exists for Lisa Collio | External. The site declares no `sameAs`, so it asserts no link to one. |
| Whether the GBP's NAP matches the site | External |
| Current published behavior of each crawler token in §1.2 | Background knowledge; operators change these. Re-confirm against each operator's documentation. |
| Whether Google honors the hreflang annotations in practice | Requires Search Console |
| WAF or rate-limiting behavior under crawler load | Netlify platform-level |
| Real-world crawl budget consumption from 16–20 MB pages | Requires production logs |
| Whether the Spanish reads natively to a Latin-American Indiana audience | Native-speaker editorial judgment, not a code measurement |

---

## 13. Commands and Methods

All read-only. **No repository file was created, modified, renamed, or deleted**, other than this report. `git diff` against the previous commit is empty for every tracked file.

**robots / headers / config**

```bash
cat robots.txt                                   # 75 bytes, 3 lines, verbatim in §1.1
find . -name "robots*" -not -path "./.git/*"     # → only ./robots.txt
ls _headers _redirects                           # → neither exists
grep -rn "X-Robots" netlify.toml robots.txt components/*.html   # → 0
grep -n -i "force\|conditions\|Host\|domain" netlify.toml       # → 0 host-conditional rules
grep -rn "netlify" --include=*.html --include=*.toml .          # → 4 form attrs + comments only
```

**JavaScript dependency census**

```bash
grep -ro "<script" --include=*.html . | wc -l                    # 449 total
grep -rho "<script[^>]*>" --include=*.html . | grep -v ld+json | sort | uniq -c
                                                                 # → 159 × consent.js, nothing else
grep -rln "<noscript" --include=*.html .                         # → none
grep -rn "recaptcha\|captcha" --include=*.html .                 # → 0
```

**Raw HTTP vs no-JS render vs JS render** — the core measurement. A ~25-line Node static server replayed `netlify.toml`'s 7 redirect rules and the `/*` → `404.html` fallback; each of the 14 pages was then captured three ways and compared on body text length, H1 string, H2 count, link count, JSON-LD types, and `Question` node count.

```bash
node serve.js &        # port 8099, read-only
node ai_render.js      # raw fetch + chromium {javaScriptEnabled:false} + chromium networkidle
```

**Entity and structured data**

```bash
node -e '...'   # probe every JSON-LD block on 157 pages for: sameAs, image, geo,
                # priceRange, Service, Offer, knowsLanguage, areaServed, Elkhart County,
                # 120+/$20M/Top 20%, and report which property each match sits in
grep -rl "sameAs" --include=*.html . | wc -l     # → 0
```

**First-hand experience proxies**

```bash
node firsthand.js    # 8 named regexes (listed in §6.1) over body text of 149 pages >300 words.
                     # A 9th proxy (first-person pronouns) was measured and discarded as noisy.
```

**Live-domain checks (both failed)**

```bash
curl -sS https://lisacolliorealtor.netlify.app/   # curl: (56) CONNECT tunnel failed, 403
curl -sS https://lisacolliorealtor.com/           # curl: (56) CONNECT tunnel failed, 403
```

**Method caveats carried forward from the companion audit.** Two extractor bugs were found and fixed mid-audit there, and both fixes are in force here: the chrome-stripping regex must match `build:header-es`/`build:footer-es` as well as the English markers, and tag-stripping merges text across element boundaries, so every NAP-style finding was re-verified with `grep` against raw HTML. One new false positive was found and dismissed in this audit: `/market-stats/`'s H1 appeared to differ between raw and rendered, which was `&amp;` entity decoding, not a content difference (§2.6).

**No secrets.** No API key, token, password, or credential appears in this report or was found in the repository.

---

*End of AI/LLM discoverability audit. Nothing in this repository was modified.*
