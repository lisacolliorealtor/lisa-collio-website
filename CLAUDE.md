# CLAUDE.md — lisa-collio-website
**v2.4 (August 11, 2026)** — see the Revision Log at the end of this file.
Mirrors the highest-numbered Lisa_Collio_Website_Master_Plan version in Project
files. This file defers to the Master Plan; if they ever disagree, the Master Plan
wins. Deliberately no version number here — hardcoding one let this line go stale
while the plan moved on. **Bundled-bump rule (Audit Checklist):** every Master
Plan version bump is one unit of work — commit the new version to the repo, delete
the superseded version, and update CLAUDE.md's citations and mirrored content to
match, all in the same change. CLAUDE.md going two full versions (v2.12, v2.13)
without being updated is exactly the gap this closes; a "sync CLAUDE.md later" step
is not an acceptable outcome of a version bump.

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
- **Phone phrasing differs by field class, deliberately (Lisa, 5 August 2026) —
  do NOT unify these.** The CTA forms above are for *on-page* copy. In
  **description fields** (meta, og, twitter, schema) the settled forms are
  EN `Call or text (574) 370-5410.` and ES `Llame o escriba al (574)
  370-5410.` The Spanish CTA form plus the number costs about 50 characters of
  a 160-character ceiling — nearly a third of the description — so the
  description form is deliberately shorter, per the description-length priority
  rule (content wins; drop or shorten the required element, never the
  substance). Both say the same thing to a Spanish reader; only one fits.
  Written down because two field classes carrying the same fact in different
  words is precisely what the Field-Class Compliance Coverage Standard normally
  tells you to go and unify — this is the documented exception. **A field-class
  difference with a stated reason is a decision; the same difference without
  one is drift.**
- FAQ standard (Lisa, July 2026): target = every page carries a 5-question FAQ
  section; each question answered briefly on-page and hyperlinked to a full
  authority article on the blog. Phase 1 ships the existing approved FAQ/article
  sets AS-IS (do not rewrite approved content). Phase 1.b (before Phase 2)
  brings every page to the 5-question standard and adds the missing sets
  (Next Chapter Method, Communities, Market Stats) plus the ES market-stats page.
- Reading level ~6th grade as a clarity target, never at the cost of natural
  sentence rhythm.
- **Review Language Standard (Master Plan §17, written into the plan in v2.18;
  locked).** Reviews appear in the reader's language — English reviews on
  English pages, Spanish reviews on Spanish pages, same as every other page.
  Where a review's original is in the other language, the translation is used
  and carries an explicit label naming the source language: a Spanish original
  on an English page is labeled translated from Spanish; an English original on
  a Spanish page is labeled translated from English — the rule runs both
  directions, not Spanish-only. The label sits with the quote, not as a
  footnote. Originals are always quoted verbatim in their own language;
  translations are always labeled; neither is ever presented as the other.
  **Why translation is allowed here and nowhere else:** Volume 37 bars
  translation for everything Lisa writes — Spanish content is cultural
  adaptation, never translation. A review is not Lisa's writing; it is a
  client's factual statement, and the verbatim rule makes altering it
  impermissible, so translating it with a label is the correct (and only)
  option — rewriting it culturally would mean rewriting a client's words. The
  two rules govern different classes of content and do not conflict. This was
  a real, consistently-applied rule long before v2.18 — it existed only as
  scattered per-review notes, so sessions kept re-asking Lisa, and one session
  inferred a stricter rule (Spanish pages may quote Spanish originals *only*)
  that would have wrongly barred an English-original review from a Spanish
  page. Names displayed exactly as they appear on Google (per Lisa: "Anidem"
  and "EliteGodGamer" stay as-is).
- Client stories other than documented reviews = approved illustrative
  composites, covered by the site-wide footer disclaimer — never invent new ones.
- Schema per Master Plan §9; AggregateRating 5.0/39 (Google only).

## LOCKED STANDARDS (Master Plan §8, locked July 2026)
Durable rules distilled from this project's actual incidents — codified in the
Master Plan (v2.12 introduced the first three; v2.14 added the rest, plus
amendments to two of them; v2.15 clarified the Single Open-Items Record
Standard's scope) so a lesson only has to be learned once. CLAUDE.md had not
mirrored v2.12's three before this entry; all are folded in together.

### Technical — description-length priority
When a required element (e.g. the phone number) would push a meta description
over its length ceiling, content wins: drop the element rather than cut
substance. Anything placed at the very end of a description is also what
search engines truncate first, so place required elements last, deliberately,
not as the description's payload.

### Build Record Standard
Every generated artifact — every processed image, every regenerated featured
image, every derived file — has a recorded build job stating its source,
parameters, and how to reproduce it exactly (`SECTION_JOBS`, `OVERLAY_JOBS`,
or any successor table). No asset ships without its build record.

### Verification Standard
- State which field/class/scope a check actually covers.
- Verify a check against known cases in both directions (true positive and
  true negative).
- Prove a new check catches real problems with a deliberately-broken test case.
- Confirm the gap against the actual check artifact before reporting a
  finding — not from memory of what the check should do.
- **Prototype, then scale (added v2.13):** run a new technique on a small
  sample first, report the real hit rate, then decide whether to run it
  across the full set. Honest partial coverage beats a promised 100% that
  quietly under-delivers.
- **Repo-scoped review (added v2.17).** A review conducted from the repository
  can establish that something is *not in the repository*. It cannot establish
  that the thing did not happen — decisions, corrections and incidents occur in
  chat and may never be written to a file. Report the null result as **"not
  found in the repo," never as "unfounded,"** and say which artifacts were
  searched. Two failure modes, both observed when reviewing Master Plan v2.16:
  - **Testing the wrong artifact.** One incident reported as having no record
    was in the repo the whole time, in a file the search had not thought to
    check. The null result was real; the conclusion drawn from it was not.
  - **Stating a limit once and not applying it.** The same report correctly
    noted "only committed artifacts can be checked from here" under one
    finding, and let two others go out flatly as unfounded. Naming a limitation
    does not discharge it for the rest of the same class in the same report.

  The cost is asymmetric and worth stating plainly: a confident retraction of a
  true incident deletes the evidence a standard rests on. Here it would have
  stripped the Review-Surface Standard of its own origin.

### EN/ES Parity Standard
Both languages ship in the same PR, verified by a measured count, not an
assumption. **Count parity is necessary but not sufficient (added v2.13):** a
Spanish page can match its English twin's item count while carrying thinner
content per item — found in this project as alt text with equal image counts
but noticeably less descriptive Spanish strings. When verifying parity,
compare substance between paired items, not only counts.

### Field-Class Compliance Coverage Standard
A compliance rule is not enforced project-wide until it has been checked
against every field class that can render user-facing text. The Fair Housing
term sweep found violations in alt text (missed for months), then body copy,
then meta descriptions — three separate passes because each field class was
checked only after the last one turned up a hit.
**Fourth instance, August 2026 — `og:image:alt`.** Eighteen article pages had
their visible `<img>` alt corrected while the Open Graph equivalent kept
describing a photograph replaced days earlier, so the wrong description was
live on Facebook and LinkedIn as well as on the page — and it survived a merge
because the fix had been declared done after one field class. The fourth
instance is the argument for the enumeration, not a footnote to it: each time,
the rule was correctly applied where the problem was visible, and the parallel
fields carrying the same content were not checked. **A fix applied to one field
class is incomplete until the parallel fields are verified, not assumed.**
Enumerate every applicable field class before declaring a rule "done": H1, body
copy, alt text, meta description, `og:title`/`og:description`/`og:image:alt`,
`twitter:` equivalents, schema fields, captions, button/CTA text, and form
labels. A rule proven on one class is a prototype, not a standard.

### Single Open-Items Record Standard
Exactly one open-items/punch-list record exists for this project, lives in
the repo (`docs/`, always the highest-numbered `… Pre Launch Punch List Lisa
Collio.md` — version-agnostic, because the pinned filename here had already
gone six versions stale), and every session updates it in place — no parallel
or competing tracking document, even temporarily. Diff any edit to it against
its last-known-good version before committing: a bad string-replace can
silently delete a section without raising an error, which already happened
once to this file.
**Mechanical corollary (added 5 August 2026, from a real incident):** the
punch list is edited only on a branch that is going to merge, and any branch
whose PR has already merged is checked for unmerged commits touching the
punch list before it is retired. Nobody creates a parallel record
deliberately — `claude/compliance-gaps-copy-fields-scwmod` got one because a
commit landed on it *after* its PR merged, and `main` then moved on for five
days. Two files, same name, **same version number**, each holding items the
other never had. A version in the filename does not protect against this — a
same-named, same-versioned file at two commits is not caught by "don't create
a parallel record," it has to be checked for. What that branch held: the only
description anywhere in a punch list of three live `audit.js` compliance
checks, and the only record that the sold-listing consent file was an
inventory rather than a certification. Retiring it unexamined would have
silently deleted a compliance caveat covering live advertising copy.
**Scope, clarified (v2.15):** covers repo-trackable, Claude-Code-actionable
items only — anything with a PR, a file, or a build check behind it. It does
not extend to the Claude Project's knowledge-base panel, which Claude Code
has no tool access to check or edit. Project-panel hygiene (catching
duplicate or superseded files in the Project, confirming the Project's copy
of a governing document matches the highest version anywhere) is covered
separately by the Audit Checklist's Part C1, run by Claude in chat.

### Companion Document Registry — scope (Master Plan §19, ruled v2.16)
The registry covers **every governing and reference document for this project,
wherever it lives.** Each row carries a Location — Project, Repo, or Both — so
location drift is visible instead of hidden. A row marked **Both** whose two
copies disagree is a defect, findable by the Audit Checklist's Part C.
The ruling exists because the registry said "in the Project" while carrying a
repo-only row (`docs/VERIFIED_FACTS.md`) and having removed another *for being*
repo-only (`CLAUDE.md`) — two identical situations, opposite treatments, and as
a result three of this project's four governing documents had no row anywhere.
All four now do: the Master Plan, the Punch List, the Audit Checklist, and this
file. **Three classes are deliberately unregistered, by ruling rather than
omission** — one-time Claude Code instruction files, session records and dated
audit reports, and build inputs/machine-read control files (except
`content/source/rejected-assets.txt`, which a locked standard names directly).
An unregistered file with no stated reason reads as an oversight to the next
session; that is how seventy files accumulated outside the registry.

### Rejected-Asset Standard
When an asset is ruled out, that ruling is recorded as durably as a Build
Record and mechanically enforced so it cannot be silently reversed. This
project records rejected images in `content/source/rejected-assets.txt`,
marks them inline in the relevant manifest, and fails the build (`audit.js`
check 15) if any page references one — the same pattern applies to any future
class of rejected asset.

### Title/Identity-Text Consistency Sweep Standard
Any change to a page's canonical title or H1 is verified by a full-text
search for the old string returning zero hits sitewide — not by enumerating
the fields believed to reference it. The old string has needed updating in
five to nine separate representations each time (title tag, H1, schema,
cards, sitemap, `llms.txt`, featured-image text, etc.). The search returning
zero hits is the actual completion criterion; a remembered checklist is not.

### PR Description Currency Standard
A pull request's title and description are re-verified against its actual
current diff immediately before merge — never trusted from when they were
first written. Approval attaches to what is actually in the diff at merge
time, not to an earlier summary of intent, since mid-PR corrections can leave
a description describing a decision that was later reversed.

### Report-Before-Build Standard (August 2026)
Every task begins with a report-only reconnaissance step, before anything is
processed, built, renamed, wired, or committed. In it: state the plan file by
file and how each decision was derived · confirm every needed input is present
and **name what is missing rather than inferring or improvising it** · verify
inputs against live repo state rather than the instructions file (filenames,
counts, EXIF, whether a target path exists, whether `main` has moved) ·
surface conflicts, overwrites, and scope expansion proactively · then stop and
wait for Lisa's sign-off.
**The standard extends to Lisa's own framing.** Where an instruction conflicts
with what can be observed in the repo, the observation governs and the conflict
is reported rather than resolved silently. On the Elkhart batch three chat
instructions were wrong — a PR reported merged that had not merged (checking
before force-pushing saved the PR), an alt-text "correction" that would have
crossed two correct strings, and a proposed audit heuristic measured at an 80%
false-positive rate. Each was caught by checking rather than complying.

### Source-Repoint Standard (August 2026)
When a source asset is repointed or replaced **under an existing filename**,
the pages displaying it change without their HTML changing. That is invisible
to a diff and to any check comparing markup. Any repoint — `CLEAN_JOBS`,
`SECTION_JOBS`, `OVERLAY_JOBS`, or a re-upload over an existing filename — is
followed by verifying that every existing alt attribute, `og:image:alt`,
caption and description still describes the new image. A repoint here left 18
article pages showing an Elkhart photograph while telling screen-reader users
about a backyard deck, and the PR that caused it correctly reported "nothing
wired to any page." **A change with no diff is still a change.**

### Batch Reconciliation Standard (August 2026; `audit.js` check 22)
At the close of any batch the arithmetic is verified by **differencing sets**,
never by trusting a running total: source files − rejections = job-table
entries = artifacts built. Each equality is a set difference per folder, and
any file on one side and not the other is named. This project shipped a batch
reporting "25 processed, 1 rejected" against 27 source files; the missing file
surfaced only when the source folder was differenced against the job table
instead of the count being re-read. **A running total is a claim; a set
difference is a measurement.**

### Review-Surface Standard (August 2026)
A review surface must be capable of showing what is being reviewed. A contact
sheet at roughly a third of delivered size under-represents fine detail by
about 3×, so a reviewer makes confident calls in both directions on evidence
the surface cannot carry. Contact sheets for any image batch ship **1:1 zoom
crops of every legible text region** — signage, plaques, wordmarks, lettering
— beside the delivered-size tiles, each labelled with the pixel dimensions it
occupies in the delivered file. **"I could not see it on the review surface"
is not evidence about the artifact. It is evidence about the surface.**

### Alt-Text Correspondence Standard (August 2026; `audit.js` check 23)
Alt text is verified against the image it belongs to, not only against the
compliance rules. A string can pass every Fair Housing, business-name and
identity check while describing a different photograph — an approved string
reading "a river bend seen from a park bank" belonged to a fairground midway,
and all three scans passed on it, because each tests **wording** and none tests
**correspondence**. Two mechanisms: the slug-to-string map ships **with** the
drafts, not after them, so the reviewer sees each string beside its own image;
and two artifacts derived from the same source photograph must carry the same
alt text within a language (check 23, which flags ~2% of image groups).
A heuristic considered and rejected: flagging any alt string sharing no content
word with its slug — measured at an 80% false-positive rate, because slugs name
a slot's *topic* while alt text describes the *depicted subject*. **A noisy
check gets switched off, which is worse than no check.** Prototype and measure
before building — the Verification Standard applied to checks themselves.

### Changelog Citation Standard (August 2026)
A version number inside a changelog, revision log, dated as-built note, or
historical record is **data, not a pointer** — it records what was true on a
date and is never genericized or updated. A version number in a live
cross-reference ("governed by," "drafted per," "see") **is** a pointer, and is
written version-agnostically so it cannot go stale. The distinction is not
mechanical and a find-and-replace will not respect it: a sweep here correctly
genericized 15 live citations and wrongly rewrote changelog entries recording
which version introduced which rule, destroying the record it was meant to
protect. Ask whether the number tells the reader *what to consult* (pointer,
genericize) or *what happened* (data, preserve).

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
   **Corollary — a stacked PR must target `main` unless you delete its base.**
   GitHub only re-targets a PR when its base branch is *deleted* after merging.
   PR #67 was based on the Wave 1 branch; #66 merged but was not deleted, so #67
   stayed pointed at it and merged seven finished Spanish articles onto a dead
   branch instead of onto `main`. Nothing failed and nothing warned. **After
   merging any PR, delete its branch**, and after merging a stacked PR, verify
   the work landed with `git ls-tree origin/main <a path the PR created>` rather
   than trusting the merge notification.
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

### Draft-approval verification (folded from the Audit Checklist, July 2026)
Two checks beyond what's already covered above by failure 3 (commit-before-use)
and the stacked-PR corollary:
- Confirm no page whose source is still in `docs/drafts/` (unapproved) has been
  merged to `main` — cross-check `docs/drafts/` contents against what's
  actually live.
- PRs touching legal/compliance-sensitive text list every diff in the PR
  description, so Lisa can review efficiently rather than re-reading the
  whole file.

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
Foundations shipped in PR 1. The design system's editable sources live in
`assets/css/src/`; `npm run css` (or `npm run build`) minifies them into the
served files, `assets/css/tokens.css` (tokens + self-hosted @font-face) and
`assets/css/site.css` (components) — edit `src/`, never the generated output.
Shared chrome lives in `components/header.html` and `components/footer.html`, injected by
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

### Featured image standard (locked; supersedes the PR 24 site-wide default)

**Text overlay AND Lisa's cutout portrait on blog/article featured images are a
SCOPED EXCEPTION, not the default.** This reverses the earlier rule that put the
H1 on every featured image — in practice the words were getting cut off.

**The exception — keep the overlay ONLY here:** `/buyers/`, `/sellers/`,
`/es/compradores/`, `/es/vendedores/`, and the authority articles linked from
those four hub pages. The canonical scope list lives in
`scripts/generate-featured-images.py` (`OVERLAY_SCOPE`); the hub pages' own
`/blog/` links are the source of truth for it. For that scope only, everything
below still applies unchanged: Templates A/B/C, the four-variant rotation, "text
matches the article H1 exactly," and "never over a person's face."

**Everywhere else — a clean photo, nothing overlaid at all: no text, no cutout.**
Homepage, Meet Lisa, Next Chapter Method / Tu Próximo Capítulo, Communities
(Moving to / Living in Goshen and Elkhart, EN + ES), Market Stats, Contact, and
every future blog post outside the Buy/Sell/Compradores/Vendedores clusters.
The title renders as normal HTML text on the page — never baked into the image.
This includes the ~56 new Goshen/Elkhart section and FAQ images: those slots
receive clean photos. The rotation log is not tracked outside the exception
scope — with no color band there is no variant to rotate.

**Do not confuse this with the Tier 1 page hero.** The signature hero on Home,
Buyers, Sellers, Meet Lisa, Next Chapter Method, and Contact also uses Lisa's
cutout, but it layers real HTML text over the photo and is governed by the hero
standard, not this one. A Buyers/Sellers-cluster page can legitimately carry the
cutout twice — once in its hero, once in its featured image. Two rules, two
scopes.

**Retroactive cleanup is complete — this line previously said otherwise and was
wrong (corrected 5 August 2026).** `docs/FEATURED_IMAGE_OVERLAY_AUDIT.md` is a
**closed record**, not a live worklist: it reports zero out-of-scope slugs
outstanding, and `npm run check:images` confirms it independently — 37 in-scope
slugs carry a band, 58 out-of-scope carry none, "every variant matches its
scope." Flagged in Master Plan v2.16 as a disagreement between two documents;
resolved here in favour of the audit, which the build check corroborates.
The standing rule still holds for anything **new**: do not regenerate a clean
image from a text-bearing one without Lisa's sign-off on the photo itself.

#### Templates A/B/C — Buyers/Sellers scope only
Composited by `scripts/generate-featured-images.py`.
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

#### Clean photos — everywhere else
`generate_clean()` in the same script: cover-crop to 1200×630 (plus the 800×420
thumbnail), `.webp` beside every `.jpg`, no band, no cutout, no title. The
overlay functions refuse an out-of-scope slug outright, so the default is clean
by construction rather than by remembering.

## REVISION LOG

**v2.4 — August 11, 2026** (Claude, at Lisa's direction)
Pre-Launch Punch List renamed `V2.9 → V2.10 Pre Launch Punch List Lisa Collio.md`, unblocked by Master Plan v2.20 making §19's citation of it version-agnostic. Rename plus a version-history entry in that file, not a content pass — Revision Log entry only, since this file's own citations of the punch list (line 222, and the generic mentions elsewhere) were already version-agnostic and needed no edit. Confirmed by re-checking, not assumed from the last time this was verified.
- Swept the repo for live pointers to the old filename before renaming: zero found. The two that existed (`audit.js`'s header comment, `scripts/generate-featured-images.py:280`) were already fixed in the v2.20 PR; everything else naming the old filename is dated changelog/audit-report data, correctly left untouched.

**v2.3 — August 11, 2026** (Claude, at Lisa's direction)
**Mirrors Master Plan v2.20**, a single-item bundled bump: v2.20 committed to `docs/approved-copy/V2_20_Website_Master_Plan_Lisa_Collio.md`, v2.19 deleted (not left alongside it), and this file updated in the same change. v2.20 completes the sweep v2.19 started: §19's governing-documents table names no version in any row's Exact filename cell now, not just the Master Plan's own row — the Pre-Launch Punch List and Audit Checklist rows carried the identical defect, the sixth instance of the Field-Class Compliance Coverage Standard and the second in consecutive versions.
- No live citation in this file needed the same fix — checked every reference to the Punch List and Audit Checklist; all were already version-agnostic or correctly dated history, **except line 6's Audit Checklist v1.3 citation, genericized in this same pass.** That line sat right after this file's own sentence explaining why hardcoding a version here goes stale — leaving it hardcoded one clause later was the same defect this bump exists to fix, one document over.
- One-time Claude Code instruction files whose batch has merged were deleted per the Master Plan's §19 ruling — all six found in the repo, not just the one first flagged. Full list and per-file verification in the punch list's §B entry for this bump.

**v2.2 — August 11, 2026** (Claude, at Lisa's direction)
**Mirrors Master Plan v2.19**, a single-item bundled bump: v2.19 committed to `docs/approved-copy/V2_19_Website_Master_Plan_Lisa_Collio.md`, v2.18 deleted (not left alongside it), and this file updated in the same change. v2.19 fixes a defect Claude found in chat while reading v2.18 ahead of its bundled bump, and Claude Code confirmed against the merged file: §19 row 1's Exact filename cell still named `V2_16_...`, four versions stale, directly beneath a self-reference note claiming the row named no version. v2.18's own §20 entry is annotated in place to reflect this (a changelog is data, not rewritten) rather than corrected retroactively.
- No content, architecture, or compliance-rule change in this file beyond the version bump itself — CLAUDE.md never mirrored the §19 registry table, so nothing here carried the stale citation. Recorded per the Field-Class Compliance Coverage Standard's fifth-instance note: confirmed no sibling field in this file needed the same fix.

**v2.1 — August 6, 2026** (Claude, at Lisa's direction)
**Mirrors Master Plan v2.18**, applied as one bundled bump: v2.18 committed to
`docs/approved-copy/V2_18_Website_Master_Plan_Lisa_Collio.md`, v2.17 deleted
(not left alongside it), and this file updated in the same change. Checked
v2.18's own changelog against its count claim before treating it as ground
truth: it claims two items changed, and the document body carries exactly
two — no undercount this time.
- **Review Language Standard folded in (PAGE STANDARDS, replacing the old
  one-line Reviews bullet).** Written into Master Plan §17 for the first time
  in v2.18 after existing only as scattered per-review notes; see the expanded
  bullet above for the full rule and its reasoning.
- **v2.17's changelog undercount (recorded, not repeated here as new
  content).** v2.18 corrects its own predecessor's changelog, which described
  the reviews-version-pointer fix as covering "§9 and §17" when it covered
  three places, including §8's Images block. This file never mirrored that
  undercounted line as a standing claim, so nothing here needed correcting —
  recorded per the Changelog Citation Standard (the correction is data,
  belonging to the Master Plan's own historical record, not to CLAUDE.md).
- No identity, architecture, or compliance-rule changes beyond the Review
  Language Standard itself, which formalizes existing practice rather than
  changing it.

**v2.0 — August 5, 2026** (Claude, at Lisa's direction)
**Mirrors Master Plan v2.17**, applied as one bundled bump: v2.17 committed to
`docs/approved-copy/V2_17_Website_Master_Plan_Lisa_Collio.md`, v2.16 deleted
(not left alongside it), and this file updated in the same change. v2.17 is a
correction pass — no new standards, no identity, architecture or compliance-rule
changes — so this file's substantive content is unchanged apart from the item
below.
- **Repo-scoped review clause reconciled to its source, and the Master Plan
  wording now governs.** v1.9 wrote this clause into CLAUDE.md during the v2.16
  review, before any Master Plan carried it — leaving the mirror ahead of the
  document it mirrors, which is precisely backwards for a file whose header says
  it defers to the plan. v2.17 adds the clause at the source; this file's local
  wording is replaced by it verbatim. The substance is the same in both: a
  repository review can establish that something is **not in the repo**, never
  that it **did not happen**; report the null result as *"not found in the repo,"*
  never as *"unfounded,"* and say which artifacts were searched. The Master Plan's
  version states the two failure modes more cleanly — testing the wrong artifact,
  and stating a limit once without applying it to the rest of its class — so
  nothing is lost in the swap.
  **The rule this incident produces, worth stating once:** a lesson learned during
  a review of a governing document belongs in that document first. Writing it only
  into the mirror creates a rule with no source, which the next sync can silently
  overwrite.
- **Parallel-statement sweep run against this file, per the Field-Class
  Compliance Coverage Standard** — v2.17's corrections are to claims that could
  equally have been sitting here. Searched for all of them: "Reference Data Sheet
  v1.1", "banned-term list", the reviews document as "v2",
  `Lisa_Collio_Website_Build_Plan_v1_0`, "six approved Goshen source documents",
  and `Goshen-Cluster-Decisions-and-Photo-List`. **Zero hits for all six** — this
  file carried none of them. Recorded because a sweep that finds nothing is still
  a measurement, and the alternative is a future session re-running it.
- Master Plan cited generically throughout; no version number added anywhere
  outside this log.

**v1.9 — August 5, 2026** (Claude, at Lisa's direction)
**Mirrors Master Plan v2.16**, applied as one bundled bump: v2.16 committed to
`docs/approved-copy/V2_16_Website_Master_Plan_Lisa_Collio.md`, v2.15 deleted
(not left alongside it), and this file updated in the same change.
- **Six new locked standards folded in**, all from the Elkhart image programme:
  Report-Before-Build, Source-Repoint, Batch Reconciliation (`audit.js` check
  22), Review-Surface, Alt-Text Correspondence (check 23), and Changelog
  Citation.
- **Field-Class Compliance Coverage amended** to carry its fourth instance —
  `og:image:alt` — and its field enumeration expanded to name the `og:` and
  `twitter:` fields individually rather than as one "og/twitter tags" bucket.
  The bucket is what let the fourth instance happen.
- **Single Open-Items Record** gains what its mechanical corollary was missing:
  what the diverged branch actually held.
- **Master Plan §19's scope ruling mirrored** as a new subsection — the
  registry now covers every governing and reference document wherever it lives,
  with a Location column, and three classes are unregistered by ruling rather
  than omission. This file has a registry row again for the first time since
  July.
- **Corrected a live claim in the Featured image standard.** It said
  out-of-scope images with baked-in text were "listed for Lisa's
  reshoot/re-export decision." They are not: the audit reports zero
  outstanding and `npm run check:images` corroborates it (37 in-scope with a
  band, 58 out-of-scope clean). v2.16 flagged this as a disagreement between
  two documents and left it open; resolved here in favour of the audit,
  because a build check settles it. The v1.5 log entry below still records the
  49-slug figure that was true when it was written — a changelog is data, per
  the new Changelog Citation Standard, and is not rewritten.
- Master Plan cited generically throughout; no version number added anywhere
  outside this log.
- **Added to the Verification Standard: a repo-scoped review cannot verify a
  chat incident.** Reviewing v2.16 against the built record, three real
  incidents were reported as misstatements because a grep found nothing —
  including the one that is the Review-Surface Standard's own origin. Two had
  happened in chat; the third was in the repo, in a file the check never
  looked at. Lisa supplied the evidence and the three findings were withdrawn.
  The rule recorded is that absence from the repo is not evidence of absence,
  and that stating that limit for one finding does not discharge it for the
  others in the same report.
- No identity, architecture, or compliance-rule changes.

**v1.8 — August 5, 2026** (Claude, at Lisa's direction)
- **Recorded the Spanish phone-phrasing field-class ruling** under PAGE
  STANDARDS. Two Spanish forms now exist by design: `Llame o mande un mensaje
  de texto` in on-page CTAs, `Llame o escriba al (574) 370-5410.` in
  description fields. The CTA form costs about 50 characters of a 160-character
  ceiling, so the description form is deliberately shorter per the
  description-length priority rule. Written down because this is the exact
  shape the Field-Class Compliance Coverage Standard would otherwise tell a
  future session to unify — it is the documented exception to that instinct.
  Surfaced by the PR #89 meta-description audit, which found the split while
  confirming the convention was internally consistent across all 51 rewrites.
- **Added a mechanical corollary to the Single Open-Items Record Standard.**
  The standard barred a *parallel* record; the incident it did not describe is
  a record that forks without anyone creating one. A commit landed on
  `claude/compliance-gaps-copy-fields-scwmod` after its PR merged, `main` moved
  on, and two punch lists carrying **the same version number** diverged for
  five days. The corollary: edit the punch list only on a branch that will
  merge, and check any merged-PR branch for unmerged commits touching it before
  retiring. Reconciled as punch list v2.9 and the branch retired.
- **Made this file's own pointer to the punch list version-agnostic.** It named
  `docs/V2.3 Pre Launch Punch List Lisa Collio.md` while the live file was
  v2.8 — six versions stale, and the same failure mode v1.3 fixed for the
  Master Plan citation and v2.8 of the punch list fixed for its own governing
  line. Now "the highest-numbered `… Pre Launch Punch List Lisa Collio.md` in
  `docs/`".
- No identity, architecture, or compliance-rule changes.

**v1.7 — July 30, 2026** (Claude, at Lisa's direction)
- Added the **bundled-bump rule** to the header, per the Audit Checklist v1.3
  ("Master Plan bundled-bump rule," added 30 July 2026): every future Master
  Plan version bump commits the new version, deletes the superseded version,
  and updates CLAUDE.md's citations, all in the same change. Written down
  specifically because it wasn't previously a standing rule anywhere in this
  file — CLAUDE.md going two full versions (v2.12, v2.13) without being
  updated happened with no rule in place to have prevented it.
- **Mirrors Master Plan v2.15**, applied as this same bundled change: the
  repo's Master Plan copy moves from v2.14 to v2.15 (v2.14 deleted, not left
  alongside it), and the Pre-Launch Punch List's governing-documents line
  updated to match. v2.15 itself is a scope clarification, not a new
  standard: the Single Open-Items Record Standard now explicitly states it
  covers repo-trackable, Claude-Code-actionable items only, with Project-panel
  hygiene handled separately by the Audit Checklist's Part C1. Added that
  clarification to this file's own copy of the standard.
- Prompted by a Part C2 (repo-side) run of the newly-arrived Audit Checklist
  v1.3, which also surfaced a second, still-open finding not actioned in this
  entry: the canonical Audit Checklist has never been committed to the repo
  under its own name — `docs/AUDIT_CHECKLIST.md` is a separate, older,
  differently-structured document, not a stale copy of the same file. Left
  for Lisa's decision on `docs/AUDIT_CHECKLIST.md`'s disposition before acting.
  **Resolved, same day:** Lisa's call was fold-then-retire, not keep-both.
  `docs/AUDIT_CHECKLIST.md`'s unique content (pre-audit inventory, five whole
  Part B sections, the report-format and automated-checks appendices, plus
  more granular detail folded into the sections that already overlapped) is
  now in `docs/approved-copy/V1_4_Audit_Checklist_Lisa_Collio.md`, and the old
  file is deleted. Its remaining §18 content split off into this file's own
  Build Procedure section instead (see the new "Draft-approval verification"
  subsection above) rather than the Audit Checklist, since that's where this
  project's other PR/branch/draft discipline rules already live.

**v1.6 — July 30, 2026** (Claude, at Lisa's direction)
- Mirrors **Master Plan v2.12** (Build Record, Verification, and EN/ES Parity
  Standards — never previously folded into this file) together with **Master
  Plan v2.14** (Field-Class Compliance Coverage, Single Open-Items Record,
  Rejected-Asset, Title/Identity-Text Consistency Sweep, and PR Description
  Currency Standards, plus amendments to Verification and EN/ES Parity, plus
  a Technical addition on description-length priority). Added the new
  `## LOCKED STANDARDS` section (Master Plan §8 order) between PAGE STANDARDS
  and ASSETS, covering all eight standards.
- **v2.13→v2.14 note:** v2.13's own changelog bullet said "four new locked
  standards," but its document body held five — PR Description Currency
  Standard was undercounted in its own summary. Flagged to Lisa during this
  regeneration; she confirmed it as genuine and corrected it at the source in
  Master Plan v2.14 rather than leaving CLAUDE.md to carry a discrepancy the
  Master Plan itself hadn't resolved. CLAUDE.md mirrors v2.14, not v2.13.
- Removed the hardcoded "Master Plan v2.10" citation from the Featured image
  standard heading (Design & Naming Addendum) — the same stale-pointer
  pattern this file's own header already avoids by design. The two
  v2.10/v2.11 citations inside the v1.5 log entry below are left untouched as
  historical record of that sync, per this file's own practice of never
  rewriting past entries.

**v1.5 — July 27, 2026** (Claude, at Lisa's direction)
- Mirrors **Master Plan v2.10**, which adds the Featured-Image Standard as a new
  subsection under §8 Images. Text overlay and Lisa's cutout portrait on
  blog/article featured images are now a scoped exception limited to
  `/buyers/`, `/sellers/`, `/es/compradores/`, `/es/vendedores/` and their linked
  authority articles; every other page and article in both languages uses a clean
  photo with nothing overlaid. Rewrote the Featured image standard section
  accordingly and kept the Template A/B/C detail as a subsection scoped to the
  exception.
- Also current with **Master Plan v2.11**, which is a §19 registry sync only —
  two rows for the Spanish Wave 1/2 adaptation documents, added because the
  image-standard branch that produced v2.10 was cut in parallel with the Wave
  work and didn't carry the registry addition. CLAUDE.md does not reproduce the
  §19 registry table, so v2.11 changes nothing visible in this file; recorded
  here so the mirror is provably current rather than assumed to be.
- **Numbering note:** this entry was drafted as v1.4 on a branch cut before the
  session-audit work landed. That work reached `main` first and took v1.4, so
  this becomes v1.5 — the same parallel-branch drift v2.11 exists to correct,
  one file down. Both v1.4 bullets below are main's and are unchanged.
- Recorded the separation from the Tier 1 page-hero component, which also uses
  the cutout but is governed by the hero standard — the two are independently
  scoped and a Buyers/Sellers page may carry the cutout in both.
- `scripts/generate-featured-images.py` now carries the scope list
  (`OVERLAY_SCOPE`) and refuses to composite an overlay for an out-of-scope slug;
  added `generate_clean()` for everything else, plus `CLEAN_JOBS` recording the
  source photo, focal point and crop behind each clean image already built.
- Retroactive cleanup is flagged, not applied, with one exception:
  `docs/FEATURED_IMAGE_OVERLAY_AUDIT.md` lists the 53 out-of-scope slugs that
  carry baked-in text, 45 of them also carrying the cutout. Four Meet Lisa images
  were cleaned at Lisa's explicit direction (27 July); 49 slugs / 196 files
  remain flagged for her reshoot/re-export decision. Source instructions
  committed to
  `docs/drafts/V1_0_Claude_Code_Instructions_Text_Overlay_Exception_Lisa_Collio.md`.
- No identity, architecture, or compliance-rule changes.

**v1.4 — July 27, 2026** (Claude, at Lisa's direction)
- Added the stacked-PR corollary to build-procedure rule 2. GitHub re-targets a
  PR only when its base branch is deleted after merging; because the Wave 1
  branch survived its own merge, PR #67 merged seven finished Spanish articles
  onto that dead branch instead of `main`, silently. Delete a branch when its PR
  merges, and verify stacked work actually landed on `main`.
  **Closed out, verified 27 July 2026 (v1.5 session):** those seven articles are
  the *Wave 2* Elkhart set — Wave 1 was the branch they were stacked on, not the
  content. PR #68 (`claude/es-wave-2-to-main`) carried them to `main` and all
  seven are there, with their images, sitemap entries, hreflang pairs,
  `/es/fuentes/` citations, blog-hub cards, the two Wave 1 cross-links they were
  meant to activate, and the Spanish Elkhart pillar FAQ at 6 questions. Nothing
  was lost. The rule above stands on its own merits — this is recorded so the
  next reader doesn't re-investigate a resolved incident.
- Recorded the Spanish title-case convention: Title Case is correct for English
  pages and for Spanish page/legal titles; Spanish **article** titles are
  sentence case. Both Wave docs in `docs/approved-copy/` now carry dated
  as-built corrections where they diverge from what shipped.

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
