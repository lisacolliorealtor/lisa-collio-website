# CLAUDE.md — lisa-collio-website
**v1.3 (July 27, 2026)** — see the Revision Log at the end of this file.
Mirrors the highest-numbered Lisa_Collio_Website_Master_Plan version in Project
files. This file defers to the Master Plan; if they ever disagree, the Master Plan
wins. Deliberately no version number here — hardcoding one let this line go stale
while the plan moved on. Regenerate this file whenever the plan version-bumps (one
PR touches both).

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
  **Decision (Lisa, 25 July 2026):** the ban is on "Northern Indiana" as a
  service-area/brand descriptor. Plain geographic fact is permitted — e.g.
  "the northern part of the state" (/moving-to-goshen/) and "northern Goshen"
  (school-boundary copy on /living-in-goshen/) are approved as-is. Do not flag
  or reword these in future audits; a bare grep for "northern" is not a
  violation test on its own.
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
RE/MAX Results, The Viruez Team | Licensed in Indiana #RB21002460"
Footer stack also carries: the composite-story disclaimer, the content
reliability disclaimer (added July 2026, broker-approved — full text at
/disclaimers/), the agent-not-lender statement, Equal Housing Opportunity
statement/logo, the independence line, and legal-page links (/terms/ /privacy/
/accessibility/ /fair-housing/ /disclaimers/ /sources/). Exact texts supplied
from Lisa_Collio_Legal_Pages_APPROVED_2026 and the approved Disclaimers &
Sources doc during the build — never alter approved legal text. See the locked
seven-item order in the Design & Naming Addendum below.

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
/moving-to-goshen/ ↔ /es/mudarse-a-goshen/ ·
(ES Elkhart community page still lives at /es/comunidades/elkhart/ until its
Batch 4 rebuild renames it to /es/viviendo-en-elkhart/) ·
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
2. Master Plan (highest-numbered version in Project files) + Brand Cheat
   Sheet (highest version) — locked decisions.
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

## BUILD PROCEDURE — FAQ + AUTHORITY ARTICLE CLUSTERS (locked, July 2026)
Folded in from `docs/approved-copy/V1_0_Bilingual_FAQ_Authority_Article_Playbook_Lisa_Collio.md`,
which was distilled from the Elkhart/Goshen cluster build. Read that file for the
worked examples; this section is the binding procedure. It applies to any page
cluster following the "FAQ + full authority article + matching Spanish twin"
pattern.

### The five failures this exists to prevent
Each rule below is here because the failure actually happened, more than once.

1. **One source of truth: whatever is live on `main`.** Approved `.md` files in
   the repo are the *authoring* record, not the *verification* record. Never
   assume a source file and the live page agree — check. Content in a chat, a
   knowledge panel, an unmerged branch, and `main` will silently diverge.
2. **A merged PR ends its branch.** The moment a PR merges, that branch is done;
   further work starts on a branch freshly cut from the new `main`. **Adopt
   one-PR-per-unit-of-work** — open a PR as soon as a discrete piece of work is
   ready rather than accumulating several units on a long-lived branch. This was
   missed on PRs #55, #59, #60 and #61, each time leaving finished work invisible
   on a branch whose PR had already merged.
3. **Approved content is committed the moment it is used.** Any drafted content —
   FAQ blocks, article bodies, source docs — goes into `docs/approved-copy/`
   *before* it is used to build something live, never left as a chat upload. An
   uncommitted upload is invisible to every future rebuild, audit run, and
   session. One reintroduced a Fair Housing violation the repo's own approved
   source had correctly barred. Treat "is this file actually in the repo?" as a
   standing check whenever drafted content is used to build a live page.
4. **A repeated fact needs one canonical home: `docs/VERIFIED_FACTS.md`.**
   Every claim appearing on more than one page lives there once, with its source
   and the pages that state it. Correct that file first, then check each listed
   page against it — never against each other. The "13 vs 14 elementary schools"
   regression happened because a correction landed on a page later retired while
   an approved source still said the old number, so the wrong figure kept
   regenerating. The file also records disagreements between sources rather than
   silently picking a winner, and flags figures that are contested or withdrawn.
5. **English and Spanish change together.** Both languages ship in the same PR,
   or the Spanish adaptation is explicitly tracked before the English PR merges —
   never an unscoped "we'll get to it." Rebuilding 16 English articles without
   their twins left the Spanish pages not merely thin but *contradictory*, stating
   different facts about the same subject. This is the most important rule here.
6. **Verify, don't report.** For anything visible on a live page — FAQ content,
   redirects, fact corrections — confirm by direct fetch against the real
   production URL before calling it done. "I built X" has been wrong often enough
   that a summary is not evidence.

### The locked procedure, in order
Do not skip a step because it feels redundant.

1. **Scope and count both languages first.** Lock the FAQ question count per
   page-type and the article count, and confirm the Spanish set matches 1:1,
   before any content is written. (Site standard is 5; the Goshen and Elkhart
   Moving pillars run 6.)
2. **Gather facts from named sources, citing as you go.** No number, date, name,
   or count enters an article unless it is already in `docs/VERIFIED_FACTS.md`
   with its source. If it is not there, verify it and add it there *first*.
3. **Draft the English body.** Roughly 220–350 words for a spoke article,
   1,500–2,500 for a pillar. Apply the compliance checklist below *while writing*.
4. **Draft the English FAQ against that body.** Every fact in an answer must be
   traceable to the body text on the same page.
5. **Lisa approves the English.**
6. **Draft the Spanish adaptation immediately, from the English body just
   written.** Cultural adaptation per Volume 37, never translation. Check
   neighbouring Spanish pages for house style first (e.g. "intermedia" vs
   "secundaria" for middle schools). Carry every fact the English states unless
   there is a specific reason not to — and record the reason.
7. **Draft the Spanish FAQ against the Spanish body.**
8. **Lisa approves the Spanish.**
9. **Build both languages in the same PR.**
10. **hreflang pair, sitemap entry, and `/sources/` + `/es/fuentes/` citations
    ship in that same PR.** A page is not done without them. Backfilling these
    later cost 120 pages of hreflang and 23 citation entries.
11. **Verify before calling it done:** direct-fetch every changed page in both
    languages; `npm run audit` (FAQ/schema equality, citation titles, hreflang
    reciprocity, locked identity, Fair Housing terms); real HTTP status checks on
    any redirect. `npm run hreflang -- --check` previews pairing without writing.
12. **Only then move to the next cluster.**

### Compliance checklist — run at drafting time, not at audit time
- No "walkable," "walking distance," "walk to," or other ambulatory phrasing
  anywhere (Fair Housing). This has regressed once; `npm run audit` now fails on
  it. Idiomatic "walking into a negotiation" is fine.
- No "Northern Indiana" as a standalone service-area descriptor — but do not
  over-correct: plain geography ("the northern part of the state") is approved
  per the 25 July 2026 decision recorded above.
- Service area stated as "Goshen and Elkhart, Indiana" only.
- ™ on every Method brand; ® on REALTOR®, NAR®, SRES®, RE/MAX®.
- No specific business, restaurant, or shop names on evergreen pillar pages —
  acceptable on dated blog articles carrying a verify-current-details disclaimer.
- No school ranking or steering: name every applicable district, route confirmation
  to that district's own enrollment office, never rank or recommend.
- Agent-not-lender RESPA disclaimer present on any page discussing costs or
  financing.
- Every MLS or market figure carries its source and date and routes to
  /market-stats/ as canonical rather than being restated elsewhere.
- Composite-story disclaimer applies only to actual composites; real reviews stay
  verbatim.
- Locked seven-item footer stack intact and in order.

### Track-record claims
"120+ families · $20M+ closed · Top 20% of Elkhart County agents" is the standing
site-wide claim. Period-specific rankings (e.g. a numbered mid-year placing)
belong only on /market-stats/, dated — never as a homepage or footer claim.

### Testing environment
Until DNS cutover, `lisacolliorealtor.com` does not point at this codebase and
testing against it returns false 404s. Test against the Netlify production URL
(`https://lisacolliorealtor.netlify.app`). Deploy previews freeze at the commit
they were last built from and stop updating once their PR closes — a stale preview
usually means the PR is closed or the branch moved past what was built.

### Git rename detection on large rewrites
Do not trust it. Merging a branch that rewrites many articles at once has silently
paired unrelated files (a cost-of-living article with a school-district page).
Resolve such merges from an explicit hand-written slug map and verify each pairing.

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
4. **The seven-item footer stack is locked verbatim, in this exact order,** on
   every page (single-sourced in `components/footer.html`; Spanish renderings in
   `components/footer-es.html`). Item 3 was added July 2026 (broker-approved,
   PR #43) and is a permanent part of the locked stack:
   1. Footer signature (single line): "Lisa Collio | Real Estate Agent | $20M+
      Sold | 120+ homes sold | Top 20% Elkhart County | Helping buyers & sellers
      in Goshen & Elkhart, IN | Hablo español | REALTOR® | NAR® Member | SRES®
      Seniors Real Estate Specialist | RE/MAX Results, The Viruez Team | Licensed
      in Indiana #RB21002460"
   2. Site footer disclaimer: "Some client stories are illustrative composites to
      protect confidentiality; all reviews and testimonials are real and shown as
      written."
   3. Content reliability disclaimer: "Information on this website is deemed
      reliable but not guaranteed. Content is drawn from public records and other
      publicly available sources." (Full version lives at /disclaimers/.)
   4. Agent-not-lender statement: "Lisa Collio is a licensed real estate agent and
      is not a mortgage lender, loan officer, or broker. She does not originate
      loans, quote loan terms, or make lending decisions. For financing questions,
      speak directly with a licensed lender."
   5. Equal Housing Opportunity statement and logo.
   6. "Each Office Independently Owned and Operated."
   7. Links to /terms/, /privacy/, /accessibility/, /fair-housing/,
      /disclaimers/, /sources/ (plus the Blog link per the launch nav plan).

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

## REVISION LOG

**v1.3 — July 27, 2026** (Claude, at Lisa's direction)
- Master Plan reference is now self-updating — "the highest-numbered version in
  Project files" rather than a hardcoded v2.5, in both the header and the
  precedence hierarchy. The pinned number had gone stale while approved docs
  moved to v2.8; the rest of the hierarchy already used this rule.
- Added `docs/VERIFIED_FACTS.md` as the canonical record for any fact stated on
  more than one page, and made consulting it binding in the build procedure:
  no number, date, name, or count enters an article unless it is already there
  with its source.

**v1.2 — July 27, 2026** (Claude, at Lisa's direction)
- Added the locked BUILD PROCEDURE section for FAQ + authority-article clusters,
  folded in from the Bilingual FAQ + Authority Article Build Playbook: the five
  recurring failures and their rules, the twelve-step procedure, the
  drafting-time compliance checklist, and the practical notes on test
  environment, track-record claims, and git rename detection.
- Two rules from that section change day-to-day practice immediately:
  **one-PR-per-unit-of-work** (a merged PR ends its branch; further work starts
  from a fresh branch off the new `main`), and **approved content is committed to
  `docs/approved-copy/` before it is used to build anything live**.
- The four source documents used to build the FAQ work are now in
  `docs/approved-copy/` rather than existing only as chat uploads: the EN and ES
  FAQ Gap Blocks, the 5-article FAQ Replacement set, and the Playbook itself.
- Corrected "walkable-feeling" in the newly committed EN FAQ Gap Blocks document
  to match the live page, with a dated note. That document is the file that
  reintroduced the phrasing; committing it uncorrected would have left the
  regression armed.
- NOT actioned, needs Lisa's decision: the Playbook also recommends bumping the
  Master Plan to v2.9 with a pointer to it in §8, and creating a canonical
  `docs/VERIFIED_FACTS.md`. Both are outside this file's scope.

**v1.1 — July 25, 2026** (Claude, at Lisa's direction)
- Footer stack updated from six to seven locked items: the content reliability
  disclaimer ("Information on this website is deemed reliable but not
  guaranteed…") was added as item 3 (broker-approved July 2026, shipped in
  PR #43), and the legal-links group now includes /disclaimers/ and /sources/.
- Recorded Lisa's decision (25 July 2026) on "northern": only "Northern
  Indiana" as a service-area/brand descriptor is banned; plain geographic
  phrasing ("the northern part of the state," "northern Goshen") is approved
  as-is. See the Market bullet under LOCKED IDENTITY.
- Footer-signature brokerage name in this file corrected to the locked comma
  form ("RE/MAX Results, The Viruez Team"), matching `components/footer.html`
  since Batch 1.

**v1.0 — July 2026** — original file (as of Master Plan v2.5).
