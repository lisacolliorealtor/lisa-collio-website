#!/usr/bin/env node
/*
 * hreflang.js — apply the EN/ES alternate tags from content/hreflang-pairs.json.
 *
 * Bilingual pairing is the site's differentiator, but without hreflang the two
 * languages compete in search instead of serving their own readers. This writes
 * the three-tag block (en, es, x-default -> EN) onto BOTH pages of every pair,
 * matching the convention already used on the main pages.
 *
 * The pair map is data, not inference: pairs were derived from the tags already
 * live on the site plus the approved source documents that carry the same
 * article set in both languages. Pages with no twin are intentionally absent and
 * are listed as exemptions in audit.js — a missing pair should be a deliberate
 * entry there, never a silent omission.
 *
 * IDEMPOTENT: rewrites the tags in place if present, inserts after <link
 * rel="canonical"> if not. Run with `npm run hreflang`; `--check` reports
 * without writing.
 */

const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const SITE = "https://lisacolliorealtor.com";
const check = process.argv.includes("--check");

const pairs = JSON.parse(fs.readFileSync(path.join(ROOT, "content", "hreflang-pairs.json"), "utf8"));

const fileFor = (url) =>
  path.join(ROOT, url === "/" ? "index.html" : path.join(url.replace(/^\/|\/$/g, ""), "index.html"));

const block = (en, es) =>
  [
    `<link rel="alternate" hreflang="en" href="${SITE}${en}">`,
    `<link rel="alternate" hreflang="es" href="${SITE}${es}">`,
    `<link rel="alternate" hreflang="x-default" href="${SITE}${en}">`,
  ].join("\n");

let changed = 0;
const problems = [];

for (const { en, es } of pairs) {
  for (const url of [en, es]) {
    const f = fileFor(url);
    if (!fs.existsSync(f)) {
      problems.push(`missing page for pair entry: ${url}`);
      continue;
    }
    const src = fs.readFileSync(f, "utf8");
    let out = src;

    // Drop any existing alternate tags, then re-insert canonically ordered.
    out = out.replace(/^[ \t]*<link rel="alternate" hreflang="[^"]*" href="[^"]*">[ \t]*\r?\n/gm, "");

    const canonical = out.match(/^.*<link rel="canonical"[^>]*>.*$/m);
    if (!canonical) {
      problems.push(`no <link rel="canonical"> to anchor to: ${url}`);
      continue;
    }
    out = out.replace(canonical[0], `${canonical[0]}\n${block(en, es)}`);

    if (out !== src) {
      changed++;
      if (!check) fs.writeFileSync(f, out);
      else console.log(`  would update ${path.relative(ROOT, f)}`);
    }
  }
}

console.log(`${pairs.length} pairs (${pairs.length * 2} pages).`);
if (problems.length) {
  console.error(`Problems (${problems.length}):`);
  for (const p of problems) console.error(`  ${p}`);
  process.exit(1);
}
console.log(check ? `${changed} page(s) would change.` : `${changed} page(s) updated.`);
