# Phase 3: 02-frontend

## Objective

Recast the Russian files of `lessons/ru/02-frontend/` —
133 files in 13 work packages. This phase covers 02-frontend:
the most prose-heavy topic after design-ux, and the one whose examples files carry the most observable behaviour (DevTools panels, Lighthouse tables, Core Web Vitals readings).

## Prerequisites

- Phase 1 complete, and the user has approved the calibration voice. Do not start this phase without
  that approval.
- `node tools/check-ru-style.mjs --diff` exits 0 over the whole corpus.
- `node tools/validate-content.mjs --strict --lang ru` reports
  `177 present, 0 pending, 297 examples, 0 examples pending, 0 error(s)` and exits 0.
- `lessons/AUTHORING.md` §14 exists and its target table matches `TARGETS` in
  `tools/check-ru-style.mjs`.
- No Russian file under `lessons/ru/02-frontend` has been edited since the baseline commit.

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

### WP-14: Recast 01-html-and-css … 04-package-management-npm

**Context:**
The 4 entry directories below hold 9 files under
`lessons/ru/02-frontend/`. Every one of them exists and has an English twin at the same relative path
under `lessons/02-frontend/`. The shapes present are: area; full + 1 examples; landing + 2 full + 2 examples.

**Task:**
Recast the prose of every `.md` file in the entry directories below, in place, so each file reads as
Russian written by a Russian technical writer and satisfies rules R1–R11 in `_index.md` →
Conventions. The examples files keep their frozen headings, `### Решение` lines, fences and fence tags.

**Files:**

| Entry directory | Files | Shapes |
| --- | --- | --- |
| `01-html-and-css` | 1 | area |
| `02-front-end-web-development` | 1 | area |
| `03-html` | 2 | full + 1 examples |
| `04-package-management-npm` | 5 | landing + 2 full + 2 examples |

All MODIFY. 9 files in total. No file is created, deleted or renamed.

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
- [ ] Command: `node tools/check-ru-style.mjs --diff --topic 02-frontend` → `0 structural differences`, exit 0
- [ ] Command: `node tools/check-ru-style.mjs --topic 02-frontend --strict` → no per-file warning naming any of the 9 files
- [ ] Command: `node tools/validate-content.mjs --topic 02-frontend --lang ru` → `0 error(s)`
- [ ] Command: `ls lessons/ru/02-frontend/01-html-and-css/*.md | wc -l && ls lessons/ru/02-frontend/02-front-end-web-development/*.md | wc -l && ls lessons/ru/02-frontend/03-html/*.md | wc -l && ls lessons/ru/02-frontend/04-package-management-npm/*.md | wc -l` → 1, 1, 2, 5 (one count per entry directory, in the order listed)
- [ ] Manual: the 9 files' `git diff` shows prose changes only — no frontmatter, heading, fence or id hunk

### WP-15: Recast 05-css

**Context:**
The 1 entry directory below hold 9 files under
`lessons/ru/02-frontend/`. Every one of them exists and has an English twin at the same relative path
under `lessons/02-frontend/`. The shapes present are: landing + 4 full + 4 examples.

**Task:**
Recast the prose of every `.md` file in the entry directories below, in place, so each file reads as
Russian written by a Russian technical writer and satisfies rules R1–R11 in `_index.md` →
Conventions. The examples files keep their frozen headings, `### Решение` lines, fences and fence tags.

**Files:**

| Entry directory | Files | Shapes |
| --- | --- | --- |
| `05-css` | 9 | landing + 4 full + 4 examples |

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
- [ ] Command: `node tools/check-ru-style.mjs --diff --topic 02-frontend` → `0 structural differences`, exit 0
- [ ] Command: `node tools/check-ru-style.mjs --topic 02-frontend --strict` → no per-file warning naming any of the 9 files
- [ ] Command: `node tools/validate-content.mjs --topic 02-frontend --lang ru` → `0 error(s)`
- [ ] Command: `ls lessons/ru/02-frontend/05-css/*.md | wc -l` → 9 (one count per entry directory, in the order listed)
- [ ] Manual: the 9 files' `git diff` shows prose changes only — no frontmatter, heading, fence or id hunk

### WP-16: Recast 06-javascript … 07-responsive-images

**Context:**
The 2 entry directories below hold 11 files under
`lessons/ru/02-frontend/`. Every one of them exists and has an English twin at the same relative path
under `lessons/02-frontend/`. The shapes present are: landing + 4 full + 4 examples; full + 1 examples.

**Task:**
Recast the prose of every `.md` file in the entry directories below, in place, so each file reads as
Russian written by a Russian technical writer and satisfies rules R1–R11 in `_index.md` →
Conventions. The examples files keep their frozen headings, `### Решение` lines, fences and fence tags.

**Files:**

| Entry directory | Files | Shapes |
| --- | --- | --- |
| `06-javascript` | 9 | landing + 4 full + 4 examples |
| `07-responsive-images` | 2 | full + 1 examples |

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
- [ ] Command: `node tools/check-ru-style.mjs --diff --topic 02-frontend` → `0 structural differences`, exit 0
- [ ] Command: `node tools/check-ru-style.mjs --topic 02-frontend --strict` → no per-file warning naming any of the 11 files
- [ ] Command: `node tools/validate-content.mjs --topic 02-frontend --lang ru` → `0 error(s)`
- [ ] Command: `ls lessons/ru/02-frontend/06-javascript/*.md | wc -l && ls lessons/ru/02-frontend/07-responsive-images/*.md | wc -l` → 9, 2 (one count per entry directory, in the order listed)
- [ ] Manual: the 11 files' `git diff` shows prose changes only — no frontmatter, heading, fence or id hunk

### WP-17: Recast 08-seo … 10-responsive-web-design

**Context:**
The 3 entry directories below hold 12 files under
`lessons/ru/02-frontend/`. Every one of them exists and has an English twin at the same relative path
under `lessons/02-frontend/`. The shapes present are: landing + 2 full + 2 examples; full + 1 examples.

**Task:**
Recast the prose of every `.md` file in the entry directories below, in place, so each file reads as
Russian written by a Russian technical writer and satisfies rules R1–R11 in `_index.md` →
Conventions. The examples files keep their frozen headings, `### Решение` lines, fences and fence tags.

**Files:**

| Entry directory | Files | Shapes |
| --- | --- | --- |
| `08-seo` | 5 | landing + 2 full + 2 examples |
| `09-vite` | 2 | full + 1 examples |
| `10-responsive-web-design` | 5 | landing + 2 full + 2 examples |

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
- [ ] Command: `node tools/check-ru-style.mjs --diff --topic 02-frontend` → `0 structural differences`, exit 0
- [ ] Command: `node tools/check-ru-style.mjs --topic 02-frontend --strict` → no per-file warning naming any of the 12 files
- [ ] Command: `node tools/validate-content.mjs --topic 02-frontend --lang ru` → `0 error(s)`
- [ ] Command: `ls lessons/ru/02-frontend/08-seo/*.md | wc -l && ls lessons/ru/02-frontend/09-vite/*.md | wc -l && ls lessons/ru/02-frontend/10-responsive-web-design/*.md | wc -l` → 5, 2, 5 (one count per entry directory, in the order listed)
- [ ] Manual: the 12 files' `git diff` shows prose changes only — no frontmatter, heading, fence or id hunk

### WP-18: Recast 11-accessibility-wcag-a11y … 13-bootstrap

**Context:**
The 3 entry directories below hold 12 files under
`lessons/ru/02-frontend/`. Every one of them exists and has an English twin at the same relative path
under `lessons/02-frontend/`. The shapes present are: landing + 2 full + 2 examples; full + 1 examples.

**Task:**
Recast the prose of every `.md` file in the entry directories below, in place, so each file reads as
Russian written by a Russian technical writer and satisfies rules R1–R11 in `_index.md` →
Conventions. The examples files keep their frozen headings, `### Решение` lines, fences and fence tags.

**Files:**

| Entry directory | Files | Shapes |
| --- | --- | --- |
| `11-accessibility-wcag-a11y` | 5 | landing + 2 full + 2 examples |
| `12-ui-components` | 5 | landing + 2 full + 2 examples |
| `13-bootstrap` | 2 | full + 1 examples |

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
- [ ] Command: `node tools/check-ru-style.mjs --diff --topic 02-frontend` → `0 structural differences`, exit 0
- [ ] Command: `node tools/check-ru-style.mjs --topic 02-frontend --strict` → no per-file warning naming any of the 12 files
- [ ] Command: `node tools/validate-content.mjs --topic 02-frontend --lang ru` → `0 error(s)`
- [ ] Command: `ls lessons/ru/02-frontend/11-accessibility-wcag-a11y/*.md | wc -l && ls lessons/ru/02-frontend/12-ui-components/*.md | wc -l && ls lessons/ru/02-frontend/13-bootstrap/*.md | wc -l` → 5, 5, 2 (one count per entry directory, in the order listed)
- [ ] Manual: the 12 files' `git diff` shows prose changes only — no frontmatter, heading, fence or id hunk

### WP-19: Recast 14-tailwind-css … 16-motion-design

**Context:**
The 3 entry directories below hold 12 files under
`lessons/ru/02-frontend/`. Every one of them exists and has an English twin at the same relative path
under `lessons/02-frontend/`. The shapes present are: landing + 2 full + 2 examples; full + 1 examples.

**Task:**
Recast the prose of every `.md` file in the entry directories below, in place, so each file reads as
Russian written by a Russian technical writer and satisfies rules R1–R11 in `_index.md` →
Conventions. The examples files keep their frozen headings, `### Решение` lines, fences and fence tags.

**Files:**

| Entry directory | Files | Shapes |
| --- | --- | --- |
| `14-tailwind-css` | 5 | landing + 2 full + 2 examples |
| `15-sass` | 2 | full + 1 examples |
| `16-motion-design` | 5 | landing + 2 full + 2 examples |

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
- [ ] Command: `node tools/check-ru-style.mjs --diff --topic 02-frontend` → `0 structural differences`, exit 0
- [ ] Command: `node tools/check-ru-style.mjs --topic 02-frontend --strict` → no per-file warning naming any of the 12 files
- [ ] Command: `node tools/validate-content.mjs --topic 02-frontend --lang ru` → `0 error(s)`
- [ ] Command: `ls lessons/ru/02-frontend/14-tailwind-css/*.md | wc -l && ls lessons/ru/02-frontend/15-sass/*.md | wc -l && ls lessons/ru/02-frontend/16-motion-design/*.md | wc -l` → 5, 2, 5 (one count per entry directory, in the order listed)
- [ ] Manual: the 12 files' `git diff` shows prose changes only — no frontmatter, heading, fence or id hunk

### WP-20: Recast 17-svg-icon-systems … 18-web-typography

**Context:**
The 2 entry directories below hold 10 files under
`lessons/ru/02-frontend/`. Every one of them exists and has an English twin at the same relative path
under `lessons/02-frontend/`. The shapes present are: landing + 2 full + 2 examples.

**Task:**
Recast the prose of every `.md` file in the entry directories below, in place, so each file reads as
Russian written by a Russian technical writer and satisfies rules R1–R11 in `_index.md` →
Conventions. The examples files keep their frozen headings, `### Решение` lines, fences and fence tags.

**Files:**

| Entry directory | Files | Shapes |
| --- | --- | --- |
| `17-svg-icon-systems` | 5 | landing + 2 full + 2 examples |
| `18-web-typography` | 5 | landing + 2 full + 2 examples |

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
- [ ] Command: `node tools/check-ru-style.mjs --diff --topic 02-frontend` → `0 structural differences`, exit 0
- [ ] Command: `node tools/check-ru-style.mjs --topic 02-frontend --strict` → no per-file warning naming any of the 10 files
- [ ] Command: `node tools/validate-content.mjs --topic 02-frontend --lang ru` → `0 error(s)`
- [ ] Command: `ls lessons/ru/02-frontend/17-svg-icon-systems/*.md | wc -l && ls lessons/ru/02-frontend/18-web-typography/*.md | wc -l` → 5, 5 (one count per entry directory, in the order listed)
- [ ] Manual: the 10 files' `git diff` shows prose changes only — no frontmatter, heading, fence or id hunk

### WP-21: Recast 19-typescript … 20-browser-compatibility

**Context:**
The 2 entry directories below hold 11 files under
`lessons/ru/02-frontend/`. Every one of them exists and has an English twin at the same relative path
under `lessons/02-frontend/`. The shapes present are: landing + 4 full + 4 examples; full + 1 examples.

**Task:**
Recast the prose of every `.md` file in the entry directories below, in place, so each file reads as
Russian written by a Russian technical writer and satisfies rules R1–R11 in `_index.md` →
Conventions. The examples files keep their frozen headings, `### Решение` lines, fences and fence tags.

**Files:**

| Entry directory | Files | Shapes |
| --- | --- | --- |
| `19-typescript` | 9 | landing + 4 full + 4 examples |
| `20-browser-compatibility` | 2 | full + 1 examples |

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
- [ ] Command: `node tools/check-ru-style.mjs --diff --topic 02-frontend` → `0 structural differences`, exit 0
- [ ] Command: `node tools/check-ru-style.mjs --topic 02-frontend --strict` → no per-file warning naming any of the 11 files
- [ ] Command: `node tools/validate-content.mjs --topic 02-frontend --lang ru` → `0 error(s)`
- [ ] Command: `ls lessons/ru/02-frontend/19-typescript/*.md | wc -l && ls lessons/ru/02-frontend/20-browser-compatibility/*.md | wc -l` → 9, 2 (one count per entry directory, in the order listed)
- [ ] Manual: the 11 files' `git diff` shows prose changes only — no frontmatter, heading, fence or id hunk

### WP-22: Recast 21-ajax … 23-state-management

**Context:**
The 3 entry directories below hold 12 files under
`lessons/ru/02-frontend/`. Every one of them exists and has an English twin at the same relative path
under `lessons/02-frontend/`. The shapes present are: full + 1 examples; landing + 2 full + 2 examples.

**Task:**
Recast the prose of every `.md` file in the entry directories below, in place, so each file reads as
Russian written by a Russian technical writer and satisfies rules R1–R11 in `_index.md` →
Conventions. The examples files keep their frozen headings, `### Решение` lines, fences and fence tags.

**Files:**

| Entry directory | Files | Shapes |
| --- | --- | --- |
| `21-ajax` | 2 | full + 1 examples |
| `22-vuejs` | 5 | landing + 2 full + 2 examples |
| `23-state-management` | 5 | landing + 2 full + 2 examples |

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
- [ ] Command: `node tools/check-ru-style.mjs --diff --topic 02-frontend` → `0 structural differences`, exit 0
- [ ] Command: `node tools/check-ru-style.mjs --topic 02-frontend --strict` → no per-file warning naming any of the 12 files
- [ ] Command: `node tools/validate-content.mjs --topic 02-frontend --lang ru` → `0 error(s)`
- [ ] Command: `ls lessons/ru/02-frontend/21-ajax/*.md | wc -l && ls lessons/ru/02-frontend/22-vuejs/*.md | wc -l && ls lessons/ru/02-frontend/23-state-management/*.md | wc -l` → 2, 5, 5 (one count per entry directory, in the order listed)
- [ ] Manual: the 12 files' `git diff` shows prose changes only — no frontmatter, heading, fence or id hunk

### WP-23: Recast 24-webpack … 26-web-performance-core-web-vitals

**Context:**
The 3 entry directories below hold 12 files under
`lessons/ru/02-frontend/`. Every one of them exists and has an English twin at the same relative path
under `lessons/02-frontend/`. The shapes present are: full + 1 examples; landing + 2 full + 2 examples.

**Task:**
Recast the prose of every `.md` file in the entry directories below, in place, so each file reads as
Russian written by a Russian technical writer and satisfies rules R1–R11 in `_index.md` →
Conventions. The examples files keep their frozen headings, `### Решение` lines, fences and fence tags.

**Files:**

| Entry directory | Files | Shapes |
| --- | --- | --- |
| `24-webpack` | 2 | full + 1 examples |
| `25-progressive-web-apps-pwa` | 5 | landing + 2 full + 2 examples |
| `26-web-performance-core-web-vitals` | 5 | landing + 2 full + 2 examples |

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
- [ ] Command: `node tools/check-ru-style.mjs --diff --topic 02-frontend` → `0 structural differences`, exit 0
- [ ] Command: `node tools/check-ru-style.mjs --topic 02-frontend --strict` → no per-file warning naming any of the 12 files
- [ ] Command: `node tools/validate-content.mjs --topic 02-frontend --lang ru` → `0 error(s)`
- [ ] Command: `ls lessons/ru/02-frontend/24-webpack/*.md | wc -l && ls lessons/ru/02-frontend/25-progressive-web-apps-pwa/*.md | wc -l && ls lessons/ru/02-frontend/26-web-performance-core-web-vitals/*.md | wc -l` → 2, 5, 5 (one count per entry directory, in the order listed)
- [ ] Manual: the 12 files' `git diff` shows prose changes only — no frontmatter, heading, fence or id hunk

### WP-24: Recast 27-browser-devtools … 28-generative-engine-optimization-geo

**Context:**
The 2 entry directories below hold 7 files under
`lessons/ru/02-frontend/`. Every one of them exists and has an English twin at the same relative path
under `lessons/02-frontend/`. The shapes present are: landing + 2 full + 2 examples; full + 1 examples.

**Task:**
Recast the prose of every `.md` file in the entry directories below, in place, so each file reads as
Russian written by a Russian technical writer and satisfies rules R1–R11 in `_index.md` →
Conventions. The examples files keep their frozen headings, `### Решение` lines, fences and fence tags.

**Files:**

| Entry directory | Files | Shapes |
| --- | --- | --- |
| `27-browser-devtools` | 5 | landing + 2 full + 2 examples |
| `28-generative-engine-optimization-geo` | 2 | full + 1 examples |

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
- [ ] Command: `node tools/check-ru-style.mjs --diff --topic 02-frontend` → `0 structural differences`, exit 0
- [ ] Command: `node tools/check-ru-style.mjs --topic 02-frontend --strict` → no per-file warning naming any of the 7 files
- [ ] Command: `node tools/validate-content.mjs --topic 02-frontend --lang ru` → `0 error(s)`
- [ ] Command: `ls lessons/ru/02-frontend/27-browser-devtools/*.md | wc -l && ls lessons/ru/02-frontend/28-generative-engine-optimization-geo/*.md | wc -l` → 5, 2 (one count per entry directory, in the order listed)
- [ ] Manual: the 7 files' `git diff` shows prose changes only — no frontmatter, heading, fence or id hunk

### WP-25: Recast 29-react

**Context:**
The 1 entry directory below hold 9 files under
`lessons/ru/02-frontend/`. Every one of them exists and has an English twin at the same relative path
under `lessons/02-frontend/`. The shapes present are: landing + 4 full + 4 examples.

**Task:**
Recast the prose of every `.md` file in the entry directories below, in place, so each file reads as
Russian written by a Russian technical writer and satisfies rules R1–R11 in `_index.md` →
Conventions. The examples files keep their frozen headings, `### Решение` lines, fences and fence tags.

**Files:**

| Entry directory | Files | Shapes |
| --- | --- | --- |
| `29-react` | 9 | landing + 4 full + 4 examples |

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
- [ ] Command: `node tools/check-ru-style.mjs --diff --topic 02-frontend` → `0 structural differences`, exit 0
- [ ] Command: `node tools/check-ru-style.mjs --topic 02-frontend --strict` → no per-file warning naming any of the 9 files
- [ ] Command: `node tools/validate-content.mjs --topic 02-frontend --lang ru` → `0 error(s)`
- [ ] Command: `ls lessons/ru/02-frontend/29-react/*.md | wc -l` → 9 (one count per entry directory, in the order listed)
- [ ] Manual: the 9 files' `git diff` shows prose changes only — no frontmatter, heading, fence or id hunk

### WP-26: Recast 30-angular … 31-lighthouse

**Context:**
The 2 entry directories below hold 7 files under
`lessons/ru/02-frontend/`. Every one of them exists and has an English twin at the same relative path
under `lessons/02-frontend/`. The shapes present are: landing + 2 full + 2 examples; full + 1 examples.

**Task:**
Recast the prose of every `.md` file in the entry directories below, in place, so each file reads as
Russian written by a Russian technical writer and satisfies rules R1–R11 in `_index.md` →
Conventions. The examples files keep their frozen headings, `### Решение` lines, fences and fence tags.

**Files:**

| Entry directory | Files | Shapes |
| --- | --- | --- |
| `30-angular` | 5 | landing + 2 full + 2 examples |
| `31-lighthouse` | 2 | full + 1 examples |

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
- [ ] Command: `node tools/check-ru-style.mjs --diff --topic 02-frontend` → `0 structural differences`, exit 0
- [ ] Command: `node tools/check-ru-style.mjs --topic 02-frontend --strict` → no per-file warning naming any of the 7 files
- [ ] Command: `node tools/validate-content.mjs --topic 02-frontend --lang ru` → `0 error(s)`
- [ ] Command: `ls lessons/ru/02-frontend/30-angular/*.md | wc -l && ls lessons/ru/02-frontend/31-lighthouse/*.md | wc -l` → 5, 2 (one count per entry directory, in the order listed)
- [ ] Manual: the 7 files' `git diff` shows prose changes only — no frontmatter, heading, fence or id hunk

## Phase Verification

```bash
node tools/check-ru-style.mjs --topic 02-frontend
node tools/check-ru-style.mjs --diff --topic 02-frontend
node tools/validate-content.mjs --topic 02-frontend --lang ru
find lessons/ru/02-frontend -name '*.md' | wc -l
```

- [ ] Every work package's per-file `--strict` warnings are gone: the report lists no file in
      `02-frontend` with a blacklist hit or more than 3 copulas
- [ ] `--diff` exits 0 and every file's frontmatter, headings, fences, ids, numbers and literals are
      byte-identical to the baseline commit
- [ ] The validator reports `0 error(s)` for `--topic 02-frontend --lang ru`,
      and the file counts are still 133
- [ ] The corpus block's first five metrics have moved towards their targets, and the topic's own
      contribution is visible: `node tools/check-ru-style.mjs --topic 02-frontend`
- [ ] Manual: spot-read two files in this phase against their English twins. The Russian must not
      read as a sentence-for-sentence mirror, and no fact may have changed.
