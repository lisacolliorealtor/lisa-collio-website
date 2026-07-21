#!/usr/bin/env node
/*
 * minify-css.js — generates the served, minified stylesheets.
 *
 * The readable, commented sources live in `assets/css/src/`. This script
 * strips comments and collapses whitespace into the files the pages actually
 * link (`assets/css/tokens.css`, `assets/css/site.css`). Edit the files in
 * `src/`, never the minified output, then run:
 *
 *   npm run css        # regenerate minified CSS
 *   npm run build      # partials + CSS together
 */

const fs = require("fs");
const path = require("path");

const SRC = path.join(__dirname, "assets", "css", "src");
const OUT = path.join(__dirname, "assets", "css");

function minify(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, "")          // comments
    .replace(/\s+/g, " ")                        // collapse whitespace
    .replace(/\s*([{}:;,>])\s*/g, "$1")         // trim around punctuation
    .replace(/;}/g, "}")                          // trailing semicolons
    .trim() + "\n";
}

for (const name of ["tokens.css", "site.css"]) {
  const src = path.join(SRC, name);
  const out = path.join(OUT, name);
  const css = fs.readFileSync(src, "utf8");
  const min = minify(css);
  fs.writeFileSync(out, min);
  console.log(
    `  ${name}: ${(css.length / 1024).toFixed(1)}K source -> ${(min.length / 1024).toFixed(1)}K minified`
  );
}
