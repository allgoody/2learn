## Example 1 — A page that never states its claim

A guide answers a common question, but the answer is spread across five paragraphs that each begin with a qualification. A summariser has nothing self-contained to lift. Say what an extractable sentence needs, then restructure the page without deleting anything.

```text
current shape
"Choosing an icon grid"          <- heading, does not name the question
"Before deciding, it is worth remembering that sizes vary, and many teams
 find that optical consistency depends on several factors, which means…"
(three more qualifying paragraphs before the recommendation appears)
```

### Solution

```text
restructured shape
"What grid size should an icon set use?"          <- heading names the question
"A 24 by 24 internal grid keeps an icon set optically consistent across
 sizes. Larger grids blur detailed shapes when an icon renders at 16 pixels."
(paragraphs explaining why, with the exceptions, underneath)
```

A summariser lifts sentences that stand on their own, so a paragraph that builds to its point through three qualifying clauses does not survive extraction, while a self-contained one does. The heading is part of the answer as well: naming the question is what makes the pair of heading and first sentence a complete response, and the detail below it then elaborates rather than repeats. Clarity that survives extraction is the same clarity that helps anyone reading the page.

## Example 2 — The same figure in two places

A specification's headline number appears on the page and, slightly differently, in the structured data. Answer engines compare a page against other descriptions of the same subject, and the mismatch reads as unreliability. Say what the inconsistency costs, then give the figure one home.

```json
{
  "@context": "<the vocabulary's own address>",
  "@type": "Product",
  "name": "Desk lamp",
  "weight": { "@type": "QuantitativeValue", "value": "1.8", "unitCode": "KGM" }
}
```

```html
<p>The lamp weighs 1.6 kg.</p>
```

### Solution

```html
<p>The lamp weighs 1.8 kg.</p>
```

```text
one source of truth: the specification file
  page prose, structured data and the product profile are all generated from it
check the copies on a schedule: a figure edited in one place drifts silently
```

The page and its structured data are two descriptions of the same fact, and when they disagree a system reading both has no way to know which to trust — so the safest response is to discount the description. Generating every copy from one file removes the choice entirely. Worth saying plainly: how answer engines select citations is not published and changes often, so the effort belongs where the return is certain — stating facts plainly, citing primary sources, keeping figures consistent, and passing the crawl, index and speed gates first.
