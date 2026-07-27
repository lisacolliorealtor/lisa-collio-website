# Site Audit Checklist — lisacolliorealtor.com

**Purpose:** a standing, re-runnable audit of the whole site's compliance,
consistency, and technical health — so defects get caught at natural
checkpoints (end of a content cluster, before a batch merges, before DNS
cutover) instead of piling up into one enormous audit at the very end.

## How to use this

Say something like **"run the audit"**, **"audit the site"**, or **"check
progress against the audit checklist"** in any chat on this repo. That's the
trigger — no need to paste this file's contents.

When asked, Claude Code will:

1. Re-derive the current locked rules from `CLAUDE.md` (source of truth for
   identity/compliance — this checklist explains *what categories* to check,
   `CLAUDE.md` is the answer key for *what's correct*).
2. Work through every section below against the **live repo state**, not
   against memory of past audits.
3. Grep and read broadly rather than trust that "it was fixed once" — a rule
   fixed in Batch 2f can still be missing from a page written in Batch 2e if
   the two didn't overlap in time. Cross-batch drift is the main failure mode
   this checklist exists to catch (see §17).
4. Report results in the same PASS / **FIXED** / **FLAGGED** format as
   `docs/LAUNCH_REPORT.md` (PR 8, July 21 2026 — the precedent for this
   format): PASS = already correct, no change needed. **FIXED** = found a
   defect and corrected it in the same pass. **FLAGGED** = needs Lisa's or
   the managing broker's judgment call — no unilateral change made.
5. Save the full report as a new dated file at
   `docs/audits/AUDIT_REPORT_<YYYY-MM-DD>.md` (don't overwrite prior reports —
   the trail of reports is itself useful evidence of progress and a way to
   catch regressions between runs) and give a short summary in chat.
6. If real defects were found and fixed, offer to commit/push them — but
   follow the same merge-gate discipline as everything else (§18): content
   fixes on pages that are already merged to `main` can go straight to a PR;
   fixes that touch anything still gated on Lisa's approval stay on that
   batch's draft/PR, not a silent direct edit.

**Scope note:** this checklist is about correctness of what's already
built — brand rules, compliance, consistency, technical hygiene. It does not
replace `docs/LAUNCH_CHECKLIST.md` (DNS/Netlify/Search Console dashboard
actions) or `docs/LAUNCH_RUNBOOK.md` (Lisa's plain-language cutover steps).
Run this checklist *before* those, as many times as useful along the way.

**You don't have to wait for "everything" to be done.** A partial audit run
today (checking only the pages that exist right now) is more valuable than a
perfect audit deferred to the end — that's the whole point of making this a
living document instead of a one-shot report.

---

## 0 · Inventory snapshot (do this first, every run)

Before checking anything else, establish what currently exists, so the rest
of the audit knows its own scope:

- [ ] Count EN pages, ES pages, EN articles, ES articles (`find . -name
      "index.html" | grep -v node_modules | wc -l`, split by `/es/` prefix).
- [ ] Diff that count against the architecture list in `CLAUDE.md` (§
      ARCHITECTURE) — which pairs are live, which are still pending per the
      Build Order (§14)?
- [ ] Note anything built but **not yet linked** from nav/sitemap (orphaned
      pages are easy to lose track of across batches).
- [ ] Note anything linked (nav, FAQ, internal link) but **not yet built**
      (expected 404s from in-flight batches — e.g. Batch 2e Part 1's FAQ
      links before Part 2 merged). Distinguish "expected pre-merge 404" from
      "actual broken link" using PR/branch state, not just presence.
- [ ] List draft files currently sitting in `docs/drafts/` (unapproved, still
      gated) vs. `docs/approved-copy/` (cleared for merge) — this tells you
      which parts of the site are allowed to be checked against "final"
      copy and which are still provisional.

---

## 1 · Locked Identity & Brand Copy

Reference: `CLAUDE.md` → LOCKED IDENTITY.

- [ ] Brand name always **"Lisa Collio, Real Estate Agent"** — comma present,
      never a standalone "Lisa Collio Real Estate" (876 IAC 8-1-8). Never
      "Lisa Alford-Collio". REALTOR® never leads.
- [ ] Market scope exactly **Goshen and Elkhart, Indiana** — never "Elkhart
      County" or "surrounding areas" as a *service-area* claim (Elkhart
      County is allowed only inside verifiable stats/citations — see §11).
      Never "Northern Indiana" / "norte de Indiana" in EN or ES.
- [ ] Track record exactly **120+ families · $20M+ closed · Top 20% of
      Elkhart County agents**. "100+" anywhere is stale — treat any hit as a
      defect, not a style choice.
- [ ] Phone is **only** (574) 370-5410 — grep for `574-975-0141` (superseded
      number) and any other digit string that looks like a phone number
      outside the approved third-party numbers (HUD's 800-669-9777 on
      Fair Housing pages is the one documented exception).
- [ ] Email is **only** lisacolliorealtor@gmail.com.
- [ ] Office: 1918 Elkhart Rd, Goshen, IN 46526 · Mon–Fri 8am–7pm — check
      every occurrence matches exactly, including the schema `PostalAddress`.
- [ ] License **#RB21002460** in every footer signature. NRDS **387056478**
      appears only in schema, never in visible copy.
- [ ] Homepage H1 locked exactly: "Lisa Collio, Real Estate Agent in Goshen
      and Elkhart, Indiana" (EN); confirm the ES home H1 is the adapted
      equivalent per its approved copy, not a literal translation.
- [ ] Master tagline / core brand message / brand promise — spot check pages
      that quote them against the exact locked strings in `CLAUDE.md`.
- [ ] Buyer-page tagline ("Transforming dreams into homes" / "Transformando
      sueños en casas") and seller-page tagline ("Unlocking smart moves" /
      "Tu llave hacia decisiones inteligentes") appear on the correct page
      type only, not swapped or cross-used.
- [ ] Method brands (**The Next Chapter Method™ · Tu Próximo Capítulo™ ·
      Smart Move Framework™ · Unlocking Smart Moves™**) always ™, never ®.
      Third-party marks (REALTOR®, SRES®, RE/MAX®, NAR®) always ®, never ™.
- [ ] Superlatives sweep: grep `\bTop\b|\bBest\b|#1` — every hit must resolve
      to (a) the locked Top-20% stat, (b) an approved article title, or (c)
      generic non-self-promotional prose. No bare "Top agent" / "#1 agent"
      self-claim.

## 2 · Bilingual Rules & Language Purity

Reference: `CLAUDE.md` → BILINGUAL RULES.

- [ ] **One language per page** — no page mixes EN/ES body copy.
- [ ] Every EN page carries the compact "Hablo español" badge linking to its
      `/es/` equivalent; every ES page carries the reciprocal English-toggle
      badge. Confirm the badge target is the *correct specific* ES/EN page,
      not a generic fallback (a wrong badge target is easy to introduce when
      a page gets renamed and the badge isn't updated — this exact bug has
      happened in this project before, e.g. `/moving-to-goshen/`'s badge
      pointing at `/es/` generically instead of `/es/mudarse-a-goshen/`).
- [ ] Grep EN pages for Spanish text outside the badge/toggle and proper
      nouns (names, epithets correctly `lang="es"`-tagged). Grep ES pages
      for English text outside the toggle, proper nouns, and the **documented
      exception**: the locked EN footer statements that haven't been
      translated yet, if any remain mid-rollout.
- [ ] ES pages read as **cultural adaptations** (their own examples,
      framing, register), not machine-literal translations — spot check by
      reading a paragraph aloud. **Exception:** the four legal pages are
      **precise mirrors**, not adaptations (Volume 37's cultural-adaptation
      license explicitly does not apply to legal/consumer-protection text —
      confirm this distinction hasn't blurred if legal-page copy changes).
- [ ] Spanish URLs use natural Spanish words, not transliterated English
      slugs.
- [ ] **hreflang trios** (`en` / `es` / `x-default`→EN) declared **in both
      directions** on every paired page — check the EN page declares the ES
      pair AND the ES page declares the EN pair, not just one side. Check
      both the page-level `<link rel=alternate>` tags and the `sitemap.xml`
      `<xhtml:link>` annotations agree with each other.
- [ ] Every ES page's canonical URL is self-referential and correct (not
      pointing at the EN version).
- [ ] Breadcrumbs (visible text + schema) are in the page's own language.
- [ ] For any page pair with a **keyword-split rule** (e.g. mudarse vs.
      viviendo, moving vs. living), confirm neither page has drifted onto
      the other's target phrase.

## 3 · Legal & Regulatory Compliance

Reference: `CLAUDE.md` → COMPLIANCE & PRECEDENCE; RESPA/Fair Housing/876 IAC
8-1-8 gates take priority over everything else on this list.

- [ ] **876 IAC 8-1-8** — "RE/MAX Results" has equal-or-greater visual
      prominence than "Lisa Collio" in every header lockup (check the CSS
      rule is still intact, not just that the markup order is right).
- [ ] **RESPA**: no dollar figures anywhere outside the canonical
      `/market-stats/` (`/es/estadisticas-del-mercado/`) page and its
      quarterly-sourced MLS citations — grep `\$[0-9]` sitewide and justify
      every hit. No interest-rate figures or directional rate predictions.
      No qualification predictions — language defers to "a licensed lender."
      The **agent-not-lender statement** appears in every footer (both
      languages) and inline wherever financing is discussed in body copy.
      No lender/settlement-provider data sharing implied anywhere (Privacy
      Policy language, consent-checkbox copy).
- [ ] **Fair Housing**: no ambulatory phrasing ("walkable," "a poca
      distancia a pie," etc. — use density/drive-time framing instead). No
      familial-status, age-group, or religion-based "perfect for..."
      framing on any property/neighborhood description. Protected-class
      list on `/fair-housing/` and `/es/vivienda-justa/` matches **exactly**
      — same classes, same order if that matters, no additions or omissions
      between languages.
- [ ] **876 IAC 8-1-8(f)** — no property image presented as a specific
      advertised/sold listing without written seller consent on file; check
      new pages against `assets/images/homes-goshen/` and
      `homes-elkhart/`'s consent-gated address folders vs. the
      decorative-only `homes-general/` folder (§9 has the image-folder
      detail).
- [ ] Legal-page **effective dates** match their language-pair counterpart
      exactly (same date, not independently set) — re-check any time either
      language's legal page is touched.
- [ ] Legal-page **courtesy-clause / English-controls paragraph** present on
      all four ES legal pages, unaltered.
- [ ] MLS-sourced statistics always carry their source + date range inline,
      never presented as evergreen facts.
- [ ] **No invented statistics anywhere** — every number on the site should
      trace to `content/approved/goshen-elkhart-data-sheet.md`, the MLS
      data files, or an explicitly cited public source (Census, NOAA, etc.
      per the pattern already used in the cost-of-living articles).
- [ ] Avatar/Life-Chapters material used for voice/empathy only — confirm no
      page uses it as published targeting language, and immigration status
      is never referenced anywhere on the site.
- [ ] No lead-capture form references a legal page that doesn't exist yet.

## 4 · Footer & Header (shared partials)

- [ ] EN footer stack (`components/footer.html`) matches the locked
      six-item order in `CLAUDE.md` verbatim: signature → composite-story
      disclaimer → content-reliability disclaimer → agent-not-lender
      statement → EHO logo/statement → independence line → legal links
      (`/terms/ /privacy/ /accessibility/ /fair-housing/` [+ `/disclaimers/
      /sources/` if still in scope]).
- [ ] ES footer stack (`components/footer-es.html`) matches the same six
      items, translated precisely, same order, linking to the **four ES
      legal pages** (not the EN ones).
- [ ] **Propagation check, every time either footer partial changes**: run
      `npm run build`, then spot check the new content on **at least 3
      different page types** (a main page, a community/cluster page, a blog
      article) per language — a partial edit is only as good as its
      propagation, and `npm run build` silently no-ops on pages missing the
      `<!-- build:footer -->` markers.
- [ ] `npm run check` reports zero stale pages (partials in sync with
      source).
- [ ] Header brand lockup, nav structure, and "Hablo español"/English badge
      are single-sourced from `components/header.html` /
      `header-es.html` — no page has a hand-edited copy that's drifted from
      the partial.

## 5 · Navigation

- [ ] Communities dropdown structure matches the current locked pattern:
      city with 2+ live sub-pages renders as a **group header (non-link) +
      indented sub-links**; a city with only one live page stays a **flat
      link** — never a one-item dropdown. Re-check this any time a new city
      page ships (e.g. when `/moving-to-elkhart/` lands, Elkhart converts
      from flat-link to group — confirm that conversion actually happened
      and wasn't missed).
- [ ] Nav labels are short wayfinding labels ("Moving to Goshen"), not full
      page titles — matches the pattern established in Batch 2f/2e.
- [ ] `aria-current="page"` set correctly on the current page's nav item in
      both the flat-link and grouped-item cases.
- [ ] Mobile nav: dropdown groups flatten into an accordion/expanded list at
      narrow widths, no layer of nesting gets lost or hidden.
- [ ] Every live page is reachable from nav **or** is an intentional
      landing-only page (confirm which, don't assume) — cross-reference
      against §0's orphan-page check.

## 6 · URLs, Redirects & Sitemap

- [ ] Every renamed/moved page has a **301 redirect** in `netlify.toml`,
      placed **above** the `/* → 404` catch-all rule (redirect order matters
      — first match wins). Never a bare rename with no redirect, even
      pre-launch.
- [ ] Redirect targets actually resolve (no redirect-to-redirect chains, no
      redirect to a 404).
- [ ] Repo-wide grep for every retired URL pattern returns **zero** hits
      outside (a) the redirect rule itself and (b) stored historical source
      docs in `docs/approved-copy/` / `docs/drafts/` (which intentionally
      preserve the original text they were built from).
- [ ] `sitemap.xml` is well-formed XML, contains every live public page,
      excludes retired/redirected URLs and the 404 utility page, and its
      `<xhtml:link>` hreflang annotations agree with the on-page tags (§2).
- [ ] URL style: lowercase, hyphenated, no dates, consistent trailing slash.
- [ ] `robots.txt` references the current sitemap URL.

## 7 · Schema & SEO Metadata

- [ ] Every page's JSON-LD parses without error (`python3 -c
      "import json,re; ..."` or equivalent — don't eyeball it).
- [ ] Schema types match page type per `CLAUDE.md` § Schema per Master Plan
      §9 (WebPage/Article/FAQPage/Place/Event/HowTo/BreadcrumbList as
      applicable) — no page missing schema it should have.
- [ ] **FAQPage schema text matches the visible FAQ text exactly**,
      character for character, on every page that has both — this drifts
      easily when body copy gets a post-hoc wording tweak and the schema
      block doesn't.
- [ ] BreadcrumbList schema matches the visible breadcrumb, in the same
      language.
- [ ] `AggregateRating` is consistent sitewide (locked value/count) and only
      sourced from Google reviews.
- [ ] `areaServed` / schema geography = Goshen, IN and Elkhart, IN exactly —
      no broader region.
- [ ] Title tags: unique sitewide, roughly 50–60 characters, brand rules
      intact, language-matched; no duplicates across EN or across ES.
- [ ] Meta descriptions: roughly 145–160 characters, unique, language-
      matched.
- [ ] Canonical tags: self-referential, correct scheme/host, no trailing-
      slash mismatches.
- [ ] `og:image`/`twitter:image` present with correct dimensions matching
      the actual generated file (1200×630 for Template A/OG variants).

## 8 · FAQ Standard (Master Plan §8, Phase 1.b target)

- [ ] Every page carries the target **5-question FAQ section** (Phase 1
      ships approved sets AS-IS; Phase 1.b brings every page up to the
      5-question standard — check which phase the page in question is
      supposed to be at before flagging a 3-question page as a defect).
- [ ] Each on-page FAQ answer is a brief summary that **links out to a full
      authority article** — confirm the link target exists (not a
      pre-merge-expected 404 — cross-check against §0's inventory) and the
      anchor text/URL match the locked slug.
- [ ] No orphaned FAQ links: every article a FAQ links to is reachable, and
      every authority article intended to be linked from a hub FAQ actually
      is linked from somewhere.

## 9 · Images & Featured-Image System

Reference: `CLAUDE.md` → ASSETS; Design & Naming Addendum → Featured image
standard.

- [ ] Featured images use the correct template (A = house/property, B =
      landscape/square people, C = portrait people) per the visual-judgment
      rule (house vs. people), not by filename guess.
- [ ] **No text/color band ever covers a person's face** on any B/C
      template image — visually check new ones, don't assume the script got
      it right.
- [ ] Four-variant rotation (blue+right / red+left / blue+left / red+right)
      continues correctly from `content/featured-image-rotation-log.md` —
      no two consecutive articles (in publish order) share a variant, and
      the log's "next variant" line matches what the next image actually
      used.
- [ ] B/C templates produced **both** the 1200×900 page/BlogPosting-image
      file and the 1200×630 `-og` file; A templates need only the single
      1200×630. `.webp` sibling exists for every `.jpg`.
- [ ] Every image has descriptive, language-matched alt text; purely
      decorative images use empty alt + `aria-hidden`.
- [ ] `assets/images/homes-general/` carries **no address or city name**
      anywhere (filename, caption, alt text) and **never** "Sold" framing.
- [ ] `assets/images/homes-goshen/` and `homes-elkhart/` address-named
      subfolders are used only with **written seller consent on file** —
      when in doubt about a specific new use, flag rather than assume.
- [ ] `assets/images/client-reviews/` photos appear **only** alongside that
      same client's own verbatim review, per
      `content/review-photo-map.md` — never repurposed as generic imagery.
- [ ] `assets/images/client-general/` photos never sit directly adjacent to
      review/testimonial text (that pairing is reserved for
      `client-reviews/`).
- [ ] Lender photos (e.g. Sergio Gomez) remain on **HOLD** — confirm zero
      placements — pending managing-broker RESPA co-marketing clearance;
      their review *text* may still be used per the reviews rules.
- [ ] No multi-megabyte images shipped; every referenced photo pair is
      compressed to display-appropriate dimensions (long edge ~1200–1600px).
- [ ] `content/photo-usage-audit.md` accurately reflects current
      used/unused status (spot check a sample, don't assume it's been kept
      current after every batch).

## 10 · Reviews

- [ ] Reviews are **verbatim** — typos, emojis, and original phrasing
      preserved exactly; names display exactly as they appear on the
      source platform (documented exceptions like "Anidem" /
      "EliteGodGamer" stay as-is).
- [ ] EN pages quote English review originals only; ES pages quote Spanish
      originals **or** clearly labeled translations ("Traducido del
      inglés") of English reviews — never an unlabeled translation.
- [ ] No review repeats on the same page or adjacent pages in the rotation
      (`build-reviews.js`'s own dedup logic should guarantee this — confirm
      it's actually running clean via `node build-reviews.js --check`
      rather than trusting it by default).
- [ ] Client-photo pairing rule (§9) respected everywhere reviews appear.
- [ ] Attribution is first name + last initial unless full-name consent is
      documented — re-check this any time a new review is added to the
      pool, since exceptions (e.g. "Maria Baltazar") need Lisa's explicit
      resolution on file, not an ad hoc judgment call.
- [ ] **Reviews appear only on main pages, never on blog/authority
      articles** — this is a standing rule introduced mid-project
      (`build-reviews.js` was patched to stop auto-inserting into
      marker-less pages). Confirm no article picked up a review block by
      accident, and separately, confirm whether the **older** articles that
      still carry legacy review blocks from before the rule existed have
      been reconciled one way or the other (this was explicitly flagged as
      unresolved in Batch 2e Part 2 — check current status, don't assume
      it's been decided).
- [ ] Lender review *text* usage (if any) never appears with a lender
      photo (§9).

## 11 · Content Integrity & Fact-Sourcing

- [ ] Composite/illustrative client stories are covered by the site-wide
      footer disclaimer; no page adds its own redundant per-story
      disclaimer (locked decision, don't reintroduce one).
- [ ] No new composite story invented outside what's already
      approved — Claude Code drafts new page copy from approved source
      files, it doesn't originate new "client stories" unprompted.
- [ ] Fair Housing tone spot-check on every new page: no "ideal for
      families," no age/religion framing, no "perfect for..." construction
      applied to a property or neighborhood.
- [ ] Reading level lands around 6th grade **without** sounding stilted —
      spot check a paragraph per new page type; this is a target, not a
      hard gate, so don't force awkward simplification to hit a number.
- [ ] Any page-specific locked resolution (e.g. "Maria Baltazar" name-
      display exception, "no days/hours stated for the Farmers Market
      because Lisa said route to the market's own calendar") is still being
      honored — these tend to be one-off decisions easy to lose track of
      across batches; keep a running list as they accumulate.

## 12 · Accessibility

- [ ] Exactly one `<h1>` per page.
- [ ] Logical heading order (no skipped levels, e.g. h1 → h3).
- [ ] `--gray` token used only for borders/dividers, never as text color
      (fails WCAG contrast) — grep the CSS, don't rely on visual spot
      checks alone.
- [ ] Visible focus states on every interactive element.
- [ ] Keyboard-operable navigation, including dropdown/grouped nav items.
- [ ] `lang` attribute correct per page, plus inline `lang` on any
      cross-language snippet (badges, epithets).
- [ ] Skip-to-content link present and functional.
- [ ] Tap targets ≥44px on mobile nav and footer links.
- [ ] `width`/`height` set on every `<img>` to prevent layout shift.
- [ ] Accessibility-statement claims (`/accessibility/`,
      `/es/accesibilidad/`) are actually true, not aspirational — this is
      worth periodically re-verifying against the live rendered site, not
      just the stated target.

## 13 · Performance

- [ ] Every content photo served via `<picture>` with WebP source + JPEG
      fallback.
- [ ] No multi-MB images in the referenced set (§9 covers the detail).
- [ ] Below-the-fold images use `loading="lazy"`; hero/LCP images stay
      eager.
- [ ] Fonts self-hosted, preloaded, `font-display: swap`.
- [ ] Served CSS is the minified build output (`assets/css/tokens.css`,
      `assets/css/site.css`), never hand-edited directly — check the
      `assets/css/src/` sources were what actually changed.
- [ ] Zero third-party network requests — enforced by the Netlify CSP;
      confirm no batch has quietly added an external script/font/embed that
      would violate `default-src 'self'`.

## 14 · Mobile

- [ ] Viewport meta present on every page.
- [ ] No horizontal scroll/overflow at 360px width — check a representative
      sample across page types, not just the homepage.
- [ ] Mobile nav opens/closes correctly on every template, including the
      Communities group accordion behavior.
- [ ] Cards/bands (reviews, Recently Sold, blog listings) stack cleanly at
      narrow widths.

## 15 · Forms & Lead Capture

- [ ] Every form has a unique `name` attribute sitewide (Netlify Forms
      requires this — a collision silently breaks submissions).
- [ ] `data-netlify="true"` and the honeypot field (`netlify-honeypot` +
      matching hidden `bot-field` input) present on every form.
- [ ] Consent checkbox is `required`, links to the **same-language** Privacy
      Policy (and Terms, where applicable), and its label text is fully in
      that page's language.
- [ ] Form `action` points to an existing, correctly-language-matched
      thank-you page.
- [ ] No English legal-page link survives inside a Spanish form's consent
      copy (or vice versa).
- [ ] Structural check is not a substitute for an actual end-to-end
      submission test post-launch (see `docs/LAUNCH_CHECKLIST.md` A8) — note
      in the report which forms have and haven't had a live submission
      verified.

## 16 · Technical Build & Repo Hygiene

- [ ] `npm run check` (partial-injection sync) passes clean.
- [ ] `node build-reviews.js --check` passes clean.
- [ ] No leftover template placeholders anywhere in shipped pages:
      `[insert]`, `[TBD]`, `[se inserta al publicar]`, `Lorem ipsum`, `XXX`,
      or similar — grep for bracket-placeholder patterns sitewide, not just
      on pages touched in the current batch.
- [ ] `netlify.toml` redirects are valid TOML, ordered correctly (specific
      redirects before the catch-all), and don't conflict with each other.
- [ ] No orphaned or unused CSS classes/partial files left behind by a
      superseded design pass (low priority, but worth a periodic sweep).
- [ ] Every image referenced in HTML actually exists in the repo at that
      path (broken `<img src>` is easy to miss visually if the browser
      just shows a blank box).

## 17 · Cross-Batch Consistency Sweep

This is the category that exists specifically because individual batches
each fix their own scope correctly but don't always know what other batches
did. Before closing out any audit run:

- [ ] Grep for every **wording pattern that has previously needed a
      "Correction A/B"-style pass** (e.g. the RV-production-claim wording,
      "condado de Elkhart"/"Elkhart County" as a place-identity descriptor)
      across the **entire** `/es/` and `/blog/spanish/` trees, not just
      pages touched recently — a pattern fixed in five files can still be
      live in a sixth that predates or postdates the fix batch.
- [ ] Grep for every **locked shared-partial change** (footer disclaimer
      lines, nav structure) across a sample of pages from **each build
      batch**, not just the batch that introduced the change — confirm
      `npm run build` was actually re-run and committed after every partial
      edit (a missed rebuild is invisible in the diff of the partial file
      itself).
- [ ] Check that any **standing rule introduced mid-project** (e.g. "reviews
      live on main pages only," "Claude Code stores its own source docs in
      `docs/drafts/`or `docs/approved-copy/`") has been applied
      retroactively where it should be, or has an explicit, documented
      decision that older content is grandfathered rather than silently
      inconsistent.
- [ ] Re-read the "Flagged for Lisa" section of the most recent prior audit
      report in `docs/audits/` (if one exists) and confirm each item has
      since been resolved, is still open, or has changed status — don't let
      flagged items silently age out.

## 18 · Workflow / Draft-Approval Discipline

- [ ] Every source file Claude Code has worked from is stored in the repo
      (`docs/drafts/` pre-approval, `docs/approved-copy/` post-approval) —
      per the standing rule, Lisa never uploads source files to GitHub
      manually, so if a batch's source isn't in the repo, that's a process
      gap to flag.
- [ ] No page whose source is still in `docs/drafts/` (unapproved) has been
      merged to `main` — cross-check `docs/drafts/` contents against what's
      actually live.
- [ ] No PR stacks new commits on top of another PR's already-merged
      history on the same branch (check `git log` against `origin/main`
      before assuming a branch is clean to build on further).
- [ ] PRs touching legal/compliance-sensitive text list every diff in the
      PR description (per the standing "Section 13 applies to these edits
      too" pattern) so Lisa can review the diff quickly rather than
      re-reading the whole file.

---

## Report format (what a completed audit run should produce)

Follow `docs/LAUNCH_REPORT.md`'s structure: numbered sections matching (a
subset of) §1–18 above, each a table of `Check | Status | Notes`, a closing
numbered list of fixes made, and a "Flagged for Lisa" section for anything
needing a human call. Save it as
`docs/audits/AUDIT_REPORT_<YYYY-MM-DD>.md` and note in the opening line what
scope was actually covered (e.g. "Scope: all live pages as of this date —
127 EN, 58 ES" ) so a partial-coverage run is never mistaken for a full one.

---

## Automated portion — `npm run audit`

`audit.js` now settles the mechanical checks in this document. Run it before
requesting review; it exits non-zero on ERRORS.

**Hard checks (fail the run):** sitemap parity in both directions · every
internal link, asset, and redirect target resolves · visible FAQ copy matches
FAQPage schema word for word · all JSON-LD parses · locked identity rules
(superseded phone, "100+", "Northern Indiana", comma-less business name,
slash-free REMAX, the Alford variant, method brands without ™) · footer
signature on every page · no Spanish page injecting the English CTA band ·
blog index counts match the article directories · every `<img>` has alt text.

**Warnings (report, do not fail):** hreflang pairing, title and meta-description
lengths, llms.txt coverage. These need a judgement call rather than a fix.

Deliberately NOT automated: anything requiring approval, Fair Housing tone,
photo-pairing rules, review verbatimness, or market-data provenance. A green run
means the mechanical invariants hold — not that the copy is approved.

Two normalisation notes, learned by getting them wrong first: compare FAQ text
with HTML entities decoded (`&amp;` vs `&`) and with the space that tag-stripping
leaves before punctuation removed, and treat one side being a prefix of the other
as a match — schema answers carry no links, so they sometimes spell out a URL the
visible copy renders as an anchor.

### hreflang pairing — `npm run hreflang`

The EN/ES pair map lives in `content/hreflang-pairs.json` and is applied by
`hreflang.js`, which writes the three-tag block (en, es, x-default → EN) onto
both halves of every pair. It is idempotent; `--check` reports without writing.

Pairs are data, not inference — derived from the tags already live on the site
plus the approved source documents that carry the same article set in both
languages (`communities-*.md`, `sell-set*.md`, `meet-lisa-set*.md`).

`npm run audit` enforces three things as hard errors: every page in the map
carries its tags, both halves agree (a one-sided annotation is ignored by
Google), and every page is either in the map or in the audit's exemption list.
**Adding a page without a twin means adding it to that list** — the exemption is
a deliberate, reviewable entry, never a silent omission. When a Spanish
adaptation is written, move the page from the exemption list into the pair map.
