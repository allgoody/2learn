# Phase 5: Examples — design-ux and product-process

## Objective

Write the 68 examples files for `03-design-ux` and the 26 for `04-product-process` — 94 files. This
is the largest batch of prose-only topics, so it also settles how a worked example looks when the
artefact is a script, a map, an interview or a survey rather than code.

## Prerequisites

- Phases 1–4 complete.
- `node tools/validate-content.mjs --topic 03-design-ux` reports `68 examples pending` and
  `node tools/validate-content.mjs --topic 04-product-process` reports `26 examples pending`,
  both with `0 error(s)`.

## Shared Context

See the frozen file shape in `phase-02-examples-toolkit.md` → Shared Context, and the prose-only
style in `lessons/08-soft-skills/03-mentoring/examples.md`.

For these topics the "artefact" is rarely code. Use `text` fences with a small, concrete artefact:
a wireframe sketch in characters, a four-line interview script, a journey table, a survey question
with the three answers it invites, a prioritisation score row, a RACI line. The solution must be the
*finished* artefact plus 2–4 sentences on why it is right and the one mistake people make.

Tool-named entries (`12-figma`, `13-miro`, `14-notion`, `25-hotjar`, `35-adobe-xd`, `36-framer`,
`43-maze`, `06-google-analytics-4-ga4`) must never reference a URL, a plan tier price or a hostname.
Describe the panel and the steps; the tool name alone is fine.

## Work Packages

### WP-25: Examples for design thinking, facilitation, sketching, user research

**Context:**
`02-design-thinking` is `medium` (two children); `03-facilitation-workshop-design` and
`04-sketching` are `small`; `05-user-research` is `large` with four children.

**Task:**
Create the 8 examples files listed below, each built from two of its lesson's `### Core ideas`.

**Files:**
| Entry dir | Examples files — CREATE |
| --- | --- |
| `lessons/03-design-ux/02-design-thinking` | `examples.01-empathise-define-ideate.md`, `examples.02-prototype-and-test.md` |
| `lessons/03-design-ux/03-facilitation-workshop-design` | `examples.md` |
| `lessons/03-design-ux/04-sketching` | `examples.md` |
| `lessons/03-design-ux/05-user-research` | `examples.01-choosing-a-method.md`, `examples.02-recruiting-participants.md`, `examples.03-running-a-session.md`, `examples.04-from-findings-to-decisions.md` |

**Constraints:**
- DO: write one file per `write` tool call.
- DO: use `text` fences for the artefact (a problem statement, an agenda, a sketch, a findings table).
- DO: for `05-user-research` `02-recruiting-participants` state the participant criterion and the incentive in prose, with no link to any recruitment service.
- DO: keep each file between 120 and 450 words.
- DO: no frontmatter, no `####`, no external URLs, em dash with spaces in headings.
- DO NOT: edit the lesson files.
- DO NOT: invent research findings as if they were measured — write the example as a worked pattern.

**Success:**
- [ ] Command: `node tools/validate-content.mjs --topic 03-design-ux` → `0 error(s)`
- [ ] Command: `ls lessons/03-design-ux/05-user-research` → 4 `examples.*.md` files
- [ ] Command: `grep -rn 'https://\|http://' lessons/03-design-ux/*/examples*.md` → 0 matches

### WP-26: Examples for analytics, UX writing, content strategy, information architecture

**Context:**
`06-google-analytics-4-ga4` and `08-content-strategy` are `medium` (two children);
`07-ux-writing-microcopy` is `small`; `09-information-architecture` is `large` with four children.

**Task:**
Create the 9 examples files listed below, each built from two of its lesson's `### Core ideas`.

**Files:**
| Entry dir | Examples files — CREATE |
| --- | --- |
| `lessons/03-design-ux/06-google-analytics-4-ga4` | `examples.01-events-and-conversions.md`, `examples.02-funnels-and-acquisition-reports.md` |
| `lessons/03-design-ux/07-ux-writing-microcopy` | `examples.md` |
| `lessons/03-design-ux/08-content-strategy` | `examples.01-content-audit-and-inventory.md`, `examples.02-voice-rules-and-maintenance.md` |
| `lessons/03-design-ux/09-information-architecture` | `examples.01-labelling.md`, `examples.02-hierarchy-and-navigation.md`, `examples.03-findability-testing.md`, `examples.04-the-hand-off-to-layout.md` |

**Constraints:**
- DO: write one file per `write` tool call.
- DO: for `06-google-analytics-4-ga4` show the event name, its parameters and the report reading in a `text` table; name the tool, never a property id or a URL.
- DO: for `09-information-architecture` `01-labelling` show the before/after label pairs and say what changed for the reader.
- DO: keep each file between 120 and 450 words.
- DO: no frontmatter, no `####`, no external URLs, em dash with spaces in headings.
- DO NOT: edit the lesson files.
- DO NOT: put a line beginning with `## ` inside a fence.

**Success:**
- [ ] Command: `node tools/validate-content.mjs --topic 03-design-ux` → `0 error(s)`
- [ ] Command: `grep -rn 'https://\|http://' lessons/03-design-ux/*/examples*.md` → 0 matches
- [ ] Check: each file starts with `## Example 1 — `

### WP-27: Examples for visual design, usability, and the six tool entries

**Context:**
`10-visual-design` is `medium` with two children. `11-usability`, `12-figma`, `13-miro`,
`14-notion` and `15-user-centered-design` are all `small`, each with one `examples.md`.

**Task:**
Create the 7 examples files listed below, each built from two of its lesson's `### Core ideas`.

**Files:**
| Entry dir | Examples files — CREATE |
| --- | --- |
| `lessons/03-design-ux/10-visual-design` | `examples.01-hierarchy-and-spacing.md`, `examples.02-contrast-and-alignment.md` |
| `lessons/03-design-ux/11-usability` | `examples.md` |
| `lessons/03-design-ux/12-figma` | `examples.md` |
| `lessons/03-design-ux/13-miro` | `examples.md` |
| `lessons/03-design-ux/14-notion` | `examples.md` |
| `lessons/03-design-ux/15-user-centered-design` | `examples.md` |

**Constraints:**
- DO: write one file per `write` tool call.
- DO: for the four tool entries the worked example is a small piece of work done *in* the tool — a component variant set, a workshop board, a page tree — described as a `text` artefact with the steps that produced it.
- DO: for `10-visual-design` `02-contrast-and-alignment` give the two hex values in the solution and say which pair passes and by how much, so the reader can check it.
- DO: keep each file between 120 and 450 words.
- DO: no frontmatter, no `####`, no external URLs, em dash with spaces in headings.
- DO NOT: edit the lesson files.
- DO NOT: name a plugin, an add-on or a paid tier that the lesson does not mention.

**Success:**
- [ ] Command: `node tools/validate-content.mjs --topic 03-design-ux` → `0 error(s)`
- [ ] Command: `ls lessons/03-design-ux/12-figma lessons/03-design-ux/13-miro lessons/03-design-ux/14-notion` → each has `examples.md`
- [ ] Command: `grep -rn 'https://\|http://' lessons/03-design-ux/*/examples*.md` → 0 matches

### WP-28: Examples for storyboarding, JTBD, research entries, interviews, surveys

**Context:**
`16-storyboarding`, `17-jobs-to-be-done`, `18-ui-ux-research`, `19-design-research` are `small`;
`20-user-interviews` and `21-survey-design` are `medium` with two children each.

**Task:**
Create the 8 examples files listed below, each built from two of its lesson's `### Core ideas`.

**Files:**
| Entry dir | Examples files — CREATE |
| --- | --- |
| `lessons/03-design-ux/16-storyboarding` | `examples.md` |
| `lessons/03-design-ux/17-jobs-to-be-done` | `examples.md` |
| `lessons/03-design-ux/18-ui-ux-research` | `examples.md` |
| `lessons/03-design-ux/19-design-research` | `examples.md` |
| `lessons/03-design-ux/20-user-interviews` | `examples.01-writing-the-interview-script.md`, `examples.02-follow-up-questions-and-past-behaviour.md` |
| `lessons/03-design-ux/21-survey-design` | `examples.01-writing-neutral-questions.md`, `examples.02-sampling-and-reading-the-results.md` |

**Constraints:**
- DO: write one file per `write` tool call.
- DO: for `17-jobs-to-be-done` write the job statement and the forces table as the solution artefact.
- DO: for `20-user-interviews` show a leading question and its rewritten past-behaviour version side by side.
- DO: for `21-survey-design` show the question, its answer scale and the two ways the wording biases the result.
- DO: keep each file between 120 and 450 words.
- DO: no frontmatter, no `####`, no external URLs, em dash with spaces in headings.
- DO NOT: edit the lesson files.
- DO NOT: present a fabricated statistic from a real study.

**Success:**
- [ ] Command: `node tools/validate-content.mjs --topic 03-design-ux` → `0 error(s)`
- [ ] Command: `ls lessons/03-design-ux/20-user-interviews lessons/03-design-ux/21-survey-design` → both have two `examples.*.md` files
- [ ] Command: `grep -rn 'https://\|http://' lessons/03-design-ux/*/examples*.md` → 0 matches

### WP-29: Examples for journey mapping, personas, quantitative research, Hotjar, card sorting

**Context:**
`22-journey-mapping` and `24-quantitative-ux-research` are `medium` with two children each;
`23-persona-user-experience`, `25-hotjar` and `26-card-sorting` are `small`.

**Task:**
Create the 7 examples files listed below, each built from two of its lesson's `### Core ideas`.

**Files:**
| Entry dir | Examples files — CREATE |
| --- | --- |
| `lessons/03-design-ux/22-journey-mapping` | `examples.01-laying-out-the-journey.md`, `examples.02-finding-the-moments-that-matter.md` |
| `lessons/03-design-ux/23-persona-user-experience` | `examples.md` |
| `lessons/03-design-ux/24-quantitative-ux-research` | `examples.01-what-to-measure.md`, `examples.02-instrumenting-and-reading-the-numbers.md` |
| `lessons/03-design-ux/25-hotjar` | `examples.md` |
| `lessons/03-design-ux/26-card-sorting` | `examples.md` |

**Constraints:**
- DO: write one file per `write` tool call.
- DO: for `22-journey-mapping` `01-laying-out-the-journey` use a `text` table with stage, action, thought and pain-point columns.
- DO: for `23-persona-user-experience` write the persona as a short evidence-anchored note, and say in the solution what makes it not a stereotype.
- DO: keep each file between 120 and 450 words.
- DO: no frontmatter, no `####`, no external URLs, em dash with spaces in headings.
- DO NOT: edit the lesson files.
- DO NOT: include a screenshot, an image or an embed.

**Success:**
- [ ] Command: `node tools/validate-content.mjs --topic 03-design-ux` → `0 error(s)`
- [ ] Command: `grep -rn 'https://\|http://' lessons/03-design-ux/*/examples*.md` → 0 matches
- [ ] Check: every created file is between 120 and 450 words

### WP-30: Examples for wireframing, typography, colour, grids, data visualisation

**Context:**
`27-wireframing` and `29-color-theory` are `small`; `28-typography`, `30-layout-grid-systems` and
`31-data-visualization` are `medium` with two children each.

**Task:**
Create the 8 examples files listed below, each built from two of its lesson's `### Core ideas`.

**Files:**
| Entry dir | Examples files — CREATE |
| --- | --- |
| `lessons/03-design-ux/27-wireframing` | `examples.md` |
| `lessons/03-design-ux/28-typography` | `examples.01-setting-a-type-scale.md`, `examples.02-line-length-and-rhythm.md` |
| `lessons/03-design-ux/29-color-theory` | `examples.md` |
| `lessons/03-design-ux/30-layout-grid-systems` | `examples.01-columns-and-gutters.md`, `examples.02-breakpoints.md` |
| `lessons/03-design-ux/31-data-visualization` | `examples.01-choosing-the-right-chart.md`, `examples.02-drawing-it-honestly.md` |

**Constraints:**
- DO: write one file per `write` tool call.
- DO: for `28-typography` give the real numbers of the scale (sizes and line heights) in a `text` or `css` fence.
- DO: for `31-data-visualization` `02-drawing-it-honestly` show a chart's axis choice as the artefact and name the distortion it removes; a small `text` table stands in for the chart.
- DO: keep each file between 120 and 450 words.
- DO: no frontmatter, no `####`, no external URLs, em dash with spaces in headings.
- DO NOT: edit the lesson files.
- DO NOT: reference a chart library by version.

**Success:**
- [ ] Command: `node tools/validate-content.mjs --topic 03-design-ux` → `0 error(s)`
- [ ] Command: `grep -c '^## Example' lessons/03-design-ux/29-color-theory/examples.md` → `1` or `2` (the frozen shape allows either; V15 enforces one `### Solution` per example)
- [ ] Command: `grep -rn 'https://\|http://' lessons/03-design-ux/*/examples*.md` → 0 matches

### WP-31: Examples for design systems, usability testing, heuristic evaluation

**Context:**
`32-design-systems` is `large` with four children; `33-usability-testing` is `medium` with two;
`34-heuristic-evaluation` is `small`.

**Task:**
Create the 7 examples files listed below, each built from two of its lesson's `### Core ideas`.

**Files:**
| Entry dir | Examples files — CREATE |
| --- | --- |
| `lessons/03-design-ux/32-design-systems` | `examples.01-when-a-system-pays-for-itself.md`, `examples.02-component-api-and-documentation.md`, `examples.03-governance-and-versioning.md`, `examples.04-adoption-inside-a-team.md` |
| `lessons/03-design-ux/33-usability-testing` | `examples.01-running-the-session.md`, `examples.02-analysis-and-severity.md` |
| `lessons/03-design-ux/34-heuristic-evaluation` | `examples.md` |

**Constraints:**
- DO: write one file per `write` tool call.
- DO: for `32-design-systems` `02-component-api-and-documentation` show the component's props table and a doc snippet as the artefact.
- DO: for `33-usability-testing` `02-analysis-and-severity` show a small findings table with severity ratings and the fix for the worst one.
- DO: keep each file between 120 and 450 words.
- DO: no frontmatter, no `####`, no external URLs, em dash with spaces in headings.
- DO NOT: edit the lesson files.
- DO NOT: invent a versioned release note for a real product.

**Success:**
- [ ] Command: `node tools/validate-content.mjs --topic 03-design-ux` → `0 error(s)`
- [ ] Command: `ls lessons/03-design-ux/32-design-systems` → 4 `examples.*.md` files
- [ ] Command: `grep -rn 'https://\|http://' lessons/03-design-ux/*/examples*.md` → 0 matches

### WP-32: Examples for Adobe XD, Framer, Lean UX, service design, A/B testing

**Context:**
`35-adobe-xd`, `36-framer` and `37-lean-ux` are `small`; `38-service-design` and `39-ab-testing` are
`medium` with two children each.

**Task:**
Create the 7 examples files listed below, each built from two of its lesson's `### Core ideas`.

**Files:**
| Entry dir | Examples files — CREATE |
| --- | --- |
| `lessons/03-design-ux/35-adobe-xd` | `examples.md` |
| `lessons/03-design-ux/36-framer` | `examples.md` |
| `lessons/03-design-ux/37-lean-ux` | `examples.md` |
| `lessons/03-design-ux/38-service-design` | `examples.01-frontstage-backstage-and-support-processes.md`, `examples.02-designing-across-channels.md` |
| `lessons/03-design-ux/39-ab-testing` | `examples.01-designing-the-test.md`, `examples.02-interpreting-the-result.md` |

**Constraints:**
- DO: write one file per `write` tool call.
- DO: for `39-ab-testing` `02-interpreting-the-result` show a small results table with sample size and the decision the numbers support, including the case where the result is not significant.
- DO: for `38-service-design` `01-frontstage-backstage-and-support-processes` use a `text` swimlane sketch.
- DO: keep each file between 120 and 450 words.
- DO: no frontmatter, no `####`, no external URLs, em dash with spaces in headings.
- DO NOT: edit the lesson files.
- DO NOT: present a fabricated significance value as a real experiment.

**Success:**
- [ ] Command: `node tools/validate-content.mjs --topic 03-design-ux` → `0 error(s)`
- [ ] Command: `grep -rn 'https://\|http://' lessons/03-design-ux/*/examples*.md` → 0 matches
- [ ] Check: each file has one `### Solution` per `## Example`

### WP-33: Examples for prototyping, design tokens, handoff, Maze, interaction design

**Context:**
`40-prototyping` and `44-interaction-design` are `medium` with two children each;
`41-design-tokens`, `42-design-handoff-specs` and `43-maze` are `small`. These are the last design-ux
entries.

**Task:**
Create the 7 examples files listed below, each built from two of its lesson's `### Core ideas`.

**Files:**
| Entry dir | Examples files — CREATE |
| --- | --- |
| `lessons/03-design-ux/40-prototyping` | `examples.01-prototype-fidelity.md`, `examples.02-testing-a-prototype-with-real-users.md` |
| `lessons/03-design-ux/41-design-tokens` | `examples.md` |
| `lessons/03-design-ux/42-design-handoff-specs` | `examples.md` |
| `lessons/03-design-ux/43-maze` | `examples.md` |
| `lessons/03-design-ux/44-interaction-design` | `examples.01-states-and-feedback.md`, `examples.02-flow.md` |

**Constraints:**
- DO: write one file per `write` tool call.
- DO: for `41-design-tokens` show the token file as `json` or `css` and the component consuming it.
- DO: for `44-interaction-design` `01-states-and-feedback` show the empty, loading, error and success states as the artefact — four short blocks beat one long one.
- DO: keep each file between 120 and 450 words.
- DO: no frontmatter, no `####`, no external URLs, em dash with spaces in headings.
- DO NOT: edit the lesson files.
- DO NOT: add a third example.

**Success:**
- [ ] Command: `node tools/validate-content.mjs --topic 03-design-ux` → `68 examples`, `0 examples pending`, `0 error(s)`
- [ ] Command: `find lessons/03-design-ux -name 'examples*.md' | wc -l` → `68`
- [ ] Command: `grep -rn 'https://\|http://' lessons/03-design-ux/*/examples*.md` → 0 matches

### WP-34: Examples for agile methodology, product management, product discovery

**Context:**
`04-product-process/02-agile-methodology` is `medium`; `03-product-management` is `large` with four
children; `04-product-discovery` is `medium`.

**Task:**
Create the 8 examples files listed below, each built from two of its lesson's `### Core ideas`.

**Files:**
| Entry dir | Examples files — CREATE |
| --- | --- |
| `lessons/04-product-process/02-agile-methodology` | `examples.01-values-and-principles.md`, `examples.02-short-iterations-and-feedback.md` |
| `lessons/04-product-process/03-product-management` | `examples.01-the-decision-role.md`, `examples.02-working-with-engineering-and-design.md`, `examples.03-the-evidence-behind-a-decision.md`, `examples.04-saying-no.md` |
| `lessons/04-product-process/04-product-discovery` | `examples.01-finding-a-problem-worth-solving.md`, `examples.02-testing-a-solution-cheaply.md` |

**Constraints:**
- DO: write one file per `write` tool call.
- DO: use `text` fences for the artefact: a decision memo, a one-page discovery brief, a cheap-test plan.
- DO: for `03-product-management` `04-saying-no` show the written reply as the solution, and say in 2–4 sentences what makes it a decision rather than a delay.
- DO: keep each file between 120 and 450 words.
- DO: no frontmatter, no `####`, no external URLs, em dash with spaces in headings.
- DO NOT: edit the lesson files.
- DO NOT: name a real company's internal decision as an example.

**Success:**
- [ ] Command: `node tools/validate-content.mjs --topic 04-product-process` → `0 error(s)`
- [ ] Command: `ls lessons/04-product-process/03-product-management` → 4 `examples.*.md` files
- [ ] Command: `grep -rn 'https://\|http://' lessons/04-product-process/*/examples*.md` → 0 matches

### WP-35: Examples for requirements, business analysis, stakeholders, technical writing

**Context:**
All four entries are `medium` skills with two children each, so this WP creates eight child-level
examples files and no `examples.md`.

**Task:**
Create the 8 examples files listed below, each built from two of its lesson's `### Core ideas`.

**Files:**
| Entry dir | Examples files — CREATE |
| --- | --- |
| `lessons/04-product-process/05-requirements-engineering` | `examples.01-specifying-behaviour-testably.md`, `examples.02-reviewing-and-tracing-requirements.md` |
| `lessons/04-product-process/06-business-analysis` | `examples.01-mapping-the-current-process.md`, `examples.02-gap-analysis-and-options.md` |
| `lessons/04-product-process/07-stakeholder-management` | `examples.01-the-power-and-interest-map.md`, `examples.02-keeping-people-aligned-and-informed.md` |
| `lessons/04-product-process/08-technical-writing` | `examples.01-structure-of-a-spec-or-readme.md`, `examples.02-editing-for-the-reader.md` |

**Constraints:**
- DO: write one file per `write` tool call.
- DO: for `05-requirements-engineering` `01-specifying-behaviour-testably` show a vague requirement and its testable rewrite, with the acceptance criterion stated in the solution.
- DO: for `06-business-analysis` `01-mapping-the-current-process` use a `text` flow sketch with the handoffs marked.
- DO: for `08-technical-writing` `02-editing-for-the-reader` show a paragraph before and after, and name the one change that did most of the work.
- DO: keep each file between 120 and 450 words.
- DO: no frontmatter, no `####`, no external URLs, em dash with spaces in headings.
- DO NOT: edit the lesson files.
- DO NOT: put a line beginning with `## ` inside a fence — the validator parses it as a real heading and the file fails V15.

**Success:**
- [ ] Command: `node tools/validate-content.mjs --topic 04-product-process` → `0 error(s)`
- [ ] Command: `ls lessons/04-product-process/05-requirements-engineering` → both `examples.*.md` files present
- [ ] Command: `grep -rn 'https://\|http://' lessons/04-product-process/*/examples*.md` → 0 matches

### WP-36: Examples for the nine remaining product-process entries

**Context:**
`09-agile-software-development`, `11-kanban`, `12-user-story`, `13-jira-confluence`, `14-roadmapping`,
`15-prioritization-frameworks-rice-moscow`, `16-user-acceptance-testing` and
`17-estimation-story-points` are `small` skills with one `examples.md` each;
`10-scrum-software-development` is `medium` with two children.

**Task:**
Create the 10 examples files listed below, each built from two of its lesson's `### Core ideas`.

**Files:**
| Entry dir | Examples files — CREATE |
| --- | --- |
| `lessons/04-product-process/09-agile-software-development` | `examples.md` |
| `lessons/04-product-process/10-scrum-software-development` | `examples.01-roles-and-ceremonies.md`, `examples.02-the-backlog-and-sprint-flow.md` |
| `lessons/04-product-process/11-kanban` | `examples.md` |
| `lessons/04-product-process/12-user-story` | `examples.md` |
| `lessons/04-product-process/13-jira-confluence` | `examples.md` |
| `lessons/04-product-process/14-roadmapping` | `examples.md` |
| `lessons/04-product-process/15-prioritization-frameworks-rice-moscow` | `examples.md` |
| `lessons/04-product-process/16-user-acceptance-testing` | `examples.md` |
| `lessons/04-product-process/17-estimation-story-points` | `examples.md` |

**Constraints:**
- DO: write one file per `write` tool call.
- DO: for `15-prioritization-frameworks-rice-moscow` show the score row with each factor named and the resulting rank.
- DO: for `17-estimation-story-points` show three stories with reference-point estimates and say in the solution what makes the comparison honest.
- DO: for `13-jira-confluence` describe the board and the page as artefacts in `text`, naming the tool but no URL.
- DO: keep each file between 120 and 450 words.
- DO: no frontmatter, no `####`, no external URLs, em dash with spaces in headings.
- DO NOT: edit the lesson files.
- DO NOT: add a third example.

**Success:**
- [ ] Command: `node tools/validate-content.mjs --topic 04-product-process` → `26 examples`, `0 examples pending`, `0 error(s)`
- [ ] Command: `find lessons/04-product-process -name 'examples*.md' | wc -l` → `26`
- [ ] Command: `grep -rn 'https://\|http://' lessons/04-product-process/*/examples*.md` → 0 matches

## Phase Verification

After all work packages are complete, run:

```bash
node tools/validate-content.mjs --topic 03-design-ux
node tools/validate-content.mjs --topic 04-product-process
node tools/validate-content.mjs
find lessons/03-design-ux lessons/04-product-process -name 'examples*.md' | wc -l
grep -rn 'https://\|http://' lessons/03-design-ux/*/examples*.md lessons/04-product-process/*/examples*.md
```

- [ ] `03-design-ux` reports `68 examples`, `0 examples pending`, `0 error(s)`
- [ ] `04-product-process` reports `26 examples`, `0 examples pending`, `0 error(s)`
- [ ] `find` reports 94 files
- [ ] The URL grep reports nothing
- [ ] No lesson file in either topic was modified
