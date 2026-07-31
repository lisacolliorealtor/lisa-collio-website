# Federal Fair Housing Act — Website Compliance Reference
**For use by Claude Code when building/editing lisacolliorealtor.com and drafting articles**
Governing law: Title VIII of the Civil Rights Act of 1968, as amended ("Fair Housing Act," 42 U.S.C. § 3601 et seq.)

> Companion to **IREC-Website-Compliance-Reference.md** (Indiana state law) and the current Website Master Plan (always the highest-numbered version in the repo). That file already covers Indiana's Fair Housing statute (IC 22-9.5) and advertising rules (876 IAC 8-1-8). This file summarizes the *federal* FHA specifically, since federal and state protected classes aren't identical and federal advertising rules apply regardless of state. Keep both files in Project Knowledge. Not legal advice — for anything ambiguous, confirm with Lisa's managing broker or a fair housing attorney.
>
> **[Repo audit note, 31 July 2026, updated same day.]** This line originally hardcoded `Lisa_Collio_Website_Master_Plan_v2_1.docx`. Reworded to a version-agnostic reference (per Lisa, 31 July 2026) so this citation can't go stale again as the Master Plan bumps — mirrors the pattern CLAUDE.md's own header already uses for the same reason. Separately, the EHO checklist item below cited "Master Plan §2/§18" — verified against the current Master Plan (v2.15): §2 (Identity Block) contains no Equal Housing content at all; the locked footer stack's EHO line actually lives in §8, and §18 (the approved legal set) is correctly cited per the Master Plan's own §19 retirement note. Corrected to §8/§18.

---

## 1. Protected Classes Under Federal Law

The FHA prohibits discrimination in housing based on:
- **Race**
- **Color**
- **Religion**
- **Sex** (includes sexual orientation and gender identity per current HUD interpretation)
- **National origin**
- **Familial status** — defined as anyone under 18 living with a parent/guardian, plus pregnant people and those securing custody of a minor (Sec. 802(k))
- **Handicap/disability** — physical or mental impairment substantially limiting a major life activity, a record of such an impairment, or being regarded as having one (Sec. 802(h))

**Note:** Indiana's state law (IC 22-9.5, covered in the IREC file) adds **ancestry** as a protected class beyond the federal list. When in doubt, apply the broader/stricter standard.

---

## 2. The Core Website Rule — Sec. 804(c), Discriminatory Advertising

This is the single most relevant provision for a website. It is unlawful to **make, print, publish, or cause to be published** any notice, statement, or advertisement regarding the sale or rental of a dwelling that:
- Indicates any **preference, limitation, or discrimination** based on a protected class, or
- Indicates an **intention** to make such a preference, limitation, or discrimination.

This applies to listing descriptions, neighborhood/market blog content, social captions, photo selection, and any AI-generated copy — intent doesn't matter; the *effect* of the words is what's regulated.

**Practical rules for Claude Code:**
- Describe the **property**, never the type of person who should live there. ("Fenced yard, 4 bedrooms" ✅ — "great for a growing family" ⚠️)
- No steering language: "quiet retirees," "walking distance to [specific church]," "safe neighborhood," "ideal for a couple," "no kids" — all prohibited, even when meant as a compliment.
- No coded language around disability: don't frame accessibility features as a downside or a plus tied to a specific group ("not wheelchair friendly" as a warning implies exclusion — describe stairs/layout factually instead).
- Photo/imagery choices on the site should not consistently exclude or imply exclusion of any protected group.
- This applies to every page, not just listings — "About the area" content, school-district mentions, and lifestyle blog posts are all covered.

---

## 3. Other Prohibited Practices Relevant to a Real Estate Website — Sec. 804

- **804(a)** — Refusing to sell/rent, or making a dwelling unavailable, because of a protected class.
- **804(b)** — Discriminating in terms, conditions, or services connected to a sale/rental because of a protected class.
- **804(d)** — Falsely telling someone a dwelling isn't available because of their protected class ("phantom availability").
- **804(e)** — **Blockbusting**: profiting by suggesting a neighborhood's racial/religious/etc. composition is changing to induce a sale. Relevant if any blog content ever discusses neighborhood demographic change — this content type should be avoided entirely.
- **804(f)** — Disability-specific: refusing reasonable modifications/accommodations. Not typically a website copy issue, but any FAQ language about accessibility requests should stay neutral and point to Lisa/the brokerage rather than making policy statements.

---

## 4. Familial Status — Sec. 802(k), Sec. 807(b)

- Can't limit or express a preference against households with children under 18, pregnant occupants, or those gaining custody of a minor.
- **Exception:** legitimate "housing for older persons" (55+/62+ communities) is exempt if it meets HUD's verification requirements (Sec. 807(b)(2)–(3)). This exemption applies to specific *communities*, not to how Lisa writes general marketing copy — the site should never imply a general preference for or against families with kids outside of a documented 55+/62+ listing.

---

## 5. Brokerage Services — Sec. 806

Unlawful to deny access to MLS, brokers' organizations, or related services based on a protected class. Not a direct website-copy issue, but relevant if the site ever describes referral networks or professional affiliations — no exclusionary framing.

---

## 6. Coercion/Interference — Sec. 818

Unlawful to coerce, intimidate, threaten, or interfere with anyone exercising a fair housing right. Relevant mainly to business conduct rather than copy, but reinforces that testimonials or content shouldn't ever be framed in a way that discourages a protected class from inquiring.

---

## 7. Quick Pre-Publish Checklist — Federal Layer

Run this in addition to the Indiana checklist already in IREC-Website-Compliance-Reference.md:

- [ ] Does the copy describe the **property/features**, not the ideal occupant?
- [ ] Any language coding for race, religion, national origin, sex, familial status, or disability — even subtly ("perfect for," "ideal for," "quiet," "safe," "walk to church")?
- [ ] Does any neighborhood/market content reference demographic change or composition? (Remove — blockbusting risk.)
- [ ] Do photos/captions represent a range of people rather than implying a target demographic?
- [ ] If the content touches accessibility, is it factual and neutral rather than framed as an exclusion?
- [ ] Is an Equal Housing Opportunity statement/logo present in the site footer? *(Recommended — implemented via the approved legal set and locked footer stack: `Lisa_Collio_Legal_Pages_APPROVED_2026.docx` + Master Plan §8/§18. The legacy `disclamers.docx` is retired.)*

---

## Sources
- Fair Housing Act, Title VIII of the Civil Rights Act of 1968, as amended (42 U.S.C. § 3601 et seq.) — full text as uploaded to this project.
- HUD guidance on advertising and the FHA: https://www.hud.gov/program_offices/fair_housing_equal_opp/fair_housing_act_overview
- Cross-reference: `IREC-Website-Compliance-Reference.md` (Indiana state law layer — IC 22-9.5, 876 IAC 8-1-8)

*Compiled July 16, 2026. Federal HUD interpretive guidance (e.g., on sex discrimination scope) can shift with administration policy — recommend a periodic check against HUD's current guidance page.*
