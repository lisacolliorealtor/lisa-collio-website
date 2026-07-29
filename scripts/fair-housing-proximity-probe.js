#!/usr/bin/env node
/*
 * fair-housing-proximity-probe.js — MEASUREMENT ONLY, not a build check.
 *
 * Lisa asked to see the false-positive rate of a context-aware Fair Housing
 * rule before deciding whether to widen audit.js check 17 from alt text to
 * body copy. This is that measurement, kept so the decision can be re-checked
 * against the site as it changes rather than trusted from one session's report.
 *
 * The rule under test: flag a banned term ONLY when a place word
 * (neighborhood / area / street / residential / community / barrio / zona /
 * calle …) appears within WINDOW words of it. That is meant to catch
 * "quiet residential areas" while ignoring "the first quiet morning".
 *
 * Run:  node scripts/fair-housing-proximity-probe.js
 *
 * Nothing here fails a build. audit.js check 17 remains scoped to alt text
 * until Lisa decides otherwise.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.dirname(__dirname);
const WINDOW = 4; // words of slack between the term and the place word

const PLACE = [
  "neighborhood", "neighbourhood", "neighborhoods", "area", "areas", "street",
  "streets", "residential", "community", "communities", "district", "block",
  "blocks", "barrio", "barrios", "zona", "zonas", "calle", "calles",
  "vecindario", "vecindarios", "comunidad", "comunidades", "colonia", "sector",
].join("|");

const terms = fs
  .readFileSync(path.join(ROOT, "content", "source", "fair-housing-terms.txt"), "utf8")
  .split("\n").map((l) => l.trim()).filter((l) => l && !l.startsWith("#"))
  .map((l) => l.split("|").map((x) => x.trim()));

const IGNORE = new Set([".git", "node_modules", "assets", "docs", "content", "scripts"]);
const walk = (d, acc = []) => {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    if (IGNORE.has(e.name)) continue;
    const p = path.join(d, e.name);
    e.isDirectory() ? walk(p, acc) : e.name.endsWith(".html") && acc.push(p);
  }
  return acc;
};

// Body copy only: alt text is already covered by audit.js check 17.
const strip = (s) =>
  s.replace(/<script[\s\S]*?<\/script>/g, " ")
   .replace(/<style[\s\S]*?<\/style>/g, " ")
   .replace(/\balt="[^"]*"/g, " ")
   .replace(/<[^>]*>/g, " ")
   .replace(/&[a-z]+;/g, " ")
   .replace(/\s+/g, " ");

const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const nearPlace = (window, term) =>
  new RegExp(
    `(?:\\b(?:${PLACE})\\b\\W+(?:\\w+\\W+){0,${WINDOW}}?${esc(term)}` +
    `|${esc(term)}\\W+(?:\\w+\\W+){0,${WINDOW}}?\\b(?:${PLACE})\\b)`, "iu"
  ).test(window);

let blanket = 0;
const flagged = [];
for (const f of walk(ROOT)) {
  const body = strip(fs.readFileSync(f, "utf8"));
  for (const [, term] of terms) {
    const re = new RegExp(`(^|[^\\p{L}])${esc(term)}([^\\p{L}]|$)`, "giu");
    for (const m of body.matchAll(re)) {
      blanket++;
      const win = body.slice(Math.max(0, m.index - 90), m.index + m[0].length + 90);
      if (nearPlace(win, term))
        flagged.push([path.relative(ROOT, f), term, win.trim().slice(0, 110)]);
    }
  }
}

console.log(`blanket rule   — body-copy hits: ${blanket}`);
console.log(`proximity rule — body-copy hits: ${flagged.length}`);
if (blanket)
  console.log(`suppressed     : ${blanket - flagged.length} ` +
              `(${Math.round(((blanket - flagged.length) / blanket) * 100)}%)`);
console.log("\nstill flagged by the proximity rule:");
for (const [f, t, w] of flagged) console.log(`  [${t}] ${f}\n     …${w}…`);
if (!flagged.length) console.log("  (none)");
