# Phase 8: 07-security, 08-soft-skills and the audit

## Objective

Recast the Russian files of `lessons/ru/07-security/` and `lessons/ru/08-soft-skills/` —
47 files in 5 work packages. This phase covers 07-security and 08-soft-skills:
the two smallest topics plus the corpus-wide audit that closes the plan.

## Prerequisites

- Phase 1 complete, and the user has approved the calibration voice. Do not start this phase without
  that approval.
- `node tools/check-ru-style.mjs --diff` exits 0 over the whole corpus.
- `node tools/validate-content.mjs --strict --lang ru` reports
  `177 present, 0 pending, 297 examples, 0 examples pending, 0 error(s)` and exits 0.
- `lessons/AUTHORING.md` §14 exists and its target table matches `TARGETS` in
  `tools/check-ru-style.mjs`.
- No Russian file under `lessons/ru/07-security` or `lessons/ru/08-soft-skills` has been edited since
  the baseline commit, except the Phase 1 calibration file `08-soft-skills/01-communication/index.md`,
  which is the approved landing voice: verify it, never rewrite it.

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

### WP-69: Recast 01-web-security-owasp-top-10 … 03-secrets-management

**Context:**
The 3 entry directories below hold 12 files under
`lessons/ru/07-security/`. Every one of them exists and has an English twin at the same relative path
under `lessons/07-security/`. The shapes present are: landing + 2 full + 2 examples; full + 1 examples.

**Task:**
Recast the prose of every `.md` file in the entry directories below, in place, so each file reads as
Russian written by a Russian technical writer and satisfies rules R1–R11 in `_index.md` →
Conventions. The examples files keep their frozen headings, `### Решение` lines, fences and fence tags.

**Files:**

| Entry directory | Files | Shapes |
| --- | --- | --- |
| `01-web-security-owasp-top-10` | 5 | landing + 2 full + 2 examples |
| `02-https-tls` | 5 | landing + 2 full + 2 examples |
| `03-secrets-management` | 2 | full + 1 examples |

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
- [ ] Command: `node tools/check-ru-style.mjs --diff --topic 07-security` → `0 structural differences`, exit 0
- [ ] Command: `node tools/check-ru-style.mjs --topic 07-security --strict` → no per-file warning naming any of the 12 files
- [ ] Command: `node tools/validate-content.mjs --topic 07-security --lang ru` → `0 error(s)`
- [ ] Command: `ls lessons/ru/07-security/01-web-security-owasp-top-10/*.md | wc -l && ls lessons/ru/07-security/02-https-tls/*.md | wc -l && ls lessons/ru/07-security/03-secrets-management/*.md | wc -l` → 5, 5, 2 (one count per entry directory, in the order listed)
- [ ] Manual: the 12 files' `git diff` shows prose changes only — no frontmatter, heading, fence or id hunk

### WP-70: Recast 04-dependency-scanning-sca … 07-data-ethics

**Context:**
The 4 entry directories below hold 11 files under
`lessons/ru/07-security/`. Every one of them exists and has an English twin at the same relative path
under `lessons/07-security/`. The shapes present are: full + 1 examples; landing + 2 full + 2 examples.

**Task:**
Recast the prose of every `.md` file in the entry directories below, in place, so each file reads as
Russian written by a Russian technical writer and satisfies rules R1–R11 in `_index.md` →
Conventions. The examples files keep their frozen headings, `### Решение` lines, fences and fence tags.

**Files:**

| Entry directory | Files | Shapes |
| --- | --- | --- |
| `04-dependency-scanning-sca` | 2 | full + 1 examples |
| `05-gdpr-data-privacy` | 5 | landing + 2 full + 2 examples |
| `06-content-security-policy-csp` | 2 | full + 1 examples |
| `07-data-ethics` | 2 | full + 1 examples |

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
- [ ] Command: `node tools/check-ru-style.mjs --diff --topic 07-security` → `0 structural differences`, exit 0
- [ ] Command: `node tools/check-ru-style.mjs --topic 07-security --strict` → no per-file warning naming any of the 11 files
- [ ] Command: `node tools/validate-content.mjs --topic 07-security --lang ru` → `0 error(s)`
- [ ] Command: `ls lessons/ru/07-security/04-dependency-scanning-sca/*.md | wc -l && ls lessons/ru/07-security/05-gdpr-data-privacy/*.md | wc -l && ls lessons/ru/07-security/06-content-security-policy-csp/*.md | wc -l && ls lessons/ru/07-security/07-data-ethics/*.md | wc -l` → 2, 5, 2, 2 (one count per entry directory, in the order listed)
- [ ] Manual: the 11 files' `git diff` shows prose changes only — no frontmatter, heading, fence or id hunk

### WP-71: Recast 01-communication … 04-problem-solving

**Context:**
The 4 entry directories below hold 11 files under
`lessons/ru/08-soft-skills/`. Every one of them exists and has an English twin at the same relative path
under `lessons/08-soft-skills/`. The shapes present are: landing + 2 full + 2 examples; full + 1 examples.

**Task:**
Recast the prose of every `.md` file in the entry directories below, in place, so each file reads as
Russian written by a Russian technical writer and satisfies rules R1–R11 in `_index.md` →
Conventions. The examples files keep their frozen headings, `### Решение` lines, fences and fence tags.

**Files:**

| Entry directory | Files | Shapes |
| --- | --- | --- |
| `01-communication` | 5 | landing + 2 full + 2 examples — `index.md` is the Phase 1 calibration exemplar; verify, do not rewrite |
| `02-teamwork-collaboration` | 2 | full + 1 examples |
| `03-mentoring` | 2 | full + 1 examples |
| `04-problem-solving` | 2 | full + 1 examples |

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
- [ ] Command: `node tools/check-ru-style.mjs --diff --topic 08-soft-skills` → `0 structural differences`, exit 0
- [ ] Command: `node tools/check-ru-style.mjs --topic 08-soft-skills --strict` → no per-file warning naming any of the 11 files
- [ ] Command: `node tools/validate-content.mjs --topic 08-soft-skills --lang ru` → `0 error(s)`
- [ ] Command: `ls lessons/ru/08-soft-skills/01-communication/*.md | wc -l && ls lessons/ru/08-soft-skills/02-teamwork-collaboration/*.md | wc -l && ls lessons/ru/08-soft-skills/03-mentoring/*.md | wc -l && ls lessons/ru/08-soft-skills/04-problem-solving/*.md | wc -l` → 5, 2, 2, 2 (one count per entry directory, in the order listed)
- [ ] Manual: the 11 files' `git diff` shows prose changes only — no frontmatter, heading, fence or id hunk

### WP-72: Recast 05-time-management … 08-freelancing-client-work

**Context:**
The 3 entry directories below hold 9 files under
`lessons/ru/08-soft-skills/`. Every one of them exists and has an English twin at the same relative path
under `lessons/08-soft-skills/`. The shapes present are: full + 1 examples; landing + 2 full + 2 examples.

**Task:**
Recast the prose of every `.md` file in the entry directories below, in place, so each file reads as
Russian written by a Russian technical writer and satisfies rules R1–R11 in `_index.md` →
Conventions. The examples files keep their frozen headings, `### Решение` lines, fences and fence tags.

**Files:**

| Entry directory | Files | Shapes |
| --- | --- | --- |
| `05-time-management` | 2 | full + 1 examples |
| `06-portfolio-building` | 2 | full + 1 examples |
| `08-freelancing-client-work` | 5 | landing + 2 full + 2 examples |

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
- [ ] Command: `node tools/check-ru-style.mjs --diff --topic 08-soft-skills` → `0 structural differences`, exit 0
- [ ] Command: `node tools/check-ru-style.mjs --topic 08-soft-skills --strict` → no per-file warning naming any of the 9 files
- [ ] Command: `node tools/validate-content.mjs --topic 08-soft-skills --lang ru` → `0 error(s)`
- [ ] Command: `ls lessons/ru/08-soft-skills/05-time-management/*.md | wc -l && ls lessons/ru/08-soft-skills/06-portfolio-building/*.md | wc -l && ls lessons/ru/08-soft-skills/08-freelancing-client-work/*.md | wc -l` → 2, 2, 5 (one count per entry directory, in the order listed)
- [ ] Manual: the 9 files' `git diff` shows prose changes only — no frontmatter, heading, fence or id hunk

### WP-73: Recast 07-interview-prep-whiteboarding … 09-technical-presentation

**Context:**
The 2 entry directories below hold 4 files under
`lessons/ru/08-soft-skills/`. Every one of them exists and has an English twin at the same relative path
under `lessons/08-soft-skills/`. The shapes present are: full + 1 examples.

**Task:**
Recast the prose of every `.md` file in the entry directories below, in place, so each file reads as
Russian written by a Russian technical writer and satisfies rules R1–R11 in `_index.md` →
Conventions. The examples files keep their frozen headings, `### Решение` lines, fences and fence tags.

**Files:**

| Entry directory | Files | Shapes |
| --- | --- | --- |
| `07-interview-prep-whiteboarding` | 2 | full + 1 examples |
| `09-technical-presentation` | 2 | full + 1 examples |

All MODIFY. 4 files in total. No file is created, deleted or renamed.

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
- [ ] Command: `node tools/check-ru-style.mjs --diff --topic 08-soft-skills` → `0 structural differences`, exit 0
- [ ] Command: `node tools/check-ru-style.mjs --topic 08-soft-skills --strict` → no per-file warning naming any of the 4 files
- [ ] Command: `node tools/validate-content.mjs --topic 08-soft-skills --lang ru` → `0 error(s)`
- [ ] Command: `ls lessons/ru/08-soft-skills/07-interview-prep-whiteboarding/*.md | wc -l && ls lessons/ru/08-soft-skills/09-technical-presentation/*.md | wc -l` → 2, 2 (one count per entry directory, in the order listed)
- [ ] Manual: the 4 files' `git diff` shows prose changes only — no frontmatter, heading, fence or id hunk

### WP-74: Corpus audit — measure the result and record it

**Context:**
All 70 recast work packages (WP-4–WP-73) are done, together with WP-2's four calibration files. `tools/check-ru-style.mjs` is the instrument: report mode
measures the nine signals, `--diff` proves the non-prose text never moved, `--strict` makes a missed
target a failure. The baseline it has to be compared against is quoted verbatim in `_index.md` →
Global Context, and the targets are in the same section and in `lessons/AUTHORING.md` §14.

Plan B's audit could not be re-run because its script was deleted at the end of the plan. That
mistake is not repeated here: the audit is a durable tool plus one recorded result, not a throwaway
script. Nothing in this work package writes a new scratch file.

**Task:**
Run the gate over the whole corpus in all three modes, confirm every target is met, and append the
measured result to §14 of `lessons/AUTHORING.md` as a `### Measured result (<YYYY-MM-DD>)` block
containing the corpus block exactly as the gate printed it, followed by the one line
`node tools/check-ru-style.mjs --strict` exits 0 and `node tools/check-ru-style.mjs --diff` reports
0 structural differences.

Then verify the mirror is still intact with the two-list comparison below, and read five files - one
full lesson, one landing, one area page and one examples file from different topics - against their
English twins, confirming no number, claim or condition differs.

**Files:**

| File | Change |
| --- | --- |
| `lessons/AUTHORING.md` | MODIFY — append the measured-result block to §14 |
| `lessons/ru/**` | READ ONLY — the audit writes nothing under `lessons/ru/` |

**Constraints:**
- DO: run the audit over the whole corpus, with no `--topic` filter, so the corpus block is authoritative
- DO: record the raw output, not a summary of it. The numbers are the deliverable
- DO: keep the file count at 698 and the mirror identity at zero differences in either direction
- DO NOT: adjust `TARGETS`, `_index.md` or §14 to make a missed target pass. A missed target is a
  failed work package; report it and stop
- DO NOT: write a scratch audit script, and do not create a file under `lessons/ru/`
- DO NOT: promote any entry to `status: reviewed`. That is the user's action, not this plan's

**Success:**
- [ ] Command: `node tools/check-ru-style.mjs --strict` → exit 0, and every line of the corpus block is at or past its target
- [ ] Command: `node tools/check-ru-style.mjs --diff` → `0 structural differences`, exit 0
- [ ] Command: `node tools/validate-content.mjs --strict --lang ru` → `177 present, 0 pending, 297 examples, 0 examples pending, 0 error(s)`, exit 0
- [ ] Command: `node tools/validate-content.mjs --strict --lang en` → the same five-part line, exit 0
- [ ] Command: the two-list mirror comparison in the Phase Verification block → `diff` prints nothing, and both list files hold 698 lines
- [ ] Command: `grep -n 'Measured result' lessons/AUTHORING.md` → 1 match, in §14
- [ ] Manual: five spot-read files, one per shape across at least three topics, checked against their English twins for fact drift

### WP-75: Final gates and handover

**Context:**
The recast changes prose only, so no title changed and `lessons/INDEX.md` and `lessons/ru/INDEX.md`
are already correct — regenerating them must produce no diff. That is a cheap proof that the titles,
which V17, the index and the site all depend on, survived the pass.

This work package is the handover. The user owns git; the executor never commits.

**Task:**
Run the final gate set, confirm `--write-index` is a no-op for both roots, sweep and delete `.tmp/`
entirely, and report the result to the user: the corpus block before and after, the file counts, the
validator lines, and the list of files changed by the plan.

**Files:**

| File | Change |
| --- | --- |
| `lessons/INDEX.md`, `lessons/ru/INDEX.md` | REGENERATE — must produce no diff |
| `.tmp/` | DELETE — every scratch file left by any writer |

**Constraints:**
- DO: delete `.tmp/` with `rm -rf .tmp/`, and verify it is gone with `ls -d .tmp`
- DO: check the two generated indexes for a diff *after* regenerating them, in both roots
- DO: report the model that ran the pass and any work package that missed a target
- DO NOT: commit, push, tag or stage anything. Report and stop
- DO NOT: leave a scratch script behind anywhere in the repository
- DO NOT: leave `lessons/ru/**` with any file at a status other than `drafted`

**Success:**
- [ ] Command: `node tools/validate-content.mjs --write-index --lang en && node tools/validate-content.mjs --write-index --lang ru` → both exit 0
- [ ] Command: `git diff --stat -- lessons/INDEX.md lessons/ru/INDEX.md` → no output (the indexes are byte-identical)
- [ ] Command: `rm -rf .tmp/ && ls -d .tmp` → `No such file or directory`
- [ ] Command: `git status --short` → only modifications under `lessons/ru/`, plus `lessons/AUTHORING.md` and `tools/check-ru-style.mjs`; no untracked file
- [ ] Command: `grep -rc 'status: drafted' lessons/ru/*/*/index.md | grep -v ':1$'` → no output (every entry index is `drafted`)
- [ ] Manual: the user is told the plan is complete and the working tree is theirs to commit

## Phase Verification

```bash
node tools/check-ru-style.mjs --topic 07-security
node tools/check-ru-style.mjs --topic 08-soft-skills
node tools/check-ru-style.mjs --diff --topic 07-security
node tools/check-ru-style.mjs --diff --topic 08-soft-skills
node tools/validate-content.mjs --topic 07-security --lang ru
node tools/validate-content.mjs --topic 08-soft-skills --lang ru
find lessons/ru/07-security -name '*.md' | wc -l
find lessons/ru/08-soft-skills -name '*.md' | wc -l
node tools/check-ru-style.mjs
node tools/check-ru-style.mjs --strict
node tools/check-ru-style.mjs --diff
node tools/validate-content.mjs --strict --lang ru
node tools/validate-content.mjs --strict --lang en
find lessons -name '*.md' -not -path 'lessons/ru/*' -not -name 'INDEX.md' | sed 's|lessons/||' | sort > .tmp/en.txt
find lessons/ru -name '*.md' -not -name 'INDEX.md' -not -name 'GLOSSARY.md' | sed 's|lessons/ru/||' | sort > .tmp/ru.txt
diff .tmp/en.txt .tmp/ru.txt
wc -l .tmp/en.txt .tmp/ru.txt
rm -rf .tmp/
```

- [ ] Every work package's per-file `--strict` warnings are gone: the report lists no file in
      `07-security` or `08-soft-skills` with a blacklist hit or more than 3 copulas
- [ ] `--diff` exits 0 and every file's frontmatter, headings, fences, ids, numbers and literals are
      byte-identical to the baseline commit
- [ ] The validator reports `0 error(s)` for `--topic 07-security --lang ru` and `--topic 08-soft-skills --lang ru`,
      and the file counts are still 23 and 24
- [ ] The corpus block's first five metrics have moved towards their targets, and the topic's own
      contribution is visible: `node tools/check-ru-style.mjs --topic 07-security`
- [ ] Manual: spot-read two files in this phase against their English twins. The Russian must not
      read as a sentence-for-sentence mirror, and no fact may have changed.
- [ ] WP-74: the corpus block is recorded in `lessons/AUTHORING.md` §14, and `--strict` exits 0
- [ ] WP-75: both generated indexes are byte-identical after `--write-index`, `.tmp/` is gone, and
      `git status --short` lists no untracked file
- [ ] The two-list mirror comparison prints nothing and both lists hold 698 lines
