# Phase 2: 01-cs-fundamentals

## Objective

Mirror `lessons/01-cs-fundamentals/` into `lessons/ru/01-cs-fundamentals/` — 108 files, the largest
single topic by file count after design-ux. This is the first bulk phase, so it sets the working
rhythm: one file per write call, validator per entry, count check per work package.

## Prerequisites

- Phase 1 complete, including the exemplar in `lessons/ru/01-cs-fundamentals/04-database-internals/`.
- `node tools/validate-content.mjs --strict --lang en` still exits 0.
- `lessons/ru/GLOSSARY.md` holds all 177 titles.

## Shared Context

**The mirror.** For each English directory listed below, create the same file names under the same
relative path inside `lessons/ru/`. The English directory's contents are the list of files to
create: `index.md`, each `NN-slug.md` child, and each `examples*.md`. Verify with a count before
declaring a work package done.

**The translation constraints — these apply to every file in this phase.**

- Copy `type`, `tier`, `topic`, `aliases`, `prereqs`, `related` and `status: drafted` from the English frontmatter verbatim. Translate only `title`, using the wording in `lessons/ru/GLOSSARY.md`.
- A child file carries exactly two keys, `title` (translated) then `prereqs` (copied).
- An examples file has no frontmatter at all.
- Use the Russian headings from `lessons/AUTHORING.md` §13, verbatim, in the same order as the English file. No synonyms, no extra headings.
- Keep every backticked id byte-identical to the English file — in `prereqs`, in `Предварительные требования`, in `Что в этом треке`, in `Входящие навыки` and in `Что читать дальше`.
- Translate the `**Title**` text in every bullet exactly as `GLOSSARY.md` gives it, including for child titles, which must stay consistent with the parent's terminology. V17 checks this.
- Translate code comments and prose strings inside fences; keep identifiers, keywords, command names, file names and fence language tags unchanged.
- `Done when:` becomes `Готово, когда:`; an empty `## Prerequisites` body reads `Нет.`; the Common-mistakes marker `; fix: ` becomes `; исправить: `.
- Keep the em dash (U+2014) with spaces around it in bullets and in example headings.
- Keep the Russian body inside the band: full 400–1100 words, landing 180–460, area 100–340, examples 100–500.
- No `https://` or `http://` anywhere, including inside a fence or a comment.
- Write one file per `write` tool call.
- Read the English file in full before translating it. Never translate from a summary.

**Command after every entry:**
`node tools/validate-content.mjs --topic 01-cs-fundamentals --lang ru`

## Work Packages

### WP-6: Mirror computer science, data structures and computer networks

**Context:**
`01-computer-science` is the topic's `area` entry — one `index.md` with the four area headings and a
list of the 6 skills it covers. `02-data-structures` and `03-computer-networks` are `medium` skills,
so each has `index.md`, two children and two child-level examples files.

**Task:**
Create the 11 Russian files for the three directories listed below.

**Files:**
| English directory | Files to create under `lessons/ru/` |
| --- | --- |
| `lessons/01-cs-fundamentals/01-computer-science` | 1 — `index.md` |
| `lessons/01-cs-fundamentals/02-data-structures` | 5 — `index.md`, `01-arrays-lists-and-hash-maps.md`, `02-trees-heaps-and-graphs.md`, `examples.01-arrays-lists-and-hash-maps.md`, `examples.02-trees-heaps-and-graphs.md` |
| `lessons/01-cs-fundamentals/03-computer-networks` | 5 — `index.md`, `01-packets-tcp-ip-and-ports.md`, `02-dns-and-the-path-of-a-request.md`, `examples.01-packets-tcp-ip-and-ports.md`, `examples.02-dns-and-the-path-of-a-request.md` |

**Constraints:**
- DO: follow every constraint in Shared Context.
- DO: keep the area page's `Входящие навыки` bullets' ids exactly as the English file has them.
- DO: keep `text` diagrams as diagrams — translate the labels, keep the column alignment readable.
- DO NOT: create `examples.md` for a `medium` index — those indexes are landing shapes and have no `## Practice`.
- DO NOT: edit anything under `lessons/01-cs-fundamentals/`.

**Success:**
- [ ] Command: `node tools/validate-content.mjs --topic 01-cs-fundamentals --lang ru` → no error naming any of the 11 files
- [ ] Command: `find lessons/ru/01-cs-fundamentals/02-data-structures -name '*.md' | wc -l` → `5`
- [ ] Command: `ls lessons/ru/01-cs-fundamentals/01-computer-science` → `index.md` only
- [ ] Command: `grep -n '^## ' lessons/ru/01-cs-fundamentals/01-computer-science/index.md` → the four Russian area headings in order

### WP-7: Mirror concurrency, regex, pseudocode and clean code

**Context:**
`05-concurrency-async-programming` is `medium`; `06-regular-expressions-regex` and `07-pseudocode`
are `small` skills, so their `index.md` is a full lesson and also gets an `examples.md`;
`08-clean-code` is `medium`.

**Task:**
Create the 14 Russian files for the four directories listed below.

**Files:**
| English directory | Files to create under `lessons/ru/` |
| --- | --- |
| `lessons/01-cs-fundamentals/05-concurrency-async-programming` | 5 — `index.md`, `01-threads-locks-and-races.md`, `02-async-promises-and-event-loops.md`, plus the two matching `examples.*` files |
| `lessons/01-cs-fundamentals/06-regular-expressions-regex` | 2 — `index.md`, `examples.md` |
| `lessons/01-cs-fundamentals/07-pseudocode` | 2 — `index.md`, `examples.md` |
| `lessons/01-cs-fundamentals/08-clean-code` | 5 — `index.md`, `01-names-and-small-functions.md`, `02-structure-and-error-handling.md`, plus the two matching `examples.*` files |

**Constraints:**
- DO: follow every constraint in Shared Context.
- DO: keep regex patterns byte-identical; translate only the prose around them.
- DO: keep identifiers, keyword names and code comments' intent — translate the comment text, not the code.
- DO NOT: create `examples.md` for a `medium` index.
- DO NOT: edit anything under `lessons/01-cs-fundamentals/`.

**Success:**
- [ ] Command: `node tools/validate-content.mjs --topic 01-cs-fundamentals --lang ru` → no error naming any of the 14 files
- [ ] Command: `find lessons/ru/01-cs-fundamentals/06-regular-expressions-regex -name '*.md' | wc -l` → `2`
- [ ] Command: `grep -c 'Готово, когда:' lessons/ru/01-cs-fundamentals/07-pseudocode/index.md` → `2`

### WP-8: Mirror SOLID, unit testing and debugging

**Context:**
`09-solid-principles` is a `small` skill (`index.md` + `examples.md`); `10-unit-testing` and
`11-debugging` are `medium` skills with two children each.

**Task:**
Create the 12 Russian files for the three directories listed below.

**Files:**
| English directory | Files to create under `lessons/ru/` |
| --- | --- |
| `lessons/01-cs-fundamentals/09-solid-principles` | 2 — `index.md`, `examples.md` |
| `lessons/01-cs-fundamentals/10-unit-testing` | 5 — `index.md`, `01-what-makes-a-good-unit-test.md`, `02-test-doubles-and-test-data.md`, plus the two matching `examples.*` files |
| `lessons/01-cs-fundamentals/11-debugging` | 5 — `index.md`, `01-reproduce-before-you-fix.md`, `02-isolate-and-prove-the-cause.md`, plus the two matching `examples.*` files |

**Constraints:**
- DO: follow every constraint in Shared Context.
- DO: keep test framework names, assertion names and command lines untouched.
- DO: keep the `; исправить: ` marker in every `Частые ошибки` bullet — the validator counts those bullets structurally.
- DO NOT: create `examples.md` for a `medium` index.
- DO NOT: edit anything under `lessons/01-cs-fundamentals/`.

**Success:**
- [ ] Command: `node tools/validate-content.mjs --topic 01-cs-fundamentals --lang ru` → no error naming any of the 12 files
- [ ] Command: `grep -c 'исправить:' lessons/ru/01-cs-fundamentals/09-solid-principles/index.md` → 3 to 5
- [ ] Command: `find lessons/ru/01-cs-fundamentals/10-unit-testing lessons/ru/01-cs-fundamentals/11-debugging -name '*.md' | wc -l` → `10`

### WP-9: Mirror git, unix shell, algorithms and operating systems

**Context:**
All four entries are `medium` skills with two children each, so this WP creates four `index.md`
landing pages, eight child lessons and eight child-level examples files.

**Task:**
Create the 20 Russian files for the four directories listed below.

**Files:**
| English directory | Files to create under `lessons/ru/` | Files |
| --- | --- | --- |
| `lessons/01-cs-fundamentals/12-git` | `index.md`, `01-the-object-model-and-history.md`, `02-the-daily-workflow.md`, two matching `examples.*` | 5 |
| `lessons/01-cs-fundamentals/13-unix-shell` | `index.md`, `01-pipelines-and-filters.md`, `02-files-permissions-and-environment.md`, two matching `examples.*` | 5 |
| `lessons/01-cs-fundamentals/14-algorithms-big-o` | `index.md`, `01-how-cost-grows-big-o.md`, `02-sorting-searching-and-traversal.md`, two matching `examples.*` | 5 |
| `lessons/01-cs-fundamentals/15-operating-systems` | `index.md`, `01-processes-threads-and-scheduling.md`, `02-memory-and-filesystems.md`, two matching `examples.*` | 5 |

**Constraints:**
- DO: follow every constraint in Shared Context.
- DO: keep git and shell commands byte-identical; translate their comments and the prose describing the output.
- DO: keep the `Что в этом треке` numbered list shape (`1. **Title** (\`id\`) — описание`) with the ids unchanged.
- DO: keep big-O notation and complexity expressions untouched.
- DO NOT: create `examples.md` for any of these four indexes.
- DO NOT: edit anything under `lessons/01-cs-fundamentals/`.

**Success:**
- [ ] Command: `node tools/validate-content.mjs --topic 01-cs-fundamentals --lang ru` → no error naming any of the 20 files
- [ ] Command: `find lessons/ru/01-cs-fundamentals/12-git lessons/ru/01-cs-fundamentals/13-unix-shell lessons/ru/01-cs-fundamentals/14-algorithms-big-o lessons/ru/01-cs-fundamentals/15-operating-systems -name '*.md' | wc -l` → `20`
- [ ] Command: `grep -n '^[0-9]\.' lessons/ru/01-cs-fundamentals/12-git/index.md` → 2 numbered lines with unchanged ids

### WP-10: Mirror code reusability, code review, design patterns, refactoring and TDD

**Context:**
`16-code-reusability` is a `small` skill; the other four are `medium` skills with two children each.

**Task:**
Create the 22 Russian files for the five directories listed below.

**Files:**
| English directory | Files to create under `lessons/ru/` | Files |
| --- | --- | --- |
| `lessons/01-cs-fundamentals/16-code-reusability` | `index.md`, `examples.md` | 2 |
| `lessons/01-cs-fundamentals/17-code-review` | `index.md`, `01-reading-a-diff-for-correctness.md`, `02-reviewing-for-clarity-and-tone.md`, two matching `examples.*` | 5 |
| `lessons/01-cs-fundamentals/18-design-patterns` | `index.md`, `01-why-patterns-are-named.md`, `02-the-patterns-that-earn-their-keep.md`, two matching `examples.*` | 5 |
| `lessons/01-cs-fundamentals/19-refactoring` | `index.md`, `01-safe-refactoring-steps.md`, `02-refactorings-you-will-actually-use.md`, two matching `examples.*` | 5 |
| `lessons/01-cs-fundamentals/20-test-driven-development-tdd` | `index.md`, `01-the-red-green-refactor-loop.md`, `02-where-tdd-does-and-does-not-pay-off.md`, two matching `examples.*` | 5 |

**Constraints:**
- DO: follow every constraint in Shared Context.
- DO: keep design pattern names in their established Russian or Latin form consistently — decide once here and note the choice in your report so design-ux and backend-data follow it.
- DO: keep `diff` fences' code and markers untouched; translate the surrounding prose.
- DO NOT: create `examples.md` for the four `medium` indexes.
- DO NOT: edit anything under `lessons/01-cs-fundamentals/`.

**Success:**
- [ ] Command: `node tools/validate-content.mjs --topic 01-cs-fundamentals --lang ru` → no error naming any of the 22 files
- [ ] Command: `find lessons/ru/01-cs-fundamentals/16-code-reusability lessons/ru/01-cs-fundamentals/17-code-review lessons/ru/01-cs-fundamentals/18-design-patterns lessons/ru/01-cs-fundamentals/19-refactoring lessons/ru/01-cs-fundamentals/20-test-driven-development-tdd -name '*.md' | wc -l` → `22`

### WP-11: Mirror integration testing, branching, GitHub, CLI, architecture, E2E testing and Playwright

**Context:**
`22-git-branching-strategies`, `23-github`, `24-command-line-interface` and `27-playwright` are
`small` skills; `21-integration-testing` and `26-end-to-end-testing` are `medium`;
`25-software-architecture` is the topic's only `large` skill, with four children.

**Task:**
Create the 27 Russian files for the seven directories listed below.

**Files:**
| English directory | Files to create under `lessons/ru/` | Files |
| --- | --- | --- |
| `lessons/01-cs-fundamentals/21-integration-testing` | `index.md`, `01-testing-across-a-real-boundary.md`, `02-fixtures-databases-and-cleanup.md`, two matching `examples.*` | 5 |
| `lessons/01-cs-fundamentals/22-git-branching-strategies` | `index.md`, `examples.md` | 2 |
| `lessons/01-cs-fundamentals/23-github` | `index.md`, `examples.md` | 2 |
| `lessons/01-cs-fundamentals/24-command-line-interface` | `index.md`, `examples.md` | 2 |
| `lessons/01-cs-fundamentals/25-software-architecture` | `index.md`, four children, four matching `examples.*` | 9 |
| `lessons/01-cs-fundamentals/26-end-to-end-testing` | `index.md`, `01-driving-the-system-like-a-user.md`, `02-making-end-to-end-tests-trustworthy.md`, two matching `examples.*` | 5 |
| `lessons/01-cs-fundamentals/27-playwright` | `index.md`, `examples.md` | 2 |

**Constraints:**
- DO: follow every constraint in Shared Context.
- DO: for `25-software-architecture` keep the four children's titles consistent with the parent's terminology and the glossary.
- DO: keep tool names (GitHub, Playwright, Docker-style product names) in Latin script.
- DO NOT: create `examples.md` for the `medium` or `large` indexes.
- DO NOT: edit anything under `lessons/01-cs-fundamentals/`.

**Success:**
- [ ] Command: `node tools/validate-content.mjs --topic 01-cs-fundamentals --lang ru` → `27 present`, `45 examples`, `0 error(s)`
- [ ] Command: `find lessons/ru/01-cs-fundamentals -name '*.md' | wc -l` → `108`
- [ ] Command: `find lessons/ru/01-cs-fundamentals -name 'examples*.md' | wc -l` → `45`
- [ ] Command: `find lessons/ru/01-cs-fundamentals -name 'index.md' | wc -l` → `27`
- [ ] Command: `grep -rn '(https\|http)' lessons/ru/01-cs-fundamentals` → 0 matches

## Phase Verification

After all work packages are complete, run:

```bash
node tools/validate-content.mjs --topic 01-cs-fundamentals --lang ru
node tools/validate-content.mjs --lang ru
node tools/validate-content.mjs --strict --lang en
find lessons/ru/01-cs-fundamentals -name '*.md' | wc -l
find lessons/01-cs-fundamentals -name '*.md' | wc -l
grep -rn '(https\|http)' lessons/ru/01-cs-fundamentals
```

- [ ] The topic run reports `27 present`, `45 examples`, no pending within the topic and `0 error(s)`
- [ ] The Russian count equals the English count: `108` and `108`
- [ ] The English `--strict` run is still `177 present, 0 pending, 297 examples, 0 examples pending, 0 error(s)`
- [ ] The URL grep reports nothing
- [ ] Every Russian `index.md` has the 8 frontmatter keys in English order with a Russian `title`
