# Lisa Collio Website — Standing Audit Checklist

*Trigger: when Lisa says "audit" (or "quick audit" / "batch check") in any chat, Claude runs the corresponding section below against the current live site or deploy preview, plus the Project file audit if requested. Always confirm the correct URL/preview to audit before starting — never assume.*

**Version:** v1.4 · Updated 30 July 2026 · Governed by the current Website Master Plan (always the highest-numbered version in the repo) and all documents in its hierarchy. Update this file's version number whenever the checklist itself changes, following the locked file-naming convention (version first, description, "Lisa Collio" last).

**v1.4 change note:** folds in the repo-specific technical/process content from `docs/AUDIT_CHECKLIST.md` (a separate, older, non-canonical document discovered during a Part C2 repo audit — never a stale copy of this file, just a different one covering some of the same ground plus real gaps this file didn't have). That file is retired on this version landing — one document, not two. See Part B §13–17, the Pre-Audit Inventory Snapshot, and the two appendices below for what moved. Folded content was verified against the live repo before being copied in, not carried forward on trust — two corrections came out of that: the automated-checks appendix now reflects all 18 current `audit.js` checks (the old file predated checks 14–18 and mischaracterized hreflang pairing and llms.txt coverage as warnings — both are hard checks now), and the old file's Reviews section claim that "reviews appear only on main pages, never blog/authority articles" is dropped as stale — `build-reviews.js` now deliberately places reviews on every content page. §18 (Workflow / Draft-Approval Discipline) is not folded in here; its non-duplicate content went into CLAUDE.md's Build Procedure section instead, since that's where the rest of this project's PR/branch/draft-approval process rules already live.

---

## HOW TO USE THIS FILE

1. Upload this file to the Project (or keep it there permanently) so any future chat can find it via `project_knowledge_search`.
2. Say **"audit"** for the Full Site Audit, or **"quick audit"** / **"batch check"** for the abbreviated version.
3. Claude confirms the URL/preview to check, then works through the relevant section, reporting pass/fail/flag per item — not just a summary. Anything failed gets a specific fix recommendation, not just a note that it's wrong.
4. Recommended cadence for the Full Audit: end of each content cluster, before DNS cutover, and quarterly after launch. The Quick Batch Check runs after every single batch/PR.

---

## PRE-AUDIT INVENTORY SNAPSHOT (run first, every time)

Before checking anything else, establish what currently exists, so the rest of the audit knows its own scope:

- [ ] Count EN pages, ES pages, EN articles, ES articles, and diff that count against CLAUDE.md's ARCHITECTURE list — which pairs are live, which are still pending per the Build Order?
- [ ] Note anything built but **not yet linked** from nav/sitemap (orphaned pages are easy to lose track of across batches).
- [ ] Note anything linked (nav, FAQ, internal link) but **not yet built** — distinguish an expected pre-merge 404 (in-flight batch, verifiable from PR/branch state) from an actual broken link.
- [ ] List draft files currently sitting in `docs/drafts/` (unapproved, still gated) vs. `docs/approved-copy/` (cleared for merge) — this tells you which parts of the site can be checked against "final" copy and which are still provisional.

---

## PART A — QUICK BATCH CHECK (run after every batch)

- [ ] Locked identity block correct everywhere touched: "Lisa Collio, Real Estate Agent" (with comma, never leading with REALTOR®), phone (574) 370-5410, email, license RB21002460 visible / NRDS schema-only
- [ ] Service area stated as "Goshen and Elkhart, Indiana" — never "Northern Indiana," never "Elkhart County" as a standalone descriptor
- [ ] "RE/MAX Results, The Viruez Team" written in full, slash intact in text
- [ ] Trademark/registered marks correct (™ vs ®) per the locked list
- [ ] No Fair Housing red flags introduced: no ambulatory phrasing, no familial-status/age/religion framing, no "perfect for" language
- [ ] New Spanish content is native usted-register writing, not translated from English (except legal pages, which are intentionally precise mirrors)
- [ ] Footer stack order correct and complete on any new page type, both languages
- [ ] File naming follows the locked convention (version first, description, "Lisa Collio" last)
- [ ] New pages/articles carry correct hreflang pair to their language counterpart
- [ ] Any new MLS-derived stat carries source + date range
- [ ] Section 13 status block present and accurate (DRAFT / APPROVED / broker sign-off) on any source file delivered

---

## PART B — FULL SITE AUDIT

### 1. SEO (technical + on-page)

- [ ] Title tags: present, unique, ≤60 characters, keyword-forward, on every page sampled
- [ ] Meta descriptions: present, unique, 145–160 characters, no duplicates across pages
- [ ] One H1 per page, matching or supporting the locked SEO headline; logical H2/H3 hierarchy beneath it
- [ ] Canonical tags correct (no self-referencing errors, no accidental cross-language canonicals)
- [ ] URL structure clean, lowercase, hyphenated, matches the locked slug conventions
- [ ] Internal linking: every new page linked FROM at least one other page (no orphans); no unintentional keyword cannibalization between pages targeting similar terms
- [ ] Sitemap.xml current — spot-check that recently shipped pages are present
- [ ] Robots.txt not accidentally blocking anything that should be indexed
- [ ] Image alt text present and descriptive (not keyword-stuffed) on a sample of images, both languages
- [ ] No broken internal links (sample-check a cross-section of recently added pages)
- [ ] Redirects: verify any renamed URL has a working 301, **placed above the `/* → 404` catch-all rule in `netlify.toml`** (redirect order matters — first match wins), and that nothing internal still points to the old path
- [ ] Page load spot-check: no obviously oversized unoptimized images on new pages

### 2. GEO (generative-engine optimization — how the site surfaces in AI-generated answers)

- [ ] Facts are stated as clear, extractable, attributable claims (a model could lift a sentence cleanly with source attached) rather than buried in narrative
- [ ] Every locally-sourced stat names its source and date range in the same sentence or immediate vicinity — not just linked away
- [ ] Structured data (schema) is present and matches on-page visible text exactly — no mismatch between what's marked up and what's shown
- [ ] Content answers the actual question a prospective client would type/ask an AI assistant, not just what a search engine would rank
- [ ] Distinctive, ownable phrasing exists for Lisa's frameworks (Next Chapter Method™, Smart Move Framework™) so they're attributable to her specifically, not generic real-estate language
- [ ] Author/agent identity (E-E-A-T signals — see below) appears near key claims, not just in a footer far away

### 3. AEO (answer-engine optimization — FAQ/structured-answer quality)

- [ ] Every page has its 5-question FAQ section per the standing rule
- [ ] Each FAQ answer is a complete, self-contained answer (2–4 sentences) — not just a teaser forcing a click
- [ ] FAQPage schema present and matches visible FAQ text exactly, on every page/article sampled
- [ ] FAQ questions phrased the way a real person would ask them (natural language, not keyword fragments)
- [ ] No duplicate FAQ questions across nearby/competing pages without differentiated answers
- [ ] Full-article links from FAQ answers resolve (no 404s) and go to the correct, current article
- [ ] No orphaned FAQ links in either direction: every article a FAQ links to is reachable, **and** every authority article intended to be linked from a hub FAQ is actually linked from somewhere

### 4. NAP (Name, Address, Phone) consistency

- [ ] Business name identical everywhere: "Lisa Collio, Real Estate Agent" / brokerage "RE/MAX Results, The Viruez Team"
- [ ] Phone number identical everywhere: (574) 370-5410 — check footers, contact page, schema, both languages
- [ ] Address identical everywhere it appears (1918 Elkhart Rd, Goshen, IN 46526) — footer, legal pages, schema
- [ ] Schema NAP fields match visible on-page NAP exactly (a common, easy-to-miss mismatch)
- [ ] Google Business Profile NAP matches website NAP exactly (flag if not verified recently — check `LAUNCH_CHECKLIST.md` status)
- [ ] Spanish pages use the same phone/address (no separate/altered contact info for the ES site)

### 5. E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness)

- [ ] Lisa's credentials (REALTOR®, NAR® Member, SRES®, License #RB21002460) visibly displayed, not just in schema
- [ ] Track record (120+ families, $20M+, top-20% stat) present with correct, current framing per locked rules
- [ ] Meet Lisa page presents genuine experience/background, not generic bio boilerplate
- [ ] Reviews are genuine, attributed per the current rule (full name as shown on Google, e.g. "Anidem" and "EliteGodGamer" stay as-is), and never mixed with composite stories without clear provenance
- [ ] Composite-story disclaimer is visible and easy to find (footer), and no composite is presented in a way that could be mistaken for a verified review
- [ ] MLS data citations present and dated wherever local stats are used — trustworthiness signal as much as compliance requirement
- [ ] Bilingual competence itself functions as an authority signal — "Hablo español" / native ES content, not machine-translated, reinforces genuine expertise serving this market
- [ ] External trust signals present where applicable (NAR/REALTOR® logos, Equal Housing Opportunity logo, RE/MAX branding) and used correctly per brand rules
- [ ] **Review placement and rotation, verified mechanically, not assumed:** `build-reviews.js` places one photo+review card, one text-only review card, and one standalone client photo on every content page (legal, disclaimers/sources, thank-you, and 404 pages are the only exclusions) — reviews are NOT restricted to "main pages only." Rotation is least-recently-used across the full eligible pool, constrained by a real adjacency graph (in-content links, primary nav, parent/child hierarchy, hreflang twins) so no reviewer repeats on the same or an adjacent page, and no household member appears twice. Run `node build-reviews.js --check` to confirm current assignments are up to date — it is **not** wired into `npm run audit` or any other automated gate, so it silently drifts until someone runs it by hand.
- [ ] Client-photo pairing rule respected: `client-reviews/` photos appear only beside that same client's own verbatim review; `client-general/` photos never sit directly adjacent to review/testimonial text. Lender photos (e.g. Sergio Gomez) stay on **HOLD** pending managing-broker RESPA co-marketing clearance — confirm zero placements; the review *text* may still be used.

### 6. Compliance (Fair Housing / RESPA / IREC / NAR Code of Ethics)

- [ ] Full-site grep for ambulatory phrasing ("walkable," "walk to," "walking distance") — flag every remaining instance, not just known ones. (`audit.js` check 5 already hard-fails on `walkab` sitewide; idiomatic "walking into a negotiation" is fine.)
- [ ] No familial-status, age, religion, disability, or protected-class framing anywhere in property/community descriptions
- [ ] "Condado de Elkhart" / "Elkhart County" used only in permitted contexts (proper names, the top-20% stat) — flag any use as a standalone service-area or identity descriptor. Two proper-name exceptions are pre-allowlisted: the Elkhart County 4-H Fair and the Elkhart County Board of REALTORS®.
- [ ] **RESPA dollar-figure sweep:** grep `\$[0-9]` sitewide, but expect near-universal hits from the single locked "$20M+" track-record figure in the footer signature (verified 30 July 2026: ~189 of ~195 hits) — that one is approved, not a violation. The actual check is whether anything *else* appears: specific dollar amounts should be confined to `/market-stats/`, `/es/estadisticas-del-mercado/`, and the dated mid-year market-update article only. No interest-rate figures or directional rate predictions anywhere. No qualification predictions — language defers to "a licensed lender." The agent-not-lender statement appears in every footer (both languages) and inline wherever financing is discussed in body copy. No lender/settlement-provider data sharing implied anywhere (Privacy Policy language, consent-checkbox copy).
- [ ] **876 IAC 8-1-8(f):** no property image presented as a specific advertised/sold listing without written seller consent on file; check new pages against `assets/images/homes-goshen/` and `homes-elkhart/`'s consent-gated address folders vs. the decorative-only `homes-general/` folder.
- [ ] Legal-page effective dates match their language-pair counterpart exactly (same date, not independently set) — re-check any time either language's legal page is touched.
- [ ] Legal-page courtesy-clause / English-controls paragraph present on all four ES legal pages, unaltered.
- [ ] MLS-sourced statistics always carry their source + date range inline, never presented as evergreen facts.
- [ ] No invented statistics anywhere — every number on the site should trace to `content/approved/goshen-elkhart-data-sheet.md`, the MLS data files, or an explicitly cited public source.
- [ ] Avatar/Life-Chapters material used for voice/empathy only — confirm no page uses it as published targeting language, and immigration status is never referenced anywhere on the site.
- [ ] Section 13 review gate respected — spot-check that live advertising-adjacent content has a recorded approval + broker sign-off trail
- [ ] Equal Housing Opportunity logo present site-wide per the locked footer stack, both languages
- [ ] No lead-capture form references a legal page that doesn't exist yet.
- [ ] **HUD complaint line correct on both Fair Housing pages:** 1-800-669-9777, `hud.gov/fairhousing` (the one documented exception to the "only one phone number on the site" rule).

### 7. Bilingual parity ("equal citizens" rule)

- [ ] Every English page has a Spanish counterpart at parity (not a thin summary) — flag any ES page that's shorter/less complete than its EN pair
- [ ] Every Spanish page has a working EN | ES toggle pointing to the correct counterpart (test a sample in both directions). **Confirm the badge targets the specific correct page, not a generic fallback** — a wrong badge target is easy to introduce on a rename and has happened before (`/moving-to-goshen/`'s badge once pointed at `/es/` generically instead of `/es/mudarse-a-goshen/`; verified 30 July 2026 as fixed, kept here as the illustrative case for what to check).
- [ ] hreflang pairs validate in both directions, sampled across page types
- [ ] Language purity maintained — no stray English in ES body copy or vice versa, apart from proper names and the toggle itself
- [ ] Featured images, schema, and FAQ structure present on ES pages at the same standard as EN, not a reduced version
- [ ] Spanish nav structure matches English nav structure (two-level Goshen group, etc.) — check for drift after any nav change

### 8. Sources / citations page

- [ ] Every page/article that cites MLS or third-party data has that citation reflected on the Sources page
- [ ] Sources page is current as of the most recent batch — no missing recent additions
- [ ] Short-version vs. long-version MLS disclaimer used correctly per page type (article vs. dedicated stats page)
- [ ] No source cited on a page that isn't also listed on the Sources page (and vice versa — no orphaned Sources entries for content that no longer exists)
- [ ] Both language versions of the Sources page (if applicable) are in parity

### 9. Accessibility (WCAG 2.1 AA target)

- [ ] Alt text present on images sampled across new pages
- [ ] Color contrast spot-check on any new page design elements (RE/MAX Blue/Red on white/dark per the locked palette); `--gray` used only for borders/dividers, never as text color — grep the CSS, don't rely on visual spot checks alone
- [ ] Exactly one `<h1>` per page, logical heading order (no skipped levels)
- [ ] Keyboard navigation works on a sample of interactive elements (nav dropdowns, forms); visible focus states on every interactive element
- [ ] Skip-to-content link present and functional
- [ ] Tap targets ≥44px on mobile nav and footer links
- [ ] `width`/`height` set on every `<img>` to prevent layout shift
- [ ] Accessibility Statement page current in both languages and accurately describes actual site behavior — worth periodically re-verifying against the live rendered site, not just the stated target

### 10. Brand and content-standard consistency

- [ ] Featured-image template rules followed (correct template per photo type — A house/property, B landscape/square people, C portrait people, chosen by visual judgment not filename — correct dimensions, no text/color band ever covering a person's face, no consecutive repeats)
- [ ] **Four-variant rotation cross-checked against `content/featured-image-rotation-log.md`**, not assumed correct: no two consecutive articles (in publish order) share a variant, and the log's "next variant" line matches what the next image actually used. B/C templates produce both the 1200×900 page/BlogPosting-image file and the 1200×630 `-og` file; A templates need only the single 1200×630 file. `.webp` sibling exists for every `.jpg`.
- [ ] `assets/images/homes-general/` carries no address or city name anywhere (filename, caption, alt text) and never "Sold" framing; `homes-goshen/`/`homes-elkhart/` address-named subfolders used only with written seller consent on file.
- [ ] `content/photo-usage-audit.md` accurately reflects current used/unused status (spot check a sample, don't assume it's been kept current after every batch).
- [ ] Voice/tone consistent with Brand Cheat Sheet — spot-check a sample against the two audience lanes (first-time buyers / equity-rich sellers)
- [ ] No pricing or MLS figures appearing anywhere outside the canonical Market Stats page
- [ ] Story/testimonial provenance labeled correctly everywhere (composite vs. verified review)
- [ ] **Locked-string spot-check on any page quoting brand copy directly:** superseded phone `574-975-0141`, superseded "100+" track-record claim, bare self-claimed superlatives ("Top agent," "#1 agent" without qualification) — `audit.js` check 5 already hard-fails the first two sitewide; the superlatives sweep is not yet automated, so check it by hand. Verified 30 July 2026: every current "Top/Best/#1" hit sitewide resolves to the locked Top-20% stat, an approved award citation ("Best Real Estate Teams in Indiana"), or an approved article title — none are bare self-claims.

### 11. Forms and lead capture

- [ ] All forms (lead-capture, home-valuation, contact, others) tested end-to-end in both languages
- [ ] Every form has a unique `name` attribute sitewide (Netlify Forms requires this — a collision silently breaks submissions); `data-netlify="true"` and the honeypot field (`netlify-honeypot` + matching hidden `bot-field` input) present on every form
- [ ] Consent checkboxes link to the correct-language legal pages
- [ ] Form `action` points to an existing, correctly-language-matched thank-you page; no English legal-page link survives inside a Spanish form's consent copy (or vice versa)
- [ ] Netlify Forms email notifications firing correctly (per Launch Checklist)
- [ ] Form field labels and error states are in the correct language on each page
- [ ] Structural check is not a substitute for an actual end-to-end submission test post-launch — note in the report which forms have and haven't had a live submission verified

### 12. Post-launch / technical housekeeping (once DNS has cut over — check status even pre-launch)

- [ ] Netlify server-side Analytics enabled (not Google Analytics)
- [ ] Privacy Policy and Terms effective dates set and matched across EN/ES pairs
- [ ] Domain verified in Google Search Console, sitemap submitted
- [ ] Google Business Profile URL and NAP updated to match live site

### 13. Navigation

- [ ] Communities dropdown structure matches the current locked pattern: a city with 2+ live sub-pages renders as a **group header (non-link) + indented sub-links**; a city with only one live page stays a **flat link** — never a one-item dropdown. Re-check this any time a new city page ships (e.g. when a city's second page lands, it converts from flat-link to group — confirm that conversion actually happened and wasn't missed).
- [ ] Nav labels are short wayfinding labels ("Moving to Goshen"), not full page titles.
- [ ] `aria-current="page"` set correctly on the current page's nav item in both the flat-link and grouped-item cases.
- [ ] Mobile nav: dropdown groups flatten into an accordion/expanded list at narrow widths, no layer of nesting gets lost or hidden.
- [ ] Every live page is reachable from nav **or** is an intentional landing-only page (confirm which, don't assume) — cross-reference against the Pre-Audit Inventory Snapshot's orphan-page check.

### 14. Performance

- [ ] Every content photo served via `<picture>` with WebP source + JPEG fallback.
- [ ] No multi-MB images in the referenced set; every referenced photo pair is compressed to display-appropriate dimensions (long edge ~1200–1600px).
- [ ] Below-the-fold images use `loading="lazy"`; hero/LCP images stay eager.
- [ ] Fonts self-hosted, preloaded, `font-display: swap`.
- [ ] Served CSS is the minified build output (`assets/css/tokens.css`, `assets/css/site.css`), never hand-edited directly — check the `assets/css/src/` sources were what actually changed.
- [ ] Zero third-party network requests — enforced by the Netlify CSP; confirm no batch has quietly added an external script/font/embed that would violate `default-src 'self'`.

### 15. Mobile

- [ ] Viewport meta present on every page.
- [ ] No horizontal scroll/overflow at 360px width — check a representative sample across page types, not just the homepage.
- [ ] Mobile nav opens/closes correctly on every template, including the Communities group accordion behavior.
- [ ] Cards/bands (reviews, Recently Sold, blog listings) stack cleanly at narrow widths.

### 16. Technical Build & Repo Hygiene

- [ ] `npm run check` (partial-injection sync) passes clean.
- [ ] `node build-reviews.js --check` passes clean — see §5's note that this isn't automated and needs a manual run.
- [ ] **Propagation check, every time a shared partial changes** (`components/header.html`, `header-es.html`, `footer.html`, `footer-es.html`): run `npm run build`, then spot-check the new content on at least 3 different page types (a main page, a community/cluster page, a blog article) per language — a partial edit is only as good as its propagation, and `npm run build` silently no-ops on any page missing the `<!-- build:footer -->`-style markers.
- [ ] No leftover template placeholders anywhere in shipped pages: `[insert]`, `[TBD]`, `[se inserta al publicar]`, `Lorem ipsum`, `XXX`, or similar — grep sitewide, not just on pages touched in the current batch.
- [ ] `netlify.toml` redirects are valid TOML, ordered correctly (specific redirects before the catch-all), and don't conflict with each other.
- [ ] Every image referenced in HTML actually exists in the repo at that path (a broken `<img src>` is easy to miss visually — the browser just shows a blank box).
- [ ] No orphaned or unused CSS classes/partial files left behind by a superseded design pass (low priority, but worth a periodic sweep).

### 17. Cross-Batch Consistency Sweep

This is the category that exists specifically because individual batches each fix their own scope correctly but don't always know what other batches did. Run this last, before closing out any audit:

- [ ] Grep for every wording pattern that has previously needed a correction pass (e.g. ambulatory phrasing, "condado de Elkhart"/"Elkhart County" as a place-identity descriptor) across the **entire** `/es/` and `/blog/spanish/` trees, not just pages touched recently — a pattern fixed in five files can still be live in a sixth that predates or postdates the fix batch.
- [ ] Grep for every locked shared-partial change (footer disclaimer lines, nav structure) across a sample of pages from **each build batch**, not just the batch that introduced the change — confirm `npm run build` was actually re-run and committed after every partial edit (a missed rebuild is invisible in the diff of the partial file itself).
- [ ] Check that any standing rule introduced mid-project has been applied retroactively where it should be, or has an explicit, documented decision that older content is grandfathered rather than silently inconsistent.
- [ ] Re-read the "Flagged for Lisa" section of the most recent prior audit report in `docs/audits/` (if one exists) and confirm each item has since been resolved, is still open, or has changed status — don't let flagged items silently age out.

---

## PART C — PROJECT FILE AUDIT (run when requested, or alongside a Full Site Audit)

**This part has two halves, run together, not just one.** Project-panel hygiene and repo hygiene are checked by different mechanisms (Claude in chat has Project access; Claude Code has repo access), but a Full Site Audit is not complete until both halves report, and both single out the Master Plan specifically.

### C1 — Project panel (Claude, in chat)

- [ ] List every file currently in the Project
- [ ] Flag any file that appears to be superseded by a higher-numbered/newer version of the same document — recommend which to keep, which to archive/delete
- [ ] Flag any duplicate content across two differently-named files
- [ ] Flag any file whose name doesn't follow the locked naming convention (version first, description, "Lisa Collio" last)
- [ ] Confirm every governing document referenced in the Master Plan hierarchy is actually present in the Project (no broken hierarchy — a rule that points to a document that isn't there)
- [ ] Flag any approved-copy source file still sitting in the Project as DRAFT status when Claude Code has already confirmed it merged (status may need updating for the historical record)
- [ ] **Confirm the Project's copy of the Master Plan specifically is the current version** — not just present, but matching the highest version number that exists anywhere (chat, repo, or Project). The Master Plan sat one version behind in the Project for a full session before being caught; this check exists because that already happened once.
- [ ] Confirm the Project's copy of the Pre-Launch Punch List and this Audit Checklist are also current, same standard as the Master Plan
- [ ] Recommend a specific action for every flagged item (delete / archive / rename / keep-as-is) rather than just noting the issue

### C2 — Repo (ask Claude Code to check and report)

- [ ] List every governing/reference document currently in the repo (`docs/`, `docs/approved-copy/`, `docs/drafts/`)
- [ ] Flag any document in the repo that appears superseded by a newer version — same standard as C1, applied repo-side
- [ ] Flag any document that exists in the Project (per C1's list) but is missing from the repo entirely — this is how the image manifest, the Master Plan itself, and this checklist's own repo copy were all found to be Project-only for an extended period
- [ ] **Confirm the repo's copy of the Master Plan specifically is the current version**, and that CLAUDE.md's citations of it match — not as a general check, but because this is a recurring, specifically-named failure mode (see the bundled-bump rule below)
- [ ] Confirm the repo's copy of the Pre-Launch Punch List is current — this file lives in the repo as its primary home, so this is the authoritative copy, not a mirror of C1

### Master Plan bundled-bump rule (added 30 July 2026)

**Every Master Plan version bump is one unit of work, not a version bump followed by a separate CLAUDE.md follow-up.** In the same change: (1) commit the new version to the repo, (2) delete the superseded version from the repo, (3) update CLAUDE.md's citations and mirrored content to match. All three happen together, or the bump isn't finished — a "sync CLAUDE.md later" gap is exactly how CLAUDE.md went two full versions (v2.12 and v2.13) without being updated. This rule applies to the Master Plan specifically because it is the top of the governing-document hierarchy; a stale citation to it invalidates trust in every document beneath it. The same logic applies to any governing document's own version bumps, this checklist included — see this file's own v1.4 change note above for a worked example (retiring `docs/AUDIT_CHECKLIST.md` bundled the restructure, the `audit.js` comment fix, and CLAUDE.md's own cross-reference update into one PR rather than three).

### Mandatory closing confirmation

**No audit (Quick or Full) is complete until both of these are explicitly answered, not just checked in passing:**

1. **Project documents** — Any missing? Any duplicate? Any document that needs updating, especially the Master Plan?
2. **Repo documents** — Any missing? Any duplicate? Any document that needs updating, especially the Master Plan?

Answer both directly at the end of every audit, even a Quick Batch Check, even if the answer is "none found."

**Standing rule for every chat, not just formal audits (added 30 July 2026):** proactively suggest a version update whenever work done in a chat would make an existing governing document stale — especially the Master Plan, the Pre-Launch Punch List, and this Audit Checklist — without waiting to be asked. This extends to any other Project document work has made stale, and to suggesting a new document be created when a chat produces something durable enough to need one (a new standard, a lessons-learned file, a handoff for a future chat). Flag it at the natural point in conversation, not only when an audit is explicitly requested.

---

## REPORT FORMAT (what a completed audit run should produce)

Numbered sections matching (a subset of) Parts A–C above, each a table of `Check | Status | Notes`, using **PASS** (already correct, no change needed) / **FIXED** (found a defect and corrected it in the same pass) / **FLAGGED** (needs Lisa's or the managing broker's judgment call — no unilateral change made), a closing numbered list of fixes made, and a "Flagged for Lisa" section for anything needing a human call.

Save it as `docs/audits/AUDIT_REPORT_<YYYY-MM-DD>.md` (create the `docs/audits/` directory on first use; don't overwrite prior reports — the trail of reports is itself useful evidence of progress and a way to catch regressions between runs) and note in the opening line what scope was actually covered (e.g. "Scope: all live pages as of this date — 127 EN, 58 ES") so a partial-coverage run is never mistaken for a full one.

---

## AUTOMATED CHECKS — what `npm run audit` and `npm run hreflang` actually enforce

`audit.js` settles the mechanical checks in this document that a machine can verify. Run it before requesting review; it exits non-zero on ERRORS. Current as of 30 July 2026 (18 checks):

**Hard checks (fail the run):** sitemap parity in both directions (1) · every internal link, asset, and redirect target resolves (2) · visible FAQ copy matches FAQPage schema word for word (3) · all JSON-LD parses (4) · locked identity rules — superseded phone, "100+", "Northern Indiana," comma-less business name, slash-free REMAX, the Alford variant, ambulatory phrasing, method brands without ™ (5) · footer signature on every page (6) · no Spanish page injecting the English CTA band (7) · blog index counts match the article directories (8), and every article is actually linked from its hub (8b) · every `<img>` has alt text (9) · hreflang pairing, reciprocity, and exemption-list discipline (10) · llms.txt coverage (12) · retail/dining business names barred on evergreen pages, required disclaimer marker on dated articles that name one (13) · EN/ES image-count parity, baseline can only shrink (14) · rejected-asset enforcement (15) · FAQ image matches its own question (16) · Fair Housing terms in alt text (17) · locked identity rules in description fields — meta/og/twitter/schema (18).

**Warnings (report, do not fail):** title and meta-description length (11) — the only warning-level check; everything else above is a hard failure.

Deliberately NOT automated: the RESPA `$[0-9]` sweep, the Top/Best/#1 superlatives sweep, anything requiring approval, Fair Housing tone, photo-pairing rules, review verbatimness, market-data provenance, and `build-reviews.js`'s own rotation currency (`--check` exists but isn't wired into `npm run audit`). A green `npm run audit` run means the mechanical invariants hold — not that the copy is approved or that every manual item above has been checked.

Two normalisation notes, learned by getting them wrong first: compare FAQ text with HTML entities decoded (`&amp;` vs `&`) and with the space that tag-stripping leaves before punctuation removed, and treat one side being a prefix of the other as a match — schema answers carry no links, so they sometimes spell out a URL the visible copy renders as an anchor.

### hreflang pairing — `npm run hreflang`

The EN/ES pair map lives in `content/hreflang-pairs.json` and is applied by `hreflang.js`, which writes the three-tag block (en, es, x-default → EN) onto both halves of every pair. It is idempotent; `--check` reports without writing.

Pairs are data, not inference — derived from the tags already live on the site plus the approved source documents that carry the same article set in both languages.

`npm run audit` enforces three things as hard errors: every page in the map carries its tags, both halves agree (a one-sided annotation is ignored by Google), and every page is either in the map or in the audit's exemption list. Adding a page without a twin means adding it to that list — the exemption is a deliberate, reviewable entry, never a silent omission. When a Spanish adaptation is written, move the page from the exemption list into the pair map.
