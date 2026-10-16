# Context — 2learn

**Project:** 2learn — a 177-entry lesson corpus built from a seed skill list, mirrored into Russian, plus (later) a static learning site.
**Rules:** See `.pi/project-rules-memory.md` for tech stack, architecture, and content/design constraints. Session history lives in `.pi/memory/lessons.md`.

Last updated: 2026-10-16

## Current Task
**Plan C (`.pi/plans/russian-prose/`) is PARTIALLY EXECUTED — paused at the user's request (usage limits).** It recasts all 698 files under `lessons/ru/` from translated Russian into Russian written by a Russian writer. Nothing is half-written: the tree is structurally green and every paused work package restarts cleanly.

**Progress: 359 of 698 files** — `01-cs-fundamentals` 108/108, `02-frontend` 133/133, `03-design-ux` 117/156.

## Completed This Session
- [x] **Phase 4 batch A — WP-34…WP-37, 44 files.** 4 parallel `worker` children, one work package each on disjoint entry dirs: `22-journey-mapping`(5) + `23-persona-user-experience`(2) + `24-quantitative-ux-research`(5); `25-hotjar`…`28-typography`(11); `29-color-theory`…`31-data-visualization`(12); `32-design-systems`(9). All 44 verified changed on disk against a pre-run sha256 manifest. `--diff --topic 03-design-ux` → 0 structural differences; `--topic --lang ru` → 0 error(s); global `--strict --lang ru` → `177 present, 0 pending, 297 examples, 0 examples pending, 0 error(s)`.
- [x] **Topic `03-design-ux` now clears every corpus target:** corr 0.595→0.398, same-count 50.0%→23.1%, ratio 1.150, `однако` 1.10→1.73, `X — это` 1.52→0.91, participles 1.21, blacklist 0.
- [x] **Memory layout split** per `/skill:write-tmp-memory`: the 59-bullet `## Lessons` section moved verbatim out of the index into `.pi/memory/lessons.md` (35.4 KB → 12.1 KB index); the index gained `## Reference Chunks` and `## Where New Knowledge Goes`.

## In Progress
- Nothing is mid-file. Batch B is **not started**.

## Blocked / Needs Decision

- [?] **The work is uncommitted.** 44 modified files under `lessons/ru/03-design-ux/` exist only in the working tree. The user handles git; the last checkpoint was `dda3efe refactor: recast the russian lesson prose`.
- [?] **`однако ≥ 0.80/1000` is the binding corpus-wide constraint** — global 0.48 → 0.61 after batch A. The remaining 339 files must carry ~0.80/1000 themselves; batch A ran at ~1 honest `однако` per file, which is the density that works. Watch it at WP-74/75; a targeted connective top-up is the recovery.

## Next Steps
1. Commit the checkpoint (user).
2. **Batch B: WP-38…WP-41 — 39 files**, dirs `33-usability-testing` … `44-interaction-design`. 4 parallel `worker` children, ≤4 concurrent. Then run the Phase 4 verification block.
3. Phases 5–8 (WP-42…WP-73), then the WP-74/WP-75 audit and handover.

## Key Decisions
- **Fan-out, never parent-written prose.** ≤4 concurrent `worker` children (`ollama/deepseek-v4.1-flash:cloud`, thinking high), one work package per child, disjoint entry dirs, one `write` per file. The parent owns the brief, every validator run, every scope decision and the phase verification; it never recasts a file itself.
- **Verify the disk, never the child's report.** All four children this session reported success and all four were honest — but the parent still counted changed paths against `.tmp/wp34-41-baseline.txt`, a sha256 manifest taken *before* the fan-out (a manifest survives a user commit mid-run; `git diff` does not).
- **The shared worker brief is `.tmp/brief-phase4.md`** — reuse it for batch B. It carries the per-file procedure, the frozen list, the R6 density sentence ("roughly one `однако` per file; never sprinkle") and the escape hatch ("if you are near the end of your context, say so instead of silently stopping").
- **Record, never bend.** Where the gate disagreed with the plan, the run's own values went into `BASELINE_METRICS` and were reported. No target was weakened and the script was never tuned to the plan's numbers.

## File Map
- `tools/check-ru-style.mjs` — the gate. Report mode (nine signals, per-file rules, corpus block), `--diff` mode (`[D1]`–`[D10]` against `b713de1d`), `TARGETS`, `BASELINE_METRICS`, `--topic` / `--file` filters.
- `lessons/ru/03-design-ux/**` — **117/156 recast.** `01-ui-ux-design`…`32-design-systems` done; `33-usability-testing`…`44-interaction-design` untouched (still at the `b713de1d` baseline).
- `.pi/memory/lessons.md` — **CREATE.** The old 59-bullet `## Lessons` block (imported verbatim) plus this session's entry on top.
- `.pi/project-rules-memory.md` — `## Lessons` replaced by a pointer; `## Reference Chunks` and `## Where New Knowledge Goes` appended.
- `.tmp/wp34-41-baseline.txt` — **still valid for batch B**: the sha256 of all 83 files WP-34…WP-41 own, taken before batch A. `.tmp/brief-phase4.md` and `.tmp/verify-batch.mjs` are the other reusable artefacts.
- `.tmp/wp34-report.md` … `.tmp/wp37-report.md` — the four children's per-file `--file` evidence.

## Gotchas / Warnings
- **`--lang ru` is not optional.** The validator defaults to `en` and prints a green line that says nothing about the Russian tree.
- **`corr` is not a quality signal for a single file.** The gate's `pearson()` truncates both arrays to `Math.min(a.length, b.length)`, so a mirror file off by one sentence (45 vs 46) scores 0.154. Judge a file by `same sentence count` plus reading it.
- **`--strict --topic` proves almost nothing on a partially recast topic.** It exits 1 on the corpus-level rows and names only files that break a *per-file* rule. Four of the five warnings it printed before batch A belonged to files batch A had not started. The sha256 manifest is what proves the work happened.
- **Never `git checkout` a file that `--diff` reported.** The revert restores the baseline and discards that file's recast — intended — but **never** on one of the four Phase-1 calibration files: fix the invariant by hand, because the revert destroys the voice the user approved.
- **`--topic` needs the prefixed directory name** (`03-design-ux`); an unprefixed name selects nothing and prints `0 present`.
- **Sweep `.tmp/` at every batch boundary.** The four children left ten helper `.mjs` files. Temp files go in `.tmp/` at the repo root (leading dot, in `.gitignore`), never system `/tmp/` and never as a stray file at the repo root.
- **One live `[S1]` warning remains:** `03-design-ux/37-lean-ux/index.md` has `X — это ×5` against a cap of 3. It is WP-39's file, untouched. Batch B must fix it.
