---
title: The hand-off to layout
prereqs: ["design-ux/information-architecture/03-findability-testing"]
---

## What it is

The hand-off to layout turns a tested structure into page skeletons: which category appears where, what each page must show first, which links lead to which level, and what a page contains when the content is empty. It is the point where information architecture stops being a diagram and becomes something a designer can lay out and an engineer can build.

## Why it matters

Most structure diagrams are unbuildable: they show a hierarchy and leave every page-level question open, so the layout is invented screen by screen and the structure quietly disappears. A written hand-off keeps the decisions that were tested — the labels, the levels, the paths — and passes them to wireframing intact. It also exposes the cases a tree diagram never covers: no results, one result, four hundred results, and content that has been deleted but is still linked.

## Core ideas

### One page contract per page type

Write what each page type must contain, in priority order, and what it must link to. Five to eight page types usually cover a product.

```text
Collection page (e.g. Your orders)
1. Page heading, matching the navigation label
2. Search or filter, if the collection can exceed 20 items
3. Item list, each linking to the detail page
4. Empty state: what will appear here and how to get the first item
5. Secondary link to the parent category
```

### Specify the states, not only the happy path

For every collection: empty, one item, many items, error, loading. For every detail: complete, partial, deleted. These are the cases that shape the layout and that nobody designs by accident.

```text
States: empty -> 1 item -> 20 items -> 400 items (paging, not scrolling)
        loading -> error (retry offered) -> permission denied
```

### Carry the labels through unchanged

Every heading uses the tested navigation label. If the page heading and the menu item disagree, the user loses confidence in both and the findability test no longer describes the shipped product.

### Say what links where, including the back path

Every page needs a way up and a way across. A detail page reached from search should not force the user through the hierarchy to leave it.

### Keep it in one artefact

A single document, one page contract per page type, with the tree diagram attached. Split across a diagram and several emails, the structure loses to whoever builds first.

## Practice

### Write page contracts for one section

Take one branch of your tested tree and write a contract for each page type in it: contents in priority order, links out, and states.

Done when: an engineer can describe the pages without asking which content goes where, and every state in the list has a described layout.

### Reconcile headings with labels

List every page heading and its corresponding navigation label side by side.

Done when: the two columns are identical, or you have recorded why they differ.

## Common mistakes

- **A diagram with no page contracts** — layout is invented per screen and the structure drifts; fix: write one contract per page type before wireframing.
- **Designing only the populated state** — empty and error pages ship as afterthoughts; fix: list every state and describe its layout.
- **Renaming a heading for the designer's taste** — the tested label disappears from the product; fix: carry the label through unchanged.
- **No upward or sideways path** — the user is trapped on a detail page; fix: specify the parent link and the cross link on every page type.
- **Scattering the specification** — decisions are lost between documents; fix: keep one artefact with the tree attached.

## Go deeper

- **Findability testing** (`design-ux/information-architecture/03-findability-testing`) — the evidence the structure passed before this hand-off.
- **Information Architecture** (`design-ux/information-architecture`) — the track this chapter closes.
- **Wireframing** (`design-ux/wireframing`) — the next step, where these contracts become grey-box layouts.
- **UX Writing & Microcopy** (`design-ux/ux-writing-microcopy`) — writing the empty states and errors the contracts specify.
