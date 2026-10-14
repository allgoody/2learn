# Context — 2learn

**Project:** 2learn — a lesson corpus built from a seed skill list, plus (later) a static learning site.
**Rules:** See `.pi/project-rules-memory.md` for tech stack, architecture and content constraints.

Last updated: 2026-10-15

## Current Task
Executing `.pi/plans/lessons-content-corpus/` with `/skill:implement`, sequentially, one work package at a time with the validator run after every WP. **Phases 1–5 are complete and validator-clean (101 of 177 entries, 254 files under `lessons/`).** Phase 6 (design-ux, WP-24 onwards) is next.

## Completed This Session
- [x] **Phase 4 (WP-16–WP-19):** all 23 `cloud-devops` entries, 59 files, 23 directories. Validator after each WP matched the plan exactly: `7/16`, `13/10`, `18/5`, `23/0`
- [x] Phase 4 verification: `--topic cloud-devops` → `23 present, 0 pending, 0 error(s)`; 59 files; 23 directories; no alias-only dir
- [x] **Phase 5 (WP-20–WP-23):** all 19 `backend-data` entries, 53 files, 19 directories. Validator after each WP: `6/13`, `10/9`, `17/2`, `19/0`
- [x] Phase 5 verification: `--topic backend-data` → `19 present, 0 pending, 0 error(s)`; `--topic cs-fundamentals` → `27/0/0`, so the Phase-3 pending prereq for `backend-data/sql-relational-databases` now resolves; 53 files
- [x] Global after Phase 5: `101 present, 76 pending, 0 error(s)` — matches the documented sequence 59, 82, 101
- [x] Fixed 17 first-draft validator errors across Phases 4–5 (V4 missing heading, V5 over-budget bodies, 14× V7 "Core ideas has 7 subheadings"), all in a single fix pass each
- [x] Caught and corrected a mis-slugged directory before it landed: `message-queues-kafka-mq/` → `message-queues-kafka-rabbitmq/` (V14 rejects unknown directories)
- [x] Re-swept all 254 `lessons/**` files against the validator's exact Go-deeper bullet pattern → 0 malformed
- [x] Removed the scratch directory (`.tmp/`) at the end

## In Progress
- [ ] Nothing mid-file. Phase 6 has not been started.

## Blocked / Needs Decision
- [?] **Two new plan errata (arithmetic, files not bent to match):** Phase 4 verification expects global `81 present, 96 pending`; the correct output is `82/95`. Phase 5 expects `100/77`; correct is `101/76`. From Phase 3 onward the plan's global counts are systematically one low. Phase 5's Prerequisites section repeats the wrong Phase-4 number.
- [?] **Earlier errata, still standing:** WP-5's check expects `2 present, 29 pending` where the correct output is `1 present, 30 pending`; WP-3's fixture check expects a "title mismatch" diagnostic an unknown directory cannot produce (the declared title appears inside the `[V14]` message instead); WP-14's cross-reference grep expects `2` where the correct values are `2 / 3 / 3`.
- [?] Child-lesson titles for medium/large tracks are the writer's design decision. Phases 2–5 set the tone; review them before Phase 6 (44 design-ux entries).

## Next Steps
1. Read `.pi/plans/lessons-content-corpus/phase-06-design-ux.md`; execute its work packages in order, running `node tools/validate-content.mjs --topic design-ux` after each. This is the largest phase; the topic currently holds only the Phase-1 `design-ux/ui-ux-design` exemplar.
2. Continue phases 7–8 in order. Expected global present after each phase: 144, 161, 177 (the plan files say 143, 160, 176 — one low each).
3. Phase 8 ends with `--strict`, which requires all 177 entries to be present.
4. After the corpus is complete, write a **separate** plan for the Astro site in `astro/` (the site is explicitly out of scope for this plan).

## Key Decisions
- **177 entries, not 187.** Thirteen umbrella seed lines merge into 3 area pages as `aliases` (net −10). Tier map frozen: 15 large, 82 medium, 80 small/area → ~401 content files.
- **Three body shapes only:** full lesson (6 headings, 450-950 words), track landing (5 headings, 200-400), area page (4 headings, 120-300). No quizzes, difficulty ratings or time estimates.
- **`tools/inventory.json` and `lessons/AUTHORING.md` are contracts.** The validator is the definition of done.
- **Validator semantics:** `--topic` scopes *both* present and pending counts to that topic; `--strict` promotes pending entries to errors. `present` counts inventory entries, **not** files.
- **Sequential execution** per the user; no subagents, no commits, no pushes.
- **`--write-index` and `--strict` are not run during a phase.**

## File Map
Created this session (Phases 4–5 — nothing else modified):
- `lessons/cloud-devops/**` — 59 files, 23 entries (WP-16–WP-19)
- `lessons/backend-data/**` — 53 files, 19 entries (WP-20–WP-23)

Earlier phases, unchanged this session:
- `lessons/AUTHORING.md`, `tools/inventory.json`, `tools/validate-content.mjs` (WP-1–WP-3)
- `lessons/frontend/**` — 77 files (31 entries); `lessons/cs-fundamentals/**` — 63 files (27 entries)
- `lessons/design-ux/ui-ux-design/` — the Phase-1 area-page exemplar

Untouched: `seed/**` (read-only archive) and `.pi/plans/**` (the `M` entries in `git status` are the previous session's plan-review edits, already uncommitted when this session began). `lessons/` and `tools/` are still untracked as a whole (`?? lessons/`, `?? tools/`), so `git status` cannot show per-file changes inside them.

## Gotchas / Warnings
- `seed/` is read-only; never edit `.pi/plans/**` while executing.
- **No external URL anywhere under `lessons/`** — V6 fails the build on `https?://`. It has bitten three times (Phase 2 twice, Phase 3 once). Grep before declaring a WP done.
- **The most common first-draft defect is 7 `###` subheadings in `## Core ideas`; the limit is 3–6.** Fourteen such errors across Phases 4–5. Budget five or six.
- **Budget full lessons at ~850 words, not 950.** Two first drafts landed at 974 and 991 words and needed a trim that risked formatting damage. Writing shorter costs less than trimming.
- **The directory slug must be taken from `tools/inventory.json`, not from memory.** `message-queues-kafka-mq` was wrong; V14 reports unknown directories.
- The validator's Go-deeper bullet regex does **not** require a trailing period (`- **Title** (\`id\`) — text`), so a bullet ending in `?` is valid. A stricter local regex produces false positives; use the validator's own pattern.
- A trim edit whose `oldText` ends with a newline can join the last bullet to the following `##` heading. Check the file tail after every trim sweep.
- `grep`-based success checks that look for `## Go deeper` bullets also match `## Prerequisites` bullets (`- **Title** (\`id\`)`), so a landing with prereqs scores one higher than the check may expect.
- The validator counts entries, not files. Adding `npm/01-*.md` does not increase `present`.
- Area pages and landings hit their word ceiling easily — aim for ~270 words and let V5 confirm.
- `.tmp/` (leading dot, repo root) is the scratch directory; delete the contents when the task is done. It is already in `.gitignore`.
- Avoid regex escape sequences in bash commands — the pi path guard rejects them (`Access to D:\*\*.+\*\* is blocked`); write a `.tmp/` script instead.
- Global coverage after each phase must be 59, 82, 101, 144, 161, 177. A mismatch means a work package was skipped.
- Child-lesson numbering must start at `01` and be contiguous, and the index's `## In this track` ids must equal the child ids **in filename order** (V9) — write the track list before the children.
