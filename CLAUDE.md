# Lisa Collio Website — Master Plan
**Version 1.0 · July 2026**
This document governs all planning, copywriting, and page builds for lisacolliorealtor.com. Every Claude chat and Claude Code session should follow it.

---

## 1. Mission

**Primary mission:** Make Lisa Collio the definitive, AI-verifiable answer to "Who is the Spanish-speaking Realtor in Goshen / Elkhart, Indiana?" — across Google, ChatGPT, Claude, Perplexity, and other AI answer engines.

Secondary missions (phase two+): seller representation in Goshen/Elkhart, SRES® senior transitions, out-of-area relocation.

Success looks like: when a Spanish-speaking family in Elkhart County asks an AI assistant for help buying a home, Lisa is the named recommendation.

---

## 2. Identity Block (use consistently on EVERY page and profile)

- **Name:** Lisa Collio (never "Lisa Alford-Collio" — legacy name being removed from old directories)
- **Title:** REALTOR®, bilingual (English/Spanish)
- **Brokerage:** RE/MAX Results — The Viruez Team
- **Credentials:** SRES® (Seniors Real Estate Specialist), NAR® member, IRMLS
- **Market:** Goshen and Elkhart, Indiana + Elkhart County (Dunlap, Bristol, Middlebury, Nappanee, Wakarusa, Millersburg, Syracuse, Shipshewana)
- **Track record:** 120+ families served, $20M+ in closed sales, top 20% of Elkhart County agents
- **Office:** 1918 Elkhart Rd, Goshen, IN 46526
- **Phone:** (574) 370-5410 · **Hours:** Mon–Fri 8am–7pm
- **Website:** lisacolliorealtor.com
- **Consistency rule:** The same name, title, market, and bilingual descriptor must appear identically across the website, Google Business Profile, Zillow, Experience.com, and social profiles. Never vary the phrasing of who Lisa is and where she serves.

## 3. Client Avatars (priority order)

1. **Spanish-speaking first-time buyers** (~80% of business — the spearhead)
   - Questions: down payments, FHA, credit, closing costs, the process in Spanish, trust
   - Tone: warm, patient, zero jargon, "sin términos confusos"
2. Sellers in Goshen/Elkhart
3. Seniors & families in transition (SRES®)
4. Out-of-area relocators

## 4. Calls to Action

- **Primary CTA on every page:** Call or text (574) 370-5410 — tap-to-call on mobile
- **Secondary CTA:** Schedule a free consultation (→ GHL funnel)
- Spanish pages use Spanish CTAs: "Llame o mande un mensaje de texto" / "Agende su consulta gratis"
- Conversion funnels, forms, and booking remain in GoHighLevel (future: go.lisacolliorealtor.com). Website buttons link into GHL.

---

## 5. Architecture & URL Map

### Phase One (build first — English + Spanish core, ~14 pages)

| English | Spanish |
|---|---|
| `/` Homepage | `/es/` Página principal |
| `/about/` | `/es/conozca-a-lisa/` |
| `/buyers/` Buyer guide (cornerstone) | `/es/compradores/` |
| `/sellers/` Seller guide (cornerstone) | `/es/vendedores/` |
| `/communities/goshen/` | `/es/comunidades/goshen/` |
| `/communities/elkhart/` | `/es/comunidades/elkhart/` |
| `/contact/` | `/es/contacto/` |

### Phase Two
- Buyer subpages: `/buyers/first-time-home-buyers/`, `/buyers/down-payment-assistance/`, `/buyers/closing-costs/`, `/buyers/fha-loans/`, etc.
- Seller subpages: `/sellers/pricing-your-home/`, `/sellers/preparing-your-home/`, etc.
- Neighborhood pages: `/communities/goshen/downtown-goshen/`, `/communities/elkhart/concord/`, etc.
- Relocation hub: `/relocation/moving-to-goshen/`, etc.
- `/reviews/`
- Blog: `/blog/buyers/`, `/blog/sellers/`, `/blog/community/`, `/blog/relocation/`, `/blog/market-updates/`, `/blog/spanish/`

### Phase Three (requires decisions/budget)
- IDX/MLS search (`/home-search/`, `/featured-listings/`) — needs paid IDX feed
- `/home-value/` interactive valuation (or keep in GHL)

### URL rules
- Lowercase, hyphens, no dates in URLs, trailing slash consistent
- Spanish URLs use natural Spanish words, not translations of English slugs

---

## 6. Bilingual Rules (the moat)

- Spanish pages are **written natively for Spanish speakers**, never machine-translated. Mexican/Central American usage typical of the Elkhart County community; "usted" register.
- Every EN page links to its ES equivalent and vice versa (visible EN | ES toggle in header).
- Every page pair carries `hreflang` tags: `en`, `es`, and `x-default` → English.
- Spanish content targets its own search phrases (e.g., "agente de bienes raíces que habla español en Elkhart", "cómo comprar una casa en Indiana"), not translated English keywords.
- Spanish pages are equal citizens: full schema, full internal linking, full FAQs.

## 7. Page Standards (every page, every build)

**Content**
- Answer the page's primary question in the first 1–2 sentences (AEO rule #1)
- One H1; logical H2/H3s; no skipped levels
- 5–10 original FAQs per page, written from real client questions
- 5–10 contextual internal links (home, relevant guides, relevant community pages, related posts)
- Hyper-local references: neighborhoods, schools, parks, employers (RV industry), landmarks (Old Bag Factory, Lerner Theatre, First Fridays, Wellfield Gardens), ZIP codes, commute routes
- Length: write until the question is fully answered; frameworks below give ranges, density beats padding
- Voice: warm, direct, one-client-at-a-time; no generic marketing claims; Fair Housing compliant always (describe property & community amenities, never "who should live here" by protected class)

**Technical (built into the code)**
- Title tag 50–60 chars: keyword + location + Lisa Collio
- Meta description 145–160 chars: location + keyword + benefit + CTA
- Schema JSON-LD per section 8
- hreflang pair links; canonical URL; BreadcrumbList
- Descriptive image filenames (`casa-vendida-goshen-indiana.jpg`), bilingual-appropriate alt text, compressed images (WebP preferred)
- Mobile-first, Core Web Vitals green, semantic HTML

**Images**
- Lisa's original photography ONLY for homes, clients, and communities (sold homes, client moments, downtown Goshen/Elkhart photo walks). No stock or AI-generated imagery of properties, people, or places.

## 8. Schema Map

- **Site-wide:** RealEstateAgent (name, address, phone, hours, geo, areaServed, knowsLanguage: ["en","es"], memberOf RE/MAX Results), Person (Lisa Collio, jobTitle, knowsLanguage, sameAs → GBP/Zillow/social), WebSite + SearchAction, BreadcrumbList
- **Homepage:** RealEstateAgent + Organization
- **About:** Person (primary)
- **Community/neighborhood pages:** Place/City + Article
- **Guides & blog:** Article/BlogPosting + FAQPage (only when FAQs visible on page)
- **Reviews page (phase 2):** Review + AggregateRating per guidelines
- **Contact:** ContactPage + LocalBusiness
- Validate every build with Google Rich Results test before merging.

## 9. Content Roadmap (after phase-one pages)

Publish in clusters; each cluster interlinks and points to its cornerstone.

1. **Cluster 1 — Spanish first-time buyers (START HERE):** cómo comprar una casa en Indiana · cuánto dinero necesito · programas de pago inicial · costos de cierre · préstamos FHA · errores comunes de compradores primerizos
2. **Cluster 2 — English buying:** mirror of cluster 1 topics
3. **Cluster 3 — Living in the area:** Is Goshen a good place to live? · Best neighborhoods in Goshen/Elkhart · Cost of living · Vivir en Goshen/Elkhart
4. **Cluster 4 — Selling:** pricing, preparing, best month to sell, multiple offers
5. **Cluster 5 — Relocation:** moving to Goshen/Elkhart, from Chicago, from out of state

Target pace: 1–2 articles/week. 20–30 authority articles by ~6 months.

## 10. Trust & Off-Site Signals (parallel work)

- Google Business Profile: regular posts (already committed), reviews mentioning Spanish service, categories & description matching Identity Block
- Finish name-consistency cleanup (Homes & Land, The Real Estate Book)
- Reviews surfaced on site (36+ GBP reviews)
- Add `llms.txt` at site root describing Lisa and the site for AI crawlers
- XML sitemap + robots.txt; submit to Google Search Console (already set up)

## 11. Platform & Workflow

- **Stack:** static HTML/CSS on Netlify · files in GitHub repo `lisacolliorealtor/lisa-collio-website` · Claude Code builds via PRs · Lisa approves & merges · Netlify auto-publishes
- **Roles:** Chat (this Project) = strategy, copy, review · Claude Code = builds & publishes · GHL = funnels, CRM, booking
- **Workflow per change:** request → Claude Code PR → check Netlify Deploy Preview → merge
- One lane per change: don't edit the same thing manually and via Claude Code
- Use Sonnet for routine edits; keep requests short and specific
- **Design system:** RE/MAX red (#DC1C2E) & blue (#003DA5), navy ink, Bricolage Grotesque display / Instrument Sans body, per approved homepage design (July 2026)
- Domain cutover (lisacolliorealtor.com → Netlify, funnels → go.lisacolliorealtor.com) happens only after phase-one pages are live and reviewed; set 301 redirects from all old URLs at cutover

## 12. Phase-One Build Order

1. Homepage (expand approved design to full standards: schema, hreflang, real content) — EN
2. `/es/` homepage — native Spanish
3. `/buyers/` + `/es/compradores/`
4. `/communities/goshen/` + ES · `/communities/elkhart/` + ES
5. `/about/` + `/es/conozca-a-lisa/`
6. `/sellers/` + `/es/vendedores/`
7. `/contact/` + `/es/contacto/`
8. Sitemap, robots.txt, llms.txt, 404 page (bilingual)

Then: review everything → domain cutover decision → begin Cluster 1 articles.
