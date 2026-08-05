# The two v2.8 punch lists — what's on the branch and not in `main`

*Lisa Collio, Real Estate Agent · 5 August 2026 · Claude Code*

**Report only. Nothing merged, nothing folded, nothing changed.** The branch
`claude/compliance-gaps-copy-fields-scwmod` is untouched and still exists.

---

## What is actually being compared

Two files with the same name and the same version number, at two different
commits:

| | `main` | branch `…-scwmod` |
| --- | --- | --- |
| Commit | `origin/main` | `c45dbee` |
| Blob SHA | `588c6d10` | `d52f7b24` |
| Lines | **219** | **191** |
| Checkbox items | **62** | **53** |
| Its own header note | "makes the governing-documents line version-agnostic" | "records PR #98" |

**These are not a fresh copy and a stale copy of the same document.** They are
two documents that diverged after PR #98 merged: the branch commit carries PR
#98's follow-ups, `main` carries everything since (PRs #99–#108) but never
received PR #98's follow-ups. Each has content the other has never had.

This is the Single Open-Items Record Standard's failure mode, caught in the act
— exactly one punch list is supposed to exist, and for roughly five days two
did.

---

## The five items on the branch that are not in `main`

Compared by normalised item text (whitespace and markdown emphasis stripped,
case-folded), so a reworded-but-same item would not appear here.

### Substantive — worth folding in (3)

**1. Sold-listing consent needs per-address verification** *(branch §E, L68)*

> **Sold-listing consent needs per-address verification against actual signed
> forms.** `content/source/sold-listing-consent.txt` (added in PR #98, enforced
> by `audit.js` check 21) lists the 14 addresses currently claimed as "Sold by
> Lisa Collio" / "Vendida por Lisa Collio" across `/sellers/` and
> `/es/vendedores/`. The file is an accurate **inventory** of what's live,
> seeded from the pages as they existed 31 July — it is explicitly **not** a
> certification that written seller consent (876 IAC 8-1-8(f)) is on file for
> each one; that still needs Lisa/broker confirmation. The check only guards
> against a *new* address shipping without a deliberate manifest entry — it
> can't retroactively verify the 14 already there.

⚠️ **This one is already resolved and should be folded in as closed, not open.**
Lisa confirmed signed written consent for all 14 addresses on **2 August 2026**;
the caveat has been removed from the file header and the confirmation recorded
both there and in `main`'s punch list (§C).

Worth noting what nearly happened: this item was the *only* record anywhere that
the consent file was an inventory rather than a clearance, and it was sitting on
a branch nobody was reading. Had the branch been retired without this comparison,
a compliance caveat on live advertising copy would have disappeared silently.

**2. `/es/vendedores/` is missing an entire review block** *(branch §D, L78)*

> **`/es/vendedores/` is missing the entire "What Lisa's clients say" review
> block that `/sellers/` has.** Found 31 July while closing the 501 Danbury Dr
> gap (PR #98): EN's sellers page carries two separate review sections — "What
> sellers say" (sold-listing quote cards, now paired on both languages) and a
> second "What Lisa's clients say" block (Naun Cerrato photo review, Abby Lopez
> text-only, a generic couple photo) that has no Spanish counterpart at all.
> This is new content — drafting a Spanish adaptation and getting Lisa's
> approval, not a mechanical fix — so it wasn't attempted as part of PR #98.
> Currently masked from `audit.js` check 14 by a baseline entry (`/sellers/` 31
> images vs `/es/vendedores/` 32) recorded for a different, already-resolved
> reason; that baseline should be revisited once this section is addressed
> rather than assumed to cover it.

**This is the most important of the five, and it is still open.** It is a live
EN/ES parity gap — the failure mode CLAUDE.md calls "the most important rule
here" — and it is currently **masked from the audit** by a baseline entry
recorded for an unrelated reason. `main` has no record of it. Nothing would
surface it.

**3. The PR #98 changelog entry** *(branch §B, L60)*

> **PR #98** — copy-field-gap sweep: inventoried which copy-field classes
> (schema fields outside description, image `title` attrs, figcaptions, CTA
> text, form labels/placeholders, `aria-label`) had no compliance rule at all.
> Added `audit.js` checks 19 (locked identity rules in `<title>`, catching 3
> live "Realtor" violations check 18 never scanned for), 20 (schema `headline`
> ↔ `<h1>` sync), and 21 (sold-listing address claims must be in
> `content/source/sold-listing-consent.txt`, 876 IAC 8-1-8(f)). Also closed the
> `/es/vendedores/` gap for 501 Danbury Dr (see §D). **Merged 31 July.**

`main`'s §B has entries for PRs #87 and #91–#93 but **nothing for #98**. This
is the entry that carries the consequence below.

### Superseded — do not fold in (2)

**4.** *(L44)* "Entire Elkhart batch — 26 images, not started. Nothing in
`assets/images/elkhart/` yet." — Superseded by the whole Elkhart programme
(PRs #104–#107). The count was also wrong; the measured figure was 27.

**5.** *(L143)* "Full Site Audit (Part B of `V1_0_Audit_Checklist_Lisa_Collio.md`)"
— `main` carries the same item pointing at the current filename,
`V1_4_Audit_Checklist_Lisa_Collio.md`. Folding this in would reintroduce a dead
pointer.

---

## The consequence that outlives the branch: checks 19, 20 and 21

Independent of which items get folded in, this needs fixing in `main` either way.

All three checks **exist and run** — verified directly in `audit.js`:

| Check | Line | What it gates |
| --- | --- | --- |
| 19 | `audit.js:633` | Locked identity rules in the `<title>` tag |
| 20 | `audit.js:652` | Schema `headline` must match the on-page `<h1>` |
| 21 | `audit.js:676` | Sold-listing address claims must be in the consent manifest |

**`main`'s punch list mentions none of them — zero hits for "check 19", "check
20", "check 21" across the whole file.** Its "Mechanical checks now in place"
table jumps from 18 straight to the proximity probe, and its prose mentions
checks 22 and 23 (added this week) while three older checks were never recorded.

The table's own stated purpose is *"Recorded so future sessions know what is
already enforced and don't rebuild it."* Three enforced checks are invisible to
it. Check 21 is the one gating a 876 IAC 8-1-8(f) compliance claim.

The branch's PR #98 entry is the **only description of checks 19 and 20 that
exists in any punch list**. That is the real cost of the divergence: the record
of three compliance checks lived only on an unmerged branch.

---

## Recommendation — for your approval, not applied

1. **Fold in item 2** (`/es/vendedores/` review block) as open, including the
   note that the check-14 baseline currently masks it.
2. **Fold in item 1 as closed**, with your 2 August confirmation, so the history
   shows the caveat existed and was resolved rather than vanishing.
3. **Fold in item 3** (PR #98's §B entry), and separately **add rows for checks
   19, 20 and 21 to `main`'s mechanical-checks table** — the table is the thing
   future sessions read, and a changelog entry is not a substitute for it.
4. **Drop items 4 and 5** as superseded.
5. **Then retire the branch.** Once the three items are in `main`, the branch
   holds nothing unique and deleting it loses nothing.

Suggested sequencing note: do 3's table rows regardless of what you decide about
the rest. Three live compliance checks being undocumented is a standing problem,
not a branch-retirement problem.
