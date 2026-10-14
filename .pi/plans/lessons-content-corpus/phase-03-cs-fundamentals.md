# Phase 3: CS Fundamentals (27 entries, 63 files)

## Objective

Write every `cs-fundamentals` entry. This topic carries the corpus's foundational
layer: the two `large` entries here (`software-architecture`) and the language-level
testing chain are prereqs for later design and product entries. Four batches, one per
seed section. `cs-fundamentals/pseudocode` is already written (WP-4).

## Prerequisites

- Phase 2 complete and verified: `node tools/validate-content.mjs --topic frontend`
  reports `31 present, 0 pending, 0 error(s)`
- `lessons/AUTHORING.md` unchanged since Phase 1 (if the user's review gate changed it,
  re-read it and re-check one Phase 2 lesson against the new wording)

## Shared Context

Read `lessons/AUTHORING.md` first. Shape references:
`lessons/cs-fundamentals/pseudocode/index.md` (small),
`lessons/frontend/react/index.md` + `01-rendering-and-jsx.md` (landing + full lesson),
`lessons/frontend/css/index.md` (large track landing).

Source: `seed/cs-fundamentals.md` (read-only), sections `## Core computer science`,
`## Code quality`, `## Testing & debugging`, `## Environment & tooling`.

Coverage for this topic: 27 entries = 1 already written (`pseudocode`) + 26 here.
Cross-topic prereqs into this topic exist from Phase 2 (`frontend/browser-compatibility`
is not a prereq, but later phases link here often) — do not rename anything.

## Work Packages

### WP-12: Core computer science

**Context:**
Eight entries from `seed/cs-fundamentals.md`, section `## Core computer science`, per
`tools/inventory.json`: `computer-science` (area), `data-structures` (medium),
`algorithms-big-o` (medium, prereq `cs-fundamentals/data-structures`),
`operating-systems` (medium, prereq `cs-fundamentals/data-structures`),
`computer-networks` (medium), `database-internals` (small, prereq
`backend-data/sql-relational-databases`),
`concurrency-async-programming` (medium), `regular-expressions-regex` (small, alias
`Regex`). Three `medium` entries → 2 children each; three small entries + one area →
no children. `database-internals` is the first cross-topic edge into `backend-data`,
whose entries do not exist yet — the validator reports it as **pending**, not an error.

**Task:**
Create these 18 files:

- `lessons/cs-fundamentals/computer-science/index.md` — area page
- `lessons/cs-fundamentals/data-structures/index.md` + 2 children
- `lessons/cs-fundamentals/algorithms-big-o/index.md` + 2 children
- `lessons/cs-fundamentals/operating-systems/index.md` + 2 children
- `lessons/cs-fundamentals/computer-networks/index.md` + 2 children
- `lessons/cs-fundamentals/database-internals/index.md` — full lesson
- `lessons/cs-fundamentals/concurrency-async-programming/index.md` + 2 children
- `lessons/cs-fundamentals/regular-expressions-regex/index.md` — full lesson

**Files:**
- `lessons/cs-fundamentals/computer-science/index.md` — CREATE — area page (4 sections)
- `lessons/cs-fundamentals/data-structures/index.md`, `01-*.md`, `02-*.md` — CREATE
- `lessons/cs-fundamentals/algorithms-big-o/index.md`, `01-*.md`, `02-*.md` — CREATE
- `lessons/cs-fundamentals/operating-systems/index.md`, `01-*.md`, `02-*.md` — CREATE
- `lessons/cs-fundamentals/computer-networks/index.md`, `01-*.md`, `02-*.md` — CREATE
- `lessons/cs-fundamentals/database-internals/index.md` — CREATE
- `lessons/cs-fundamentals/concurrency-async-programming/index.md`, `01-*.md`, `02-*.md` — CREATE
- `lessons/cs-fundamentals/regular-expressions-regex/index.md` — CREATE

**Constraints:**
- DO: write for a self-taught developer who will not take a CS course — every entry
  must answer "when does this change what I write?"
- DO: keep `computer-networks` about packets, TCP/IP, ports and DNS as the seed says,
  and let `cloud-devops/networking-fundamentals-http-dns-tls` own the HTTP/TLS layer
  (Phase 4) — reference it in `## Go deeper`
- DO: make `database-internals` about storage engines, indexes and query planners per
  the seed line, with an explicit note that `backend-data/sql-relational-databases` is
  pending and should be read first
- DO: give `regular-expressions-regex` the alias `["Regex"]` and keep it practical:
  validation, search, extraction, and catastrophic backtracking
- DO: give `computer-science` the alias `["CS"]` and an `## Included skills` list of
  `data-structures`, `algorithms-big-o`, `operating-systems`, `computer-networks`,
  `database-internals`, `concurrency-async-programming`
- DO NOT: write academic proofs or Big-O formalisms beyond what a working developer
  needs to choose a data structure
- DO NOT: include any external URL

**Success:**
- [ ] Validator: `node tools/validate-content.mjs --topic cs-fundamentals` → `9 present, 18 pending, 0 error(s)`
- [ ] Five tracks with 2 children each: `ls lessons/cs-fundamentals/{data-structures,algorithms-big-o,operating-systems,computer-networks,concurrency-async-programming} | grep -c '^[0-9][0-9]-'` → `10`
- [ ] `ls lessons/cs-fundamentals/computer-science | wc -l` → `1`
- [ ] No external URL: `grep -rcE 'https?://' lessons/cs-fundamentals/ | grep -v ':0'` → no output

---

### WP-13: Code quality

**Context:**
Seven entries from `seed/cs-fundamentals.md`, section `## Code quality`, per
`tools/inventory.json`: `clean-code` (medium), `code-reusability` (small, prereq
`cs-fundamentals/clean-code`), `refactoring` (medium, prereqs `cs-fundamentals/clean-code`,
`cs-fundamentals/unit-testing`), `design-patterns` (medium, prereq
`cs-fundamentals/solid-principles`), `solid-principles` (small, alias `SOLID`),
`code-review` (medium, prereq `cs-fundamentals/clean-code`),
`software-architecture` (large, prereqs `cs-fundamentals/design-patterns`,
`cs-fundamentals/clean-code`). Three `medium` entries → 2 children each; one `large` →
4 children; two small → none.

**Task:**
Create these 19 files:

- `lessons/cs-fundamentals/clean-code/index.md` + 2 children
- `lessons/cs-fundamentals/code-reusability/index.md` — full lesson
- `lessons/cs-fundamentals/refactoring/index.md` + 2 children
- `lessons/cs-fundamentals/design-patterns/index.md` + 2 children
- `lessons/cs-fundamentals/solid-principles/index.md` — full lesson
- `lessons/cs-fundamentals/code-review/index.md` + 2 children
- `lessons/cs-fundamentals/software-architecture/index.md` + 4 children

**Files:**
- `lessons/cs-fundamentals/clean-code/index.md`, `01-*.md`, `02-*.md` — CREATE
- `lessons/cs-fundamentals/code-reusability/index.md` — CREATE
- `lessons/cs-fundamentals/refactoring/index.md`, `01-*.md`, `02-*.md` — CREATE
- `lessons/cs-fundamentals/design-patterns/index.md`, `01-*.md`, `02-*.md` — CREATE
- `lessons/cs-fundamentals/solid-principles/index.md` — CREATE
- `lessons/cs-fundamentals/code-review/index.md`, `01-*.md`, `02-*.md` — CREATE
- `lessons/cs-fundamentals/software-architecture/index.md`, `01-*.md` … `04-*.md` — CREATE

**Constraints:**
- DO: make `refactoring` procedural per the seed — small verified steps, behaviour
  unchanged, tests as the safety net — and note that its prereq
  `cs-fundamentals/unit-testing` is pending
- DO: present `design-patterns` as named solutions to recurring problems with the
  cost of each, not a catalogue to apply everywhere; cap it at the handful that earn
  their keep
- DO: make `software-architecture`'s four children cover boundaries and coupling,
  data and state ownership, deployment shape, and documenting decisions
- DO: keep `code-reusability` about factoring shared behaviour once *without*
  over-abstracting, per the seed line — that tension is the lesson
- DO: make `code-review` about reading a diff for correctness, clarity and risk, with
  a concrete review checklist as the `## Practice` exercise
- DO NOT: make `software-architecture` a survey of named architectures (microservices,
  event-driven, …) — that belongs to `backend-data/microservices` in Phase 5
- DO NOT: include any external URL

**Success:**
- [ ] Validator: `node tools/validate-content.mjs --topic cs-fundamentals` → `16 present, 11 pending, 0 error(s)`
- [ ] Four tracks with 2 children and one with 4:
  `ls lessons/cs-fundamentals/software-architecture | grep -c '^[0-9][0-9]-'` → `4` and
  `ls lessons/cs-fundamentals/{clean-code,refactoring,design-patterns,code-review} | grep -c '^[0-9][0-9]-'` → `8`
- [ ] No external URL: `grep -rcE 'https?://' lessons/cs-fundamentals/ | grep -v ':0'` → no output

---

### WP-14: Testing and debugging

**Context:**
Six entries from `seed/cs-fundamentals.md`, section `## Testing & debugging`, per
`tools/inventory.json`: `unit-testing` (medium), `test-driven-development-tdd`
(medium, prereq `cs-fundamentals/unit-testing`, alias `TDD`), `integration-testing`
(medium, prereq `cs-fundamentals/unit-testing`), `end-to-end-testing` (medium, prereq
`cs-fundamentals/integration-testing`, alias `E2E`), `playwright` (small, prereq
`cs-fundamentals/end-to-end-testing`), `debugging` (medium). Five `medium` entries →
2 children each; one small → none.

The seed's `skills.md` records a deliberate editorial position: unit, integration and
end-to-end testing are **genuinely three different skills**, not one skill with three
names. Keep them separate and make the boundary explicit in each.

**Task:**
Create these 16 files:

- `lessons/cs-fundamentals/unit-testing/index.md` + 2 children
- `lessons/cs-fundamentals/test-driven-development-tdd/index.md` + 2 children
- `lessons/cs-fundamentals/integration-testing/index.md` + 2 children
- `lessons/cs-fundamentals/end-to-end-testing/index.md` + 2 children
- `lessons/cs-fundamentals/playwright/index.md` — full lesson
- `lessons/cs-fundamentals/debugging/index.md` + 2 children

**Files:**
- `lessons/cs-fundamentals/unit-testing/index.md`, `01-*.md`, `02-*.md` — CREATE
- `lessons/cs-fundamentals/test-driven-development-tdd/index.md`, `01-*.md`, `02-*.md` — CREATE
- `lessons/cs-fundamentals/integration-testing/index.md`, `01-*.md`, `02-*.md` — CREATE
- `lessons/cs-fundamentals/end-to-end-testing/index.md`, `01-*.md`, `02-*.md` — CREATE
- `lessons/cs-fundamentals/playwright/index.md` — CREATE
- `lessons/cs-fundamentals/debugging/index.md`, `01-*.md`, `02-*.md` — CREATE

**Constraints:**
- DO: state the boundary explicitly in each testing entry's `## What it is` — unit
  tests one unit in isolation, integration crosses a real boundary, end-to-end drives
  the whole system — and cross-reference the others in `## Go deeper`
- DO: make `debugging` systematic per the seed line — reproduce, isolate, fix the
  cause not the symptom — with a worked example of a false hypothesis
- DO: keep `playwright` as the modern browser-automation tool for E2E and
  cross-browser work, with one small runnable test as the `## Practice` exercise; do
  not turn it into a framework tour
- DO: keep `test-driven-development-tdd` about the red-green-refactor loop and where it
  does and does not pay off
- DO NOT: prescribe a specific test runner or assertion library as the only choice —
  the entries are framework-agnostic
- DO NOT: include any external URL, including `playwright.dev`

**Success:**
- [ ] Validator: `node tools/validate-content.mjs --topic cs-fundamentals` → `22 present, 5 pending, 0 error(s)`
- [ ] Five tracks with 2 children each: `ls lessons/cs-fundamentals/{unit-testing,test-driven-development-tdd,integration-testing,end-to-end-testing,debugging} | grep -c '^[0-9][0-9]-'` → `10`
- [ ] The three testing entries each name the other two in `## Go deeper`:
  `grep -c 'cs-fundamentals/' lessons/cs-fundamentals/unit-testing/index.md lessons/cs-fundamentals/integration-testing/index.md lessons/cs-fundamentals/end-to-end-testing/index.md` → `≥1` for each
- [ ] No external URL: `grep -rcE 'https?://' lessons/cs-fundamentals/ | grep -v ':0'` → no output

---

### WP-15: Environment and tooling

**Context:**
Five entries from `seed/cs-fundamentals.md`, section `## Environment & tooling`, per
`tools/inventory.json`: `git` (medium), `git-branching-strategies` (small, prereq
`cs-fundamentals/git`), `github` (small, prereq `cs-fundamentals/git`), `unix-shell`
(medium, alias `Bash`), `command-line-interface` (small, prereq
`cs-fundamentals/unix-shell`, alias `CLI`). Two `medium` entries → 2 children each;
three small → none.

**Task:**
Create these 9 files:

- `lessons/cs-fundamentals/git/index.md` + 2 children
- `lessons/cs-fundamentals/git-branching-strategies/index.md` — full lesson
- `lessons/cs-fundamentals/github/index.md` — full lesson
- `lessons/cs-fundamentals/unix-shell/index.md` + 2 children
- `lessons/cs-fundamentals/command-line-interface/index.md` — full lesson

**Files:**
- `lessons/cs-fundamentals/git/index.md`, `01-*.md`, `02-*.md` — CREATE
- `lessons/cs-fundamentals/git-branching-strategies/index.md` — CREATE
- `lessons/cs-fundamentals/github/index.md` — CREATE
- `lessons/cs-fundamentals/unix-shell/index.md`, `01-*.md`, `02-*.md` — CREATE
- `lessons/cs-fundamentals/command-line-interface/index.md` — CREATE

**Constraints:**
- DO: title `git` exactly as the inventory has it — `Git (Version Control System)` —
  even though the slug is `git`
- DO: make `git`'s children cover the object model and history, then the daily
  workflow (commit, branch, merge, rebase, undo)
- DO: make `git-branching-strategies` a genuine comparison — trunk-based versus
  GitFlow — and state when each is appropriate, per the seed line
- DO: keep `unix-shell` about pipelines, files, permissions and environment, and
  `command-line-interface` about *working fluently* in a terminal instead of through
  GUIs — the second is the habit, the first is the toolset
- DO: note in `github` that hosting, pull requests, issues and CI are the subject;
  CI belongs to `cloud-devops/github-actions` in Phase 4, so cross-reference it
- DO NOT: write a Git command cheat-sheet without explanation — each command named
  must be tied to the problem it solves
- DO NOT: include any external URL

**Success:**
- [ ] Validator: `node tools/validate-content.mjs --topic cs-fundamentals` → `27 present, 0 pending, 0 error(s)`
- [ ] File count for the topic: `find lessons/cs-fundamentals -name '*.md' | wc -l` → `53`
- [ ] Two tracks with 2 children each: `ls lessons/cs-fundamentals/{git,unix-shell} | grep -c '^[0-9][0-9]-'` → `4`
- [ ] `git` keeps its inventory title: `grep -c '^title: Git (Version Control System)$' lessons/cs-fundamentals/git/index.md` → `1`
- [ ] No external URL: `grep -rcE 'https?://' lessons/cs-fundamentals/ | grep -v ':0'` → no output

---

## Phase Verification

After WP-12 through WP-15 are complete, run:

```bash
node tools/validate-content.mjs --topic cs-fundamentals
node tools/validate-content.mjs
git status --short
```

- [ ] Topic is complete: `27 present, 0 pending, 0 error(s)` for `--topic cs-fundamentals`
- [ ] Global run exits 0 and reports `58 present, 119 pending, 0 error(s)`
- [ ] 63 files under `lessons/cs-fundamentals/`
- [ ] Only expected paths changed: `git status --short` shows `lessons/**` additions
      and nothing under `seed/`
- [ ] Manual spot-check: read `lessons/cs-fundamentals/software-architecture/index.md`
      and one of its children — the largest entry in the topic — and confirm the four
      children partition the topic without overlap
