#!/usr/bin/env node
// tools/check-ru-style.mjs — the Russian prose gate.
// Zero dependencies: plain Node ESM (node:fs, node:path, node:url, node:child_process).
//
// Two modes:
//   report (default)  measures nine signals across lessons/ru and prints them with their targets
//   --diff            proves a recast changed prose only, against the BASELINE commit
//
// ---------------------------------------------------------------------------------------------
// MEASUREMENT DEFINITIONS — frozen by .pi/plans/russian-prose/_index.md -> Conventions.
// ---------------------------------------------------------------------------------------------
//
// V5 word count — the whole file from the line after the closing `---` to the end, whitespace
// split, empty parts dropped. This is exactly what tools/validate-content.mjs counts for V5.
//
// `flow` — the sentence slice. The file with the frontmatter block removed, every fenced block
// removed (the text between an opening and a closing ``` line, inclusive), and bullet markers
// (`- `, `1. `) dropped. Heading lines are kept, because a heading closes the sentence before it.
// Sentences are cut at a line end and after [.!?…] when the next non-space character is
// А-ЯЁ A-Z 0-9 « " „ —; each sentence is trimmed and the empties dropped. A sentence's length is
// its character count. This slice feeds the sentence count, the Pearson correlation, the two
// median sentence lengths and their ratio.
//
// `prose` — the marker slice. `flow` with every heading line also removed (/^#{1,6} /, all six
// levels, not only `## `). This slice feeds the blacklist, the `— это ` count, the participle
// count and the connector count.
//
// These are deliberately not the same slice. Do not "unify" them.
//
// BASELINE_METRICS below is what the first run of this script printed on the untouched corpus on
// 2026-10-16; see BASELINE_METRICS_DATE.

import { readFileSync, readdirSync } from "node:fs";
import { dirname, isAbsolute, join, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const LESSONS = join(ROOT, "lessons");
const RU = join(LESSONS, "ru");

const BASELINE = "b713de1dcfcf767f746db6daadce5bb4e1191b9b";

const BLACKLIST = [
  "делает то же самое",
  "делает то же",
  "то же самое, но",
  "в одежде",
  "стоящий за",
  "играет роль",
  "делает это возможным",
];
const CONNECTORS = ["однако", "при этом", "зато", "хотя", "ведь", "поэтому", "то есть", "иначе говоря"];
const PARTICIPLE = /[а-яё]+(ующий|ающий|ивший|ующие|ающие|ившие|ующего|ающего|ующим|ающим)/g;

// Frozen targets (lessons/AUTHORING.md §14 and .pi/plans/russian-prose/_index.md), derived from the
// four approved calibration files: 01-cs-fundamentals/04-database-internals/index.md,
// 01-cs-fundamentals/04-database-internals/examples.md, 08-soft-skills/01-communication/index.md and
// 01-cs-fundamentals/01-computer-science/index.md.
const TARGETS = {
  rMean: 0.60,
  sameCountPct: 40,
  lengthRatio: 0.95,
  odnako: 0.80,
  copula: 1.50,
  participle: 2.00,
  blacklist: 0,
  copulaPerFile: 3,
};

// Measured on the untouched corpus (first run of this script); quoted by lessons/AUTHORING.md §14.
const BASELINE_METRICS = {
  files: 698,
  words: 332680,
  rMean: 0.924,
  sameCountPct: 89.5,
  lengthRatio: 1.046,
  odnako: 0,
  copula: 2.59,
  participle: 2.76,
  blacklist: 15,
  blacklistFiles: 10,
};
const BASELINE_METRICS_DATE = "2026-10-16";

// The recorded baseline is the machine-readable source of truth quoted by lessons/AUTHORING.md §14.
export { BASELINE_METRICS, BASELINE_METRICS_DATE };

// Floors only — the upper bound is Infinity so a body is never cut to fit a count
// (lessons/AUTHORING.md §4). `band` renders each form.
const BANDS = {
  full: [400, Infinity],
  landing: [180, Infinity],
  area: [100, Infinity],
  examples: [100, Infinity],
};
const band = ([min, max]) => (max === Infinity ? `${min}+` : `${min}-${max}`);

const USAGE =
  "usage: node tools/check-ru-style.mjs [--strict] [--diff] [--topic <dir>] [--file <path>]";

// ---- flags -----------------------------------------------------------------------------------
const argv = process.argv.slice(2);
let strict = false;
let diff = false;
let topic = null;
let fileArg = null;
for (let i = 0; i < argv.length; i++) {
  const a = argv[i];
  if (a === "--strict") strict = true;
  else if (a === "--diff") diff = true;
  else if (a === "--topic") {
    if (!argv[i + 1]) {
      console.error("--topic needs a topic slug");
      process.exit(2);
    }
    topic = argv[++i];
  } else if (a === "--file") {
    if (!argv[i + 1]) {
      console.error("--file needs a path");
      process.exit(2);
    }
    fileArg = argv[++i];
  } else {
    console.error(USAGE);
    process.exit(2);
  }
}

// ---- file helpers ------------------------------------------------------------------------------
const rel = (p) => (p.startsWith(ROOT) ? p.slice(ROOT.length + 1) : p).split(sep).join("/");

function walk(dir, out = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const f = join(dir, e.name);
    if (e.isDirectory()) walk(f, out);
    else if (e.name.endsWith(".md") && e.name !== "INDEX.md" && e.name !== "GLOSSARY.md") out.push(f);
  }
  return out;
}

const norm = (text) => text.split("\r\n").join("\n");

function frontmatter(lines) {
  if ((lines[0] || "").trim() !== "---") return { end: -1, keys: {} };
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() !== "---") continue;
    const keys = {};
    for (let k = 1; k < i; k++) {
      const m = /^([A-Za-z_][A-Za-z0-9_-]*):\s*(.*)$/.exec(lines[k]);
      if (m) keys[m[1]] = m[2].trim();
    }
    return { end: i, keys };
  }
  return { end: -1, keys: {} };
}

function shapeOf(relPath, keys) {
  if (/(^|\/)examples(\.\d{2}-[a-z0-9-]+)?\.md$/.test(relPath)) return "examples";
  if (keys.type === "area") return "area";
  // Mirrors validate-content.mjs shapeOf: a child lesson carries no type/tier and is a full lesson.
  return keys.tier === "medium" || keys.tier === "large" ? "landing" : "full";
}

function wordsV5(lines, fmEnd) {
  const body = lines.slice(fmEnd + 1).join("\n");
  return body.split(/\s+/).filter(Boolean).length;
}

// `flow` and `prose`, per the frozen definitions above.
function slices(lines, fmEnd) {
  const kept = [];
  let inFence = false;
  for (let i = fmEnd + 1; i < lines.length; i++) {
    const l = lines[i];
    if (/^\s*```/.test(l)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    kept.push(l.replace(/^- /, "").replace(/^\d+\. /, ""));
  }
  return {
    flow: kept.join("\n"),
    prose: kept.filter((l) => !/^#{1,6} /.test(l)).join("\n"),
  };
}

const STOP = /[А-ЯЁA-Z0-9«"„—]/;
const TERM = /[.!?…]/;

function sentences(flow) {
  const out = [];
  let cur = "";
  for (let i = 0; i < flow.length; i++) {
    const c = flow[i];
    if (c === "\n") {
      out.push(cur);
      cur = "";
      continue;
    }
    cur += c;
    if (TERM.test(c)) {
      let j = i + 1;
      while (j < flow.length && /\s/.test(flow[j])) j++;
      if (j >= flow.length || STOP.test(flow[j])) {
        out.push(cur);
        cur = "";
      }
    }
  }
  if (cur) out.push(cur);
  return out.map((s) => s.trim()).filter(Boolean);
}

function median(nums) {
  if (!nums.length) return null;
  const s = [...nums].sort((a, b) => a - b);
  const m = s.length >> 1;
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
}

function pearson(a, b) {
  const n = Math.min(a.length, b.length);
  if (n < 5) return null;
  const x = a.slice(0, n);
  const y = b.slice(0, n);
  const mx = x.reduce((s, v) => s + v, 0) / n;
  const my = y.reduce((s, v) => s + v, 0) / n;
  let sxy = 0, sxx = 0, syy = 0;
  for (let i = 0; i < n; i++) {
    const dx = x[i] - mx;
    const dy = y[i] - my;
    sxy += dx * dy;
    sxx += dx * dx;
    syy += dy * dy;
  }
  if (sxx === 0 || syy === 0) return null;
  return sxy / Math.sqrt(sxx * syy);
}

// Overlapping, case-insensitive occurrence count.
function occurrences(text, phrase) {
  const t = text.toLowerCase();
  const p = phrase.toLowerCase();
  let n = 0;
  let i = 0;
  while ((i = t.indexOf(p, i)) !== -1) {
    n++;
    i += 1;
  }
  return n;
}

function matches(re, text) {
  const m = text.match(re);
  return m ? m.length : 0;
}

function measure(file) {
  const text = norm(readFileSync(file, "utf8"));
  const lines = text.split("\n");
  const { end, keys } = frontmatter(lines);
  const shape = shapeOf(rel(file), keys);
  const { flow, prose } = slices(lines, end);
  const rs = sentences(flow);
  const med = median(rs.map((s) => s.length));
  const m = {
    file,
    path: rel(file),
    shape,
    words: wordsV5(lines, end),
    sentences: rs.length,
    median: med,
    copula: occurrences(prose, "— это "),
    participle: matches(PARTICIPLE, prose),
    connectors: CONNECTORS.reduce((s, c) => s + occurrences(prose, c), 0),
    odnako: occurrences(prose, "однако"),
    blacklist: BLACKLIST.reduce((s, p) => s + occurrences(prose, p), 0),
    corr: null,
    sameCount: null,
    ratio: null,
  };
  const twin = join(LESSONS, rel(file).replace(/^lessons\/ru\//, ""));
  try {
    const enText = norm(readFileSync(twin, "utf8"));
    const enLines = enText.split("\n");
    const enSents = sentences(slices(enLines, frontmatter(enLines).end).flow);
    const enMed = median(enSents.map((s) => s.length));
    m.corr = pearson(rs.map((s) => s.length), enSents.map((s) => s.length));
    m.sameCount = rs.length === enSents.length;
    m.ratio = enMed ? med / enMed : null;
  } catch {
    /* no twin: the measurement inputs are simply absent */
  }
  return m;
}

// ---- file selection ----------------------------------------------------------------------------
let files = walk(RU).sort((a, b) => (rel(a) < rel(b) ? -1 : rel(a) > rel(b) ? 1 : 0));
if (topic !== null) files = files.filter((f) => rel(f).startsWith(`lessons/ru/${topic}/`));
if (fileArg !== null) {
  const abs = isAbsolute(fileArg) ? fileArg : join(ROOT, fileArg);
  const want = abs.split(sep).join("/");
  files = files.filter((f) => f.split(sep).join("/") === want);
}
if ((topic !== null || fileArg !== null) && files.length === 0) {
  console.error("no files matched");
  process.exit(2);
}

// ---- diff mode ---------------------------------------------------------------------------------
if (diff) {
  const fmBlock = (lines) => {
    const { end } = frontmatter(lines);
    return end < 0 ? "" : lines.slice(0, end + 1).join("\n");
  };
  const fences = (lines) => {
    const out = [];
    let open = -1;
    for (let i = 0; i < lines.length; i++) {
      if (!/^\s*```/.test(lines[i])) continue;
      if (open < 0) open = i;
      else {
        out.push(lines.slice(open, i + 1).join("\n"));
        open = -1;
      }
    }
    if (open >= 0) out.push(lines.slice(open).join("\n"));
    return out;
  };
  const spans = (text) => (text.match(/`[^`\n]+`/g) || []).slice().sort();
  const nums = (text) => (text.match(/\d+([.,]\d+)*/g) || []).slice().sort();
  const byLine = (lines, re) => lines.filter((l) => re.test(l)).join("\n");
  const literalCounts = (text) =>
    ["Готово, когда:", "Нет.", "; исправить: ", "### Решение"].map((s) => text.split(s).length - 1).join(",");

  let structural = 0;
  const compare = (line) => {
    structural++;
    console.log(line);
  };
  for (const f of files) {
    const path = rel(f);
    const now = norm(readFileSync(f, "utf8")).split("\n");
    let base;
    try {
      base = norm(
        execFileSync("git", ["show", `${BASELINE}:${path}`], {
          cwd: ROOT,
          encoding: "utf8",
          maxBuffer: 1 << 28,
        }),
      ).split("\n");
    } catch {
      compare(`${path}: [D9] missing baseline blob at ${BASELINE}`);
      continue;
    }
    if (fmBlock(base) !== fmBlock(now)) compare(`${path}: [D1] frontmatter differs from the baseline`);
    if (byLine(base, /^## /) !== byLine(now, /^## /)) compare(`${path}: [D2] ## heading lines differ from the baseline`);
    const fb = fences(base).join("\n\u0000\n");
    const fn = fences(now).join("\n\u0000\n");
    if (fb !== fn) compare(`${path}: [D3] fenced blocks differ from the baseline`);
    if (spans(base.join("\n")).join("\n") !== spans(now.join("\n")).join("\n"))
      compare(`${path}: [D4] backticked spans differ from the baseline`);
    if (nums(base.join("\n")).join("\n") !== nums(now.join("\n")).join("\n"))
      compare(`${path}: [D5] numeric tokens differ from the baseline`);
    const exRe = /^## Пример \d+ — /;
    if (byLine(base, exRe) !== byLine(now, exRe)) compare(`${path}: [D6] ## Пример headings differ from the baseline`);
    if (literalCounts(base.join("\n")) !== literalCounts(now.join("\n")))
      compare(`${path}: [D7] literal counts differ from the baseline`);
    const words = wordsV5(now, frontmatter(now).end);
    const [min, max] = BANDS[shapeOf(path, frontmatter(now).keys)];
    if (words < min || words > max)
      compare(`${path}: [D8] ${words} words is outside the ${shapeOf(path, frontmatter(now).keys)} band ${band([min, max])}`);
    const status = frontmatter(now).keys.status;
    if (status !== undefined && status !== "drafted") compare(`${path}: [D10] status is '${status}', expected 'drafted'`);
  }
  console.log(`${files.length} files compared against ${BASELINE}: ${structural} structural differences`);
  process.exit(structural ? 1 : 0);
}

// ---- report mode -------------------------------------------------------------------------------
const rows = files.map(measure);
const total = rows.reduce((s, r) => s + r.words, 0);
const withTwin = rows.filter((r) => r.sameCount !== null);
const same = withTwin.filter((r) => r.sameCount).length;
const corrs = rows.map((r) => r.corr).filter((c) => c !== null);
const ratios = rows.map((r) => r.ratio).filter((c) => c !== null);
const blockFiles = rows.filter((r) => r.blacklist > 0).length;
const sum = (k) => rows.reduce((s, r) => s + r[k], 0);
const per1000 = (k) => (total ? (sum(k) / total) * 1000 : 0);

const rMean = corrs.length ? corrs.reduce((s, c) => s + c, 0) / corrs.length : null;
const lengthRatio = ratios.length ? ratios.reduce((s, c) => s + c, 0) / ratios.length : null;
const sameCountPct = withTwin.length ? (same / withTwin.length) * 100 : 0;
const odnako = per1000("odnako");
const copula = per1000("copula");
const participle = per1000("participle");
const blacklist = sum("blacklist");

const f3 = (v) => (v === null ? "n/a" : v.toFixed(3));
const f2 = (v) => v.toFixed(2);

console.log(`${rows.length} files, ${total} words`);
console.log(`  correlation with the English twin   mean ${f3(rMean)}   target <= ${TARGETS.rMean.toFixed(2)}`);
console.log(
  `  same sentence count as the English   ${same}/${withTwin.length} = ${sameCountPct.toFixed(1)}%   target <= ${TARGETS.sameCountPct}%`,
);
console.log(`  RU/EN median sentence-length ratio   mean ${f3(lengthRatio)}   target >= ${TARGETS.lengthRatio.toFixed(2)}`);
console.log(`  однако per 1000 words                ${f2(odnako)}   target >= ${TARGETS.odnako.toFixed(2)}`);
console.log(`  X — это per 1000 words               ${f2(copula)}   target <= ${TARGETS.copula.toFixed(2)}`);
console.log(`  attributive participles per 1000     ${f2(participle)}   target <= ${TARGETS.participle.toFixed(2)}`);
console.log(`  blacklist hits                       ${blacklist} in ${blockFiles} files   target ${TARGETS.blacklist}`);

if (fileArg !== null) {
  for (const r of rows) {
    console.log(
      `${r.path}: sentences ${r.sentences}, same as EN: ${r.sameCount === null ? "n/a" : r.sameCount ? "yes" : "no"}, ` +
        `corr ${f3(r.corr)}, median ratio ${f3(r.ratio)}, — это ${r.copula}, participles ${r.participle}, ` +
        `однако ${r.odnako}, blacklist ${r.blacklist}, words ${r.words}`,
    );
  }
} else {
  const warnings = [];
  for (const r of rows) {
    const msgs = [];
    if (r.copula > TARGETS.copulaPerFile) msgs.push(`— это ×${r.copula} (max ${TARGETS.copulaPerFile})`);
    if (r.blacklist > 0) msgs.push(`blacklist ×${r.blacklist}`);
    if (msgs.length) warnings.push(`${r.path}: [S1] ${msgs.join("; ")}`);
  }
  for (const w of warnings.slice(0, 20)) console.log(w);
}

const missed =
  (rMean === null || rMean > TARGETS.rMean) ||
  sameCountPct > TARGETS.sameCountPct ||
  (lengthRatio === null || lengthRatio < TARGETS.lengthRatio) ||
  odnako < TARGETS.odnako ||
  copula > TARGETS.copula ||
  participle > TARGETS.participle ||
  blacklist > TARGETS.blacklist ||
  rows.some((r) => r.copula > TARGETS.copulaPerFile || r.blacklist > 0);
process.exit(strict && missed ? 1 : 0);
