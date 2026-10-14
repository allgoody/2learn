# Phase 1: Foundation & Pilot Gate

## Objective

Build the three contracts every later phase depends on — the authoring spec
(`lessons/AUTHORING.md`), the machine-readable inventory (`tools/inventory.json`) and
the validator (`tools/validate-content.mjs`) — then write **three exemplar lessons**
covering all three body shapes: one small skill, one large skill with its four child
lessons, and one area page. The phase ends at a hard stop: the user reviews the three
exemplars before any bulk writing begins. Getting the skeleton wrong here costs three
files to fix; getting it wrong after Phase 2 costs 77.

## Prerequisites

- Node ≥ 22 installed (`node -v`) — verified: v24.14.1, npm 11.11.0
- Repository is `D:/coding/apps/2learn`, clean working tree, one commit `c1a71ce`
- `.pi/plans/lessons-content-corpus/_index.md` and `inventory.md` read
- `seed/*.md` present and **read-only** (never modified by any work package)

## Shared Context

Read `_index.md` (Global Context, Global Constraints, Conventions) and
`inventory.md` (Appendix A) before starting. Everything below assumes those.

Source material for the exemplars:

- `seed/cs-fundamentals.md` — the line `- **Pseudocode** — Writing the logic in plain language before it becomes code.` (WP-4)
- `seed/frontend.md`, section `## Frameworks & libraries` — the line `- **React** — Component library for UIs; the largest ecosystem and job market.` (WP-5)
- `seed/design-ux.md`, section `## Umbrella terms` — the four UI/UX entries (WP-6)

There is no existing code to copy patterns from — this phase establishes them. The
exemplars written in WP-4–WP-6 **are** the patterns that every later work package
copies.

## Work Packages

### WP-1: Create the authoring spec

**Context:**
The repository has no authoring rules yet. From Phase 2 onward, work packages will be
executed by an agent or session that has only three inputs: this spec, the inventory
JSON, and an exemplar lesson. The spec must therefore be complete enough that a
writer who has never seen this plan can produce a conforming lesson. The validator
(WP-3) enforces most of it mechanically; the spec must state every rule the validator
checks, plus the ones it cannot check (voice, honesty, no padding).

**Task:**
Create `lessons/AUTHORING.md` with these 12 sections — the file title plus 11 numbered
`##` sections — in this order, using the content given under each heading. Write it as
instructions to a writer, second person, imperative. Do not add sections. Do not omit
rules.

1. **`# Authoring lessons`** — one paragraph: what this corpus is (177 entries from
   `seed/`, one directory per entry, ~401 files), and that this file is the
   authoritative contract for every lesson.
2. **`## 1. Layout and ids`** — the directory shape:
   `lessons/<topic>/<slug>/index.md` plus optional `NN-<slug>.md` children. State:
   topic is one of the 8 topic slugs; slug matches `^[a-z0-9]+(-[a-z0-9]+)*$`; the
   entry id is `<topic>/<slug>`; a child's id is `<entry id>/<filename without .md>`;
   children are ordered by filename ascending; there is no `order:` field. State that
   slugs, titles, tiers and prereqs come from `tools/inventory.json` and must never be
   re-derived.
3. **`## 2. Frontmatter — index.md`** — a fenced `yaml` example and a field table with
   exactly these eight keys **in this order**: `title` (string, verbatim from
   inventory), `type` (`skill` | `area`), `topic` (must equal the parent directory
   name), `tier` (`small` | `medium` | `large`; areas are always `small`), `status`
   (`stub` | `drafted` | `reviewed`), `aliases` (array of strings, use `[]`),
   `prereqs` (array of inventory ids, use `[]`), `related` (array of inventory ids,
   use `[]`). State that `prereqs` must match the inventory exactly — adding an edge
   the inventory does not list is an error, and so is omitting one. State that
   `related` prefers entries in the same seed `##` section but may reference any
   inventory id, and may be left empty rather than guessed.
4. **`## 3. Frontmatter — children`** — exactly two keys, in order: `title`,
   `prereqs`. Give the fenced example. State that children inherit topic and skill
   from their path and carry no `type`, `tier`, `aliases` or `related`. State that a
   child's `prereqs` may name the parent entry's inventory id, an earlier sibling child
   id (`<entry id>/<child filename without .md>`), or an inventory id the parent lists —
   never a later sibling, and never an id that does not resolve.
5. **`## 4. Body shapes`** — the three shapes as a table (name, when used, section
   headings in order, word budget):
   - **Full lesson** — a `small` skill's `index.md`, and every child lesson. Headings:
     `## What it is`, `## Why it matters`, `## Core ideas`, `## Practice`,
     `## Common mistakes`, `## Go deeper`. **450-950 words.**
   - **Track landing** — a `medium` or `large` skill's `index.md`. Headings:
     `## What it is`, `## Why it matters`, `## In this track`,
     `## Prerequisites`, `## Go deeper`. **200-400 words.**
   - **Area page** — any `type: area`. Headings: `## What it covers`,
     `## Why it matters`, `## Included skills`, `## Where to start`.
     **120-300 words.**
   State: no other `##` headings are permitted; headings are verbatim, sentence case;
   word count means whitespace-separated tokens in the body after the frontmatter,
   including code blocks.
6. **`## 5. Section rules`** — one subsection per section heading, each with the exact
   rules given here:
   - `## What it is` — 1-3 sentences expanding the seed's one-liner. Do not repeat the
     seed wording verbatim. No code unless it is a one-line illustration.
   - `## Why it matters` — one paragraph of 3-5 sentences. Concrete: what breaks
     without it, what it costs, where you meet it in practice. No marketing adjectives.
   - `## Core ideas` — **3 to 6** `###` subheadings, each a noun phrase, each followed
     by 2-4 sentences and a short fenced example block where the topic allows one.
     Order them from foundation to detail.
   - `## Practice` — 1-2 `###` exercises. Each ends with a line beginning
     `Done when:` naming a concrete, observable result ("Done when: `npm test`
     reports 3 passing tests and you have seen one of them fail first.").
   - `## Common mistakes` — 3-5 bullets, each matching exactly
     ``- **<mistake>** — <what goes wrong>; fix: <what to do instead>.``
   - `## Go deeper` — 2-5 bullets, each matching
     ``- **<Title>** (`<id>`) — <why it is the next thing to read>``. Ids must resolve
     to an inventory id or to a child of the current entry. **For a `small` skill and
     for a child lesson it must include one bullet for every id that file's `prereqs`
     array names** — neither shape has a `## Prerequisites` section, so this is where
     the reader sees what to read first. A track landing is exempt: it lists its
     prereqs under `## Prerequisites` instead.
   - `## In this track` — a numbered list, one line per child, in child order, each
     `1. **<child title>** (`<child id>`) — <one line on what it covers>`. The number
     of lines must equal the tier's child count.
   - `## Prerequisites` — one bullet per inventory prereq,
     `- **<Title>** (`<id>`)`, or the single line `None.` when there are none.
   - `## Included skills` (area only) — one bullet per entry the area covers,
     `- **<Title>** (`<id>`) — <one line>`.
   - `## Where to start` (area only) — 2-4 sentences naming which included entries to
     read first and in what order.
7. **`## 6. Tiers and child count`** — table: `small` 0 children, `medium` 2,
   `large` 4, `area` 0. Then the writing procedure, in this order: (a) read the entry's
   row in `tools/inventory.json`; (b) for medium/large, decide the child lesson titles
   that partition the topic and write them into the index's `## In this track` list
   first; (c) write `index.md`; (d) write the children in filename order, each a full
   lesson. State that the child titles are the writer's only design decision, that
   they must not overlap each other, and that they must cover the whole topic.
8. **`## 7. Prerequisites`** — state that the graph is given, not chosen; that
   cross-topic edges are normal; that a prereq may point at an entry not yet written
   (the validator reports it as pending, not an error); and that `related` is for
   sibling entries only.
9. **`## 8. Merged entries`** — reproduce the three-row merge table from `_index.md`
   (the six cloud umbrellas → `cloud-devops/cloud-computing`; the four UI/UX wordings →
   `design-ux/ui-ux-design`; the three software-development wordings →
   `product-process/software-development`). State that the absorbed names live in
   those entries' `aliases`, that no lesson is written for them, and that `seed/`
   remains the archive of the original list.
10. **`## 9. Voice`** — British English (`organise`, `colour`, `centred`, `labelled`,
    `recognise`, `behaviour`); titles keep their inventory spelling verbatim. Second
    person, present tense, active voice. Define a term on first use. Prefer a concrete
    example to an abstraction. **No external URLs anywhere** — the validator rejects
    `http://` and `https://`. **No emoji.** No "in this article we will" preamble. No
    filler sentences whose removal loses no information. Fenced code blocks carry a
    language tag (`bash`, `ts`, `css`, `sql`, `yaml`, `text`).
11. **`## 10. Status`** — batch writers always write `status: drafted`. State
    that only the user promotes an entry to `reviewed`, and that `stub` is reserved for
    a file created as a placeholder.
12. **`## 11. Validating and definition of done`** — the four validator commands
    verbatim, what each check means in one line, how to read the error output, and the
    rule: an entry is done only when
    `node tools/validate-content.mjs --topic <topic>` reports `0 error(s)` with the
    entry counted as present.

**Files:**
- `lessons/AUTHORING.md` — CREATE — the authoring contract described above

**Constraints:**
- DO: write the section headings exactly as numbered above, using the numbers
  (`## 1. Layout and ids` … `## 11. Validating and definition of done`)
- DO: quote the exact heading strings and the exact bullet formats from sections 4
  and 5 — the validator pattern-matches them
- DO: present every quoted lesson heading in a table cell or an inline code span,
  never as a line that itself begins `## ` — the Success check counts lines matching
  `^## `, and a heading echoed at line start would break that count
- DO: use `status: drafted` in every YAML example, never `stub`; Phase 8 audits the
  corpus-wide `grep '^status:'` output and must see `drafted` only
- DO: keep it under 400 lines; it is a contract, not an essay
- DO NOT: invent rules not listed here — the validator only enforces what is listed
- DO NOT: mention Astro, Tailwind, Pagefind or any website concern
- DO NOT: include any external URL (including in examples), even as a placeholder
- DO NOT: use MDX or HTML in the examples

**Success:**
- [ ] File exists: `test -f lessons/AUTHORING.md` → exit 0
- [ ] All 12 headings present in order: `grep -c '^## ' lessons/AUTHORING.md` → `11` (the `#` title is not counted)
- [ ] Heading order is correct: `grep -n '^## ' lessons/AUTHORING.md` → the 11 numbered headings appear in ascending numeric order
- [ ] Contains no external URL: `grep -cE 'https?://' lessons/AUTHORING.md` → `0`
- [ ] Line count under 400: `wc -l < lessons/AUTHORING.md` → ≤ 400

---

### WP-2: Create the machine-readable inventory

**Context:**
`inventory.md` in this plan directory is the human-readable Appendix A — a Markdown
table of 177 entries. Writers and the validator both need it as data. Nothing in the
repository can consume Markdown tables, and no build system exists in this plan, so
the inventory is a plain JSON file read with `fs.readFileSync`.

**Task:**
Create `tools/inventory.json`: a JSON array of exactly **177 objects**, one per row of
`inventory.md`, in the same order (frontend 31, cs-fundamentals 27, cloud-devops 23,
backend-data 19, design-ux 44, product-process 17, security 7, soft-skills 9). Each
object has exactly these eight keys, in this order:

```json
{
  "id": "frontend/react",
  "topic": "frontend",
  "slug": "react",
  "title": "React",
  "type": "skill",
  "tier": "large",
  "prereqs": ["frontend/javascript", "frontend/typescript"],
  "aliases": ["React.js"]
}
```

`topic` and `slug` are the two halves of `id` split on the single `/`. `prereqs` and
`aliases` are arrays of strings; an `—` cell in Appendix A becomes `[]`. Child counts
are **not** stored — they derive from `tier` (small 0, medium 2, large 4, area 0).

**Files:**
- `tools/inventory.json` — CREATE — the 177-entry inventory

**Constraints:**
- DO: transcribe titles verbatim from Appendix A, including
  `Javascript`, `Restful API`, `Prioritization Frameworks (RICE / MoSCoW)` and
  `User Interface and User Experience (UI/UX) Design` — do not fix the source's
  spelling or casing anywhere
- DO: keep the exact ids from Appendix A, including `frontend/vuejs` (not `vue-js`),
  `backend-data/nodejs`, `design-ux/ab-testing`, `cs-fundamentals/algorithms-big-o`
- DO: format as 2-space-indented JSON with a trailing newline
- DO NOT: add fields (`children`, `order`, `source`, `description`, …)
- DO NOT: invent, merge, drop or reorder an entry
- DO NOT: reword a title to match its slug, or re-slug a title

**Success:**
- [ ] File parses and has 177 entries: `node -e "const v=JSON.parse(require('fs').readFileSync('tools/inventory.json','utf8'));console.log(v.length)"` → `177`
- [ ] Per-topic counts are exactly right: `node -e "const v=JSON.parse(require('fs').readFileSync('tools/inventory.json','utf8'));console.log(v.reduce((a,e)=>(a[e.topic]=(a[e.topic]||0)+1,a),{}))"` → `{ frontend: 31, 'cs-fundamentals': 27, 'cloud-devops': 23, 'backend-data': 19, 'design-ux': 44, 'product-process': 17, security: 7, 'soft-skills': 9 }`
- [ ] Ids are unique and match `topic/slug`: `node -e "const v=JSON.parse(require('fs').readFileSync('tools/inventory.json','utf8'));console.log(new Set(v.map(e=>e.id)).size===177 && v.every(e=>e.id===e.topic+'/'+e.slug))"` → `true`
- [ ] Every `prereqs` target exists: `node -e "const v=JSON.parse(require('fs').readFileSync('tools/inventory.json','utf8'));const ids=new Set(v.map(e=>e.id));console.log(v.flatMap(e=>e.prereqs).filter(p=>!ids.has(p)))"` → `[]`
- [ ] Type/tier tally: `node -e "const v=JSON.parse(require('fs').readFileSync('tools/inventory.json','utf8'));console.log(v.filter(e=>e.tier==='large').length, v.filter(e=>e.tier==='medium').length, v.filter(e=>e.type==='area').length)"` → `15 82 7`

---

### WP-3: Create the content validator

**Context:**
Nothing enforces the contract from WP-1. Without a checker, 401 files drift in
section names, word counts and ids, and the drift is only discovered when the website
is built much later. There is no `package.json` and no test runner in this repository
by design, so the validator is a single zero-dependency Node ESM script. It is the
only program in the repository.

Inputs: `tools/inventory.json` (WP-2) and the `lessons/` tree. It must work while most
entries are still unwritten — Phase 1 finishes with 3 of 177 entries present.

**Task:**
Create `tools/validate-content.mjs`: a zero-dependency Node script that validates the
corpus and exits `1` on any error.

CLI:

- `node tools/validate-content.mjs` — validate every entry that exists; report
  unwritten entries as **pending**; exit 1 only on errors.
- `--strict` — treat pending entries as errors.
- `--topic <slug>` — limit entry checks to one topic (inventory integrity checks
  always run in full). Repeatable.
- `--write-index` — additionally write `lessons/INDEX.md` (see V13).
- Output ends with a summary line `N present, M pending, K error(s)` and lists up to
  20 errors as `path:line — message`.

Checks, each emitting errors tagged `[V<n>]`:

- **V1 inventory** — parses; exactly 177 entries; `id === topic + "/" + slug` for all;
  `slug` matches `^[a-z0-9]+(-[a-z0-9]+)*$`; `topic` in the 8 known topics; `type` in
  `skill|area`; `tier` in `small|medium|large`; `area` implies `tier === "small"`;
  ids unique; `prereqs`/`aliases` are string arrays; every prereq id exists in the
  inventory; no entry lists itself as a prereq.
- **V2 coverage** — for each inventory entry: `lessons/<id>/index.md` exists, else
  pending (error under `--strict`).
- **V3 index frontmatter** — a fenced `---` block at line 1; the eight keys present in
  the order `title, type, topic, tier, status, aliases, prereqs, related`; values
  parse (strings, and `[a, b]` / `[]` arrays); `title`, `type`, `tier` equal the
  inventory values; `topic` equals both the inventory value and the first path
  segment; `status` in `stub|drafted|reviewed`; `prereqs` equals the inventory
  `prereqs` **as a set**; every `prereqs` and `related` target resolves to an
  inventory id or an existing child id.
- **V4 headings** — the body's `## ` headings equal, in order, the heading list for
  its shape: full lesson (6), track landing (5), area (4). Any extra or missing
  heading is an error.
- **V5 word count** — whitespace-separated tokens after the frontmatter, counted across
  the whole body including code blocks: full lesson 450-950, track landing 200-400,
  area 120-300.
- **V6 no external URLs** — `/https?:\/\//` anywhere in the file (frontmatter
  included) is an error.
- **V7 section internals** — `Core ideas` has 3-6 `### ` subheadings; `Practice` has
  ≥1 `### ` and ≥1 line starting `Done when:`; `Common mistakes` has 3-5 bullets each
  matching `/^- \*\*.+\*\* — .+; fix: .+$/`; `Go deeper` has 2-5 bullets each matching
  `/^- \*\*.+\*\* \(`([^`]+)`\) — .+$/` with a resolvable id, and contains a bullet for
  every id this file's own `prereqs` array names, unless the file is a track landing.
  For a `small` skill or a child lesson that is where the prerequisites stay visible —
  neither shape has a `## Prerequisites` section. A track landing is exempt: it lists
  its prereqs under `## Prerequisites` instead.
- **V8 children** — expected count from tier (small 0, medium 2, large 4, area 0);
  actual count matches; filenames match `^\d{2}-[a-z0-9]+(-[a-z0-9]+)*\.md$`; numbering
  starts at `01` and is contiguous; each child has exactly the two frontmatter keys
  `title`, `prereqs`; each child's `prereqs` targets resolve through V12 and none names
  a later sibling; each child body is the full-lesson shape (V4/V5/V6/V7 apply).
- **V9 `In this track`** — exactly one numbered line per child, in child filename
  order, each matching `/^\d+\. \*\*.+\*\* \(`([^`]+)`\) — .+$/`, and the extracted ids
  equal the child ids in order.
- **V10 `Prerequisites`** (track landing) — one bullet per inventory prereq
  (`- **<Title>** (`<id>`)`), or the single line `None.`.
- **V11 area pages** — `type: area` has no children; `## Included skills` bullets
  match `/^- \*\*.+\*\* \(`([^`]+)`\) — .+$/` and every id resolves; `## Where to
  start` is non-empty.
- **V12 resolution table** — a single shared set of resolvable ids = inventory ids ∪
  existing child ids, built once from the inventory and the filesystem.
- **V13 `--write-index`** — write `lessons/INDEX.md`: a `# Lesson index` heading, one
  `## <topic>` section per topic in inventory order, and under each a line per entry,
  ``- [<Title>](<id>/index.md) — <type>, <tier>, <status>``, with a `(pending)` suffix
  for unwritten entries and a final line `N present, M pending`. Never read this file
  back as input.
- **V14 unknown entries** — walk the `lessons/` tree (respecting `--topic` when one is
  passed) and report every `<topic>/<slug>/` directory that is not an id in the
  inventory as an error. A directory whose `index.md` is invalid still counts as
  unknown until it either matches an inventory id or is removed. This is the check the
  fixture in the Success list exercises.

Parsing notes to implement: strip the frontmatter block before heading/word checks; a
`## ` heading is one at line start with exactly two hashes; treat CRLF and LF the same;
read files as UTF-8.

**Files:**
- `tools/validate-content.mjs` — CREATE — the validator described above

**Constraints:**
- DO: import only from `node:fs`, `node:path`, `node:url`, `node:process` — no
  dependencies, no `package.json`, no `node_modules`
- DO: use ESM (`import`), run under plain `node`, and `process.exitCode = 1` when any
  error is emitted
- DO: make every error message name the file path, the line number when known, and the
  `[V<n>]` tag
- DO: keep it under 400 lines — one `check` function per V-number (V1–V14), one shared
  `parseFrontmatter(file)` helper and one shared `readBody(file)` helper
- DO NOT: add a config file, a `--fix` mode, a watch mode, or coloured output
- DO NOT: write to any file except `lessons/INDEX.md` under `--write-index`
- DO NOT: fail on an entry that is simply not written yet unless `--strict` is passed
- DO NOT: use `require`, `eval`, or a YAML library

**Success:**
- [ ] Runs clean on the current (nearly empty) tree: `node tools/validate-content.mjs; echo "exit=$?"` → `0 present, 177 pending, 0 error(s)` and `exit=0`
- [ ] `--strict` fails while entries are missing: `node tools/validate-content.mjs --strict; echo "exit=$?"` → non-zero exit and 177 errors
- [ ] The validator actually catches bad input — create the fixture with the file write
      tool at `lessons/frontend/zz-broken/index.md`: the eight index keys in order with
      `title: Wrong`, `type: skill`, `topic: frontend`, `tier: small`, `status: drafted`,
      `aliases: []`, `prereqs: []`, `related: []`, then one `## What it is` section with a
      single sentence. Then run
      `node tools/validate-content.mjs --topic frontend; echo "exit=$?"` → non-zero exit
      with a `[V14]` unknown-entry error, a title mismatch, and missing headings
- [ ] Fixture removed: `rm -rf lessons/frontend/zz-broken && node tools/validate-content.mjs; echo "exit=$?"` → `exit=0`
- [ ] No dependencies: `grep -cE 'require[(]|node_modules|from .[^n]' tools/validate-content.mjs` → `0`
- [ ] `node --check tools/validate-content.mjs` → exit 0

---

### WP-4: Exemplar — small skill (`cs-fundamentals/pseudocode`)

**Context:**
The first of three exemplars, and the pattern for the 65 `small` skills that follow.
Source line, `seed/cs-fundamentals.md`, section `## Core computer science`:
`- **Pseudocode** — Writing the logic in plain language before it becomes code.`
Its inventory row (Appendix A): id `cs-fundamentals/pseudocode`, type `skill`,
tier `small`, no prereqs, no aliases. A `small` skill has **zero** children, so this
file is a full lesson with the 6-section shape. The rules are in
`lessons/AUTHORING.md` (WP-1) — read it first, then follow it exactly.

**Task:**
Create `lessons/cs-fundamentals/pseudocode/index.md` — a single full-lesson file at
450-950 words, expanding the seed one-liner into the six sections defined in the spec.
Make it genuinely useful for a working developer: pseudocode as a thinking tool before
committing to a language, not as a school exercise.

**Files:**
- `lessons/cs-fundamentals/pseudocode/index.md` — CREATE — full lesson, small tier

**Constraints:**
- DO: follow `lessons/AUTHORING.md` exactly — frontmatter field order, the six
  `##` headings, `Done when:` lines, the `; fix:` bullet format
- DO: take the title verbatim from the inventory (`Pseudocode`)
- DO: keep `prereqs: []`, `related: []`, `aliases: []`, `status: drafted`
- DO: use a fenced code block with a language tag for the pseudocode example
- DO NOT: add children, extra headings, a quiz, or a resources section
- DO NOT: include any external URL
- DO NOT: pad to reach the word floor — if it genuinely will not reach 450 words,
  add one more `### ` core idea, not filler prose

**Success:**
- [ ] File exists: `test -f lessons/cs-fundamentals/pseudocode/index.md` → exit 0
- [ ] Validator accepts it: `node tools/validate-content.mjs --topic cs-fundamentals` → `1 present, 26 pending, 0 error(s)`
- [ ] Six headings in order: `grep -n '^## ' lessons/cs-fundamentals/pseudocode/index.md` → `What it is`, `Why it matters`, `Core ideas`, `Practice`, `Common mistakes`, `Go deeper`
- [ ] Frontmatter is complete and ordered: `head -10 lessons/cs-fundamentals/pseudocode/index.md` → `title`, `type: skill`, `topic: cs-fundamentals`, `tier: small`, `status: drafted`, `aliases: []`, `prereqs: []`, `related: []`
- [ ] No external URL: `grep -cE 'https?://' lessons/cs-fundamentals/pseudocode/index.md` → `0`

---

### WP-5: Exemplar — large skill (`frontend/react`)

**Context:**
The pattern for the 15 `large` skills: a short track-landing `index.md` plus exactly
**four** child lessons, each a full lesson. Source line, `seed/frontend.md`, section
`## Frameworks & libraries`:
`- **React** — Component library for UIs; the largest ecosystem and job market.`
Inventory row: id `frontend/react`, type `skill`, tier `large`, prereqs
`["frontend/javascript", "frontend/typescript"]`, alias `React.js`.
`lessons/AUTHORING.md` (WP-1) defines the landing shape and the writing procedure:
decide the child titles, write them into `## In this track` first, then write the
children in order.

**Task:**
Create 5 files under `lessons/frontend/react/`: the landing `index.md` and four child
lessons with these **exact filenames and titles**:

| File | `title` |
| --- | --- |
| `01-rendering-and-jsx.md` | Rendering and JSX |
| `02-components-and-props.md` | Components and props |
| `03-state-and-hooks.md` | State and hooks |
| `04-effects-and-data-fetching.md` | Effects and data fetching |

`index.md` is a track landing (200-400 words). Each child is a full lesson (450-950
words) following the spec. Child `prereqs`: `01` → `["frontend/javascript"]`;
`02` → `["frontend/react/01-rendering-and-jsx"]`;
`03` → `["frontend/react/02-components-and-props"]`;
`04` → `["frontend/react/03-state-and-hooks"]`.

**Files:**
- `lessons/frontend/react/index.md` — CREATE — track landing
- `lessons/frontend/react/01-rendering-and-jsx.md` — CREATE — full lesson
- `lessons/frontend/react/02-components-and-props.md` — CREATE — full lesson
- `lessons/frontend/react/03-state-and-hooks.md` — CREATE — full lesson
- `lessons/frontend/react/04-effects-and-data-fetching.md` — CREATE — full lesson

**Constraints:**
- DO: follow `lessons/AUTHORING.md` exactly, including the landing's
  `## In this track` numbered-list format and `## Prerequisites` bullets
- DO: use the four filenames and titles above — do not rename, reorder or add a fifth.
  This exemplar deliberately pre-assigns them, which is an exception to the plan-wide
  rule that later phase files leave the child names to the writer
- DO: keep the landing under 400 words; it is a doorway, not another lesson
- DO: keep React examples in modern function-component style; no class components
  beyond one mention in `01`, no state-management library (that is a separate entry)
- DO NOT: add an `order:` field or any frontmatter key beyond `title`/`prereqs` on children
- DO NOT: duplicate content between children — `03` covers state, `04` covers effects
- DO NOT: include any external URL, including `react.dev`

**Success:**
- [ ] Five files exist: `ls lessons/frontend/react/` → `01-rendering-and-jsx.md`, `02-components-and-props.md`, `03-state-and-hooks.md`, `04-effects-and-data-fetching.md`, `index.md`
- [ ] Validator accepts the entry: `node tools/validate-content.mjs --topic frontend` → `2 present, 29 pending, 0 error(s)`
- [ ] Landing has the landing shape: `grep -c '^## ' lessons/frontend/react/index.md` → `5`
- [ ] Each child has the full shape: `grep -c '^## ' lessons/frontend/react/0*.md` → `6` four times
- [ ] `In this track` lists exactly four children in order: `grep -c '^[0-9]\. ' lessons/frontend/react/index.md` → `4`
- [ ] No external URL in any file: `grep -rcE 'https?://' lessons/frontend/react/` → `0` five times

---

### WP-6: Exemplar — area page (`design-ux/ui-ux-design`)

**Context:**
The pattern for the 7 `area` pages, which replace 17 umbrella seed entries. Source,
`seed/design-ux.md`, section `## Umbrella terms`: four entries — "User Interface and
User Experience (UI/UX) Design", "User Interface (UI)", "User Experience", "User
Experience Design" — are four wordings of one field. They collapse into one area page
whose aliases carry the other three names, so a search for "UX" still lands here.
Inventory row: id `design-ux/ui-ux-design`, title
`User Interface and User Experience (UI/UX) Design`, type `area`, tier `small`,
aliases `["UI/UX Design", "UI", "User Experience", "User Experience Design"]`,
no prereqs. `lessons/AUTHORING.md` (WP-1) §5 defines the area shape (4 headings,
120-300 words) and §8 documents the merge.

**Task:**
Create `lessons/design-ux/ui-ux-design/index.md` — an area page at 120-300 words
whose `## Included skills` list points at the entries this field actually contains:
`design-ux/user-research`, `design-ux/information-architecture`,
`design-ux/interaction-design`, `design-ux/visual-design`,
`design-ux/usability-testing` — and whose `## Where to start` names the order to read
them in.

**Files:**
- `lessons/design-ux/ui-ux-design/index.md` — CREATE — area page

**Constraints:**
- DO: follow `lessons/AUTHORING.md` §4 and §5 for the area shape exactly
- DO: take the title verbatim from the inventory, and put all four aliases in the
  `aliases` array
- DO: keep all five `## Included skills` bullets — they are the five design-ux entries
  this field is built from
- DO: explain in `## What it covers` that the field spans research, structure,
  interaction and visual design, and that it is not one learnable skill
- DO: keep it under 300 words — an area page is a signpost
- DO NOT: write lesson content here; no `## Core ideas`, no `## Practice`
- DO NOT: add children or a `tier` other than `small`
- DO NOT: include any external URL

**Success:**
- [ ] File exists: `test -f lessons/design-ux/ui-ux-design/index.md` → exit 0
- [ ] Validator accepts it: `node tools/validate-content.mjs --topic design-ux` → `1 present, 43 pending, 0 error(s)`
- [ ] Four headings in order: `grep -n '^## ' lessons/design-ux/ui-ux-design/index.md` → `What it covers`, `Why it matters`, `Included skills`, `Where to start`
- [ ] Five included skills: `grep -c '^- \*\*' lessons/design-ux/ui-ux-design/index.md` → `5` (in `## Included skills`)
- [ ] Four aliases on one line: `grep -c 'aliases: \["UI/UX Design".*"User Experience Design"\]' lessons/design-ux/ui-ux-design/index.md` → `1`
- [ ] No external URL: `grep -cE 'https?://' lessons/design-ux/ui-ux-design/index.md` → `0`

---

## Phase Verification

After WP-1 through WP-6 are complete, run:

```bash
node --check tools/validate-content.mjs
node tools/validate-content.mjs
node tools/validate-content.mjs --strict
git status --short
```

- [ ] `node --check` exits 0 (the validator is syntactically valid)
- [ ] `node tools/validate-content.mjs` prints `3 present, 174 pending, 0 error(s)` and exits 0
- [ ] `node tools/validate-content.mjs --strict` exits 1 with 174 errors (the pending entries)
- [ ] All three exemplars are present: `ls lessons/*/*/index.md` lists
      `cs-fundamentals/pseudocode`, `design-ux/ui-ux-design`, `frontend/react`
- [ ] `frontend/react` has exactly 5 files; the other two have exactly 1 each
- [ ] `grep -rnE 'https?://' lessons/ --include='*.md'` → no matches
- [ ] `git status --short` shows only new files (`?? lessons/`, `?? tools/`) — no
      modification to `seed/**`
- [ ] `git status --short -- seed/` → empty (the archive is untouched)

## STOP — user review gate

**Do not start Phase 2.** Phase 2 writes 77 files using the exemplars as the pattern;
a flaw in the pattern is repeated 400 times. Present the three exemplars to the user
and ask exactly these three questions:

1. **Skeleton** — read `lessons/cs-fundamentals/pseudocode/index.md` end to end. Are
   the six sections and their length right for you as a reader? Any section that
   should be dropped, added or reordered?
2. **Track shape** — read `lessons/frontend/react/index.md` and one child. Is the
   landing-page-then-four-lessons split right for a big skill, or should `large`
   entries stay a single longer file?
3. **Tier guesses** — `tools/inventory.json` assigns 15 large, 82 medium and 80
   small/area. That split is frozen for the rest of the plan. Any entry you would
   re-tier before the bulk run?

Record the answers, apply any spec changes to `lessons/AUTHORING.md` (and, if the
tier rule changes, to `tools/inventory.json` and this plan's `inventory.md`), then
proceed to `phase-02-frontend.md`.
