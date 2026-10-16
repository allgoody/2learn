# Context — 2learn

**Project:** 2learn — a 177-entry lesson corpus built from a seed skill list, mirrored into Russian, plus (later) a static learning site.
**Rules:** See `.pi/project-rules-memory.md` for tech stack, architecture, and content/design constraints.

Last updated: 2026-10-16

## Current Task
**Plan C (`.pi/plans/russian-prose/`) is PARTIALLY EXECUTED — paused deliberately at the user's request.** It recasts all 698 files under `lessons/ru/` from translated Russian into Russian written by a Russian writer. Nothing is half-written: the tree is structurally green and every paused work package restarts cleanly.

## Completed This Session
- [x] **Phase 1 — the gate and the approved voice.** Wrote `tools/check-ru-style.mjs` (report + `--diff` modes, `TARGETS`, `BASELINE_METRICS` recorded on the untouched corpus at baseline `b713de1d`); recast the four calibration files (one per body shape); appended `lessons/AUTHORING.md` **§14 "Russian prose"** (the two measurement slices, the nine frozen invariants, R1–R11 with baselines, the target table) and aligned `TARGETS` with it. **The user read the four diffs and approved both the voice and the model.**
- [x] **Phase 2 — `01-cs-fundamentals`, 108/108 files.** `--diff` clean, validator `0 error(s)`, zero per-file warnings, two spot-reads clean.
- [x] **Phase 3 — `02-frontend`, 133/133 files.** **The first topic where every corpus target is green** (corr 0.242, same-count 0/133, ratio 1.140, однако 0.84, copula 0.92, participles 1.10, blacklist 0).
- [x] **Phase 4, part — `03-design-ux`, 73/156 files** (WP-27…WP-33).
- [x] Four `worker` subagents (WP-34…WP-37) were **stopped** when the user paused. They had written 0 files.

## In Progress
- [ ] **Phase 4, WP-34…WP-41 — 83 untouched files**, under `lessons/ru/03-design-ux/`, dirs `22-journey-mapping` … `32-design-systems`. Nothing is started; restart each work package from scratch.

## Blocked / Needs Decision

- [?] **The work is uncommitted.** 315 recast files + `lessons/AUTHORING.md` + the new `tools/check-ru-style.mjs` + the untracked `.pi/plans/russian-prose/` exist only in the working tree. A checkpoint commit is the top priority. The user handles git.
- [?] **The `однако ≥ 0.80/1000` corpus target is the binding constraint** (currently 0.48). Phase 4's 73 files added 74 occurrences (≈1.0 per file), so the remaining 383 files need only ≈0.60/1000 — on track. If it lands short at WP-74/75 the plan's Objective line (`--strict` exit 0) fails, and a targeted connective top-up is the fix.
- [?] **Three plan errata, recorded not bent.** WP-1 measured that the plan's sentence-level baselines do not reproduce (0.924 / 89.5% / 1.046, not 0.926 / 95.7% / 0.861); that the ratio row was measured in **words** by the planner while the written definition says **characters**, which makes R2's ≥0.95 target already satisfied (hence a floor guard, not a driver — noted in §14); and that report mode's output order follows the Success checks (corpus block first), not the plan's prose.

## Next Steps
1. Commit the checkpoint (user).
2. Resume Phase 4 at **WP-34**, fanning out ≤4 `worker` children, then WP-35…WP-41.
3. Run the Phase 4 verification block, then Phases 5–8, then WP-74/WP-75.

## Key Decisions
- **Fan-out, never parent-written prose.** ≤4 concurrent `worker` subagents (`ollama/deepseek-v4.1-flash:cloud`, thinking high), one work package per child, disjoint entry directories, one `write` per file. The parent owns every validator run, every scope decision and the phase verification; it never recasts a file itself.
- **Verify the disk, never the child's report.** A child returned `ok: true` having written 3 of its 12 files. Every batch boundary now counts which assigned paths differ from baseline with `git diff --quiet`.
- **The R6 density instruction is in every child prompt** — "use `однако` where the argument genuinely turns; the English twins carry 1.2–1.4 adversatives per 1000 words; never sprinkle" — plus the escape hatch "if you are near the end of your context, say so instead of silently stopping".
- **Record, never bend.** Where the gate disagreed with the plan, the run's values went into `BASELINE_METRICS` and were reported. No target was weakened and the script was never tuned to match the plan's numbers.

## File Map
- `tools/check-ru-style.mjs` — **CREATE.** The gate. Report mode (nine signals, per-file rules, corpus block), `--diff` mode (`[D1]`–`[D10]` against `b713de1d`), `TARGETS`, `BASELINE_METRICS` (2026-10-16), exported baseline constants.
- `lessons/AUTHORING.md` — **MODIFY.** §1–§13 byte-identical; `## 14. Russian prose` appended (92 insertions, 0 deletions).
- `lessons/ru/01-cs-fundamentals/**` — 108/108 recast, all targets green.
- `lessons/ru/02-frontend/**` — 133/133 recast, all targets green.
- `lessons/ru/03-design-ux/**` — 73/156 recast (`01-ui-ux-design` … `21-survey-design`); `22-journey-mapping` … `44-interaction-design` untouched.
- `lessons/ru/08-soft-skills/01-communication/index.md` — Phase 1 calibration exemplar (landing).
- `.pi/plans/russian-prose/` — the plan (`_index.md` + 8 phase files), untracked.

## Gotchas / Warnings
- **`--lang ru` is not optional.** The validator defaults to `en` and prints a green line that says nothing about the Russian tree.
- **Never `git checkout` a file that `--diff` reported.** The revert restores the baseline and discards that file's recast — that part is intended. But **never** do it on one of the four calibration files: fix the invariant by hand, because the revert destroys the voice the user approved.
- **`--topic` needs the prefixed directory name** (`03-design-ux`); an unprefixed name selects nothing and prints `0 present`.
- **Temp files go in `.tmp/` at the repo root** (leading dot, listed in `.gitignore`), never system `/tmp/`, and never as a stray file at the repo root — I created one at the root this session by accident and removed it.
- The corpus-wide block only becomes a meaningful score once a topic is fully recast: `--topic <dir>` reads low while other work packages in the same topic are still untouched or in flight.
