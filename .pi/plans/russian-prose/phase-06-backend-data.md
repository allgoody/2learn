# Phase 6: 05-backend-data

## Objective

Recast the Russian files of `lessons/ru/05-backend-data/` —
91 files in 9 work packages. This phase covers 05-backend-data:
the code-heaviest topic: two full lessons and two examples files for most entries, so the frozen-fence invariant does most of the work here.

## Prerequisites

- Phase 1 complete, and the user has approved the calibration voice. Do not start this phase without
  that approval.
- `node tools/check-ru-style.mjs --diff` exits 0 over the whole corpus.
- `node tools/validate-content.mjs --strict --lang ru` reports
  `177 present, 0 pending, 297 examples, 0 examples pending, 0 error(s)` and exits 0.
- `lessons/AUTHORING.md` §14 exists and its target table matches `TARGETS` in
  `tools/check-ru-style.mjs`.
- No Russian file under `lessons/ru/05-backend-data` has been edited since the baseline commit.

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

### WP-49: Recast 01-server-side … 02-nodejs

**Context:**
The 2 entry directories below hold 6 files under
`lessons/ru/05-backend-data/`. Every one of them exists and has an English twin at the same relative path
under `lessons/05-backend-data/`. The shapes present are: area; landing + 2 full + 2 examples.

**Task:**
Recast the prose of every `.md` file in the entry directories below, in place, so each file reads as
Russian written by a Russian technical writer and satisfies rules R1–R11 in `_index.md` →
Conventions. The examples files keep their frozen headings, `### Решение` lines, fences and fence tags.

**Files:**

| Entry directory | Files | Shapes |
| --- | --- | --- |
| `01-server-side` | 1 | area |
| `02-nodejs` | 5 | landing + 2 full + 2 examples |

All MODIFY. 6 files in total. No file is created, deleted or renamed.

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
- [ ] Command: `node tools/check-ru-style.mjs --diff --topic 05-backend-data` → `0 structural differences`, exit 0
- [ ] Command: `node tools/check-ru-style.mjs --topic 05-backend-data --strict` → no per-file warning naming any of the 6 files
- [ ] Command: `node tools/validate-content.mjs --topic 05-backend-data --lang ru` → `0 error(s)`
- [ ] Command: `ls lessons/ru/05-backend-data/01-server-side/*.md | wc -l && ls lessons/ru/05-backend-data/02-nodejs/*.md | wc -l` → 1, 5 (one count per entry directory, in the order listed)
- [ ] Manual: the 6 files' `git diff` shows prose changes only — no frontmatter, heading, fence or id hunk

### WP-50: Recast 03-python-programming

**Context:**
The 1 entry directory below hold 9 files under
`lessons/ru/05-backend-data/`. Every one of them exists and has an English twin at the same relative path
under `lessons/05-backend-data/`. The shapes present are: landing + 4 full + 4 examples.

**Task:**
Recast the prose of every `.md` file in the entry directories below, in place, so each file reads as
Russian written by a Russian technical writer and satisfies rules R1–R11 in `_index.md` →
Conventions. The examples files keep their frozen headings, `### Решение` lines, fences and fence tags.

**Files:**

| Entry directory | Files | Shapes |
| --- | --- | --- |
| `03-python-programming` | 9 | landing + 4 full + 4 examples |

All MODIFY. 9 files in total. No file is created, deleted or renamed.

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
- [ ] Command: `node tools/check-ru-style.mjs --diff --topic 05-backend-data` → `0 structural differences`, exit 0
- [ ] Command: `node tools/check-ru-style.mjs --topic 05-backend-data --strict` → no per-file warning naming any of the 9 files
- [ ] Command: `node tools/validate-content.mjs --topic 05-backend-data --lang ru` → `0 error(s)`
- [ ] Command: `ls lessons/ru/05-backend-data/03-python-programming/*.md | wc -l` → 9 (one count per entry directory, in the order listed)
- [ ] Manual: the 9 files' `git diff` shows prose changes only — no frontmatter, heading, fence or id hunk

### WP-51: Recast 04-java

**Context:**
The 1 entry directory below hold 9 files under
`lessons/ru/05-backend-data/`. Every one of them exists and has an English twin at the same relative path
under `lessons/05-backend-data/`. The shapes present are: landing + 4 full + 4 examples.

**Task:**
Recast the prose of every `.md` file in the entry directories below, in place, so each file reads as
Russian written by a Russian technical writer and satisfies rules R1–R11 in `_index.md` →
Conventions. The examples files keep their frozen headings, `### Решение` lines, fences and fence tags.

**Files:**

| Entry directory | Files | Shapes |
| --- | --- | --- |
| `04-java` | 9 | landing + 4 full + 4 examples |

All MODIFY. 9 files in total. No file is created, deleted or renamed.

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
- [ ] Command: `node tools/check-ru-style.mjs --diff --topic 05-backend-data` → `0 structural differences`, exit 0
- [ ] Command: `node tools/check-ru-style.mjs --topic 05-backend-data --strict` → no per-file warning naming any of the 9 files
- [ ] Command: `node tools/validate-content.mjs --topic 05-backend-data --lang ru` → `0 error(s)`
- [ ] Command: `ls lessons/ru/05-backend-data/04-java/*.md | wc -l` → 9 (one count per entry directory, in the order listed)
- [ ] Manual: the 9 files' `git diff` shows prose changes only — no frontmatter, heading, fence or id hunk

### WP-52: Recast 05-go … 06-restful-api

**Context:**
The 2 entry directories below hold 10 files under
`lessons/ru/05-backend-data/`. Every one of them exists and has an English twin at the same relative path
under `lessons/05-backend-data/`. The shapes present are: landing + 2 full + 2 examples.

**Task:**
Recast the prose of every `.md` file in the entry directories below, in place, so each file reads as
Russian written by a Russian technical writer and satisfies rules R1–R11 in `_index.md` →
Conventions. The examples files keep their frozen headings, `### Решение` lines, fences and fence tags.

**Files:**

| Entry directory | Files | Shapes |
| --- | --- | --- |
| `05-go` | 5 | landing + 2 full + 2 examples |
| `06-restful-api` | 5 | landing + 2 full + 2 examples |

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
- [ ] Command: `node tools/check-ru-style.mjs --diff --topic 05-backend-data` → `0 structural differences`, exit 0
- [ ] Command: `node tools/check-ru-style.mjs --topic 05-backend-data --strict` → no per-file warning naming any of the 10 files
- [ ] Command: `node tools/validate-content.mjs --topic 05-backend-data --lang ru` → `0 error(s)`
- [ ] Command: `ls lessons/ru/05-backend-data/05-go/*.md | wc -l && ls lessons/ru/05-backend-data/06-restful-api/*.md | wc -l` → 5, 5 (one count per entry directory, in the order listed)
- [ ] Manual: the 10 files' `git diff` shows prose changes only — no frontmatter, heading, fence or id hunk

### WP-53: Recast 07-sql-relational-databases … 08-expressjs

**Context:**
The 2 entry directories below hold 11 files under
`lessons/ru/05-backend-data/`. Every one of them exists and has an English twin at the same relative path
under `lessons/05-backend-data/`. The shapes present are: landing + 4 full + 4 examples; full + 1 examples.

**Task:**
Recast the prose of every `.md` file in the entry directories below, in place, so each file reads as
Russian written by a Russian technical writer and satisfies rules R1–R11 in `_index.md` →
Conventions. The examples files keep their frozen headings, `### Решение` lines, fences and fence tags.

**Files:**

| Entry directory | Files | Shapes |
| --- | --- | --- |
| `07-sql-relational-databases` | 9 | landing + 4 full + 4 examples |
| `08-expressjs` | 2 | full + 1 examples |

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
- [ ] Command: `node tools/check-ru-style.mjs --diff --topic 05-backend-data` → `0 structural differences`, exit 0
- [ ] Command: `node tools/check-ru-style.mjs --topic 05-backend-data --strict` → no per-file warning naming any of the 11 files
- [ ] Command: `node tools/validate-content.mjs --topic 05-backend-data --lang ru` → `0 error(s)`
- [ ] Command: `ls lessons/ru/05-backend-data/07-sql-relational-databases/*.md | wc -l && ls lessons/ru/05-backend-data/08-expressjs/*.md | wc -l` → 9, 2 (one count per entry directory, in the order listed)
- [ ] Manual: the 11 files' `git diff` shows prose changes only — no frontmatter, heading, fence or id hunk

### WP-54: Recast 09-api-design-openapi-swagger … 11-websockets

**Context:**
The 3 entry directories below hold 12 files under
`lessons/ru/05-backend-data/`. Every one of them exists and has an English twin at the same relative path
under `lessons/05-backend-data/`. The shapes present are: landing + 2 full + 2 examples; full + 1 examples.

**Task:**
Recast the prose of every `.md` file in the entry directories below, in place, so each file reads as
Russian written by a Russian technical writer and satisfies rules R1–R11 in `_index.md` →
Conventions. The examples files keep their frozen headings, `### Решение` lines, fences and fence tags.

**Files:**

| Entry directory | Files | Shapes |
| --- | --- | --- |
| `09-api-design-openapi-swagger` | 5 | landing + 2 full + 2 examples |
| `10-authentication-authorization-oauth2-jwt` | 5 | landing + 2 full + 2 examples |
| `11-websockets` | 2 | full + 1 examples |

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
- [ ] Command: `node tools/check-ru-style.mjs --diff --topic 05-backend-data` → `0 structural differences`, exit 0
- [ ] Command: `node tools/check-ru-style.mjs --topic 05-backend-data --strict` → no per-file warning naming any of the 12 files
- [ ] Command: `node tools/validate-content.mjs --topic 05-backend-data --lang ru` → `0 error(s)`
- [ ] Command: `ls lessons/ru/05-backend-data/09-api-design-openapi-swagger/*.md | wc -l && ls lessons/ru/05-backend-data/10-authentication-authorization-oauth2-jwt/*.md | wc -l && ls lessons/ru/05-backend-data/11-websockets/*.md | wc -l` → 5, 5, 2 (one count per entry directory, in the order listed)
- [ ] Manual: the 12 files' `git diff` shows prose changes only — no frontmatter, heading, fence or id hunk

### WP-55: Recast 12-microservices … 13-nosql

**Context:**
The 2 entry directories below hold 10 files under
`lessons/ru/05-backend-data/`. Every one of them exists and has an English twin at the same relative path
under `lessons/05-backend-data/`. The shapes present are: landing + 2 full + 2 examples.

**Task:**
Recast the prose of every `.md` file in the entry directories below, in place, so each file reads as
Russian written by a Russian technical writer and satisfies rules R1–R11 in `_index.md` →
Conventions. The examples files keep their frozen headings, `### Решение` lines, fences and fence tags.

**Files:**

| Entry directory | Files | Shapes |
| --- | --- | --- |
| `12-microservices` | 5 | landing + 2 full + 2 examples |
| `13-nosql` | 5 | landing + 2 full + 2 examples |

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
- [ ] Command: `node tools/check-ru-style.mjs --diff --topic 05-backend-data` → `0 structural differences`, exit 0
- [ ] Command: `node tools/check-ru-style.mjs --topic 05-backend-data --strict` → no per-file warning naming any of the 10 files
- [ ] Command: `node tools/validate-content.mjs --topic 05-backend-data --lang ru` → `0 error(s)`
- [ ] Command: `ls lessons/ru/05-backend-data/12-microservices/*.md | wc -l && ls lessons/ru/05-backend-data/13-nosql/*.md | wc -l` → 5, 5 (one count per entry directory, in the order listed)
- [ ] Manual: the 10 files' `git diff` shows prose changes only — no frontmatter, heading, fence or id hunk

### WP-56: Recast 14-database-design … 16-caching-redis

**Context:**
The 3 entry directories below hold 12 files under
`lessons/ru/05-backend-data/`. Every one of them exists and has an English twin at the same relative path
under `lessons/05-backend-data/`. The shapes present are: landing + 2 full + 2 examples; full + 1 examples.

**Task:**
Recast the prose of every `.md` file in the entry directories below, in place, so each file reads as
Russian written by a Russian technical writer and satisfies rules R1–R11 in `_index.md` →
Conventions. The examples files keep their frozen headings, `### Решение` lines, fences and fence tags.

**Files:**

| Entry directory | Files | Shapes |
| --- | --- | --- |
| `14-database-design` | 5 | landing + 2 full + 2 examples |
| `15-object-relational-mapping` | 2 | full + 1 examples |
| `16-caching-redis` | 5 | landing + 2 full + 2 examples |

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
- [ ] Command: `node tools/check-ru-style.mjs --diff --topic 05-backend-data` → `0 structural differences`, exit 0
- [ ] Command: `node tools/check-ru-style.mjs --topic 05-backend-data --strict` → no per-file warning naming any of the 12 files
- [ ] Command: `node tools/validate-content.mjs --topic 05-backend-data --lang ru` → `0 error(s)`
- [ ] Command: `ls lessons/ru/05-backend-data/14-database-design/*.md | wc -l && ls lessons/ru/05-backend-data/15-object-relational-mapping/*.md | wc -l && ls lessons/ru/05-backend-data/16-caching-redis/*.md | wc -l` → 5, 2, 5 (one count per entry directory, in the order listed)
- [ ] Manual: the 12 files' `git diff` shows prose changes only — no frontmatter, heading, fence or id hunk

### WP-57: Recast 17-message-queues-kafka-rabbitmq … 19-prisma-orm

**Context:**
The 3 entry directories below hold 12 files under
`lessons/ru/05-backend-data/`. Every one of them exists and has an English twin at the same relative path
under `lessons/05-backend-data/`. The shapes present are: landing + 2 full + 2 examples; full + 1 examples.

**Task:**
Recast the prose of every `.md` file in the entry directories below, in place, so each file reads as
Russian written by a Russian technical writer and satisfies rules R1–R11 in `_index.md` →
Conventions. The examples files keep their frozen headings, `### Решение` lines, fences and fence tags.

**Files:**

| Entry directory | Files | Shapes |
| --- | --- | --- |
| `17-message-queues-kafka-rabbitmq` | 5 | landing + 2 full + 2 examples |
| `18-mongodb` | 5 | landing + 2 full + 2 examples |
| `19-prisma-orm` | 2 | full + 1 examples |

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
- [ ] Command: `node tools/check-ru-style.mjs --diff --topic 05-backend-data` → `0 structural differences`, exit 0
- [ ] Command: `node tools/check-ru-style.mjs --topic 05-backend-data --strict` → no per-file warning naming any of the 12 files
- [ ] Command: `node tools/validate-content.mjs --topic 05-backend-data --lang ru` → `0 error(s)`
- [ ] Command: `ls lessons/ru/05-backend-data/17-message-queues-kafka-rabbitmq/*.md | wc -l && ls lessons/ru/05-backend-data/18-mongodb/*.md | wc -l && ls lessons/ru/05-backend-data/19-prisma-orm/*.md | wc -l` → 5, 5, 2 (one count per entry directory, in the order listed)
- [ ] Manual: the 12 files' `git diff` shows prose changes only — no frontmatter, heading, fence or id hunk

## Phase Verification

```bash
node tools/check-ru-style.mjs --topic 05-backend-data
node tools/check-ru-style.mjs --diff --topic 05-backend-data
node tools/validate-content.mjs --topic 05-backend-data --lang ru
find lessons/ru/05-backend-data -name '*.md' | wc -l
```

- [ ] Every work package's per-file `--strict` warnings are gone: the report lists no file in
      `05-backend-data` with a blacklist hit or more than 3 copulas
- [ ] `--diff` exits 0 and every file's frontmatter, headings, fences, ids, numbers and literals are
      byte-identical to the baseline commit
- [ ] The validator reports `0 error(s)` for `--topic 05-backend-data --lang ru`,
      and the file counts are still 91
- [ ] The corpus block's first five metrics have moved towards their targets, and the topic's own
      contribution is visible: `node tools/check-ru-style.mjs --topic 05-backend-data`
- [ ] Manual: spot-read two files in this phase against their English twins. The Russian must not
      read as a sentence-for-sentence mirror, and no fact may have changed.
