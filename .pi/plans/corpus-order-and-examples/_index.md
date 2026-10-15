---
plan: corpus-order-and-examples
title: "Renumber the corpus by dependency order and add worked examples"
created: 2026-10-15
status: draft
planner-model: claude-sonnet-4-5
---

# Plan: Renumber the corpus by dependency order and add worked examples

## Objective

Give every lesson directory a numeric prefix that encodes its place in the learning path
(`01-cs-fundamentals/12-git/` instead of `cs-fundamentals/git/`) and rewrite every id in the
corpus to match, then add one worked-example file beside every lesson that has a `## Practice`
section, containing 1–2 fully worked examples with their solutions. When this plan is executed,
`node tools/validate-content.mjs --strict` reports `177 present, 0 pending, 297 examples,
0 examples pending, 0 error(s)` and exits 0.

This plan does **not** touch Russian. The Russian corpus is `.pi/plans/russian-corpus/`, which
must be executed **after** this plan, because it mirrors the final paths.

## Global Context

**The project.** `2learn` is a Markdown-only lesson corpus at `D:\coding\apps\2learn`. There is
no `package.json`, no dependencies and no build step. All tooling is plain Node ESM and must keep
running on a clean checkout with nothing but Node ≥ 22.

- `lessons/<topic>/<slug>/index.md` — the unit of content. An entry is one directory.
- `lessons/<topic>/<slug>/NN-slug.md` — a child lesson. Tier fixes the count: small 0, medium 2,
  large 4, area 0.
- `tools/inventory.json` — 177 entries, fields in this order: `id`, `topic`, `slug`, `title`,
  `type`, `tier`, `prereqs`, `aliases`. 2-space indent, LF, trailing newline.
- `tools/validate-content.mjs` — 358-line zero-dependency validator, checks V1–V14, plus
  `--write-index`, `--strict` and `--topic <slug>` flags. It is the definition of done.
- `lessons/AUTHORING.md` — the frozen authoring contract: layout, frontmatter, three body shapes,
  section rules.
- `lessons/INDEX.md` — **generated** by `--write-index`. Never hand-edit it.

**Current state.** 177 entries, 403 `.md` files (401 lesson files + `AUTHORING.md` + the generated
`INDEX.md`), 8 topic directories, 268,372 words. Directories are named after the seed list, so
their on-disk order carries no meaning. `node tools/validate-content.mjs --strict` currently
reports `177 present, 0 pending, 0 error(s)` and exits 0.

**The three body shapes** (headings verbatim, no other `##` heading permitted):

| Shape | Used for | Headings | Words |
| --- | --- | --- | --- |
| full | a `small` skill's `index.md`, and every child lesson | What it is, Why it matters, Core ideas, Practice, Common mistakes, Go deeper | 450–950 |
| landing | a `medium` or `large` skill's `index.md` | What it is, Why it matters, In this track, Prerequisites, Go deeper | 200–400 |
| area | any `type: area` | What it covers, Why it matters, Included skills, Where to start | 120–300 |

A **landing** index has no `## Practice` section. That is why `examples.md` exists only for
full-shape lessons: a `small` skill's `index.md` and every child lesson file. 297 files in total.

**Key facts established during planning.**

- The prereq graph is almost entirely within-topic: 127 of the 136 edges start and end in the same
  topic. Only 9 cross a topic boundary.
- `backend-data/sql-relational-databases` → `cs-fundamentals/database-internals` is the single edge
  that points backwards under the chosen topic order. WP-1 removes it; after that, all 136 edges
  point forward.
- Every backticked id inside `lessons/` is exactly one of the 177 entry ids or one of the 224 child
  ids — verified during planning. There are no stray id-shaped tokens to worry about, so the
  rewrite sweep is total and safe. The only non-id backticked tokens in the repository live in
  `.pi/**`, which this plan must not touch.
- All 403 lesson files are LF, not CRLF. All writes still detect and preserve the original line
  ending, because a text-mode rewrite that silently converts a file is a whole-file diff.
- 22 full-shape lessons sit at 930–950 of the 950-word ceiling and 4 are at exactly 950. **Adding a
  pointer line to any `## Practice` section would break V5.** The examples files are therefore
  linked from the generated `INDEX.md`, not from lesson bodies. Lesson bodies stay byte-identical
  in this plan apart from the id rewrite.
- The validator's `id === topic/slug` rule continues to hold after renumbering, because the ids are
  literally the directory names. `01-css` already satisfies the existing slug regex
  `^[a-z0-9]+(-[a-z0-9]+)*$`. Only the `TOPICS` constant has to change.

## Global Constraints

- **DO NOT** edit `seed/**`. It is the read-only archive of the original skill list.
- **DO NOT** edit `.pi/plans/**`. Those files are the historical record of the executed plan and
  their ids are deliberately left stale.
- **DO NOT** touch any file outside this repository, and do not create temp files outside `.tmp/`
  under the repo root (dotted, repo root). Never use system `/tmp`.
- **DO NOT** `git add`, `git commit`, `git push`, or publish anything. The user handles all git.
- **DO NOT** add a `package.json`, a dependency, or a lockfile.
- **DO NOT** run `--write-index` or `--strict` outside the work packages that say to. Other WPs use
  the plain `node tools/validate-content.mjs` run.
- **DO** keep every write byte-safe: read the file as a Buffer, detect whether the original bytes
  contain `\r\n`, and write the same line ending back. Never use a text-mode rewrite that normalises
  newlines.
- **DO** keep prose in British English and keep every title verbatim from `tools/inventory.json`.
- **DO** run the Success checks of each work package before moving to the next one.
- **DO NOT** invent an id. If a work package names an id that does not exist in
  `tools/inventory.json` (or in `tools/renumber-map.json` after WP-2), stop and report a plan
  erratum instead of improvising.
- **DO NOT** change a lesson body, a title, a tier, an alias or a prereq other than what a work
  package explicitly states. This plan is a renumbering and a content addition, not an edit pass.

## Conventions

- **Entry dir names carry the order.** Topic dirs are `NN-<topic>` with `NN` from `01` to `08`.
  Entry dirs are `NN-<slug>` with `NN` from `01`, contiguous, ascending, and no gaps.
- **Entry id = `<topic dir>/<entry dir>`**, e.g. `01-cs-fundamentals/12-git`. Child id = entry id +
  the child filename without `.md`, e.g. `01-cs-fundamentals/12-git/02-the-daily-workflow`.
- **Area entries come first** in their topic, in their existing inventory order. The other entries
  follow in the fixed order recorded in `phase-01-renumber.md` → Shared Context (the normative list
  `WP-2` embeds) — a hand-chosen pedagogical order that is *not* reproducible by sorting `prereqs`,
  but is a valid topological order: every prereq is numbered lower. The Phases 3–6 tables list the
  same sequence, and `WP-2`'s Success check compares the two.
- **Examples file naming** is mechanical: `index.md` → `examples.md`, `NN-slug.md` →
  `examples.NN-slug.md`. Nothing else.
- **Validator runs** during content phases are per-topic: `node tools/validate-content.mjs
  --topic <topic dir>`. A per-topic run only reports that topic's errors.
- **Temp scripts** live in `.tmp/` and are deleted when their phase ends.

## Phases

| # | Name | File | WPs | Depends On |
| --- | --- | --- | --- | --- |
| 1 | Renumber by dependency order | phase-01-renumber.md | WP-1–WP-8 | — |
| 2 | Examples toolkit and exemplars | phase-02-examples-toolkit.md | WP-9–WP-11 | Phase 1 |
| 3 | Examples — cs-fundamentals | phase-03-examples-cs-fundamentals.md | WP-12–WP-16 | Phase 2 |
| 4 | Examples — frontend | phase-04-examples-frontend.md | WP-17–WP-24 | Phase 3 |
| 5 | Examples — design-ux and product-process | phase-05-examples-design-product.md | WP-25–WP-36 | Phase 4 |
| 6 | Examples — backend, cloud, security, soft skills | phase-06-examples-backend-cloud.md | WP-37–WP-47 | Phase 5 |
| 7 | Final audit | phase-07-audit.md | WP-48–WP-50 | Phase 6 |

## Final topic order

| # | Topic dir | Entries | Lesson files | Examples files |
| --- | --- | --- | --- | --- |
| 01 | `01-cs-fundamentals` | 27 | 63 | 45 |
| 02 | `02-frontend` | 31 | 77 | 56 |
| 03 | `03-design-ux` | 44 | 88 | 68 |
| 04 | `04-product-process` | 17 | 35 | 26 |
| 05 | `05-backend-data` | 19 | 53 | 38 |
| 06 | `06-cloud-devops` | 23 | 59 | 43 |
| 07 | `07-security` | 7 | 13 | 10 |
| 08 | `08-soft-skills` | 9 | 13 | 11 |
| | **Total** | **177** | **401** | **297** |

The complete old-id → new-id map for all 177 entries and 224 children is produced by WP-2 into
`tools/renumber-map.json`, and the per-entry new directory names are listed in the work packages of
Phases 3–6.

## File Map

**Phase 1:**
- `tools/inventory.json` — MODIFY — prereq demotion (WP-1), then full id/topic/slug/prereq rewrite
  and reordering (WP-3)
- `01-cs-fundamentals/04-database-internals/index.md` — MODIFY — `prereqs: []` (WP-1; path before
  the rename is `lessons/cs-fundamentals/database-internals/index.md`)
- `.tmp/renumber.mjs` — CREATE then DELETE — one-off migration script (WP-2, deleted in WP-8)
- `tools/renumber-map.json` — CREATE — the permanent old→new id record (WP-2)
- 8 topic directories and 177 entry directories under `lessons/` — RENAME (WP-3)
- the 401 lesson files under `lessons/` (never `AUTHORING.md`, never `INDEX.md`) — MODIFY — id references (WP-4)
- `lessons/AUTHORING.md` — MODIFY — §1 and the three ids in §8 (WP-5); §4 and a new §12 (WP-9);
  the §11 table (WP-10)
- `tools/validate-content.mjs` — MODIFY — `TOPICS` (WP-6), examples checks and summary line (WP-10)
- `lessons/INDEX.md` — REGENERATE (WP-7, WP-10)

**Phase 2:**
- `02-frontend/05-css/examples.01-cascade-and-box-model.md` — CREATE (WP-11)
- `08-soft-skills/03-mentoring/examples.md` — CREATE (WP-11)

**Phases 3–6:** 295 examples files, one per full-shape lesson, listed per work package.

**Phase 7:** no new files; `.tmp/lessons-backup/` and `.tmp/audit.mjs` removed.

## Execution Instructions

Execute as follows:

1. Read this `_index.md` fully — it provides global context and constraints.
2. Read `phase-01-renumber.md` and execute each work package **in order**.
3. After all WPs in a phase, run the Phase Verification commands.
4. If verification passes, proceed to the next phase. If it fails, fix the issue before moving on.
5. Each work package is self-contained — you should not need to read other phase files, except where a Success check names one (WP-2's does: it compares its output against the Phase 3–6 tables).

**Critical rules for the executor:**

- Do exactly what each work package says. Do not add features not in the plan.
- If a constraint says DO NOT, respect it absolutely.
- If you believe the plan has an error, note it and ask — do not improvise.
- Run the Success checks after every work package, not just at the end.
- **Phase 1 is destructive. `lessons/` is tracked in git as of commit `b362edd`, so git can restore it — but do not rely on that alone.** WP-3 makes a plain copy at `.tmp/lessons-backup/` first, because WP-48 compares against it byte for byte and a copy does not depend on git being usable mid-sweep. Never run WP-3's renames before WP-3's own backup step.

**Note on git:** an unstaged directory rename is never reported as a rename. `git status --short` shows ` D` for every old path and `??` for each new topic directory, and `git diff --numstat` reports each old file as a whole-file deletion. So no git command in this plan is a usable volume signal — the `.tmp/lessons-backup/` comparison in WP-3, WP-4 and WP-48 is.
