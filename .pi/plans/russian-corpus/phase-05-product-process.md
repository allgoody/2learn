# Phase 5: 04-product-process

## Objective

Mirror `lessons/04-product-process/` into `lessons/ru/04-product-process/` — 61 files across 17
entries. This topic is almost entirely prose: process descriptions, meeting artefacts, written
decisions.

## Prerequisites

- Phase 4 complete: `node tools/validate-content.mjs --topic 03-design-ux --lang ru` reports
  `0 error(s)` and the Russian design-ux count is `156`.
- `node tools/validate-content.mjs --strict --lang en` still exits 0.

## Shared Context

See `phase-02-cs-fundamentals.md` → Shared Context for the mirror rule and the full translation
constraint list. It applies unchanged here. Topic-specific additions:

- Process vocabulary has settled Russian forms — `итерация`, `спринт`, `бэклог`, `стендап`,
  `ретроспектива`, `требования`, `заинтересованные стороны`, `дорожная карта`, `оценка`, `стори-поинт`.
  Use them consistently and record any new decision.
- Framework and tool names stay in Latin script: Scrum, Kanban, Agile, Jira, Confluence, RICE,
  MoSCoW.
- The artefacts here are documents: a requirements list, a stakeholder map, a roadmap, a user story,
  a prioritisation score row, an estimate table. Keep their structure in the `text` fences and
  translate the content of each cell.
- User stories keep their established Russian shape (`Как <роль>, я хочу <действие>, чтобы <цель>`)
  applied identically in every file that quotes one.

**Command after every entry:**
`node tools/validate-content.mjs --topic 04-product-process --lang ru`

## Work Packages

### WP-27: Mirror the area page, agile methodology, product management, discovery and requirements

**Context:**
`01-software-development` is the topic's `area` entry; `02-agile-methodology`,
`04-product-discovery` and `05-requirements-engineering` are `medium` with two children each;
`03-product-management` is `large` with four children.

**Task:**
Create the 25 Russian files for the five directories listed below.

**Files:**
| English directory | Files to create under `lessons/ru/` | Files |
| --- | --- | --- |
| `lessons/04-product-process/01-software-development` | `index.md` | 1 |
| `lessons/04-product-process/02-agile-methodology` | `index.md`, `01-values-and-principles.md`, `02-short-iterations-and-feedback.md`, two matching `examples.*` | 5 |
| `lessons/04-product-process/03-product-management` | `index.md`, four children, four matching `examples.*` | 9 |
| `lessons/04-product-process/04-product-discovery` | `index.md`, `01-finding-a-problem-worth-solving.md`, `02-testing-a-solution-cheaply.md`, two matching `examples.*` | 5 |
| `lessons/04-product-process/05-requirements-engineering` | `index.md`, `01-specifying-behaviour-testably.md`, `02-reviewing-and-tracing-requirements.md`, two matching `examples.*` | 5 |

**Constraints:**
- DO: follow every constraint in Shared Context.
- DO: keep the area page's `Входящие навыки` bullet ids exactly as the English file has them.
- DO: keep the Agile manifesto's four values rendered as the established Russian wording, applied identically wherever the corpus quotes them.
- DO: keep requirement identifiers, ticket keys and table columns intact.
- DO NOT: create `examples.md` for the area page or for any `medium` or `large` index.
- DO NOT: edit anything under `lessons/04-product-process/`.

**Success:**
- [ ] Command: `node tools/validate-content.mjs --topic 04-product-process --lang ru` → no error naming any of the 25 files
- [ ] Command: `find lessons/ru/04-product-process/03-product-management -name '*.md' | wc -l` → `9`
- [ ] Command: `ls lessons/ru/04-product-process/01-software-development` → `index.md` only

### WP-28: Mirror business analysis, stakeholders, technical writing, Agile, Scrum, Kanban and user story

**Context:**
`06-business-analysis`, `07-stakeholder-management`, `08-technical-writing` and
`10-scrum-software-development` are `medium`; `09-agile-software-development`, `11-kanban` and
`12-user-story` are `small`.

**Task:**
Create the 26 Russian files for the seven directories listed below.

**Files:**
| English directory | Files to create under `lessons/ru/` | Files |
| --- | --- | --- |
| `lessons/04-product-process/06-business-analysis` | `index.md`, `01-mapping-the-current-process.md`, `02-gap-analysis-and-options.md`, two matching `examples.*` | 5 |
| `lessons/04-product-process/07-stakeholder-management` | `index.md`, `01-the-power-and-interest-map.md`, `02-keeping-people-aligned-and-informed.md`, two matching `examples.*` | 5 |
| `lessons/04-product-process/08-technical-writing` | `index.md`, `01-structure-of-a-spec-or-readme.md`, `02-editing-for-the-reader.md`, two matching `examples.*` | 5 |
| `lessons/04-product-process/09-agile-software-development` | `index.md`, `examples.md` | 2 |
| `lessons/04-product-process/10-scrum-software-development` | `index.md`, `01-roles-and-ceremonies.md`, `02-the-backlog-and-sprint-flow.md`, two matching `examples.*` | 5 |
| `lessons/04-product-process/11-kanban` | `index.md`, `examples.md` | 2 |
| `lessons/04-product-process/12-user-story` | `index.md`, `examples.md` | 2 |

**Constraints:**
- DO: follow every constraint in Shared Context.
- DO: in `08-technical-writing`, the before/after prose pair must be two *Russian* paragraphs — translate the intent, not the English sentences, so that the edit the solution names still applies.
- DO: keep the user-story shape identical in the lesson and in every example that quotes one.
- DO: keep process-flow sketches' arrows and indentation readable in the `text` fences.
- DO NOT: create `examples.md` for the four `medium` indexes.
- DO NOT: edit anything under `lessons/04-product-process/`.

**Success:**
- [ ] Command: `node tools/validate-content.mjs --topic 04-product-process --lang ru` → no error naming any of the 26 files
- [ ] Command: `grep -c 'Как ' lessons/ru/04-product-process/12-user-story/index.md` → ≥ 1, and the same shape appears in its examples file
- [ ] Command: `find lessons/ru/04-product-process/06-business-analysis lessons/ru/04-product-process/07-stakeholder-management lessons/ru/04-product-process/08-technical-writing lessons/ru/04-product-process/09-agile-software-development lessons/ru/04-product-process/10-scrum-software-development lessons/ru/04-product-process/11-kanban lessons/ru/04-product-process/12-user-story -name '*.md' | wc -l` → `26`

### WP-29: Mirror Jira, roadmapping, prioritisation, UAT and estimation

**Context:**
All five entries are `small` skills, each with `index.md` and `examples.md`. These close out the
topic.

**Task:**
Create the 10 Russian files for the five directories listed below.

**Files:**
| English directory | Files to create under `lessons/ru/` | Files |
| --- | --- | --- |
| `lessons/04-product-process/13-jira-confluence` | `index.md`, `examples.md` | 2 |
| `lessons/04-product-process/14-roadmapping` | `index.md`, `examples.md` | 2 |
| `lessons/04-product-process/15-prioritization-frameworks-rice-moscow` | `index.md`, `examples.md` | 2 |
| `lessons/04-product-process/16-user-acceptance-testing` | `index.md`, `examples.md` | 2 |
| `lessons/04-product-process/17-estimation-story-points` | `index.md`, `examples.md` | 2 |

**Constraints:**
- DO: follow every constraint in Shared Context.
- DO: keep the RICE factor names and the MoSCoW labels in Latin script inside otherwise Russian sentences.
- DO: keep story-point numbers and reference-point tables exactly as the English files have them.
- DO: keep acceptance-criterion phrasing consistent between the UAT lesson and its examples.
- DO NOT: edit anything under `lessons/04-product-process/`.
- DO NOT: add a third example.

**Success:**
- [ ] Command: `node tools/validate-content.mjs --topic 04-product-process --lang ru` → `17 present`, `26 examples`, `0 error(s)`
- [ ] Command: `find lessons/ru/04-product-process -name '*.md' | wc -l` → `61`
- [ ] Command: `find lessons/ru/04-product-process -name 'examples*.md' | wc -l` → `26`
- [ ] Command: `find lessons/ru/04-product-process -name 'index.md' | wc -l` → `17`
- [ ] Command: `grep -rn '(https\|http)' lessons/ru/04-product-process` → 0 matches

## Phase Verification

After all work packages are complete, run:

```bash
node tools/validate-content.mjs --topic 04-product-process --lang ru
node tools/validate-content.mjs --lang ru
node tools/validate-content.mjs --strict --lang en
find lessons/ru/04-product-process -name '*.md' | wc -l
find lessons/04-product-process -name '*.md' | wc -l
```

- [ ] The topic run reports `17 present`, `26 examples`, `0 error(s)`
- [ ] The Russian count equals the English count: `61` and `61`
- [ ] The English `--strict` run is unchanged
- [ ] The user-story shape, the RICE labels and the MoSCoW labels are identical wherever they appear
