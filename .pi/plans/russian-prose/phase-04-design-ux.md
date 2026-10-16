# Phase 4: 03-design-ux

## Objective

Recast the Russian files of `lessons/ru/03-design-ux/` —
156 files in 15 work packages. This phase covers 03-design-ux:
the largest topic in the corpus by file count, and the one with the most abstract prose — research, facilitation and design practice, where calqued syntax is hardest to notice.

## Prerequisites

- Phase 1 complete, and the user has approved the calibration voice. Do not start this phase without
  that approval.
- `node tools/check-ru-style.mjs --diff` exits 0 over the whole corpus.
- `node tools/validate-content.mjs --strict --lang ru` reports
  `177 present, 0 pending, 297 examples, 0 examples pending, 0 error(s)` and exits 0.
- `lessons/AUTHORING.md` §14 exists and its target table matches `TARGETS` in
  `tools/check-ru-style.mjs`.
- No Russian file under `lessons/ru/03-design-ux` has been edited since the baseline commit.

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

### WP-27: Recast 01-ui-ux-design … 04-sketching

**Context:**
The 4 entry directories below hold 10 files under
`lessons/ru/03-design-ux/`. Every one of them exists and has an English twin at the same relative path
under `lessons/03-design-ux/`. The shapes present are: area; landing + 2 full + 2 examples; full + 1 examples.

**Task:**
Recast the prose of every `.md` file in the entry directories below, in place, so each file reads as
Russian written by a Russian technical writer and satisfies rules R1–R11 in `_index.md` →
Conventions. The examples files keep their frozen headings, `### Решение` lines, fences and fence tags.

**Files:**

| Entry directory | Files | Shapes |
| --- | --- | --- |
| `01-ui-ux-design` | 1 | area |
| `02-design-thinking` | 5 | landing + 2 full + 2 examples |
| `03-facilitation-workshop-design` | 2 | full + 1 examples |
| `04-sketching` | 2 | full + 1 examples |

All MODIFY. 10 files in total. No file is created, deleted or renamed.

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
- [ ] Command: `node tools/check-ru-style.mjs --diff --topic 03-design-ux` → `0 structural differences`, exit 0
- [ ] Command: `node tools/check-ru-style.mjs --topic 03-design-ux --strict` → no per-file warning naming any of the 10 files
- [ ] Command: `node tools/validate-content.mjs --topic 03-design-ux --lang ru` → `0 error(s)`
- [ ] Command: `ls lessons/ru/03-design-ux/01-ui-ux-design/*.md | wc -l && ls lessons/ru/03-design-ux/02-design-thinking/*.md | wc -l && ls lessons/ru/03-design-ux/03-facilitation-workshop-design/*.md | wc -l && ls lessons/ru/03-design-ux/04-sketching/*.md | wc -l` → 1, 5, 2, 2 (one count per entry directory, in the order listed)
- [ ] Manual: the 10 files' `git diff` shows prose changes only — no frontmatter, heading, fence or id hunk

### WP-28: Recast 05-user-research

**Context:**
The 1 entry directory below hold 9 files under
`lessons/ru/03-design-ux/`. Every one of them exists and has an English twin at the same relative path
under `lessons/03-design-ux/`. The shapes present are: landing + 4 full + 4 examples.

**Task:**
Recast the prose of every `.md` file in the entry directories below, in place, so each file reads as
Russian written by a Russian technical writer and satisfies rules R1–R11 in `_index.md` →
Conventions. The examples files keep their frozen headings, `### Решение` lines, fences and fence tags.

**Files:**

| Entry directory | Files | Shapes |
| --- | --- | --- |
| `05-user-research` | 9 | landing + 4 full + 4 examples |

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
- [ ] Command: `node tools/check-ru-style.mjs --diff --topic 03-design-ux` → `0 structural differences`, exit 0
- [ ] Command: `node tools/check-ru-style.mjs --topic 03-design-ux --strict` → no per-file warning naming any of the 9 files
- [ ] Command: `node tools/validate-content.mjs --topic 03-design-ux --lang ru` → `0 error(s)`
- [ ] Command: `ls lessons/ru/03-design-ux/05-user-research/*.md | wc -l` → 9 (one count per entry directory, in the order listed)
- [ ] Manual: the 9 files' `git diff` shows prose changes only — no frontmatter, heading, fence or id hunk

### WP-29: Recast 06-google-analytics-4-ga4 … 08-content-strategy

**Context:**
The 3 entry directories below hold 12 files under
`lessons/ru/03-design-ux/`. Every one of them exists and has an English twin at the same relative path
under `lessons/03-design-ux/`. The shapes present are: landing + 2 full + 2 examples; full + 1 examples.

**Task:**
Recast the prose of every `.md` file in the entry directories below, in place, so each file reads as
Russian written by a Russian technical writer and satisfies rules R1–R11 in `_index.md` →
Conventions. The examples files keep their frozen headings, `### Решение` lines, fences and fence tags.

**Files:**

| Entry directory | Files | Shapes |
| --- | --- | --- |
| `06-google-analytics-4-ga4` | 5 | landing + 2 full + 2 examples |
| `07-ux-writing-microcopy` | 2 | full + 1 examples |
| `08-content-strategy` | 5 | landing + 2 full + 2 examples |

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
- [ ] Command: `node tools/check-ru-style.mjs --diff --topic 03-design-ux` → `0 structural differences`, exit 0
- [ ] Command: `node tools/check-ru-style.mjs --topic 03-design-ux --strict` → no per-file warning naming any of the 12 files
- [ ] Command: `node tools/validate-content.mjs --topic 03-design-ux --lang ru` → `0 error(s)`
- [ ] Command: `ls lessons/ru/03-design-ux/06-google-analytics-4-ga4/*.md | wc -l && ls lessons/ru/03-design-ux/07-ux-writing-microcopy/*.md | wc -l && ls lessons/ru/03-design-ux/08-content-strategy/*.md | wc -l` → 5, 2, 5 (one count per entry directory, in the order listed)
- [ ] Manual: the 12 files' `git diff` shows prose changes only — no frontmatter, heading, fence or id hunk

### WP-30: Recast 09-information-architecture

**Context:**
The 1 entry directory below hold 9 files under
`lessons/ru/03-design-ux/`. Every one of them exists and has an English twin at the same relative path
under `lessons/03-design-ux/`. The shapes present are: landing + 4 full + 4 examples.

**Task:**
Recast the prose of every `.md` file in the entry directories below, in place, so each file reads as
Russian written by a Russian technical writer and satisfies rules R1–R11 in `_index.md` →
Conventions. The examples files keep their frozen headings, `### Решение` lines, fences and fence tags.

**Files:**

| Entry directory | Files | Shapes |
| --- | --- | --- |
| `09-information-architecture` | 9 | landing + 4 full + 4 examples |

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
- [ ] Command: `node tools/check-ru-style.mjs --diff --topic 03-design-ux` → `0 structural differences`, exit 0
- [ ] Command: `node tools/check-ru-style.mjs --topic 03-design-ux --strict` → no per-file warning naming any of the 9 files
- [ ] Command: `node tools/validate-content.mjs --topic 03-design-ux --lang ru` → `0 error(s)`
- [ ] Command: `ls lessons/ru/03-design-ux/09-information-architecture/*.md | wc -l` → 9 (one count per entry directory, in the order listed)
- [ ] Manual: the 9 files' `git diff` shows prose changes only — no frontmatter, heading, fence or id hunk

### WP-31: Recast 10-visual-design … 13-miro

**Context:**
The 4 entry directories below hold 11 files under
`lessons/ru/03-design-ux/`. Every one of them exists and has an English twin at the same relative path
under `lessons/03-design-ux/`. The shapes present are: landing + 2 full + 2 examples; full + 1 examples.

**Task:**
Recast the prose of every `.md` file in the entry directories below, in place, so each file reads as
Russian written by a Russian technical writer and satisfies rules R1–R11 in `_index.md` →
Conventions. The examples files keep their frozen headings, `### Решение` lines, fences and fence tags.

**Files:**

| Entry directory | Files | Shapes |
| --- | --- | --- |
| `10-visual-design` | 5 | landing + 2 full + 2 examples |
| `11-usability` | 2 | full + 1 examples |
| `12-figma` | 2 | full + 1 examples |
| `13-miro` | 2 | full + 1 examples |

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
- [ ] Command: `node tools/check-ru-style.mjs --diff --topic 03-design-ux` → `0 structural differences`, exit 0
- [ ] Command: `node tools/check-ru-style.mjs --topic 03-design-ux --strict` → no per-file warning naming any of the 11 files
- [ ] Command: `node tools/validate-content.mjs --topic 03-design-ux --lang ru` → `0 error(s)`
- [ ] Command: `ls lessons/ru/03-design-ux/10-visual-design/*.md | wc -l && ls lessons/ru/03-design-ux/11-usability/*.md | wc -l && ls lessons/ru/03-design-ux/12-figma/*.md | wc -l && ls lessons/ru/03-design-ux/13-miro/*.md | wc -l` → 5, 2, 2, 2 (one count per entry directory, in the order listed)
- [ ] Manual: the 11 files' `git diff` shows prose changes only — no frontmatter, heading, fence or id hunk

### WP-32: Recast 14-notion … 19-design-research

**Context:**
The 6 entry directories below hold 12 files under
`lessons/ru/03-design-ux/`. Every one of them exists and has an English twin at the same relative path
under `lessons/03-design-ux/`. The shapes present are: full + 1 examples.

**Task:**
Recast the prose of every `.md` file in the entry directories below, in place, so each file reads as
Russian written by a Russian technical writer and satisfies rules R1–R11 in `_index.md` →
Conventions. The examples files keep their frozen headings, `### Решение` lines, fences and fence tags.

**Files:**

| Entry directory | Files | Shapes |
| --- | --- | --- |
| `14-notion` | 2 | full + 1 examples |
| `15-user-centered-design` | 2 | full + 1 examples |
| `16-storyboarding` | 2 | full + 1 examples |
| `17-jobs-to-be-done` | 2 | full + 1 examples |
| `18-ui-ux-research` | 2 | full + 1 examples |
| `19-design-research` | 2 | full + 1 examples |

All MODIFY. 12 files in total. No file is created, deleted or renamed.

**Constraints:**
- DO: read each file's English twin in full before recasting it, and use it only as the record of what is true
- DO: make the Russian sentence count differ from the English twin's, and the ratio of the two median sentence lengths at least 0.95
- DO: keep at most 3 `— это ` per file and rewrite every English `-ing` clause as a clause or a separate sentence
- DO: keep every number, id, backticked span, fence, fence tag and heading byte-identical — `--diff` fails on any of them
- DO: write one file per `write` call and run the two commands below after each file
- DO NOT: add, drop, soften or strengthen a fact, a number or a claim
- DO NOT: change `status: drafted`, and do not promote anything to `reviewed`
- DO NOT: write anything under `lessons/` outside `lessons/ru/`, or touch `lessons/ru/INDEX.md`
- DO NOT: introduce a line beginning with `## ` inside a fence

**Success:**
- [ ] Command: `node tools/check-ru-style.mjs --diff --topic 03-design-ux` → `0 structural differences`, exit 0
- [ ] Command: `node tools/check-ru-style.mjs --topic 03-design-ux --strict` → no per-file warning naming any of the 12 files
- [ ] Command: `node tools/validate-content.mjs --topic 03-design-ux --lang ru` → `0 error(s)`
- [ ] Command: `ls lessons/ru/03-design-ux/14-notion/*.md | wc -l && ls lessons/ru/03-design-ux/15-user-centered-design/*.md | wc -l && ls lessons/ru/03-design-ux/16-storyboarding/*.md | wc -l && ls lessons/ru/03-design-ux/17-jobs-to-be-done/*.md | wc -l && ls lessons/ru/03-design-ux/18-ui-ux-research/*.md | wc -l && ls lessons/ru/03-design-ux/19-design-research/*.md | wc -l` → 2, 2, 2, 2, 2, 2 (one count per entry directory, in the order listed)
- [ ] Manual: the 12 files' `git diff` shows prose changes only — no frontmatter, heading, fence or id hunk

### WP-33: Recast 20-user-interviews … 21-survey-design

**Context:**
The 2 entry directories below hold 10 files under
`lessons/ru/03-design-ux/`. Every one of them exists and has an English twin at the same relative path
under `lessons/03-design-ux/`. The shapes present are: landing + 2 full + 2 examples.

**Task:**
Recast the prose of every `.md` file in the entry directories below, in place, so each file reads as
Russian written by a Russian technical writer and satisfies rules R1–R11 in `_index.md` →
Conventions. The examples files keep their frozen headings, `### Решение` lines, fences and fence tags.

**Files:**

| Entry directory | Files | Shapes |
| --- | --- | --- |
| `20-user-interviews` | 5 | landing + 2 full + 2 examples |
| `21-survey-design` | 5 | landing + 2 full + 2 examples |

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
- [ ] Command: `node tools/check-ru-style.mjs --diff --topic 03-design-ux` → `0 structural differences`, exit 0
- [ ] Command: `node tools/check-ru-style.mjs --topic 03-design-ux --strict` → no per-file warning naming any of the 10 files
- [ ] Command: `node tools/validate-content.mjs --topic 03-design-ux --lang ru` → `0 error(s)`
- [ ] Command: `ls lessons/ru/03-design-ux/20-user-interviews/*.md | wc -l && ls lessons/ru/03-design-ux/21-survey-design/*.md | wc -l` → 5, 5 (one count per entry directory, in the order listed)
- [ ] Manual: the 10 files' `git diff` shows prose changes only — no frontmatter, heading, fence or id hunk

### WP-34: Recast 22-journey-mapping … 24-quantitative-ux-research

**Context:**
The 3 entry directories below hold 12 files under
`lessons/ru/03-design-ux/`. Every one of them exists and has an English twin at the same relative path
under `lessons/03-design-ux/`. The shapes present are: landing + 2 full + 2 examples; full + 1 examples.

**Task:**
Recast the prose of every `.md` file in the entry directories below, in place, so each file reads as
Russian written by a Russian technical writer and satisfies rules R1–R11 in `_index.md` →
Conventions. The examples files keep their frozen headings, `### Решение` lines, fences and fence tags.

**Files:**

| Entry directory | Files | Shapes |
| --- | --- | --- |
| `22-journey-mapping` | 5 | landing + 2 full + 2 examples |
| `23-persona-user-experience` | 2 | full + 1 examples |
| `24-quantitative-ux-research` | 5 | landing + 2 full + 2 examples |

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
- [ ] Command: `node tools/check-ru-style.mjs --diff --topic 03-design-ux` → `0 structural differences`, exit 0
- [ ] Command: `node tools/check-ru-style.mjs --topic 03-design-ux --strict` → no per-file warning naming any of the 12 files
- [ ] Command: `node tools/validate-content.mjs --topic 03-design-ux --lang ru` → `0 error(s)`
- [ ] Command: `ls lessons/ru/03-design-ux/22-journey-mapping/*.md | wc -l && ls lessons/ru/03-design-ux/23-persona-user-experience/*.md | wc -l && ls lessons/ru/03-design-ux/24-quantitative-ux-research/*.md | wc -l` → 5, 2, 5 (one count per entry directory, in the order listed)
- [ ] Manual: the 12 files' `git diff` shows prose changes only — no frontmatter, heading, fence or id hunk

### WP-35: Recast 25-hotjar … 28-typography

**Context:**
The 4 entry directories below hold 11 files under
`lessons/ru/03-design-ux/`. Every one of them exists and has an English twin at the same relative path
under `lessons/03-design-ux/`. The shapes present are: full + 1 examples; landing + 2 full + 2 examples.

**Task:**
Recast the prose of every `.md` file in the entry directories below, in place, so each file reads as
Russian written by a Russian technical writer and satisfies rules R1–R11 in `_index.md` →
Conventions. The examples files keep their frozen headings, `### Решение` lines, fences and fence tags.

**Files:**

| Entry directory | Files | Shapes |
| --- | --- | --- |
| `25-hotjar` | 2 | full + 1 examples |
| `26-card-sorting` | 2 | full + 1 examples |
| `27-wireframing` | 2 | full + 1 examples |
| `28-typography` | 5 | landing + 2 full + 2 examples |

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
- [ ] Command: `node tools/check-ru-style.mjs --diff --topic 03-design-ux` → `0 structural differences`, exit 0
- [ ] Command: `node tools/check-ru-style.mjs --topic 03-design-ux --strict` → no per-file warning naming any of the 11 files
- [ ] Command: `node tools/validate-content.mjs --topic 03-design-ux --lang ru` → `0 error(s)`
- [ ] Command: `ls lessons/ru/03-design-ux/25-hotjar/*.md | wc -l && ls lessons/ru/03-design-ux/26-card-sorting/*.md | wc -l && ls lessons/ru/03-design-ux/27-wireframing/*.md | wc -l && ls lessons/ru/03-design-ux/28-typography/*.md | wc -l` → 2, 2, 2, 5 (one count per entry directory, in the order listed)
- [ ] Manual: the 11 files' `git diff` shows prose changes only — no frontmatter, heading, fence or id hunk

### WP-36: Recast 29-color-theory … 31-data-visualization

**Context:**
The 3 entry directories below hold 12 files under
`lessons/ru/03-design-ux/`. Every one of them exists and has an English twin at the same relative path
under `lessons/03-design-ux/`. The shapes present are: full + 1 examples; landing + 2 full + 2 examples.

**Task:**
Recast the prose of every `.md` file in the entry directories below, in place, so each file reads as
Russian written by a Russian technical writer and satisfies rules R1–R11 in `_index.md` →
Conventions. The examples files keep their frozen headings, `### Решение` lines, fences and fence tags.

**Files:**

| Entry directory | Files | Shapes |
| --- | --- | --- |
| `29-color-theory` | 2 | full + 1 examples |
| `30-layout-grid-systems` | 5 | landing + 2 full + 2 examples |
| `31-data-visualization` | 5 | landing + 2 full + 2 examples |

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
- [ ] Command: `node tools/check-ru-style.mjs --diff --topic 03-design-ux` → `0 structural differences`, exit 0
- [ ] Command: `node tools/check-ru-style.mjs --topic 03-design-ux --strict` → no per-file warning naming any of the 12 files
- [ ] Command: `node tools/validate-content.mjs --topic 03-design-ux --lang ru` → `0 error(s)`
- [ ] Command: `ls lessons/ru/03-design-ux/29-color-theory/*.md | wc -l && ls lessons/ru/03-design-ux/30-layout-grid-systems/*.md | wc -l && ls lessons/ru/03-design-ux/31-data-visualization/*.md | wc -l` → 2, 5, 5 (one count per entry directory, in the order listed)
- [ ] Manual: the 12 files' `git diff` shows prose changes only — no frontmatter, heading, fence or id hunk

### WP-37: Recast 32-design-systems

**Context:**
The 1 entry directory below hold 9 files under
`lessons/ru/03-design-ux/`. Every one of them exists and has an English twin at the same relative path
under `lessons/03-design-ux/`. The shapes present are: landing + 4 full + 4 examples.

**Task:**
Recast the prose of every `.md` file in the entry directories below, in place, so each file reads as
Russian written by a Russian technical writer and satisfies rules R1–R11 in `_index.md` →
Conventions. The examples files keep their frozen headings, `### Решение` lines, fences and fence tags.

**Files:**

| Entry directory | Files | Shapes |
| --- | --- | --- |
| `32-design-systems` | 9 | landing + 4 full + 4 examples |

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
- [ ] Command: `node tools/check-ru-style.mjs --diff --topic 03-design-ux` → `0 structural differences`, exit 0
- [ ] Command: `node tools/check-ru-style.mjs --topic 03-design-ux --strict` → no per-file warning naming any of the 9 files
- [ ] Command: `node tools/validate-content.mjs --topic 03-design-ux --lang ru` → `0 error(s)`
- [ ] Command: `ls lessons/ru/03-design-ux/32-design-systems/*.md | wc -l` → 9 (one count per entry directory, in the order listed)
- [ ] Manual: the 9 files' `git diff` shows prose changes only — no frontmatter, heading, fence or id hunk

### WP-38: Recast 33-usability-testing … 36-framer

**Context:**
The 4 entry directories below hold 11 files under
`lessons/ru/03-design-ux/`. Every one of them exists and has an English twin at the same relative path
under `lessons/03-design-ux/`. The shapes present are: landing + 2 full + 2 examples; full + 1 examples.

**Task:**
Recast the prose of every `.md` file in the entry directories below, in place, so each file reads as
Russian written by a Russian technical writer and satisfies rules R1–R11 in `_index.md` →
Conventions. The examples files keep their frozen headings, `### Решение` lines, fences and fence tags.

**Files:**

| Entry directory | Files | Shapes |
| --- | --- | --- |
| `33-usability-testing` | 5 | landing + 2 full + 2 examples |
| `34-heuristic-evaluation` | 2 | full + 1 examples |
| `35-adobe-xd` | 2 | full + 1 examples |
| `36-framer` | 2 | full + 1 examples |

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
- [ ] Command: `node tools/check-ru-style.mjs --diff --topic 03-design-ux` → `0 structural differences`, exit 0
- [ ] Command: `node tools/check-ru-style.mjs --topic 03-design-ux --strict` → no per-file warning naming any of the 11 files
- [ ] Command: `node tools/validate-content.mjs --topic 03-design-ux --lang ru` → `0 error(s)`
- [ ] Command: `ls lessons/ru/03-design-ux/33-usability-testing/*.md | wc -l && ls lessons/ru/03-design-ux/34-heuristic-evaluation/*.md | wc -l && ls lessons/ru/03-design-ux/35-adobe-xd/*.md | wc -l && ls lessons/ru/03-design-ux/36-framer/*.md | wc -l` → 5, 2, 2, 2 (one count per entry directory, in the order listed)
- [ ] Manual: the 11 files' `git diff` shows prose changes only — no frontmatter, heading, fence or id hunk

### WP-39: Recast 37-lean-ux … 39-ab-testing

**Context:**
The 3 entry directories below hold 12 files under
`lessons/ru/03-design-ux/`. Every one of them exists and has an English twin at the same relative path
under `lessons/03-design-ux/`. The shapes present are: full + 1 examples; landing + 2 full + 2 examples.

**Task:**
Recast the prose of every `.md` file in the entry directories below, in place, so each file reads as
Russian written by a Russian technical writer and satisfies rules R1–R11 in `_index.md` →
Conventions. The examples files keep their frozen headings, `### Решение` lines, fences and fence tags.

**Files:**

| Entry directory | Files | Shapes |
| --- | --- | --- |
| `37-lean-ux` | 2 | full + 1 examples |
| `38-service-design` | 5 | landing + 2 full + 2 examples |
| `39-ab-testing` | 5 | landing + 2 full + 2 examples |

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
- [ ] Command: `node tools/check-ru-style.mjs --diff --topic 03-design-ux` → `0 structural differences`, exit 0
- [ ] Command: `node tools/check-ru-style.mjs --topic 03-design-ux --strict` → no per-file warning naming any of the 12 files
- [ ] Command: `node tools/validate-content.mjs --topic 03-design-ux --lang ru` → `0 error(s)`
- [ ] Command: `ls lessons/ru/03-design-ux/37-lean-ux/*.md | wc -l && ls lessons/ru/03-design-ux/38-service-design/*.md | wc -l && ls lessons/ru/03-design-ux/39-ab-testing/*.md | wc -l` → 2, 5, 5 (one count per entry directory, in the order listed)
- [ ] Manual: the 12 files' `git diff` shows prose changes only — no frontmatter, heading, fence or id hunk

### WP-40: Recast 40-prototyping … 42-design-handoff-specs

**Context:**
The 3 entry directories below hold 9 files under
`lessons/ru/03-design-ux/`. Every one of them exists and has an English twin at the same relative path
under `lessons/03-design-ux/`. The shapes present are: landing + 2 full + 2 examples; full + 1 examples.

**Task:**
Recast the prose of every `.md` file in the entry directories below, in place, so each file reads as
Russian written by a Russian technical writer and satisfies rules R1–R11 in `_index.md` →
Conventions. The examples files keep their frozen headings, `### Решение` lines, fences and fence tags.

**Files:**

| Entry directory | Files | Shapes |
| --- | --- | --- |
| `40-prototyping` | 5 | landing + 2 full + 2 examples |
| `41-design-tokens` | 2 | full + 1 examples |
| `42-design-handoff-specs` | 2 | full + 1 examples |

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
- [ ] Command: `node tools/check-ru-style.mjs --diff --topic 03-design-ux` → `0 structural differences`, exit 0
- [ ] Command: `node tools/check-ru-style.mjs --topic 03-design-ux --strict` → no per-file warning naming any of the 9 files
- [ ] Command: `node tools/validate-content.mjs --topic 03-design-ux --lang ru` → `0 error(s)`
- [ ] Command: `ls lessons/ru/03-design-ux/40-prototyping/*.md | wc -l && ls lessons/ru/03-design-ux/41-design-tokens/*.md | wc -l && ls lessons/ru/03-design-ux/42-design-handoff-specs/*.md | wc -l` → 5, 2, 2 (one count per entry directory, in the order listed)
- [ ] Manual: the 9 files' `git diff` shows prose changes only — no frontmatter, heading, fence or id hunk

### WP-41: Recast 43-maze … 44-interaction-design

**Context:**
The 2 entry directories below hold 7 files under
`lessons/ru/03-design-ux/`. Every one of them exists and has an English twin at the same relative path
under `lessons/03-design-ux/`. The shapes present are: full + 1 examples; landing + 2 full + 2 examples.

**Task:**
Recast the prose of every `.md` file in the entry directories below, in place, so each file reads as
Russian written by a Russian technical writer and satisfies rules R1–R11 in `_index.md` →
Conventions. The examples files keep their frozen headings, `### Решение` lines, fences and fence tags.

**Files:**

| Entry directory | Files | Shapes |
| --- | --- | --- |
| `43-maze` | 2 | full + 1 examples |
| `44-interaction-design` | 5 | landing + 2 full + 2 examples |

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
- [ ] Command: `node tools/check-ru-style.mjs --diff --topic 03-design-ux` → `0 structural differences`, exit 0
- [ ] Command: `node tools/check-ru-style.mjs --topic 03-design-ux --strict` → no per-file warning naming any of the 7 files
- [ ] Command: `node tools/validate-content.mjs --topic 03-design-ux --lang ru` → `0 error(s)`
- [ ] Command: `ls lessons/ru/03-design-ux/43-maze/*.md | wc -l && ls lessons/ru/03-design-ux/44-interaction-design/*.md | wc -l` → 2, 5 (one count per entry directory, in the order listed)
- [ ] Manual: the 7 files' `git diff` shows prose changes only — no frontmatter, heading, fence or id hunk

## Phase Verification

```bash
node tools/check-ru-style.mjs --topic 03-design-ux
node tools/check-ru-style.mjs --diff --topic 03-design-ux
node tools/validate-content.mjs --topic 03-design-ux --lang ru
find lessons/ru/03-design-ux -name '*.md' | wc -l
```

- [ ] Every work package's per-file `--strict` warnings are gone: the report lists no file in
      `03-design-ux` with a blacklist hit or more than 3 copulas
- [ ] `--diff` exits 0 and every file's frontmatter, headings, fences, ids, numbers and literals are
      byte-identical to the baseline commit
- [ ] The validator reports `0 error(s)` for `--topic 03-design-ux --lang ru`,
      and the file counts are still 156
- [ ] The corpus block's first five metrics have moved towards their targets, and the topic's own
      contribution is visible: `node tools/check-ru-style.mjs --topic 03-design-ux`
- [ ] Manual: spot-read two files in this phase against their English twins. The Russian must not
      read as a sentence-for-sentence mirror, and no fact may have changed.
