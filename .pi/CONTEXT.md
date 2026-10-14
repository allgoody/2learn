# Context — 2learn

**Project:** 2learn — a lesson corpus built from a seed skill list, plus (later) a static learning site.
**Rules:** See `.pi/project-rules-memory.md` for tech stack, architecture and content constraints.

Last updated: 2026-02-14

## Current Task
The lesson-corpus plan is written and awaiting execution. Nothing is implemented yet: no `lessons/` or `tools/` files exist.

## Completed This Session
- [x] Read all 8 seed topic files (`seed/*.md`, 187 one-line entries) plus `seed/skills.md`
- [x] Resolved the design questions with the user: content first, one skill = a track of lessons, one file per skill in topic dirs, 600-900 word lessons, standalone Node validator, 6-section skeleton, Astro site later in `astro/`
- [x] Verified package versions on npm: Astro 7.3.8, @astrojs/react 7.0.1, Tailwind 4.3.3, TypeScript 7.0.2, Pagefind 1.5.2
- [x] Wrote the plan to `.pi/plans/lessons-content-corpus/` — 10 files, 3234 lines, 38 work packages, 8 phases
- [x] Self-review pass: fixed 4 wrong per-WP file counts, 4 wrong per-topic totals, and an inconsistent word budget (500-900 vs 450-950)
- [x] Removed the `.ruff_cache/` directory that appeared when ruff ran on a temporary script

## In Progress
- [ ] Nothing. Awaiting the user's decision to execute the plan.

## Blocked / Needs Decision
- [?] The plan is one document (38 WPs, 8 phases) instead of being split at the >20-WP threshold. Offered to split it into two plans; not answered yet.
- [?] Child-lesson titles for the 96 medium/large tracks are chosen by the writer at execution time, bounded by the validator, rather than pre-decided in the plan.
- [?] Phase 1 ends at a mandatory review gate — the user must approve the 3 exemplar lessons before Phase 2 writes 77 files.

## Next Steps
1. Execute Phase 1: read `.pi/plans/lessons-content-corpus/_index.md`, then `phase-01-foundation-pilot.md` (WP-1 to WP-6).
2. STOP at the review gate at the end of phase-01 and answer its three questions.
3. Continue phases 2-8 in order, running `node tools/validate-content.mjs --topic <topic>` after every work package.
4. After the corpus is complete, write a separate plan for the Astro 7 site in `astro/`.

## Key Decisions
- **177 entries, not 187.** Ten umbrella seed lines merge into 3 area pages (cloud 6 to 1, UI/UX 4 to 1, software-development 3 to 1); the absorbed names become `aliases`. `seed/` stays as the read-only archive.
- **Tier determines child count and is frozen:** small 0, medium 2, large 4, area 0 — 15 large, 82 medium, 80 small/area, 401 content files, roughly 240,000 words. Only the user changes this.
- **Three body shapes only:** full lesson (6 headings, 450-950 words), track landing (5 headings, 200-400), area page (4 headings, 120-300). No quizzes, no difficulty ratings, no time estimates.
- **Frontmatter is the contract:** title, type, topic, tier, status, aliases, prereqs, related. `prereqs` must equal the inventory exactly — the prerequisite graph is given, not chosen by the writer.
- **Validation is a zero-dependency Node script** (`tools/validate-content.mjs`, checks V1 to V13), not a test framework. There is deliberately no `package.json` in this repo.
- **Content first, site later.** The site is a separate plan in an `astro/` subdirectory and will re-verify package majors before installing.

## File Map
Created this session — plan only, no corpus files:
- `.pi/plans/lessons-content-corpus/_index.md` — global context, constraints, conventions, phase table, file map, execution instructions
- `.pi/plans/lessons-content-corpus/inventory.md` — Appendix A: all 177 entries (id, title, type, tier, prereqs, aliases); the source for `tools/inventory.json`
- `.pi/plans/lessons-content-corpus/phase-01-foundation-pilot.md` — spec, inventory, validator and 3 exemplars; ends at the review gate
- `.pi/plans/lessons-content-corpus/phase-02-frontend.md` through `phase-08-security-soft-final.md` — the 7 bulk phases, WP-7 to WP-38

## Gotchas / Warnings
- `seed/` is read-only. The plan forbids editing it; the prose notes in `seed/skills.md` stay in the archive and do not become lessons.
- The validator must not treat an unwritten entry as an error: it reports "pending" unless `--strict` is passed. Phase 8 is the only strict run.
- Expected global coverage per phase: 3, 31, 58, 81, 100, 144, 161, 177 present. A mismatch means a work package was skipped.
- Grep checks in the plan use `grep -cE 'https?://'`, deliberately avoiding regex escape sequences anywhere in bash commands (the pi path guard rejects them).
- `.gitignore` now covers `.tmp/`, `.ruff_cache/` and `node_modules/`. Scratch files go in **`.tmp/`** at the repo root — dot-prefixed, per the user's explicit rule; plain `tmp/` is wrong.
- `.orca/worktrees/` is empty and unrelated to this plan.
- 240,000 words is the real size of this corpus. The tier map is the only lever on total effort; changing it mid-execution invalidates every phase's expected counts.
