# Phase 7: Product & Process (17 entries, 35 files)

## Objective

Write every `product-process` entry. Nineteen seed lines collapse into 17 entries:
three software-development umbrellas become one area page
(`product-process/software-development`) whose aliases carry the other two. This topic
is where the corpus's research material meets delivery practice —
`product-process/product-discovery` declares `design-ux/user-research` as a prereq,
which now exists. Four batches.

## Prerequisites

- Phase 6 complete and verified: `node tools/validate-content.mjs` reports
  `144 present, 33 pending, 0 error(s)`
- `design-ux/user-research` exists (Phase 6, WP-25) with its 4 children

## Shared Context

Read `lessons/AUTHORING.md` first. Read `lessons/design-ux/design-thinking/index.md` as
the pattern for a practice-heavy medium track and
`lessons/cs-fundamentals/pseudocode/index.md` for a short, concrete small entry.

Source: `seed/product-process.md` (read-only), sections `## Agile & delivery`,
`## Product`, `## Umbrella terms`.

**Topic-specific constraint:** process writing rots into jargon. Every entry must name
the artefact it produces (a backlog item, a roadmap, a requirements document, a
stakeholder map) and show one real example of it. Where a framework is named in a
title, the entry must state the failure mode as plainly as the benefit.

**Merge handling:** `product-process/software-development` carries the aliases
`Application Development`, `Software Development Life Cycle` and `SDLC`. Do not create
directories for those names.

Coverage for this topic: 17 entries, none written yet.

## Work Packages

### WP-31: Agile and delivery

**Context:**
Seven entries from `seed/product-process.md`, section `## Agile & delivery`, per
`tools/inventory.json`: `agile-methodology` (medium, alias `Agile`),
`agile-software-development` (small, prereq `product-process/agile-methodology`),
`scrum-software-development` (medium, prereq `product-process/agile-methodology`, alias
`Scrum`), `kanban` (small, prereq `product-process/agile-methodology`),
`user-story` (small, prereq `product-process/agile-methodology`),
`estimation-story-points` (small, prereq `product-process/user-story`, alias
`Story Points`), `jira-confluence` (small, prereq `product-process/agile-methodology`,
aliases `Jira`, `Confluence`). Two `medium` → 2 children each; five small → none.

**Task:**
Create these 11 files:

- `lessons/product-process/agile-methodology/index.md` + 2 children
- `lessons/product-process/agile-software-development/index.md` — full lesson
- `lessons/product-process/scrum-software-development/index.md` + 2 children
- `lessons/product-process/kanban/index.md` — full lesson
- `lessons/product-process/user-story/index.md` — full lesson
- `lessons/product-process/estimation-story-points/index.md` — full lesson
- `lessons/product-process/jira-confluence/index.md` — full lesson

**Files:**
- `lessons/product-process/agile-methodology/index.md`, `01-*.md`, `02-*.md` — CREATE
- `lessons/product-process/agile-software-development/index.md` — CREATE
- `lessons/product-process/scrum-software-development/index.md`, `01-*.md`, `02-*.md` — CREATE
- `lessons/product-process/kanban/index.md` — CREATE
- `lessons/product-process/user-story/index.md` — CREATE
- `lessons/product-process/estimation-story-points/index.md` — CREATE
- `lessons/product-process/jira-confluence/index.md` — CREATE

**Constraints:**
- DO: keep `agile-methodology` at the level of short iterations, working software over
  documentation, responding to change, per the seed line — the values — and keep
  `agile-software-development` as those values applied concretely by one engineering
  team, per the seed line. The seed deliberately lists both; make the difference
  visible in one sentence in each
- DO: make the `scrum-software-development` children the roles and ceremonies, then the
  backlog and sprint flow
- DO: make `kanban` about flow with work-in-progress limits and explain what a team
  gives up by having fewer meetings, per the seed line
- DO: make `estimation-story-points` explain why relative sizing helps and where it
  misleads, per the seed line
- DO: make `jira-confluence` about what the tracker and the wiki are actually for, and
  include one honest paragraph on tool-shaped process
- DO NOT: present Scrum as the default and the others as deviations
- DO NOT: include any external URL, including Atlassian product pages

**Success:**
- [ ] Validator: `node tools/validate-content.mjs --topic product-process` → `7 present, 10 pending, 0 error(s)`
- [ ] Both tracks have 2 children each:
  `ls lessons/product-process/{agile-methodology,scrum-software-development} | grep -c '^[0-9][0-9]-'` → `4`
- [ ] `scrum-software-development` title is verbatim from the inventory:
  `grep -c '^title: Scrum (Software Development)$' lessons/product-process/scrum-software-development/index.md` → `1`
- [ ] No external URL: `grep -rcE 'https?://' lessons/product-process/ | grep -v ':0'` → no output

---

### WP-32: Product, part 1

**Context:**
Four entries from `seed/product-process.md`, section `## Product`, per
`tools/inventory.json`: `product-management` (large, no prereqs),
`product-discovery` (medium, prereq `design-ux/user-research` — exists),
`roadmapping` (small, prereq `product-process/product-management`),
`prioritization-frameworks-rice-moscow` (small, prereq
`product-process/product-management`, aliases `RICE`, `MoSCoW`). One `large` → 4
children; one `medium` → 2 children; two small → none.

**Task:**
Create these 10 files:

- `lessons/product-process/product-management/index.md` + 4 children
- `lessons/product-process/product-discovery/index.md` + 2 children
- `lessons/product-process/roadmapping/index.md` — full lesson
- `lessons/product-process/prioritization-frameworks-rice-moscow/index.md` — full lesson

**Files:**
- `lessons/product-process/product-management/index.md`, `01-*.md` … `04-*.md` — CREATE
- `lessons/product-process/product-discovery/index.md`, `01-*.md`, `02-*.md` — CREATE
- `lessons/product-process/roadmapping/index.md` — CREATE
- `lessons/product-process/prioritization-frameworks-rice-moscow/index.md` — CREATE

**Constraints:**
- DO: make the product-management track cover the decision role (what to build and why,
  against a business goal, per the seed line), working with engineering and design, the
  evidence that qualifies a decision, and saying no — one child each, in that order
- DO: make `product-discovery`'s children research and experiments to find a solution
  worth building at all, per the seed line, and link back to `design-ux/user-research`
  rather than repeating its method material
- DO: make `roadmapping` about sequencing outcomes and themes over time rather than a
  fixed feature list, per the seed line — that contrast is the whole lesson
- DO: make the prioritization entry show RICE applied to four real candidate items and
  then show where the score is wrong and judgement must override it
- DO: keep the inventory title `Prioritization Frameworks (RICE / MoSCoW)` exactly as it
  is, with the American spelling of "Prioritization"
- DO NOT: turn the product-management track into a career-advice page — it is about the
  work, not the job title
- DO NOT: include any external URL

**Success:**
- [ ] Validator: `node tools/validate-content.mjs --topic product-process` → `11 present, 6 pending, 0 error(s)`
- [ ] `product-management` has 4 children: `ls lessons/product-process/product-management | grep -c '^[0-9][0-9]-'` → `4`
- [ ] `product-discovery`: `ls lessons/product-process/product-discovery | grep -c '^[0-9][0-9]-'` → `2`
- [ ] Its prereq now resolves: no missing-prereq message naming
      `design-ux/user-research` for `product-process/product-discovery`
- [ ] No external URL: `grep -rcE 'https?://' lessons/product-process/ | grep -v ':0'` → no output

---

### WP-33: Product, part 2

**Context:**
Five entries from `## Product` in `seed/product-process.md`, per
`tools/inventory.json`: `requirements-engineering` (medium),
`business-analysis` (medium), `stakeholder-management` (medium),
`user-acceptance-testing` (small, prereq `product-process/requirements-engineering`,
alias `UAT`), `technical-writing` (medium). Four `medium` → 2 children each; one small
→ none.

**Task:**
Create these 13 files:

- `lessons/product-process/requirements-engineering/index.md` + 2 children
- `lessons/product-process/business-analysis/index.md` + 2 children
- `lessons/product-process/stakeholder-management/index.md` + 2 children
- `lessons/product-process/user-acceptance-testing/index.md` — full lesson
- `lessons/product-process/technical-writing/index.md` + 2 children

**Files:**
- `lessons/product-process/requirements-engineering/index.md`, `01-*.md`, `02-*.md` — CREATE
- `lessons/product-process/business-analysis/index.md`, `01-*.md`, `02-*.md` — CREATE
- `lessons/product-process/stakeholder-management/index.md`, `01-*.md`, `02-*.md` — CREATE
- `lessons/product-process/user-acceptance-testing/index.md` — CREATE
- `lessons/product-process/technical-writing/index.md`, `01-*.md`, `02-*.md` — CREATE

**Constraints:**
- DO: make `requirements-engineering` about capturing what a system must do
  **testably and unambiguously**, per the seed line, with five badly written
  requirements rewritten as the exercise
- DO: make `business-analysis` about mapping processes, stakeholders and gaps *before* a
  solution is chosen, per the seed line, and keep it distinct from requirements
  engineering (which comes after the choice)
- DO: make `stakeholder-management` about keeping the people who can block or fund the
  work aligned and informed, per the seed line, with a power/interest map as the artefact
- DO: make `user-acceptance-testing` about the client confirming the built thing meets
  the agreed need, per the seed line, and include the failure mode where UAT becomes a
  second round of undisciplined requirements
- DO: make `technical-writing`'s children the structure of a spec or README and
  editing for the reader, and keep "a stranger can follow it" as the test
- DO NOT: reduce technical-writing to formatting or tooling
- DO NOT: include any external URL

**Success:**
- [ ] Validator: `node tools/validate-content.mjs --topic product-process` → `16 present, 1 pending, 0 error(s)`
- [ ] Four medium tracks with 2 children each:
  `ls lessons/product-process/{requirements-engineering,business-analysis,stakeholder-management,technical-writing} | grep -c '^[0-9][0-9]-'` → `8`
- [ ] No external URL: `grep -rcE 'https?://' lessons/product-process/ | grep -v ':0'` → no output

---

### WP-34: Software development umbrella

**Context:**
The final entry in this topic, and one of the corpus's 7 area pages.
`seed/product-process.md`, section `## Umbrella terms`, lists three entries —
"Software Development", "Application Development" and "Software Development Life
Cycle" — that name the whole discipline rather than one learnable skill. Per
`tools/inventory.json` they collapse into `product-process/software-development`
(area, tier small, no prereqs) with the aliases `Application Development`,
`Software Development Life Cycle`, `SDLC`.

**Task:**
Create `lessons/product-process/software-development/index.md` — an area page at
120-300 words. Its `## Included skills` list points at the entries this field is built
from: `cs-fundamentals/clean-code`, `cs-fundamentals/unit-testing`,
`cs-fundamentals/software-architecture`, `product-process/agile-methodology`,
`product-process/requirements-engineering`, `product-process/technical-writing`. Its
`## Where to start` names the order to read them in.

**Files:**
- `lessons/product-process/software-development/index.md` — CREATE — area page

**Constraints:**
- DO: state in `## What it covers` that this is the whole discipline seen from three
  angles — building software, delivering an application, and the phases from
  requirements through maintenance — and that the three seed names are one field
- DO: include all three aliases from the inventory
- DO: keep it a signpost: no `## Core ideas`, no `## Practice`, no children
- DO NOT: duplicate `product-process/agile-methodology` or
  `cs-fundamentals/software-architecture` content
- DO NOT: include any external URL

**Success:**
- [ ] Validator: `node tools/validate-content.mjs --topic product-process` → `17 present, 0 pending, 0 error(s)`
- [ ] File count for the topic: `find lessons/product-process -name '*.md' | wc -l` → `35`
- [ ] Area page shape: `grep -c '^## ' lessons/product-process/software-development/index.md` → `4`
- [ ] No children: `ls lessons/product-process/software-development | wc -l` → `1`
- [ ] Three aliases on one line:
  `grep -c 'aliases: \["Application Development".*"SDLC"\]' lessons/product-process/software-development/index.md` → `1`
- [ ] No external URL: `grep -rcE 'https?://' lessons/product-process/ | grep -v ':0'` → no output

---

## Phase Verification

After WP-31 through WP-34 are complete, run:

```bash
node tools/validate-content.mjs --topic product-process
node tools/validate-content.mjs
find lessons/product-process -name '*.md' | wc -l
ls -d lessons/product-process/*/ | wc -l
```

- [ ] Topic is complete: `17 present, 0 pending, 0 error(s)` for `--topic product-process`
- [ ] Global run exits 0 and reports `161 present, 16 pending, 0 error(s)`
- [ ] Exactly 17 directories under `lessons/product-process/` — no alias-only directories
- [ ] 35 files under `lessons/product-process/`
- [ ] Manual spot-check: read
      `lessons/product-process/prioritization-frameworks-rice-moscow/index.md` and
      confirm the RICE example ends with a case where the score is overridden by
      judgement — if it reads as a formula to apply blindly, rewrite it
