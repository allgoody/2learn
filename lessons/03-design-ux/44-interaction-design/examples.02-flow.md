## Example 1 — Counting three paths, not one

A shop has a four-step checkout and the team has mapped only the happy path. Add the returning-customer path and the path of someone who needs an old receipt midway, count the steps in each, and name the row worth redesigning.

```text
Happy path (mapped)
  search -> item -> cart -> pay                         4 steps

Returning customer, reordering a usual item
  log in -> search -> item -> cart -> pay               5 steps

Needs last year's receipt mid-checkout, for an expense claim
  back out of checkout -> account -> orders -> open order ->
  copy the number -> search again -> item -> cart -> pay  9 steps
```

### Solution

```text
Happy path            4 steps   (search -> item -> cart -> pay)
Returning customer    3 steps   (reorder -> address -> pay)
Needs a receipt       4 steps   (pay -> receipt on the confirmation)

Fix: a one-tap reorder from the order history replaces log in and
search. The receipt lookup moves into a sideways panel over the
checkout, so the cart is never abandoned to find it.
```

Counting the returning and receipt paths is what exposes the nine-step one, which the happy-path map never shows because every screen is fine on its own. The usual failure is optimising only the happy path, so the paths most customers actually take stay long.

## Example 2 — Back that is a step, and a repeat that explains itself

A verification flow loses every field when the browser back button is pressed, and one step repeats without explanation. Fix both moments and write the line the user reads at the repeated step.

```text
Observed
  back from step 2 exits to the marketing page, all fields lost
  a reload or a second tab returns the user to step 1
  step 3 repeats the code entry after a two-minute wait, with no
  explanation of why or of how much of the flow is left
```

### Solution

```text
Back     the current step and every entered value persist in the URL and
         server-side, so back is the previous step with its values; a
         reload or a second tab resumes at the same step

Repeat   "The code expired after 2 minutes. We sent a new one to
         •••• 4471. Two steps left after this."
```

Persisting state makes back a step rather than a restart, and the repeat line names the reason and the remaining distance, so the user reads a rule instead of a bug. The usual failure is state that lives only in the component, where any navigation discards the whole task.
