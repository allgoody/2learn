## Example 1 — The fidelity the question needs

A team wants to know whether people understand the label "Start a return" and whether they can find it. Someone has proposed a fully clickable prototype with brand styling, real photography and entrance animation, built over two weeks. Choose the fidelity that answers this question and write down what has to stay rough.

```text
Open question: does the wording "Start a return" get understood,
and is the link findable on the account screen?
Proposal: five screens, brand styling, real photography, entrance
animation, two weeks of build.
```

### Solution

```text
Question                        Fidelity              Time
Is the label understood?        paper, hand-written   half a day
Is it findable on the screen?   linked grey screens   one day

Deliberately rough: styling, motion, real images, edge-case data.
Spent on: wording. Two written label variants and one layout.
```

The question is about words and placement, so paper and grey screens can answer it; styling and animation would consume the fortnight without teaching the test anything readable. The usual mistake is polishing every dimension at once, which leaves nobody able to say which part produced the finding.

## Example 2 — Real content before the demo

The fidelity is settled: one coded screen, real timing. Load it so the finding is about the interaction rather than about placeholder content, and include one extreme case.

```text
Product list rows are filled with "Item name", "lorem ipsum" and
prices of "£0.00". The longest real product name is "Replacement
stainless steel filter cartridge, 2-pack". One collection starts empty.
```

### Solution

```text
Rows:
  "Replacement stainless steel filter cartridge, 2-pack"    £34.00
  "Descaler sachets"                                         £6.50
  "Water filter jug"                                         £22.00

Empty collection: "Nothing saved yet. Items you save appear here."
Extreme case left in: the long name wraps to three lines.

This screen was built to answer one question; its shortcuts are not
specifications. Loading, empty and error states are re-specified from
the wireframes before any build.
```

Placeholder strings hide exactly the states that break in reality, and the long name is the case a demo never shows. The empty-collection line stayed invisible while "Item name" filled the row. The usual failure is promoting a polished prototype to a specification, so its shortcuts become requirements.
