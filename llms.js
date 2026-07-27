#!/usr/bin/env node
/*
 * llms.js — regenerate llms.txt from the site itself.
 *
 * llms.txt used to be a hand-written entry-point file listing 18 of 155 pages.
 * Hand-maintained indexes go stale the moment a batch ships — the same failure
 * as a hand-maintained fact. This derives every entry from the pages: the link
 * text is the page's own H1, the summary is its own meta description. Add a
 * page, run `npm run llms`, and it is covered.
 *
 * Classification is by URL and is TOTAL: any page matching no rule lands in
 * "Other pages" rather than being dropped, and the run fails if the number of
 * listed pages does not equal the number of pages on disk. A quietly missing
 * page is the one failure mode this file cannot afford.
 *
 * The prose header and the Notes footer are content, not data — they are held
 * here verbatim and are the only hand-written part.
 *
 * Usage: npm run llms   |   npm run llms -- --check   (reports, writes nothing)
 */

const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const SITE = "https://lisacolliorealtor.com";
const check = process.argv.includes("--check");

/* ---- collect every published page ---------------------------------------- */
const pages = [];
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name === ".git" || e.name === "node_modules" || e.name === "assets") continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name === "index.html") pages.push(p);
  }
})(ROOT);

const decode = (s) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ");

const urlOf = (f) => {
  const d = path.relative(ROOT, path.dirname(f));
  return d === "" ? "/" : `/${d.split(path.sep).join("/")}/`;
};

const entries = pages
  .map((f) => {
    const html = fs.readFileSync(f, "utf8");
    const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
    const desc = html.match(/<meta name="description" content="([^"]*)">/);
    if (!h1 || !desc) throw new Error(`${path.relative(ROOT, f)}: missing <h1> or meta description`);
    return {
      url: urlOf(f),
      title: decode(h1[1].replace(/<[^>]+>/g, "")).replace(/\s+/g, " ").trim(),
      desc: decode(desc[1]).replace(/\s+/g, " ").trim(),
    };
  })
  .sort((a, b) => a.url.localeCompare(b.url));

/* ---- classify (total: every page lands in exactly one section) ----------- */
const EN_LEGAL = ["/terms/", "/privacy/", "/accessibility/", "/fair-housing/", "/disclaimers/", "/sources/"];
const ES_LEGAL = ["/es/terminos/", "/es/privacidad/", "/es/accesibilidad/", "/es/vivienda-justa/", "/es/disclaimers/", "/es/fuentes/"];

const SECTIONS = [
  { key: "main", heading: "Main pages", match: (u) =>
      u === "/" || ["/buyers/", "/sellers/", "/about/", "/next-chapter-method/", "/market-stats/", "/contact/"].includes(u) },
  { key: "communities", heading: "Community and relocation guides", match: (u) =>
      ["/living-in-goshen/", "/moving-to-goshen/", "/living-in-elkhart/", "/moving-to-elkhart/"].includes(u) },
  { key: "blogHub", heading: "Article indexes", match: (u) =>
      /^\/blog\/((buyers|sellers|community|relocation|market-updates|spanish)\/)?$/.test(u) },
  { key: "buyers", heading: "Articles — buying a home", match: (u) => u.startsWith("/blog/buyers/") },
  { key: "sellers", heading: "Articles — selling a home", match: (u) => u.startsWith("/blog/sellers/") },
  { key: "community", heading: "Articles — Goshen and Elkhart communities", match: (u) => u.startsWith("/blog/community/") },
  { key: "relocation", heading: "Articles — relocation", match: (u) => u.startsWith("/blog/relocation/") },
  { key: "market", heading: "Articles — market updates", match: (u) => u.startsWith("/blog/market-updates/") },
  { key: "esMain", heading: "Páginas principales (español)", match: (u) =>
      u.startsWith("/es/") && !ES_LEGAL.includes(u) },
  { key: "esArticles", heading: "Artículos en español", match: (u) => u.startsWith("/blog/spanish/") },
  { key: "legal", heading: "Legal and reference", match: (u) => EN_LEGAL.includes(u) || ES_LEGAL.includes(u) },
  { key: "utility", heading: "Utility pages", match: (u) => u.endsWith("/thank-you/") || u.endsWith("/gracias/") },
  // Backstop: anything unclassified is listed, never silently dropped.
  { key: "other", heading: "Other pages", match: () => true },
];

const grouped = new Map(SECTIONS.map((s) => [s.key, []]));
for (const e of entries) {
  const s = SECTIONS.find((s) => s.match(e.url));
  grouped.get(s.key).push(e);
}

/* ---- render -------------------------------------------------------------- */
const HEADER = `# Lisa Collio, Real Estate Agent

> Licensed real estate agent serving Goshen and Elkhart, Indiana.
> Bilingual service in English and Spanish. RE/MAX Results, The Viruez
> Team. Indiana license #RB21002460. REALTOR®, NAR® Member, SRES®
> Seniors Real Estate Specialist.

This site provides educational content for home buyers and sellers in
Goshen and Elkhart, Indiana, in both English and Spanish. All market
statistics come from the Elkhart County Board of REALTORS® MLS and are
dated at the point of publication. All client reviews are quoted
verbatim from their original source.

Every published page is listed below, in both languages. English pages
and their Spanish counterparts are separate pages, not translations of
one another — each Spanish page is written for Spanish-speaking readers
rather than translated from the English.
`;

const FOOTER = `
## Notes
- Service area: Goshen and Elkhart, Indiana only.
- Lisa Collio is a licensed real estate agent, not a mortgage lender.
  The site does not provide loan terms, rates, or qualification
  guidance.
- Some client stories are illustrative composites; all reviews and
  testimonials are real and shown as written.
- Information on this site is deemed reliable but not guaranteed.
- Equal Housing Opportunity.
`;

let out = HEADER;
let listed = 0;
for (const s of SECTIONS) {
  const list = grouped.get(s.key);
  if (!list.length) continue;
  out += `\n## ${s.heading}\n`;
  for (const e of list) {
    out += `- [${e.title}](${SITE}${e.url}): ${e.desc}\n`;
    listed++;
  }
}
out += FOOTER;

/* ---- the check that matters --------------------------------------------- */
if (listed !== entries.length) {
  console.error(`FAIL: ${entries.length} pages on disk, ${listed} listed.`);
  process.exit(1);
}

const target = path.join(ROOT, "llms.txt");
const current = fs.existsSync(target) ? fs.readFileSync(target, "utf8") : "";

if (check) {
  console.log(`${entries.length} pages would be listed across ${SECTIONS.filter((s) => grouped.get(s.key).length).length} sections.`);
  console.log(out === current ? "llms.txt is up to date." : "llms.txt would change.");
  process.exit(out === current ? 0 : 1);
}

fs.writeFileSync(target, out);
console.log(`llms.txt: ${entries.length} pages listed.`);
for (const s of SECTIONS) {
  const n = grouped.get(s.key).length;
  if (n) console.log(`  ${String(n).padStart(3)}  ${s.heading}`);
}
