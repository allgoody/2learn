# Phase 1: Russian toolkit

## Objective

Teach the validator about a second language root, fix the Russian heading vocabulary and word bands,
write the contract and the glossary, and translate one entry end to end as the exemplar. Nothing
else in the plan may start before this phase passes — it is the only place where the Russian rules
are decided.

## Prerequisites

- `.pi/plans/corpus-order-and-examples/` fully executed: `node tools/validate-content.mjs --strict`
  reports `177 present, 0 pending, 297 examples, 0 examples pending, 0 error(s)` and exits 0.
- No `lessons/ru/` directory exists yet.

## Shared Context

The validator's filesystem scan walks `subdirs(LESSONS)` and builds `id = topic + "/" + slug` from
the directory names (`tools/validate-content.mjs`, "filesystem scan" around line 84). With
`lessons/ru/` present, `ru` would be read as a ninth topic and each of the eight directories under it
would fail V14's unknown-entry-directory check. The scan therefore has to become root-aware: one root
for English, one for Russian, and `ru` skipped inside the English root.

The Russian tree keeps the English ids. A Russian `index.md` at
`lessons/ru/01-cs-fundamentals/04-database-internals/index.md` carries
`topic: 01-cs-fundamentals`, the same `prereqs` array as its English twin, and a Russian `title`.
That is what lets one validator body serve both roots without any id translation.

**The Russian heading vocabulary.** Fixed here, enforced from WP-2 onwards, used verbatim in every
Russian file. The em dash in the examples heading is U+2014 with spaces around it.

| English heading | Russian heading | Shape |
| --- | --- | --- |
| `What it is` | `Что это такое` | all three |
| `Why it matters` | `Почему это важно` | full, landing, area |
| `Core ideas` | `Ключевые идеи` | full |
| `Practice` | `Практика` | full |
| `Common mistakes` | `Частые ошибки` | full |
| `Go deeper` | `Что читать дальше` | full, landing |
| `In this track` | `Что в этом треке` | landing |
| `Prerequisites` | `Предварительные требования` | landing |
| `What it covers` | `Что охватывает` | area |
| `Included skills` | `Входящие навыки` | area |
| `Where to start` | `С чего начать` | area |
| `## Example N — …` | `## Пример N — …` | examples |
| `### Solution` | `### Решение` | examples |

**The Russian literals.** Structured lines the validator greps for:

| English | Russian |
| --- | --- |
| `Done when:` (start of line in `## Practice`) | `Готово, когда:` |
| `None.` (the whole `## Prerequisites` body) | `Нет.` |
| `; fix: ` (inside a `## Common mistakes` bullet) | `; исправить: ` |

## Work Packages

### WP-1: Make the validator root-aware

**Context:**
`tools/validate-content.mjs` derives everything from one `LESSONS` constant (line 9) and reports one
summary line at the end (line 429). The `--topic` and `--strict` flags are parsed around line 27.
`--write-index` writes to `join(LESSONS, "INDEX.md")` (line 407). The counters (`present`, `pending`,
`examplesPresent`, `examplesPending`) and the `errors` array are module-level globals, so each root
needs its own state.

**Task:**
Introduce a language-root concept and a `--lang` flag:

- `--lang en` — scan `lessons/` but skip the `ru` subdirectory. The default when no `--lang` is given, so existing commands and habits behave exactly as before.
- `--lang ru` — scan `lessons/ru/` only.
- `--lang all` — scan both roots and print one summary line per root. `--topic` still filters both roots by topic slug.
- For the Russian root, `--write-index` labels each entry with the `title` read from that entry's Russian `index.md` (falling back to `(pending)` when the file is missing), not the English `e.title` from the inventory.
- Give each root its own `seen`, `present`, `pending`, `examplesPresent`, `examplesPending` and `errors` state, so `--lang all` prints correct per-root lines.

Each root prints its own summary line. With a single root selected the line format is unchanged from
Plan A. `--strict`, `--topic` and `--write-index` all act on the selected roots only, and
`--write-index` writes `lessons/INDEX.md` for the English root and `lessons/ru/INDEX.md` for the
Russian root. Running `--write-index --lang ru` before any Russian file exists must produce a valid
`lessons/ru/INDEX.md` listing all 177 entries as `(pending)`; that file is regenerated in Phase 8.

**Files:**
- `tools/validate-content.mjs` — MODIFY — the `LESSONS` constant, the argument parser, the filesystem scan, the report, the `--write-index` target and its label source

**Constraints:**
- DO: skip the `ru` directory when scanning the English root — otherwise `ru` fails V14's unknown-entry-directory check.
- DO: keep `TOPICS` as the 8 prefixed topic directory names; both roots use the same names.
- DO: leave every V1–V16 check body untouched in this WP — only the root plumbing changes (the sole exception is the `--write-index` label source named in the Task).
- DO: keep the file zero-dependency and LF, and keep `node --check` clean.
- DO: keep one `errors` array and one set of counters per root, reset between roots.
- DO: for the Russian root read the index label from the entry's `index.md`; keep the English root's label from the inventory.
- DO: reject an unknown `--lang` value with exit code 2 and a message naming the accepted values.
- DO NOT: create any Russian content in this WP.
- DO NOT: change how `present`, `pending`, `examples` or `errors` are counted.

**Success:**
- [ ] Command: `node --check tools/validate-content.mjs` → exit 0
- [ ] Command: `node tools/validate-content.mjs --strict` → `177 present, 0 pending, 297 examples, 0 examples pending, 0 error(s)`, exit 0
- [ ] Command: `node tools/validate-content.mjs --strict --lang en` → byte-identical output to the command above
- [ ] Command: `node tools/validate-content.mjs --lang ru --strict` → reports `177 pending` for the Russian root and exits non-zero, and does not report an unknown-topic or unknown-directory error for `ru`
- [ ] Command: `node tools/validate-content.mjs --lang all` → prints two summary lines, one per root
- [ ] Command: `node tools/validate-content.mjs --lang fr` → exit code 2 with a message naming `en`, `ru` and `all`

### WP-2: Add the Russian shapes, bands and literals

**Context:**
`SHAPES` (line 13), `WORDS` (line 18) and the three literal checks are hard-coded English — the
`Done when:` check in the `## Practice` block, the `None.` check in the `## Prerequisites` block and
the `; fix: ` pattern in `## Common mistakes`. With a Russian root in place, every Russian file would
fail V4 on its headings alone.

A second set of English literals sits outside `SHAPES`: the section lookups that drive the other
lesson checks. `sec("Core ideas")`, `sec("Practice")`, `sec("Common mistakes")` and
`sec("Go deeper")` drive V7; `sec("In this track")` drives V9; `sec("Prerequisites")` drives V10;
`sec("Included skills")` and `sec("Where to start")` drive V11; and `hasPractice` greps for the
literal `## Practice` for V16. If only `SHAPES` becomes per-language, every one of these lookups
returns nothing for a Russian file, and V7, V9, V10, V11 and V16 silently stop guarding the whole
Russian corpus.

**Task:**
Make the heading vocabulary, the word bands and the three literals per-language, using the tables in
Shared Context, and add a title-consistency check (V17) that runs only for the Russian root.

Route every English heading literal in a check through the same per-language map, not only `SHAPES`:
`Core ideas`, `Practice`, `Common mistakes`, `Go deeper`, `In this track`, `Prerequisites`,
`Included skills`, `Where to start`, and the `Practice` literal inside `hasPractice`. Make
`EXAMPLES_WORDS` per-language too (Russian examples 100–500).

**Files:**
- `tools/validate-content.mjs` — MODIFY — `SHAPES`, `WORDS`, `EXAMPLES_WORDS`, the section lookups, the literal matches, and a new V17

**Constraints:**
- DO: implement `SHAPES` and `WORDS` as per-language objects keyed by `lang`, leaving the English entries byte-identical to their current values.
- DO: implement the Russian examples-file checks with `## Пример N — ` (em dash, U+2014) and `### Решение`, keeping the same structure rules as V15: 1–2 examples numbered from 1, one solution per example placed after its heading, a language tag on every opening fence, 100–500 words, no `https://`/`http://`.
- DO: implement V17 for the Russian root only: for every bullet matching ``(`<id>`)`` in `## Предварительные требования`, `## Что в этом треке`, `## Входящие навыки` and `## Что читать дальше` — both the `- ` and the numbered `1. ` shapes occur — the text between the `**` markers must exactly equal the `title` from the target's frontmatter (the target entry's `index.md`, or the target child's own file). Report the mismatch with both strings and the id.
- DO: make V17 **skip** a bullet whose target file does not exist or is not yet Russian (its `title` is still the English one). An unwritten target is not a V17 error, because Phases 2–7 translate entry by entry and most targets are missing while a topic is in progress; completeness is WP-40's job, not V17's.
- DO: leave V1–V16 numerically unchanged, and keep the tag numbering so `[V17]` is the only new tag.
- DO: keep the English path through the code exactly as it behaves today.
- DO NOT: change the English bands (450–950, 200–400, 120–300, 120–450).
- DO NOT: make V17 apply to the English root.
- DO NOT: add a dependency.

**Success:**
- [ ] Command: `node --check tools/validate-content.mjs` → exit 0
- [ ] Command: `node tools/validate-content.mjs --strict --lang en` → `177 present, 0 pending, 297 examples, 0 examples pending, 0 error(s)`, exit 0
- [ ] Command: `node tools/validate-content.mjs --lang ru` → no V4 heading errors (errors may still be `[V2]`/`[V16]` pending-style only)
- [ ] Fixture check (no V4): copy `lessons/01-cs-fundamentals/06-regular-expressions-regex/index.md` to `lessons/ru/01-cs-fundamentals/06-regular-expressions-regex/index.md`, replace only its `##` headings with the Russian vocabulary from Shared Context, then run `node tools/validate-content.mjs --lang ru --topic 01-cs-fundamentals` and confirm no `[V4]` heading error names the fixture — record the output verbatim
- [ ] Fixture check (V17 mismatch): in that fixture add a `## Что читать дальше` bullet whose `**…**` text is `Неверный заголовок` and whose backticked id is `01-cs-fundamentals/06-regular-expressions-regex`, so the bullet points at its own file with a title that differs from the fixture's `title`; rerun and confirm `[V17]` fires naming both strings
- [ ] Fixture check (V17 skip): confirm `[V17]` does **not** fire for a bullet pointing at `01-cs-fundamentals/15-operating-systems`, which has no Russian file yet
- [ ] Delete the fixture directory `lessons/ru/01-cs-fundamentals/06-regular-expressions-regex/` when the V17 checks are done

### WP-3: Write the Russian contract into AUTHORING.md

**Context:**
`lessons/AUTHORING.md` now ends at `## 12. Examples files`. The Russian corpus needs its own section
stating the mirror rule, the id rule, the heading vocabulary, the literals, the bands and the
translation policy, so that later authors do not have to read this plan.

**Task:**
Append a `## 13. The Russian corpus` section to `lessons/AUTHORING.md` containing: the mirror rule
with the two-path example, the rule that ids, `prereqs`, `related`, `type`, `tier`, `aliases` and
`status` are copied from the English file and never translated, the full heading vocabulary table,
the three literal replacements, the Russian word bands, the rule that code identifiers and fence
language tags stay as they are while comments and prose strings are translated, the rule that
`GLOSSARY.md` is binding for titles, and the command
`node tools/validate-content.mjs --strict --lang ru` as the definition of done.

**Files:**
- `lessons/AUTHORING.md` — MODIFY — one new section appended at the end

**Constraints:**
- DO: reproduce the heading and literal tables exactly as they appear in Shared Context.
- DO: state that nothing outside `lessons/ru/` is edited by Russian work.
- DO: keep §1–§12 byte-identical.
- DO NOT: restate the English shapes and bands.
- DO NOT: mention this plan's phase names in the contract.

**Success:**
- [ ] Grep: `grep -n '^## 13\.' lessons/AUTHORING.md` → 1 match
- [ ] Grep: `grep -c 'Что читать дальше' lessons/AUTHORING.md` → ≥ 1
- [ ] Grep: `grep -n '^## ' lessons/AUTHORING.md` → §1–§12 present and unchanged, plus §13
- [ ] Command: `node tools/validate-content.mjs --strict --lang en` → still `0 error(s)`

### WP-4: Write the glossary, including all 177 Russian titles

**Context:**
Titles appear in two places a translator edits — the entry's own frontmatter and every `**Title**`
bullet that points at it — and the generated `lessons/ru/INDEX.md` copies them from those files.
There are 177 entries and a title can be referenced from many files, so the Russian rendering of each
title has to be decided once, centrally, and then copied. `GLOSSARY.md` is that central
record, and V17 enforces it.

**Task:**
Create `lessons/ru/GLOSSARY.md` with two tables:

1. **Terminology** — the recurring terms of art with their agreed Russian rendering, at least these: lesson, entry, prerequisite, track, shape, skill, area, tier, alias, practice, exercise, core ideas, common mistakes, go deeper, spec, requirement, stakeholder, trade-off, code review, refactoring, latency, throughput, deployment, rollback, index (database), query plan, schema, migration, cache, queue, retry, timeout, endpoint, payload, container, cluster, secret, token, hash, encryption, certificate, consent, retention. Where an established Russian term exists, use it; where the industry in practice keeps the English word (for example `деплой`, `токен`, `кэш`), settle on one form and record the choice in the table.
2. **Entry titles** — all 177 entries, one row each, with the columns: id, English title (verbatim from `tools/inventory.json`), Russian title. Child lesson titles are not in this table; children get their titles from their own file, and the translator must keep them consistent with the parent's terminology.

Rules for the Russian titles, stated at the top of the file: keep product and language names in
Latin script (React, Git, Docker, Kubernetes, Figma, npm, TypeScript); translate the descriptive
part; keep acronyms in Latin script where they are the common form (HTML, CSS, SQL, API, CI/CD,
AWS, GCP); no trailing full stop; sentence case as in Russian orthography (capital only on the first
word and on proper nouns).

**Files:**
- `lessons/ru/GLOSSARY.md` — CREATE — terminology table plus the 177-row title table

**Constraints:**
- DO: derive the English titles by reading `tools/inventory.json` — never retype them from memory or from prose.
- DO: write the id column exactly as the inventory has it, with its numeric prefixes.
- DO: state the title rules at the top of the file so a later reader can extend the table.
- DO: keep the table sorted by id so the 8 topics appear in pedagogical order.
- DO: keep `GLOSSARY.md` free of external URLs, like every other file under `lessons/`.
- DO NOT: invent an entry, omit one, or translate an id.
- DO NOT: decide the Russian wording by improvising per file — this file is the decision.

**Success:**
- [ ] Command: `grep -c '^| ' lessons/ru/GLOSSARY.md` → at least 177 title rows plus the terminology rows
- [ ] Command: `node -e "const i=require('./tools/inventory.json');console.log(i.length)"` → `177`, and your report states that every one of them has a row
- [ ] Command: `grep -c '(https\|http)' lessons/ru/GLOSSARY.md` → `0`
- [ ] Check: the title table rows are in ascending id order, topic 01 first
- [ ] Check: no Russian title is a bare transliteration of an English word where a normal Russian term exists (state which ones you kept in Latin script and why)

### WP-5: Translate the exemplar entry

**Context:**
`lessons/01-cs-fundamentals/04-database-internals/` is the smallest honest entry: `index.md` is a
full lesson plus `examples.md`, two files. It is the style reference every later work package copies,
so it must be reviewed before any bulk translation starts.

**Task:**
Create the two mirrored files —
`lessons/ru/01-cs-fundamentals/04-database-internals/index.md` and
`lessons/ru/01-cs-fundamentals/04-database-internals/examples.md` — by translating the English
originals in full, using the headings and literals from WP-2 and the vocabulary and titles from WP-4.

**Files:**
- `lessons/ru/01-cs-fundamentals/04-database-internals/index.md` — CREATE — Russian translation of the English lesson
- `lessons/ru/01-cs-fundamentals/04-database-internals/examples.md` — CREATE — Russian translation of the English examples file

**Constraints:**
- DO: read the English `index.md` first, then its `examples.md`, then write the Russian files.
- DO: copy `type`, `tier`, `topic`, `aliases`, `prereqs`, `related` and `status: drafted` from the English frontmatter verbatim; translate only `title`.
- DO: keep the frontmatter key order, the six Russian headings in order, the fenced blocks with their language tags, and the `—` shapes in `Частые ошибки` and `Что читать дальше` bullets.
- DO: keep every backticked id byte-identical.
- DO: translate code comments and prose strings inside the fences; leave identifiers, keywords and the `text` diagrams' labels in a consistent mix of Russian labels and Latin identifiers.
- DO: keep the body inside the Russian full band (400–1100 words) and the examples file inside 100–500.
- DO: use `Готово, когда:` for the two `Done when:` lines.
- DO NOT: add a paragraph or a heading the English file does not have.
- DO NOT: reference a real URL, a database product page or a documentation link.
- DO NOT: promote the status — it stays `drafted`.

**Success:**
- [ ] Command: `node tools/validate-content.mjs --topic 01-cs-fundamentals --lang ru` → `1 present, 26 pending, 2 examples, 0 examples pending, 0 error(s)` — no error names either exemplar file, and without `--strict` an unwritten entry is not an error
- [ ] Command: `head -12 lessons/ru/01-cs-fundamentals/04-database-internals/index.md` → frontmatter with the 8 keys in order and a Russian `title`
- [ ] Command: `grep -n '^## ' lessons/ru/01-cs-fundamentals/04-database-internals/index.md` → exactly `## Что это такое`, `## Почему это важно`, `## Ключевые идеи`, `## Практика`, `## Частые ошибки`, `## Что читать дальше`
- [ ] Command: `grep -c 'Готово, когда:' lessons/ru/01-cs-fundamentals/04-database-internals/index.md` → `2`
- [ ] Command: `grep -n '^## \|^### ' lessons/ru/01-cs-fundamentals/04-database-internals/examples.md` → two `## Пример N — …` and two `### Решение`
- [ ] Command: `grep -n '^```' lessons/ru/01-cs-fundamentals/04-database-internals/examples.md` → every opening fence carries a language tag
- [ ] Command: `node tools/validate-content.mjs --write-index --lang ru` → exit 0, `lessons/ru/INDEX.md` created with 177 rows
- [ ] Check: every id in both Russian files matches the English file byte for byte

## Phase Verification

After all five work packages are complete, run:

```bash
node --check tools/validate-content.mjs
node tools/validate-content.mjs --strict --lang en
node tools/validate-content.mjs --lang ru
node tools/validate-content.mjs --lang all
node tools/validate-content.mjs --write-index --lang ru
find lessons/ru -name '*.md' | wc -l
```

- [ ] The English run is byte-identical to the pre-phase output: `177 present, 0 pending, 297 examples, 0 examples pending, 0 error(s)`, exit 0
- [ ] `--lang ru` reports 1 present, 176 pending, and no heading, band or title error for the exemplar
- [ ] `--lang all` prints both roots' summary lines
- [ ] `find lessons/ru -name '*.md' | wc -l` → `3` (the two exemplar files plus `GLOSSARY.md`)
- [ ] `lessons/AUTHORING.md` §13 and `lessons/ru/GLOSSARY.md` agree with the tables in Shared Context
- [ ] The exemplar is ready for the user to review before bulk translation starts — say so in your report
