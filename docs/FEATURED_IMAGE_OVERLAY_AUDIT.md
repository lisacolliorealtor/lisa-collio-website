# Featured-image text-overlay audit — RESOLVED

**Status: remediation complete. PR #71 merged to `main` 27 July 2026 (commit
`aac21e5`); the image work is live.** Three follow-ups reached the branch after
that merge and need their own PR: the `/assets/` caching fix, `npm run
check:images`, and this document's Section 13 approval records.
Audit produced 27 July 2026 per step 1 of
`docs/drafts/V1_0_Claude_Code_Instructions_Text_Overlay_Exception_Lisa_Collio.md`
and the Featured-Image Standard in Master Plan v2.10 (§8, Images); remediated
27 July on Lisa's decisions, recorded below.

**One item is deliberately left open** — a consent-recordkeeping gap unrelated to
image styling (last section). It does not block the image work.

## The rule

Text overlay **and** Lisa's cutout portrait on blog/article featured images are a
scoped exception, kept only for `/buyers/`, `/sellers/`, `/es/compradores/`,
`/es/vendedores/` and the authority articles linked from those four hubs.
Every other page and article — both languages — carries a clean photo with
nothing overlaid: no text, no cutout. The title renders as normal HTML.

This does **not** touch the Tier 1 page-hero component, which layers real HTML
text over a photo and was never a baked-in-text image.

## Final state

| | Slugs | Files |
| --- | --- | --- |
| Generated featured images in `assets/images/blog-headers/` | 89 | 356 |
| **In scope — overlay retained** | **37** | 148 |
| **Out of scope — cleaned** | **52** | 208 |
| Out of scope — outstanding | **0** | 0 |

`OVERLAY_SCOPE` (37) and `CLEAN_JOBS` (52) partition all 89 slugs with no overlap
— asserted, not assumed.

Scope moved from 35 to 37 slugs: Lisa added `sell-home-elkhart-indiana-best-price`
to `/sellers/` and its Spanish twin `como-vender-casa-elkhart-mejor-precio` to
`/es/vendedores/` (decision 2), which brings both into the exception.

**Verified against the pushed branch, not a working tree, over every file
variant.** All 178 `.jpg` files — `-header`, `-thumb`, and any `-og` — were
extracted from `origin/claude/website-master-plan-v2-10-4ju9ok` with
`git cat-file` and scanned for a RE/MAX Blue or Red band at their top, middle and
bottom edge: **37 in-scope slugs carry their band, 52 out-of-scope slugs carry
none, zero exceptions.** All 187 distinct blog-headers references across the 162
HTML files resolve to a file that exists. Dimensions checked too (1200×630
header, 800×420 thumbnail, `.webp` beside each `.jpg`), and all were reviewed
visually on contact sheets for framing.

> **Why "every variant" is called out.** An earlier verification pass scanned
> only `-header.jpg` and reported "0 outstanding" on that basis, leaving the
> `-thumb.jpg` files — the ones hub-page FAQ cards actually render — unverified.
> The thumbnails were in fact clean, because `generate_clean()` writes header and
> thumbnail in the same call from the same source photo, so they could not
> diverge. But the evidence offered didn't cover them, which is a fair thing to
> have been challenged on. `npm run check:images` now asserts this mechanically
> over every variant so the claim is checkable rather than asserted.

**The two asset variants, since they are easy to confuse:**

| File | Size | Where it is used |
| --- | --- | --- |
| `{slug}-header.jpg` | 1200×630 | The article's own hero image, plus `og:image`, `twitter:image` and the schema `image` field |
| `{slug}-thumb.jpg` | 800×420 | Hub-page FAQ cards and blog-hub cards only — never in social or schema metadata |

Nine pages render thumbnails: `/`, `/about/`, `/buyers/`, `/sellers/`,
`/es/compradores/`, `/es/vendedores/`, `/blog/buyers/`, `/blog/sellers/`,
`/blog/relocation/`. They are not two pipelines — one `generate_clean()` call
produces both from the same photograph, and `CLEAN_JOBS` / `OVERLAY_SCOPE` key on
the slug, so both variants are always covered together.

**Reproducibility: 50 of the 52 cleaned images regenerate byte-for-byte** from
`CLEAN_JOBS` — verified by regenerating into a scratch directory and comparing
md5s against the branch blobs. The two exceptions are the `FROM_COMPOSITE` jobs
(`does-lisa-collio-speak-spanish`, `lisa-collio-helps-seniors-families-downsize`):
that path is one-way, because the clean output overwrote the composite it read.
Re-running `--clean` raises on those two rather than silently producing something
different. Their source photographs are recorded in `CLEAN_JOBS` so the framing
can be re-derived by hand if they are ever rebuilt.

The separate 1200×630 `-og` files that Templates B and C needed are redundant now
that every clean header is already OG-sized. **All 12 `-og` files are deleted**,
with `og:image` and `twitter:image` repointed at the header and the on-page
`<img>` height corrected 900 → 630 on the eight affected pages.

## Lisa's decisions, 27 July 2026

**1. The four contested articles are out of scope.** `good-time-to-buy-home-goshen-indiana`,
`what-is-an-sres-seniors-real-estate-specialist`, `buying-an-older-home-in-goshen-indiana`
and its Spanish twin `comprar-casa-antigua-goshen-indiana` — all cleaned. This
matches the evidence: the first two are Home Page set articles (the homepage FAQ
links exactly four, and its fourth was already cleaned), and the latter two are
Goshen relocation-cluster articles whose Elkhart siblings were already out.

**2. `sell-home-elkhart-indiana-best-price` comes INTO scope.** `/sellers/` was
missing a link to it while its Goshen twin `sell-home-goshen-indiana-best-price`
was linked. The link is now added as an eleventh FAQ card, the slug is added to
`OVERLAY_SCOPE`, and **its overlay image is unchanged** — it keeps Template A
with the cutout, matching its twin.

> **Approved by Lisa, 27 July — no changes.** Section 13 status: **Lisa
> (licensed agent) approved; managing-broker sign-off still pending** — per her
> standing workflow the broker signs off once at the end of the whole site
> build, not per PR. The card required new FAQ copy.
> The question mirrors the article H1 exactly; the answer is drawn from the
> article's own opening paragraph so every fact traces to the page, per the §8
> cluster standard.
>
> **Q.** How do I sell my home in Elkhart, Indiana for the best price?
> **A.** Price it right the first time, prepare and present it professionally, and
> market it to the widest possible pool of qualified buyers. Lisa builds that
> strategy with sellers up front — with data, not guesswork.

**2b. The Spanish mirror gap is CLOSED — both languages now ship together.**
`/es/vendedores/` had the same omission: it linked `vender-casa-goshen-mejor-precio`
but not the Elkhart twin. Closed in full, at parity with the English side:

- **Featured image generated** for `como-vender-casa-elkhart-mejor-precio`, which
  had none at all. Template A, same source photograph as its English twin
  (`homes-general/interior-kitchen-dark-cabinets-island.jpg`), continuing the
  `/es/vendedores/` rotation exactly: the existing ten run a clean four-cycle
  (red+right → blue+right → red+left → blue+left), so position eleven is
  **red + cutout left**. Title text matches the Spanish H1 character for
  character, and the font was checked for every glyph in it — `¿`, `ó` — before
  compositing. The band does not touch Lisa's face. Header plus 800×420
  thumbnail, `.webp` beside each.
- **Article markup added**: `og:image` (+ width/height/alt), `twitter:card` and
  `twitter:image`, the BlogPosting `image` field, and the on-page
  `<img class="blog-featured">` — matching its Spanish sibling exactly.
- **FAQ card added** to `/es/vendedores/` as the eleventh item, same structure as
  the English card.
- **Slug added to `OVERLAY_SCOPE`.**

> **Approved by Lisa, 27 July — no changes.** Reviewed and approved separately
> from the English card, as its own piece of copy rather than as a translation
> of an already-approved answer. Section 13 status: **Lisa (licensed agent)
> approved; managing-broker sign-off still pending**, per her standing workflow
> in which the broker signs off once, comprehensively, at the end of the whole
> site build — so neither this card nor the English one carries broker approval
> yet, and neither claims to.
>
> **Written natively, not translated.** Per the Volume 37 rule, this is a
> cultural adaptation drafted from the Spanish article's own body, in usted
> register — not a rendering of the English answer.
> Its three elements are exactly the three the Spanish article itself sets out
> ("un precio basado en datos reales", "presentación cuidada", "alcance a más
> compradores"), so every claim traces to the page it sits on.
>
> **P.** ¿Cómo vendo mi casa en Elkhart, Indiana para el mejor precio?
> **R.** Con tres cosas trabajando juntas: un precio basado en ventas recientes y
> verificadas de casas similares en su zona, una presentación cuidada que muestre
> su casa en su mejor forma, y promoción ante compradores que hablan inglés y
> español. Más interés genuino generalmente se traduce en mejores condiciones
> para usted.

**Parity verified after the change:** `/sellers/` and `/es/vendedores/` each carry
11 FAQ cards and 11 schema Questions; each hub links its twin; both articles carry
`og:image`, the schema `image` field, a `blog-featured` img, three hreflang links
and a sitemap entry. `npm run hreflang -- --check` reports 67 pairs and 0 pending
changes. Neither article needs a `/sources/` or `/es/fuentes/` citation — the
English twin has none either, so the pair stays symmetric. The `/blog/spanish/`
hub cards carry no thumbnails for any article, so none was added.

**3. The Goshen pillars swap to a decorative photo.** `/moving-to-goshen/` and
`/es/mudarse-a-goshen/` were the only two out-of-scope images sourced from an
address folder (a specific identifiable sold property) rather than
`homes-general/`. Both now use
`assets/images/homes-general/exterior-open-acreage-field-trees.jpg` — an open
field with no house, no address, no signage. Alt text updated in both languages
to describe the new photograph. This sidesteps the consent question rather than
attempting to verify it.

## How the images were rebuilt

Every clean image was generated from an **original source photograph**, never by
flattening a text-bearing composite. Source, focal point and crop for all 48 are
recorded in `CLEAN_JOBS` in `scripts/generate-featured-images.py`;
`python3 scripts/generate-featured-images.py --clean` reproduces the whole set.

Sources were identified by pixel-matching each composite's photo region against
every image in the repo, with the cutout area masked out — not guessed from
filenames. 43 of the 45 Template A images turned out to have been built from
clean decorative photos already in `assets/images/homes-general/`, which is why
**no reshoot was needed for any of them.**

Two exceptions, both Meet Lisa Template B images (`does-lisa-collio-speak-spanish`,
`lisa-collio-helps-seniors-families-downsize`): their original framing was a
hand-made crop that could not be reliably re-derived. For these the photo region
was taken from the Template B composite itself. That is sound here and only here
— in Template B the colour band sits *below* the photo and never overlaps it, so
that region is the untouched photograph rather than a flattened overlay. The
`generate_clean_from_composite()` helper enforces the 1200×900 Template B shape
and refuses anything else. Their source photos are noted in `CLEAN_JOBS` for a
future higher-resolution redo.

Four slugs previously had no thumbnail at all — `living-in-elkhart-guide`,
`moving-to-elkhart`, `mudarse-a-elkhart`, `viviendo-en-elkhart`. They have one
now, generated from the same clean photo, so the set is uniform.

## Two source photos still worth a reshoot

Cleaned correctly, but the crops are a workaround rather than an ideal photo,
because the **source photographs themselves carry text**:

| Slug | Source | Issue |
| --- | --- | --- |
| `how-many-homes-lisa-collio-sold-goshen-elkhart` | `lisa/lisa-collio-remax-awards-100-club.jpg` | Three-panel collage; the right panel is a "100% CLUB / 2023 RE/MAX AWARDS" graphic. Cropped to the centre stage photo. |
| `why-clients-choose-lisa-collio` | `lisa/lisa-collio-headshot-remax-branded.jpg` | Carries a RE/MAX lockup and a "Lisa Collio REALTOR®" script logo across the top. Framed below them. |

## Two things found alongside the audit, neither needing action

- **`assets/images/lisa/lisa-collio-avatar.jpg`** is a branded illustrated avatar
  with heavy baked-in text. It is **not referenced by any page, stylesheet, or
  script**, so it is not a live featured image and the rule does not reach it.
- **`assets/images/client-reviews/review-ana-gabriela.jpg`** has a solid blue bar
  along its bottom edge — letterbox padding from the source crop, not an overlay.
  Cosmetic only; worth fixing whenever that photo is next touched.

Every image in `assets/images/` was scanned for a full-width RE/MAX Blue or Red
band. Those two were the only hits outside `blog-headers/`.

## The two confirmations the instructions asked for

**1. Goshen/Elkhart section/FAQ image slots will receive clean photos.**
`V1_0_Goshen_Elkhart_Image_Filenames_Lisa_Collio.md` is **not in this repo and
was not supplied**, so the ~56 planned filenames could not be checked one by one.
What is confirmed: those pillar pages carry no section or FAQ images today, so
every one will be new; and the overlay functions now raise on any slug outside
`OVERLAY_SCOPE`, so `generate_clean()` is the only path available to them. Send
the filenames document and it can be checked name by name.

**2. The Buyers/Sellers/Compradores/Vendedores pipeline is untouched.**
Templates A/B/C, the four-variant rotation (`VARIANTS` / `variant_for`), the
title-matches-H1 rule and the never-over-a-face rule are unchanged. The only edit
to those functions is a single scope-guard call at the top of each. No in-scope
image was regenerated, including `sell-home-elkhart-indiana-best-price`, which
keeps the overlay it already had.

---

# OPEN — repo-hygiene item (not an image-standard issue)

**Two sold-property address folders hold a byte-identical photo set, so their
consent records are ambiguous.**

It is not one stray file. `assets/images/homes-goshen/22893-county-road-42-goshen-in-46526/`
and `assets/images/homes-goshen/715-lincolnway-e-goshen-in-46526/` contain the
**same six photographs, byte for byte** — every file in one has an identical twin
in the other:

| File | md5 |
| --- | --- |
| `001_dsc02300.jpg-twilight_551.jpg` | `499fdb0fe7187ece9b64bbabcd8683c9` |
| `008_dsc02104_887.jpg` | `2ebd72e8a62326127913c58665e97040` |
| `013_dsc02124_527.jpg` | `6fdf89fca11268fdb4024a66fe0ed3f2` |
| `023_dsc02194_824.jpg` | `01354c6cf44e65cdf4944aafa9671c31` |
| `037_file_4997.jpg` | `6d501d9f7780a404c4846e1ed83e151e` |
| `040_2_dji_0293_156.jpg` | `87c58d29a2445147e6730ef702bd39bf` |

One of the two folders is a wholesale mis-copy of the other. Which one is
correct cannot be determined from the repo.

**Why it matters.** `assets/images/homes-goshen/README.md` states: *"Sold-property
photos, one folder per address. Address folders may be used in 'Sold by Lisa'
framing (seller consent + broker approval on file, July 2026)."* **The folder
name is the consent record.** With one property's photo set sitting under two
addresses, there is no reliable way to say which seller consented to which
photographs — which is the whole point of the per-address structure under
876 IAC 8-1-8(f).

**Nothing live is affected.** Neither folder is referenced by any page: they have
no `card-photo.jpg`, and the only `homes-goshen/` image used on the site is
`117-n-6th-street-goshen-in-46528/card-photo.*`. Decision 3 also moved both
Goshen pillars off this photo set, so nothing in `blog-headers/` uses it either.
This is a recordkeeping problem waiting to become a publishing one the first time
someone builds a "Sold by Lisa" card from one of these folders.

**Not touched.** Resolving it means identifying which address the photographs
actually belong to, which needs Lisa's records, not a code change.

**Two adjacent oddities noticed while checking, worth the same sweep:**
`assets/images/homes-goshen/501-danbury-dr-goshen-in-46526/` contains only a
`README.md` and no photos, and `assets/images/homes-goshen/58832-saint-marys-ln-goshen-in-46528/`
is entirely empty. A duplicate check across `homes-elkhart/` found no duplicates
there.
