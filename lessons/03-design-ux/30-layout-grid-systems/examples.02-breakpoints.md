## Example 1 — Marking the widths where the content breaks

A three-column page has never had breakpoints: it is squeezed until text wraps to two words a line. The notes below are from resizing the window slowly. Turn them into breakpoint widths and name what changes at each.

```text
Resizing notes
  at ~940px  the sidebar squeezes the body text below 45 characters
  at ~620px  the three-column card grid leaves two-word lines
```

### Solution

```text
940px and 620px, chosen from the content, not from device names

Wide    >= 940   content and sidebar side by side
Medium  620-939  sidebar moves below the content
Narrow  < 620    single column, card grid stacks
```

Two breakpoints produce three arrangements, and each one changes the arrangement rather than nudging padding, so the maintenance buys something visible. The widths come from where the layout actually failed, which is why they do not date the way a device model name does. The common failure is copying a breakpoint list from a phone and a tablet and then discovering none of it matches where this content breaks.

## Example 2 — Designing the narrow arrangement on its own terms

At 360px the wide layout is currently squeezed into one column, with the filter row and the promotion still carried along because they were easier to keep than to remove. Decide what the page is for when there is only one column, and what it drops.

```text
Wide (>= 940)
  heading, search, filter row (6 filters),
  results, pagination, promotional banner
```

### Solution

```text
Narrow (< 620)
  heading
  search                 <- primary action, stays at the top
  results
  [ Filters (6) ]        <- filters move into a secondary view
  pagination
  promotional banner     <- moved below the results
```

The narrow layout keeps the primary action and the heading, folds six filters behind a single control, and moves the promotion below the content it was interrupting. Designing at 360px without looking at the wide layout is what exposes an element that survived only because deleting it felt like losing work. The failure to guard against is treating the narrow screen as the wide one squeezed: that is where four-word lines and overlapping blocks come from.
