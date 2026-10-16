# Phase 1: Style gate and calibration

## Objective

Build the measuring instrument, prove it works, and settle the voice before touching 698 files.
WP-1 writes `tools/check-ru-style.mjs` — a marker report and a `--diff` mode that proves a file's
non-prose text did not move. WP-2 recasts four files, one per body shape, using the same model that
will do the whole pass. WP-3 turns the approved result into `lessons/AUTHORING.md` §14 and freezes
the numeric targets. The phase ends at a hard stop: **the user reads four before/after diffs and
approves the voice**, or WP-2 and WP-3 are redone.

## Prerequisites

- `.pi/plans/russian-corpus/` fully executed and committed. `node tools/validate-content.mjs
  --strict --lang ru` reports `177 present, 0 pending, 297 examples, 0 examples pending, 0 error(s)`
  and exits 0.
- `git rev-parse HEAD` resolves, and `git show HEAD:lessons/ru/01-cs-fundamentals/04-database-internals/index.md`
  prints the committed Russian file. At the time this plan was written the SHA was
  `b713de1dcfcf767f746db6daadce5bb4e1191b9b`.
- Node ≥ 22 available. No `package.json` exists and none may be created.

## Shared Context

**The contract is `_index.md` → Conventions.** Read that section before WP-1, WP-2 and WP-3. It has
two halves: nine *frozen* things the gate compares against the baseline commit, and eleven *prose
rules* (R1–R11) describing what must change. Everything in this phase serves that section.

**The corpus this phase measures.** 698 `.md` files under `lessons/ru/`, excluding
`lessons/ru/INDEX.md` and `lessons/ru/GLOSSARY.md`. Each of them has an English twin at
`lessons/<same relative path>`, in a frozen tree this plan never writes to. 297 of the 401 lesson
files are the `full` shape; 97 are `landing`; 7 are `area`; the other 297 files are examples files.

**How the text is sliced when measuring.** `_index.md` → Conventions → *Measurement definitions* is
the authoritative statement of the two slices and the splitter; the script's header comment quotes it
verbatim and the gate may not deviate from it. In brief:

- **`prose`** — the file with the frontmatter block removed, every fenced block removed (the text
  between an opening and a closing ```` ``` ```` line, inclusive), **every heading line removed**
  (`/^#{1,6} /`, all six levels) and bullet markers (`- `, `1. `) dropped. This slice feeds the
  blacklist, the `— это ` count, the participle count and the connector count.
- **`flow`** — the same, but heading lines are **kept**. Sentences are cut at a line end and after
  `[.!?…]` before an uppercase, digit or `«"„—`; a sentence's length is its character count. This slice
  feeds the sentence count, the correlation, the median sentence lengths and their ratio.
- **V5 word count** — the whole file from the line after the closing `---` to the end, whitespace
  split, empty parts dropped. This is exactly what `tools/validate-content.mjs:315` counts, and the
  gate must agree with it, because the word bands are the validator's job.

**The baseline the script records.** These were measured on the untouched corpus and appear in
`_index.md` → Global Context; report mode prints the same block to three significant figures. WP-1
runs the report once on the untouched corpus and writes the seven values into the script as
`BASELINE_METRICS` with the date of the run. The word count and the four marker rows must come out
exactly as below — if they do not, the script is wrong, and `_index.md` is not adjusted. The three
sentence-level rows depend on the splitter: if the recorded values differ from the block below, keep
the recorded values, tick the box, and say so in the Phase 1 hand-back. A **target** is never
re-recorded.

```text
698 files, 332680 words
  correlation with the English twin   mean 0.926   target <= 0.60
  same sentence count as the English   668/698 = 95.7%   target <= 40%
  RU/EN median sentence-length ratio   mean 0.861   target >= 0.95
  однако per 1000 words                0.00   target >= 0.80
  X — это per 1000 words               2.59   target <= 1.50
  attributive participles per 1000     2.76   target <= 2.00
  blacklist hits                       15 in 10 files   target 0
```

**The model used in WP-2 is the model for the whole pass.** Russian prose quality is a property of
the writer, not of the plan. Do not calibrate with one model and recast with another.

**Command names used below**, all from the repo root:
`node tools/check-ru-style.mjs` (report), `--topic <dir>` (narrow), `--file <path>` (one file),
`--diff` (structural invariants), `--strict` (targets become failures).

---

## Work Packages

### WP-1: Write the style gate

**Context:**
`tools/validate-content.mjs` is the house style for a checker in this repo and the model to copy:
542 lines, plain Node ESM, no dependencies, flags parsed by hand in a loop that rejects unknown
arguments with exit 2, an `err(tag, file, line, message)` collector, a `rel()` helper that prints
repo-relative POSIX paths, a `--topic` filter, and a final exit code derived from the error count.
Read lines 53–80 (flags, `err`, `rel`), 159–216 (`parse`, `sections`, `shapeOf`) and 315–316 (the V5
word count) and 526–542 (the report) before writing anything. Do not import from it — it runs as a CLI on import.

The two facts the gate needs about git: `git show <sha>:<repo-relative-path>` prints a committed file,
and `execFileSync("git", ["show", spec], { cwd: ROOT, encoding: "utf8", maxBuffer: 1 << 28 })` is how
to read it without a dependency. This repo tracks `lessons/` and `tools/`, so those blobs exist.

**Task:**
Create `tools/check-ru-style.mjs`: a zero-dependency Node ESM script with a constants header, a
`prose` slicer, a `wordsV5` counter, a sentence splitter, a Pearson helper, and the three modes
below. Its only imports are `node:fs`, `node:path`, `node:url` and `node:child_process`.

The constants header must contain the recorded baseline SHA and the target values:

```js
const BASELINE = "<output of git rev-parse HEAD at the start of WP-1>";
const BLACKLIST = ["делает то же самое", "делает то же", "то же самое, но", "в одежде", "стоящий за", "играет роль", "делает это возможным"];
const CONNECTORS = ["однако", "при этом", "зато", "хотя", "ведь", "поэтому", "то есть", "иначе говоря"];
const PARTICIPLE = /[а-яё]+(ующий|ающий|ивший|ующие|ающие|ившие|ующего|ающего|ующим|ающим)/g;
const TARGETS = { rMean: 0.60, sameCountPct: 40, lengthRatio: 0.95, odnako: 0.80, copula: 1.50, participle: 2.00, blacklist: 0, copulaPerFile: 3 };
const BASELINE_METRICS = { files: 698, words: 332680, rMean: <recorded>, sameCountPct: <recorded>, lengthRatio: <recorded>, odnako: 0, copula: 2.59, participle: 2.76, blacklist: 15, blacklistFiles: 10 };
const BASELINE_METRICS_DATE = "<YYYY-MM-DD of the recording run>";
```

`BASELINE_METRICS` is what the first run of the script on the untouched corpus prints, and the header
comment records the date. Fill the three sentence-level values from that run. Pin the two slices and
the splitter exactly as `_index.md` → Conventions → *Measurement definitions* states them — `prose`
with all six heading levels removed, `flow` with headings kept, sentences cut at a line end and after
`[.!?…]` before an uppercase/digit/`«"„—` character, length in characters — and copy both definitions
into the header comment next to `BASELINE_METRICS`.

**Report mode** (`node tools/check-ru-style.mjs`, optional `--topic <dir>` or `--file <path>`) walks
`lessons/ru/`, skips `INDEX.md` and `GLOSSARY.md`, filters to the topic or the single file, and for
each file computes: shape, V5 word count, sentence count, median sentence length, `— это ` count,
`PARTICIPLE` match count, `CONNECTORS` count, `однако` count, blacklist hits, and — when the English
twin exists and both have at least five sentences — the Pearson correlation of sentence lengths
against the twin, whether the sentence count equals the twin's, and the ratio of the two medians.
Correlation is computed over the first `min(ruSentences, enSentences)` sentence pairs; it is `null`
when fewer than five pairs exist.

Report mode prints one `path: [S1] <message>` line per file that breaks a per-file rule (more than
`copulaPerFile` copulas, or a blacklist hit), capped at 20 lines, then the corpus block quoted in
Shared Context, padded to the same columns, one metric per line, each carrying its target. It exits
0, or 1 under `--strict` when any target is missed or any per-file rule is broken.

When `--file` narrows the run to a single file, print that file's metric line **instead of** the
warning list, in exactly this shape — the Success checks below read it, so the labels are fixed:

```text
<path>: sentences <n>, same as EN: yes|no, corr <0.000|n/a>, median ratio <0.000|n/a>, — это <n>, participles <n>, однако <n>, blacklist <n>, words <n>
```

`corr` and `median ratio` print `n/a` when the file has fewer than five sentence pairs. `--topic`
narrows the walk but keeps the warning-list-plus-corpus-block output.

**Diff mode** (`--diff`, compatible with `--topic` and `--file`) reads each selected file's baseline
text with `git show`, and compares ten things. Tag them `[D1]`–`[D10]` and print `path: [D<n>] <what differs>`:

1. `[D1]` the frontmatter block — from the first line through the closing `---` — byte for byte
2. `[D2]` every line matching `/^## /`, as an ordered list, byte for byte
3. `[D3]` every fenced block, from its opening fence line through its closing fence line inclusive,
   as an ordered list, byte for byte (the language tag lives on the opening line, so it is covered)
4. `[D4]` the multiset of backticked spans, `/` + backtick + `[^\`\n]+` + backtick + `/g`
5. `[D5]` the multiset of numeric tokens, `/\d+([.,]\d+)*/g`
6. `[D6]` every line matching `/^## Пример \d+ — /`, as an ordered list
7. `[D7]` the count of each of `Готово, когда:`, `Нет.`, `; исправить: `, `### Решение`
8. `[D8]` the V5 word count, which must stay inside the file's shape band
9. `[D9]` a missing baseline blob (`git show` threw) — always an error
10. `[D10]` the `status:` value, which must stay `drafted`

`--diff` exits 1 on any error, otherwise prints one line,
`<n> files compared against <BASELINE>: 0 structural differences`, where `<n>` is the number of files
compared (not the literal 698 when `--topic` or `--file` narrows the run), and exits 0. `--strict`
does not change diff mode; every diff invariant is a hard error.

Unknown flags, a missing flag value, and `--topic` with a name that matches no directory (print
`no files matched`) exit 2.

**Files:**
- `tools/check-ru-style.mjs` — CREATE — the style gate: constants and targets, `prose`/`wordsV5`
  slicers, report mode, diff mode, hand-parsed flags, exit codes 0/1/2.

**Constraints:**
- DO: import only `node:fs`, `node:path`, `node:url`, `node:child_process`
- DO: put the `prose` and V5 word-count definitions in a header comment, quoting both rules from
  Shared Context
- DO: print the corpus block in the exact order and with the exact labels quoted in Shared Context
- DO: use `execFileSync` with an argument array, never a shell string — the paths contain no spaces
  today but a shell string would be a bug waiting to happen
- DO NOT: add a `package.json`, a dependency, a test file or a config file
- DO NOT: modify `tools/validate-content.mjs`, any lesson file, or `.pi/plans/**`
- DO NOT: make the report depend on a hard-coded file list — it walks the tree
- DO NOT: treat a missing English twin as an error; the twin is a measurement input, and a Russian
  file with no twin is a `[D9]`-class problem only if the baseline blob is also missing

**Success:**
- [ ] Command: `node --check tools/check-ru-style.mjs` → exit 0
- [ ] Command: `node tools/check-ru-style.mjs` → exit 0, and the first line is exactly
      `698 files, 332680 words`
- [ ] Command: `node tools/check-ru-style.mjs` → the eight following metric lines match
      `BASELINE_METRICS`, and the block below the word count matches the Shared Context table
exactly (0.00 / 2.59 / 2.76 / 15 hits in 10 files). The word count and the four marker rows are the
      hard ones; if the three sentence-level rows differ, that is the splitter, and the recorded value
      stands
- [ ] Command: `node tools/check-ru-style.mjs` → `BASELINE_METRICS` and `BASELINE_METRICS_DATE` are
      filled in from this run, and the two slice definitions sit in the header comment
- [ ] Command: `node tools/check-ru-style.mjs --diff` → `0 structural differences`, exit 0
- [ ] Command: `node tools/check-ru-style.mjs --topic 03-design-ux` → first line `156 files, ...` (156 lesson and examples files)
- [ ] Command: `node tools/check-ru-style.mjs --topic 03-design-ux --diff` → exit 0
- [ ] Command: `node tools/check-ru-style.mjs --file lessons/ru/01-cs-fundamentals/04-database-internals/index.md` → prints that file's metric line, including `same as EN: yes` and a `corr` above 0.7 (the pinned definition gives 0.968)
- [ ] Command: `node tools/check-ru-style.mjs --topic 99-nonsense` → `no files matched`, exit 2
- [ ] Command: `node tools/check-ru-style.mjs --bogus` → usage line, exit 2
- [ ] **Probe the gate before trusting it.** Copy one file to `.tmp/`, change one digit in its prose
      in the working copy, run `--diff --file <path>` → it reports `[D5]` for that file and exits 1.
      Then restore the file with `git checkout -- <path>` and re-run → exit 0. A gate that has never
      been seen to fail is not a gate.
- [ ] Command: `ls .tmp` after the probe → only files you created, and delete them when done

### WP-2: Recast the four calibration files

**Context:**
The four files below are one per body shape, chosen because they are the most legible examples of the
problem and because they span the two hardest shapes (an 835-word full lesson and a 269-word area
page). Each has an English twin that is the *fact reference* for the recast:

| Russian file | Shape | Words (V5, RU / EN) | English twin |
| --- | --- | --- | --- |
| `lessons/ru/01-cs-fundamentals/04-database-internals/index.md` | full | 835 / 948 | `lessons/01-cs-fundamentals/04-database-internals/index.md` |
| `lessons/ru/01-cs-fundamentals/04-database-internals/examples.md` | examples | 407 / 443 | `lessons/01-cs-fundamentals/04-database-internals/examples.md` |
| `lessons/ru/08-soft-skills/01-communication/index.md` | landing | 222 / 239 | `lessons/08-soft-skills/01-communication/index.md` |
| `lessons/ru/01-cs-fundamentals/01-computer-science/index.md` | area | 269 / 299 | `lessons/01-cs-fundamentals/01-computer-science/index.md` |

The full lesson is the worst case in the corpus: it carries three blacklist hits (`в одежде`,
`делает то же самое`, `стоящий за`) and one copula per paragraph, and its sentence count matches the
English twin exactly (55 against 55 under the pinned splitter). The area page is the tightest case:
269 words against a 340 ceiling and a 100 floor, so a recast has room but must not merge its prose
away — and it is the one calibration file whose sentence count already differs from the English
twin's (19 against 20), by a single sentence. The examples file has no frontmatter and its two
`## Пример N — …` headings are frozen.

`lessons/ru/GLOSSARY.md` holds the terminology table; its title rows are frozen, but a terminology row
that is itself a calque of English may be corrected here and must be corrected here if the recast
stops using it (rule R7). The live example is not a glossary row — it is prose: an index-only scan is
written `индексный проход` at `lessons/ru/01-cs-fundamentals/04-database-internals/index.md:24`, and the
form Russian practitioners use is `сканирование только по индексу`. Fix that sentence in the lesson
file; only add or correct a terminology row if the recast genuinely changes what a row asserts.

**Task:**
Recast the four files in place, prose only, so that each one reads as Russian written by a Russian
technical writer rather than as Russian words in English sentence order, and each one satisfies the
prose rules R1–R11 in `_index.md` → Conventions.

**Files:**
- `lessons/ru/01-cs-fundamentals/04-database-internals/index.md` — MODIFY — recast the prose of all
  six sections; frontmatter, headings, fences, ids and numbers unchanged
- `lessons/ru/01-cs-fundamentals/04-database-internals/examples.md` — MODIFY — recast the brief,
  solution and explanation prose of both examples; the two `## Пример N — …` headings, the
  `### Решение` lines, the fenced blocks and the fence tags unchanged
- `lessons/ru/08-soft-skills/01-communication/index.md` — MODIFY — recast the prose of all five
  sections and the four `**Title**` bullet descriptions; the bullet ids and titles unchanged
- `lessons/ru/01-cs-fundamentals/01-computer-science/index.md` — MODIFY — recast the prose of all
  four sections; the `Входящие навыки` bullets' titles and ids unchanged
- `lessons/ru/GLOSSARY.md` — MODIFY — only if a terminology row is corrected; never a title row

**Constraints:**
- DO: read the English twin in full first, and use it only to know what is true
- DO: discard the English sentence plan — merge, split, reorder. Target: the Russian sentence count
  differs from the English twin's (R1) and the ratio of the two median sentence lengths is at least
  0.95 (R2)
- DO: put new information at the end of the sentence (R3)
- DO: keep at most 3 occurrences of `— это ` in the full lesson, at most 2 in the landing and area
  pages (R4), and at least one `однако` in the full lesson (R6)
- DO: rewrite every English `-ing` clause as a `который`/`при этом`/`поскольку` clause or a separate
  sentence (R5)
- DO: keep the register neutral and technical, second person, present tense (R10)
- DO: write one file per `write` call, and run the gate and the validator after each file
- DO NOT: change a single character of the frontmatter, a heading, a fence, a fence tag, a backticked
  id, a `**Title**` bullet title, a number or a `status:` value. `--diff` fails on all of them
- DO NOT: add, drop or soften a fact, a number or a claim. If the Russian translation says something
  the English twin does not, restore the English claim (R9)
- DO NOT: move a landing or area file's V5 count below 190 (floor 180) or above its ceiling
- DO NOT: run this work package with a different model from the one intended for Phases 2–8

**Success:**
- [ ] Command: `node tools/check-ru-style.mjs --diff` → `0 structural differences`, exit 0
- [ ] Command: `node tools/validate-content.mjs --topic 01-cs-fundamentals --lang ru` → `0 error(s)`
- [ ] Command: `node tools/validate-content.mjs --topic 08-soft-skills --lang ru` → `0 error(s)`
- [ ] Command: `node tools/check-ru-style.mjs --file lessons/ru/01-cs-fundamentals/04-database-internals/index.md` → `same as EN: no`, `corr` ≤ 0.60, `— это` ≤ 3, `blacklist` 0
- [ ] Command: `node tools/check-ru-style.mjs --file lessons/ru/08-soft-skills/01-communication/index.md` → `same as EN: no`, `corr` ≤ 0.60
- [ ] Command: `node tools/check-ru-style.mjs --file lessons/ru/01-cs-fundamentals/01-computer-science/index.md` → `corr` ≤ 0.60 (it is 0.904 before the recast, and the sentence count already differs by one, so the count alone proves nothing), `words` between 190 and 340
- [ ] Command: `node tools/check-ru-style.mjs --file lessons/ru/01-cs-fundamentals/04-database-internals/examples.md` → `words` between 190 and 500, `corr` ≤ 0.60 (it is 0.986 before the recast)
- [ ] Command: `git diff --stat -- lessons/ru` → exactly 4 files changed (5 if `GLOSSARY.md` was
      corrected), nothing added, nothing deleted
- [ ] Manual: the four files' `git diff` output is shown to the user as the approval artefact

### WP-3: Write the contract into AUTHORING.md and freeze the targets

**Context:**
`lessons/AUTHORING.md` is the corpus's contract document, 302 lines. §9 is the English voice section;
§13 "The Russian corpus" is the last section and ends the file. §14 is appended after it. The
validator's own checks are tabulated in §11, and the site's `INDEX.md` and V17 depend on the title
rows in `lessons/ru/GLOSSARY.md` — those rows must survive this work package untouched.

`tools/check-ru-style.mjs` now runs, and the four calibration files have been recast. Measure them
with `node tools/check-ru-style.mjs --file <path>` before writing anything: the measured values of
the four approved files are the anchor the corpus targets get set from. `BASELINE_METRICS` and its
recording date are the baseline the recast moves away from — §14 repeats them so the corpus targets
have a written starting point after the script is forgotten.

**Task:**
Append a `## 14. Russian prose` section to `lessons/AUTHORING.md` containing, in this order: the two
slices and the sentence splitter from `_index.md` → Conventions → *Measurement definitions*, quoted
verbatim; the nine frozen invariants from `_index.md` → Conventions (as a numbered list, with the
`--diff` tags mentioned); the eleven prose rules R1–R11 with their baselines, quoting
`BASELINE_METRICS` and its recording date; the target table with the frozen values; the two
word-band warnings (thin landing floor, merging reduces word count); and one line saying
`node tools/check-ru-style.mjs --strict` is the gate and `--diff` is the structural guard. Then set
the `TARGETS` constant in `tools/check-ru-style.mjs` to the values the section documents, so the two
copies agree.

**Files:**
- `lessons/AUTHORING.md` — MODIFY — append `## 14. Russian prose` after the current final line
- `tools/check-ru-style.mjs` — MODIFY — `TARGETS` set to the documented values, with a comment naming
  the calibration files they were derived from

**Constraints:**
- DO: keep every value in §14 identical to the `TARGETS` constant and to `_index.md`'s target column;
  three copies of a number is a bug if they disagree
- DO: quote `BASELINE_METRICS` from `tools/check-ru-style.mjs`, not `_index.md`'s Global Context table;
  the recorded values are the ones the gate actually prints
- DO: keep the section in the document's voice: plain declarative sentences, tables, no preamble
- DO: state that §13's rules (headings, ids, the three literals, the bands) still hold — §14 changes
  prose only
- DO: leave `§1`–`§13` byte-identical
- DO NOT: renumber or reorder an existing section
- DO NOT: touch the 177 title rows of `lessons/ru/GLOSSARY.md`, and do not restate them in §14
- DO NOT: weaken a target to make the corpus pass. The corpus is what has to move

**Success:**
- [ ] Command: `grep -c '## 14. Russian prose' lessons/AUTHORING.md` → `1`
- [ ] Command: `git diff --numstat -- lessons/AUTHORING.md` → insertions only, deletions `0`
- [ ] Command: `grep -c 'check-ru-style' lessons/AUTHORING.md` → at least `2`
- [ ] Command: `for t in 0.60 0.95 0.80 1.50 2.00; do grep -c "$t" lessons/AUTHORING.md tools/check-ru-style.mjs; done` → every number found in both files
- [ ] Command: `grep -c 'BASELINE_METRICS' lessons/AUTHORING.md` → `1`, and the block it quotes carries
      the recording date
- [ ] Command: `node tools/check-ru-style.mjs --file lessons/ru/01-cs-fundamentals/04-database-internals/index.md` → no per-file warning
- [ ] Command: `node tools/check-ru-style.mjs --topic 01-cs-fundamentals --strict` → exits 1, and the
      three calibration files in this topic (`04-database-internals/index.md`,
      `04-database-internals/examples.md`, `01-computer-science/index.md`) do not appear in the
      per-file warning list. The exit is the missed corpus targets, not the per-file rules: 105 of the
      topic's 108 files are still the untranslated mirror, and only files with a blacklist hit or more
      than 3 copulas are named
- [ ] Command: `node tools/validate-content.mjs --strict --lang en` → `177 present, 0 pending, 297 examples, 0 examples pending, 0 error(s)`
- [ ] Command: `node tools/validate-content.mjs --strict --lang ru` → the same five-part line, exit 0

## Phase Verification

```bash
node --check tools/check-ru-style.mjs
node tools/check-ru-style.mjs
node tools/check-ru-style.mjs --diff
node tools/validate-content.mjs --strict --lang en
node tools/validate-content.mjs --strict --lang ru
git diff --stat -- lessons/ru tools lessons/AUTHORING.md
```

- [ ] `--diff` reports `0 structural differences` across all 698 files
- [ ] Both validator roots exit 0 with `177 present, 0 pending, 297 examples, 0 examples pending, 0 error(s)`
- [ ] The recorded baseline is still what `BASELINE_METRICS` holds and what §14 quotes, and the
      corpus block after WP-2 shows the first movement: blacklist hits down, `однако` above 0
- [ ] `lessons/ru/GLOSSARY.md`'s 177 title rows are unchanged: `git diff --numstat -- lessons/ru/GLOSSARY.md`
      shows no line beginning with a title row removed
- [ ] **Hard stop.** The four `git diff` outputs are presented to the user, together with the model
      that produced them. Phase 2 does not start until the user says the voice is right. If the user
      says no, WP-2 and WP-3 are redone against the user's notes; nothing else in the plan changes.
