# Bilingual FAQ + Authority Article Build Playbook

*Prepared for Lisa Collio, Real Estate Agent · July 2026*
*Distilled from the full Elkhart/Goshen community-cluster build session (the highest-numbered Master Plan version in Project files era) — every mistake, regression, and fix, converted into a repeatable procedure. This document supersedes ad-hoc practice for any future page cluster built with the "5-question FAQ + full authority article, matching Spanish twin" pattern.*

**STATUS: New standing reference. Recommend Claude Code fold the "Locked Procedure" and "Pre-Flight Checklist" sections into `CLAUDE.md` directly, and recommend bumping the Master Plan to v2.9 with a pointer to this document in the page-standards section (§8).**

---

## PART 0 — About Lisa Collio & the Business (quick reference for a new chat)

Use this as the anchor block if a fresh Claude Code or Claude.ai session needs business context without re-deriving it from scratch.

- **Name/title (locked, always with comma):** Lisa Collio, Real Estate Agent
- **Brokerage (always written in full, RE/MAX with the slash):** RE/MAX Results, The Viruez Team
- **Phone:** (574) 370-5410 · **Email:** lisacolliorealtor@gmail.com
- **License:** RB21002460 (visible copy) · NRDS 387056478 (schema only, never visible)
- **Service area (locked, never "Northern Indiana" as standalone descriptor):** Goshen and Elkhart, Indiana only
- **Track record:** 120+ families, $20M+ closed sales, top 20% of Elkhart County REALTORS® (career total — this is the standing site-wide claim; period-specific rankings like "#59 of 328 agents mid-2026" belong only on `/market-stats/`, dated, never as the homepage claim)
- **Credentials (® always):** REALTOR®, NAR® Member, SRES® (Seniors Real Estate Specialist)
- **Brand marks (™ always):** The Next Chapter Method™ / Tu Próximo Capítulo™, Smart Move Framework™, Unlocking Smart Moves™
- **Languages:** Bilingual English/Spanish — "Hablo español" is a standing site-wide claim, not a marketing flourish; every EN page needs a working ES twin for this claim to stay honest
- **Domain:** lisacolliorealtor.com — **DNS has not yet cut over as of this writing.** Test everything against the actual Netlify production URL (`https://lisacolliorealtor.netlify.app` as of this session — confirm current value with Claude Code, since Netlify site slugs don't change but it's worth verifying), never against the custom domain, until cutover is confirmed complete.
- **Build environment:** GitHub repo `lisacolliorealtor/lisa-collio-website` + Netlify. `CLAUDE.md` in the repo governs Claude Code sessions and should mirror the Master Plan.
- **Governing document hierarchy:** Compliance (RESPA/Fair Housing/NAR/MLS rules) → highest-numbered Master Plan version in Project files → Brand Cheat Sheet → AI Business Brain Volumes → general knowledge.
- **Approval gate:** Claude drafts → Lisa approves ("Approved by Lisa" stamp) → broker does ONE comprehensive review of the finished site before DNS cutover, not per-document. Files get stamped "CLEARED TO BUILD NOW" once Lisa approves, with a build/preview vs. merge/cutover distinction always spelled out explicitly in the stamp so an automated build agent isn't blocked by ambiguous wording.

---

## PART 1 — What Actually Went Wrong This Session (root causes, not symptoms)

Naming these explicitly matters more than the fixes, because the fixes were all downstream of these five root causes recurring in different disguises:

### 1. Multiple "sources of truth" that silently diverged
This session had, at various points: content in this chat's drafted files, content in the Claude.ai Project knowledge panel, content on multiple unmerged git branches, content on `main`, and content Claude Code described but hadn't actually verified was live. Every major confusion this session traced back to two of these disagreeing without anyone noticing until a direct fetch caught it.

**Rule going forward:** For any given page, there is exactly ONE current source of truth at any moment: **whatever is actually live on `main`/production.** Approved source `.md` files in the repo are the *authoring* record, not the *verification* record. Never assume a source file and the live page agree — check.

### 2. Branches that keep accumulating commits after their PR merges
This happened at least **four** times (PR #55, #59, #60, #61) — a PR merges at commit X, then more work lands on the same branch afterward, and that work sits invisible until someone notices the branch still shows "recent pushes, no open PR."

**Rule going forward:** The moment a PR merges, that branch is done. Any further work happens on a **freshly cut branch from the new `main`**, not by continuing to push to the merged branch. **Adopt one-PR-per-unit-of-work**: open a new PR as soon as a discrete piece of work is ready, rather than continuing to accumulate multiple units of work on one long-lived branch before opening a PR at all. Smaller, promptly-opened PRs are easier to keep in sync with a moving `main` and much harder to lose track of.

### 1b. Uploaded-but-never-committed content becomes an invisible, un-auditable source
A real example: a Fair Housing violation ("walkable-feeling") got fixed once, but was reintroduced via a Spanish FAQ blocks document that had been uploaded to a Claude.ai chat and used to draft live content — but was **never committed to `docs/approved-copy/`** in the actual repo. Because it lived only in chat-upload space, no future rebuild, audit script, or Claude Code session could ever consult it or know it was a source of anything. The live page ended up contradicting its own *repo-based* approved source, which was actually correct — the uncommitted upload was the problem.

**Rule going forward:** The moment any drafted content (FAQ blocks, article bodies, source docs) is approved and used to build something live, it gets committed into the repo's `docs/approved-copy/` — not left sitting as a chat upload. This is already a standing rule (see the July 2026 workflow note that Claude Code instructions must direct committing approved source documents as a first step) — this incident shows the rule needs active enforcement, not just existence. Recommend Claude Code treat "is this file actually in the repo?" as a standard check whenever drafted content is used to build a live page.

### 3. Facts corrected in one place, not in the actual source of truth
The "13 vs. 14 elementary schools" regression happened because the original correction hit a page that later got retired/rebuilt, and the *approved source documents* still said the old number — so the wrong number kept regenerating. This is the single most important lesson of the session.

**Rule going forward:** Every verifiable fact that appears in more than one place (a school count, a population figure, a founding date) needs **exactly one canonical source** — recommend a dedicated `docs/VERIFIED_FACTS.md` or similar data file that every article, pillar page, and Spanish twin pulls from, rather than each page independently stating the same fact from memory. When a fact is corrected, it's corrected in the canonical file first, and every page citing it is checked against that file, not against each other.

### 4. English rebuilt without Spanish rebuilt alongside it
The biggest structural lesson: when 16 English community articles got rebuilt with better, more accurate content, **none of the Spanish twins were touched.** This created not just thin Spanish pages but actively *contradictory* ones — different facts in different languages about the same subject (the RV/MH Hall of Fame's size and location being the clearest example).

**Rule going forward — this is the most important rule in this document:** **English and Spanish content changes happen in the same PR, or the Spanish adaptation is scheduled and tracked before the English PR merges — never left as an unscoped "we'll get to it."** If a rewrite touches English body copy in a way that changes facts, that PR is not "done" until either (a) the Spanish twin is adapted in the same batch, or (b) an explicit tracked item exists (like `EN_ES_DIVERGENCE_INVENTORY.md`) with the gap logged the moment it's created, not discovered later by audit.

### 5. Reports of work taken as fact instead of verified
Several times this session, "I built X" or "I attached Y" turned out to be wrong, incomplete, or literally not present (the placeholder-text incident, the "attached" file that never came through, claims about retired pages that turned out to be on an unseen branch). Nobody was lying — coordination across multiple AI sessions with different visibility into the repo is genuinely hard. But the fix pattern was always the same: **fetch and check directly, rather than trust a report of success.**

**Rule going forward:** For anything visible-on-a-live-page (FAQ content, redirects, fact corrections), verify by direct fetch against the actual production URL before considering it closed — not by reading a summary of what was done.

---

## PART 2 — The Locked Procedure for Any New Page Cluster

This is the order of operations for building a new "X-topic authority article set + FAQ + Spanish twin" cluster from scratch, incorporating every lesson above. Follow this in order; don't skip steps even when a step feels redundant.

### Step 1 — Scope and count, in both languages, before writing anything
Decide the FAQ question count and article count for **both** the English and Spanish version at the same time, written down in one place. This session's Elkhart Moving page ended up needing a citation/FAQ rebuild specifically because the "5 vs 6 questions" ambiguity wasn't resolved before content was written. Lock the count first: how many FAQ questions per page (5 is the site standard, though the Goshen Moving pillar runs 6 — pick and record the count per page-type up front), how many spoke articles, and confirm the Spanish set will match 1:1.

### Step 2 — Gather real facts from real sources, cite as you go
Pull from the actual named sources (government sites, official district sites, Wikipedia cross-checked against a primary source, etc.), not from memory or a prior draft. Add each fact to the canonical facts file (see Root Cause #3) as you go, with its source. Never write a number into an article without it already existing in — or being added to — the canonical facts file.

### Step 3 — Draft English body content
Write the full article body from the gathered facts. Standard length for a spoke article this session ran roughly 220–350 words; pillar pages ran 1,500–2,500 words. Apply Fair Housing screening at this stage — see Part 3's compliance checklist — not as an afterthought.

### Step 4 — Draft the English FAQ block, matching the body exactly
Every fact in an FAQ answer must be traceable to the body text on that same page. Do not answer an FAQ question with a fact the body doesn't support — this was the exact defect the 5-article reconciliation batch existed to fix. Write 3 (or the page's locked count) question/answer pairs.

### Step 5 — Get English approved (Lisa + eventual broker pass)

### Step 6 — Draft the Spanish adaptation from the *English body you just wrote*, immediately — not later
Per Volume 37: cultural adaptation, not translation. Same register (usted), same vocabulary conventions already established on sibling pages (check neighboring Spanish pages for house style on terms like "intermedia" vs. "secundaria" before writing). Match structure and fact coverage to the English version — if English names a fact, Spanish should generally carry it too, adapted in framing/tone but not omitted, unless there's a specific reason (space, redundancy with a linked page) — and if omitted, note why in the adaptation notes.

### Step 7 — Draft the Spanish FAQ block, matching the Spanish body exactly
Same rule as Step 4, applied to the Spanish version.

### Step 8 — Get Spanish approved

### Step 9 — Build both together, in the same PR
Both language versions ship in the same pull request. This prevents the divergence problem from Root Cause #4 from ever having a chance to start.

### Step 10 — Build hreflang pairing, sitemap entries, and Sources/Fuentes citations in the SAME PR
Not as a follow-up task. This session had to backfill hreflang tags across 120 pages and citation entries across 23 articles because these were treated as separate, later work. They aren't separate — a page isn't "done" without its hreflang pair, its sources citation (if it cites third-party facts), and its sitemap entry.

### Step 11 — Verify, don't just report
Before calling the cluster done:
- Direct-fetch every new/changed page (both languages) and visually confirm the FAQ content, fact accuracy, and Fair Housing language
- Confirm FAQ visible copy and FAQPage schema are word-for-word identical (script-checkable — this project already has `npm run check` for this)
- Confirm every citation on `/sources/` and `/es/fuentes/` resolves to a live page title
- Confirm hreflang reciprocity (both halves of a pair agree) — this project has `npm run hreflang --check` for this now
- If anything was retired/renamed, confirm the 301 actually works via a real HTTP status check (see Part 4 on how to actually do this)

### Step 12 — Only then, mark it built and move to the next cluster

---

## PART 3 — Compliance Checklist (apply at Step 3 and Step 6, not just at final audit)

Run this at *drafting* time, not just audit time — catching these while writing is cheaper than catching them after publish.

- [ ] No "walkable," "walking distance," "walk to," or ambulatory-based phrasing anywhere (this regressed once already this session via a rewrite — it can happen again; grep for it every time)
- [ ] No "Northern Indiana" as a standalone service-area descriptor (plain geography like "the northern part of the state" is fine per the recorded July 25, 2026 decision — don't over-correct this either)
- [ ] Service area stated as "Goshen and Elkhart, Indiana" only
- [ ] ™ on every instance of a Method brand name; ® on every instance of REALTOR®/NAR®/SRES®/RE/MAX®
- [ ] No specific business/restaurant/shop names on evergreen pillar pages (fine on dated blog articles with a "verify current details" disclaimer)
- [ ] No school district ranking or steering language — name all applicable districts, direct confirmation to the district's own enrollment office, never rank or recommend
- [ ] Agent-not-lender RESPA disclaimer present if the page discusses costs/financing
- [ ] Every MLS/market figure carries a source and date, routes to `/market-stats/` as canonical rather than restating numbers elsewhere
- [ ] Composite-story disclaimer applies only to actual composites; real reviews stay verbatim, attributed by full name (per the July 24, 2026 update superseding first-name+last-initial)
- [ ] Locked footer stack order intact: signature → composite disclaimer → reliability disclaimer → agent-not-lender → Equal Housing → RE/MAX independence → legal links

---

## PART 4 — Practical/Technical Notes Learned This Session

**Testing redirects:** Neither this chat's fetch tool nor Claude Code's sandbox can reliably check live HTTP status codes on this project's domains (both hit permission/network blocks). The reliable method: `curl -sSI [url] | head -3` run by a human with real network access, or a third-party redirect checker tool. Don't trust "the config looks right" as equivalent to "verified live."

**Testing against the right environment:** Until DNS cutover, `lisacolliorealtor.com` doesn't point at this codebase — testing against it produces false 404s that look like bugs but aren't. Always confirm and use the actual Netlify-assigned URL for testing pre-cutover.

**Git rename detection is not trustworthy on large content rewrites:** When merging a branch that substantially rewrites multiple articles, git's automatic rename-pairing can silently mismatch files (this session had a cost-of-living article get paired with a school-district article by git's own logic). Always verify rename pairings explicitly, or resolve merges by an explicit hand-written slug map rather than trusting automatic detection.

**"Attached" isn't verified until it's actually in the conversation:** If a message says a file is attached, confirm it actually rendered/uploaded before acting on it. This session lost real time to messages describing attachments that hadn't actually come through, or placeholder text left in a message that should have contained real content.

**Netlify deploy previews vs. production vs. `main`:** A deploy preview tied to a PR freezes at whatever commit existed when the PR was last built — it does NOT track further pushes to a merged PR's branch, and it stops updating entirely once the PR is closed. If something looks stale on a preview, check whether the PR is still open and whether the branch has moved past what was actually built.

---

## PART 5 — SEO / GEO / AEO / NAP / E-E-A-T, Applied Specifically to This Site

### NAP (Name, Address, Phone) consistency
Lisa doesn't have a public storefront address (real estate agents typically don't for their personal brand, distinct from the brokerage's office), so the operative consistency requirement is **Name + Phone + Service Area**, stated identically everywhere: "Lisa Collio, Real Estate Agent," "(574) 370-5410," "Goshen and Elkhart, Indiana." Every page's schema (RealEstateAgent) and every footer signature line should match this exactly — inconsistency here (different phone formatting, abbreviated vs. full service area) actively hurts local SEO trust signals.

### E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness)
This is where the citation/sources work this session directly matters, not just as a compliance nicety:

- **Experience** — the track record numbers (120+ families, $20M+, career top-20%) and the "what Lisa sees working this market" sections that appear on the pillar pages are experience signals. Keep them current and specific rather than generic.
- **Expertise** — credentials (REALTOR®, SRES®, NAR® Member) plus the depth of the authority articles themselves (a 250-word article that actually explains district boundaries in detail signals more expertise than a 100-word generic summary).
- **Authoritativeness** — the `/sources/` and `/es/fuentes/` pages are a genuine authoritativeness asset most competitor sites don't have. Every cited fact traceable to a primary source (a district's own website, Wikipedia cross-checked, a government site) is a real trust signal to both readers and search/AI systems. Keep this maintained — an orphaned or stale citation undermines the whole page's credibility, not just one fact.
- **Trustworthiness** — the disclaimer stack, the RESPA agent-not-lender language, the "information deemed reliable but not guaranteed" line, and honest content (the "honest trade-offs" sections on both pillar pages, the 2008–2009 RV downturn discussion) all signal trustworthiness. Sanitized, purely promotional content scores worse on this axis with both human readers and AI evaluators than content that includes real, balanced context.

### AEO/GEO (Answer Engine / Generative Engine Optimization)
This is the actual mechanism behind the "5-question FAQ + full article" pattern:

- **FAQPage schema must match visible content exactly.** This isn't just a technical nicety — an AI answer engine (or Google's own AI features) extracting an FAQ answer that doesn't match what's actually on the page is a trust failure that can suppress the whole page's visibility. This session's entire 36-page reconciliation batch existed because of this exact mismatch.
- **Direct, extractable answers** — FAQ answers should be self-contained enough to be lifted as a direct answer (2-3 sentences, factual, no "click here to learn more" as the entire answer) while still linking to the full article for depth.
- **Hub-and-spoke architecture with real interlinking** — pillar pages linking to spoke articles, spoke articles linking back and to siblings ("More from Lisa" cards), builds the topical authority signal that both traditional SEO and AI/answer engines reward. This session's structure (pillar → 5 or 6 FAQ questions → each linking to a full spoke article) is the correct pattern; the mistake was inconsistent execution (some pages had it, some didn't, some had schema without matching content).
- **Consistency across languages matters for AEO too** — an AI system serving a Spanish-language query needs the Spanish page to actually contain the answer, not a thinner or outdated version. This is another angle on why Root Cause #4 (English/Spanish divergence) isn't just a translation-quality issue — it's a real AEO gap in the Spanish-language answer space specifically, which given "Hablo español" being a core differentiator, is arguably where this site should be strongest, not weakest.

---

## Recommended immediate actions

1. Send this document (or its Part 1–2 core) to Claude Code with instructions to fold the "Locked Procedure" and "Compliance Checklist" sections into `CLAUDE.md` directly, so every future Claude Code session inherits this process automatically rather than relying on a human relaying it each time.
2. Recommend bumping the Master Plan to v2.9 with a short pointer in §8 (page standards) referencing this playbook as the authoritative build procedure for any FAQ+authority-article+Spanish-twin cluster going forward.
3. Consider creating the `docs/VERIFIED_FACTS.md` canonical facts file described in Root Cause #3 — this alone would have prevented at least two regressions this session.
