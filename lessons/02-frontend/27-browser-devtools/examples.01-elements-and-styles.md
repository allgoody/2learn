## Example 1 — Two rules and no idea which one wins

A card renders with the wrong padding, and both values can be found in the stylesheet. The Styles pane shows one of them struck through. Say how the panel decided, then state the one change that would make the losing rule win.

```text
panel state (illustrative)
.card        { padding: 1rem; }                          ← applied
.card.small  { padding: .5rem; }                         ← struck through
computed     padding: 16px
```

### Solution

```text
the reading
.card.small    two classes   -> higher specificity than one class
.card          one class     -> loses despite coming earlier

to make the losing rule win, either drop the extra class qualifier
or move it later with equal specificity — do not add !important
```

The Styles pane lists every rule that applies in the order the cascade resolved it, with the losers struck through and a link to each rule's line in the source, the browser's own answer to why an element looks like that, which cannot be settled by reading files because the cascade depends on the whole document and the build. Specificity is what decided here, and the fix is to change the selector rather than to escalate: adding `!important` wins this one argument and loses the next.

## Example 2 — An element that is in the tree but invisible

A button is not responding to clicks and the markup looks correct. The tree and the box model together explain it in seconds. Say what each observation rules out, then name the cause. The panel state is illustrative.

```text
panel state (illustrative)
<div class="overlay" …>                     ← present, covers the button
  <button class="cta">Continue</button>     ← present in the DOM
box model: overlay  width 100%  height 100%  position: fixed  z-index: 3
styles:    .cta     opacity: 1, display: block, visibility: visible
```

### Solution

```text
the reading
button is in the DOM            -> the markup and the script both ran
button is styled visible        -> no display, opacity or visibility problem
overlay sits above it at full size -> the click lands on the overlay, not the button

cause: a full-size fixed overlay with a higher z-index is on top.
check the parent chain in the box model at each level before editing the button.
```

The tree shows the DOM after scripts have run, so a node present there rules out a missing render branch, and the Styles pane rules out an invisible element — which leaves geometry. The box model shows content, padding, border and margin for the selected element and its ancestors, and layout bugs are usually a parent's spacing or display mode. Checking sizes and stacking up the parent chain turns a guess into an observation.
