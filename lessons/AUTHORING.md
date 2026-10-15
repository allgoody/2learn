# Authoring lessons

This corpus turns the flat skill list in `seed/` into 177 structured lesson entries — one directory per entry, roughly 401 files in total. Every lesson is written against this file. Where this file and anything else disagree, this file wins: `tools/inventory.json` supplies the facts (ids, titles, tiers, prereqs) and this file supplies the shape.

## 1. Layout and ids

Each entry lives at `lessons/<NN-topic>/<NN-slug>/index.md`, with optional child lessons beside it:

```
lessons/
  01-cs-fundamentals/
    12-git/
      index.md
      01-<child-slug>.md
      02-<child-slug>.md
```

- `<NN-topic>` is one of the eight topic directories: `01-cs-fundamentals`, `02-frontend`, `03-design-ux`, `04-product-process`, `05-backend-data`, `06-cloud-devops`, `07-security`, `08-soft-skills`, numbered in learning order.
- The entry directory is `NN-<slug>`, where `<slug>` matches `^[a-z0-9]+(-[a-z0-9]+)*$`. The numeric prefix is part of both the directory name and the id.
- Numbers follow the learning order: the topic's area page takes `01` in its topic, and the other entries follow the order frozen in `tools/renumber-map.json` — a valid dependency order, in which every prereq is numbered lower than the entry that needs it. Numbers are contiguous from `01` and are never re-derived by sorting.
- An entry id is `<NN-topic>/<NN-slug>`, for example `01-cs-fundamentals/12-git`. A child id is the entry id plus the child filename without `.md`, for example `02-frontend/29-react/01-rendering-and-jsx`.
- Children are ordered by filename ascending. There is no `order:` field anywhere.

Take slugs, titles, types, tiers and prereqs verbatim from `tools/inventory.json`. Never re-derive a slug from a title and never reword a title.

## 2. Frontmatter — index.md

Every `index.md` opens with a YAML frontmatter block. Write the eight keys in this order:

```yaml
---
title: React
type: skill
topic: frontend
tier: large
status: drafted
aliases: []
prereqs: ["frontend/javascript", "frontend/typescript"]
related: []
---
```

| Key | Value |
| --- | --- |
| `title` | String, verbatim from the inventory. |
| `type` | `skill` or `area`. |
| `topic` | The topic slug; must equal the parent directory name. |
| `tier` | `small`, `medium` or `large`. An `area` is always `small`. |
| `status` | `stub`, `drafted` or `reviewed`. |
| `aliases` | Array of strings; use `[]` when there are none. |
| `prereqs` | Array of inventory ids; use `[]` when there are none. |
| `related` | Array of inventory ids; use `[]` when there are none. |

`prereqs` must match the inventory exactly. Adding an edge the inventory does not list is an error, and so is omitting one. `related` prefers entries in the same seed `##` section but may name any inventory id; leave it empty rather than guess.

## 3. Frontmatter — children

A child lesson has exactly two keys, in this order:

```yaml
---
title: State and hooks
prereqs: ["frontend/react/02-components-and-props"]
---
```

Children inherit topic and skill from their path. They carry no `type`, `tier`, `aliases` or `related`.

A child's `prereqs` may name the parent entry's inventory id, an earlier sibling child id, or an inventory id the parent lists. It must never name a later sibling, and every target must resolve to an inventory id or to a child that exists.

## 4. Body shapes

There are three shapes and no others. The headings are verbatim and in sentence case; no other `##` headings are permitted.

| Shape | Used for | Section headings, in order | Words |
| --- | --- | --- | --- |
| Full lesson | A `small` skill's `index.md`, and every child lesson | `## What it is`, `## Why it matters`, `## Core ideas`, `## Practice`, `## Common mistakes`, `## Go deeper` | 450-950 |
| Track landing | A `medium` or `large` skill's `index.md` | `## What it is`, `## Why it matters`, `## In this track`, `## Prerequisites`, `## Go deeper` | 200-400 |
| Area page | Any `type: area` | `## What it covers`, `## Why it matters`, `## Included skills`, `## Where to start` | 120-300 |

Word count means whitespace-separated tokens in the body after the frontmatter, counted across the whole body including code blocks.

An examples file is not a lesson file: it has no frontmatter and uses none of the three shapes above. It is governed by §12.

## 5. Section rules

### ## What it is

1-3 sentences expanding the seed's one-liner. Do not repeat the seed wording verbatim. No code unless it is a one-line illustration.

### ## Why it matters

One paragraph of 3-5 sentences. Be concrete: what breaks without it, what it costs, where you meet it in practice. No marketing adjectives.

### ## Core ideas

3 to 6 `###` subheadings, each a noun phrase, each followed by 2-4 sentences and a short fenced example block where the topic allows one. Order them from foundation to detail.

### ## Practice

1-2 `###` exercises. Each ends with a line beginning `Done when:` naming a concrete, observable result, for example:

```
Done when: `npm test` reports 3 passing tests and you have seen one of them fail first.
```

### ## Common mistakes

3-5 bullets, each matching exactly:

```
- **<mistake>** — <what goes wrong>; fix: <what to do instead>.
```

### ## Go deeper

2-5 bullets, each matching exactly:

```
- **<Title>** (`<id>`) — <why it is the next thing to read>.
```

Ids must resolve to an inventory id or to a child of the current entry. For a `small` skill and for a child lesson the list must include one bullet for every id that file's `prereqs` array names — neither shape has a `## Prerequisites` section, so this is where the reader sees what to read first. A track landing is exempt, because it lists its prereqs under `## Prerequisites` instead.

### ## In this track

A numbered list, one line per child, in child order, each line:

```
1. **<child title>** (`<child id>`) — <one line on what it covers>
```

The number of lines must equal the tier's child count.

### ## Prerequisites

One bullet per inventory prereq, `- **<Title>** (<id>)`, or the single line `None.` when there are none.

### ## Included skills (area only)

One bullet per entry the area covers, `- **<Title>** (<id>) — <one line>`.

### ## Where to start (area only)

2-4 sentences naming which included entries to read first and in what order.

## 6. Tiers and child count

| Tier | Children |
| --- | --- |
| `small` | 0 |
| `medium` | 2 |
| `large` | 4 |
| `area` | 0 |

To write an entry, work in this order:

1. Read the entry's row in `tools/inventory.json`.
2. For a `medium` or `large` entry, decide the child lesson titles that partition the topic and write them into the index's `## In this track` list first.
3. Write `index.md`.
4. Write the children in filename order, each a full lesson.

The child titles are your only design decision. They must not overlap each other, and together they must cover the whole topic.

## 7. Prerequisites

The prerequisite graph is given, not chosen. Cross-topic edges are normal. A prereq may point at an entry that is not written yet — the validator reports it as pending, not as an error. `related` is for sibling entries only.

## 8. Merged entries

Thirteen umbrella seed entries collapse into three area pages. The absorbed names survive as aliases:

| Merged seed entries | Result entry |
| --- | --- |
| Cloud Computing, Cloud Infrastructure, Cloud Development, Cloud Applications, Cloud Deployment, Application Deployment | `06-cloud-devops/01-cloud-computing` |
| UI/UX Design, UI, User Experience, User Experience Design | `03-design-ux/01-ui-ux-design` |
| Software Development, Application Development, Software Development Life Cycle | `04-product-process/01-software-development` |

No lesson is written for an absorbed name. The names live in the area page's `aliases`, so a search for one still lands on the area. `seed/` remains the archive of the original list.

## 9. Voice

Write British English (`organise`, `colour`, `centred`, `labelled`, `recognise`, `behaviour`); titles keep their inventory spelling verbatim. Use second person, present tense and active voice. Define a term on first use. Prefer a concrete example to an abstraction. Use no external URLs anywhere — any `http` or `https` link is rejected by the validator, and the "Go deeper" links point at other entries only. Use no emoji. Do not open with an "in this article we will" preamble, and delete any filler sentence whose removal loses no information. Every fenced code block carries a language tag (`bash`, `ts`, `css`, `sql`, `yaml`, `text`).

## 10. Status

Batch writers always write `status: drafted`. Only the user promotes an entry to `reviewed`. `stub` is reserved for a file created as a placeholder.

## 11. Validating and definition of done

```bash
node tools/validate-content.mjs
node tools/validate-content.mjs --topic <topic>
node tools/validate-content.mjs --strict
node tools/validate-content.mjs --write-index
```

| Check | What it means |
| --- | --- |
| V1 inventory | The JSON is well-formed and internally consistent. |
| V2 coverage | Every inventory entry has an `index.md`, or is reported pending. |
| V3 index frontmatter | The eight keys are present, ordered and agree with the inventory. |
| V4 headings | The body's `##` headings match its shape exactly. |
| V5 word count | The body is within its shape's word budget. |
| V6 no external URLs | No `http` or `https` link appears anywhere in the file. |
| V7 section internals | `Core ideas`, `Practice`, `Common mistakes` and `Go deeper` follow their rules. |
| V8 children | The child count, filenames, frontmatter and body shape are right. |
| V9 In this track | One numbered line per child, in order, with matching ids. |
| V10 Prerequisites | One bullet per inventory prereq, or `None.` |
| V11 area pages | No children, resolvable included skills, a non-empty `Where to start`. |
| V12 resolution | The shared set of ids a link is allowed to point at. |
| V13 write-index | Regenerates `lessons/INDEX.md`; never edit that file by hand. |
| V14 unknown entries | A directory under `lessons/` that is not an inventory id is an error. |
| V15 examples files | An examples file has no frontmatter, 1-2 examples each with a `### Solution`, tagged fences and 120-450 words. |
| V16 examples coverage | Every full-shape lesson has an examples file; an orphan examples file is an error. |

Errors print as `path:line — [V<n>] message`. Read them from the top and fix them in order.

An entry is done only when `node tools/validate-content.mjs --topic <topic>` reports `0 error(s)` with the entry counted as present.

## 12. Examples files

A worked example shows a small, complete piece of work from the lesson, with its finished solution, so the reader can compare their own attempt against a reference. It is not an exercise: `## Practice` already asks the reader to do something.

An examples file belongs to exactly one full-shape lesson — a `small` skill's `index.md` or a child lesson. A landing or area index has no `## Practice` and gets no examples file.

The name is derived mechanically from the lesson file it sits beside: `examples.md` beside `index.md`, `examples.NN-slug.md` beside `NN-slug.md`.

| Lesson file | Examples file |
| --- | --- |
| `index.md` | `examples.md` |
| `01-cascade-and-box-model.md` | `examples.01-cascade-and-box-model.md` |
| `04-modern-css.md` | `examples.04-modern-css.md` |

An examples file has **no frontmatter**: it starts directly with the first `## Example` heading. `title`, `prereqs` and every other field belong to the lesson file.

Write one or two examples, numbered from 1, in order, each as `## Example N — <short name>` (em dash with spaces around it). Each example has three parts, in this order:

1. A brief of 2–4 sentences naming the situation, the input, and what has to be produced.
2. One fenced block with the starting material (a file, a query, a snippet, a transcript, a sketch in `text`), with a language tag on the fence.
3. `### Solution`, followed by one fenced block with the finished artefact, followed by 2–4 sentences saying why it is right and the one thing that usually goes wrong.

Every fenced block carries a language tag: the real language where the example is code (`html`, `css`, `ts`, `bash`, `sql`, and so on), and `text` for a non-code topic. The body is **120–450 words**, counted the way §4 counts a lesson body. The voice rules of §9 apply, including the ban on external URLs.
