---
title: Elements and styles
prereqs: ["frontend/javascript"]
---

## What it is

The Elements panel shows the live document tree — after scripts have run and the browser has corrected any malformed markup — with the Styles pane beside it showing every rule that applies to the selected element in the order the cascade resolved them. It is the browser's own answer to the question "why does this element look like that".

## Why it matters

CSS reasoning is hard to do in the abstract because the cascade depends on the whole document and the viewport. The Styles pane removes the guesswork: it lists each declaration with its source file, strikes through the ones that lost, and shows the computed value that actually applies. The tree view removes a second class of guesswork, because the DOM a script produced is frequently not the DOM you expected — a wrapper the framework inserted, an element the parser moved, a node that was never created because the branch that should have made it did not run.

## Core ideas

### Inspect the resolved cascade, not the stylesheet

Select an element and read the Styles pane from top to bottom. Each rule is listed with a link to its line in the source; struck-through declarations were overridden by something more specific or later. The "computed" tab shows the final value for each property, including inherited ones, which is where surprises about em and percentage values usually appear.

```text
.card { padding: 1rem; }        ← applied
.card.small { padding: .5rem; } ← struck through (lower specificity)
```

Searching the panel for a property name is faster than reasoning about which file might set it.

### Edit the live tree to test a hypothesis

Changes in the Styles pane apply immediately without touching the filesystem, which makes it possible to test a fix before writing it. A margin that disappears when you uncheck it is the margin that was causing the problem — a five-second experiment that would otherwise be a commit and a reload.

```css
/* typed into the Styles pane to test, then written into the source */
display: grid;
grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
```

The edits are not saved: reload and they are gone, which is exactly what you want from a scratchpad.

### The tree is the DOM after scripts have run

If an element is missing, the question is whether the markup lacked it or the script failed to create it. Right-clicking a node and inspecting its event listeners answers the related question of why a handler did not fire: no listener, a listener on a different element, or one that was removed.

### Box sizes are visible in the model

The box model diagram shows content, padding, border and margin as four concentric values, which is the fastest way to settle an argument about where an element's size came from. Toggling `box-sizing` in the pane shows the difference between the two interpretations on a real layout.

### The accessibility tree is a second view of the same DOM

The accessibility inspector shows what assistive technology would announce: role, name, state and the landmarks around it. It is the only way to confirm a label actually reached the control rather than being hidden by a parent.

## Practice

### Find the rule that wins and the rule that loses

Select an element, find a property set by two rules, and write down the specificity of each and why the winner won.

Done when: you can name the losing rule's source line and state the one change that would make it win.

### Debug a missing element with the live tree

Introduce a condition that prevents a node from being created, then use the Elements panel and the console to find out whether the node is absent or merely invisible.

Done when: you can distinguish between "not in the DOM", "in the DOM but hidden" and "in the DOM but outside the viewport" without adding a log statement.

## Common mistakes

- **Reading the source instead of the panel** — the loaded stylesheet may differ from the file after a build step; fix: check the resolved rule in the Styles pane.
- **Assuming the DOM matches the markup** — scripts and the parser both change it; fix: inspect the tree the browser actually has.
- **Editing styles in the panel and expecting them to persist** — the edits are a scratchpad; fix: copy the working value into the source and reload to confirm.
- **Debugging layout from the outside** — the cause is usually a parent's spacing or display mode; fix: walk up the tree checking the box model at each level.
- **Ignoring the accessibility tree** — a control can look correct and announce nothing; fix: check what is announced, not only what is rendered.

## Go deeper

- **Javascript** (`frontend/javascript`) — the console and the debugger are where scripts are actually understood.
- **Network and performance** (`frontend/browser-devtools/02-network-and-performance`) — the other two panels that answer most production questions.
- **Cascading Style Sheets (CSS)** (`frontend/css`) — the cascade rules the Styles pane is displaying.
