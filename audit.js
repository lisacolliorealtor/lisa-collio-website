#!/usr/bin/env node
/*
 * audit.js — standing site audit, run with `npm run audit`.
 *
 * Codifies the checks in the current Audit Checklist (docs/approved-copy/,
 * always the highest-numbered `..._Audit_Checklist_Lisa_Collio.md`)
 * (Parts B and the automated-checks appendix) that a machine can settle, so
 * regressions are caught before review instead of during it. Every check here
 * exists because something actually slipped through: a school-count that said
 * "fourteen" on one page and "thirteen" on five others, blog-card blurbs left
 * pointing at retired copy, an English CTA band on 43 Spanish pages, FAQPage
 * schema on pages that rendered no FAQ.
 *
 * ERRORS fail the run (exit 1). WARNINGS report and pass — they flag drift that
 * needs a human judgement call rather than a fix.
 *
 * Judgement calls, compliance nuance, and anything needing Lisa's or the
 * broker's approval stay OUT of here on purpose. A green run means the
 * mechanical invariants hold, not that the copy is approved.
 */

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = __dirname;
const IGNORE = new Set([".git", "node_modules", "assets", "docs", "content", "scripts"]);

const errors = [];
const warnings = [];
const err = (check, msg) => errors.push({ check, msg });
const warn = (check, msg) => warnings.push({ check, msg });

function walk(dir, filter, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) {
      if (IGNORE.has(e.name)) continue;
      walk(path.join(dir, e.name), filter, acc);
    } else if (filter(e.name)) acc.push(path.join(dir, e.name));
  }
  return acc;
}

// Full-tree walk (assets included) for resolving link targets.
function walkAll(dir, filter, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) {
      if (e.name === ".git" || e.name === "node_modules") continue;
      walkAll(path.join(dir, e.name), filter, acc);
    } else if (filter(e.name)) acc.push(path.join(dir, e.name));
  }
  return acc;
}

const htmlFiles = walk(ROOT, (n) => n.endsWith(".html"));
const pageFiles = htmlFiles.filter((f) => path.basename(f) === "index.html");
const read = (f) => fs.readFileSync(f, "utf8");
const rel = (f) => path.relative(ROOT, f);
const urlOf = (f) => {
  const d = path.dirname(rel(f));
  return d === "." ? "/" : `/${d}/`;
};
const decode = (s) =>
  s.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
   .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, " ");
// Stripping an inline <a> leaves a space before punctuation ("livability , not"),
// so tidy that before comparing.
const fileFor2 = (url) =>
  path.join(ROOT, url === "/" ? "index.html" : path.join(url.replace(/^\/|\/$/g, ""), "index.html"));
const strip = (s) =>
  decode(s.replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ")
    .replace(/\s+([,.;:!?])/g, "$1")
    .trim();
// Schema answers carry no links, so they sometimes spell out a URL the visible
// copy renders as an anchor, or drop a trailing "read the full article" line.
// Treat one being a prefix of the other as a match.
const sameText = (a, b) => {
  const t = (x) => x.replace(/[.\s]+$/, "");
  const [x, y] = [t(a), t(b)];
  return x === y || x.startsWith(y) || y.startsWith(x);
};

/* 1. Sitemap parity ------------------------------------------------------- */
{
  const sm = new Set(
    [...read(path.join(ROOT, "sitemap.xml")).matchAll(/<loc>https:\/\/lisacolliorealtor\.com([^<]*)<\/loc>/g)]
      .map((m) => m[1])
  );
  // Thank-you pages are intentionally excluded (noindex conversion endpoints).
  const exempt = new Set(["/contact/thank-you/", "/es/contacto/gracias/"]);
  const pages = new Set(pageFiles.map(urlOf));
  for (const p of pages) if (!sm.has(p) && !exempt.has(p)) err("sitemap", `page not in sitemap: ${p}`);
  for (const u of sm) if (!pages.has(u)) err("sitemap", `sitemap lists a page that does not exist: ${u}`);
}

/* 2. Internal links and assets resolve ------------------------------------ */
{
  const pages = new Set(pageFiles.map(urlOf));
  const files = new Set(walkAll(ROOT, () => true).map((f) => "/" + rel(f)));
  const redirects = new Set(
    [...read(path.join(ROOT, "netlify.toml")).matchAll(/from\s*=\s*"([^"]+)"/g)].map((m) => m[1])
  );
  for (const f of htmlFiles) {
    for (const m of read(f).matchAll(/(?:href|src)="(\/[^"#?]*)"/g)) {
      const u = m[1];
      if (u === "/" || pages.has(u) || files.has(u) || redirects.has(u)) continue;
      err("links", `${rel(f)} -> ${u} (no page, file, or redirect)`);
    }
  }
}

/* 3. FAQ: visible copy and FAQPage schema must match word for word --------- */
{
  for (const f of pageFiles) {
    const s = read(f);
    // <nav class="faq-item"> is the related-articles block, not an FAQ entry.
    const visible = [...s.matchAll(/<div class="faq-item[^"]*">\s*<h3>(.*?)<\/h3>\s*<p>(.*?)<\/p>/gs)]
      .map((m) => [strip(m[1]), strip(m[2])]);
    let schema = [];
    for (const m of s.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) {
      let data;
      try { data = JSON.parse(m[1]); } catch { continue; }
      for (const node of data["@graph"] || [data]) {
        if (node["@type"] === "FAQPage") {
          schema = (node.mainEntity || []).map((q) => [
            strip(q.name || ""), strip(q.acceptedAnswer?.text || ""),
          ]);
        }
      }
    }
    if (!visible.length && !schema.length) continue;
    if (visible.length !== schema.length) {
      err("faq-sync", `${rel(f)}: ${visible.length} visible vs ${schema.length} in schema`);
      continue;
    }
    visible.forEach(([q, a], i) => {
      if (!sameText(q, schema[i][0])) err("faq-sync", `${rel(f)} Q${i + 1} text differs from schema`);
      else if (!sameText(a, schema[i][1])) err("faq-sync", `${rel(f)} A${i + 1} text differs from schema`);
    });
  }
}

/* 4. JSON-LD parses ------------------------------------------------------- */
{
  for (const f of htmlFiles) {
    for (const m of read(f).matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) {
      try { JSON.parse(m[1]); } catch (e) { err("json-ld", `${rel(f)}: ${e.message}`); }
    }
  }
}

/* 5. Locked identity rules ------------------------------------------------ */
{
  const banned = [
    [/574[.\-\s]?975[.\-\s]?0141/, "superseded phone number"],
    [/\b100\+\s+(families|homes)/i, 'superseded "100+" track-record claim'],
    [/Northern Indiana/i, '"Northern Indiana" as a service-area descriptor'],
    [/Lisa Collio Real Estate\b(?!,)/, 'business name without the locked comma'],
    [/\bREMAX\b/, 'slash-free "REMAX" in prose'],
    [/Alford/i, '"Alford-Collio" name variant'],
    // Fair Housing: ambulatory-ability phrasing was stripped sitewide (c2b0d9f)
    // and came back once via FAQ copy, so guard the term itself. Idiomatic
    // "walking into a negotiation" is fine; "walkable"/"walkability" is not.
    [/walkab/i, 'ambulatory phrasing ("walkable"/"walkability") — Fair Housing'],
  ];
  // Method brands must always carry the mark.
  const marks = ["Next Chapter Method", "Smart Move Framework", "Tu Próximo Capítulo", "Unlocking Smart Moves"];
  for (const f of htmlFiles) {
    const s = read(f);
    for (const [re, label] of banned) if (re.test(s)) err("locked-identity", `${rel(f)}: ${label}`);
    for (const brand of marks) {
      const re = new RegExp(`${brand}(?!™)`, "g");
      if (re.test(s)) err("locked-identity", `${rel(f)}: "${brand}" without ™`);
    }
  }
}

/* 6. Footer signature on every page --------------------------------------- */
{
  for (const f of pageFiles) {
    if (!/RB21002460/.test(read(f))) err("footer", `${rel(f)}: missing the locked footer signature`);
  }
}

/* 7. One language per page: no English CTA band on a Spanish page ---------- */
{
  for (const f of pageFiles) {
    const s = read(f);
    if (!/<html lang="es"/.test(s)) continue;
    if (/build:talk-to-lisa\s*-->/.test(s))
      err("bilingual", `${rel(f)}: injects the English CTA band (needs talk-to-lisa-es)`);
  }
}

/* 8. Blog index counts match reality -------------------------------------- */
{
  const idx = path.join(ROOT, "blog", "index.html");
  if (fs.existsSync(idx)) {
    const s = read(idx);
    const dirs = {
      Buyers: "buyers", Sellers: "sellers", Community: "community",
      Relocation: "relocation", "Market Updates": "market-updates", "En Español": "spanish",
    };
    for (const [label, dir] of Object.entries(dirs)) {
      const base = path.join(ROOT, "blog", dir);
      if (!fs.existsSync(base)) continue;
      const actual = fs.readdirSync(base, { withFileTypes: true })
        .filter((e) => e.isDirectory() && fs.existsSync(path.join(base, e.name, "index.html"))).length;
      const m = s.match(new RegExp(`${label}[^]{0,400}?(\\d+)\\s+articles?`));
      if (m && Number(m[1]) !== actual)
        err("blog-counts", `blog/index.html says ${label} = ${m[1]}, actual ${actual}`);
    }
  }
}

/* 8b. Every article is actually LINKED from its hub ------------------------
 * The count above was right while seven English Elkhart articles were missing
 * from the "All articles" list entirely — a correct number over an incomplete
 * list. Counting is not the same as listing, so check the links themselves.  */
{
  const hubs = [
    { hub: path.join(ROOT, "blog", "index.html"),
      dirs: ["buyers", "sellers", "community", "relocation", "market-updates"] },
    { hub: path.join(ROOT, "blog", "spanish", "index.html"), dirs: ["spanish"] },
  ];
  for (const { hub, dirs } of hubs) {
    if (!fs.existsSync(hub)) continue;
    const s = read(hub);
    for (const dir of dirs) {
      const base = path.join(ROOT, "blog", dir);
      if (!fs.existsSync(base)) continue;
      for (const e of fs.readdirSync(base, { withFileTypes: true })) {
        if (!e.isDirectory() || !fs.existsSync(path.join(base, e.name, "index.html"))) continue;
        if (!s.includes(`/blog/${dir}/${e.name}/`))
          err("blog-hub", `${rel(hub)} does not link /blog/${dir}/${e.name}/`);
      }
    }
  }
}

/* 9. Images carry alt text ------------------------------------------------ */
{
  for (const f of htmlFiles) {
    for (const tag of read(f).match(/<img\b[^>]*>/g) || []) {
      if (!/\balt=/.test(tag)) err("a11y", `${rel(f)}: <img> without alt`);
    }
  }
}

/* 10. hreflang pairing (hard) -------------------------------------------- */
{
  // Pages with no twin in the other language. Each is here because the twin does
  // not exist, not because the tag was forgotten — see
  // docs/EN_ES_DIVERGENCE_INVENTORY.md for the ones that are meant to gain one.
  const exempt = new Set([
    "/404/",
    // Section indexes with no per-language counterpart
    "/blog/buyers/", "/blog/sellers/", "/blog/community/",
    "/blog/relocation/", "/blog/market-updates/",
    // English-only at launch (documented exception)
    "/blog/market-updates/elkhart-county-mid-year-market-update-2026/",
    // NOTE: the seven English Elkhart articles were exempt here while they had
    // no Spanish twin. Wave 2 (July 2026) built all seven, so the exemptions
    // were removed and those pages are now checked for real. An exemption that
    // outlives its reason silently stops auditing the thing it named.
    // English buyer/seller articles with no Spanish counterpart written
    "/blog/buyers/are-homes-goshen-indiana-competitive-to-buy/",
    "/blog/buyers/elkhart-indiana-good-place-invest-real-estate/",
    "/blog/buyers/how-to-compete-with-other-buyers-elkhart-indiana/",
    "/blog/buyers/is-goshen-indiana-good-place-to-buy-home/",
    "/blog/buyers/what-to-look-for-buying-home-elkhart-indiana/",
    "/blog/buyers/what-to-prioritize-buying-house-goshen-indiana/",
    "/blog/buyers/why-buy-home-elkhart-indiana-lisa-collio/",
    "/blog/buyers/why-buy-home-goshen-indiana-lisa-collio/",
    // Spanish-only buyer cluster (cluster-1-compradores), no English twin
    "/blog/spanish/como-comprar-una-casa-en-indiana/",
    "/blog/spanish/costos-de-cierre-que-son/",
    "/blog/spanish/cuanto-dinero-necesito-para-comprar-una-casa/",
    "/blog/spanish/errores-comunes-al-comprar-casa/",
    "/blog/spanish/no-se-si-califico-credito-y-preaprobacion/",
    "/blog/spanish/prestamos-fha-y-usda-en-espanol/",
    "/blog/spanish/renta-o-compra-como-decidir/",
  ]);
  const pairs = JSON.parse(fs.readFileSync(path.join(ROOT, "content", "hreflang-pairs.json"), "utf8"));
  const paired = new Set(pairs.flatMap((p) => [p.en, p.es]));
  for (const f of pageFiles) {
    const u = urlOf(f);
    const s = read(f);
    const has = /rel="alternate" hreflang="es"/.test(s) && /rel="alternate" hreflang="en"/.test(s);
    if (paired.has(u)) {
      if (!has) err("hreflang", `${u} is in the pair map but carries no alternate tags (run npm run hreflang)`);
    } else if (!exempt.has(u)) {
      err("hreflang", `${u} is neither paired nor listed as exempt — add a pair or document why it has no twin`);
    }
  }
  // Both halves of a pair must agree, or Google ignores the annotation.
  for (const { en, es } of pairs) {
    for (const url of [en, es]) {
      const f = fileFor2(url);
      if (!fs.existsSync(f)) continue;
      const s = read(f);
      const e = s.match(/hreflang="en" href="https:\/\/lisacolliorealtor\.com([^"]+)"/);
      const p = s.match(/hreflang="es" href="https:\/\/lisacolliorealtor\.com([^"]+)"/);
      if (!e || !p) continue;
      if (e[1] !== en || p[1] !== es)
        err("hreflang", `${url} points at ${e[1]} / ${p[1]}, expected ${en} / ${es} (not reciprocal)`);
    }
  }
}

/* 11. SEO field lengths (warn) -------------------------------------------- */
{
  for (const f of pageFiles) {
    const s = read(f);
    // Measure what a search engine RENDERS, not the raw markup. "&amp;" is one
    // character on screen and five in the source, so counting the raw string
    // overstated six titles by four characters each and flagged them as
    // over-length when they were not. Same decode() the identity checks use.
    const t = s.match(/<title>(.*?)<\/title>/s);
    const d = s.match(/name="description" content="(.*?)"/s);
    const tLen = t ? decode(t[1]).length : 0;
    const dLen = d ? decode(d[1]).length : 0;
    if (t && tLen > 60) warn("seo", `${urlOf(f)} title ${tLen} chars (target <=60)`);
    if (d && (dLen < 145 || dLen > 160))
      warn("seo", `${urlOf(f)} meta description ${dLen} chars (target 145-160)`);
  }
}

/* 12. llms.txt coverage (hard) --------------------------------------------
 * llms.txt is generated by `npm run llms` and covers every published page in
 * both languages. It was a hand-written 18-page entry-point file until July
 * 2026; hand-maintained indexes go stale the moment a batch ships, so this is
 * now a hard check rather than a warning. If it fails, run `npm run llms`.  */
{
  const p = path.join(ROOT, "llms.txt");
  if (fs.existsSync(p)) {
    const listed = new Set(
      [...read(p).matchAll(/https:\/\/lisacolliorealtor\.com(\/[^\s)\]]*)/g)].map((m) => m[1])
    );
    const missing = pageFiles.map(urlOf).filter((u) => !listed.has(u));
    for (const u of missing.slice(0, 10)) err("llms", `${u} absent from llms.txt — run \`npm run llms\``);
    if (missing.length > 10)
      err("llms", `...and ${missing.length - 10} more absent from llms.txt — run \`npm run llms\``);
  }
}

/* 13. Retail/dining business names -----------------------------------------
 * The compliance checklist bars specific business, restaurant, and shop names
 * on evergreen pillar pages, allowing them ONLY on dated blog articles that
 * carry the verify-current-details disclaimer.
 *
 * That exemption sat unenforced for months: the disclaimer did not exist, and
 * a pillar page named ten businesses in one paragraph without anything
 * catching it. Both halves are mechanical, so both are checked here.
 *
 * Names live in content/source/retail-business-names.txt so the list can be
 * edited without touching this file. A few real businesses are deliberately
 * absent because their names are ordinary words — see the header of that file.
 * The check therefore reduces the human-review surface; it does not remove it.
 */
{
  const listPath = path.join(ROOT, "content", "source", "retail-business-names.txt");
  if (!fs.existsSync(listPath)) {
    err("business-names", "content/source/retail-business-names.txt is missing — check 13 cannot run");
  } else {
    const names = read(listPath)
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l && !l.startsWith("#"));
    const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    for (const f of pageFiles) {
      const s = read(f);
      const text = strip(s);
      const hits = names.filter((n) => new RegExp(`(^|[^\\w])${esc(n)}([^\\w]|$)`).test(text));
      if (!hits.length) continue;
      const url = urlOf(f);
      const isBlogArticle = url.startsWith("/blog/") && url !== "/blog/";
      if (!isBlogArticle) {
        err("business-names",
          `${url} is an evergreen page naming: ${hits.join(", ")} — these belong only on dated blog articles`);
      } else if (!/build:verify-details(-es)?[\s{]/.test(s)) {
        err("business-names",
          `${url} names ${hits.join(", ")} without the verify-current-details disclaimer — add the build:verify-details marker`);
      }
    }
  }
}

/* 14. EN/ES image parity ---------------------------------------------------
 * Spanish twins share the English page's image FILES (Master Plan §7) — only
 * the alt text differs. So a difference in image count between a pair is
 * always a gap, never a design choice.
 *
 * This has now surfaced three times, each caught only because someone looked
 * at the page: the Spanish community pages shipped with no section images at
 * all, and then with body images but no FAQ images. Counting by one class and
 * calling it "images" is exactly how the second one hid — so this counts every
 * content <img>, and reports the per-class split when it fails.
 *
 * Chrome (header, footer, logos, review photos) is identical on both sides of
 * a pair, so a raw <img> count is comparable without excluding it.
 */
{
  const pairPath = path.join(ROOT, "content", "hreflang-pairs.json");
  const basePath = path.join(ROOT, "content", "image-parity-baseline.json");
  if (fs.existsSync(pairPath)) {
    const pairs = JSON.parse(read(pairPath));
    // Known pre-existing gaps, recorded with their exact counts when the check
    // was introduced. They are a worklist, not an exemption: a baselined pair
    // errors if its gap CHANGES in either direction — worse means a regression,
    // better means the entry is stale and should be deleted. The baseline can
    // only shrink.
    const baseline = new Map(
      (fs.existsSync(basePath) ? JSON.parse(read(basePath)) : []).map((r) => [r.en, r])
    );
    const countImgs = (s) => (s.match(/<img\b/g) || []).length;
    const countClass = (s, c) => (s.match(new RegExp(c, "g")) || []).length;
    for (const { en, es } of pairs) {
      const fe = fileFor2(en), fs_ = fileFor2(es);
      if (!fe || !fs_ || !fs.existsSync(fe) || !fs.existsSync(fs_)) continue;
      const a = read(fe), b = read(fs_);
      const na = countImgs(a), nb = countImgs(b);
      const known = baseline.get(en);
      if (na === nb) {
        if (known)
          err("image-parity",
            `${en} / ${es} now match at ${na} images — the gap is resolved. ` +
            `Delete this pair from content/image-parity-baseline.json.`);
        continue;
      }
      const split = (s) =>
        `section-figure ${countClass(s, "section-figure")}, ` +
        `faq-item--media ${countClass(s, "faq-item--media")}`;
      if (known && known.enImages === na && known.esImages === nb) continue; // unchanged known gap
      err("image-parity",
        `${en} has ${na} images, ${es} has ${nb} — twins share image files, so this is a gap. ` +
        `EN: ${split(a)}. ES: ${split(b)}.` +
        (known ? ` (baselined at ${known.enImages}/${known.esImages} — this changed.)` : ""));
    }
  }
}

/* 15. Rejected image assets ------------------------------------------------
 * Four files in the July 2026 Goshen batch are composite graphics with
 * circular photo insets, not Lisa's original photography (her ruling,
 * 29 July 2026). They must not appear on any page until she supplies real
 * replacements.
 *
 * The point of this check is the FALSE NEGATIVE it prevents. The slots those
 * files were meant to fill are legitimately empty, so they read as oversights
 * — one was already written up as a manifest gap worth closing. Without a
 * mechanical guard, some future session helpfully "fixes" it and puts a
 * rejected asset on a live page.
 *
 * List: content/source/rejected-assets.txt.
 */
{
  const listPath = path.join(ROOT, "content", "source", "rejected-assets.txt");
  if (!fs.existsSync(listPath)) {
    err("rejected-assets", "content/source/rejected-assets.txt is missing — check 15 cannot run");
  } else {
    // Line format: "slug" or "slug | short reason". The reason is optional and
    // exists because this list now carries TWO rulings with different grounds —
    // the Goshen four are not Lisa's photography, the Elkhart two are hers and
    // were rejected for signage legible in the delivered crop. A single
    // hardcoded message asserted the first reason about every slug, which would
    // have told a future reader that one of Lisa's own photographs was not hers.
    const slugs = read(listPath)
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l && !l.startsWith("#"))
      .map((l) => {
        const [slug, ...rest] = l.split("|");
        return { slug: slug.trim(), reason: rest.join("|").trim() };
      })
      .filter((r) => r.slug);
    for (const f of htmlFiles) {
      const s = read(f);
      for (const { slug, reason } of slugs) {
        // any variant: slug.jpg, slug.webp, slug-thumb.jpg, slug-header.webp …
        if (new RegExp(`${slug}(-thumb|-header)?\\.(jpg|jpeg|png|webp)`).test(s))
          err("rejected-assets",
            `${rel(f)} references ${slug} — a rejected asset` +
            (reason ? ` (${reason})` : "") + `. ` +
            `This slot stays empty on purpose until Lisa supplies a replacement; ` +
            `see content/source/rejected-assets.txt for the ruling and its grounds.`);
      }
    }
  }
}

/* 16. FAQ image must match its own question -------------------------------
 * An FAQ block with an image has two links: the decorative image wrapper and
 * the "Read the full article" link in the body. They must point at the same
 * article — otherwise the image illustrates a different question than the one
 * it sits beside, and its alt text describes the wrong thing to a screen
 * reader.
 *
 * This exists because it happened: a block-spanning regex attached two Spanish
 * FAQ images to the wrong questions, and it was caught only by listing every
 * alt string by hand for review. Nothing else would have flagged it — counts
 * matched, both languages had five images, every file existed.
 */
{
  for (const f of pageFiles) {
    const s = read(f);
    const blocks = s.match(/<div class="faq-item faq-item--media[\s\S]*?\n      <\/div>/g) || [];
    for (const blk of blocks) {
      const media = blk.match(/faq-item__media" href="([^"]+)"/);
      const body = blk.match(/faq-more"><a href="([^"]+)"/);
      if (!media || !body) continue;
      if (media[1] !== body[1]) {
        const q = (blk.match(/<h3>([\s\S]*?)<\/h3>/) || [, "?"])[1].trim();
        err("faq-pairing",
          `${urlOf(f)}: FAQ image links to ${media[1]} but the question "${q}" links to ${body[1]} — ` +
          `the image belongs to a different question`);
      }
    }
  }
}

/* 17. Fair Housing terms in alt text --------------------------------------
 * Alt attributes are copy, but they sit inside a tag — so prose greps and
 * human read-throughs both skip them, and every previous Fair Housing sweep
 * on this site missed them. "a quiet Goshen street" and "una calle tranquila
 * de Goshen" both reached production that way.
 *
 * Terms: content/source/fair-housing-terms.txt, English and Spanish. Scoped to
 * alt text rather than whole pages on purpose — several terms are legitimate
 * elsewhere ("tranquilidad" about peace of mind is fine, "una calle tranquila"
 * is not), and a noisy check gets switched off. Check 5 still guards
 * "walkab" sitewide.
 */
{
  const listPath = path.join(ROOT, "content", "source", "fair-housing-terms.txt");
  if (!fs.existsSync(listPath)) {
    err("fair-housing-alt", "content/source/fair-housing-terms.txt is missing — check 17 cannot run");
  } else {
    const terms = read(listPath)
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l && !l.startsWith("#"))
      .map((l) => {
        const [cat, term] = l.split("|").map((x) => x.trim());
        return { cat, term };
      });
    for (const f of htmlFiles) {
      const s = read(f);
      for (const m of s.matchAll(/\balt="([^"]*)"/g)) {
        const alt = decode(m[1]);
        if (!alt.trim()) continue;
        for (const { cat, term } of terms) {
          const re = new RegExp(`(^|[^\\p{L}])${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}([^\\p{L}]|$)`, "iu");
          if (re.test(alt))
            err("fair-housing-alt",
              `${rel(f)}: alt text contains "${term}" (${cat}) — "${alt.slice(0, 80)}"`);
        }
      }
    }
  }
}

/* Shared identity ruleset — used by checks 18 and 19. Hoisted out of check 18
 * so the <title> check (19) can apply the exact same rules instead of drifting
 * into its own near-duplicate list. */
// "Elkhart County" is barred as a service-area descriptor but is correct
// inside proper names, or the one dated market-update page that reports
// county-level MLS stats. Allow those explicitly rather than dropping the rule.
const IDENTITY_COUNTY_OK = [
  "Elkhart County 4-H Fair",
  "Elkhart County Board of REALTORS®",
  "Elkhart County Mid-Year Market Update",
];
const IDENTITY_RULES = [
  [/\bREALTORS?\b(?!®)/i, "REALTOR® without the ® mark"],
  [/\b(Realtor|REALTOR)\s+Lisa Collio\b/,
   'leads with the designation — use "Lisa Collio, Real Estate Agent"'],
  [/Lisa Collio,\s*Realtor\b/i,
   'wrong title form — use "Lisa Collio, Real Estate Agent"'],
  [/\bREMAX\b/, 'slash-free "REMAX"'],
  [/RE\/MAX(?!\s*(?:Results,\s*The Viruez Team|®))/,
   'brokerage not written in full ("RE/MAX Results, The Viruez Team")'],
  [/Northern Indiana/i, '"Northern Indiana" as a service-area descriptor'],
  [/Elkhart County/i, '"Elkhart County" as a service-area descriptor'],
  [/Lisa Collio Real Estate\b(?!,)/, "business name without the locked comma"],
  [/574[.\-\s]?975[.\-\s]?0141/, "superseded phone number"],
];
// The domain contains "realtor"; so does Lisa's email. Neither is the term.
function checkIdentityText(raw, f, field, checkName) {
  let v = decode(raw)
    .replace(/lisacolliorealtor\.com/gi, " ")
    .replace(/lisacolliorealtor@[\w.]+/gi, " ");
  for (const ok of IDENTITY_COUNTY_OK) v = v.split(ok).join(" ");
  for (const [rule, label] of IDENTITY_RULES)
    if (rule.test(v))
      err(checkName, `${rel(f)} [${field}]: ${label} — "${decode(raw).slice(0, 90)}"`);
}

/* 18. Locked identity rules in description fields --------------------------
 * Meta and schema descriptions are advertising copy: they render in search
 * results and, because this site sets no og:description or twitter:description
 * anywhere, they are also what Facebook and LinkedIn display when a page is
 * shared. Four buyer articles ran "Realtor Lisa Collio" in that slot — REALTOR®
 * without the mark, and leading with the designation instead of "Lisa Collio,
 * Real Estate Agent" — until July 2026.
 *
 * SCOPED TO DESCRIPTION FIELDS ON PURPOSE, not sitewide. Measured before
 * building: the same REALTOR-® rule applied to whole pages produces 238 hits
 * across 93 pages, and essentially none are real —
 *   222 are lowercase "realtor" inside VERBATIM client reviews, which must
 *       never be edited (reviews ship as written, typos and all); and
 *    16 are "REALTOR®" in JSON-LD, where the mark is correctly escaped.
 * Scoped to descriptions the same rule found exactly the four real ones, with
 * no noise. A check that cries wolf gets switched off — same reasoning that
 * scoped check 17 to alt text.
 *
 * Check 5 already scans whole files for its own banned list; these rules are
 * additions to the ruleset, not a second pass over the same ground.
 */
{
  const FIELDS = [
    [/<meta name="description" content="([^"]*)"/g, "meta description"],
    [/<meta property="og:description" content="([^"]*)"/g, "og:description"],
    [/<meta name="twitter:description" content="([^"]*)"/g, "twitter:description"],
    [/"description":\s*"((?:[^"\\]|\\.)*)"/g, "schema description"],
  ];
  for (const f of htmlFiles) {
    const s = read(f);
    for (const [re, field] of FIELDS)
      for (const m of s.matchAll(re)) checkIdentityText(m[1], f, field, "identity-descriptions");
  }
}

/* 19. Locked identity rules in the <title> tag ------------------------------
 * <title> is a sibling of the description fields check 18 guards — same
 * search-result / social-share exposure — but check 18 never looked at it.
 * Result: three pages still carried "Realtor" unmarked or "Lisa Collio,
 * Realtor" in <title> after the July 2026 description-field fix, because the
 * fix touched only the field it was scoped to. Found during the July 2026
 * copy-field-gap sweep (see docs/AUDIT_CHECKLIST.md).
 *
 * og:title / twitter:title do not exist anywhere on this site (verified: 0
 * instances) — nothing to scope a check to there.
 */
{
  for (const f of htmlFiles) {
    const s = read(f);
    const m = s.match(/<title>(.*?)<\/title>/s);
    if (m) checkIdentityText(m[1], f, "title", "identity-title");
  }
}

/* 20. headline field must match the on-page <h1> ---------------------------
 * BlogPosting/Article `headline` is what search results and any script that
 * reads JSON-LD (not just Google) treat as the page's title — but nothing
 * compared it to the actual page. Found during the July 2026 copy-field-gap
 * sweep: currently in sync everywhere (124 headline fields checked, 0 real
 * mismatches), so this is a regression guard, not a fix for existing drift.
 */
{
  for (const f of pageFiles) {
    const s = read(f);
    const h1 = s.match(/<h1[^>]*>(.*?)<\/h1>/s);
    if (!h1) continue;
    const h1Text = strip(h1[1]);
    for (const m of s.matchAll(/"headline":\s*"((?:[^"\\]|\\.)*)"/g)) {
      let headline;
      try { headline = JSON.parse(`"${m[1]}"`); } catch { continue; }
      headline = strip(headline);
      if (headline !== h1Text)
        err("headline-sync",
          `${rel(f)}: headline "${headline}" does not match <h1> "${h1Text}"`);
    }
  }
}

/* 21. Sold-listing address consent manifest --------------------------------
 * 876 IAC 8-1-8(f) bars presenting a photo as a specific advertised/sold
 * listing without written seller consent on file. Two page patterns make that
 * claim — a figcaption reading "<address> — Sold by Lisa Collio" / "Vendida
 * por Lisa Collio", and a sold-quote-card's "Sold: <address>" span — and until
 * now nothing enforced that every address named that way has consent recorded
 * anywhere in the repo; docs/AUDIT_CHECKLIST.md carries the rule as a manual
 * read-through item only. Found during the July 2026 copy-field-gap sweep.
 *
 * The manifest does not itself certify consent — it forces a deliberate edit
 * (and, going forward, a deliberate confirmation) before a new address can
 * ship in "sold" framing. See content/source/sold-listing-consent.txt.
 */
{
  const listPath = path.join(ROOT, "content", "source", "sold-listing-consent.txt");
  if (!fs.existsSync(listPath)) {
    err("sold-listing-consent", "content/source/sold-listing-consent.txt is missing — check 21 cannot run");
  } else {
    const allowed = new Set(
      read(listPath).split("\n").map((l) => l.trim()).filter((l) => l && !l.startsWith("#"))
    );
    const PATTERNS = [
      /<figcaption>([^—<]+?)\s*—\s*(?:Sold by Lisa Collio|Vendida por Lisa Collio)<\/figcaption>/g,
      /sold-(?:quote-)?card__addr">\s*(?:Sold|Vendida):\s*([^<]+?)\s*<\/span>/g,
    ];
    for (const f of htmlFiles) {
      const s = read(f);
      for (const re of PATTERNS) {
        for (const m of s.matchAll(re)) {
          const addr = decode(m[1]).trim();
          if (!allowed.has(addr))
            err("sold-listing-consent",
              `${rel(f)}: "${addr}" claimed as sold by Lisa Collio but not in ` +
              `content/source/sold-listing-consent.txt — confirm written seller consent is on file, then add it`);
        }
      }
    }
  }
}

/* 22. Section-image batch reconciliation ------------------------------------
 * SOURCE FILES - REJECTED must equal SECTION_JOBS entries must equal names
 * built in assets/images/sections/. Differenced set against set, per source
 * folder — never a running total.
 *
 * This exists because a running total hid a real gap. The Elkhart batch was
 * reported as "27 uploaded, 25 processed, 1 rejected" across several rounds and
 * merged that way (PR #104). 27 - 1 is 26, not 25: elkhart-moving-cta-closing
 * was never added to SECTION_JOBS and never processed, so the closing-CTA slot
 * on /moving-to-elkhart/ and its Spanish twin would have rendered with no image
 * and read as another deliberate gap. Nobody subtracted; every report repeated
 * the same two numbers without differencing them.
 *
 * A missing image is invisible by construction — there is no broken link and no
 * failing build, just an absent picture that looks like a decision. That is the
 * same false negative check 15 exists for, from the opposite direction.
 */
{
  const srcRoots = ["goshen", "elkhart"];
  const jobsPath = path.join(ROOT, "scripts", "generate-featured-images.py");
  const sectionsDir = path.join(ROOT, "assets", "images", "sections");
  const rejPath = path.join(ROOT, "content", "source", "rejected-assets.txt");
  if (!fs.existsSync(jobsPath) || !fs.existsSync(sectionsDir)) {
    err("section-reconcile", "generate-featured-images.py or assets/images/sections/ is missing — check 22 cannot run");
  } else {
    const py = read(jobsPath);
    const block = py.slice(py.indexOf("SECTION_JOBS = {"));
    const jobs = new Set(
      [...block.slice(0, block.indexOf("\ndef ")).matchAll(/^\s{4}"([a-z0-9-]+)":/gm)].map((m) => m[1])
    );
    const rejected = new Set(
      (fs.existsSync(rejPath) ? read(rejPath) : "")
        .split("\n").map((l) => l.trim()).filter((l) => l && !l.startsWith("#"))
        .map((l) => l.split("|")[0].trim())
    );
    const built = new Set(
      fs.readdirSync(sectionsDir).map((f) => f.replace(/(-thumb)?\.(jpg|webp)$/, ""))
    );
    for (const root of srcRoots) {
      const dir = path.join(ROOT, "assets", "images", root);
      if (!fs.existsSync(dir)) continue;
      const sources = fs.readdirSync(dir).filter((f) => /\.jpe?g$/i.test(f)).map((f) => f.replace(/\.jpe?g$/i, ""));
      const expected = sources.filter((n) => !rejected.has(n));
      const noJob = expected.filter((n) => !jobs.has(n));
      const noFile = expected.filter((n) => !built.has(n));
      const orphanJob = [...jobs].filter((n) => n.startsWith(root + "-") && !sources.includes(n));
      if (noJob.length)
        err("section-reconcile",
          `assets/images/${root}/: ${sources.length} source file(s), ${rejected.size ? sources.length - expected.length : 0} rejected, ` +
          `so ${expected.length} must be processed — but ${noJob.length} have no SECTION_JOBS entry: ${noJob.join(", ")}`);
      if (noFile.length)
        err("section-reconcile",
          `assets/images/${root}/: ${noFile.length} cleared source(s) have no built file in assets/images/sections/: ${noFile.join(", ")}`);
      if (orphanJob.length)
        err("section-reconcile",
          `SECTION_JOBS references ${orphanJob.length} ${root} name(s) with no source photo: ${orphanJob.join(", ")}`);
    }
  }
}

/* 23. Same photo, same language, same alt text ------------------------------
 * Two <img> elements built from the SAME source photograph must carry the same
 * alt text within a language. Different derived files, different pages, one
 * photograph — a screen-reader user hears one description of it, not two.
 *
 * This exists because a whole review gate can pass on a string that is about
 * the wrong picture. An approved alt string for /living-in-elkhart/ read "A
 * river bend seen from a park bank"; its image is a county fair midway at dusk.
 * It was compliant, well-formed and describing a different photograph, and the
 * Fair Housing scan, the business-name scan and the digit check all passed on
 * it, because every one of them tests WORDING and none tests CORRESPONDENCE.
 *
 * The obvious heuristic — "an alt string sharing no content word with its slug"
 * — was prototyped first and thrown away: measured against the live tree it
 * flags 212 of 266 images, an 80% false-positive rate. Slugs name the topic of
 * a slot ("cost-of-living", "known-for", "trade-offs") while alt text describes
 * the depicted subject, so the two vocabularies differ by design. A check that
 * cries wolf gets switched off — the same reasoning that scoped checks 17 and
 * 18. This grouping instead flagged 3 of 138 groups, one of them the real
 * divergence on the fairground photo.
 *
 * Source of truth for "same photograph": SECTION_JOBS and CLEAN_JOBS in
 * scripts/generate-featured-images.py, which record the source behind every
 * derived file.
 */
{
  const jobsPath = path.join(ROOT, "scripts", "generate-featured-images.py");
  if (fs.existsSync(jobsPath)) {
    const py = read(jobsPath);
    // derived name -> source photo path, from both job tables
    const srcOf = new Map();
    for (const table of ["SECTION_JOBS", "CLEAN_JOBS"]) {
      const i = py.indexOf(table + " = {");
      if (i < 0) continue;
      const blk = py.slice(i, py.indexOf("\n}\n", i));
      for (const m of blk.matchAll(/^\s{4}"([a-z0-9-]+)":\s*\n\s*\("([^"]+)"/gm)) srcOf.set(m[1], m[2]);
    }
    const isEs = (u) => u.startsWith("/es/") || u.startsWith("/blog/spanish/");
    const seen = new Map();   // `${source} ${lang}` -> Map(alt -> [pages])
    for (const f of pageFiles) {
      const s = read(f), u = urlOf(f), lang = isEs(u) ? "es" : "en";
      for (const m of s.matchAll(
        /<img[^>]*src="\/assets\/images\/(?:sections|blog-headers)\/([^"]+?)\.(?:jpg|webp)"[^>]*alt="([^"]*)"/g)) {
        const name = m[1].replace(/-(thumb|header)$/, "");
        const alt = decode(m[2]).trim();
        const src = srcOf.get(name);
        // Skip unmapped names and non-path sources (FROM_COMPOSITE placeholders),
        // which are not a single photograph and cannot be compared this way.
        if (!alt || !src || !src.includes("/")) continue;
        const key = `${src} ${lang}`;
        if (!seen.has(key)) seen.set(key, new Map());
        const byAlt = seen.get(key);
        if (!byAlt.has(alt)) byAlt.set(alt, []);
        byAlt.get(alt).push(u);
      }
    }
    for (const [key, byAlt] of seen) {
      if (byAlt.size < 2) continue;
      const [src, lang] = key.split(" ");
      const variants = [...byAlt.entries()]
        .map(([alt, pages]) => `\n        "${alt}"  --  ${[...new Set(pages)].join(", ")}`)
        .join("");
      err("alt-consistency",
        `${src} [${lang}] carries ${byAlt.size} different alt strings. One photograph, ` +
        `one description per language — if they disagree, at least one is describing ` +
        `something else:${variants}`);
    }
  }
}

/* 24. Governing-documents self-reference — §19's "Exact filename" column ----
 * The Companion Document Registry's "Governing documents" table (§19) names
 * no version number in ANY row's Exact filename cell, by design (Version-
 * agnostic filename note, widened in v2.20) — the version lives in §20 and in
 * the actual filename, not repeated in the table.
 *
 * v2.16 cleared the version from row 1's Role column and declared the
 * pattern "extinct by construction." It wasn't: row 1's Exact filename
 * column still read `V2_16_...`, caught only in v2.19 — which fixed row 1
 * and never checked whether OTHER ROWS in the same column carried the same
 * defect. They did: v2.19 shipped with row 2 (Pre-Launch Punch List) reading
 * `V2.9 Pre Launch Punch List Lisa Collio.md` and row 3 (Audit Checklist)
 * reading `V1_4_Audit_Checklist_Lisa_Collio.md`, caught only in v2.20. The
 * unit of the fix is the FIELD CLASS — every Exact filename cell in this
 * one table — not the row where a defect happened to be noticed first.
 *
 * Scoped to the 4-row "Governing documents" table only, still on purpose:
 * §19's OTHER tables ("Website documents," "Added in v2.16," etc.) legitimately
 * carry dozens of permanently-versioned filenames (e.g.
 * `V1_0_ES_Adaptation_9_Articles_Wave1_Lisa_Collio.md`) that must never be
 * flagged — those are correct as named, forever. And dozens of dated
 * "(NEW in v2.4)" / "(added v2.17)" provenance tags are correct throughout
 * the rest of the document (Changelog Citation Standard — a date of
 * introduction is data, not a stale pointer); a whole-file version-string
 * ban would fail on every one of them.
 *
 * Pattern generalized from v2.19's `V2_[0-9]`/`v2\.[0-9]` (hardcoded to "2,"
 * which is why it would never have caught the Audit Checklist's `V1_4`) to
 * `\bV\d[_.]\d`, matching both the dot form (`V2.9`) and the underscore form
 * (`V1_4`).
 */
{
  const copyDir = path.join(ROOT, "docs", "approved-copy");
  const planFiles = fs.existsSync(copyDir)
    ? fs.readdirSync(copyDir).filter((f) => /^V\d.*_Website_Master_Plan_Lisa_Collio\.md$/.test(f))
    : [];
  if (planFiles.length !== 1) {
    err("governing-docs-self-ref",
      `docs/approved-copy/ contains ${planFiles.length} Master Plan file(s) (expected exactly 1) — ` +
      `check 24 cannot run: ${planFiles.join(", ") || "none found"}`);
  } else {
    const planPath = path.join(copyDir, planFiles[0]);
    const md = read(planPath);
    const tableStart = md.indexOf("## Governing documents");
    const tableEnd = md.indexOf("## Website documents");
    if (tableStart < 0 || tableEnd < 0 || tableEnd <= tableStart) {
      err("governing-docs-self-ref",
        `docs/approved-copy/${planFiles[0]}: could not locate the §19 "Governing documents" table ` +
        `(bounded by "## Governing documents" and "## Website documents") — check 24 cannot run`);
    } else {
      const table = md.slice(tableStart, tableEnd);
      const rows = [...table.matchAll(/^\|\s*([^|]+?)\s*\|\s*([^|]*?)\s*\|\s*(?:[^|]*\|){2}/gm)]
        .filter((m) => m[1] !== "**Document**" && !/^-+$/.test(m[1]));
      if (!rows.length) {
        err("governing-docs-self-ref",
          `docs/approved-copy/${planFiles[0]}: §19 "Governing documents" table found but no data rows parsed — check 24 cannot run`);
      }
      for (const [, docName, filenameCell] of rows) {
        if (/\bV\d[_.]\d/.test(filenameCell)) {
          err("governing-docs-self-ref",
            `docs/approved-copy/${planFiles[0]}: §19 "${docName}" row's Exact filename cell names a version ` +
            `("${filenameCell.trim()}"), contradicting the Version-agnostic filename note that no row does`);
        }
      }
    }
  }
}

/* 25. Screen-reader text matches its page's language ------------------------
 * aria-label, alt, the title ATTRIBUTE (not the <title> tag), and
 * .sr-only/.visually-hidden text are read aloud by assistive tech even though
 * sighted users never see them as body copy — so they carry the same
 * one-language-per-page obligation as visible text (Master Plan §7), and a
 * mismatch is invisible to every check that only looks at rendered content.
 *
 * Found the way this class of bug usually is here: build-reviews.js's stars()
 * helper hard-coded aria-label="5 de 5 estrellas" with no lang parameter, so
 * every English page's star rating read the rating aloud in Spanish — 148
 * instances across 74 pages, unnoticed because nothing renders an aria-label
 * visibly and no prior check reads inside one.
 *
 * Exactly two strings are exempt, by exact match — the locked bilingual-toggle
 * badges (Master Plan §7): the "Hablo español" banner on EN pages and the
 * "English" toggle back on ES pages are the ONLY other-language content the
 * Master Plan permits on a page, and they are aria-labelled/visible in the
 * *other* language by design. Nothing else is exempt — a heuristic exemption
 * (e.g. "contains español") would swallow a genuine future defect that merely
 * resembles the toggle text.
 *
 * The language guess is deliberately conservative: Spanish diacritics/¿/¡ or a
 * stopword-majority mark a string Spanish; an English-stopword majority marks
 * it English; anything else (names, numbers, brand terms, short strings with
 * no function words) is left UNCLASSIFIED and never flagged. This UNDERCOUNTS
 * rather than over-flags on purpose — checks 17/18/23's history is that a
 * heuristic which cries wolf gets switched off, which is worse than a gap. A
 * clean run here is evidence for the strings this check can actually judge,
 * not a certificate that every screen-reader string on the site is correct.
 */
{
  const EXEMPT_SR_STRINGS = new Set([
    "Hablo español — ver esta página en español",
    "English — view this page in English",
  ]);
  const ES_WORDS = new Set(["de","del","la","el","en","para","con","sobre","es","son","una","su","sus","al","por","que","los","las"]);
  const EN_WORDS = new Set(["the","and","of","to","in","for","with","on","is","are","out","close","skip","menu","open","search","main","view","page"]);
  const ES_CHARS = /[ñÑ¿¡áéíóúÁÉÍÓÚü]/;
  const guessLang = (s) => {
    if (ES_CHARS.test(s)) return "es";
    const words = (s.toLowerCase().match(/[a-záéíóúñ]+/g) || []);
    let en = 0, es = 0;
    for (const w of words) { if (EN_WORDS.has(w)) en++; if (ES_WORDS.has(w)) es++; }
    if (es > en) return "es";
    if (en > es) return "en";
    return null; // ambiguous — not classified, never flagged
  };
  const FIELDS = [
    { name: "aria-label", re: /\baria-label="([^"]*)"/g },
    { name: "alt", re: /\balt="([^"]*)"/g },
    { name: "title-attr", re: /(?<!<)\btitle="([^"]*)"/g },
    { name: "sr-only", re: /class="[^"]*(?:sr-only|visually-hidden)[^"]*"[^>]*>([^<]*)</g },
  ];
  for (const f of pageFiles) {
    const s = read(f);
    const m = s.match(/<html[^>]*\blang="([^"]+)"/);
    const lang = m ? m[1] : null;
    if (lang !== "en" && lang !== "es") continue;
    for (const { name, re } of FIELDS) {
      for (const match of s.matchAll(re)) {
        const val = decode(match[1]).trim();
        if (!val || EXEMPT_SR_STRINGS.has(val)) continue;
        const guessed = guessLang(val);
        if (guessed && guessed !== lang)
          err("sr-lang-mismatch",
            `${rel(f)} [${name}]: "${val}" reads as ${guessed}, page is lang="${lang}"`);
      }
    }
  }
}

/* 26. Placeholder hero image — ERROR (flipped from WARNING 13 August 2026) -
 * Hero Standard v1.0: originally every one of the twelve hero slots (Home +
 * 11 Tier 2 pages) pointed at assets/images/hero/_placeholder.jpg, so this
 * check shipped as a WARNING (12 August 2026 ruling) rather than break the
 * build whose whole purpose was to ship that placeholder.
 *
 * All twelve real photographs landed 13 August 2026 (Phase 1 of the Hero
 * Standard photo build) — the condition the punch list recorded for the
 * flip ("once every one of the twelve hero photos above has actually
 * landed") is met, so this is now a hard fail: a real hero regressing back
 * to the placeholder is a shipped defect, not expected drift.
 *
 * Two independent signals are checked, not one, so a rename alone can't hide
 * a placeholder that's about to go to production: the filename (the
 * leading-underscore convention already used elsewhere in this repo for
 * dev/throwaway assets) AND the data-hero-placeholder="true" attribute on
 * the <section>. Either signal present without the other is itself flagged —
 * that mismatch means someone edited one and not the other, which is exactly
 * the kind of drift this check exists to catch.
 */
for (const f of pageFiles) {
  const s = read(f);
  for (const m of s.matchAll(/<section class="hero[^"]*"[^>]*>/g)) {
    const tag = m[0];
    const hasPlaceholderImg = /_placeholder\.(jpg|webp)/.test(tag);
    const hasPlaceholderAttr = /data-hero-placeholder="true"/.test(tag);
    if (hasPlaceholderImg && hasPlaceholderAttr) {
      err("hero-placeholder", `${rel(f)}: hero still on the placeholder photo — real photography pending`);
    } else if (hasPlaceholderImg !== hasPlaceholderAttr) {
      err("hero-placeholder", `${rel(f)}: placeholder signals disagree (filename=${hasPlaceholderImg}, attribute=${hasPlaceholderAttr}) — fix whichever one didn't get updated`);
    }
  }
}

/* 27. Fair Housing terms in hero copy ---------------------------------------
 * Hero Standard v1.0 extends the Fair Housing term ban to hero copy: the
 * headline (.hero__promise) and the supporting line / H1 (.hero__identity)
 * are advertising copy at the top of the page, the same class of text check
 * 18 already guards in meta/schema descriptions — and the alt-text history
 * behind check 17 ("a quiet Goshen street" reaching production because
 * nothing scoped to that field class existed yet) is exactly the risk here:
 * a banned term in a hero headline would be the single most prominent
 * instance of it on the page.
 *
 * Reuses content/source/fair-housing-terms.txt (the same list checks 17
 * and this share) rather than a second copy that could drift from it.
 * Scoped to the two hero text fields specifically, not the whole hero
 * section, so it doesn't fire on breadcrumb labels, meta lines, or CTA
 * button text — none of which is the kind of descriptive copy this list
 * targets.
 */
{
  const listPath = path.join(ROOT, "content", "source", "fair-housing-terms.txt");
  if (!fs.existsSync(listPath)) {
    err("fair-housing-hero", "content/source/fair-housing-terms.txt is missing — check 27 cannot run");
  } else {
    const terms = read(listPath)
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l && !l.startsWith("#"))
      .map((l) => {
        const [cat, term] = l.split("|").map((x) => x.trim());
        return { cat, term };
      });
    const FIELDS = [
      { name: "hero__promise", re: /<p class="hero__promise">([\s\S]*?)<\/p>/g },
      { name: "hero__identity", re: /<h1 class="hero__identity">([\s\S]*?)<\/h1>/g },
    ];
    for (const f of pageFiles) {
      const s = read(f);
      for (const { name, re } of FIELDS) {
        for (const m of s.matchAll(re)) {
          const text = strip(m[1]);
          if (!text.trim()) continue;
          for (const { cat, term } of terms) {
            const termRe = new RegExp(`(^|[^\\p{L}])${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}([^\\p{L}]|$)`, "iu");
            if (termRe.test(text))
              err("fair-housing-hero",
                `${rel(f)} [${name}]: hero copy contains "${term}" (${cat}) — "${text.slice(0, 90)}"`);
          }
        }
      }
    }
  }
}

/* 28. Hero image contrast — mechanical WCAG AA sampler ----------------------
 * Hero Standard v1.0 §4 requires 4.5:1 contrast between hero text and the
 * photo behind it. This measures it directly from the actual image file
 * instead of trusting a photo "looks dark enough" — the failure mode this
 * exists for is a real photograph landing in a hero slot that turns out too
 * light where the text sits, caught only after Lisa has already shot all
 * twelve. Runs against the placeholder today (which is deliberately dark)
 * and against every real photo as it replaces one.
 *
 * Samples the LEFT 40% of the image — the zone under .hero__text / the Tier
 * 2 .wrap, which sits inside the gradient's 0%-52% span (the 82%-opacity
 * navy stop), not the lighter 100% stop on the right where a Tier 1 portrait
 * sits. See scripts/hero-contrast-sample.py for the full reasoning; this is
 * the same zone correction behind the .hero__sub / .hero__tagline color fix
 * in this same PR. Blends the sampled average color with the .hero--photo
 * scrim (rgba(0,6,46,.82)) — the same math the gradient itself performs — to
 * get the color actually rendered, then computes contrast against the hero
 * text color, which is #fff everywhere under .hero--photo (verified: every
 * .hero__promise / .hero__identity / .hero__sub / .hero__tagline rule under
 * .hero--photo in site.css sets color: #fff, no exceptions).
 *
 * Requires python3 + Pillow, the same dependency scripts/generate-featured-
 * images.py and scripts/check-image-scope.py already carry — not a new one
 * introduced here. If the sampler can't run (missing interpreter, missing
 * Pillow, missing image file), that is reported as its own error rather than
 * silently skipped, since a check that can't run isn't evidence of anything.
 */
{
  const SCRIM = { r: 0, g: 6, b: 46 };
  const SCRIM_ALPHA = 0.82;
  const relLuminance = ({ r, g, b }) => {
    const chan = (v) => {
      const c = v / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    };
    return 0.2126 * chan(r) + 0.7152 * chan(g) + 0.0722 * chan(b);
  };
  const contrastRatio = (c1, c2) => {
    const l1 = relLuminance(c1), l2 = relLuminance(c2);
    const [lighter, darker] = l1 > l2 ? [l1, l2] : [l2, l1];
    return (lighter + 0.05) / (darker + 0.05);
  };
  const WHITE = { r: 255, g: 255, b: 255 };
  const samplerPath = path.join(ROOT, "scripts", "hero-contrast-sample.py");
  const seen = new Set(); // one sample per unique image, not per page that uses it
  for (const f of pageFiles) {
    const s = read(f);
    for (const m of s.matchAll(/<section class="hero[^"]*"[^>]*style="--hero-img:url\('([^']+)'\)"/g)) {
      const url = m[1];
      if (seen.has(url)) continue;
      seen.add(url);
      const imgPath = path.join(ROOT, url.replace(/^\//, ""));
      if (!fs.existsSync(imgPath)) {
        err("hero-contrast", `${rel(f)}: --hero-img "${url}" does not exist on disk — check 28 cannot sample it`);
        continue;
      }
      if (!fs.existsSync(samplerPath)) {
        err("hero-contrast", `scripts/hero-contrast-sample.py is missing — check 28 cannot run`);
        continue;
      }
      let sample;
      try {
        const out = execFileSync("python3", [samplerPath, imgPath], { encoding: "utf8" });
        sample = JSON.parse(out);
      } catch (e) {
        err("hero-contrast", `${url}: contrast sampler failed to run (${e.message.split("\n")[0]}) — check 28 cannot verify this image`);
        continue;
      }
      if (sample.error) {
        err("hero-contrast", `${url}: contrast sampler could not read this image (${sample.error})`);
        continue;
      }
      const blended = {
        r: sample.r * (1 - SCRIM_ALPHA) + SCRIM.r * SCRIM_ALPHA,
        g: sample.g * (1 - SCRIM_ALPHA) + SCRIM.g * SCRIM_ALPHA,
        b: sample.b * (1 - SCRIM_ALPHA) + SCRIM.b * SCRIM_ALPHA,
      };
      const ratio = contrastRatio(blended, WHITE);
      if (ratio < 4.5) {
        err("hero-contrast",
          `${url}: hero text zone contrast is ${ratio.toFixed(2)}:1 against white text (needs 4.5:1) — ` +
          `sampled RGB(${sample.r.toFixed(0)},${sample.g.toFixed(0)},${sample.b.toFixed(0)}), ` +
          `blended with the scrim to RGB(${blended.r.toFixed(0)},${blended.g.toFixed(0)},${blended.b.toFixed(0)})`);
      }
    }
  }
}

/* 29. Mobile nav open-panel must have a bounded, scrollable escape hatch ----
 * Real bug, live since PR #71 (July 2026), found 13 August 2026 while
 * investigating an unrelated hero-scroll report: the checkbox-revealed mobile
 * menu (`.nav-toggle__box:checked ~ .site-nav`) had no height cap, and its
 * ancestor `.site-header` is `position: sticky` with no cap of its own either.
 * A sticky element has no internal scroll — content below the fold inside it
 * was permanently unreachable, not just hard to reach. Contact, the last item
 * in the list, was never reachable on a phone. Survived a full site audit and
 * 27 mechanical checks because every one of them reads HTML/CSS as text; none
 * render a page and measure it (see the punch-list gap this opens).
 *
 * This check is static (text-based, matching every other check in this file)
 * and is honestly scoped: it verifies the CSS structurally guarantees an
 * escape hatch exists, which is sufficient ONLY because the shipped fix is
 * self-adjusting (100vh + auto-scroll can't be defeated by content growth —
 * no pixel budget to keep in sync as labels or breakpoints change). If a
 * future change swaps this for a fixed calc(100vh - Npx) approach, this check
 * could NOT catch that constant being wrong for some breakpoint or label
 * length — that would need a real rendered-viewport measurement, which is the
 * separate, deliberately-not-built gap tracked in the punch list.
 *
 * Passes if assets/css/site.css contains EITHER:
 *   (a) a :has(.nav-toggle__box:checked) ancestor rule with a bounded height
 *       (max-height/height, not "none") AND overflow(-y) auto/scroll, or
 *   (b) the same two properties set directly on the toggle-revealed panel
 *       rule (.nav-toggle__box:checked ~ .site-nav).
 */
{
  const cssPath = path.join(ROOT, "assets", "css", "site.css");
  if (!fs.existsSync(cssPath)) {
    err("mobile-nav-scroll", "assets/css/site.css is missing — check 29 cannot run");
  } else {
    const css = read(cssPath);
    const hasEscapeHatch = (ruleBody) => {
      const hasBoundedHeight = /(?:^|[;{])\s*(?:max-height|height)\s*:\s*(?!none\b)[^;}]+/i.test(ruleBody);
      const hasScroll = /(?:^|[;{])\s*overflow(?:-y)?\s*:\s*(?:auto|scroll)\b/i.test(ruleBody);
      return hasBoundedHeight && hasScroll;
    };
    // Selectors are matched loosely (minified CSS has no guaranteed whitespace)
    // and bodies captured up to the next top-level "}".
    const hasAncestorRule = [...css.matchAll(/\.site-header:has\([^)]*\.nav-toggle__box:checked[^)]*\)\s*\{([^}]*)\}/g)]
      .some((m) => hasEscapeHatch(m[1]));
    const hasPanelRule = [...css.matchAll(/\.nav-toggle__box:checked\s*~\s*\.site-nav\s*\{([^}]*)\}/g)]
      .some((m) => hasEscapeHatch(m[1]));
    if (!hasAncestorRule && !hasPanelRule) {
      err("mobile-nav-scroll",
        "assets/css/site.css: the checkbox-revealed mobile nav has no bounded, scrollable escape hatch " +
        "(neither a :has(.nav-toggle__box:checked) ancestor rule nor the panel rule itself sets a bounded " +
        "max-height/height together with overflow(-y): auto/scroll) — content below the fold may be unreachable");
    }
  }
}

/* 30. srcset / og:image / twitter:image / JSON-LD "image" resolve ----------
 * Check 2 validates that every href/src points at a real page, file, or
 * redirect. It has never covered the other four reference patterns an asset
 * can appear in — srcset on <source>, og:image/twitter:image meta content,
 * and JSON-LD "image" fields — a gap named directly in the Report-Before-
 * Build Phase 0 recon for the content-hashed-filenames work (17 August
 * 2026) and closed here, the right moment per that report: hash-assets.js
 * now rewrites all five patterns, so a botched rewrite (or any future
 * hand-edit) pointing one of these four at a file that doesn't exist would
 * otherwise go uncaught by every existing check.
 *
 * Mirrors check 2's own approach: strip a `?v=...` cache-busting query and
 * any #fragment before resolving (so this check is agnostic to whether an
 * asset is hashed at all — it would catch the same defect before or after
 * the hashing work existed), convert an absolute
 * https://lisacolliorealtor.com/... URL to a root-relative path, then check
 * it against the same on-disk file set check 2 builds.
 *
 * The og:image/twitter:image pattern requires the closing quote immediately
 * after the property name (`(?:og:image|twitter:image)"`) so it does NOT
 * also match og:image:width / og:image:height / og:image:alt — those carry
 * a colon-suffixed property name, not a path, and would be a false positive
 * here. Proven both ways: a mutation test (scripts/verify-check30.js,
 * scratch-only, not committed) planted a nonexistent path in each of the
 * four patterns in a throwaway copy of a real page and confirmed check 30
 * catches all four; the live tree today produces zero findings.
 */
{
  const files = new Set(walkAll(ROOT, () => true).map((f) => "/" + rel(f)));
  const DOMAIN = "https://lisacolliorealtor.com";
  const patterns = [
    { name: "srcset", re: /srcset="([^"#?]+)(?:\?[^"#]*)?"/g },
    { name: "og:image/twitter:image", re: /(?:og:image|twitter:image)"[^>]*content="([^"#?]+)(?:\?[^"#]*)?"/g },
    { name: "JSON-LD image", re: /"image"\s*:\s*"([^"#?]+)(?:\?[^"#]*)?"/g },
  ];
  for (const f of htmlFiles) {
    const s = read(f);
    for (const { name, re } of patterns) {
      for (const m of s.matchAll(re)) {
        let u = m[1];
        if (u.startsWith(DOMAIN)) u = u.slice(DOMAIN.length);
        if (!u.startsWith("/")) continue; // not a same-site path (e.g. a data: URI or a third party never expected here)
        if (files.has(u)) continue;
        err("asset-paths-resolve",
          `${rel(f)} -> ${name} references ${u} (no file on disk)`);
      }
    }
  }
}

/* ------------------------------------------------------------------------- */
const group = (list) => {
  const by = {};
  for (const { check, msg } of list) (by[check] ||= []).push(msg);
  return by;
};

console.log(`Audited ${pageFiles.length} pages / ${htmlFiles.length} HTML files.\n`);

const w = group(warnings);
if (warnings.length) {
  console.log(`WARNINGS (${warnings.length}) — drift needing a judgement call, not failing the run:`);
  for (const [c, msgs] of Object.entries(w)) {
    console.log(`  [${c}] ${msgs.length}`);
    for (const m of msgs.slice(0, 5)) console.log(`      ${m}`);
    if (msgs.length > 5) console.log(`      ... and ${msgs.length - 5} more`);
  }
  console.log("");
}

const e = group(errors);
if (errors.length) {
  console.error(`ERRORS (${errors.length}):`);
  for (const [c, msgs] of Object.entries(e)) {
    console.error(`  [${c}] ${msgs.length}`);
    for (const m of msgs.slice(0, 12)) console.error(`      ${m}`);
    if (msgs.length > 12) console.error(`      ... and ${msgs.length - 12} more`);
  }
  process.exit(1);
}

console.log("All hard checks passed.");
