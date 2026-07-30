# Elkhart section & FAQ images — PHASE 0 reconciliation

*Lisa Collio, Real Estate Agent · 30 July 2026 · Claude Code*

Phase 0 of `docs/drafts/V1_0_Claude_Code_Instructions_Elkhart_Images_Lisa_Collio.md`.
**Report only — nothing was processed, wired, or renamed.** The manifest was not
edited either; the one correction it needs is proposed here for Lisa's approval.

**Headline: the number is 27, not 26. Lisa needs 27 photographs.** Twenty-six of
those are in the manifest; the twenty-seventh is a live FAQ slot the manifest
never listed.

---

## 1. Is the manifest committed on `main`?

**Yes.** `docs/approved-copy/V1_0_Goshen_Elkhart_Image_Filenames_Lisa_Collio.md`,
159 lines, present on `origin/main` at `ca85d04`. Verified with
`git ls-tree origin/main`, not by looking at the working tree.

---

## 2. The 57 vs 56 discrepancy — resolved

**57 is correct. 56 is a stale leftover and should be deleted.**

The manifest states its total twice:

| Where | Figure | Verdict |
|---|---|---|
| Heading, line 146 — "Total: 57 images (16 + 15 + 14 + 12)" | **57** | **Correct** |
| Upload instruction 3, line 158 — "you don't need 56 *unique* shoots" | 56 | Stale |

Counted the table rows directly rather than trusting either figure:

| Manifest section | Rows |
|---|---|
| 1. Moving to Goshen | 16 |
| 2. Living in Goshen | 15 |
| 3. Moving to Elkhart | 14 |
| 4. Living in Elkhart | 12 |
| **Total** | **57** |

16 + 15 + 14 + 12 = 57, and the row counts are right, so the heading is
arithmetically sound.

Two things worth saying plainly:

- **This was already flagged.** The manifest's own as-built note at line 150
  says the 56 in instruction 3 is inconsistent and that 57 is correct. That note
  is right. What it did not do is fix the sentence, so the wrong figure is still
  the one a reader hits last. Recommend editing line 158 to 57 with a dated note.
- **"56" was probably never a total.** Instruction 3 is the sentence about one
  photo serving two slots — it argues you don't need 57 *unique* shoots. Read
  that way, 56 looks like an off-by-one typo for 57 in a sentence that was making
  a different point entirely. It is not evidence of a 56-row version of the list.

**Neither figure is the Elkhart shoot number.** 57 is the whole Goshen + Elkhart
programme. The Goshen half (31) is shot; 27 are wired and 4 are rejected. The
Elkhart half is 26 manifest rows — and 26 is one short of what the live pages
need. See §3.

---

## 3. Manifest ⇄ live page reconciliation, Elkhart half

Measured against the four page sources on `origin/main` (working tree is clean
and identical to `origin/main`, verified with `git diff --stat origin/main`).

### 3a. Live sections/FAQ items with NO manifest filename — **1 found**

| Page | Live item | Class it needs | Proposed filename |
|---|---|---|---|
| `/living-in-elkhart/` | FAQ 3 — "What is downtown Elkhart like?" (`living-in-elkhart/index.html:262`) | `faq-item--media` | **`elkhart-living-faq-downtown.jpg`** |

This is the Goshen failure repeating exactly. `/living-in-goshen/` has the
matching question and the manifest **does** carry
`goshen-living-faq-downtown.jpg` for it (line 103); the Elkhart section of the
same manifest lists only four FAQ rows — known-for, school-district, employers,
landmarks — and skips downtown. The proposed filename above is the Goshen row's
naming pattern with the city swapped, so it needs no new convention.

**This is the entire 26 → 27 difference.** Everything else reconciles.

### 3b. Manifest filenames with NO matching section on any page — **none**

All 26 Elkhart rows map to a live heading or FAQ question, in the order the
manifest lists them. Titles match the live `<h2>`/`<h3>` text word for word.

### 3c. EN/ES structural differences — **1 found, and it is serious**

| Page pair | Body sections | FAQ items | Verdict |
|---|---|---|---|
| `/moving-to-elkhart/` ↔ `/es/mudarse-a-elkhart/` | 7 ↔ 7 | 6 ↔ 6 | **In sync.** Section titles and FAQ questions correspond 1:1, and both sides carry article links. |
| `/living-in-elkhart/` ↔ `/es/viviendo-en-elkhart/` | 7 ↔ 7 | 5 ↔ 5 | **Body in sync. FAQ diverged — the counts match but the questions do not.** |

The FAQ sets on the Living pair:

| # | `/living-in-elkhart/` (EN) | `/es/viviendo-en-elkhart/` (ES) | Same topic? |
|---|---|---|---|
| 1 | What is Elkhart, Indiana known for? | ¿Por qué es conocido Elkhart, Indiana? | Yes |
| 2 | What school district serves Elkhart, Indiana? | ¿Qué hay para hacer en el centro de Elkhart? | No |
| 3 | What is downtown Elkhart like? | ¿Qué parques tiene Elkhart? | No |
| 4 | What industries and employers are in Elkhart? | ¿Qué museos hay en Elkhart? | No |
| 5 | What landmarks and amenities does Elkhart have? | ¿Cuál es la historia de Elkhart? | No |

Only one of five questions is shared. English has school-district,
employers and landmarks with no Spanish equivalent; Spanish has parks, museums
and history with no English equivalent. The `FAQPage` JSON-LD on each page
mirrors its own visible set, so the divergence is in the structured data too.

Two aggravating details:

- **The Spanish page has no article links at all.** All five English FAQ answers
  carry a `faq-more` "Read the full article" link; none of the five Spanish
  answers does. The Spanish `/es/viviendo-en-goshen/` twin, by contrast, links
  all five.
- **The stated reason is now out of date.** `es/viviendo-en-elkhart/index.html:245`
  carries the comment "todavía no existen artículos de autoridad en español para
  Elkhart" — Spanish Elkhart authority articles don't exist yet. They do now:
  Waves 1 and 2 shipped Spanish twins for all five English questions
  (`por-que-es-conocido-elkhart-indiana`, `distrito-escolar-elkhart-indiana`,
  `centro-de-elkhart-indiana`, `industrias-empleadores-elkhart-indiana`,
  `lugares-emblematicos-elkhart-indiana`). The comment is the fossil of a
  constraint that no longer applies.

**`docs/EN_ES_DIVERGENCE_INVENTORY.md` line 84 currently reads "5 | 5 | counts
match; EN set was revised to link the new articles."** That is true about what it
measured and wrong about what it implies. The counts do match. The EN set was
revised. The ES set was not, and the row does not say so. This is the same
class of reporting error the instructions file warns about, sitting in the
document that is supposed to be the authority on divergence.

**Why this blocks the shoot rather than just the wiring:** per Master Plan §7 an
EN page and its ES twin share the same image *file* and differ only in alt text.
Four of the five FAQ slots on this pair have no shared subject, so there is no
single file that can serve both sides. Lisa's ruling is needed before the count
is final — see §5, Decision 1.

### 3d. Also noted, not gaps

- **`<h2>What Lisa's clients say</h2>`** appears on all four pages and has no
  manifest row. Correct — that is the reviews block, and its photography comes
  from `assets/images/client-reviews/` under the pairing manifest. Out of scope
  for this batch; not a gap.
- **`/moving-to-elkhart/` has no "What daily life actually looks like here" or
  "One thing worth knowing about buying here from a distance" section**, both of
  which `/moving-to-goshen/` has. The manifest correctly omits Elkhart rows for
  them. This is an EN Goshen/Elkhart content difference, not an EN/ES one, and
  not an image problem.
- **`CLAUDE.md`'s architecture line is stale** where it says the ES Elkhart
  community page "still lives at `/es/comunidades/elkhart/` until its Batch 4
  rebuild." There is no `es/comunidades/` directory; the page is at
  `/es/viviendo-en-elkhart/` and is in `content/hreflang-pairs.json`. Harmless
  here, worth a one-line fix in a later PR.

---

## 4. Measured image counts — every number named by class

Instruction: count both classes separately and name the class with every number.
Counts are of the page sources on `origin/main`. `class="section-figure"` occurs
exactly once per `<img>`, so these are element counts, not string hits.

### 4a. Current state — Elkhart (all four pages)

| Page | `section-figure` | `faq-item--media` | total `<img>` |
|---|---|---|---|
| `/moving-to-elkhart/` | **0** | **0** | 6 |
| `/living-in-elkhart/` | **0** | **0** | 6 |
| `/es/mudarse-a-elkhart/` | **0** | **0** | 6 |
| `/es/viviendo-en-elkhart/` | **0** | **0** | 6 |

The 6 `<img>` on each page are chrome (header/RE/MAX lockup, hero, Equal Housing
logo, review photos) — identical on both sides of each pair, which is why check
14 can compare raw `<img>` counts. **Zero section and zero FAQ images exist on
any of the four Elkhart pages.** `assets/images/elkhart/` contains only
`.gitkeep`, and `assets/images/sections/` (108 files) contains no `elkhart-*`
entry.

### 4b. Required state — what the live pages have slots for

| Page | `section-figure` | `faq-item--media` | total |
|---|---|---|---|
| `/moving-to-elkhart/` | **8** (7 body + closing CTA) | **6** | **14** |
| `/living-in-elkhart/` | **8** (7 body + closing CTA) | **5** | **13** |
| `/es/mudarse-a-elkhart/` | **8** | **6** | **14** |
| `/es/viviendo-en-elkhart/` | **8** | **5** | **13** |
| **Unique files needed** | **16** | **11** | **27** |

ES twins reuse the EN files, so the file count is 27, not 54.

### 4c. The counting model, validated against the finished Goshen pages

The closing CTA image is a `section-figure`, not a separate class. Confirmed by
reproducing the wired Goshen counts from the manifest with no residual:

| Page | manifest rows | rejected | expected | measured `section-figure` | measured `faq-item--media` |
|---|---|---|---|---|---|
| `/moving-to-goshen/` | 16 | 3 | 13 | **8** | **5** |
| `/living-in-goshen/` | 15 | 1 | 14 | **9** | **5** |
| `/es/mudarse-a-goshen/` | — | — | 13 | **8** | **5** |
| `/es/viviendo-en-goshen/` | — | — | 14 | **9** | **5** |

8 + 5 = 13 and 9 + 5 = 14 — both exact, both languages, and 13 + 14 = 27, which
matches the manifest's as-built note that 27 of 31 Goshen images are wired. One
extra check on `/living-in-goshen/`: it has 10 body `<h2>` sections but 9
manifest rows, because "Where people work" has no slot and is intentionally
image-free (the deliberate gap the instructions mention). 10 body − 1 no-slot −
1 rejected (`goshen-living-why-lisa`) + 1 CTA = 9. Confirmed.

### 4d. Verification limits, stated plainly

`npm run audit` passes all hard checks on `main` today (155 pages, 41 SEO
warnings, all pre-existing meta-description length drift).

**I could not fetch the live Netlify pages.** `https://lisacolliorealtor.netlify.app/`
returns HTTP 403 at this environment's proxy gateway — a network-policy denial on
the CONNECT, not a Netlify response — via both `curl` and WebFetch. The build
procedure says verify against the live page, so: **these measurements are of the
page sources on `origin/main`, not of production.** `main` is the deploy source
and the working tree is identical to it, so the risk is low, but it is not the
same evidence and I am not going to call it that. Recommend Lisa spot-checks
`/es/viviendo-en-elkhart/` in a browser to confirm the FAQ divergence in §3c is
live — it is the one finding where being wrong would change the shot count.

---

## 5. Decisions Lisa needs to make

### Decision 1 — the Spanish Living-in-Elkhart FAQ (affects the count)

Four of five FAQ slots on `/living-in-elkhart/` ↔ `/es/viviendo-en-elkhart/`
have no shared subject, so there is no one file that can serve both.

- **Option A — bring the Spanish FAQ into sync with the English five.**
  *Recommended.* Costs no photography: the count stays 27 and every ES slot
  reuses its EN file. Closes a real EN/ES divergence, and the Spanish articles
  to link already exist. Needs a Spanish FAQ adaptation drafted and approved
  (build-procedure steps 6–8) — a copy change, not a photo change, and the
  five ES answers now on the page are good source material.
- **Option B — keep the Spanish FAQ as it is and reuse three body photos as its
  FAQ thumbnails** (`rivers-parks-outdoors` → parks, `museums-arts` → museums,
  `history` → history). Also 27 files, no new photography, ships faster. Cost:
  three photos appear twice on the same Spanish page, which the manifest's own
  instruction 3 advises against, and the divergence stays open.
- **Option C — shoot three Spanish-only FAQ photos.** **30 files.** The only
  option that changes what Lisa shoots. Not recommended: it spends photography
  to preserve a divergence rather than close it.

**Under A or B the shoot is 27. Only C moves it.** The shot list in §6 is
therefore final under either A or B.

### Decision 2 — the four high-risk slots (§7)

Representative photo, or intentionally image-free like `/living-in-goshen/`'s
"Where people work"?

### Decision 3 — the manifest corrections

Add the `elkhart-living-faq-downtown.jpg` row; change 56 to 57 at line 158.
Both proposed, neither applied.

### Decision 4 — the abstract titles (§7)

Same question as Decision 2, for the remaining non-literal titles.

---

## 6. FINAL SHOT LIST — 27 photographs

All landscape. Lisa's original photography only. Exact filenames, lowercase,
hyphens, `.jpg` — a stray space or a `.jpeg` cost 14 renames on the Goshen run.
Upload to `assets/images/elkhart/`. Every one of these is a clean photo: the
Communities pages sit outside `OVERLAY_SCOPE`, so no text, no colour band, and no
cutout portrait goes on any of them.

Risk column: **⛔** = twin of a rejected Goshen asset, needs a genuine
photograph (§7) · **◇** = abstract title, no literal subject (§8) ·
**★** = not in the manifest, new row proposed.

### `/moving-to-elkhart/` + `/es/mudarse-a-elkhart/` — 14 files

**`section-figure` — 8 files**

| # | Live section | Filename | Risk |
|---|---|---|---|
| 1 | Where Elkhart sits, and what that means for getting around | `elkhart-moving-location-commute.jpg` | ⛔ ◇ |
| 2 | Where people work | `elkhart-moving-employers.jpg` | |
| 3 | Schools | `elkhart-moving-schools.jpg` | |
| 4 | The housing stock | `elkhart-moving-housing-stock.jpg` | |
| 5 | What it costs to live here | `elkhart-moving-cost-of-living.jpg` | ◇ |
| 6 | The honest trade-offs | `elkhart-moving-trade-offs.jpg` | ◇ |
| 7 | Elkhart or Goshen? | `elkhart-moving-elkhart-or-goshen.jpg` | ◇ |
| 8 | Thinking about a move to Elkhart? (closing CTA) | `elkhart-moving-cta-closing.jpg` | ⛔ ◇ |

**`faq-item--media` — 6 files**

| # | Live FAQ question | Filename | Risk |
|---|---|---|---|
| 9 | What is there to do in Elkhart, Indiana? | `elkhart-moving-faq-things-to-do.jpg` | |
| 10 | What community events happen in Elkhart during the year? | `elkhart-moving-faq-community-events.jpg` | |
| 11 | What does it cost to live in Elkhart, Indiana? | `elkhart-moving-faq-cost-of-living.jpg` | ◇ |
| 12 | How do I move to Elkhart from another state? | `elkhart-moving-faq-moving-from-out-of-state.jpg` | ⛔ ◇ |
| 13 | What should I check before buying an older home in Elkhart? | `elkhart-moving-faq-older-home-checklist.jpg` | |
| 14 | I'm moving to Elkhart for an RV industry job. What should I know before buying? | `elkhart-moving-faq-rv-industry-job.jpg` | |

### `/living-in-elkhart/` + `/es/viviendo-en-elkhart/` — 13 files

**`section-figure` — 8 files**

| # | Live section | Filename | Risk |
|---|---|---|---|
| 15 | The city at a glance | `elkhart-living-city-at-a-glance.jpg` | ◇ |
| 16 | Downtown Elkhart | `elkhart-living-downtown.jpg` | |
| 17 | Rivers, parks, and outdoor spaces | `elkhart-living-rivers-parks-outdoors.jpg` | |
| 18 | Museums and the arts | `elkhart-living-museums-arts.jpg` | |
| 19 | Annual events | `elkhart-living-annual-events.jpg` | |
| 20 | A brief history | `elkhart-living-history.jpg` | ◇ |
| 21 | What Lisa sees working this market | `elkhart-living-why-lisa.jpg` | ⛔ ◇ |
| 22 | Thinking about Elkhart? (closing CTA) | `elkhart-living-cta-closing.jpg` | ◇ |

**`faq-item--media` — 5 files** (page order; the manifest omits #24)

| # | Live FAQ question | Filename | Risk |
|---|---|---|---|
| 23 | What is Elkhart, Indiana known for? | `elkhart-living-faq-known-for.jpg` | |
| 24 | What school district serves Elkhart, Indiana? | `elkhart-living-faq-school-district.jpg` | |
| 25 | What is downtown Elkhart like? | `elkhart-living-faq-downtown.jpg` | ★ |
| 26 | What industries and employers are in Elkhart? | `elkhart-living-faq-employers.jpg` | |
| 27 | What landmarks and amenities does Elkhart have? | `elkhart-living-faq-landmarks.jpg` | |

**27 photographs. 16 `section-figure`, 11 `faq-item--media`.**

---

## 7. The four high-risk slots — twins of the rejected Goshen assets

Lisa named these four as the Elkhart counterparts of the four Goshen files
rejected on 29 July for not being her photography. Checked each one:

| Elkhart filename | In manifest? | Wired to any page? | File on disk? | Rejected Goshen twin |
|---|---|---|---|---|
| `elkhart-living-why-lisa` | Yes, row 137 | **No** | **No** | `goshen-living-why-lisa` |
| `elkhart-moving-cta-closing` | Yes, row 125 | **No** | **No** | `goshen-moving-cta-closing` |
| `elkhart-moving-faq-moving-from-out-of-state` | Yes, row 122 | **No** | **No** | `goshen-moving-faq-moving-from-out-of-state` |
| `elkhart-moving-location-commute` | Yes, row 112 | **No** | **No** | `goshen-moving-location-commute` |

**Confirmed: none of the four has a file wired.** No `.html` file in the repo
references any of them in any variant (`.jpg`, `.webp`, `-thumb`, `-header`), and
no file exists under `assets/images/elkhart/` or `assets/images/sections/`. That
is unsurprising — all four Elkhart pages are at zero section and zero FAQ images
— but it was checked per slug rather than inferred from the page totals.

They are flagged **⛔** at #1, #8, #12 and #21 in the shot list. Why they are
high-risk rather than merely noted:

- **The Goshen four were rejected as a set for one reason** — they were composite
  graphics with circular photo insets, not photographs. The Elkhart four are the
  same four slots. If the same source produced an Elkhart set the same way, these
  are the four that would come back the same way.
- **All four are abstract titles**, which is very likely *why* they were
  composites: "Where Elkhart sits, and what that means for getting around,"
  "What Lisa sees working this market," and a closing CTA have no literal
  subject, so a graphic is the easy answer. A real photograph is the harder and
  correct one.
- **The Goshen precedent is that a photograph does work here.** Lisa solved the
  same problem on `/moving-to-goshen/` with representative shots: herself beside
  a downtown sign for "What it costs to live here," beside a RE/MAX sign in
  winter for "The honest trade-offs," a downtown intersection for "Goshen or
  Elkhart?" None needed a graphic.
- **These four are not on the rejected list and must not be added to it.**
  `content/source/rejected-assets.txt` holds the four *Goshen* slugs only. The
  Elkhart slots are ordinary empty slots awaiting a photograph — not deliberate
  gaps. Recording them as rejected would freeze four slots that Lisa can simply
  shoot.

**Practical suggestion:** shoot these four first. If any comes back as a graphic
rather than a photograph, that is known before the other 23 are processed rather
than after — the ordering failure that cost the Goshen run several rounds.

---

## 8. Abstract titles needing Lisa's ruling

Nine titles have no literal photographic subject (marked ◇ above). Precedent is
split, and both branches are legitimate:

- **Representative photo** — how Goshen handled every abstract body section.
- **Intentionally image-free** — `/living-in-goshen/`'s "Where people work" has
  no slot and no image, by choice.

| # | Title | Suggested direction |
|---|---|---|
| 1 | Where Elkhart sits, and what that means for getting around | A road, bridge, or river-crossing view that reads as "getting around." No street signs naming other cities — those invite service-area drift. |
| 5 | What it costs to live here | Goshen used Lisa in a downtown setting. Same approach transfers. |
| 6 | The honest trade-offs | Goshen used Lisa beside a RE/MAX sign. Same. |
| 7 | Elkhart or Goshen? | Goshen used a downtown intersection. An Elkhart streetscape is the mirror. |
| 11 | What does it cost to live in Elkhart, Indiana? | Needs to differ visibly from #5 — same topic, same page, two slots. |
| 15 | The city at a glance | A wide establishing view — the closest thing to a literal shot in this group. |
| 20 | A brief history | A historic building or the railroad. Describe only what is visible: no dates, no architectural style, no material claims. Two Goshen strings had to be corrected for exactly that. |
| 21 | What Lisa sees working this market | Lisa on location. ⛔ |
| 8 / 22 | The two closing CTAs | Goshen used a warm Lisa-on-location shot. The two must differ from each other — one per page. |

None of these is blocked. Each needs a one-word ruling: **shoot** or **skip**.
A skip is cheap to record — the slot simply carries no image, as
`/living-in-goshen/` already does — but it must be recorded as a decision, or a
later session reads it as the oversight it isn't.

---

## 9. Not done, on purpose

Phase 0 is report-only, and these are Lisa's calls:

- Manifest not edited (missing FAQ row; the 56).
- `docs/EN_ES_DIVERGENCE_INVENTORY.md` line 84 not rewritten — it needs
  Decision 1 first, since the fix depends on which option Lisa picks.
- The stale comment at `es/viviendo-en-elkhart/index.html:245` not touched.
- The stale `/es/comunidades/elkhart/` line in `CLAUDE.md` not touched.
- No image processed, wired, renamed, or generated. Phases 1–6 not started.

## 10. What Phase 1 needs from Lisa

1. **Sign-off on the 27-photograph shot list in §6** — the gate on the shoot.
2. **Decision 1** — Spanish Living FAQ: A, B, or C. Only C changes the 27.
3. **Decisions 2 and 4** — shoot or skip, for the four ⛔ slots and the nine ◇
   titles.
4. **Decision 3** — approve the two manifest corrections.

Everything in §§1–4 is measured and will not move. The only number that can
still change is 27 → 30, and only under Option C.
