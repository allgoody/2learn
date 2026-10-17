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
| Full lesson | A `small` skill's `index.md`, and every child lesson | `## What it is`, `## Why it matters`, `## Core ideas`, `## Practice`, `## Common mistakes`, `## Go deeper` | 450+ |
| Track landing | A `medium` or `large` skill's `index.md` | `## What it is`, `## Why it matters`, `## In this track`, `## Prerequisites`, `## Go deeper` | 200+ |
| Area page | Any `type: area` | `## What it covers`, `## Why it matters`, `## Included skills`, `## Where to start` | 120+ |

Word count means whitespace-separated tokens in the body after the frontmatter, counted across the whole body including code blocks. The bands are **floors, not windows: there is no ceiling.** A body ends when the explanation is complete, never at a word count — an explanation that needs another worked trace, another substitution or another sentence gets one. Cutting a body to fit a number was the defect that produced this entry's §9 rule, and it is forbidden. The one thing a floor still buys is substance: a body below it is not an explanation yet.

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

Write British English (`organise`, `colour`, `centred`, `labelled`, `recognise`, `behaviour`); titles keep their inventory spelling verbatim. Use second person, present tense and active voice. Define a term on first use. Prefer a concrete example to an abstraction. Use no external URLs anywhere — any `http` or `https` link is rejected by the validator, and the "Go deeper" links point at other entries only. Use no emoji. Do not open with an "in this article we will" preamble, and delete any filler sentence whose removal loses no information — that rule deletes sentences which carry none; it never licenses deleting the one sentence that explains a term or a number. Every fenced code block carries a language tag (`bash`, `ts`, `css`, `sql`, `yaml`, `text`).

**Every symbol, abbreviation and number is explained where it is used.** A name that appears in a claim, a formula or a diagram — `base`, `n`, `size`, `index 3`, "the whole cache line" — is given its meaning and its value in that same block, and a formula is written as a **substitution of those definitions**, not as a fresh assertion: `start = 1000`, `index = 3`, `size = 4`, then `start + index * size = 1000 + 3 * 4 = 1012`. A number that appears in arithmetic without having been given a name and a value above it is a defect, and so is a claim with no number and no example attached. **Renaming a term to a plainer synonym is not explaining it** — `width` → `size` explains nothing; `size = 4 — bytes one number takes` explains it. The test is the reader's question: if a sentence makes them ask "what is that?", it is wrong however confident it sounds. This is the defect class the corpus was built to avoid, and it passes every automated check: nothing in `tools/` can see it.

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
| V15 examples files | An examples file has no frontmatter, 1-2 examples each with a `### Solution`, tagged fences and 120+ words. |
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

Every fenced block carries a language tag: the real language where the example is code (`html`, `css`, `ts`, `bash`, `sql`, and so on), and `text` for a non-code topic. The body is **120+ words** — a floor only, like every other band; the example ends when it is complete. Counted the way §4 counts a lesson body. The voice rules of §9 apply, including the ban on external URLs.

## 13. The Russian corpus

The Russian corpus is a full mirror of the English one under `lessons/ru/`. Every file at `lessons/<relative path>` becomes `lessons/ru/<same relative path>`:

```text
lessons/01-cs-fundamentals/04-database-internals/index.md
lessons/01-cs-fundamentals/04-database-internals/examples.md
  ↓
lessons/ru/01-cs-fundamentals/04-database-internals/index.md
lessons/ru/01-cs-fundamentals/04-database-internals/examples.md
```

Nothing is renamed, added, dropped or reordered: the same eight topic directories, the same entry directories, the same child filenames, the same examples filenames. Nothing outside `lessons/ru/` is edited by Russian work.

**Ids stay language-free.** A Russian `index.md` keeps the English `type`, `tier`, `topic`, `aliases`, `prereqs` and `related` verbatim, and always `status: drafted`. Only `title` and the body prose are translated. A child file keeps its `prereqs` verbatim and translates only its `title`. Both roots share one id namespace, so the site tells the languages apart by the path root, not by a frontmatter field.

**Titles come from `lessons/ru/GLOSSARY.md`.** It holds the agreed Russian title of every entry and the terminology table. A title is decided once there and copied, never improvised per file. V17 checks that every `**Title**` bullet matches the `title` in its target file.

**The heading vocabulary** is fixed. Use these headings verbatim, in the same order as the English file — no synonyms, no variants, no extra headings, no trailing punctuation. The em dash is U+2014 with spaces around it.

| English heading | Russian heading | Shape |
| --- | --- | --- |
| `What it is` | `Что это такое` | full, landing |
| `Why it matters` | `Почему это важно` | full, landing, area |
| `Core ideas` | `Ключевые идеи` | full |
| `Practice` | `Практика` | full |
| `Common mistakes` | `Частые ошибки` | full |
| `Go deeper` | `Что читать дальше` | full, landing |
| `In this track` | `Что в этом треке` | landing |
| `Prerequisites` | `Предварительные требования` | landing |
| `What it covers` | `Что охватывает` | area |
| `Included skills` | `Входящие навыки` | area |
| `Where to start` | `С чего начать` | area |
| `## Example N — …` | `## Пример N — …` | examples |
| `### Solution` | `### Решение` | examples |

An area page therefore keeps the English four-heading shape (`Что охватывает`, `Почему это важно`, `Входящие навыки`, `С чего начать`); `Что это такое` belongs to full lessons and track landings only.

**Three literals change:**

| English | Russian |
| --- | --- |
| `Done when:` (start of a line in `## Практика`) | `Готово, когда:` |
| `None.` (the whole `## Предварительные требования` body) | `Нет.` |
| `; fix: ` (inside a `## Частые ошибки` bullet) | `; исправить: ` |

**Russian word bands** replace the English ones (Russian renders the same content in fewer words). Like the English bands they are **floors with no ceiling** — the Russian text is finished when the explanation is complete, not when it reaches a count:

| Shape | Russian floor |
| --- | --- |
| full | 400+ |
| landing | 180+ |
| area | 100+ |
| examples | 100+ |

**Code stays as it is, prose is translated.** Keep identifiers, keywords, command names, file names, regex patterns and every fence's language tag unchanged. Translate the comments and the prose strings inside the fences, and keep a `text` diagram's column alignment readable while translating its labels. Product and language names stay in Latin script (React, Git, Docker, Kubernetes, Figma, npm, TypeScript); acronyms keep their common Latin form (HTML, CSS, SQL, API, CI/CD, AWS, GCP). British English does not apply to the Russian corpus.

**Definition of done.** `node tools/validate-content.mjs --strict --lang ru` reports `177 present, 0 pending, 297 examples, 0 examples pending, 0 error(s)` and exits 0. To check one topic while translating: `node tools/validate-content.mjs --topic <topic dir> --lang ru`. `--write-index --lang ru` regenerates `lessons/ru/INDEX.md`; never edit that file by hand.

## 14. Russian prose

A Russian file is written in Russian, not translated sentence by sentence. This section governs the prose only. Every rule of §13 still holds — the heading vocabulary, the language-free ids, the three literals, the fence tags, the word bands and the frozen frontmatter — so a file that satisfies §14 but breaks §13 is still wrong.

`node tools/check-ru-style.mjs --strict` is the gate: it exits 1 while any target below is missed, and it names every file that breaks a per-file rule. `node tools/check-ru-style.mjs --diff` is the structural guard: it compares each file against the baseline commit and reports which of the frozen invariants moved.

### Measurement

Two slices and one word count. Every number in this section comes from them.

**V5 word count** — the whole file from the line after the closing `---` to the end, whitespace split, empty parts dropped. This is exactly `tools/validate-content.mjs:315`. It is what the word bands use.

**`flow` — the sentence slice.** The file with the frontmatter block removed, every fenced block removed (the text between an opening and a closing ``` line, inclusive), and bullet markers (`- `, `1. `) dropped. **Heading lines are kept**, because a heading closes the sentence before it. Sentences are cut at a line end and after `[.!?…]` when the next non-space character is `А-ЯЁ A-Z 0-9 « " „ —`; each sentence is trimmed and the empties dropped. A sentence's length is its character count. This slice feeds the sentence count, the Pearson correlation, the two median sentence lengths and their ratio.

**`prose` — the marker slice.** `flow` with **every heading line also removed** — `/^#{1,6} /`, all six levels, not only `## `. This slice feeds the blacklist, the `— это ` count, the participle count and the connector count. All six levels matter: dropping only `## ` inflates the blacklist baseline to 16 hits in 11 files and the copula baseline to 2.91 per 1000.

These are deliberately not the same slice. The blacklist, copula and participle baselines reproduce only on `prose`; the sentence-count figure reproduces only on `flow`. Do not "unify" them.

### Frozen

`--diff` compares each file against the baseline commit and fails the moment anything but prose has changed.

1. The frontmatter block — from the first line through the closing `---` — byte for byte (`[D1]`).
2. Every line matching `## `, as an ordered list, byte for byte (`[D2]`).
3. Every fenced block, from its opening fence line through its closing fence line inclusive, as an ordered list, byte for byte; the language tag lives on the opening line, so it is covered (`[D3]`).
4. The multiset of backticked spans — every id stays byte-identical (`[D4]`).
5. The multiset of numeric tokens (`[D5]`).
6. Every `## Пример N — …` line of an examples file, as an ordered list (`[D6]`).
7. The count of each of `Готово, когда:`, `Нет.`, `; исправить: ` and `### Решение` (`[D7]`).
8. The `status:` value, which stays `drafted` (`[D10]`).
9. The 177 title rows of `lessons/ru/GLOSSARY.md`. This one is not a `--diff` check — the gate skips `GLOSSARY.md` — but it is guarded by the `--write-index --lang ru` no-diff check and by `git diff`. A terminology row may be corrected when a recast stops using a calque (R7); a title row may not be touched, because `title` feeds `INDEX.md` and V17.

Diff mode also carries two guards of its own: `[D8]`, the V5 word count must stay **above the file's shape floor** (there is no ceiling to stay under), and `[D9]`, a missing baseline blob is always an error. `--strict` does not change diff mode; every diff invariant is a hard error.

### Baselines and targets

`BASELINE_METRICS` in `tools/check-ru-style.mjs` is what the gate printed on the untouched corpus on 2026-10-16:

```text
698 files, 332680 words
  correlation with the English twin   0.924
  same sentence count as the English   625/698 = 89.5%
  RU/EN median sentence-length ratio   1.046
  однако per 1000 words                0.00
  X — это per 1000 words               2.59
  attributive participles per 1000     2.76
  blacklist hits                       15 in 10 files
```

The word count and the four marker rows are exact. The three sentence-level rows belong to the splitter above; they differ from the plan's first draft (0.926 / 95.7% / 0.861), and these recorded values stand.

| Signal | Baseline | Target |
| --- | --- | --- |
| Correlation with the English twin | mean 0.924 | mean ≤ 0.60 |
| Same sentence count as the English | 625/698 = 89.5% | ≤ 40% |
| RU/EN median sentence-length ratio | mean 1.046 | mean ≥ 0.95 |
| `однако` per 1000 words | 0.00 | ≥ 0.80 |
| `X — это ` per 1000 words | 2.59 | ≤ 1.50 |
| Attributive participles per 1000 words | 2.76 | ≤ 2.00 |
| Blacklist hits | 15 in 10 files | 0 |
| `— это ` in one file | — | ≤ 3 |

The ratio is measured in characters, as the splitter above states, and under that splitter the recorded baseline already exceeds the target, so R2 guards against compressing the Russian rather than driving the recast.

### Rules

**R1 — Discard the English sentence plan.** Merge two English sentences into one, split one into two, reorder them. The Russian sentence count must not equal the English twin's: target ≤ 0.60 mean correlation and ≤ 40% of files with an identical count (baseline 0.924 and 89.5%).

**R2 — Let the Russian sentence be as long as it needs to be.** Russian technical prose subordinates where English juxtaposes. Target ≥ 0.95 for the RU/EN median sentence-length ratio (baseline 1.046 — see the note above).

**R3 — Put new information last.** Build from the known to the new. Do not front the grammatical subject merely because the English did.

**R4 — `X — это Y` is a calque of `X is Y`.** Keep it only where a term is defined for the first time — in practice the opening sentence of `Что это такое`. Everywhere else use a real verb, a colon, or a predicate-first construction. Target ≤ 1.50 per 1000 words (baseline 2.59), and ≤ 3 in any one file.

**R5 — An English `-ing` clause never becomes an attributive Russian participle.** Use a `который` clause, a `при этом` clause, `поскольку`, or a separate sentence. Target ≤ 2.00 per 1000 words (baseline 2.76).

**R6 — Restore the Russian discourse layer.** English does with a comma, a dash and juxtaposition what Russian does with connectives. Use `однако`, `при этом`, `зато`, `хотя`, `ведь`, `поэтому`, `то есть`, `иначе говоря` where the argument actually turns or explains. Target ≥ 0.80 `однако` per 1000 words (baseline 0.00). Do not sprinkle them: a connective that does not mark a real turn is worse than none.

**R7 — Terminology is the settled Russian term, not the calque.** The terminology table in `lessons/ru/GLOSSARY.md` is authoritative; when a row is itself a calque, replace it with the form Russian practitioners use and update that row in the same work package. An index-only scan is `сканирование только по индексу`, not `индексный проход`.

**R8 — These idioms must not survive.** `делает то же самое`, `делает то же`, `то же самое, но`, `в одежде`, `стоящий за`, `играет роль`, `делает это возможным`. Use `так же`, `столь же`, `тот же …, только`, or rewrite the sentence. Target 0 hits (baseline 15 in 10 files), measured on `prose`. Diff mode cannot check this, because some raw hits sit inside frozen fences.

**R9 — Facts are frozen.** No number, name, claim, cause, condition or code sample may be added, dropped, softened or strengthened. The English twin is the reference for every factual statement; if the Russian says something the English does not, the recast restores the English claim rather than inventing a third version. `--diff` catches the mechanical half of this; the rest is the writer's responsibility.

**R10 — Keep the register.** Neutral technical Russian, second person, present tense, active voice, no marketing adjectives, no emoji, no filler. Product and language names stay in Latin script (React, Git, Docker, Kubernetes, npm, TypeScript). British English does not apply to this corpus.

**R11 — Do not touch the structure.** Headings, their order, the three literals, the backticked ids, the em dash (U+2014, spaced), the fence language tags and the `**Title**` bullet ids are the validator's contract, and §13 states them in full. A recast changes prose only. A line beginning with `## ` inside a fence is never introduced, because the validator parses it as a real heading.

### Word bands

The bands of §13 are unchanged except that their ceilings are gone (2026-10-17): `full` 400+, `landing` 180+, `area` 100+, `examples` 100+ words, counted exactly as V5 counts them. They are not a target — a recast is finished when the Russian reads as Russian, at any length above the floor. One warning survives: merging sentences lowers the word count, so do not let a landing fall below its floor.
