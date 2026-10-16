---
plan: russian-prose
title: "Russian prose — recast lessons/ru/ from translated Russian into Russian"
created: 2026-10-15
status: draft
planner-model: claude-sonnet-4-5
---

# Plan: Russian prose

## Objective

Every file under `lessons/ru/` is currently a sentence-for-sentence mirror of its English twin: the
words are Russian, the sentence plan, word order and discourse layer are English. This plan recasts
all **698 files** — 401 lesson files and 297 examples files — into Russian written by a Russian
writer, without adding, dropping or reordering a single file, id, heading, code block or fact. When
this plan is executed, `node tools/check-ru-style.mjs --strict` reports every corpus target met and
exits 0, `node tools/check-ru-style.mjs --diff` reports no structural drift in any file, and
`node tools/validate-content.mjs --strict --lang ru` still reports
`177 present, 0 pending, 297 examples, 0 examples pending, 0 error(s)`.

## Global Context

**Dependency.** This plan requires `.pi/plans/russian-corpus/` to be fully executed and committed. It
recasts the existing Russian corpus in place; it creates no lesson file and renames nothing.

**The project.** `2learn` is a Markdown-only lesson corpus at `D:\coding\apps\2learn` with no
`package.json` and no dependencies. All tooling is plain Node ESM and must keep working on a clean
checkout with nothing but Node ≥ 22 and `git`. The English corpus lives in `lessons/` and is
**frozen** — this plan never writes to it.

**The diagnosis, measured over the 698 Russian files (332,680 words, counted as V5 counts them).** These are the numbers
the recast must move; `tools/check-ru-style.mjs` (WP-1) measures all nine again on every run.

| Signal | Baseline | Meaning |
| --- | --- | --- |
| Mean Pearson correlation of sentence lengths against the English twin | **0.926** | the Russian sentence lengths predict the English ones |
| Files with correlation > 0.7 | **96.4%** | the mirroring is not occasional, it is the method |
| Files whose sentence count equals the English twin's exactly | **668 of 698 (95.7%)** | one Russian sentence per English sentence |
| Mean RU/EN sentence-count ratio | **1.001** | the translation never merged and never split |
| Mean RU/EN median sentence-length ratio | **0.861** | the Russian is a compressed mirror of the English |
| `однако` per 1000 words | **0.00** | the corpus has no Russian adversative connectors at all |
| `X — это Y` per 1000 words | **2.59** | the English copula rendered as a fixed Russian frame |
| Attributive participles per 1000 words | **2.76** | English `-ing` clauses rendered as Russian participles |
| Blacklisted calque phrases | **15 hits in 10 files** | literal idioms that survived translation |

The word count and the four marker rows (blacklist, `— это `, participle, `однако`) are exact under
the measurement definitions below. The three sentence-level rows and the median-ratio row are the
planner's measurements and depend on the sentence splitter, which WP-1 pins. WP-1 re-measures all
nine on the untouched corpus, records them in the script as `BASELINE_METRICS`, and **reports** any
difference from this table instead of bending the script or the corpus to match it.

**Why the corpus is like this, and why that matters to the executor.** Every file was produced by a
task that said *translate this file*. Under that instruction, keeping the English sentence plan is
the path of least resistance no matter how good the writer is — which is why the correlation is 0.93
and not 0.3. The fix is not better words. The fix is a different unit of work: **the file is
rewritten, not translated.** The executor reads the English twin to know *what is true*, then writes
Russian sentences that a Russian writer would have written, and the English sentence plan is
explicitly discarded.

**The safety net.** Recasting prose by hand across 698 files is exactly the operation that silently
breaks a corpus — a dropped fence, a changed number, a retyped id. So the plan is built around one
zero-dependency script, `tools/check-ru-style.mjs` (WP-1), with two modes: a marker report that
measures the nine signals above and records the seven corpus numbers it finds as `BASELINE_METRICS`,
and a `--diff` mode that compares every recast file against
`git show <BASELINE>:<path>` and fails the moment anything but prose has changed. Nothing else in
this plan is novel; the fan-out pattern is the one `.pi/plans/russian-corpus/` used.

## Global Constraints

- **DO NOT** write anything under `lessons/` outside `lessons/ru/`. The English corpus is the fact
  reference and the diff baseline; it is read-only.
- **DO NOT** edit anything under `seed/**`, and do not edit `.pi/plans/**` while executing this plan.
- **DO NOT** `git add`, `git commit`, `git push` or publish anything. The user handles all git. The
  `--diff` mode reads the baseline commit, so the user may commit between phases without breaking
  the gate.
- **DO NOT** add a `package.json`, a dependency, a lockfile or a test runner. `tools/check-ru-style.mjs`
  is plain Node ESM with zero imports beyond `node:fs`, `node:path` and `node:child_process`.
- **DO NOT** create, delete, rename or move a Russian file. The set of 698 `.md` files under
  `lessons/ru/` is exactly the set that exists when this plan starts.
- **DO NOT** change frontmatter, headings, fenced blocks, ids or numbers. They are frozen and
  machine-checked (see Conventions).
- **DO NOT** change `status: drafted`. Only the user promotes an entry. Recasting is not reviewing.
- **DO** write one file per `write` tool call. A recast is a whole-file rewrite, not a patch.
- **DO** read the English twin in full before recasting a file, and use it only as the record of what
  is true. Never as a sentence template.
- **DO** run `node tools/check-ru-style.mjs --diff --topic <topic dir>` after each work package and
  `node tools/validate-content.mjs --topic <topic dir> --lang ru` after each work package. The
  Russian root needs `--lang ru`; the default is `en` and validates the wrong tree silently.
- **DO** create temp files only in `.tmp/` under the repo root and delete them when the phase ends.
- **NEVER** write `https://` or `http://` anywhere under `lessons/ru/`, including inside a fence.

## Conventions — the Russian prose contract

This is the contract. WP-3 copies it into `lessons/AUTHORING.md` **§14**, with the thresholds frozen
from the calibration measurements, and from then on §14 is the durable copy. Every work package in
every phase is measured against this section.

### Frozen — the gate compares these against `git show BASELINE:<path>` and fails on any difference

1. The frontmatter block, byte for byte.
2. The `## ` heading lines, byte for byte, in the same order.
3. Every fenced block, byte for byte, including the language tag on its opening fence.
4. The multiset of backticked spans — every id stays byte-identical.
5. The multiset of numeric tokens.
6. The `## Пример N — …` heading lines of an examples file.
7. The literals `Готово, когда:`, `Нет.`, `; исправить: `, `### Решение`.
8. `status: drafted`.
9. The 177 title rows in `lessons/ru/GLOSSARY.md`. A terminology row may be corrected (see R7); a
   title row may not be touched, because `title` feeds `INDEX.md` and V17. This one is **not** a
   `--diff` check — the gate skips `GLOSSARY.md` — it is guarded by WP-3's DO-NOT, by the
   `--write-index` no-diff check in WP-75, and by `git diff`.

### Measurement definitions — the instrument

Two slices and one word count. Every number in this plan comes from them, they are frozen the moment
WP-1 runs, and the script's header comment carries this text verbatim.

**V5 word count** — the whole file from the line after the closing `---` to the end, whitespace split,
empty parts dropped. This is exactly `tools/validate-content.mjs:315`. It is what the word bands use.

**`flow` — the sentence slice.** The file with the frontmatter block removed, every fenced block
removed (the text between an opening and a closing ```` ``` ```` line, inclusive), and bullet markers
(`- `, `1. `) dropped. **Heading lines are kept**, because a heading closes the sentence before it.
Sentences are cut at a line end and after `[.!?…]` when the next non-space character is
`А-ЯЁ A-Z 0-9 « " „ —`; each sentence is trimmed and the empties dropped. A sentence's length is its
character count. This slice feeds the sentence count, the Pearson correlation, the two median
sentence lengths and their ratio.

**`prose` — the marker slice.** `flow` with **every heading line also removed** — `/^#{1,6} /`, all
six levels, not only `## `. This slice feeds the blacklist, the `— это ` count, the participle count
and the connector count. All six levels matter: dropping only `## ` inflates the blacklist baseline
to 16 hits in 11 files and the copula baseline to 2.91 per 1000.

These are deliberately not the same slice. The blacklist, copula and participle baselines reproduce
only on `prose`; the sentence-count figure reproduces only on `flow`. Do not "unify" them.

### The prose rules — what must change

**R1 — Discard the English sentence plan.** The Russian file's sentence count must not equal the
English twin's. Merge two English sentences into one; split one into two; reorder them. Corpus
target: **mean sentence-length correlation ≤ 0.60** (baseline 0.926), **files with an identical
sentence count ≤ 40%** (baseline 95.7%).

**R2 — Let the Russian sentence be as long as it needs to be.** Russian technical prose subordinates
where English juxtaposes. Corpus target: **median sentence-length ratio ≥ 0.95** (baseline 0.861) —
the Russian must stop being a compressed mirror of the English.

**R3 — Put new information last.** Russian builds a sentence from known to new. Do not front the
grammatical subject merely because the English did. `Производительность запроса решается здесь, а не
в его тексте` is the right order; `Текст запроса не решает производительность — она решается здесь`
is the same content in the Russian order.

**R4 — `X — это Y` is a calque of `X is Y`.** Keep it only where a term is defined for the first
time, which in practice is the opening sentence of `Что это такое`. Everywhere else use a real verb,
a colon, or a predicate-first construction. Corpus target: **≤ 1.50 per 1000 words** (baseline 2.59);
per-file cap **3**, which `--strict` enforces.

**R5 — An English `-ing` clause never becomes an attributive Russian participle.** `does the same
while looking correct` becomes a `который` clause, a `при этом` clause, `поскольку`, or its own
sentence — never `выглядя при этом правильно`. Corpus target: **≤ 2.00 per 1000 words** (baseline
2.76).

**R6 — Restore the Russian discourse layer.** English does with a comma, a dash and juxtaposition
what Russian does with connectives. Use `однако`, `при этом`, `зато`, `хотя`, `ведь`, `поэтому`,
`то есть`, `иначе говоря` where the argument actually turns or explains. Corpus target:
**`однако` ≥ 0.80 per 1000 words** (baseline 0.00). Do not sprinkle them — a connective that does
not mark a real turn is worse than none.

**R7 — Terminology is the settled Russian term, not the calque.** `GLOSSARY.md`'s terminology table
is authoritative; when a row is itself a calque, replace it with the form Russian practitioners use,
and update that row in the same work package. A calque to watch for: `индексный проход` for an
index-only scan → `сканирование только по индексу`.

**R8 — These idioms must not survive.** `делает то же самое`, `делает то же`, `то же самое, но`,
`в одежде`, `стоящий за`, `играет роль`, `делает это возможным`. Use `так же`, `столь же`,
`тот же …, только`, or rewrite the sentence. The **report** fails on any hit under `--strict`;
`--diff` does not look at the blacklist at all — and cannot, because some raw hits sit inside frozen
fences. Corpus target: **0 hits**, measured on `prose`.

**R9 — Facts are frozen.** No number, name, claim, cause, condition or code sample may be added,
dropped, softened or strengthened. The English twin is the reference for every factual statement;
if the Russian translation says something the English does not, the recast restores the English
claim — it does not invent a third version. `--diff` catches the mechanical half of this (numbers,
ids, fences, headings); the other half is the executor's responsibility.

**R10 — Keep the register.** Neutral technical Russian, second person, present tense, active voice,
no marketing adjectives, no emoji, no filler. Product and language names stay in Latin script
(React, Git, Docker, Kubernetes, npm, TypeScript). British English does not apply to this corpus.

**R11 — Do not touch the structure.** Headings, their order, the three literals, the backticked ids,
the em dash (U+2014, spaced), the fence language tags and the `**Title**` bullet ids are the
validator's contract. A recast changes prose only. A line beginning with `## ` inside a fence is
never introduced, because the validator parses it as a real heading.

### Word bands — unchanged, and not a target

`full` 400–1100, `landing` 180–460, `area` 100–340, `examples` 100–500 words, counted exactly as V5
counts them. The corpus sits comfortably inside them at present (full: 513–866 across 297 files;
landing: 202–287; area: 234–275; examples: 174–422), so a recast has room in both directions. Two
honest warnings: landings have the thinnest floor headroom (202 against a floor of 180), and merging
sentences reduces word count — do not merge a landing file's prose below 190 words.

## Phases

| # | Name | File | WPs | Depends On |
| --- | --- | --- | --- | --- |
| 1 | Style gate and calibration | phase-01-style-gate-and-calibration.md | WP-1–WP-3 | Russian corpus committed |
| 2 | 01-cs-fundamentals | phase-02-cs-fundamentals.md | WP-4–WP-13 | Phase 1, user approval |
| 3 | 02-frontend | phase-03-frontend.md | WP-14–WP-26 | Phase 2 |
| 4 | 03-design-ux | phase-04-design-ux.md | WP-27–WP-41 | Phase 3 |
| 5 | 04-product-process | phase-05-product-process.md | WP-42–WP-48 | Phase 4 |
| 6 | 05-backend-data | phase-06-backend-data.md | WP-49–WP-57 | Phase 5 |
| 7 | 06-cloud-devops | phase-07-cloud-devops.md | WP-58–WP-68 | Phase 6 |
| 8 | 07-security, 08-soft-skills, audit | phase-08-security-soft-skills-audit.md | WP-69–WP-75 | Phase 7 |

75 work packages: 3 build the gate and settle the voice, 70 recast the corpus, 2 audit it and hand it over.

## File Map

The unit of work is a **topic directory**. Every work package modifies existing files and creates
none, so the file list of every work package is "every `.md` under these entry directories, and the
count is unchanged". The counts below are the contract.

**Phase 1:**
- `tools/check-ru-style.mjs` — CREATE — the style gate: marker report, `--diff` invariants, `BASELINE`
- `lessons/AUTHORING.md` — MODIFY — append §14 "Russian prose" (WP-3)
- `lessons/ru/GLOSSARY.md` — MODIFY — terminology rows only, never title rows (WP-2)
- `lessons/ru/01-cs-fundamentals/04-database-internals/index.md` — MODIFY — calibration, full shape
- `lessons/ru/01-cs-fundamentals/04-database-internals/examples.md` — MODIFY — calibration, examples
- `lessons/ru/08-soft-skills/01-communication/index.md` — MODIFY — calibration, landing shape
- `lessons/ru/01-cs-fundamentals/01-computer-science/index.md` — MODIFY — calibration, area shape

Three notes on Phase 1's file map. `tools/check-ru-style.mjs` is created by WP-1 and then modified by
WP-3, which sets `TARGETS` to the documented values. `lessons/AUTHORING.md` is modified twice: §14 by
WP-3 and the measured-result block by WP-74. And the four calibration files are Phase 1's approved exemplars: WP-4, WP-5 and WP-71 own them, but
must verify them with `--file` / `--diff` and **not rewrite them**. Rewriting the artefact the user
approved is how the approval gets lost.

**Phases 2–8:** the 698 existing files under `lessons/ru/`, by topic, in the counts below. No file is
created, deleted or renamed.

| Phase | Topic directory | Files to recast |
| --- | --- | --- |
| 2 | `lessons/ru/01-cs-fundamentals` | 108 |
| 3 | `lessons/ru/02-frontend` | 133 |
| 4 | `lessons/ru/03-design-ux` | 156 |
| 5 | `lessons/ru/04-product-process` | 61 |
| 6 | `lessons/ru/05-backend-data` | 91 |
| 7 | `lessons/ru/06-cloud-devops` | 102 |
| 8 | `lessons/ru/07-security` + `lessons/ru/08-soft-skills` | 23 + 24 |
| | **Total** | **698** |

**Never modified:** `lessons/ru/INDEX.md` (generated, and unchanged because no title changes),
`lessons/ru/GLOSSARY.md`'s 177 title rows, and everything under `lessons/` outside `lessons/ru/`.

## Execution Instructions

Execute as follows:

1. Read this `_index.md` fully — the Conventions section is the contract every work package is
   measured against.
2. Read `phase-01-style-gate-and-calibration.md` and execute WP-1, WP-2 and WP-3 in order.
3. **Stop at the end of Phase 1.** The user reads the four calibration diffs and says whether the
   voice is right. Do not start Phase 2 before that answer. If the answer is no, WP-2 and WP-3 are
   redone; nothing else changes.
4. For Phases 2–8, execute the work packages in order. After the last work package of a phase, run
   the Phase Verification block. Fix failures before moving on. Do not skip a phase.
5. Each phase file is self-contained apart from this `_index.md`; you should not need to read another
   phase file.

**Parallel execution — the established pattern.** Phases 2–8 recast 698 files in 70 work packages.
The pattern `.pi/plans/russian-corpus/` used and this plan assumes is a fan-out of **at most four
concurrent `worker` subagents, one work package per subagent, in disjoint topic/entry directories**,
each writing one file per `write` call and running the per-topic gate before it reports. The parent
session owns every scope decision, the WP numbering, and the phase verification; it never recasts a
file itself. Keep each child's prompt short and point it at this `_index.md` and its WP block rather
than pasting the contract into the prompt.

**Model choice is part of the calibration gate.** WP-2 must be run with the same model that will do
the whole pass, and the user approves that model together with the voice at the end of Phase 1.

**Critical rules for the executor:**

- Do exactly what each work package says. Do not add features, do not "improve" a lesson's content,
  and do not fix anything the plan did not ask for.
- If a constraint says DO NOT, respect it absolutely.
- If you believe the plan has an error — a wrong count, an entry that does not exist, a target the
  calibration cannot meet — stop and report it. Do not bend the script or the corpus to match the
  plan's numbers. The word count and the four marker rows of the baseline table in Global Context are
  reproducible by running `node tools/check-ru-style.mjs` on the untouched corpus with the measurement
  definitions above; a mismatch there means the script is wrong, not the plan. A mismatch confined to
  the three sentence-level rows is expected if the splitter is not the pinned one: re-record
  `BASELINE_METRICS` from the run and report the difference. A **target** is never re-recorded.
- Run the success checks after every work package, not just at the end of a phase.
- `--diff` failing is never a false alarm: it means non-prose text changed. Revert that file with
  `git checkout -- <path>` and recast it again. The revert restores the *baseline* file, so it throws
  away that file's recast along with the bad edit — that is intended. Never run it on one of the four
  calibration files: fix the offending invariant by hand, because the revert would destroy the voice
  the user approved.
