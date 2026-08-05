# §19 Companion Document Registry — audit for the Master Plan v2.16 draft

*Claude Code · 5 August 2026 · report only, nothing changed*

Audited against `docs/approved-copy/V2.15_Website_Master_Plan_Lisa_Collio.md`
§19 (lines 449–493) and the working tree at `676d90e` on
`claude/elkhart-images-phase-0-6udcbx`.

---

## 0. The framing that governs every number below

**§19 is a registry of the Claude Project's knowledge panel, not of the git
repo.** It says so in its own opening line ("Every document in the Project…"),
and its footnote records removals *from the Project*. Twelve of its 35 rows name
`.docx` files or documents that have never existed in this repository.

That boundary is the same one CLAUDE.md v1.7 drew for the Single Open-Items
Record Standard: Claude Code can check the repo, and cannot see the Project
panel. So this audit reports two different things and does not mix them:

- **Repo-verifiable defects** — a row whose named file *is* in the repo but under
  a different name, version, or extension; or a description contradicted by the
  file's own contents. These are stated as findings.
- **Project-only rows** — a row naming a file not in the repo. These are listed
  as *unverifiable from here*, **not** as broken. Confirming them is Audit
  Checklist Part C1 work, run by Claude in chat against the Project panel.

Counts: **35 rows** (32 website + 3 AI Business Brain). **20 repo files** are
covered by 18 of those rows. **13 rows** name something not present in the repo.

---

## 1. Current exact filename of every governing document

| Document | Exact path, verified present | Version string inside the file |
| --- | --- | --- |
| Master Plan | `docs/approved-copy/V2.15_Website_Master_Plan_Lisa_Collio.md` | v2.15 (§20) |
| Punch List | `docs/V2.8 Pre Launch Punch List Lisa Collio.md` | "Pre-Launch Punch List — v2.8", 29 July 2026 |
| Audit Checklist | `docs/approved-copy/V1_4_Audit_Checklist_Lisa_Collio.md` | v1.4, 30 July 2026 |
| CLAUDE.md | `CLAUDE.md` (repo root) | v1.7, 30 July 2026 |

Note the Punch List is the only one of the four using **spaces** in its filename
and the only one **not** in `approved-copy/`. Both are pre-existing conventions,
noted so a future rename is a deliberate decision rather than a surprise.

**None of the last three is in the §19 registry at all.** See §2.1.

---

## 2. Repo-verifiable defects

### 2.1 Three governing documents are missing rows entirely

The registry lists the Master Plan (row 1) but not:

- `docs/V2.8 Pre Launch Punch List Lisa Collio.md` — the single open-items
  record named by a locked standard in §8.
- `docs/approved-copy/V1_4_Audit_Checklist_Lisa_Collio.md` — the document that
  *runs* the Part C Project audit §19 depends on.
- `CLAUDE.md` — deliberately removed from the Project in July 2026 (the footnote
  says so: "CLAUDE.md (repo-only, §13)"). Its absence is a *decision*, not a gap
  — but the registry has since added `docs/VERIFIED_FACTS.md`, also repo-only,
  as row 32. The two repo-only documents are now treated inconsistently.

Ruling needed from Lisa: either repo-only governing documents get rows (making
row 32 the precedent) or they do not (making row 32 the anomaly). Right now it
is one of each.

### 2.2 Row 1 self-describes as the wrong version

> `Lisa_Collio_Website_Master_Plan (this doc, v2.11)`

The file is v2.15. The pinned number was last touched in v2.11 and has been
stale through four versions. This is the same class of self-reference bug the
Master Plan's own changelog has already caught twice (v2.8, v2.11) — and it is
exactly what CLAUDE.md's header avoids by design with "the highest-numbered
version in Project files."

**Suggested fix:** drop the version from the row entirely — `(this doc)` — so it
cannot go stale again.

### 2.3 Row 14 — filename carries a version the file does not

> `Goshen-Elkhart-Reference-Data-Sheet-v1_1.md`

Repo file is `content/source/Goshen-Elkhart-Reference-Data-Sheet.md`. No `v1_1`
in the filename, and **no v1.1 marker anywhere inside the file either** — its
header reads only "Compiled: July 16, 2026." The row's description asserts
specific v1.1 changes ("both 'walkable' instances removed, full banned-term list
added, ZIP-code guidance added"). Grepping the repo copy for `walkab` and
`banned` returns **zero hits for both** — the "walkable" removal is confirmed by
absence, but the promised banned-term list is not in this file.

**Two things to decide:** whether the repo copy is actually the v1.1 the row
describes, and whether the banned-term list belongs here or is considered
covered by `content/source/fair-housing-terms.txt` (which is where the build
actually reads banned terms from).

### 2.4 The "removed duplicate" data sheet is still in the repo

The footnote records `duplicate Goshen-Elkhart-Reference-Data-Sheet.md` as
removed from the Project. The duplicate still exists in the repo as
`content/approved/goshen-elkhart-data-sheet.md` and is **byte-identical** to
`content/source/Goshen-Elkhart-Reference-Data-Sheet.md` (verified with `diff`).

A Project removal was recorded; the repo copy was never actioned. Same pattern
for row 11: `content/source/Market-Stats-Page.md` and
`content/approved/market-stats-page.md` are also byte-identical duplicates, and
no removal is recorded for that pair at all.

### 2.5 Row 15 — registered version is two majors behind

> `lisa-collio-google-reviews.md (v2)`

`docs/approved-copy/lisa-collio-google-reviews.md` line 2 reads **"Version 3.2 ·
Updated July 2026 — replaces all prior versions of this file in the Project."**

The description ("Verified reviews source of truth") is still accurate; only the
version tag is wrong. v3.2 also states "no open action items remain in this
document," which the row does not reflect.

### 2.6 Row 9 — registered extension is wrong

> `RESPA_Compliance_Rules_Lisa_Collio.docx`

Repo file is `docs/compliance/RESPA_Compliance_Rules_Lisa_Collio.md`. The other
three compliance rows (6, 7, 8) correctly say `.md` and all three resolve to
`docs/compliance/`. This one row is the odd one out.

Caveat worth stating: a `.docx` may genuinely still sit in the Project alongside
the repo `.md`. If so the row is correct about the Project and the *repo* copy is
undocumented — which is itself worth a decision, since the repo `.md` is what any
future session will actually read.

### 2.7 Row 17 — filename differs from the repo copy

> `CLUSTER_1_Compradores_Hispanohablantes_Authority_Articles.docx`

Repo file is `content/source/CLUSTER_1_Compradores_Hispanohablantes_Authority_Articles-2.docx`
— note the `-2` suffix, the signature of a duplicate download. Low-severity, but
a rebuild that searched for the registered name would not find it.

### 2.8 Row 28 — a delete-after-use row that was never deleted

> `Claude_Code_Instructions_Batch_2f_URL_Rename.md` — "**not evergreen reference
> material; safe to delete from the Project once Batch 2f merges**" · Refresh:
> "Delete after use"

Batch 2f merged. The row is still here. Not in the repo (a Project-only file), so
the deletion itself is Part C1 work — but the *row* is Master Plan text and can
be removed in v2.16.

### 2.9 Row 16 is a four-file bundle behind one label

> `HOME_page / BUY_A_HOME / SELL_A_HOME / MEET_LISA article sets`

These resolve to four separate `.docx` files in `content/source/`, one of which
carries a filename no registry text would predict:
`MEET_LISA_Page_FAQs_and_Authority_Articles_by_claude.docx`. Not a defect, but
the bundle label makes it impossible to tell from the registry whether all four
are present.

---

## 3. Rows naming files not present in the repo — unverifiable from here

Listed so Part C1 can check them against the Project panel. **None of these is
being reported as broken.**

| Row | Document | Note |
| --- | --- | --- |
| 2 | `Lisa_Collio_Brand_Cheat_Sheet_v3_1_2026.md` | Named in the precedence hierarchy (CLAUDE.md, "highest version") — a governing document living only in the Project |
| 3 | `Lisa_Collio_Marketing_Voice_Extras.docx` | |
| 4 | `Lisa_Collio_Resumen_estrategico...docx` | Row name is itself elided with "…" — no exact filename recorded anywhere |
| 5 | `lisa_Collio_Marketing_Plan.md` | Note the lowercase leading `l`, inconsistent with every sibling row |
| 10 | `MLS_Website_Data_Update.md` | §16 makes this the only permitted source of market figures; nothing in the repo references it by name |
| 12 | `MLS-Data-Source-Refresh-Checklist.md` | Referenced by name in 6 repo files (`content/approved/{home,buy,sell}-set.md`, both market-stats copies) but the file itself is not here |
| 20 | `Lisa_Collio_Photo_Shot_List.docx` | |
| 21 | `Lisa_Collio_Website_Build_Plan_v1_2.md` | |
| 22 | `Lisa_Collio_Communities_Goshen_Page_EN_v1_0.md` | Cited as a factual source by `V1_0_Goshen_Living_Authority_Articles_1-5_EN_Lisa_Collio.md`, which *is* in the repo |
| 23 | `Lisa_Collio_Moving_To_Goshen_Pillar_EN_v1_0.md` | Same — cited by a repo file, not itself in the repo |
| 24 | `Lisa_Collio_Goshen_Authority_Articles_1-5_EN_v1_0.md` | |
| 25 | `Lisa_Collio_Goshen_Authority_Article_6_RV_EN_v1_0.md` | |
| 26 | `Lisa_Collio_Disclaimers_and_Sources_v1_0.md` | Its output (`/disclaimers/`, `/sources/`) is live; the source document is Project-only |
| 27 | `Goshen-Cluster-Decisions-and-Photo-List.md` | |
| 28 | `Claude_Code_Instructions_Batch_2f_URL_Rename.md` | Also §2.8 above |
| 33–35 | AI Business Brain v2.0 · Vol 36 set · Vol 37 | Project-only by design |

Rows 22–27 are the sharpest case: **six approved Goshen source documents that
repo files cite as their factual basis, none of which is in the repo.** That is
precisely the failure mode Build Procedure rule 3 exists to prevent ("approved
content is committed the moment it is used"). The Elkhart equivalents *were*
committed — `V1_0_Living_in_Elkhart_Page_EN_…`, `V1_0_Moving_to_Elkhart_Pillar_EN_…`
are both in `docs/approved-copy/`. The Goshen set predates that rule.

---

## 4. Repo files that arguably should have rows and do not

**67 files** in `docs/`, `docs/approved-copy/`, `docs/drafts/`, `docs/compliance/`,
`content/approved/`, and `content/source/` carry no registry row. Sorting them by
whether they are plausible registry candidates:

### 4.1 Strong candidates — evergreen governing or approved content (19)

**Governing (3)** — see §2.1: the Punch List, the Audit Checklist, `CLAUDE.md`.

**The image manifest (1)** — `docs/approved-copy/V1_0_Goshen_Elkhart_Image_Filenames_Lisa_Collio.md`.
Referenced 6 times by the Elkhart instructions file, carries three numbered
asset rulings, and drove two full image batches. Exactly the class of document
row 31 was added for.

**Standing rulings (1)** — `docs/SPANISH_STYLE_DECISIONS.md`. Cited in CLAUDE.md
and in the Elkhart instructions as the authority on Spanish lexical choices
("maple" not "arce"). Evergreen by construction: it exists so a future session
does not "correct" a deliberate choice.

**Approved page/article content (14)** — same class as rows 22–27 and 29–31,
all in `docs/approved-copy/`:

- `V1_0_Living_in_Elkhart_Page_EN_Lisa_Collio.md`
- `V1_0_Moving_to_Elkhart_Pillar_EN_Lisa_Collio.md`
- `V1_0_Elkhart_Living_Authority_Articles_1-5_EN_Lisa_Collio.md`
- `V1_0_Elkhart_Moving_Authority_Articles_1-6_EN_Lisa_Collio.md`
- `V1_0_Goshen_Living_Authority_Articles_1-5_EN_Lisa_Collio.md`
- `V1_0_ES_Mudarse_a_Elkhart_Page_Lisa_Collio.md`
- `V1_0_ES_Viviendo_en_Elkhart_Page_Lisa_Collio.md`
- `V1.0_ES_Mudarse_a_Goshen_Page_Lisa_Collio.md`
- `V1.0_ES_Viviendo_en_Goshen_Page_Lisa_Collio.md`
- `V1.0_ES_Articulos_Goshen_1-6_Lisa_Collio.md`
- `V1.0_ES_Legal_Pages_Lisa_Collio.md`
- `V1.0_ES_Disclaimers_Page_Lisa_Collio.md`
- `V1_0_FAQ_Gap_Blocks_EN_15_Pages_Lisa_Collio.md`
- `V1_0_FAQ_Gap_Blocks_ES_21_Pages_Lisa_Collio.md`

Two more in the same folder sit on the line — `V1_0_FAQ_Replacement_5_Articles_Lisa_Collio.md`
and `V1_0_Verify_Current_Details_Disclaimer_Lisa_Collio.md` — both approved
content, both small.

**Naming note:** this folder uses two incompatible conventions,
`V1.0_` (7 files) and `V1_0_` (18 files). The dot form is the older one. Worth a
single normalising pass rather than a row-by-row decision.

### 4.2 One-time task files — the row-28 precedent says no row, or a delete-after-use row (6)

`docs/approved-copy/V1.0_Claude_Code_Instructions_Batch_{2b,2c,2e_Articles,2e_Pages}_…` (4)
and `docs/drafts/V1_0_Claude_Code_Instructions_{Elkhart_Images,Text_Overlay_Exception}_…` (2).

Row 28 established the pattern for exactly this class and then never fired. If
v2.16 adds rows for these, it should also add whatever mechanism actually
retires them — otherwise the registry accumulates six more permanent rows for
work that finished.

### 4.3 Closed / historical session records — no row (9)

`docs/DRIVE_TIME_INVENTORY.md` · `docs/ELKHART_IMAGE_PHASE_0_RECONCILIATION.md` ·
`docs/ELKHART_IMAGE_PHASE_2_VALIDATION.md` · `docs/ELKHART_IMAGE_PR1_PREFLIGHT.md` ·
`docs/PR89_DESCRIPTION_AUDIT.md` · `docs/EN_ES_DIVERGENCE_INVENTORY.md` ·
`docs/FAQ_GAP_PAGE_CONTENT.md` (marked "⚠️ CLOSED — historical record only") ·
`docs/FEATURED_IMAGE_OVERLAY_AUDIT.md` (marked "RESOLVED") · `docs/LAUNCH_REPORT.md`.

`FEATURED_IMAGE_OVERLAY_AUDIT.md` is the one to reconsider: CLAUDE.md's
Featured-image standard points at it as the live list for Lisa's
reshoot/re-export decision, and its own header says the remediation is complete.
Those two statements disagree. Not a registry question — a CLAUDE.md question,
flagged here because the audit surfaced it.

### 4.4 Launch operations — Lisa's call (2)

`docs/LAUNCH_CHECKLIST.md` and `docs/LAUNCH_RUNBOOK.md`. Both written for Lisa to
use at DNS cutover, both still pending. Evergreen until launch, then historical.

### 4.5 Repo build inputs and machine-read control files — no row (30)

`content/approved/` (19) is the repo-side rendering of content whose *authoring*
records are already registered; registering both would double-count. Two are
exact duplicates of `content/source/` files (§2.4).

`content/source/*.txt` (4: `fair-housing-terms`, `rejected-assets`,
`retail-business-names`, `sold-listing-consent`) and `content/*.{md,json}` (7:
rotation log, photo catalog, hreflang pairs, parity baseline, photo-usage audit,
review-photo map, reviews) are read by `audit.js` and the build scripts, not by
people. They are code inputs, not companion documents.

One exception worth Lisa's ruling: `content/source/rejected-assets.txt` is named
directly by a **locked standard** (Rejected-Asset Standard, §8) and carries three
of her numbered asset rulings. It is the only control file whose *contents* are
governing decisions rather than data.

The 24 `docs/CONTACT-*.png` / `CROP-OPTIONS-*.png` review sheets are excluded
from all counts above — they are per-batch review artifacts, not documents.

---

## 5. Rows whose description no longer matches the file

Only three can be checked from the repo; the rest name Project-only files.

1. **Row 1** — "this doc, v2.11" in a v2.15 file (§2.2).
2. **Row 15** — "(v2)" against a file that says v3.2 and declares all its action
   items closed (§2.5).
3. **Row 14** — asserts a "full banned-term list added" that is not in the repo
   copy (§2.3).

Row 8's description is *correct* and worth noting as the counter-example — it
records a July 2026 edit and the reason, and the file matches.

---

## 6. Suggested shape for v2.16 — not applied

1. Change row 1 to `(this doc)` with no version. Same reason CLAUDE.md's header
   is version-agnostic.
2. Fix rows 9, 14, 15, 17 to the exact current filenames and versions — or add a
   "repo path" column, since four of the six defects here are the registry and
   the repo naming the same document differently.
3. Delete row 28; it fired.
4. Decide the repo-only question (§2.1) and apply it consistently to the Punch
   List, the Audit Checklist, `CLAUDE.md`, and existing row 32.
5. Add rows for the 19 strong candidates in §4.1, or state explicitly that §19
   registers Project documents only and repo-side approved copy is out of scope
   — either is defensible; the current mixed state is what makes the registry
   hard to audit.
6. Resolve the two byte-identical duplicate pairs in §2.4.

**Nothing in this file has been applied. No registry row, filename, or document
has been changed.**
