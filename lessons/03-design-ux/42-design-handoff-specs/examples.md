## Example 1 — Every state of the submit control

An engineer is building the checkout submit control from a single screenshot showing the idle button. Write the spec lines for the states, naming tokens instead of values, so the builder does not have to invent loading, error or disabled.

```text
Current handoff: one screenshot
  button label "Place order", blue fill, white text
  loading, error, disabled and success: nothing written down
```

### Solution

```text
Place order button

  idle       label "Place order", fill colour.action.default
  pressed    label dimmed, control disabled
  loading    spinner replaces the label, control disabled, no second
             submit; busy state announced to assistive tech
  success    confirmation replaces the form, order number shown
  error      label returns, message above the form body
  disabled   label "Place order", reason beneath:
             "Add a delivery address", fill colour.action.disabled

Tokens only: colour.action.default, colour.action.disabled,
colour.text.on-action, space.gap.control, radius.control.
No raw hex value appears anywhere in this spec.
```

Listing the states means the builder does not invent a spinner in the wrong place or a silent greyed button, and the disabled reason answers the question before it is asked. The usual failure is specifying only the happy path, so loading and error are guessed differently on each screen.

## Example 2 — Behaviour and the extremes

The states are agreed, but the screen still has no written behaviour and the longest real delivery name has never been tried in the layout. Add the action-by-action behaviour and the named extreme cases to the same spec.

```text
Open questions from the build
  what happens on press, and while the request is in flight
  where focus goes if the order fails
  what happens if the user presses back after paying
  longest real address line
  one account has 400 past orders; one new account has none
```

### Solution

```text
Behaviour
  On press:    disable the control, show loading, keep every field filled
  On success:  replace the form with a confirmation and the order number
  On failure:  re-enable, preserve all fields, focus the error message
  On back:     return to the address step with its values intact

Named extremes
  long address   "Flat 3, 118 Marlborough Court, Bishop's Stortford,
                  CM23 4QT" — wraps to two lines, no clipping
  many orders    order history list with 400 rows, paginated
  no orders      empty state: "No orders yet. Your first one will
                  appear here."
```

Writing the behaviour answers what a static file cannot — focus, re-enable, preserved fields — and naming the extremes stops the real address breaking a row after the build. The usual failure is ideal content only: the long name and the empty list reach production unhandled. Attach this spec to the ticket, not to a document nobody opens.
