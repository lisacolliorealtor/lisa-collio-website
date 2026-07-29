#!/usr/bin/env node
/*
 * audit.js — standing site audit, run with `npm run audit`.
 *
 * Codifies the checks in docs/AUDIT_CHECKLIST.md that a machine can settle, so
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
    const t = s.match(/<title>(.*?)<\/title>/s);
    const d = s.match(/name="description" content="(.*?)"/s);
    if (t && t[1].length > 60) warn("seo", `${urlOf(f)} title ${t[1].length} chars (target <=60)`);
    if (d && (d[1].length < 145 || d[1].length > 160))
      warn("seo", `${urlOf(f)} meta description ${d[1].length} chars (target 145-160)`);
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
    const slugs = read(listPath)
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l && !l.startsWith("#"));
    for (const f of htmlFiles) {
      const s = read(f);
      for (const slug of slugs) {
        // any variant: slug.jpg, slug.webp, slug-thumb.jpg, slug-header.webp …
        if (new RegExp(`${slug}(-thumb|-header)?\\.(jpg|jpeg|png|webp)`).test(s))
          err("rejected-assets",
            `${rel(f)} references ${slug} — not Lisa's photography (ruling 29 Jul 2026). ` +
            `This slot stays empty until she supplies a replacement; see content/source/rejected-assets.txt.`);
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
  // "Elkhart County" is barred as a service-area descriptor but is correct
  // inside proper names. Allow those explicitly rather than dropping the rule.
  const COUNTY_OK = [
    "Elkhart County 4-H Fair",
    "Elkhart County Board of REALTORS®",
  ];
  const RULES = [
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
  const FIELDS = [
    [/<meta name="description" content="([^"]*)"/g, "meta description"],
    [/<meta property="og:description" content="([^"]*)"/g, "og:description"],
    [/<meta name="twitter:description" content="([^"]*)"/g, "twitter:description"],
    [/"description":\s*"((?:[^"\\]|\\.)*)"/g, "schema description"],
  ];
  for (const f of htmlFiles) {
    const s = read(f);
    for (const [re, field] of FIELDS) {
      for (const m of s.matchAll(re)) {
        // The domain contains "realtor"; so does Lisa's email. Neither is the term.
        let v = decode(m[1])
          .replace(/lisacolliorealtor\.com/gi, " ")
          .replace(/lisacolliorealtor@[\w.]+/gi, " ");
        for (const ok of COUNTY_OK) v = v.split(ok).join(" ");
        for (const [rule, label] of RULES)
          if (rule.test(v))
            err("identity-descriptions",
              `${rel(f)} [${field}]: ${label} — "${decode(m[1]).slice(0, 90)}"`);
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
