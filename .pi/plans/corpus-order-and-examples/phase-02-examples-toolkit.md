# Phase 2: Examples toolkit and exemplars

## Objective

Define the examples-file contract, teach the validator to enforce it, and write two exemplars that
every later work package copies. This comes before the 295 remaining files so that the shape is
frozen once, verified by code, and never re-litigated per file.

## Prerequisites

- Phase 1 complete: the corpus is renumbered and `node tools/validate-content.mjs --strict` exits 0.
- `tools/renumber-map.json` exists.

## Shared Context

**What an examples file is.** A worked example is not an exercise. `## Practice` already asks the
reader to do something; an examples file *shows* one or two small, complete pieces of work from the
same lesson, each with its finished solution, so the reader can compare their own attempt against a
reference. Every examples file belongs to exactly one lesson file that has a `## Practice` section
— a full-shape lesson: a `small` skill's `index.md` or any child lesson. Landing and area indexes
have no `## Practice` and therefore no examples file.

**The 297 files.** Phase 3–6 create one examples file per full-shape lesson, 297 in total:

| Topic dir | Examples files |
| --- | --- |
| `01-cs-fundamentals` | 45 |
| `02-frontend` | 56 |
| `03-design-ux` | 68 |
| `04-product-process` | 26 |
| `05-backend-data` | 38 |
| `06-cloud-devops` | 43 |
| `07-security` | 10 |
| `08-soft-skills` | 11 |

**The naming rule** is mechanical and derived from the lesson file it sits beside:

| Lesson file | Examples file |
| --- | --- |
| `index.md` | `examples.md` |
| `01-cascade-and-box-model.md` | `examples.01-cascade-and-box-model.md` |
| `04-modern-css.md` | `examples.04-modern-css.md` |

**The frozen file shape.** This is the contract every later work package follows:

- **No frontmatter.** The file starts directly with the first `## Example` heading. `title`,
  `prereqs` and every other field belong to the lesson file.
- **One or two examples**, numbered from 1, in order, as `## Example N — <short name>`. Exactly two
  headings at most. The separator is an em dash (U+2014) with spaces around it.
- **Each example has three parts, in this order:**
  1. A brief of 2–4 sentences naming the situation, the input, and what has to be produced.
  2. One fenced block with the starting material (a file, a query, a snippet, a transcript, a
     sketch in `text`), with a language tag on the fence.
  3. `### Solution`, followed by one fenced block with the finished artefact, followed by 2–4
     sentences saying why it is right and the one thing that usually goes wrong.
- **Every fenced block carries a language tag.** Use the real language where the example is code
  (`html`, `css`, `ts`, `bash`, `sql`, `text`, …). Non-code topics use `text`.
- **120–450 words** for the whole body, counted the way V5 counts (whitespace-separated tokens,
  code blocks included).
- **No external URLs.** V6 applies to examples files exactly as it does to lesson files.
- **British English.**
- No other `##` heading, no `####`, no tables required, no images.

**Why the link lives in INDEX.md.** 22 full-shape lessons are at 930–950 of the 950-word ceiling
and 4 are at exactly 950 (verified during planning). Adding even a one-line pointer to
`## Practice` would push them over V5. So the lesson bodies are not touched, and `--write-index`
is extended instead to link each entry's `examples.md` when it exists.

## Work Packages

### WP-9: Document the examples contract in AUTHORING.md

**Context:**
`lessons/AUTHORING.md` §4 "Body shapes" says "There are three shapes and no others" and §11 covers
validation. After this phase a fourth kind of file exists that is *not* a lesson and has *no*
frontmatter — the contract has to say so explicitly, or a later author will try to give it
frontmatter and the validator will reject it.

**Task:**
Add a new `## 12. Examples files` section to `lessons/AUTHORING.md` describing the contract in
Shared Context above, and add one sentence to §4 stating that examples files are not lesson files
and are governed by §12. (The file's last section is §11, so §12 is the next number — do not write
`## 15.` and do not renumber §1–§11.)

**Files:**
- `lessons/AUTHORING.md` — MODIFY — one sentence appended to §4; a new §12 appended at the end of the file

**Constraints:**
- DO: reproduce the naming table and the three-part structure exactly as written in Shared Context.
- DO: state the word band 120–450 and that no frontmatter is permitted.
- DO: state that every fenced block needs a language tag and that non-code topics use `text`.
- DO: keep §1–§11 byte-identical apart from the single sentence added to §4.
- DO NOT: restate the lesson shapes, the word bands for lessons, or the topic order.
- DO NOT: add an examples file yourself in this WP — the exemplars are WP-11.
- DO NOT: renumber or reorder the existing sections.

**Success:**
- [ ] Grep: `grep -n '^## 12\.' lessons/AUTHORING.md` → 1 match
- [ ] Grep: `grep -c 'examples.NN-slug.md' lessons/AUTHORING.md` → ≥ 1
- [ ] Grep: `grep -n '^## ' lessons/AUTHORING.md` → the §1–§11 headings are all still present, in the same order, plus §12
- [ ] Command: `grep -n '^## 1[12]\.' lessons/AUTHORING.md` → exactly two lines, `## 11.` then `## 12.` (no gap in the numbering)
- [ ] Check: the sentence added to §4 mentions §12

### WP-10: Add the examples checks to the validator

**Context:**
`tools/validate-content.mjs` never sees examples files today: the directory scan builds
`children` from `files.filter((n) => /^\d{2}-/.test(n))`, and `examples.md` /
`examples.NN-slug.md` match neither `^\d{2}-` nor the `index.md` name, so they are silently
skipped. The scan happens around line 88–93; the lesson loop is the `for (const d of dirs)` block
around line 276; the report is printed at the end around line 352. The `--write-index` block is
around line 336.

**Task:**
Extend `tools/validate-content.mjs` with an examples-file check (V15), a completeness check (V16)
that counts missing examples as pending and orphan examples as errors, the matching counters in the
summary line, and an examples link in the generated index. Then add two rows to the §11 validation
table in `lessons/AUTHORING.md` — `V15 examples files` and `V16 examples coverage` — worded like the
rows already there, so the contract file lists every check the validator runs.

**Files:**
- `tools/validate-content.mjs` — MODIFY — new V15 and V16 checks, the summary line, and the `--write-index` row format
- `lessons/AUTHORING.md` — MODIFY — two new rows in the §11 validation table (V15, V16)
- `.tmp/v15-fixture/` — CREATE then DELETE — the fixture the Success checks copy in for a moment

**Constraints:**
- DO: implement V15 with these checks on every `examples*.md` file, in this order: (a) the file must not start with `---`; (b) `##` headings must be 1–2 `^## Example ([1-2]) — .+$` in order starting at 1, and nothing else at `##`; (c) each example must contain exactly one `^### Solution$` heading and it must come after that example's heading; (d) every fence line matching `^```[^`]*$` that opens a block must carry a non-empty language tag, and each example must have at least one fence before its `### Solution` and at least one after it; (e) body words within 120–450; (f) no `https?://` anywhere.
- DO: implement V16 by pairing each examples file with its lesson file using the naming rule (`examples.md` ↔ `index.md`, `examples.NN-slug.md` ↔ `NN-slug.md`), and: a lesson file with `## Practice` but no examples file increments an `examplesPending` counter and is an error **only under `--strict`**; an examples file whose lesson file is missing, has no `## Practice`, or whose name does not match the rule is always an `[V16]` error.
- DO: respect `--topic` for the new counters, the same way the existing `present`/`pending` counters do.
- DO: change the final summary line to `X present, Y pending, Z examples, W examples pending, E error(s)`; keep the first two numbers in their current position and format so the existing `177 present, 0 pending` reading is unchanged.
- DO: in the `--write-index` block, append `` ` · [examples](<id>/examples.md)` `` to a row when that entry's `examples.md` exists on disk, and append nothing when it does not.
- DO: keep the file zero-dependency, LF, and the existing code style.
- DO: delete `.tmp/v15-fixture/` at the end of this WP — when Phase 7 runs, `.tmp/` must hold nothing but `.tmp/lessons-backup/`.
- DO NOT: change any V1–V14 check, the three `SHAPES`, the `WORDS` bands, `CHILDREN` or `TOPICS`.
- DO NOT: require an examples file for a landing or area index.
- DO NOT: renumber or restructure the file.

**Success:**
- [ ] Command: `node --check tools/validate-content.mjs` → exit 0
- [ ] Command: `node tools/validate-content.mjs` → prints the new five-part summary line with `0 examples` and, unless WP-11 has already run, `297 examples pending`; exit 0 (not strict)
- [ ] Command: `node tools/validate-content.mjs --strict` → exits non-zero and reports `[V16]` for a missing examples file
- [ ] Fixture check: create `.tmp/v15-fixture/examples.md` with no frontmatter and one example, copy it into `01-cs-fundamentals/06-regular-expressions-regex/` temporarily, run `node tools/validate-content.mjs --topic 01-cs-fundamentals`, confirm `0 error(s)`, then delete the fixture copy and confirm the same command reports the missing examples again — record both outputs in your report
- [ ] Negative fixture check: repeat with a `####` heading or a fence with no language tag and confirm `[V15]` fires, then delete the fixture
- [ ] Command: `node tools/validate-content.mjs --write-index` → exit 0, and no row has an `[examples]` link yet (no examples files exist except any created by WP-11)
- [ ] Command: `grep -cE '^\| V1[56] ' lessons/AUTHORING.md` → `2`
- [ ] Command: `test -d .tmp/v15-fixture && echo still-there || echo gone` → `gone`

### WP-11: Write the two exemplars

**Context:**
Every later work package copies these two files, so they define the house style for all 297. The
first is code-heavy and belongs to a child lesson of a `large` skill; the second is prose-only and
belongs to a `small` skill's `index.md`, which exercises the `examples.md` naming. Read each lesson
file first and build the examples out of two of its `### Core ideas` subheadings — the examples must
teach the same material the lesson teaches.

**Task:**
Write exactly two examples files, following the frozen shape in Shared Context:

1. `lessons/02-frontend/05-css/examples.01-cascade-and-box-model.md` — two worked CSS examples that
   the lesson `01-cascade-and-box-model.md` prepares the reader for. At least one must include a
   full HTML+CSS snippet the reader can paste into a file and open, and its solution must show the
   computed outcome (which rule wins, what the box size becomes) rather than only the declaration.
2. `lessons/08-soft-skills/03-mentoring/examples.md` — two worked non-code examples for the
   `Mentoring` `index.md`, using `text` fenced blocks (for example a short mentoring exchange, or a
   written feedback note) plus a `### Solution` that shows the improved version and says in 2–4
   sentences why it works.

**Files:**
- `lessons/02-frontend/05-css/examples.01-cascade-and-box-model.md` — CREATE — two code examples with solutions
- `lessons/08-soft-skills/03-mentoring/examples.md` — CREATE — two prose examples with solutions

**Constraints:**
- DO: no frontmatter in either file — the first line is the `## Example 1 — …` heading.
- DO: use the em dash (U+2014) with spaces in heading and bullet text, matching the corpus convention.
- DO: put a language tag on every fence (`html`, `css`, `text`).
- DO: keep each file within 120–450 words.
- DO: make the solution show a finished artefact, not a restatement of the brief.
- DO NOT: add an external URL, a link to a CDN, or an image.
- DO NOT: use `####`, tables, or any `##` heading other than the two examples.
- DO NOT: edit the lesson files they sit beside.

**Success:**
- [ ] Command: `node tools/validate-content.mjs --topic 02-frontend` → `0 error(s)`, and the examples pending count for that topic is one lower than before
- [ ] Command: `node tools/validate-content.mjs --topic 08-soft-skills` → `0 error(s)`
- [ ] Command: `head -1 lessons/08-soft-skills/03-mentoring/examples.md` → starts with `## Example 1 — `
- [ ] Command: `grep -c '^## Example' lessons/02-frontend/05-css/examples.01-cascade-and-box-model.md` → `2`
- [ ] Command: `grep -c '^### Solution' lessons/02-frontend/05-css/examples.01-cascade-and-box-model.md` → `2`
- [ ] Command: `node tools/validate-content.mjs --write-index` → exit 0 and the `Mentoring` row in `lessons/INDEX.md` carries an `[examples]` link

## Phase Verification

After all three work packages are complete, run:

```bash
node --check tools/validate-content.mjs
node tools/validate-content.mjs
node tools/validate-content.mjs --write-index
node tools/validate-content.mjs --topic 02-frontend
node tools/validate-content.mjs --topic 08-soft-skills
```

- [ ] The summary line reports `295 examples pending` and `0 error(s)`
- [ ] Both exemplars pass V15
- [ ] `lessons/INDEX.md` shows an `[examples]` link on the `Mentoring` row and on no other row
- [ ] `grep -c '(pending)' lessons/INDEX.md` → `0`
- [ ] §12 exists in `lessons/AUTHORING.md` and matches the two exemplars exactly in structure
