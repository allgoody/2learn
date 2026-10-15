# Phase 4: 03-design-ux

## Objective

Mirror `lessons/03-design-ux/` into `lessons/ru/03-design-ux/` — 156 files, the largest topic in
either corpus. Forty-four entries, of which fourteen are tool entries whose lessons describe a panel
rather than code.

## Prerequisites

- Phase 3 complete: `node tools/validate-content.mjs --topic 02-frontend --lang ru` reports
  `0 error(s)` and the Russian frontend count is `133`.
- `node tools/validate-content.mjs --strict --lang en` still exits 0.

## Shared Context

See `phase-02-cs-fundamentals.md` → Shared Context for the mirror rule and the full translation
constraint list. It applies unchanged here. Topic-specific additions:

- Design vocabulary has settled Russian forms — `макет`, `прототип`, `вайрфрейм`, `пользовательский
  путь`, `исследование`, `юзабилити-тестирование`, `дизайн-система`, `токены дизайна`. Use them
  consistently; when you settle a new one, note it so later phases follow.
- Tool names stay in Latin script: Figma, Miro, Notion, Hotjar, Adobe XD, Framer, Maze, Google
  Analytics 4 (GA4).
- Artefacts that are sketches, tables, journeys or scripts keep their layout in the `text` fences;
  translate the labels and keep the column alignment readable.
- No screenshot, image, embed or URL — the English corpus has none and the Russian one must match.

**Command after every entry:**
`node tools/validate-content.mjs --topic 03-design-ux --lang ru`

## Work Packages

### WP-19: Mirror the area page, design thinking, facilitation, sketching and user research

**Context:**
`01-ui-ux-design` is the topic's `area` entry; `02-design-thinking` is `medium`;
`03-facilitation-workshop-design` and `04-sketching` are `small`; `05-user-research` is `large` with
four children.

**Task:**
Create the 19 Russian files for the five directories listed below.

**Files:**
| English directory | Files to create under `lessons/ru/` | Files |
| --- | --- | --- |
| `lessons/03-design-ux/01-ui-ux-design` | `index.md` | 1 |
| `lessons/03-design-ux/02-design-thinking` | `index.md`, `01-empathise-define-ideate.md`, `02-prototype-and-test.md`, two matching `examples.*` | 5 |
| `lessons/03-design-ux/03-facilitation-workshop-design` | `index.md`, `examples.md` | 2 |
| `lessons/03-design-ux/04-sketching` | `index.md`, `examples.md` | 2 |
| `lessons/03-design-ux/05-user-research` | `index.md`, four children, four matching `examples.*` | 9 |

**Constraints:**
- DO: follow every constraint in Shared Context.
- DO: keep the area page's `Входящие навыки` bullet ids exactly as the English file has them.
- DO: keep workshop method names (how-might-we, affinity mapping) in a consistent Russian or Latin form and record the choice.
- DO NOT: create `examples.md` for the area page or for `05-user-research`'s landing index.
- DO NOT: edit anything under `lessons/03-design-ux/`.

**Success:**
- [ ] Command: `node tools/validate-content.mjs --topic 03-design-ux --lang ru` → no error naming any of the 19 files
- [ ] Command: `find lessons/ru/03-design-ux/05-user-research -name '*.md' | wc -l` → `9`
- [ ] Command: `ls lessons/ru/03-design-ux/01-ui-ux-design` → `index.md` only

### WP-20: Mirror analytics, UX writing, content strategy and information architecture

**Context:**
`06-google-analytics-4-ga4` and `08-content-strategy` are `medium`; `07-ux-writing-microcopy` is
`small`; `09-information-architecture` is `large` with four children.

**Task:**
Create the 21 Russian files for the four directories listed below.

**Files:**
| English directory | Files to create under `lessons/ru/` | Files |
| --- | --- | --- |
| `lessons/03-design-ux/06-google-analytics-4-ga4` | `index.md`, `01-events-and-conversions.md`, `02-funnels-and-acquisition-reports.md`, two matching `examples.*` | 5 |
| `lessons/03-design-ux/07-ux-writing-microcopy` | `index.md`, `examples.md` | 2 |
| `lessons/03-design-ux/08-content-strategy` | `index.md`, `01-content-audit-and-inventory.md`, `02-voice-rules-and-maintenance.md`, two matching `examples.*` | 5 |
| `lessons/03-design-ux/09-information-architecture` | `index.md`, four children, four matching `examples.*` | 9 |

**Constraints:**
- DO: follow every constraint in Shared Context.
- DO: keep event names, parameter names and report names as the English file writes them; translate the prose around the table.
- DO: for microcopy examples, translate the *sample interface strings* into natural Russian — this is one of the few places where the artefact is itself prose.
- DO: keep navigation labels and page-tree diagrams aligned in the `text` fences.
- DO NOT: create `examples.md` for the `medium` or `large` indexes.
- DO NOT: edit anything under `lessons/03-design-ux/`.

**Success:**
- [ ] Command: `node tools/validate-content.mjs --topic 03-design-ux --lang ru` → no error naming any of the 21 files
- [ ] Command: `find lessons/ru/03-design-ux/06-google-analytics-4-ga4 lessons/ru/03-design-ux/07-ux-writing-microcopy lessons/ru/03-design-ux/08-content-strategy lessons/ru/03-design-ux/09-information-architecture -name '*.md' | wc -l` → `21`

### WP-21: Mirror visual design, usability and the eight small research entries

**Context:**
`10-visual-design` is `medium`; `11-usability`, `12-figma`, `13-miro`, `14-notion`,
`15-user-centered-design`, `16-storyboarding`, `17-jobs-to-be-done`, `18-ui-ux-research` and
`19-design-research` are all `small`.

**Task:**
Create the 23 Russian files for the ten directories listed below.

**Files:**
| English directory | Files to create under `lessons/ru/` | Files |
| --- | --- | --- |
| `lessons/03-design-ux/10-visual-design` | `index.md`, `01-hierarchy-and-spacing.md`, `02-contrast-and-alignment.md`, two matching `examples.*` | 5 |
| `lessons/03-design-ux/11-usability` | `index.md`, `examples.md` | 2 |
| `lessons/03-design-ux/12-figma` | `index.md`, `examples.md` | 2 |
| `lessons/03-design-ux/13-miro` | `index.md`, `examples.md` | 2 |
| `lessons/03-design-ux/14-notion` | `index.md`, `examples.md` | 2 |
| `lessons/03-design-ux/15-user-centered-design` | `index.md`, `examples.md` | 2 |
| `lessons/03-design-ux/16-storyboarding` | `index.md`, `examples.md` | 2 |
| `lessons/03-design-ux/17-jobs-to-be-done` | `index.md`, `examples.md` | 2 |
| `lessons/03-design-ux/18-ui-ux-research` | `index.md`, `examples.md` | 2 |
| `lessons/03-design-ux/19-design-research` | `index.md`, `examples.md` | 2 |

**Constraints:**
- DO: follow every constraint in Shared Context.
- DO: keep contrast ratio numbers and hex values exactly as the English file has them.
- DO: keep JTBD's job-statement phrasing structure (when / I want to / so I can) rendered as the established Russian equivalent, applied consistently in both the lesson and its examples.
- DO NOT: create `examples.md` for the `medium` index.
- DO NOT: edit anything under `lessons/03-design-ux/`.

**Success:**
- [ ] Command: `node tools/validate-content.mjs --topic 03-design-ux --lang ru` → no error naming any of the 23 files
- [ ] Command: `find lessons/ru/03-design-ux -name '*.md' | wc -l` → `63` (the topic total after this WP: 19 + 21 + 23)
- [ ] Command: `ls lessons/ru/03-design-ux/12-figma lessons/ru/03-design-ux/13-miro lessons/ru/03-design-ux/14-notion` → each has exactly `index.md` and `examples.md`

### WP-22: Mirror interviews, surveys, journey mapping, personas and quantitative research

**Context:**
`20-user-interviews`, `21-survey-design`, `22-journey-mapping` and `24-quantitative-ux-research` are
`medium` with two children each; `23-persona-user-experience` is `small`.

**Task:**
Create the 22 Russian files for the five directories listed below.

**Files:**
| English directory | Files to create under `lessons/ru/` | Files |
| --- | --- | --- |
| `lessons/03-design-ux/20-user-interviews` | `index.md`, `01-writing-the-interview-script.md`, `02-follow-up-questions-and-past-behaviour.md`, two matching `examples.*` | 5 |
| `lessons/03-design-ux/21-survey-design` | `index.md`, `01-writing-neutral-questions.md`, `02-sampling-and-reading-the-results.md`, two matching `examples.*` | 5 |
| `lessons/03-design-ux/22-journey-mapping` | `index.md`, `01-laying-out-the-journey.md`, `02-finding-the-moments-that-matter.md`, two matching `examples.*` | 5 |
| `lessons/03-design-ux/23-persona-user-experience` | `index.md`, `examples.md` | 2 |
| `lessons/03-design-ux/24-quantitative-ux-research` | `index.md`, `01-what-to-measure.md`, `02-instrumenting-and-reading-the-numbers.md`, two matching `examples.*` | 5 |

**Constraints:**
- DO: follow every constraint in Shared Context.
- DO: translate interview scripts and survey questions into questions a Russian-speaking researcher would actually ask — not literal word-for-word questions.
- DO: keep numeric scales, sample sizes and percentages exactly as the English file has them.
- DO: keep journey tables' column count and separator rows intact.
- DO NOT: create `examples.md` for the four `medium` indexes.
- DO NOT: edit anything under `lessons/03-design-ux/`.

**Success:**
- [ ] Command: `node tools/validate-content.mjs --topic 03-design-ux --lang ru` → no error naming any of the 22 files
- [ ] Command: `find lessons/ru/03-design-ux/20-user-interviews lessons/ru/03-design-ux/21-survey-design lessons/ru/03-design-ux/22-journey-mapping lessons/ru/03-design-ux/23-persona-user-experience lessons/ru/03-design-ux/24-quantitative-ux-research -name '*.md' | wc -l` → `22`

### WP-23: Mirror Hotjar, card sorting, wireframing, typography and colour theory

**Context:**
`25-hotjar`, `26-card-sorting`, `27-wireframing` and `29-color-theory` are `small`;
`28-typography` is `medium` with two children.

**Task:**
Create the 13 Russian files for the five directories listed below.

**Files:**
| English directory | Files to create under `lessons/ru/` | Files |
| --- | --- | --- |
| `lessons/03-design-ux/25-hotjar` | `index.md`, `examples.md` | 2 |
| `lessons/03-design-ux/26-card-sorting` | `index.md`, `examples.md` | 2 |
| `lessons/03-design-ux/27-wireframing` | `index.md`, `examples.md` | 2 |
| `lessons/03-design-ux/28-typography` | `index.md`, `01-setting-a-type-scale.md`, `02-line-length-and-rhythm.md`, two matching `examples.*` | 5 |
| `lessons/03-design-ux/29-color-theory` | `index.md`, `examples.md` | 2 |

**Constraints:**
- DO: follow every constraint in Shared Context.
- DO: keep type-scale numbers, line heights, hex values and colour-space names untouched.
- DO: keep wireframe sketches' box characters and indentation readable after the labels are translated.
- DO NOT: create `examples.md` for the `medium` index.
- DO NOT: edit anything under `lessons/03-design-ux/`.

**Success:**
- [ ] Command: `node tools/validate-content.mjs --topic 03-design-ux --lang ru` → no error naming any of the 13 files
- [ ] Command: `find lessons/ru/03-design-ux/25-hotjar lessons/ru/03-design-ux/26-card-sorting lessons/ru/03-design-ux/27-wireframing lessons/ru/03-design-ux/28-typography lessons/ru/03-design-ux/29-color-theory -name '*.md' | wc -l` → `13`

### WP-24: Mirror grid systems, data visualisation, design systems and usability testing

**Context:**
`30-layout-grid-systems`, `31-data-visualization` and `33-usability-testing` are `medium` with two
children each; `32-design-systems` is `large` with four children.

**Task:**
Create the 24 Russian files for the four directories listed below.

**Files:**
| English directory | Files to create under `lessons/ru/` | Files |
| --- | --- | --- |
| `lessons/03-design-ux/30-layout-grid-systems` | `index.md`, `01-columns-and-gutters.md`, `02-breakpoints.md`, two matching `examples.*` | 5 |
| `lessons/03-design-ux/31-data-visualization` | `index.md`, `01-choosing-the-right-chart.md`, `02-drawing-it-honestly.md`, two matching `examples.*` | 5 |
| `lessons/03-design-ux/32-design-systems` | `index.md`, four children, four matching `examples.*` | 9 |
| `lessons/03-design-ux/33-usability-testing` | `index.md`, `01-running-the-session.md`, `02-analysis-and-severity.md`, two matching `examples.*` | 5 |

**Constraints:**
- DO: follow every constraint in Shared Context.
- DO: keep breakpoint values, column counts and severity-rating scales untouched.
- DO: keep severity labels consistent between the lesson and its examples.
- DO NOT: create `examples.md` for the three `medium` indexes or for the `large` index.
- DO NOT: edit anything under `lessons/03-design-ux/`.

**Success:**
- [ ] Command: `node tools/validate-content.mjs --topic 03-design-ux --lang ru` → no error naming any of the 24 files
- [ ] Command: `find lessons/ru/03-design-ux/32-design-systems -name '*.md' | wc -l` → `9`

### WP-25: Mirror heuristic evaluation, Adobe XD, Framer, Lean UX, service design and A/B testing

**Context:**
`34-heuristic-evaluation`, `35-adobe-xd`, `36-framer` and `37-lean-ux` are `small`;
`38-service-design` and `39-ab-testing` are `medium` with two children each.

**Task:**
Create the 18 Russian files for the six directories listed below.

**Files:**
| English directory | Files to create under `lessons/ru/` | Files |
| --- | --- | --- |
| `lessons/03-design-ux/34-heuristic-evaluation` | `index.md`, `examples.md` | 2 |
| `lessons/03-design-ux/35-adobe-xd` | `index.md`, `examples.md` | 2 |
| `lessons/03-design-ux/36-framer` | `index.md`, `examples.md` | 2 |
| `lessons/03-design-ux/37-lean-ux` | `index.md`, `examples.md` | 2 |
| `lessons/03-design-ux/38-service-design` | `index.md`, `01-frontstage-backstage-and-support-processes.md`, `02-designing-across-channels.md`, two matching `examples.*` | 5 |
| `lessons/03-design-ux/39-ab-testing` | `index.md`, `01-designing-the-test.md`, `02-interpreting-the-result.md`, two matching `examples.*` | 5 |

**Constraints:**
- DO: follow every constraint in Shared Context.
- DO: keep Nielsen-style heuristic names in a consistent Russian or Latin form, applied identically in the lesson and its examples.
- DO: keep significance values, sample sizes and confidence wording exactly as the English file has them.
- DO NOT: create `examples.md` for the two `medium` indexes.
- DO NOT: edit anything under `lessons/03-design-ux/`.

**Success:**
- [ ] Command: `node tools/validate-content.mjs --topic 03-design-ux --lang ru` → no error naming any of the 18 files
- [ ] Command: `find lessons/ru/03-design-ux/34-heuristic-evaluation lessons/ru/03-design-ux/35-adobe-xd lessons/ru/03-design-ux/36-framer lessons/ru/03-design-ux/37-lean-ux lessons/ru/03-design-ux/38-service-design lessons/ru/03-design-ux/39-ab-testing -name '*.md' | wc -l` → `18`

### WP-26: Mirror prototyping, design tokens, handoff, Maze and interaction design

**Context:**
`40-prototyping` and `44-interaction-design` are `medium` with two children each;
`41-design-tokens`, `42-design-handoff-specs` and `43-maze` are `small`. These close out the topic.

**Task:**
Create the 16 Russian files for the five directories listed below.

**Files:**
| English directory | Files to create under `lessons/ru/` | Files |
| --- | --- | --- |
| `lessons/03-design-ux/40-prototyping` | `index.md`, `01-prototype-fidelity.md`, `02-testing-a-prototype-with-real-users.md`, two matching `examples.*` | 5 |
| `lessons/03-design-ux/41-design-tokens` | `index.md`, `examples.md` | 2 |
| `lessons/03-design-ux/42-design-handoff-specs` | `index.md`, `examples.md` | 2 |
| `lessons/03-design-ux/43-maze` | `index.md`, `examples.md` | 2 |
| `lessons/03-design-ux/44-interaction-design` | `index.md`, `01-states-and-feedback.md`, `02-flow.md`, two matching `examples.*` | 5 |

**Constraints:**
- DO: follow every constraint in Shared Context.
- DO: keep token names, CSS custom-property names and state names (empty, loading, error, success) in a consistent form across the lesson, the examples and the handoff entry.
- DO: keep the four-state artefact's block structure in the `text` fences intact.
- DO NOT: create `examples.md` for the two `medium` indexes.
- DO NOT: edit anything under `lessons/03-design-ux/`.

**Success:**
- [ ] Command: `node tools/validate-content.mjs --topic 03-design-ux --lang ru` → `44 present`, `68 examples`, `0 error(s)`
- [ ] Command: `find lessons/ru/03-design-ux -name '*.md' | wc -l` → `156`
- [ ] Command: `find lessons/ru/03-design-ux -name 'examples*.md' | wc -l` → `68`
- [ ] Command: `find lessons/ru/03-design-ux -name 'index.md' | wc -l` → `44`
- [ ] Command: `grep -rn '(https\|http)' lessons/ru/03-design-ux` → 0 matches

## Phase Verification

After all work packages are complete, run:

```bash
node tools/validate-content.mjs --topic 03-design-ux --lang ru
node tools/validate-content.mjs --lang ru
node tools/validate-content.mjs --strict --lang en
find lessons/ru/03-design-ux -name '*.md' | wc -l
find lessons/03-design-ux -name '*.md' | wc -l
grep -rn '(https\|http)' lessons/ru/03-design-ux
```

- [ ] The topic run reports `44 present`, `68 examples`, `0 error(s)`
- [ ] The Russian count equals the English count: `156` and `156`
- [ ] The English `--strict` run is unchanged
- [ ] The URL grep reports nothing
- [ ] Tool-entry lessons name the tools in Latin script and describe panels and steps without a link
