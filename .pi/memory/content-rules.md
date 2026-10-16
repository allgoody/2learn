# Content rules — 2learn

Moved out of `.pi/project-rules-memory.md` on 2026-10-16 to keep that index inside its size budget.
This is the **detail** behind the corpus contract. The authority is `lessons/AUTHORING.md`; the
enforcement is `tools/validate-content.mjs`. The index keeps the rules that have actually bitten.

---
## Content Rules
Defined in `lessons/AUTHORING.md` and enforced by `tools/validate-content.mjs` (checks V1 to V14):
- Three body shapes only: full lesson (6 headings, 450-950 words), track landing (5 headings, 200-400 words), area page (4 headings, 120-300 words). `## Core ideas` holds 3-6 `###` subheadings — the upper bound is the one that gets violated; budget five or six.
- Tier determines the child count and is fixed: small 0, medium 2, large 4, area 0.
- Frontmatter field order: title, type, topic, tier, status, aliases, prereqs, related. `prereqs` must equal the inventory exactly — the graph is given, not chosen.
- Child lessons carry exactly two keys, `title` then `prereqs`.
- Prose uses British English; titles are verbatim from `tools/inventory.json`, including `Javascript`, `Restful API` and `Prioritization`.
- **No external URLs anywhere under `lessons/`.** "Go deeper" bullets point at other entries only.
- Batch writers always write `status: drafted`; only the user promotes an entry to `reviewed`.
- Alias, prereq and tier values come from `tools/inventory.json` and nowhere else — a work package that asks for an alias the inventory does not list has not been updated since the inventory was frozen; the inventory wins.
- `## Prerequisites` bullets are written **with backticks** (`- **Title** (\`id\`)`) even though `AUTHORING.md` §5 shows them without; the validator's V10 regex requires the backticks. The Phase 1/2 exemplars confirm this.
- **Worked examples live in sidecar files, never in a lesson body.** A pointer line in `## Practice` is impossible: 20 full-shape lessons sit at 930–950 of the 950-word ceiling and 4 are at exactly 950, so any added line fails V5. The contract is one non-frontmatter file beside the lesson — `examples.md` beside `index.md`, `examples.NN-slug.md` beside `NN-slug.md` — holding 1–2 `## Example N — …` sections, each with one `### Solution`, a language tag on every fence and 120–450 words. Landing and area indexes get none, because they have no `## Practice`. The generated `INDEX.md` carries the link. The contract is written down in `lessons/AUTHORING.md` **§12** (added by WP-9) and enforced by **V15** (shape: no frontmatter, 1–2 `## Example N — …` headings, exactly one `### Solution` each, a tagged fence on both sides of each Solution, 120–450 words, no external URL) and **V16** (coverage: a full-shape lesson with no examples file counts as pending, an orphan or misnamed examples file is always an error). The summary line is now five-part: `X present, Y pending, Z examples, W examples pending, E error(s)`.
- **The Russian corpus (Plan B) mirrors everything above in Russian** with its own word bands and heading vocabulary: full 400–1100, landing 180–460, area 100–340, examples 100–500 words. `lessons/AUTHORING.md` **§13** is the contract (Russian heading vocabulary, the fixed literals `Готово, когда:`, `Нет.`, `; исправить: `, spaced em dashes, no `http://`/`https://`), `lessons/ru/GLOSSARY.md` is the terminology table, and **V15/V16/V17** enforce the structure for the `ru` root too. The Russian root intentionally skips V3's `title` comparison (`currentLang === "ru"`) because Russian titles are chosen per file; type/tier/topic/prereqs/aliases/related/status are still compared.

