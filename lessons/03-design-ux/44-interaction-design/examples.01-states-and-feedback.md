## Example 1 — Enumerate the states, then time the press

A profile screen has one save control, and only the idle appearance has ever been drawn. Enumerate its states and show the empty, loading, error and success states as the artefact, with what the user sees as the slow save call runs.

```text
Control: "Save changes" on the profile screen
Drawn so far: idle only — blue fill, white label
Undrawn: empty, loading, error, success, disabled
Slowest action: the save call sometimes takes four seconds
```

### Solution

```text
idle     label "Save changes", fill colour.action.default
loading  0-100ms: nothing changes
         100ms-4s: spinner replaces the label, control disabled, so a
         second press cannot send a duplicate save
success  label "Saved", fill colour.success.subtle, returns to idle
error    label "Save changes", message below the field:
         "That email address is already in use." Every value preserved.
empty    no profile data: placeholders shown, save control disabled with
         the reason "Add a name to save"

Missing deliberately: nothing on this list.
```

Drawing loading, error and success before release means the four-second call never renders as a freeze, and the user cannot fire a duplicate save by pressing again. The empty case gets a reason instead of a silent grey button. The usual failure is shipping only the idle state, so the first slow response looks like a broken control.

## Example 2 — An error that does not cost the task

A payment step fails on a declined card after the user has filled the whole form, and a second control is waiting on a value that was never entered. Write the error response and the disabled case so neither becomes a dead end.

```text
Situation
  every field filled, card declined by the processor
  a second control, "Send receipt by post", needs a postal address
  that address has not been entered yet
```

### Solution

```text
Declined card
  Field:   "That card was declined. Check the number or use another."
  Input:   every field kept exactly as typed, card field focused
  Control: "Try again" enabled, form not cleared, no data lost

Postal receipt control
  Disabled, with the line beneath: "Add a postal address to use this."
  Enables the moment the address is entered.

Message wording: says what failed and what to do next, not "Error 402".
```

Keeping every field means the user retries instead of abandoning the whole payment, and the reason line turns a greyed control into a next step rather than a puzzle. The usual failure is a form that clears on failure or a raw error code, either of which loses the task.
