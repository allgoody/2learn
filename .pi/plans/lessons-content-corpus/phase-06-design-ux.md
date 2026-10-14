# Phase 6: Design & UX (44 entries, 88 files)

## Objective

Write every `design-ux` entry — the largest topic in the corpus by entry count (44)
and the most diverse (research, structure, interaction, visual design, systems,
evaluation and tools). Forty-seven seed lines collapse into 44 entries: the four UI/UX
umbrella wordings become one area page (`design-ux/ui-ux-design`) whose aliases carry
the other three, and that page is already written (WP-6). Seven batches.

This topic also resolves three cross-topic prereqs declared by Phase 7 later
(`design-ux/user-research` for `product-process/product-discovery`) and two declared
by `frontend`/`design-ux` itself.

## Prerequisites

- Phase 5 complete and verified: `node tools/validate-content.mjs` reports
  `100 present, 77 pending, 0 error(s)`
- `lessons/design-ux/ui-ux-design/index.md` exists (WP-6) and lists
  `design-ux/user-research`, `design-ux/information-architecture`,
  `design-ux/interaction-design`, `design-ux/visual-design`,
  `design-ux/usability-testing` in its `## Included skills` — those five must all
  exist before this phase verifies clean

## Shared Context

Read `lessons/AUTHORING.md` first. Read `lessons/design-ux/ui-ux-design/index.md` as
the area-page pattern, `lessons/design-ux/…` (none yet) — for landing and full-lesson
patterns use `lessons/frontend/react/index.md`,
`lessons/frontend/react/01-rendering-and-jsx.md` and
`lessons/frontend/ui-components/index.md`.

Source: `seed/design-ux.md` (read-only), sections `## Foundations & process`,
`## Research`, `## Content & writing`, `## Structure & interaction`, `## Visual design`,
`## Design systems`, `## Evaluation`, `## Tools`, `## Umbrella terms`.

**Topic-specific constraint:** this material is easiest to write as abstract advice.
Every entry must carry at least one worked example with real artefacts — a script
fragment, a question list, a grid, a before/after. Abstract design prose fails the
spirit of the corpus even when it passes the validator.

**Merge handling:** `design-ux/ui-ux-design` already carries the four umbrella aliases.
Do not create directories for `ui`, `ux`, `user-experience` or `user-experience-design`.

Coverage for this topic: 44 entries = 1 already written (`ui-ux-design`) + 43 here.

## Work Packages

### WP-24: Foundations and process

**Context:**
Eight entries from `seed/design-ux.md`, section `## Foundations & process`, per
`tools/inventory.json`: `design-thinking` (medium),
`user-centered-design` (small, prereq `design-ux/design-thinking`, alias
`User-Centred Design`), `lean-ux` (small, prereq `design-ux/user-centered-design`),
`jobs-to-be-done` (small, prereq `design-ux/user-research`, alias `JTBD`),
`service-design` (medium, prereq `design-ux/journey-mapping`),
`facilitation-workshop-design` (small), `storyboarding` (small, prereq
`design-ux/sketching`), `sketching` (small). Two `medium` → 2 children each; six small
→ none.

Two forward references: `jobs-to-be-done` needs `design-ux/user-research` and
`service-design` needs `design-ux/journey-mapping`, both written in WP-25. The
validator reports them as pending, not errors.

**Task:**
Create these 12 files:

- `lessons/design-ux/design-thinking/index.md` + 2 children
- `lessons/design-ux/user-centered-design/index.md` — full lesson
- `lessons/design-ux/lean-ux/index.md` — full lesson
- `lessons/design-ux/jobs-to-be-done/index.md` — full lesson
- `lessons/design-ux/service-design/index.md` + 2 children
- `lessons/design-ux/facilitation-workshop-design/index.md` — full lesson
- `lessons/design-ux/storyboarding/index.md` — full lesson
- `lessons/design-ux/sketching/index.md` — full lesson

**Files:**
- `lessons/design-ux/design-thinking/index.md`, `01-*.md`, `02-*.md` — CREATE
- `lessons/design-ux/user-centered-design/index.md` — CREATE
- `lessons/design-ux/lean-ux/index.md` — CREATE
- `lessons/design-ux/jobs-to-be-done/index.md` — CREATE
- `lessons/design-ux/service-design/index.md`, `01-*.md`, `02-*.md` — CREATE
- `lessons/design-ux/facilitation-workshop-design/index.md` — CREATE
- `lessons/design-ux/storyboarding/index.md` — CREATE
- `lessons/design-ux/sketching/index.md` — CREATE

**Constraints:**
- DO: make `design-thinking`'s children the empathise-define-ideate loop and the
  prototype-test loop, keeping the five-stage framing from the seed line
- DO: make `jobs-to-be-done` about framing a need as the job the user hires the product
  to do, per the seed line, with a worked "job statement" as the exercise and an
  explicit note that its prereq `design-ux/user-research` is pending until WP-25
- DO: make `sketching` about speed and disposable drawings — that is why the seed puts
  it before `storyboarding`
- DO: put a real, runnable workshop script in `facilitation-workshop-design` — a timed
  agenda with prompts — not advice about workshops
- DO: give `user-centered-design` the alias `["User-Centred Design"]` and treat the
  spelling difference as a naming convention, not a different idea
- DO NOT: re-teach `design-ux/user-research` inside `jobs-to-be-done` or `service-design`
- DO NOT: include any external URL

**Success:**
- [ ] Validator: `node tools/validate-content.mjs --topic design-ux` → `9 present, 35 pending, 0 error(s)`
- [ ] Two tracks with 2 children each: `ls lessons/design-ux/{design-thinking,service-design} | grep -c '^[0-9][0-9]-'` → `4`
- [ ] No alias-only directories: `ls -d lessons/design-ux/ui lessons/design-ux/ux lessons/design-ux/user-experience lessons/design-ux/user-experience-design 2>&1 | grep -c 'No such file'` → `4`
- [ ] No external URL: `grep -rcE 'https?://' lessons/design-ux/ | grep -v ':0'` → no output

---

### WP-25: Research, part 1

**Context:**
Six entries from `seed/design-ux.md`, section `## Research`, per
`tools/inventory.json`: `user-research` (large, no prereqs),
`ui-ux-research` (small, prereq `design-ux/user-research`), `design-research` (small,
prereq `design-ux/user-research`), `user-interviews` (medium, prereq
`design-ux/user-research`), `survey-design` (medium, prereq `design-ux/user-research`),
`card-sorting` (small, prereq `design-ux/information-architecture`). One `large` → 4
children; two `medium` → 2 each; three small → none. `card-sorting`'s prereq
`design-ux/information-architecture` is written in WP-27 — pending, not an error.

This batch resolves the two forward references left by WP-24.

**Task:**
Create these 14 files:

- `lessons/design-ux/user-research/index.md` + 4 children
- `lessons/design-ux/ui-ux-research/index.md` — full lesson
- `lessons/design-ux/design-research/index.md` — full lesson
- `lessons/design-ux/user-interviews/index.md` + 2 children
- `lessons/design-ux/survey-design/index.md` + 2 children
- `lessons/design-ux/card-sorting/index.md` — full lesson

**Files:**
- `lessons/design-ux/user-research/index.md`, `01-*.md` … `04-*.md` — CREATE
- `lessons/design-ux/ui-ux-research/index.md` — CREATE
- `lessons/design-ux/design-research/index.md` — CREATE
- `lessons/design-ux/user-interviews/index.md`, `01-*.md`, `02-*.md` — CREATE
- `lessons/design-ux/survey-design/index.md`, `01-*.md`, `02-*.md` — CREATE
- `lessons/design-ux/card-sorting/index.md` — CREATE

**Constraints:**
- DO: make the user-research track cover choosing a method, recruiting participants,
  running a session, and turning findings into decisions — one child each, in that
  order
- DO: make `survey-design` about writing neutral questions that measure what you think
  they measure, per the seed line, with three leading questions rewritten as the
  exercise
- DO: make `user-interviews` concrete: the interview script, the follow-up question,
  and the trap of asking about future behaviour instead of past behaviour
- DO: distinguish `ui-ux-research` (the interface: what works, what confuses) from
  `design-research` (users, context, existing products to frame the problem) in their
  `## What it is` sections — the seed deliberately lists both
- DO: state in `card-sorting` that its prereq `design-ux/information-architecture` is
  pending, and include a 15-item card set as the exercise
- DO NOT: recommend a research tool or a recruitment platform
- DO NOT: include any external URL

**Success:**
- [ ] Validator: `node tools/validate-content.mjs --topic design-ux` → `15 present, 29 pending, 0 error(s)`
- [ ] `user-research` has 4 children: `ls lessons/design-ux/user-research | grep -c '^[0-9][0-9]-'` → `4`
- [ ] Both medium tracks have 2 children: `ls lessons/design-ux/{user-interviews,survey-design} | grep -c '^[0-9][0-9]-'` → `4`
- [ ] The pending prereqs from WP-24 now resolve: no missing-prereq message naming
      `design-ux/user-research` remains
- [ ] No external URL: `grep -rcE 'https?://' lessons/design-ux/ | grep -v ':0'` → no output

---

### WP-26: Research, part 2

**Context:**
The remaining five entries from `## Research` in `seed/design-ux.md`, per
`tools/inventory.json`: `journey-mapping` (medium, prereq `design-ux/user-research`),
`persona-user-experience` (small, prereq `design-ux/user-research`, alias `Persona`),
`quantitative-ux-research` (medium, prereq `design-ux/user-research`),
`ab-testing` (medium, prereq `design-ux/quantitative-ux-research`),
`google-analytics-4-ga4` (medium, no prereqs, alias `GA4`). Four `medium` → 2 children
each; one small → none. This batch resolves the `service-design` prereq from WP-24.

**Task:**
Create these 13 files:

- `lessons/design-ux/journey-mapping/index.md` + 2 children
- `lessons/design-ux/persona-user-experience/index.md` — full lesson
- `lessons/design-ux/quantitative-ux-research/index.md` + 2 children
- `lessons/design-ux/ab-testing/index.md` + 2 children
- `lessons/design-ux/google-analytics-4-ga4/index.md` + 2 children

**Files:**
- `lessons/design-ux/journey-mapping/index.md`, `01-*.md`, `02-*.md` — CREATE
- `lessons/design-ux/persona-user-experience/index.md` — CREATE
- `lessons/design-ux/quantitative-ux-research/index.md`, `01-*.md`, `02-*.md` — CREATE
- `lessons/design-ux/ab-testing/index.md`, `01-*.md`, `02-*.md` — CREATE
- `lessons/design-ux/google-analytics-4-ga4/index.md`, `01-*.md`, `02-*.md` — CREATE

**Constraints:**
- DO: make `persona-user-experience` about an **evidence-based** profile of a user
  group, per the seed line, and say plainly when a persona is a waste of time
- DO: make `ab-testing`'s children the design of the test (hypothesis, sample, single
  change) and the interpretation (significance, novelty effect, segment peeking)
- DO: make `quantitative-ux-research` about funnels, drop-off, task success and time on
  task, per the seed line, and make the difference from `ab-testing` explicit: measuring
  versus intervening
- DO: keep `google-analytics-4-ga4` at the level of events, funnels and acquisition
  reports per the seed line, and include the consent boundary with a `related` link to
  `security/gdpr-data-privacy` (Phase 8, pending)
- DO: write `journey-mapping` as charting every step, touchpoint and emotion across an
  end-to-end experience, per the seed line, with a one-page example
- DO NOT: teach GA4's interface screen by screen
- DO NOT: include any external URL

**Success:**
- [ ] Validator: `node tools/validate-content.mjs --topic design-ux` → `20 present, 24 pending, 0 error(s)`
- [ ] Four medium tracks with 2 children each:
  `ls lessons/design-ux/{journey-mapping,quantitative-ux-research,ab-testing,google-analytics-4-ga4} | grep -c '^[0-9][0-9]-'` → `8`
- [ ] `service-design`'s pending prereq now resolves: no missing-prereq message naming
      `design-ux/journey-mapping` remains
- [ ] No external URL: `grep -rcE 'https?://' lessons/design-ux/ | grep -v ':0'` → no output

---

### WP-27: Content and structure

**Context:**
Six entries from `seed/design-ux.md`: two from `## Content & writing` and four from
`## Structure & interaction`, per `tools/inventory.json`: `ux-writing-microcopy`
(small, alias `Microcopy`), `content-strategy` (medium),
`information-architecture` (large, alias `IA`), `wireframing` (small, prereq
`design-ux/information-architecture`), `prototyping` (medium, prereq
`design-ux/wireframing`), `interaction-design` (medium, prereq `design-ux/prototyping`,
alias `IxD`). One `large` → 4 children; two `medium` → 2 each; two small → none. This
batch resolves the `card-sorting` prereq from WP-25.

**Task:**
Create these 16 files:

- `lessons/design-ux/ux-writing-microcopy/index.md` — full lesson
- `lessons/design-ux/content-strategy/index.md` + 2 children
- `lessons/design-ux/information-architecture/index.md` + 4 children
- `lessons/design-ux/wireframing/index.md` — full lesson
- `lessons/design-ux/prototyping/index.md` + 2 children
- `lessons/design-ux/interaction-design/index.md` + 2 children

**Files:**
- `lessons/design-ux/ux-writing-microcopy/index.md` — CREATE
- `lessons/design-ux/content-strategy/index.md`, `01-*.md`, `02-*.md` — CREATE
- `lessons/design-ux/information-architecture/index.md`, `01-*.md` … `04-*.md` — CREATE
- `lessons/design-ux/wireframing/index.md` — CREATE
- `lessons/design-ux/prototyping/index.md`, `01-*.md`, `02-*.md` — CREATE
- `lessons/design-ux/interaction-design/index.md`, `01-*.md`, `02-*.md` — CREATE

**Constraints:**
- DO: make the IA track cover labelling, hierarchy and navigation, findability testing,
  and the hand-off to layout — one child each, in that order
- DO: make `ux-writing-microcopy` about the words in buttons, empty states and errors,
  per the seed line, with five real strings rewritten as the exercise
- DO: make `interaction-design` about moment-to-moment behaviour — states, feedback,
  flow, per the seed line — and keep it distinct from visual design
- DO: make `wireframing` about grey-box layout that fixes structure before polish, per
  the seed line; keep it short, it is a `small` entry
- DO: make `prototyping`'s children prototype fidelity (what to build at which stage)
  and testing a prototype with real users
- DO: keep `content-strategy` about what content exists, for whom, in what voice and how
  it is maintained, per the seed line
- DO NOT: restate usability-testing technique inside `prototyping` — link to
  `design-ux/usability-testing`
- DO NOT: include any external URL

**Success:**
- [ ] Validator: `node tools/validate-content.mjs --topic design-ux` → `26 present, 18 pending, 0 error(s)`
- [ ] `information-architecture` has 4 children: `ls lessons/design-ux/information-architecture | grep -c '^[0-9][0-9]-'` → `4`
- [ ] Three medium tracks have 2 children each:
  `ls lessons/design-ux/{content-strategy,prototyping,interaction-design} | grep -c '^[0-9][0-9]-'` → `6`
- [ ] `card-sorting`'s pending prereq now resolves: no missing-prereq message naming
      `design-ux/information-architecture` remains
- [ ] No external URL: `grep -rcE 'https?://' lessons/design-ux/ | grep -v ':0'` → no output

---

### WP-28: Visual design

**Context:**
Five entries from `seed/design-ux.md`, section `## Visual design`, per
`tools/inventory.json`: `visual-design` (medium), `typography` (medium, prereq
`design-ux/visual-design`), `color-theory` (small, prereq `design-ux/visual-design`,
alias `Colour Theory`), `layout-grid-systems` (medium, prereq `design-ux/visual-design`),
`data-visualization` (medium, prereq `design-ux/visual-design`). Four `medium` → 2
children each; one small → none. This batch resolves the `design-systems` prereq
declared in WP-29.

**Task:**
Create these 13 files:

- `lessons/design-ux/visual-design/index.md` + 2 children
- `lessons/design-ux/typography/index.md` + 2 children
- `lessons/design-ux/color-theory/index.md` — full lesson
- `lessons/design-ux/layout-grid-systems/index.md` + 2 children
- `lessons/design-ux/data-visualization/index.md` + 2 children

**Files:**
- `lessons/design-ux/visual-design/index.md`, `01-*.md`, `02-*.md` — CREATE
- `lessons/design-ux/typography/index.md`, `01-*.md`, `02-*.md` — CREATE
- `lessons/design-ux/color-theory/index.md` — CREATE
- `lessons/design-ux/layout-grid-systems/index.md`, `01-*.md`, `02-*.md` — CREATE
- `lessons/design-ux/data-visualization/index.md`, `01-*.md`, `02-*.md` — CREATE

**Constraints:**
- DO: make `visual-design` about hierarchy, spacing, contrast and alignment, per the
  seed line — making an interface look intentional — and keep the two children on
  hierarchy/spacing and on contrast/alignment respectively
- DO: make `typography` about scale, line length and rhythm for screen reading, and
  keep it distinct from `frontend/web-typography`, which is the loading and scaling
  implementation; cross-reference it
- DO: tie `color-theory` to colour-blind readers and contrast ratios per the seed line,
  with one palette audited as the exercise; give it the alias `["Colour Theory"]`
- DO: make `data-visualization` about charts a non-expert reads correctly, per the seed
  line, with one misleading chart redrawn as the exercise
- DO: keep `layout-grid-systems` to columns, gutters and breakpoints that make screens
  predictable, per the seed line
- DO NOT: teach CSS — every implementation detail belongs to `frontend/css`; link to it
- DO NOT: include any external URL

**Success:**
- [ ] Validator: `node tools/validate-content.mjs --topic design-ux` → `31 present, 13 pending, 0 error(s)`
- [ ] Four medium tracks with 2 children each:
  `ls lessons/design-ux/{visual-design,typography,layout-grid-systems,data-visualization} | grep -c '^[0-9][0-9]-'` → `8`
- [ ] No CSS tutorial content leaked in:
  `grep -c 'display: *flex\|grid-template-columns' lessons/design-ux/visual-design/*.md lessons/design-ux/layout-grid-systems/*.md` → `0` for each file
- [ ] No external URL: `grep -rcE 'https?://' lessons/design-ux/ | grep -v ':0'` → no output

---

### WP-29: Design systems

**Context:**
Three entries from `seed/design-ux.md`, section `## Design systems`, per
`tools/inventory.json`: `design-systems` (large, prereqs `design-ux/visual-design` and
`frontend/ui-components` — both exist), `design-tokens` (small, prereq
`design-ux/design-systems`), `design-handoff-specs` (small, prereq
`design-ux/design-systems`). One `large` → 4 children; two small → none.

**Task:**
Create these 7 files:

- `lessons/design-ux/design-systems/index.md` + 4 children
- `lessons/design-ux/design-tokens/index.md` — full lesson
- `lessons/design-ux/design-handoff-specs/index.md` — full lesson

**Files:**
- `lessons/design-ux/design-systems/index.md`, `01-*.md` … `04-*.md` — CREATE
- `lessons/design-ux/design-tokens/index.md` — CREATE
- `lessons/design-ux/design-handoff-specs/index.md` — CREATE

**Constraints:**
- DO: make the design-systems track cover when a system pays for itself, component API
  and documentation, governance and versioning, and adoption inside a team — one child
  each, in that order
- DO: make `design-tokens` about named values shared between design tools and code, per
  the seed line, with a small token set written as the exercise, and cross-reference
  `frontend/css` for custom properties
- DO: make `design-handoff-specs` about packaging intent — states, edge cases, tokens —
  so engineers build it right, per the seed line
- DO: state in `design-systems` that the hard part is governance and adoption, not the
  component library
- DO NOT: assume a specific design tool or component framework — name examples, do not
  depend on one
- DO NOT: include any external URL

**Success:**
- [ ] Validator: `node tools/validate-content.mjs --topic design-ux` → `34 present, 10 pending, 0 error(s)`
- [ ] `design-systems` has 4 children: `ls lessons/design-ux/design-systems | grep -c '^[0-9][0-9]-'` → `4`
- [ ] Both small entries have no children:
  `ls lessons/design-ux/design-tokens lessons/design-ux/design-handoff-specs | grep -c '^[0-9][0-9]-'` → `0`
- [ ] No external URL: `grep -rcE 'https?://' lessons/design-ux/ | grep -v ':0'` → no output

---

### WP-30: Evaluation and tools

**Context:**
The final ten entries: three from `## Evaluation` and seven from `## Tools` in
`seed/design-ux.md`, per `tools/inventory.json`: `usability` (small),
`usability-testing` (medium, prereq `design-ux/usability`), `heuristic-evaluation`
(small, prereq `design-ux/usability`), `figma` (small), `adobe-xd` (small, prereq
`design-ux/figma`), `framer` (small, prereq `design-ux/figma`), `miro` (small),
`maze` (small, prereq `design-ux/usability-testing`), `notion` (small),
`hotjar` (small, prereq `design-ux/google-analytics-4-ga4`). One `medium` → 2
children; nine small → none. This batch closes the topic and satisfies the
`design-ux/usability-testing` reference in the `ui-ux-design` area page from WP-6.

**Task:**
Create these 12 files:

- `lessons/design-ux/usability/index.md` — full lesson
- `lessons/design-ux/usability-testing/index.md` + 2 children
- `lessons/design-ux/heuristic-evaluation/index.md` — full lesson
- `lessons/design-ux/figma/index.md` — full lesson
- `lessons/design-ux/adobe-xd/index.md` — full lesson
- `lessons/design-ux/framer/index.md` — full lesson
- `lessons/design-ux/miro/index.md` — full lesson
- `lessons/design-ux/maze/index.md` — full lesson
- `lessons/design-ux/notion/index.md` — full lesson
- `lessons/design-ux/hotjar/index.md` — full lesson

**Files:**
- `lessons/design-ux/usability/index.md` — CREATE
- `lessons/design-ux/usability-testing/index.md`, `01-*.md`, `02-*.md` — CREATE
- `lessons/design-ux/heuristic-evaluation/index.md` — CREATE
- `lessons/design-ux/figma/index.md` — CREATE
- `lessons/design-ux/adobe-xd/index.md` — CREATE
- `lessons/design-ux/framer/index.md` — CREATE
- `lessons/design-ux/miro/index.md` — CREATE
- `lessons/design-ux/notion/index.md` — CREATE
- `lessons/design-ux/maze/index.md` — CREATE
- `lessons/design-ux/hotjar/index.md` — CREATE

**Constraints:**
- DO: keep `usability` (a quality — how easily a real user reaches their goal) separate
  from `usability-testing` (an activity — watching people attempt tasks), per the seed's
  explicit note that these are not the same skill; state the distinction in both files
- DO: make `usability-testing`'s children the session itself (moderating, tasks,
  think-aloud) and the analysis (findings, severity, what to fix first)
- DO: write the seven tool entries as **what the tool is for and when to reach for it**,
  per the seed lines — one short page each, with a first-hour exercise. They are
  `small` tiers by design: do not pad them into tutorials
- DO: keep `maze` about unmoderated testing with automatic metrics and name the cost of
  losing the moderator
- DO: keep `hotjar` about session recordings, heatmaps and on-site surveys on real
  traffic, per the seed line, and note the privacy obligation with a `related` link to
  `security/gdpr-data-privacy`
- DO NOT: write installation or pricing guidance for any tool
- DO NOT: include any external URL, including product sites

**Success:**
- [ ] Validator: `node tools/validate-content.mjs --topic design-ux` → `44 present, 0 pending, 0 error(s)`
- [ ] File count for the topic: `find lessons/design-ux -name '*.md' | wc -l` → `88`
- [ ] `usability-testing` has 2 children: `ls lessons/design-ux/usability-testing | grep -c '^[0-9][0-9]-'` → `2`
- [ ] Every tool entry stays within the small-tier budget: the validator reports no
      `[V5]` error for `lessons/design-ux/{figma,adobe-xd,framer,miro,maze,notion,hotjar}`
- [ ] The `ui-ux-design` area page's five included skills all now resolve: no
      missing-prereq or unresolved-link message naming `design-ux/` remains
- [ ] No external URL: `grep -rcE 'https?://' lessons/design-ux/ | grep -v ':0'` → no output

---

## Phase Verification

After WP-24 through WP-30 are complete, run:

```bash
node tools/validate-content.mjs --topic design-ux
node tools/validate-content.mjs
find lessons/design-ux -name '*.md' | wc -l
ls -d lessons/design-ux/*/ | wc -l
```

- [ ] Topic is complete: `44 present, 0 pending, 0 error(s)` for `--topic design-ux`
- [ ] Global run exits 0 and reports `144 present, 33 pending, 0 error(s)`
- [ ] Exactly 44 directories under `lessons/design-ux/` — no alias-only directories
- [ ] 88 files under `lessons/design-ux/`
- [ ] Manual spot-check: read two of the seven tool entries back to back and confirm
      they are distinct pages rather than one template with the name swapped
