# Context — 2learn

**Project:** 2learn — a 177-entry lesson corpus built from a seed skill list, plus (later) a static learning site.
**Rules:** See `.pi/project-rules-memory.md` for tech stack, architecture, and content/design constraints.

Last updated: 2026-10-15

## Current Task
**Executing `.pi/plans/corpus-order-and-examples/` (Plan A) via `/skill:implement`.** Phases 1–2 are
complete and verified; Phase 3 is part-written. Plan A must be fully green before
`.pi/plans/russian-corpus/` (Plan B) starts, because Plan B mirrors Plan A's final paths.

## Completed This Session
- [x] Phase 1 (WP-1–WP-8) — prereq demotion, `tools/renumber-map.json`, 185 directory renames, id sweep, prefixed `TOPICS`, `INDEX.md` regenerated. All WP checks and Phase Verification pass.
- [x] Phase 2 (WP-9–WP-11) — `AUTHORING.md` §12, validator V15/V16 + five-part summary + INDEX `[examples]` links, two exemplars (`02-frontend/05-css/examples.01-cascade-and-box-model.md`, `08-soft-skills/03-mentoring/examples.md`).
- [x] Phase 3 WP-12 (7 files), WP-13 (7), WP-14 (10) — complete; `--topic 01-cs-fundamentals` reports `0 error(s)`.

## In Progress
- [ ] **Phase 3 WP-15 — 5 of 11 files written.** Done: `16-code-reusability/examples.md`, `17-code-review/examples.01-reading-a-diff-for-correctness.md`, `17-code-review/examples.02-reviewing-for-clarity-and-tone.md`, `18-design-patterns/examples.01-why-patterns-are-named.md`, `18-design-patterns/examples.02-the-patterns-that-earn-their-keep.md`. Remaining: `19-refactoring` 01+02, `20-test-driven-development-tdd` 01+02, `21-integration-testing` 01+02 — then run WP-15's Success checks.

## Blocked / Needs Decision
- [?] Nothing blocking. Both plan directories are still uncommitted (they show as untracked).

## Next Steps
1. Finish WP-15's remaining 6 files (read each lesson first; build two examples from two of its `### Core ideas`), then run its Success checks.
2. WP-16 (10 files: `22-git-branching-strategies`, `23-github`, `24-command-line-interface`, `25-software-architecture` ×4, `26-end-to-end-testing` ×2, `27-playwright`), then Phase 3 verification (expect `45 examples, 0 examples pending`).
3. Phases 4–7: WP-17–WP-50 (252 further examples files, then the WP-48–WP-50 audit).

## Key Decisions
- **Erratum, approved by the user mid-run:** the plan's "five id shapes" list missed the frontmatter `topic:` scalar. V3 requires `topic` to equal `inventory.topic`, so all 177 `index.md` files needed `topic: 01-cs-fundamentals` (otherwise WP-6 could never reach 0 errors).
- **One `write` call per examples file**, per the plan — a long generation that emits several files can abort mid-stream.
- **Target ~380 words per examples file, not 450** — the band counts fenced code.
- **`--strict` is not the gate in Phases 3–6**; watch `W examples pending` fall by exactly the work package's file count.

## File Map
- `tools/renumber-map.json` — CREATED (WP-2) — permanent old→new id record: 177 entries + 224 children
- `tools/inventory.json` — MODIFIED — prefixed id/topic/slug/prereqs, stored in pedagogical order
- `tools/validate-content.mjs` — MODIFIED — prefixed `TOPICS`, V15/V16, five-part summary, INDEX `[examples]` link
- `lessons/AUTHORING.md` — MODIFIED — §1 + three §8 ids (WP-5), §4 sentence + new §12 (WP-9), §11 V15/V16 rows (WP-10)
- `lessons/` — RENAMED + MODIFIED — 8 prefixed topic dirs, 177 entry dirs, every id and `topic:` value rewritten
- `lessons/INDEX.md` — REGENERATED — 177 links, exactly 1 `[examples]` link (the Mentoring row)
- 31 × `examples*.md` under `lessons/` — CREATED (2 Phase-2 exemplars + WP-12/13/14 + 5 of WP-15)
- `.tmp/lessons-backup/` — the pre-Phase-1 copy of `lessons/`; must survive until WP-48 (WP-50 deletes it)

## Gotchas / Warnings
- **Never edit `seed/**` or `.pi/plans/**` while executing**, and never `git add`/`commit`/`push` — the user handles all git.
- **The id sweep excluded `.pi/**` and `lessons/INDEX.md`** — `.pi/CONTEXT.md` and the older plan files contain backticked id-shaped tokens (`frontend/css`, `9/35`) that a naive sweep would corrupt.
- **`AUTHORING.md` §2 still shows `topic: frontend`** in its frontmatter example. WP-5 forbids touching §2 and the validator ignores that file, so it is harmless but stale — worth a later plan amendment.
- **Phase 1 checks confirmed by measurement:** `grep -c 'sql-relational-databases' tools/inventory.json` → 6; `--topic design-ux` → `0 present, 0 pending, 0 error(s)`.
- All lesson files are LF; scripted edits must read/write bytes. `git diff --numstat` is meaningless for the unstaged renames — `.tmp/lessons-backup/` is the real volume proof.
- `legacy-ru` in the knowledge bases is the paradise-education blog — **not** a translation source for this corpus.
