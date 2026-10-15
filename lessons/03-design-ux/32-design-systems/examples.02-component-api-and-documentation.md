## Example 1 — One props table from five real call sites

A team is about to add a button to the component library. Five call sites already use hand-built versions with their own props, and every one of them passes a different combination. Collect the uses and design the smallest named variant set. Produce the props table that replaces them.

```text
Call sites in the product
  page header primary action        "Save changes"
  dialog secondary action           "Cancel"
  account deletion                  "Delete account"
  row action inside a table         icon + "Edit"
  inline link styled as a button    "View report"
```

### Solution

```text
Prop      Values                                  Default    Note
variant   primary | secondary | danger | link     primary    named set, no free boolean
size      small | medium | large                  medium     independent of variant
icon      element                                 none       optional leading icon
loading   boolean                                 false      documented state

Rejected: large, ghost, icon-only, full-width as booleans; they combine into
buttons nobody designed. icon-only becomes size="small" + icon + no label.
```

Four named variants cover all five call sites, and the combinations that nobody drew cannot be expressed. The rejected line matters as much as the table: without it the next team proposes a fifth boolean. The usual failure is adding a prop for each site's extra wish until the interface has twelve switches and no consistency.

## Example 2 — The page that stops the first fork

The button ships, and a designer asks for a destructive action that is not really destructive. Write the short documentation page: the states to show and the do-and-do-not lines. Produce the snippet a consumer reads instead of forking.

```text
Request
  "We need a red button for 'Archive project'. Not destructive,
   but it should stand out. Can you add another variant?"
```

### Solution

```text
Button

States
  default   label, primary fill
  loading   label replaced by a spinner, control disabled
  disabled  muted fill, no press feedback

Do
  use variant="danger" for an action that cannot be undone
  use variant="primary" when it is the one main action on a screen
Do not
  use variant="danger" for a serious-looking primary action
  fork a local button because a variant is missing; state the case instead

Decision
  archive is reversible, so it uses variant="secondary". A danger
  variant is reserved for deletion, and the reserved meaning is why
  it still reads as dangerous.
```

Documenting the states means nobody invents loading and disabled differently, and the do-and-do-not answers the archive request without adding a variant. The recorded decision is what stops the same question returning next quarter. The usual failure is a page that shows only the default state: consumers then guess the rest, and each guesses differently.
