#!/usr/bin/env node
// Validates the lessons corpus against tools/inventory.json and lessons/AUTHORING.md.
// Zero dependencies: plain Node ESM, no package.json, no installed packages.
import { mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const LESSONS = join(ROOT, "lessons");
const ROOTS = { en: LESSONS, ru: join(LESSONS, "ru") };
const LANGS = ["en", "ru", "all"];
const INVENTORY = join(ROOT, "tools", "inventory.json");

const TOPICS = ["01-cs-fundamentals", "02-frontend", "03-design-ux", "04-product-process", "05-backend-data", "06-cloud-devops", "07-security", "08-soft-skills"];
const SHAPES = {
  en: {
    full: ["What it is", "Why it matters", "Core ideas", "Practice", "Common mistakes", "Go deeper"],
    landing: ["What it is", "Why it matters", "In this track", "Prerequisites", "Go deeper"],
    area: ["What it covers", "Why it matters", "Included skills", "Where to start"],
  },
  ru: {
    full: ["Что это такое", "Почему это важно", "Ключевые идеи", "Практика", "Частые ошибки", "Что читать дальше"],
    landing: ["Что это такое", "Почему это важно", "Что в этом треке", "Предварительные требования", "Что читать дальше"],
    // The area shape keeps the English four headings; 'Что это такое' belongs to full and landing only.
    area: ["Что охватывает", "Почему это важно", "Входящие навыки", "С чего начать"],
  },
};
const WORDS = {
  en: { full: [450, 950], landing: [200, 400], area: [120, 300] },
  ru: { full: [400, 1100], landing: [180, 460], area: [100, 340] },
};
const LITERALS = {
  en: {
    core: "Core ideas", practice: "Practice", mistakes: "Common mistakes", deeper: "Go deeper",
    track: "In this track", prereqs: "Prerequisites", included: "Included skills", where: "Where to start",
    done: "Done when:", none: "None.", fix: "; fix: ",
    solution: "### Solution", examplePrefix: "## Example ", examplesWords: [120, 450],
  },
  ru: {
    core: "Ключевые идеи", practice: "Практика", mistakes: "Частые ошибки", deeper: "Что читать дальше",
    track: "Что в этом треке", prereqs: "Предварительные требования", included: "Входящие навыки", where: "С чего начать",
    done: "Готово, когда:", none: "Нет.", fix: "; исправить: ",
    solution: "### Решение", examplePrefix: "## Пример ", examplesWords: [100, 500],
  },
};
const L = () => LITERALS[currentLang];
const CHILDREN = { small: 0, medium: 2, large: 4, area: 0 };
const INDEX_KEYS = ["title", "type", "topic", "tier", "status", "aliases", "prereqs", "related"];
const CHILD_KEYS = ["title", "prereqs"];
const CHILD_NAME = /^\d{2}-[a-z0-9]+(-[a-z0-9]+)*\.md$/;
const EXAMPLES_NAME = /^examples\.md$|^examples\.\d{2}-[a-z0-9]+(-[a-z0-9]+)*\.md$/;

const argv = process.argv.slice(2);
let strict = false;
let writeIndex = false;
let lang = "en";
const topicFilter = new Set();
for (let i = 0; i < argv.length; i++) {
  const a = argv[i];
  if (a === "--strict") strict = true;
  else if (a === "--write-index") writeIndex = true;
  else if (a === "--lang") {
    if (!argv[i + 1]) { console.error("--lang needs a value"); process.exit(2); }
    lang = argv[++i];
  } else if (a === "--topic") {
    if (!argv[i + 1]) { console.error("--topic needs a topic slug"); process.exit(2); }
    topicFilter.add(argv[++i]);
  } else { console.error(`unknown argument: ${a}`); process.exit(2); }
}
if (!LANGS.includes(lang)) {
  console.error(`unknown --lang '${lang}'; accepted values: ${LANGS.join(", ")}`);
  process.exit(2);
}
const inScope = (topic) => topicFilter.size === 0 || topicFilter.has(topic);

let errors = [];
let currentLang = "en";
const rel = (p) => (p.startsWith(ROOT) ? p.slice(ROOT.length + 1) : p).split("\\").join("/");
function err(tag, file, line, message) {
  errors.push({ tag, file: rel(file), line, message });
}

// ---- V1: inventory ---------------------------------------------------------
let inventory = [];
try {
  inventory = JSON.parse(readFileSync(INVENTORY, "utf8"));
} catch (e) {
  err("V1", INVENTORY, 0, `inventory cannot be read: ${e.message}`);
}
if (!Array.isArray(inventory)) {
  err("V1", INVENTORY, 0, "inventory must be a JSON array");
  inventory = [];
}
if (inventory.length !== 177) err("V1", INVENTORY, 0, `inventory has ${inventory.length} entries, expected 177`);
const byId = new Map();
for (const e of inventory) {
  const line = 0;
  if (typeof e.id !== "string" || typeof e.topic !== "string" || typeof e.slug !== "string") {
    err("V1", INVENTORY, line, "entry is missing id/topic/slug strings");
    continue;
  }
  if (e.id !== `${e.topic}/${e.slug}`) err("V1", INVENTORY, line, `id '${e.id}' does not equal topic/slug`);
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(e.slug)) err("V1", INVENTORY, line, `slug '${e.slug}' is not lowercase-hyphenated`);
  if (!TOPICS.includes(e.topic)) err("V1", INVENTORY, line, `unknown topic '${e.topic}'`);
  if (e.type !== "skill" && e.type !== "area") err("V1", INVENTORY, line, `type '${e.type}' must be skill or area`);
  if (!(e.tier in CHILDREN)) err("V1", INVENTORY, line, `tier '${e.tier}' must be small, medium or large`);
  if (e.type === "area" && e.tier !== "small") err("V1", INVENTORY, line, `area '${e.id}' must be small`);
  if (byId.has(e.id)) err("V1", INVENTORY, line, `duplicate id '${e.id}'`);
  byId.set(e.id, e);
  for (const k of ["prereqs", "aliases"]) {
    if (!Array.isArray(e[k]) || e[k].some((v) => typeof v !== "string")) err("V1", INVENTORY, line, `${e.id}: '${k}' must be an array of strings`);
  }
}
for (const e of inventory) {
  for (const p of e.prereqs || []) {
    if (!byId.has(p)) err("V1", INVENTORY, 0, `${e.id}: prereq '${p}' is not in the inventory`);
    if (p === e.id) err("V1", INVENTORY, 0, `${e.id}: lists itself as a prereq`);
  }
}

// ---- filesystem scan -------------------------------------------------------
function subdirs(dir) {
  try { return readdirSync(dir).filter((n) => statSync(join(dir, n)).isDirectory()); } catch { return []; }
}
function scanDirs(rootDir, skipRu) {
  const out = [];
  for (const topic of subdirs(rootDir)) {
    if (skipRu && topic === "ru") continue;
    for (const slug of subdirs(join(rootDir, topic))) {
      const id = `${topic}/${slug}`;
      const dir = join(rootDir, topic, slug);
      const md = readdirSync(dir).filter((n) => n.endsWith(".md")).sort();
      out.push({ id, topic, slug, dir, index: join(dir, "index.md"), children: md.filter((n) => /^\d{2}-/.test(n)), examples: md.filter((n) => /^examples/.test(n)), files: md });
    }
  }
  return out;
}

// ---- V12: the set of ids a link may point at --------------------------------
// The id namespace is shared by both roots; the English tree is the authoritative one.
const resolvable = new Set(byId.keys());
for (const topic of TOPICS) {
  for (const slug of subdirs(join(LESSONS, topic))) {
    for (const n of readdirSync(join(LESSONS, topic, slug))) {
      if (n.endsWith(".md") && /^\d{2}-/.test(n)) resolvable.add(`${topic}/${slug}/${n.slice(0, -3)}`);
    }
  }
}

// ---- per-root state (reset for each language root) --------------------------
let present = 0;
let pending = 0;
let examplesPresent = 0;
let examplesPending = 0;
let seen = new Set();
let dirs = [];

// ---- helpers ---------------------------------------------------------------
function parse(file) {
  const text = readFileSync(file, "utf8").split("\r\n").join("\n");
  const lines = text.split("\n");
  const out = { file, text, lines, bodyStart: 0, fm: null };
  if ((lines[0] || "").trim() !== "---") return out;
  let end = -1;
  for (let i = 1; i < lines.length; i++) if (lines[i].trim() === "---") { end = i; break; }
  if (end < 0) return out;
  const fm = [];
  for (let i = 1; i < end; i++) {
    const m = /^([A-Za-z_][A-Za-z0-9_-]*):\s*(.*)$/.exec(lines[i]);
    if (m) fm.push({ key: m[1], value: m[2].trim(), line: i + 1 });
  }
  out.fm = fm;
  out.bodyStart = end + 1;
  return out;
}
function sections(p) {
  const heads = [];
  for (let i = p.bodyStart; i < p.lines.length; i++) {
    const m = /^## (.+?)\s*$/.exec(p.lines[i]);
    if (m) heads.push({ title: m[1], line: i + 1, at: i });
  }
  return heads.map((h, k) => ({
    title: h.title, line: h.line,
    lines: p.lines.slice(h.at + 1, k + 1 < heads.length ? heads[k + 1].at : p.lines.length),
  }));
}
function fmv(p, key) { const e = (p.fm || []).find((x) => x.key === key); return e ? e.value : null; }
function parseList(v) {
  const m = /^\[(.*)\]$/.exec(v || "");
  if (!m) return null;
  const inner = m[1].trim();
  if (!inner) return [];
  const out = [];
  for (const part of inner.split(",")) {
    const q = /^"(.*)"$/.exec(part.trim());
    if (!q) return null;
    out.push(q[1]);
  }
  return out;
}
function ids(lines, re) {
  const out = [];
  lines.forEach((l, i) => { const m = re.exec(l); if (m) out.push({ id: m[1], line: i }); });
  return out;
}
function shapeOf(entry, p) {
  if (entry) {
    if (entry.type === "area") return "area";
    return entry.tier === "small" ? "full" : "landing";
  }
  const type = fmv(p, "type");
  const tier = fmv(p, "tier");
  if (type === "area") return "area";
  return tier === "medium" || tier === "large" ? "landing" : "full";
}

// ---- V15/V16: examples files ----------------------------------------------
function hasPractice(file) {
  try { return sections(parse(file)).some((s) => s.title === L().practice); } catch { return false; }
}
function checkExamplesFile(file) {
  const p = parse(file);
  const lines = p.lines;
  if (p.text.startsWith("---")) err("V15", file, 1, "examples file must not start with frontmatter");

  const heads = [];
  for (let i = 0; i < lines.length; i++) if (lines[i].startsWith("## ")) heads.push({ line: i, text: lines[i] });
  const exRe = new RegExp(`^${L().examplePrefix}([1-2]) — .+$`);
  const parsed = heads.map((h) => exRe.exec(h.text));
  if (heads.length < 1 || heads.length > 2 || parsed.some((m) => !m)) {
    err("V15", file, heads.length ? heads[0].line + 1 : 1, `examples headings must be 1-2 matching '${L().examplePrefix}N — …', found ${heads.length}`);
  } else if (parsed[0][1] !== "1" || (parsed.length === 2 && parsed[1][1] !== "2")) {
    err("V15", file, heads[0].line + 1, "examples must be numbered 1 then 2");
  }

  const fenceAt = [];
  let inFence = false;
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    if (!/^```[^`]*$/.test(l)) continue;
    fenceAt.push(i);
    if (!inFence) {
      if (l.slice(3).trim() === "") err("V15", file, i + 1, "fenced block needs a language tag");
      inFence = true;
    } else {
      inFence = false;
    }
  }

  const bounds = heads.map((h) => h.line).concat([lines.length]);
  for (let k = 0; k < heads.length; k++) {
    const start = bounds[k];
    const end = bounds[k + 1];
    const sols = [];
    for (let i = start; i < end; i++) if (lines[i] === L().solution) sols.push(i);
    if (sols.length !== 1) { err("V15", file, start + 1, `example ${k + 1} needs exactly one '${L().solution}', found ${sols.length}`); continue; }
    if (!fenceAt.some((i) => i > start && i < sols[0])) err("V15", file, start + 1, `example ${k + 1} needs a fenced block before '### Solution'`);
    if (!fenceAt.some((i) => i > sols[0] && i < end)) err("V15", file, start + 1, `example ${k + 1} needs a fenced block after '### Solution'`);
  }

  const ew = L().examplesWords;
  const words = p.lines.slice(p.bodyStart).join("\n").split(/\s+/).filter(Boolean).length;
  if (words < ew[0] || words > ew[1]) err("V15", file, 1, `examples body is ${words} words, expected ${ew[0]}-${ew[1]}`);
  const urlAt = lines.findIndex((l) => /https?:\/\//.test(l));
  if (urlAt >= 0) err("V15", file, urlAt + 1, "external URL is not allowed");
}

// ---- V3-V11: one lesson file ----------------------------------------------
function checkLesson(p, shape, entry, ownPrereqs, childIds) {
  const file = p.file;
  if (!p.fm) { err("V3", file, 1, "missing frontmatter block"); return; }
  const keys = p.fm.map((e) => e.key);
  if (keys.join(",") !== INDEX_KEYS.join(",") && keys.join(",") !== CHILD_KEYS.join(",")) {
    err("V3", file, p.fm[0].line, `frontmatter keys are [${keys.join(", ")}], expected ${
      shape === "full" && ownPrereqs && entry === null ? CHILD_KEYS.join(", ") : INDEX_KEYS.join(", ")}`);
  }
  if (entry) {
    for (const k of ["title", "type", "tier"]) {
      // The Russian root keeps the English ids but its own title, so only the shared metadata is compared.
      if (k === "title" && currentLang === "ru") continue;
      const v = fmv(p, k);
      if (v !== entry[k]) err("V3", file, (p.fm.find((e) => e.key === k) || {}).line || 1, `${k} is '${v}', inventory says '${entry[k]}'`);
    }
  }
  if (fmv(p, "title") === null) err("V3", file, 1, "title is missing");
  if (entry) {
    const t = fmv(p, "topic");
    if (t !== entry.topic) err("V3", file, 1, `topic is '${t}', expected '${entry.topic}'`);
    const st = fmv(p, "status");
    if (!["stub", "drafted", "reviewed"].includes(st)) err("V3", file, 1, `status '${st}' is not stub|drafted|reviewed`);
    const pr = parseList(fmv(p, "prereqs"));
    const rel_ = parseList(fmv(p, "related"));
    const al = parseList(fmv(p, "aliases"));
    if (al === null) err("V3", file, 1, "aliases is not an array");
    if (pr === null) err("V3", file, 1, "prereqs is not an array");
    if (rel_ === null) err("V3", file, 1, "related is not an array");
    if (pr) {
      const a = new Set(pr), b = new Set(entry.prereqs);
      if (a.size !== b.size || [...b].some((x) => !a.has(x))) err("V3", file, 1, `prereqs [${pr.join(", ")}] differ from inventory [${entry.prereqs.join(", ")}]`);
    }
    for (const x of (rel_ || [])) if (!resolvable.has(x)) err("V3", file, 1, `related '${x}' does not resolve`);
  }
  for (const x of ownPrereqs) if (!resolvable.has(x)) err("V3", file, 1, `prereqs '${x}' does not resolve`);

  const heads = [];
  for (let i = p.bodyStart; i < p.lines.length; i++) {
    const m = /^## (.+?)\s*$/.exec(p.lines[i]);
    if (m) heads.push({ title: m[1], line: i + 1 });
  }
  const got = heads.map((h) => h.title);
  const want = SHAPES[currentLang][shape];
  if (got.length !== want.length || got.some((t, i) => t !== want[i])) {
    err("V4", file, heads.length ? heads[0].line : p.bodyStart + 1, `headings [${got.join(", ")}] do not match the ${shape} shape [${want.join(", ")}]`);
  }
  const body = p.lines.slice(p.bodyStart).join("\n");
  const words = body.split(/\s+/).filter(Boolean).length;
  const [min, max] = WORDS[currentLang][shape];
  if (words < min || words > max) err("V5", file, p.bodyStart + 1, `${shape} body is ${words} words, expected ${min}-${max}`);

  const urlAt = p.lines.findIndex((l) => /https?:\/\//.test(l));
  if (urlAt >= 0) err("V6", file, urlAt + 1, "external URL is not allowed");

  const secs = sections(p);
  const sec = (t) => secs.find((s) => s.title === t);
  const core = sec(L().core);
  if (core) {
    const n = core.lines.filter((l) => /^### /.test(l)).length;
    if (n < 3 || n > 6) err("V7", file, core.line, `Core ideas has ${n} subheadings, expected 3-6`);
  }
  const prac = sec(L().practice);
  if (prac) {
    if (!prac.lines.some((l) => /^### /.test(l))) err("V7", file, prac.line, `${L().practice} needs at least one exercise subheading`);
    if (!prac.lines.some((l) => l.startsWith(L().done))) err("V7", file, prac.line, `Practice needs a line beginning '${L().done}'`);
  }
  const cm = sec(L().mistakes);
  if (cm) {
    const cmRe = new RegExp(`^- \\*\\*.+\\*\\* — .+${L().fix}.+$`);
    const n = cm.lines.filter((l) => cmRe.test(l)).length;
    if (n < 3 || n > 5) err("V7", file, cm.line, `Common mistakes has ${n} well-formed bullets, expected 3-5`);
  }
  const gd = sec(L().deeper);
  if (gd) {
    const bullets = ids(gd.lines, /^- \*\*.+\*\* \(`([^`]+)`\) — .+$/);
    if (bullets.length < 2 || bullets.length > 5) err("V7", file, gd.line, `Go deeper has ${bullets.length} bullets, expected 2-5`);
    for (const b of bullets) if (!resolvable.has(b.id)) err("V7", file, gd.line + b.line + 1, `Go deeper id '${b.id}' does not resolve`);
    if (shape !== "landing") {
      for (const q of ownPrereqs) if (!bullets.some((b) => b.id === q)) err("V7", file, gd.line, `Go deeper must link prerequisite '${q}'`);
    }
  }
  if (shape === "landing") {
    const track = sec(L().track);
    if (track) {
      const listed = ids(track.lines, /^\d+\. \*\*.+\*\* \(`([^`]+)`\) — .+$/);
      if (listed.length !== childIds.length || listed.some((l, i) => l.id !== childIds[i])) {
        err("V9", file, track.line, `In this track lists [${listed.map((l) => l.id).join(", ")}], expected [${childIds.join(", ")}]`);
      }
    }
    const pre = sec(L().prereqs);
    if (pre && entry) {
      const body = pre.lines.filter((l) => l.trim()).join("\n");
      const listed = ids(pre.lines, /^- \*\*.+\*\* \(`([^`]+)`\)/);
      if (entry.prereqs.length === 0) {
        if (!pre.lines.some((l) => l.trim() === L().none)) err("V10", file, pre.line, `Prerequisites must read '${L().none}'`);
      } else if (listed.length !== entry.prereqs.length || listed.some((l, i) => l.id !== entry.prereqs[i])) {
        err("V10", file, pre.line, `Prerequisites lists [${listed.map((l) => l.id).join(", ")}], expected [${entry.prereqs.join(", ")}] (body: ${body.length})`);
      }
    }
  }
  if (shape === "area") {
    const inc = sec(L().included);
    if (inc) {
      const listed = ids(inc.lines, /^- \*\*.+\*\* \(`([^`]+)`\) — .+$/);
      if (listed.length === 0) err("V11", file, inc.line, "Included skills needs at least one bullet");
      for (const b of listed) if (!resolvable.has(b.id)) err("V11", file, inc.line + b.line + 1, `Included skills id '${b.id}' does not resolve`);
    }
    const where = sec(L().where);
    if (where && where.lines.join("").trim() === "") err("V11", file, where.line, "Where to start is empty");
  }
  if (currentLang === "ru") checkTitlesRu(p);
}

// ---- V17: Russian cross-reference titles (Russian root only) ---------------
const RU_TITLE_SECTIONS = ["Предварительные требования", "Что в этом треке", "Входящие навыки", "Что читать дальше"];
function ruFileTitle(file) {
  try { return fmv(parse(file), "title"); } catch { return null; }
}
function checkTitlesRu(p) {
  const secs = sections(p);
  for (const name of RU_TITLE_SECTIONS) {
    const s = secs.find((x) => x.title === name);
    if (!s) continue;
    s.lines.forEach((line, i) => {
      const m = /^(?:\d+\. |- )\*\*(.+?)\*\* \(`([^`]+)`\)/.exec(line);
      if (!m) return;
      const bulletTitle = m[1];
      const id = m[2];
      const target = byId.has(id) ? join(ROOTS.ru, id, "index.md") : join(ROOTS.ru, `${id}.md`);
      const title = ruFileTitle(target);
      if (title === null) return; // target not translated yet
      if (title !== bulletTitle) err("V17", p.file, s.line + i + 1, `title mismatch for '${id}': bullet says '${bulletTitle}', target title is '${title}'`);
    });
  }
}

// ---- V2 coverage, V14 unknown entries, V8 children -------------------------
function runRoot(which) {
  const rootDir = ROOTS[which];
  currentLang = which;
  errors = [];
  present = 0;
  pending = 0;
  examplesPresent = 0;
  examplesPending = 0;
  seen = new Set();
  dirs = scanDirs(rootDir, which === "en");
  for (const d of dirs) {
    if (!inScope(d.topic)) continue;
    seen.add(d.id);
    const entry = byId.get(d.id) || null;
    const indexExists = d.files.includes("index.md");
    if (entry && !indexExists) {
      pending++;
      if (strict) err("V2", d.index, 0, "entry is not written yet");
    }
    if (!entry) err("V14", d.index, 1, `unknown entry directory (declares title '${fileTitle(d.index)}')`);
    if (entry && indexExists) present++;

    const childIds = d.children.map((n) => `${d.id}/${n.slice(0, -3)}`);
    if (indexExists) {
      const p = parse(d.index);
      const shape = shapeOf(entry, p);
      const ownPrereqs = parseList(fmv(p, "prereqs")) || [];
      checkLesson(p, shape, entry, ownPrereqs, childIds);
      const fmTier = fmv(p, "tier");
      const expectKids = entry ? CHILDREN[entry.tier] : CHILDREN[fmv(p, "type") === "area" ? "area" : (fmTier in CHILDREN ? fmTier : "small")];
      if (d.children.length !== expectKids) {
        err("V8", d.dir, 1, `${d.id} has ${d.children.length} child lesson(s), tier expects ${expectKids}`);
      }
      let n = 0;
      for (const name of d.children) {
        n++;
        if (!CHILD_NAME.test(name)) err("V8", join(d.dir, name), 1, `child filename '${name}' must match NN-slug.md`);
        if (name.slice(0, 2) !== String(n).padStart(2, "0")) err("V8", join(d.dir, name), 1, "child numbering must start at 01 and be contiguous");
        const cp = parse(join(d.dir, name));
        if (!cp.fm) { err("V3", join(d.dir, name), 1, "missing frontmatter block"); continue; }
        const ck = cp.fm.map((e) => e.key).join(",");
        if (ck !== CHILD_KEYS.join(",")) err("V3", join(d.dir, name), cp.fm[0].line, `child frontmatter keys are [${cp.fm.map((e) => e.key).join(", ")}], expected [${CHILD_KEYS.join(", ")}]`);
        const cpre = parseList(fmv(cp, "prereqs")) || [];
        const selfIdx = childIds.indexOf(`${d.id}/${name.slice(0, -3)}`);
        for (const q of cpre) {
          if (!resolvable.has(q)) err("V3", join(d.dir, name), 1, `prereqs '${q}' does not resolve`);
          const sib = childIds.indexOf(q);
          if (sib > selfIdx) err("V8", join(d.dir, name), 1, `prereqs names later sibling '${q}'`);
        }
        checkLesson(cp, "full", null, cpre, []);
      }
    }

    for (const name of d.examples) {
      const file = join(d.dir, name);
      checkExamplesFile(file);
      examplesPresent++;
      if (!EXAMPLES_NAME.test(name)) {
        err("V16", file, 1, `examples filename '${name}' does not match examples.md / examples.NN-slug.md`);
        continue;
      }
      const lessonName = name === "examples.md" ? "index.md" : `${name.slice("examples.".length, -3)}.md`;
      if (!d.files.includes(lessonName)) err("V16", file, 1, `examples file has no lesson file '${lessonName}' beside it`);
      else if (!hasPractice(join(d.dir, lessonName))) err("V16", file, 1, `lesson file '${lessonName}' has no '## Practice' section`);
    }
    for (const name of d.files) {
      if (!name.endsWith(".md") || name.startsWith("examples")) continue;
      if (!hasPractice(join(d.dir, name))) continue;
      const exName = name === "index.md" ? "examples.md" : `examples.${name}`;
      if (d.examples.includes(exName)) continue;
      examplesPending++;
      if (strict) err("V16", join(d.dir, name), 0, `lesson file has no examples file '${exName}'`);
    }
  }
  for (const e of inventory) {
    if (!inScope(e.topic)) continue;
    if (!seen.has(e.id)) {
      pending++;
      if (strict) err("V2", join(rootDir, e.id, "index.md"), 0, "entry is not written yet");
    }
  }
  return { errors, present, pending, examplesPresent, examplesPending };
}
function fileTitle(file) {
  try {
    const v = fmv(parse(file), "title");
    return v === null ? "(no title)" : v;
  } catch { return "(unreadable)"; }
}

// ---- V13: --write-index ----------------------------------------------------
function writeIndexFor(which, rootDir) {
  const out = ["# Lesson index", ""];
  for (const topic of TOPICS) {
    const rows = inventory.filter((e) => e.topic === topic);
    if (!rows.length) continue;
    out.push(`## ${topic}`, "");
    for (const e of rows) {
      const f = join(rootDir, e.id, "index.md");
      let status = null;
      let title = which === "ru" ? "(pending)" : e.title;
      try {
        if (statSync(f).isFile()) {
          const p = parse(f);
          status = fmv(p, "status");
          if (which === "ru") title = fmv(p, "title") || "(pending)";
        }
      } catch { /* unwritten */ }
      const suffix = status ? `, ${status}` : " (pending)";
      let ex = "";
      try { if (statSync(join(rootDir, e.id, "examples.md")).isFile()) ex = ` · [examples](${e.id}/examples.md)`; } catch { /* no examples file */ }
      out.push(`- [${title}](${e.id}/index.md) — ${e.type}, ${e.tier}${suffix}${ex}`);
    }
    out.push("");
  }
  out.push(`${present} present, ${pending} pending`);
  mkdirSync(rootDir, { recursive: true });
  writeFileSync(join(rootDir, "INDEX.md"), out.join("\n") + "\n");
}

// ---- report ----------------------------------------------------------------
const selected = lang === "all" ? ["en", "ru"] : [lang];
const results = [];
for (const which of selected) {
  const r = runRoot(which);
  if (writeIndex) writeIndexFor(which, ROOTS[which]);
  r.errors.sort((a, b) => (a.file < b.file ? -1 : a.file > b.file ? 1 : a.line - b.line));
  results.push(r);
}
let totalErrors = 0;
for (const r of results) {
  for (const e of r.errors.slice(0, 20)) console.log(`${e.file}:${e.line} — [${e.tag}] ${e.message}`);
  if (r.errors.length > 20) console.log(`… ${r.errors.length - 20} more error(s)`);
  console.log(`${r.present} present, ${r.pending} pending, ${r.examplesPresent} examples, ${r.examplesPending} examples pending, ${r.errors.length} error(s)`);
  totalErrors += r.errors.length;
}
process.exitCode = totalErrors ? 1 : 0;
