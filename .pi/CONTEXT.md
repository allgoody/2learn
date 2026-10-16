# Context — 2learn

**Project:** 2learn — a 177-entry lesson corpus built from a seed skill list, mirrored into Russian, plus (later) a static learning site.
**Rules:** See `.pi/project-rules-memory.md` for tech stack, architecture, and content/design constraints. Session history lives in `.pi/memory/lessons.md`.

Last updated: 2026-10-16

## Current Task
**Plan C (`.pi/plans/russian-prose/`): Phase 5 is COMPLETE.** All 61 files under `lessons/ru/04-product-process/` are recast; the topic clears every target with room, `--strict --topic 04-product-process` exits **0 with no `[S1]` line at all**, and the branch ends at a clean boundary.

**Progress: 459 of 698 files** — `01-cs-fundamentals` 108/108, `02-frontend` 133/133, `03-design-ux` 156/156, `04-product-process` **61/61**. Remaining **239**: `05-backend-data` 91, `06-cloud-devops` 102, `07-security` 23, `08-soft-skills` 23 (its `01-communication/index.md` calibration landing is already recast).

## Completed This Session
- [x] **Phase 5, 61 files, two waves of four `worker` children.** Wave 1: WP-46b (7), WP-44 (10), WP-45 (10), WP-43 (9) = 36. Wave 2: WP-46a (5), WP-47 (8), WP-42 (6), WP-48 (6) = 25. Every child reported success; the parent verified the **disk** for both waves against `.tmp/wp42-48-baseline.txt` → `61 of 61 COMPLETE`, and `git status --porcelain lessons/ru/04-product-process/` → exactly 61 paths, no strays, `GLOSSARY.md` untouched.
- [x] **WP-46 was split into 46a/46b** (12 files → 5 + 7) so no child exceeded 10 files — the size at which a previous fan-out silently truncated. The pair is still verified as one package against `wp46-files.txt`.
- [x] **Phase 5 clears every target.** `--diff --topic 04-product-process` → 0 structural differences; `--strict --topic` → exit 0, no `[S1]`; `validate-content --topic 04-product-process --lang ru` → 0 error(s), 17 present / 26 examples; topic still 61 files.
- [x] **Topic metrics, baseline → now:** correlation 0.898 → **0.183**, same sentence count 90.2% → **0.0%**, median ratio 1.047 → **1.138**, `однако` 0.00 → **2.11**, `— это` 2.82 → **0.48**, participles 2.03 → **0.59**, blacklist **0**.
- [x] **The two live `[S1]` warnings in the topic are gone** — `03-product-management/01-the-decision-role.md` (`— это` ×6 → 0, WP-43) and `17-estimation-story-points/index.md` (×4 → 1, WP-48).
- [x] **`git diff --numstat` across the 61:** +396 / −398, one file imbalanced by 2 lines, every diff prose-only — a `-U0` grep for `---`, `##` or ```` ``` ```` hunks returns nothing.
- [x] Both root gates re-run green: `--strict --lang en` and `--strict --lang ru` each `177 present, 0 pending, 297 examples, 0 examples pending, 0 error(s)`, exit 0. `--diff` over the **whole** 698-file corpus → 0 structural differences.
- [x] Two spot-reads against the English twins (`15-prioritization-frameworks-rice-moscow/index.md`, `03-product-management/examples.01-the-decision-role.md`) — facts, numbers, ids and claims identical; the prose genuinely restructured.
- [x] `.tmp/` swept: 22 worker scratch files and 9 one-off generators deleted; the briefs, file lists, manifests, the verifier and all `wp*-report.md` evidence kept.

## In Progress
- Nothing is mid-file. Phase 6 is **not started**.

## Blocked / Needs Decision
- [?] **100 files are uncommitted** — the 39 Phase-4 batch-B files plus this phase's 61. Last commit: `117afe4 chore: update session context`.
- [?] **Only one of the four previously-short whole-corpus numbers is still short: the blacklist, 2 hits in 2 files.** The other three crossed this session — `однако` **0.86** (≥0.80), same-sentence-count **30.8%** (≤40%), copula **1.25** (≤1.50), plus correlation 0.457 and participles 1.71. Caution: these are 698-file aggregates that still include 239 untouched mirrors, so a phase can move them in either direction — Phase 6's writers must deliver their own `однако` density or the number reverses. Record, never bend.
- [?] **17 `[S1]` warnings remain, all in Phases 6–8** and none in `04-product-process`: 05-backend-data ×3, 06-cloud-devops ×11, 07-security ×2, 08-soft-skills ×2. The two blacklist hits (`05-backend-data/14-database-design/index.md`, `06-cloud-devops/06-docker/02-running-containers-and-persisting-data.md`) are the corpus blocker.

## Next Steps
1. Commit the checkpoint (user).
2. **Phase 6: WP-49… — `05-backend-data`, 91 files.** Read `.pi/plans/russian-prose/phase-06-backend-data.md`. Repeat the Phase 5 recipe: emit the per-WP file lists, take a pre-run sha256 manifest, fan out ≤4 `worker` children on disjoint entry dirs at ≤10 files each, verify the disk, then run the phase verification block.
3. Phase 7 (`06-cloud-devops`, 102) and Phase 8 (`07-security` 23 + `08-soft-skills` 23), then the WP-74/WP-75 audit and handover.

## Key Decisions
- **Fan-out, never parent-written prose.** ≤4 concurrent `worker` children (`ollama/deepseek-v4.1-flash:cloud`, thinking high), one work package per child, disjoint entry dirs, one `write` per file. The parent owns the briefs, every validator run, every scope decision and the phase verification; it never recasts a file itself. The 64-run budget had 64 remaining after two waves.
- **A work package over 10 files must be split before it is handed to a child.** WP-46 (12) became 46a/46b. The package is still verified as a whole against its own list file, so the contract survives the split.
- **Verify the disk, never the child's report.** Eight children reported success and eight were honest — the parent still counted changed paths with `MANIFEST=... node .tmp/verify-wp.mjs <list>`. The manifest, not the report, is the evidence. `git status --porcelain` must return exactly the contract's file count.
- **`git diff --numstat` is the structural proof.** A recast rewrites prose lines only, so every file shows a *balanced* small diff. `git diff -U0 … | grep -E '^[+-](---|##|```)'` must return nothing — that is the cheapest heading/fence/frontmatter regression check in the repo.
- **The brief pattern is `.tmp/brief-phase5.md` (contract + procedure) plus `.tmp/brief-wpNN.md` (that brief with a WP's exact file list appended).** Regenerate both per phase with a throwaway appender in `.tmp/`; sweep the appender at the batch boundary. The Phase 4 briefs are still on disk as the reference for the wording.
- **`GLOSSARY.md` is off-limits during a fan-out.** One shared file, four writers: a child that finds a calque row reports the exact before/after line and the parent applies it once. No row needed changing in Phase 5. (The R7 exception still stands for a single-writer package.)
- **Record, never bend.** Where the gate disagreed with the plan, the run's own values went into `BASELINE_METRICS` and were reported. No target was weakened and the script was never tuned to the plan's numbers.

## File Map
- `tools/check-ru-style.mjs` — the gate. Report mode (nine signals, per-file rules, corpus block), `--diff` mode (`[D1]`–`[D10]` against `b713de1d`), `TARGETS`, `BASELINE_METRICS`, `--topic` / `--file` filters.
- `lessons/ru/04-product-process/**` — **61/61 recast. Phase 5 done.**
- `.tmp/brief-phase5.md`, `.tmp/brief-wp42.md`…`wp48.md`, `.tmp/brief-wp46a.md`, `.tmp/brief-wp46b.md` — the reusable Phase 5 briefs. `.tmp/brief-phase4.md` + `brief-wp38.md`…`wp41.md` — Phase 4's, kept as the wording reference.
- `.tmp/wp42-files.txt`…`wp48-files.txt`, `.tmp/wp46a-files.txt`, `.tmp/wp46b-files.txt`, `.tmp/wp42-48-files.txt` — the batches' exact file lists.
- `.tmp/wp42-48-baseline.txt` — sha256 of all 61 Phase 5 files, taken before wave 1. The phase's manifest.
- `.tmp/verify-wp.mjs` — verifies a file list against a manifest. `MANIFEST=<path> node .tmp/verify-wp.mjs <list-file>...`; defaults to `.tmp/wp34-41-baseline.txt`. `.tmp/wp34-41-baseline.txt` — the Phase 4 manifest, still on disk.
- `.tmp/wp42-report.md`…`wp48-report.md`, `.tmp/wp46a-report.md`, `.tmp/wp46b-report.md` — the eight children's per-file `--file` evidence.

## Gotchas / Warnings
- **`--lang ru` is not optional.** The validator defaults to `en` and prints a green line that says nothing about the Russian tree.
- **`corr` is not a quality signal for a single file.** The gate's `pearson()` truncates both arrays to `Math.min(a.length, b.length)`, so an untouched mirror file off by one sentence (45 vs 46) scores 0.154. Two WP-45 files landed at 0.607 and 0.863 individually while the ten-file mean was ≈0.29 — judge a file by `same sentence count` plus reading it, and never distort prose to move a single correlation number.
- **`--strict` exits 1 corpus-wide for reasons that have nothing to do with your topic.** It names only files that break a *per-file* rule, but its exit code also reflects the seven corpus rows. Use `--strict --topic <dir>` while working; the sha256 manifest is what proves the work happened.
- **Never `git checkout` a file that `--diff` reported.** The revert discards that file's recast — intended — but **never** on one of the four Phase-1 calibration files: fix the invariant by hand, because the revert destroys the voice the user approved.
- **`--topic` needs the prefixed directory name** (`04-product-process`); an unprefixed name selects nothing and prints `0 present`.
- **A fence's *contents* are frozen, not just its delimiters.** `--diff` fails on any byte change inside a fence, so the translated tables and `text` blocks that Plan B produced are untouchable — a "formulaic line" a writer wants to reword almost always sits inside one. Check before rewriting.
- **`--diff --topic` and the corpus `--diff` disagree while a wave is running.** A child mid-file can be reported by another child's run. Verify your own files during the wave; run the topic command only after every writer has stopped.
- **Sweep `.tmp/` at every batch boundary.** Eight children left 22 scratch files this phase (`wp42-lens.mjs`, `med.mjs`, `flow-dump.mjs`, `wp48-o1.txt`…). Keep only the briefs, the file lists, the manifests, the verifier and the `wp*-report.md` evidence.
- **Measure the `однако` density the children actually delivered**, don't assume it. Phase 5's children delivered 2.11 per 1000 against a 0.80 floor — a deliberate overshoot from `— это` unpicking, and it is what pushed the corpus row across its target. The brief says "roughly one per file"; a light package is worth naming in the batch summary rather than discovering at the phase-8 audit.
