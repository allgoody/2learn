# Context — 2learn

**Project:** 2learn — a 177-entry lesson corpus built from a seed skill list, mirrored into Russian, plus (later) a static learning site.
**Rules:** See `.pi/project-rules-memory.md` for tech stack, architecture, and content/design constraints. Session history lives in `.pi/memory/lessons.md`.

Last updated: 2026-10-16

## Current Task
**Plan C (`.pi/plans/russian-prose/`): Phase 6 is COMPLETE.** All 91 files under `lessons/ru/05-backend-data/` are recast; `--strict --topic 05-backend-data` exits **0** and contributes **zero** `[S1]` lines, and the phase's headline target is done — `14-database-design/index.md`, the corpus's last-but-one blacklist hit, is cleared.

**Progress: 550 of 698 files** — `01-cs-fundamentals` 108, `02-frontend` 133, `03-design-ux` 156, `04-product-process` 61, `05-backend-data` **91**. Remaining **148**: `06-cloud-devops` 102, `07-security` 23, `08-soft-skills` 23 (its `01-communication/index.md` calibration landing is already recast).

## Completed This Session
- [x] **Phase 6, 91 files, 10 packages, 3 waves of `worker` children.** Wave 1: p6a (6), p6b (9), p6c (9), p6d (10) = 34. Wave 2: p6e (9), p6f (9), p6g (10), p6h (10) = 38. Wave 3: p6i (9), p6j (10) = 19. All 10 reported success; the parent verified the **disk** against `.tmp/p6-baseline.txt` → `91 of 91 COMPLETE`, exactly 91 paths changed under the topic, no strays, nothing touched outside it.
- [x] **Packages repacked, entry dirs kept whole.** The plan's WP-53/54/56/57 are 11–12 files each, over the 10-file child cap. Rather than split WPs arbitrarily, the topic was repacked into 10 packages of 6–10 files, every entry directory whole — so the plan's per-directory `ls` contract survives. All 9 plan WP-level lists (`wp49…wp57-files.txt`: 6,9,9,10,11,12,10,12,12) also verify `91 of 91 COMPLETE` against the same manifest.
- [x] **Phase 6 clears every target.** `--diff --topic 05-backend-data` → 0 structural differences; `--strict --topic` → **exit 0**; `validate-content --topic … --lang ru` → 0 error(s), 19 present / 38 examples; topic still 91 files; the plan's 19 per-entry-dir counts match exactly (`1 5 9 9 5 5 9 2 5 5 2 5 5 5 2 5 5 5 2`).
- [x] **Topic metrics, baseline → now:** correlation 0.898 → **0.215**, same sentence count 90.2% → **0.0%**, median ratio 1.047 → **1.099**, `однако` 0.00 → **1.79**, `— это` 2.82 → **0.30**, participles 2.03 → **0.55**, blacklist 0 → **0**.
- [x] **The corpus blacklist blocker is cleared.** `05-backend-data/14-database-design/index.md` was one of the corpus's two remaining hits; p6h took it to 0. Whole-corpus blacklist **2 in 2 files → 1 in 1 file**, and the survivor (`06-cloud-devops/06-docker/02-running-containers-and-persisting-data.md`) belongs to **Phase 7**.
- [x] **All three topic `[S1]` warnings cleared:** `02-nodejs/02-modules-and-the-runtime.md` ×4 → 1, `03-python-programming/01-language-basics.md` ×4 → 1, `14-database-design/index.md` blacklist ×1 → 0. Corpus `[S1]` total 17 → **14**, of which `05-backend-data` contributes 0.
- [x] **`git diff --numstat` over the 91: +604 / −604, zero imbalanced files** — the tightest structural result of any phase so far. `git diff -U0` over the topic yields **0** hunks matching `---`, `##`, `###` or a fence line.
- [x] Both root gates re-run green (`177 present / 297 examples / 0 error(s)` on both roots); whole-corpus `--diff` → 0 structural differences over 698 files.
- [x] Two spot-reads against the English twins (`14-database-design/index.md` landing, `18-mongodb/examples.02-…` examples) — facts, numbers, ids, claims and code byte-identical; sentence order genuinely changed; `Однако` sits at real turns in both.
- [x] **Found a hole in the gate: `--diff` does not check `###` subheadings.** `[D2]` compares `/^## /`, which matches `## ` and not `### `; `[D6]` covers `## Пример` only. A drifted `### ` inside `## Ключевые идеи` passes silently — a p6d file had two drift on a first pass and the gate never would have said so. The parent's `-U0` grep (which matches `###` because it matches `##`) is the compensating control and is now **load-bearing**. Recorded in the rules index.
- [x] `.tmp/` swept: 18 worker helper scripts and scratch test files plus 15 superseded Phase-4/5 briefs and file lists deleted; 61 files remain — the 4 manifests, the verifier, 26 `*-report.md` evidence files, the Phase 6 briefs/lists.

## In Progress
- Nothing is mid-file. Phase 7 is **not started**.

## Blocked / Needs Decision
- [?] **91 files are uncommitted** (the whole of Phase 6). Last commit: `4e25cac chore: update session context`.
- [?] **Two Plan-B defects sit inside *frozen* fences** and cannot be fixed without failing `--diff`. (a) `06-restful-api/examples.01-resources-verbs-and-status-codes.md` renders "client timed out" as «клиент дождался тайм-аута» — wrong sense. (b) `07-sql-relational-databases` carries three `text` fences holding translated Russian prose, one with an English `-- the report:` comment left inside. Both belong to the WP-74/WP-75 audit, not to Phase 7.
- [?] **One corpus number is still short and it is Phase 7's to fix:** blacklist **1 in 1 file** against a target of 0, in `06-cloud-devops/06-docker/02-running-containers-and-persisting-data.md`. Every other corpus row now passes: corr 0.364, same-count **18.9%**, ratio 1.122, `однако` **1.11**, `— это` 1.06, participles 1.32.

## Next Steps
1. Commit the checkpoint (user).
2. **Phase 7: WP-58… — `06-cloud-devops`, 102 files.** Read `.pi/plans/russian-prose/phase-07-cloud-devops.md`. Repeat the Phase 6 recipe: repack into ≤10-file packages with entry dirs whole, take a pre-run sha256 manifest, fan out ≤4 children per wave, verify the disk. **Phase 7 owns the last blacklist hit** and 10 of the 14 remaining `[S1]` warnings (including `07-terraform/01-declaring-infrastructure.md` at `— это` ×9).
3. Phase 8 (`07-security` 23 + `08-soft-skills` 23 + the WP-74/WP-75 audit and handover).

## Key Decisions
- **Fan-out, never parent-written prose.** ≤4 concurrent `worker` children (`ollama/deepseek-v4.1-flash:cloud`, thinking high), one package per child, disjoint entry dirs, one `write` per file. The parent owns the briefs, every validator run, every scope decision and the phase verification; it never recasts a file itself. 12 children used 12 of the 64-run budget across 3 waves.
- **Repack WPs over 10 files into entry-dir-whole packages; do not split a WP arbitrarily.** The entry directory is the plan's real contract (its Success blocks `ls` it), so it must stay whole. The plan's WP-level list files are still written and still verified, so nothing is lost.
- **Verify the disk, never the child's report.** Twelve children reported success and twelve were honest — the parent still counted changed paths. `git status --porcelain <topic-dir>` must equal the package contract exactly.
- **The `-U0` structural grep is now load-bearing, not merely cheap.** `git diff -U0 -- <files> | grep -E '^[+-](---|##|```)'` catches `###` drift that `--diff` cannot. Add the explicit `grep -E '^[+-]### '` line; it must print nothing.
- **Regenerate briefs with a separate script from the file lists and manifest.** Re-running the setup generator after wave 1 would re-hash already-recast files and destroy the phase baseline. The manifest is taken once, before the first write.
- **`GLOSSARY.md` stays off-limits during a fan-out** (one shared file, four writers); a child that finds a calque row reports the before/after line and the parent applies it once. No row needed changing in Phases 5 or 6.
- **Record, never bend.** Where the gate disagreed with the plan, the run's own values went into `BASELINE_METRICS` and were reported. No target was weakened and the script was never tuned to the plan's numbers.

## File Map
- `tools/check-ru-style.mjs` — the gate. Report mode (nine signals, per-file rules, corpus block), `--diff` mode (`[D1]`–`[D10]` against `b713de1d`), `TARGETS`, `BASELINE_METRICS`, `--topic` / `--file` filters. **`[D2]` covers `## ` only — not `### `.**
- `lessons/ru/05-backend-data/**` — **91/91 recast. Phase 6 done.**
- `.tmp/brief-phase6.md` + `.tmp/brief-p6a.md`…`brief-p6j.md` — the current briefs (Phase 7 reuses the wording).
- `.tmp/p6{a..j}-files.txt`, `.tmp/p6-all-files.txt`, `.tmp/wp49-files.txt`…`wp57-files.txt` — the packages' and the plan's exact file lists.
- `.tmp/p6-baseline.txt` — sha256 of all 91 Phase 6 files, taken before wave 1. `.tmp/wp34-41-baseline.txt` and `.tmp/wp42-48-baseline.txt` — the Phase 4 and 5 manifests, kept.
- `.tmp/verify-wp.mjs` — verifies list files against a manifest; `MANIFEST=<path> node .tmp/verify-wp.mjs <list-file>...`, defaulting to the Phase 4 manifest.
- `.tmp/p6a-report.md`…`p6j-report.md` — the ten children's per-file `--file` evidence. 26 reports in total, Phases 4–6.

## Gotchas / Warnings
- **`--diff` does NOT check `###` subheadings** (see Key Decisions). Never treat a green `--diff` as proof that every heading is intact; run the `-U0` grep.
- **`--lang ru` is not optional.** The validator defaults to `en` and prints a green line that says nothing about the Russian tree.
- **`corr` is not a quality signal for a single file.** Two files this phase scored 0.63 and 0.96 individually while the topic mean was 0.215 — short files (14–17 sentences) have too few points for the statistic to mean anything. Judge a file by `same sentence count` plus reading it, and never distort prose to move a single correlation number.
- **`--strict` exits 1 corpus-wide for reasons unrelated to your topic.** Use `--strict --topic <dir>` while working; the sha256 manifest is what proves the work happened.
- **Never `git checkout` a file that `--diff` reported** — and never on one of the four Phase-1 calibration files, where the revert destroys the user-approved voice.
- **`--topic` needs the prefixed directory name** (`05-backend-data`); an unprefixed name selects nothing.
- **A fence's *contents* are frozen, not just its delimiters** — and this is the code-heaviest topic in the corpus, so a writer's urge to reword a "formulaic line" lands inside a fence almost every time. Check before rewriting.
- **Sweep `.tmp/` at every batch boundary.** This phase's 10 children left 18 scratch files (`p6d-fencechk.mjs`, `p6h-metrics.cjs`, `p6j-sents.js`, `p6d-body-test.md`…). Two children reported they could not delete their own scratch because the shell path guard blocked `rm` — expect that and sweep centrally.
- **Measure the `однако` density the children actually delivered**, don't assume it. Phase 6 delivered 1.79 per 1000 against a 0.80 floor — the highest of any phase, and what carried the corpus row to 1.11.
