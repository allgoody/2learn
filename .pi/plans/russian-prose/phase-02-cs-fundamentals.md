# Phase 2: 01-cs-fundamentals

## Objective

Recast the Russian files of `lessons/ru/01-cs-fundamentals/` —
108 files in 10 work packages. This phase covers 01-cs-fundamentals:
the largest shape mix in the corpus and the topic the Plan B exemplar came from.

## Prerequisites

- Phase 1 complete, and the user has approved the calibration voice. Do not start this phase without
  that approval.
- `node tools/check-ru-style.mjs --diff` exits 0 over the whole corpus.
- `node tools/validate-content.mjs --strict --lang ru` reports
  `177 present, 0 pending, 297 examples, 0 examples pending, 0 error(s)` and exits 0.
- `lessons/AUTHORING.md` §14 exists and its target table matches `TARGETS` in
  `tools/check-ru-style.mjs`.
- No Russian file under `lessons/ru/01-cs-fundamentals` has been edited since the baseline commit,
  except the three Phase 1 calibration files in this topic (`01-computer-science/index.md`,
  `04-database-internals/index.md`, `04-database-internals/examples.md`). Those three are the approved
  voice of Phase 1: verify them, never rewrite them.

## Shared Context

**The contract is `_index.md` → Conventions.** Read it before any work package. It has two
halves: nine *frozen* things `--diff` compares against the baseline commit, and eleven *prose rules*
(R1–R11) describing what must change. `lessons/AUTHORING.md` §14 is the durable copy of the same
contract, written in Phase 1.

**What "the files of a work package" means.** This pass modifies files that already exist; it creates
none. The file list of every work package is therefore *the contents of the entry directories named
in it*, and the **count in the work package title is the contract** — verify it with the `ls` check in
the Success block before and after your work. Every listed file has an English twin at the same
relative path under `lessons/`; that twin is read-only.

**The recast procedure, per file.**

1. Read the English twin at `lessons/<same relative path>` in full. It is the record of *what is
   true* — numbers, names, claims, conditions — and nothing else. Then read the Russian file.
2. Write the Russian prose again as Russian. Discard the English sentence plan: merge, split,
   reorder (R1, R2, R3). Restore the discourse layer (R6). Unpick the copulas (R4) and the participle
   clauses (R5). Remove every blacklisted idiom (R8).
3. Keep every fact identical (R9) and the register neutral and technical (R10).
4. Write the file with one `write` call, then run the gate and the validator before moving on.

**Shape-specific reminders.**

- A **full** lesson is 400–1100 words and has six headings; it is the shape most at risk of becoming
  `X — это Y` chains, and it has the most room to merge and split sentences.
- A **landing** page (medium and large tiers) is 180–460 words and has five headings; it has the
  thinnest floor headroom in the corpus (the tightest file sits at 202 against a floor of 180), so
  do not merge its prose below 190 words.
- An **area** page is 100–340 words and has four headings; it keeps the English four-heading shape,
  and `Что это такое` does not appear in it.
- An **examples** file has no frontmatter at all. Its `## Пример N — …` headings, its `### Решение`
  lines, its fences and its fence language tags are frozen; what changes is the brief, the
  explanation and the closing paragraph — and a `text` fence that carries observation notes is the
  most word-dense prose in the corpus, so keep the file inside 100–500 words.

**Command names**, from the repo root: `node tools/check-ru-style.mjs --diff --topic <dir>` (structural
invariants), `node tools/check-ru-style.mjs --topic <dir>` (marker report),
`node tools/validate-content.mjs --topic <dir> --lang ru` (the corpus validator — the `--lang ru` is
not optional; the default is `en` and reports a green line that says nothing about the Russian
files).

**Transient failures are normal.** During a fan-out another writer may be mid-file, so the gate can
name a file you did not touch. Verify your own files, then re-run the topic command once all writers
have stopped.

## Work Packages

### WP-4: Recast 01-computer-science … 03-computer-networks

**Context:**
The 3 entry directories below hold 11 files under
`lessons/ru/01-cs-fundamentals/`. Every one of them exists and has an English twin at the same relative path
under `lessons/01-cs-fundamentals/`. The shapes present are: area; landing + 2 full + 2 examples.

**Task:**
Recast the prose of every `.md` file in the entry directories below, in place, so each file reads as
Russian written by a Russian technical writer and satisfies rules R1–R11 in `_index.md` →
Conventions. The examples files keep their frozen headings, `### Решение` lines, fences and fence tags.

**Files:**

| Entry directory | Files | Shapes |
| --- | --- | --- |
| `01-computer-science` | 1 | area — the Phase 1 calibration exemplar; verify, do not rewrite |
| `02-data-structures` | 5 | landing + 2 full + 2 examples |
| `03-computer-networks` | 5 | landing + 2 full + 2 examples |

All MODIFY. 11 files in total. No file is created, deleted or renamed.

**Constraints:**
- DO: read each file's English twin in full before recasting it, and use it only as the record of what is true
- DO: make the Russian sentence count differ from the English twin's, and the ratio of the two median sentence lengths at least 0.95
- DO: keep at most 3 `— это ` per file and rewrite every English `-ing` clause as a clause or a separate sentence
- DO: keep every number, id, backticked span, fence, fence tag and heading byte-identical — `--diff` fails on any of them
- DO: write one file per `write` call and run the two commands below after each file
- DO: keep every landing page at 190 words or more (its floor is 180)
- DO: keep the area page's four Russian headings in order; it has no `Что это такое`
- DO NOT: add, drop, soften or strengthen a fact, a number or a claim
- DO NOT: change `status: drafted`, and do not promote anything to `reviewed`
- DO NOT: write anything under `lessons/` outside `lessons/ru/`, or touch `lessons/ru/INDEX.md`
- DO NOT: introduce a line beginning with `## ` inside a fence

**Success:**
- [ ] Command: `node tools/check-ru-style.mjs --diff --topic 01-cs-fundamentals` → `0 structural differences`, exit 0
- [ ] Command: `node tools/check-ru-style.mjs --topic 01-cs-fundamentals --strict` → no per-file warning naming any of the 11 files
- [ ] Command: `node tools/validate-content.mjs --topic 01-cs-fundamentals --lang ru` → `0 error(s)`
- [ ] Command: `ls lessons/ru/01-cs-fundamentals/01-computer-science/*.md | wc -l && ls lessons/ru/01-cs-fundamentals/02-data-structures/*.md | wc -l && ls lessons/ru/01-cs-fundamentals/03-computer-networks/*.md | wc -l` → 1, 5, 5 (one count per entry directory, in the order listed)
- [ ] Manual: the 11 files' `git diff` shows prose changes only — no frontmatter, heading, fence or id hunk

### WP-5: Recast 04-database-internals … 07-pseudocode

**Context:**
The 4 entry directories below hold 11 files under
`lessons/ru/01-cs-fundamentals/`. Every one of them exists and has an English twin at the same relative path
under `lessons/01-cs-fundamentals/`. The shapes present are: full + 1 examples; landing + 2 full + 2 examples.

**Task:**
Recast the prose of every `.md` file in the entry directories below, in place, so each file reads as
Russian written by a Russian technical writer and satisfies rules R1–R11 in `_index.md` →
Conventions. The examples files keep their frozen headings, `### Решение` lines, fences and fence tags.

**Files:**

| Entry directory | Files | Shapes |
| --- | --- | --- |
| `04-database-internals` | 2 | full + 1 examples — both Phase 1 calibration exemplars; verify, do not rewrite |
| `05-concurrency-async-programming` | 5 | landing + 2 full + 2 examples |
| `06-regular-expressions-regex` | 2 | full + 1 examples |
| `07-pseudocode` | 2 | full + 1 examples |

All MODIFY. 11 files in total. No file is created, deleted or renamed.

**Constraints:**
- DO: read each file's English twin in full before recasting it, and use it only as the record of what is true
- DO: make the Russian sentence count differ from the English twin's, and the ratio of the two median sentence lengths at least 0.95
- DO: keep at most 3 `— это ` per file and rewrite every English `-ing` clause as a clause or a separate sentence
- DO: keep every number, id, backticked span, fence, fence tag and heading byte-identical — `--diff` fails on any of them
- DO: write one file per `write` call and run the two commands below after each file
- DO: keep every landing page at 190 words or more (its floor is 180)
- DO NOT: add, drop, soften or strengthen a fact, a number or a claim
- DO NOT: change `status: drafted`, and do not promote anything to `reviewed`
- DO NOT: write anything under `lessons/` outside `lessons/ru/`, or touch `lessons/ru/INDEX.md`
- DO NOT: introduce a line beginning with `## ` inside a fence

**Success:**
- [ ] Command: `node tools/check-ru-style.mjs --diff --topic 01-cs-fundamentals` → `0 structural differences`, exit 0
- [ ] Command: `node tools/check-ru-style.mjs --topic 01-cs-fundamentals --strict` → no per-file warning naming any of the 11 files
- [ ] Command: `node tools/validate-content.mjs --topic 01-cs-fundamentals --lang ru` → `0 error(s)`
- [ ] Command: `ls lessons/ru/01-cs-fundamentals/04-database-internals/*.md | wc -l && ls lessons/ru/01-cs-fundamentals/05-concurrency-async-programming/*.md | wc -l && ls lessons/ru/01-cs-fundamentals/06-regular-expressions-regex/*.md | wc -l && ls lessons/ru/01-cs-fundamentals/07-pseudocode/*.md | wc -l` → 2, 5, 2, 2 (one count per entry directory, in the order listed)
- [ ] Manual: the 11 files' `git diff` shows prose changes only — no frontmatter, heading, fence or id hunk

### WP-6: Recast 08-clean-code … 10-unit-testing

**Context:**
The 3 entry directories below hold 12 files under
`lessons/ru/01-cs-fundamentals/`. Every one of them exists and has an English twin at the same relative path
under `lessons/01-cs-fundamentals/`. The shapes present are: landing + 2 full + 2 examples; full + 1 examples.

**Task:**
Recast the prose of every `.md` file in the entry directories below, in place, so each file reads as
Russian written by a Russian technical writer and satisfies rules R1–R11 in `_index.md` →
Conventions. The examples files keep their frozen headings, `### Решение` lines, fences and fence tags.

**Files:**

| Entry directory | Files | Shapes |
| --- | --- | --- |
| `08-clean-code` | 5 | landing + 2 full + 2 examples |
| `09-solid-principles` | 2 | full + 1 examples |
| `10-unit-testing` | 5 | landing + 2 full + 2 examples |

All MODIFY. 12 files in total. No file is created, deleted or renamed.

**Constraints:**
- DO: read each file's English twin in full before recasting it, and use it only as the record of what is true
- DO: make the Russian sentence count differ from the English twin's, and the ratio of the two median sentence lengths at least 0.95
- DO: keep at most 3 `— это ` per file and rewrite every English `-ing` clause as a clause or a separate sentence
- DO: keep every number, id, backticked span, fence, fence tag and heading byte-identical — `--diff` fails on any of them
- DO: write one file per `write` call and run the two commands below after each file
- DO: keep every landing page at 190 words or more (its floor is 180)
- DO NOT: add, drop, soften or strengthen a fact, a number or a claim
- DO NOT: change `status: drafted`, and do not promote anything to `reviewed`
- DO NOT: write anything under `lessons/` outside `lessons/ru/`, or touch `lessons/ru/INDEX.md`
- DO NOT: introduce a line beginning with `## ` inside a fence

**Success:**
- [ ] Command: `node tools/check-ru-style.mjs --diff --topic 01-cs-fundamentals` → `0 structural differences`, exit 0
- [ ] Command: `node tools/check-ru-style.mjs --topic 01-cs-fundamentals --strict` → no per-file warning naming any of the 12 files
- [ ] Command: `node tools/validate-content.mjs --topic 01-cs-fundamentals --lang ru` → `0 error(s)`
- [ ] Command: `ls lessons/ru/01-cs-fundamentals/08-clean-code/*.md | wc -l && ls lessons/ru/01-cs-fundamentals/09-solid-principles/*.md | wc -l && ls lessons/ru/01-cs-fundamentals/10-unit-testing/*.md | wc -l` → 5, 2, 5 (one count per entry directory, in the order listed)
- [ ] Manual: the 12 files' `git diff` shows prose changes only — no frontmatter, heading, fence or id hunk

### WP-7: Recast 11-debugging … 12-git

**Context:**
The 2 entry directories below hold 10 files under
`lessons/ru/01-cs-fundamentals/`. Every one of them exists and has an English twin at the same relative path
under `lessons/01-cs-fundamentals/`. The shapes present are: landing + 2 full + 2 examples.

**Task:**
Recast the prose of every `.md` file in the entry directories below, in place, so each file reads as
Russian written by a Russian technical writer and satisfies rules R1–R11 in `_index.md` →
Conventions. The examples files keep their frozen headings, `### Решение` lines, fences and fence tags.

**Files:**

| Entry directory | Files | Shapes |
| --- | --- | --- |
| `11-debugging` | 5 | landing + 2 full + 2 examples |
| `12-git` | 5 | landing + 2 full + 2 examples |

All MODIFY. 10 files in total. No file is created, deleted or renamed.

**Constraints:**
- DO: read each file's English twin in full before recasting it, and use it only as the record of what is true
- DO: make the Russian sentence count differ from the English twin's, and the ratio of the two median sentence lengths at least 0.95
- DO: keep at most 3 `— это ` per file and rewrite every English `-ing` clause as a clause or a separate sentence
- DO: keep every number, id, backticked span, fence, fence tag and heading byte-identical — `--diff` fails on any of them
- DO: write one file per `write` call and run the two commands below after each file
- DO: keep every landing page at 190 words or more (its floor is 180)
- DO NOT: add, drop, soften or strengthen a fact, a number or a claim
- DO NOT: change `status: drafted`, and do not promote anything to `reviewed`
- DO NOT: write anything under `lessons/` outside `lessons/ru/`, or touch `lessons/ru/INDEX.md`
- DO NOT: introduce a line beginning with `## ` inside a fence

**Success:**
- [ ] Command: `node tools/check-ru-style.mjs --diff --topic 01-cs-fundamentals` → `0 structural differences`, exit 0
- [ ] Command: `node tools/check-ru-style.mjs --topic 01-cs-fundamentals --strict` → no per-file warning naming any of the 10 files
- [ ] Command: `node tools/validate-content.mjs --topic 01-cs-fundamentals --lang ru` → `0 error(s)`
- [ ] Command: `ls lessons/ru/01-cs-fundamentals/11-debugging/*.md | wc -l && ls lessons/ru/01-cs-fundamentals/12-git/*.md | wc -l` → 5, 5 (one count per entry directory, in the order listed)
- [ ] Manual: the 10 files' `git diff` shows prose changes only — no frontmatter, heading, fence or id hunk

### WP-8: Recast 13-unix-shell … 14-algorithms-big-o

**Context:**
The 2 entry directories below hold 10 files under
`lessons/ru/01-cs-fundamentals/`. Every one of them exists and has an English twin at the same relative path
under `lessons/01-cs-fundamentals/`. The shapes present are: landing + 2 full + 2 examples.

**Task:**
Recast the prose of every `.md` file in the entry directories below, in place, so each file reads as
Russian written by a Russian technical writer and satisfies rules R1–R11 in `_index.md` →
Conventions. The examples files keep their frozen headings, `### Решение` lines, fences and fence tags.

**Files:**

| Entry directory | Files | Shapes |
| --- | --- | --- |
| `13-unix-shell` | 5 | landing + 2 full + 2 examples |
| `14-algorithms-big-o` | 5 | landing + 2 full + 2 examples |

All MODIFY. 10 files in total. No file is created, deleted or renamed.

**Constraints:**
- DO: read each file's English twin in full before recasting it, and use it only as the record of what is true
- DO: make the Russian sentence count differ from the English twin's, and the ratio of the two median sentence lengths at least 0.95
- DO: keep at most 3 `— это ` per file and rewrite every English `-ing` clause as a clause or a separate sentence
- DO: keep every number, id, backticked span, fence, fence tag and heading byte-identical — `--diff` fails on any of them
- DO: write one file per `write` call and run the two commands below after each file
- DO: keep every landing page at 190 words or more (its floor is 180)
- DO NOT: add, drop, soften or strengthen a fact, a number or a claim
- DO NOT: change `status: drafted`, and do not promote anything to `reviewed`
- DO NOT: write anything under `lessons/` outside `lessons/ru/`, or touch `lessons/ru/INDEX.md`
- DO NOT: introduce a line beginning with `## ` inside a fence

**Success:**
- [ ] Command: `node tools/check-ru-style.mjs --diff --topic 01-cs-fundamentals` → `0 structural differences`, exit 0
- [ ] Command: `node tools/check-ru-style.mjs --topic 01-cs-fundamentals --strict` → no per-file warning naming any of the 10 files
- [ ] Command: `node tools/validate-content.mjs --topic 01-cs-fundamentals --lang ru` → `0 error(s)`
- [ ] Command: `ls lessons/ru/01-cs-fundamentals/13-unix-shell/*.md | wc -l && ls lessons/ru/01-cs-fundamentals/14-algorithms-big-o/*.md | wc -l` → 5, 5 (one count per entry directory, in the order listed)
- [ ] Manual: the 10 files' `git diff` shows prose changes only — no frontmatter, heading, fence or id hunk

### WP-9: Recast 15-operating-systems … 17-code-review

**Context:**
The 3 entry directories below hold 12 files under
`lessons/ru/01-cs-fundamentals/`. Every one of them exists and has an English twin at the same relative path
under `lessons/01-cs-fundamentals/`. The shapes present are: landing + 2 full + 2 examples; full + 1 examples.

**Task:**
Recast the prose of every `.md` file in the entry directories below, in place, so each file reads as
Russian written by a Russian technical writer and satisfies rules R1–R11 in `_index.md` →
Conventions. The examples files keep their frozen headings, `### Решение` lines, fences and fence tags.

**Files:**

| Entry directory | Files | Shapes |
| --- | --- | --- |
| `15-operating-systems` | 5 | landing + 2 full + 2 examples |
| `16-code-reusability` | 2 | full + 1 examples |
| `17-code-review` | 5 | landing + 2 full + 2 examples |

All MODIFY. 12 files in total. No file is created, deleted or renamed.

**Constraints:**
- DO: read each file's English twin in full before recasting it, and use it only as the record of what is true
- DO: make the Russian sentence count differ from the English twin's, and the ratio of the two median sentence lengths at least 0.95
- DO: keep at most 3 `— это ` per file and rewrite every English `-ing` clause as a clause or a separate sentence
- DO: keep every number, id, backticked span, fence, fence tag and heading byte-identical — `--diff` fails on any of them
- DO: write one file per `write` call and run the two commands below after each file
- DO: keep every landing page at 190 words or more (its floor is 180)
- DO NOT: add, drop, soften or strengthen a fact, a number or a claim
- DO NOT: change `status: drafted`, and do not promote anything to `reviewed`
- DO NOT: write anything under `lessons/` outside `lessons/ru/`, or touch `lessons/ru/INDEX.md`
- DO NOT: introduce a line beginning with `## ` inside a fence

**Success:**
- [ ] Command: `node tools/check-ru-style.mjs --diff --topic 01-cs-fundamentals` → `0 structural differences`, exit 0
- [ ] Command: `node tools/check-ru-style.mjs --topic 01-cs-fundamentals --strict` → no per-file warning naming any of the 12 files
- [ ] Command: `node tools/validate-content.mjs --topic 01-cs-fundamentals --lang ru` → `0 error(s)`
- [ ] Command: `ls lessons/ru/01-cs-fundamentals/15-operating-systems/*.md | wc -l && ls lessons/ru/01-cs-fundamentals/16-code-reusability/*.md | wc -l && ls lessons/ru/01-cs-fundamentals/17-code-review/*.md | wc -l` → 5, 2, 5 (one count per entry directory, in the order listed)
- [ ] Manual: the 12 files' `git diff` shows prose changes only — no frontmatter, heading, fence or id hunk

### WP-10: Recast 18-design-patterns … 19-refactoring

**Context:**
The 2 entry directories below hold 10 files under
`lessons/ru/01-cs-fundamentals/`. Every one of them exists and has an English twin at the same relative path
under `lessons/01-cs-fundamentals/`. The shapes present are: landing + 2 full + 2 examples.

**Task:**
Recast the prose of every `.md` file in the entry directories below, in place, so each file reads as
Russian written by a Russian technical writer and satisfies rules R1–R11 in `_index.md` →
Conventions. The examples files keep their frozen headings, `### Решение` lines, fences and fence tags.

**Files:**

| Entry directory | Files | Shapes |
| --- | --- | --- |
| `18-design-patterns` | 5 | landing + 2 full + 2 examples |
| `19-refactoring` | 5 | landing + 2 full + 2 examples |

All MODIFY. 10 files in total. No file is created, deleted or renamed.

**Constraints:**
- DO: read each file's English twin in full before recasting it, and use it only as the record of what is true
- DO: make the Russian sentence count differ from the English twin's, and the ratio of the two median sentence lengths at least 0.95
- DO: keep at most 3 `— это ` per file and rewrite every English `-ing` clause as a clause or a separate sentence
- DO: keep every number, id, backticked span, fence, fence tag and heading byte-identical — `--diff` fails on any of them
- DO: write one file per `write` call and run the two commands below after each file
- DO: keep every landing page at 190 words or more (its floor is 180)
- DO NOT: add, drop, soften or strengthen a fact, a number or a claim
- DO NOT: change `status: drafted`, and do not promote anything to `reviewed`
- DO NOT: write anything under `lessons/` outside `lessons/ru/`, or touch `lessons/ru/INDEX.md`
- DO NOT: introduce a line beginning with `## ` inside a fence

**Success:**
- [ ] Command: `node tools/check-ru-style.mjs --diff --topic 01-cs-fundamentals` → `0 structural differences`, exit 0
- [ ] Command: `node tools/check-ru-style.mjs --topic 01-cs-fundamentals --strict` → no per-file warning naming any of the 10 files
- [ ] Command: `node tools/validate-content.mjs --topic 01-cs-fundamentals --lang ru` → `0 error(s)`
- [ ] Command: `ls lessons/ru/01-cs-fundamentals/18-design-patterns/*.md | wc -l && ls lessons/ru/01-cs-fundamentals/19-refactoring/*.md | wc -l` → 5, 5 (one count per entry directory, in the order listed)
- [ ] Manual: the 10 files' `git diff` shows prose changes only — no frontmatter, heading, fence or id hunk

### WP-11: Recast 20-test-driven-development-tdd … 22-git-branching-strategies

**Context:**
The 3 entry directories below hold 12 files under
`lessons/ru/01-cs-fundamentals/`. Every one of them exists and has an English twin at the same relative path
under `lessons/01-cs-fundamentals/`. The shapes present are: landing + 2 full + 2 examples; full + 1 examples.

**Task:**
Recast the prose of every `.md` file in the entry directories below, in place, so each file reads as
Russian written by a Russian technical writer and satisfies rules R1–R11 in `_index.md` →
Conventions. The examples files keep their frozen headings, `### Решение` lines, fences and fence tags.

**Files:**

| Entry directory | Files | Shapes |
| --- | --- | --- |
| `20-test-driven-development-tdd` | 5 | landing + 2 full + 2 examples |
| `21-integration-testing` | 5 | landing + 2 full + 2 examples |
| `22-git-branching-strategies` | 2 | full + 1 examples |

All MODIFY. 12 files in total. No file is created, deleted or renamed.

**Constraints:**
- DO: read each file's English twin in full before recasting it, and use it only as the record of what is true
- DO: make the Russian sentence count differ from the English twin's, and the ratio of the two median sentence lengths at least 0.95
- DO: keep at most 3 `— это ` per file and rewrite every English `-ing` clause as a clause or a separate sentence
- DO: keep every number, id, backticked span, fence, fence tag and heading byte-identical — `--diff` fails on any of them
- DO: write one file per `write` call and run the two commands below after each file
- DO: keep every landing page at 190 words or more (its floor is 180)
- DO NOT: add, drop, soften or strengthen a fact, a number or a claim
- DO NOT: change `status: drafted`, and do not promote anything to `reviewed`
- DO NOT: write anything under `lessons/` outside `lessons/ru/`, or touch `lessons/ru/INDEX.md`
- DO NOT: introduce a line beginning with `## ` inside a fence

**Success:**
- [ ] Command: `node tools/check-ru-style.mjs --diff --topic 01-cs-fundamentals` → `0 structural differences`, exit 0
- [ ] Command: `node tools/check-ru-style.mjs --topic 01-cs-fundamentals --strict` → no per-file warning naming any of the 12 files
- [ ] Command: `node tools/validate-content.mjs --topic 01-cs-fundamentals --lang ru` → `0 error(s)`
- [ ] Command: `ls lessons/ru/01-cs-fundamentals/20-test-driven-development-tdd/*.md | wc -l && ls lessons/ru/01-cs-fundamentals/21-integration-testing/*.md | wc -l && ls lessons/ru/01-cs-fundamentals/22-git-branching-strategies/*.md | wc -l` → 5, 5, 2 (one count per entry directory, in the order listed)
- [ ] Manual: the 12 files' `git diff` shows prose changes only — no frontmatter, heading, fence or id hunk

### WP-12: Recast 23-github … 25-software-architecture

**Context:**
The 3 entry directories below hold 13 files under
`lessons/ru/01-cs-fundamentals/`. Every one of them exists and has an English twin at the same relative path
under `lessons/01-cs-fundamentals/`. The shapes present are: full + 1 examples; landing + 4 full + 4 examples.

**Task:**
Recast the prose of every `.md` file in the entry directories below, in place, so each file reads as
Russian written by a Russian technical writer and satisfies rules R1–R11 in `_index.md` →
Conventions. The examples files keep their frozen headings, `### Решение` lines, fences and fence tags.

**Files:**

| Entry directory | Files | Shapes |
| --- | --- | --- |
| `23-github` | 2 | full + 1 examples |
| `24-command-line-interface` | 2 | full + 1 examples |
| `25-software-architecture` | 9 | landing + 4 full + 4 examples |

All MODIFY. 13 files in total. No file is created, deleted or renamed.

**Constraints:**
- DO: read each file's English twin in full before recasting it, and use it only as the record of what is true
- DO: make the Russian sentence count differ from the English twin's, and the ratio of the two median sentence lengths at least 0.95
- DO: keep at most 3 `— это ` per file and rewrite every English `-ing` clause as a clause or a separate sentence
- DO: keep every number, id, backticked span, fence, fence tag and heading byte-identical — `--diff` fails on any of them
- DO: write one file per `write` call and run the two commands below after each file
- DO: keep every landing page at 190 words or more (its floor is 180)
- DO NOT: add, drop, soften or strengthen a fact, a number or a claim
- DO NOT: change `status: drafted`, and do not promote anything to `reviewed`
- DO NOT: write anything under `lessons/` outside `lessons/ru/`, or touch `lessons/ru/INDEX.md`
- DO NOT: introduce a line beginning with `## ` inside a fence

**Success:**
- [ ] Command: `node tools/check-ru-style.mjs --diff --topic 01-cs-fundamentals` → `0 structural differences`, exit 0
- [ ] Command: `node tools/check-ru-style.mjs --topic 01-cs-fundamentals --strict` → no per-file warning naming any of the 13 files
- [ ] Command: `node tools/validate-content.mjs --topic 01-cs-fundamentals --lang ru` → `0 error(s)`
- [ ] Command: `ls lessons/ru/01-cs-fundamentals/23-github/*.md | wc -l && ls lessons/ru/01-cs-fundamentals/24-command-line-interface/*.md | wc -l && ls lessons/ru/01-cs-fundamentals/25-software-architecture/*.md | wc -l` → 2, 2, 9 (one count per entry directory, in the order listed)
- [ ] Manual: the 13 files' `git diff` shows prose changes only — no frontmatter, heading, fence or id hunk

### WP-13: Recast 26-end-to-end-testing … 27-playwright

**Context:**
The 2 entry directories below hold 7 files under
`lessons/ru/01-cs-fundamentals/`. Every one of them exists and has an English twin at the same relative path
under `lessons/01-cs-fundamentals/`. The shapes present are: landing + 2 full + 2 examples; full + 1 examples.

**Task:**
Recast the prose of every `.md` file in the entry directories below, in place, so each file reads as
Russian written by a Russian technical writer and satisfies rules R1–R11 in `_index.md` →
Conventions. The examples files keep their frozen headings, `### Решение` lines, fences and fence tags.

**Files:**

| Entry directory | Files | Shapes |
| --- | --- | --- |
| `26-end-to-end-testing` | 5 | landing + 2 full + 2 examples |
| `27-playwright` | 2 | full + 1 examples |

All MODIFY. 7 files in total. No file is created, deleted or renamed.

**Constraints:**
- DO: read each file's English twin in full before recasting it, and use it only as the record of what is true
- DO: make the Russian sentence count differ from the English twin's, and the ratio of the two median sentence lengths at least 0.95
- DO: keep at most 3 `— это ` per file and rewrite every English `-ing` clause as a clause or a separate sentence
- DO: keep every number, id, backticked span, fence, fence tag and heading byte-identical — `--diff` fails on any of them
- DO: write one file per `write` call and run the two commands below after each file
- DO: keep every landing page at 190 words or more (its floor is 180)
- DO NOT: add, drop, soften or strengthen a fact, a number or a claim
- DO NOT: change `status: drafted`, and do not promote anything to `reviewed`
- DO NOT: write anything under `lessons/` outside `lessons/ru/`, or touch `lessons/ru/INDEX.md`
- DO NOT: introduce a line beginning with `## ` inside a fence

**Success:**
- [ ] Command: `node tools/check-ru-style.mjs --diff --topic 01-cs-fundamentals` → `0 structural differences`, exit 0
- [ ] Command: `node tools/check-ru-style.mjs --topic 01-cs-fundamentals --strict` → no per-file warning naming any of the 7 files
- [ ] Command: `node tools/validate-content.mjs --topic 01-cs-fundamentals --lang ru` → `0 error(s)`
- [ ] Command: `ls lessons/ru/01-cs-fundamentals/26-end-to-end-testing/*.md | wc -l && ls lessons/ru/01-cs-fundamentals/27-playwright/*.md | wc -l` → 5, 2 (one count per entry directory, in the order listed)
- [ ] Manual: the 7 files' `git diff` shows prose changes only — no frontmatter, heading, fence or id hunk

## Phase Verification

```bash
node tools/check-ru-style.mjs --topic 01-cs-fundamentals
node tools/check-ru-style.mjs --diff --topic 01-cs-fundamentals
node tools/validate-content.mjs --topic 01-cs-fundamentals --lang ru
find lessons/ru/01-cs-fundamentals -name '*.md' | wc -l
```

- [ ] Every work package's per-file `--strict` warnings are gone: the report lists no file in
      `01-cs-fundamentals` with a blacklist hit or more than 3 copulas
- [ ] `--diff` exits 0 and every file's frontmatter, headings, fences, ids, numbers and literals are
      byte-identical to the baseline commit
- [ ] The validator reports `0 error(s)` for `--topic 01-cs-fundamentals --lang ru`,
      and the file counts are still 108
- [ ] The corpus block's first five metrics have moved towards their targets, and the topic's own
      contribution is visible: `node tools/check-ru-style.mjs --topic 01-cs-fundamentals`
- [ ] Manual: spot-read two files in this phase against their English twins. The Russian must not
      read as a sentence-for-sentence mirror, and no fact may have changed.
