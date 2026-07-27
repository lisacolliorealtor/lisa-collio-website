# Lisa Collio Website Master Plan — v2.9 Addendum

*Prepared for Lisa Collio, Real Estate Agent · July 2026*
*Supersedes v2.8. This addendum contains only what changed — insert into the full Master Plan document at the section markers noted below, and update the version banner at the top of the file to "Version 2.9 · July 2026 — supersedes v2.8."*

**STATUS: APPROVED BY LISA — July 25, 2026. CLEARED TO BUILD NOW.**

---

## Insert into § 8. Page Standards, as a new subsection immediately after "Pre-publish gate"

## Bilingual FAQ + Authority Article Cluster Standard (NEW in v2.9)

Any page cluster built as "pillar page + FAQ + full authority articles + matching Spanish twin" — the pattern used for the Goshen and Elkhart community clusters — follows `V1_0_Bilingual_FAQ_Authority_Article_Playbook_Lisa_Collio.md` in full, not just this section's summary. That document is the authoritative build procedure, derived from the full Elkhart/Goshen cluster build session (July 2026) and every regression it surfaced. Key locked rules from it, restated here for visibility:

- **English and Spanish ship in the same PR.** A page is not "done" with only its English half built. If Spanish must lag for a real reason, the gap is logged immediately in a tracked divergence document (see `docs/EN_ES_DIVERGENCE_INVENTORY.md` as the precedent), not discovered later by audit.
- **FAQ visible copy and FAQPage schema must be word-for-word identical**, verified programmatically (`npm run check` or equivalent), on both language versions.
- **Every fact appearing on more than one page traces to `docs/VERIFIED_FACTS.md`** (or successor canonical facts file) as its single source of truth — never independently restated from memory across multiple approved documents.
- **Approved content is committed to `docs/approved-copy/` the moment it's used to build anything live** — an uploaded-but-uncommitted draft is not a valid source for a future rebuild and cannot be audited.
- **hreflang pairing, sitemap entries, and `/sources/` (`/es/fuentes/`) citations ship in the same PR as the content**, not as follow-up work.
- **One PR per discrete unit of work**, opened promptly rather than accumulating multiple units of work on one long-lived branch.

---

## Insert into § 19. Companion Document Registry

Add row: **V1_0_Bilingual_FAQ_Authority_Article_Playbook_Lisa_Collio.md** — governs any FAQ+authority-article+Spanish-twin cluster build (§8). Evergreen reference, not a one-time task file.

Add row (once created): **docs/VERIFIED_FACTS.md** — canonical single-source-of-truth facts file referenced by §8's cluster standard. Lives in the repo, not the Project files, since it's consulted by build tooling directly.

---

## Insert into § 20. Version History

## v2.9 — July 2026

- **Bilingual FAQ + Authority Article Cluster Standard added (§8, NEW).** Codifies the build procedure derived from the Elkhart/Goshen community cluster session — same-PR bilingual shipping, FAQ/schema sync verification, canonical facts file, commit-on-use discipline for approved content, and one-PR-per-unit-of-work. Full detail lives in the companion playbook document, added to the registry (§19).
- **`CLAUDE.md` self-reference corrected from a hardcoded version number to "mirrors the highest-numbered Master Plan version in Project files"** — self-updating going forward, closing the drift that had left it citing v2.5 while the Project's approved docs had moved to v2.8.
- **No architecture, identity, or compliance-rule changes in this version** beyond the new §8 subsection — everything else in v2.8 carries forward unchanged.

---

## Recommended immediate action

Send this addendum to Claude Code with instructions to fold it into the full Master Plan file at the three marked insertion points, bump the version banner, and confirm the registry and version-history sections render correctly. Once confirmed, this becomes the canonical v2.9 and this addendum file can be retired per the usual "highest-numbered version governs" rule.
