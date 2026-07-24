# CLAUDE.md — lisa-collio-website
Mirrors Lisa_Collio_Website_Master_Plan_v2_5 (July 2026). This file defers to the
Master Plan; if they ever disagree, the Master Plan (highest version) wins.
Regenerate this file whenever the plan version-bumps (one PR touches both).

## WHO / WHAT
Website for Lisa Collio, Real Estate Agent — RE/MAX Results, The Viruez Team —
serving Goshen and Elkhart, Indiana ONLY. Bilingual EN/ES site at
lisacolliorealtor.com. Host: Netlify (server-side, cookie-less analytics).
Forms/funnels/booking live in GoHighLevel, not this repo.

## LOCKED IDENTITY (use identically everywhere — never improvise)
- Brand name: "Lisa Collio, Real Estate Agent" — ALWAYS with the comma.
  NEVER "Lisa Collio Real Estate" as a standalone business name (876 IAC 8-1-8).
  Never lead with REALTOR®. Never "Lisa Alford-Collio".
- Market: Goshen and Elkhart, Indiana — ONLY. Never "Elkhart County" or
  "surrounding areas" as a service area (Elkhart County allowed only inside
  verifiable stats). Never "Northern Indiana". Schema areaServed = Goshen, IN
  and Elkhart, IN exactly.
- Track record: 120+ families served · $20M+ closed · Top 20% of Elkhart County
  agents. ("100+" anywhere is superseded legacy — never publish it.)
- Phone (the ONLY number): (574) 370-5410. Delete 574-975-0141 on sight.
- Email: lisacolliorealtor@gmail.com (only public email).
- Office: 1918 Elkhart Rd, Goshen, IN 46526 · Mon–Fri 8am–7pm.
- License: Indiana #RB21002460 (in footer signature). NRDS 387056478 =
  schema only, never visible copy.
- Homepage H1 (locked): "Lisa Collio, Real Estate Agent in Goshen and Elkhart,
  Indiana". EN hero subheadline: "Your next move starts with a conversation."
- Master tagline: "Unlocking smart opportunities for buying, selling, and
  moving forward." (short: "Unlocking smart moves") — never as site name.
- Core brand message: "Every home marks the beginning of a new chapter. My role
  is to help you move into it with confidence, clarity, and peace of mind."
- Brand promise: "Your Next Chapter Starts with a Smart Move."
- Buyer pages only: "Transforming dreams into homes" / ES "Transformando sueños
  en casas". Seller pages: EN "Unlocking smart moves" / ES "Tu llave hacia
  decisiones inteligentes."
- Method brands: The Next Chapter Method™ · Tu Próximo Capítulo™ ·
  Smart Move Framework™ · Unlocking Smart Moves™ — always ™, never ®.
  ® only on third-party marks: REALTOR®, SRES®, RE/MAX®, NAR®.
- Logo: Lisa_Collio_Logo_Black_2026.png in assets/logos/, header alongside
  RE/MAX branding per broker guidelines.

## FOOTER (locked, every page)
Single-line footer signature, exactly:
"Lisa Collio | Real Estate Agent | $20M+ Sold | 120+ homes sold | Top 20%
Elkhart County | Helping buyers & sellers in Goshen & Elkhart, IN | Hablo
español | REALTOR® | NAR® Member | SRES® Seniors Real Estate Specialist |
RE/MAX Results | The Viruez Team | Licensed in Indiana #RB21002460"
Footer stack also carries: Equal Housing Opportunity statement/logo, legal-page
links (/terms/ /privacy/ /accessibility/ /fair-housing/), and the site-wide
client-story composite disclaimer (exact texts supplied from
Lisa_Collio_Legal_Pages_APPROVED_2026 during the build — never alter approved
legal text).

## BILINGUAL RULES (the moat)
- One language per page. No mixed-language pages, ever.
- The ONLY Spanish on English pages: a compact "Hablo español" banner/badge on
  every EN page, linking to the /es/ equivalent. Every ES page links back.
- Spanish pages are cultural adaptations (Volume 37 voice), never translations.
- Spanish URLs use natural Spanish words.

## ARCHITECTURE (Phase One — build EN+ES as pairs)
/ ↔ /es/ · /about/ ↔ /es/conozca-a-lisa/ · /next-chapter-method/ ↔
/es/tu-proximo-capitulo/ · /buyers/ ↔ /es/compradores/ · /sellers/ ↔
/es/vendedores/ · /living-in-goshen/ ↔ /es/viviendo-en-goshen/ ·
/living-in-elkhart/ ↔ /es/viviendo-en-elkhart/ · /contact/ ↔ /es/contacto/ ·
(ES community pages currently live at /es/comunidades/{goshen,elkhart}/ and move
to the /es/viviendo-en-*/ paths in Batch 2e) ·
/market-stats/ (EN only at launch — documented exception) ·
/terms/ /privacy/ /accessibility/ /fair-housing/ (EN at launch).
URL rules: lowercase, hyphens, no dates, consistent trailing slash.

## PAGE STANDARDS (every page)
- Primary CTA: Call or Text (574) 370-5410 (tap-to-call) / ES: "Llame o mande
  un mensaje de texto". Secondary: Schedule a free consultation / "Agende su
  consulta gratis" (GoHighLevel funnel).
- FAQ standard (Lisa, July 2026): target = every page carries a 5-question FAQ
  section; each question answered briefly on-page and hyperlinked to a full
  authority article on the blog. Phase 1 ships the existing approved FAQ/article
  sets AS-IS (do not rewrite approved content). Phase 1.b (before Phase 2)
  brings every page to the 5-question standard and adds the missing sets
  (Next Chapter Method, Communities, Market Stats) plus the ES market-stats page.
- Reading level ~6th grade as a clarity target, never at the cost of natural
  sentence rhythm.
- Reviews: always verbatim (typos, emojis preserved). Spanish originals on /es/
  pages; English translations labeled as translated. Names displayed exactly as
  they appear on Google (per Lisa: "Anidem" and "EliteGodGamer" stay as-is).
- Client stories other than documented reviews = approved illustrative
  composites, covered by the site-wide footer disclaimer — never invent new ones.
- Schema per Master Plan §9; AggregateRating 5.0/39 (Google only).

## ASSETS
Photos live in assets/images/{lisa, logos, client-reviews, client-general,
homes-elkhart, homes-goshen, goshen, elkhart}. Claude Code selects images by
folder context; Lisa reviews all picks in the page PR.
- client-reviews/: ONLY photos of clients who have a review, named
  review-firstname-lastname.jpg. Pairing rule: a client photo appears ONLY with
  that same client's own verbatim review (pairing manifest supplied by Lisa).
  Each page features 1–2 client photos with the client's review directly below.
- client-general/: clients without reviews — general warmth/lifestyle use only,
  never placed next to any review text.
- homes-elkhart/ and homes-goshen/: decorative property imagery only. Never
  present any image as a specific advertised/sold listing without written
  seller consent on file (876 IAC 8-1-8(f)). When in doubt, decorative framing.
- Lender photos (e.g., Sergio Gomez): HOLD — do not place until Lisa's managing
  broker clears RESPA co-marketing. His review text may still be used per the
  reviews rules.
- Videos are never committed to this repo — YouTube embeds only.
- Every image gets descriptive alt text; people imagery follows Fair Housing
  guidance (§15).

## COMPLIANCE & PRECEDENCE (absolute)
1. Compliance gates: RESPA, Fair Housing/IREC/NAR, MLS data rules.
2. Master Plan v2.5 + Brand Cheat Sheet v3.0 (locked decisions).
3. AI Business Brain Vols I–XXXVII (voice, psychology, avatar depth).
4. General knowledge.
Avatars/Life Chapters guide empathy and voice ONLY — never published targeting;
immigration status never referenced. Market data only from the verified MLS
data files (§16); never invent statistics. No lead-capture form ships without
the legal pages it references.

## WORKFLOW
Claude drafts → Lisa (licensed agent) reviews and approves → managing-broker
sign-off for advertising and legal content → merge → publish. Every page PR
runs the Master Plan §8 pre-publish gate before requesting Lisa's review.
Build order (§14): Homepage EN → /es/ → buyers pair → communities → remaining
pairs → market-stats → legal pages live before any form.

## DESIGN & NAMING ADDENDUM (July 2026)
Foundations shipped in PR 1. The design system lives in `assets/css/tokens.css`
(tokens + self-hosted @font-face) and `assets/css/site.css` (components); shared
chrome lives in `components/header.html` and `components/footer.html`, injected by
`build.js` (`npm run build`). See README for the workflow.

### Color tokens and roles (authoritative)
- `--remax-blue #003DA5` — primary brand/trust: heading accents, links, key UI.
- `--remax-red #E60E16` — primary accent: CTA buttons, the "Hablo español" badge,
  highlights.
- `--warm-white #FAF7EF` — page background.
- `--crimson #AF0032` — sparing secondary accent: hover states, small emphasis.
- `--gray #AAAAAA` — borders / dividers / decoration ONLY — NEVER text (fails WCAG
  contrast).
- `--navy-ink #00062E` — headings, dark sections.
- `--black #000000` — body text.
Accessibility: body text is black or navy-ink on warm-white; red/crimson only on
buttons, badges, and large display elements, never paragraph text; visible focus
on every interactive element; WCAG AA contrast throughout; never rely on color
alone for meaning.

### Typography
Bricolage Grotesque for display/headings, Instrument Sans for body. Both are
self-hosted woff2 in `assets/fonts/` (SIL OFL, license files included). No
third-party font CDN calls (privacy: the approved Privacy Policy describes no
client-side tracking).

### Naming & usage rules (locked)
1. **Brokerage name in writing** is always the full "RE/MAX Results, The Viruez
   Team". "RE/MAX" is always written with the slash; the slash-free "REMAX" is
   permitted ONLY inside logo graphics/filenames, never in prose.
2. **`assets/images/homes-general/`** is decorative house imagery ONLY: no
   addresses or city names anywhere (filenames, captions, or alt text) and never
   any "Sold" framing. Sold-listing content comes exclusively from the
   `homes-goshen/` and `homes-elkhart/` address subfolders (with written seller
   consent per 876 IAC 8-1-8(f)).
3. **Header prominence (876 IAC 8-1-8):** "RE/MAX Results" carries equal-or-greater
   visual prominence than "Lisa Collio" — do not shrink the RE/MAX lockup below
   the agent lockup.
4. **The six-item footer stack is locked verbatim, in this exact order,** on every
   page (single-sourced in `components/footer.html`):
   1. Footer signature (single line): "Lisa Collio | Real Estate Agent | $20M+
      Sold | 120+ homes sold | Top 20% Elkhart County | Helping buyers & sellers
      in Goshen & Elkhart, IN | Hablo español | REALTOR® | NAR® Member | SRES®
      Seniors Real Estate Specialist | RE/MAX Results | The Viruez Team | Licensed
      in Indiana #RB21002460"
   2. Site footer disclaimer: "Some client stories are illustrative composites to
      protect confidentiality; all reviews and testimonials are real and shown as
      written."
   3. Agent-not-lender statement: "Lisa Collio is a licensed real estate agent and
      is not a mortgage lender, loan officer, or broker. She does not originate
      loans, quote loan terms, or make lending decisions. For financing questions,
      speak directly with a licensed lender."
   4. Equal Housing Opportunity statement and logo.
   5. "Each Office Independently Owned and Operated."
   6. Links to /terms/, /privacy/, /accessibility/, /fair-housing/.

### Featured image standard (locked — PR 24; supersedes PR 17–20 layouts)
Every page/blog featured image is composited by `scripts/generate-featured-images.py`.
Colors are ALWAYS RE/MAX Blue `#003DA5` or Red `#E60E16` (white title text on
both); font is Bricolage Grotesque. **Text/color bands must NEVER cover a
person's face** — bands sit beside or below the photo, never over the subject.
The script picks a template automatically by looking at the source photo
(visual judgment — house vs people — not filename):
- **Template A — house/property photos.** 1200×630. Title in a color band
  overlaid at the top of the photo (houses have sky/wall space). Single file
  used for both the page and `og:image`. (Unchanged from PR 17.)
- **Template B — LANDSCAPE or square people photos.** 1200×900: photo fills the
  top 1200×700 (cover, anchored high), solid color band across the bottom
  1200×200 holds the title. Nothing overlaps the photo.
- **Template C — PORTRAIT people photos.** 1200×900: photo fills one vertical
  half (600×900, minimal crop), a solid color panel fills the other half with
  the title vertically centered.
- **Four-variant rotation, tracked across the whole set (not per template)** so
  no two consecutive articles look alike: C uses photo side × panel color —
  (1) LEFT+Blue, (2) RIGHT+Red, (3) LEFT+Red, (4) RIGHT+Blue; B alternates
  blue/red only. Selection/rotation logic lives in the script.
- **Dual output for B and C:** `{slug}-header.jpg` (1200×900, used on the page
  and in the BlogPosting `image` field) plus `{slug}-og.jpg` (1200×630, used for
  `og:image`/`twitter:image` only, so social crops never lose the band).
  Template A needs only the single 1200×630 file. Generate `.webp` beside every
  `.jpg`. FAQ-hub/blog-card thumbnails stay a consistent 1.9:1 (derived from the
  OG version for B/C) so mixed-template grids read evenly.
- Spanish images: title text must match the article's Spanish H1 exactly
  (accents, ñ, ¿…?). Verify the font renders those glyphs before shipping.
