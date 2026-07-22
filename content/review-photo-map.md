# Client-Reviews Photo → Reviewer Pairing Map

Final `assets/images/client-reviews/` filenames, the reviewer each photo belongs
to, and the locked pairing notes. **Load-bearing for later PRs** — these final
names are referenced by the page builds.

**Synced to review source v3.3 (late July 2026):**
- **Raiza Sandoval:** full review text captured — quotable in full wherever her
  card appears (confirmed first-time buyer; strong fit for /buyers/):
  "I just wanted to thank you for all your help in buying my first home. Your
  support and guidance made the whole process so much easier and less stressful.
  I truly appreciate your dedication and professionalism.
  Thanks again for everything!"
- **Amilcar Villatoro:** confirmed 5 stars with NO written review text (that IS
  the review, not a capture gap). His two photos may only ever appear as
  photo-only star-rating cards — image + name + ★★★★★ — never with a quote.

## Card-display rules (PR 9, sitewide)

- A review with no paired photo renders as a **text-only quote card**
  (`review-card--textonly`) — never an empty/placeholder image box.
- A client photo with no quotable review text on that page renders as a
  **photo-only star card** (`review-card--photoonly`) — image + name + star
  rating, no quote, no quotation styling.

## Locked pairing rules (from Lisa)

- A client photo appears **only** with that same client's own verbatim review —
  never next to anyone else's review text.
- **Yesica Rivera & Mickel Izaguirre** are married — shared photo, may appear with
  either spouse's review.
- **Gabriela Morazan & fitness_pacojf** are married — couple photos, may appear
  with either spouse's review.
- **Natalie Tiscareno's** photo shows her parents.
- Lenders **Sergio Gomez**, **Lucia Sanchez**, and **Zachary Fletcher** get **NO
  photos ever** (their review text may still be used per the reviews rules).
- Names display exactly as they appear on Google — e.g. "Anidem" and
  "EliteGodGamer" stay as-is.

## Pairing table

| Final filename (`.jpg` + `.webp`) | Reviewer | Pairing notes |
| --- | --- | --- |
| review-eber-trejo-1.jpg | Eber Trejo | photo 1 of 2 |
| review-eber-trejo-2.jpg | Eber Trejo | photo 2 of 2 |
| review-fitness-pacojf.jpg | fitness_pacojf | married to Gabriela Morazan — couple photo, either review |
| review-dany-villatoro.jpg | Dany Villatoro | |
| review-ana-gabriela.jpg | Ana Gabriela | |
| review-cindy-ortiz-1.jpg | Cindy Ortiz | photo 1 of 2 |
| review-cindy-ortiz-2.jpg | Cindy Ortiz | photo 2 of 2 |
| review-maria-baltazar.jpg | Maria Baltazar | |
| review-natalie-tiscareno.jpg | Natalie Tiscareno | photo shows her parents |
| review-elitegodgamer.jpg | EliteGodGamer | Google display name — keep as-is |
| review-raiza-sandoval-1.jpg | Raiza Sandoval | photo 1 of 2 |
| review-raiza-sandoval-2.jpg | Raiza Sandoval | photo 2 of 2 |
| review-steven-jackniell-1.jpg | Steven Jackniell | photo 1 of 2 |
| review-steven-jackniell-2.jpg | Steven Jackniell | photo 2 of 2 |
| review-janet-aguilar.jpg | Janet Aguilar | |
| review-cristina-larreinaga.jpg | Cristina Larreinaga | |
| review-valerie-smith.jpg | Valerie Smith | (source file `review-val`) |
| review-leani-lopez-1.jpg | Leani Lopez | |
| review-francisco-collio.jpg | Francisco Collio | |
| review-doug-deter.jpg | Doug Deter | |
| review-suhail-sanchez.jpg | Suhail Sanchez | (source file misspelled "Shuail") |
| review-gabriela-morazan.jpg | Gabriela Morazan | married to fitness_pacojf — couple photo, either review |
| review-liz-y-beto.jpg | Liz y Beto | couple |
| review-yesica-rivera.jpg | Yesica Rivera | married to Mickel Izaguirre — shared photo, either review |
| review-naun-cerrato.jpg | Naun Cerrato | already correctly named |
| review-auner-jimenez.jpg | Auner Jimenez | already correctly named |
| review-amilcar-villatoro-1.jpg | Amilcar Villatoro | photo 1 of 2 — ★-only review: photo-only star card, never a quote (v3.3) |
| review-amilcar-villatoro-2.jpg | Amilcar Villatoro | photo 2 of 2 — ★-only review: photo-only star card, never a quote (v3.3) |
| review-noel-trejo.jpg | Noel Trejo | already correctly named |
| review-leyla-verde.jpg | Leyla Verde | already correctly named |
| review-lourdes-peay.jpg | Lourdes Peay | web-safe normalized (had a stray space) |

## Deleted (no photo permission — do not restore)

| Removed file | Reviewer | Reason |
| --- | --- | --- |
| review-jordi-b-*.jpg | Jordi B | no photo permission (none found in repo) |
| review-yaquelin-lozano.jpg | Yaquelin Lozano | no photo permission — deleted on sight |

## Lenders — NO photos, ever

Sergio Gomez · Lucia Sanchez · Zachary Fletcher. (Sergio Gomez lender photos are
additionally on HOLD pending RESPA co-marketing clearance; review text usable.)
