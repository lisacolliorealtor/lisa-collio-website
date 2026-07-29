# Verify-Current-Details Disclaimer — shared component (EN + ES)

*Prepared for Lisa Collio, Real Estate Agent · 29 July 2026*

**STATUS: APPROVED BY LISA — 29 July 2026.**
**Managing Broker sign-off: deferred to the end-of-phase batch, per Lisa's
standing workflow. Not sought for this item.**

Lisa confirmed on approval that the "no business has paid to appear" line is
factually accurate.

---

## Why this exists

The compliance checklist in `CLAUDE.md` bars specific business, restaurant, and
shop names on evergreen pillar pages, permitting them only on *"dated blog
articles carrying a verify-current-details disclaimer."*

That disclaimer did not exist anywhere in the repository. Four articles relied
on an exemption whose condition was never built, and the articles carried no
visible publication date either — so neither half of "dated … carrying a
disclaimer" was satisfied.

This component supplies both: the disclaimer text, and the publication date
rendered in the disclaimer itself.

## The approved wording

**English** — `components/verify-details.html`

> Local details change. The businesses, hours, events, and prices described in
> this article were accurate when it was published on {{published}}. Confirm
> current details with the business or organizer before you go. Mentions here
> are descriptive, not endorsements, and no business has paid to appear.

**Spanish** — `components/verify-details-es.html`, written natively in usted
register rather than translated

> Los detalles locales cambian. Los negocios, horarios, eventos y precios que se
> describen en este artículo eran correctos cuando se publicó, el {{published}}.
> Confirme los detalles vigentes con el negocio o el organizador antes de ir.
> Las menciones son descriptivas, no recomendaciones, y ningún negocio pagó por
> aparecer aquí.

Three things the wording does deliberately:

1. **Dates the article in visible copy,** not just in schema. `{{published}}` is
   supplied per page, so the date is accurate to each article rather than
   generic.
2. **Puts the burden of currency on the reader's own check** — "confirm with the
   business or organizer before you go" — which is what makes a stale mention
   harmless.
3. **Disclaims endorsement and payment.** A named business in an agent's content
   can read as a referral relationship; the last clause forecloses that reading.

## How it is applied

Same single-source partial system as the header and footer. In a page:

```html
  <!-- build:verify-details {"published": "July 24, 2026"} -->
  <!-- endbuild:verify-details -->
```

then `npm run build`. Editing `components/verify-details.html` and rebuilding
updates every article at once. The injection is idempotent — re-running changes
nothing.

Spanish articles use `verify-details-es` with a Spanish-formatted date
("24 de julio de 2026").

## Currently applied to

| article | component | published |
|---|---|---|
| `/blog/community/things-to-do-in-goshen-indiana/` | `verify-details` | July 24, 2026 |
| `/blog/community/things-to-do-in-elkhart-indiana/` | `verify-details` | July 25, 2026 |
| `/blog/spanish/que-hacer-en-goshen-indiana/` | `verify-details-es` | 24 de julio de 2026 |
| `/blog/spanish/que-hacer-en-elkhart-indiana/` | `verify-details-es` | 27 de julio de 2026 |

These are the only four articles that name retail or dining businesses. Checked
across all 118 blog articles: the downtown and community-events articles name
only venues, institutions, and events, which the rule does not reach.

## Standing rule for future articles

**Any blog article that names a specific business, restaurant, or shop must
carry this component, with its own publication date.** Evergreen pillar pages
must not name them at all, with or without the disclaimer — the exemption is for
dated articles only.

"Future articles inherit it" holds for the *wording* automatically: one edit to
the component updates every article carrying it. It does not hold for
*placement* — a new article still needs its marker pair added.

**That gap is now closed mechanically** (Lisa's decision, 29 July 2026).
`audit.js` check 13 enforces both halves of the rule and fails the run on either:

- an **evergreen page** naming any listed business — those names belong only on
  dated blog articles;
- a **blog article** naming one **without** the `build:verify-details` marker.

The name list lives in `content/source/retail-business-names.txt`, editable
without touching JavaScript. Adding a business is one line plus `npm run audit`,
which then names the file that needs the marker.

**The check narrows human review; it does not replace it.** Four real business
names are deliberately absent from the list because they are ordinary words that
would fire on innocent prose — "Found" (the verb), "Artisan" (used
adjectivally), "Sprocket", and "The Depot". They remain subject to both rules and
remain a human-review item. The exclusions and the reason for each are recorded
in the header of the list file, so the next reader does not mistake absence for
oversight.
