## Example 1 — Three stories against a reference scale

A team keeps two reference items and sizes new work against them, never in hours. The three new stories are below. Give each a reference-point estimate and say what makes the comparison honest.

```text
Reference 3  add a filter to an existing list
Reference 8  build a simple form with validation and error states

New
  1. add a sort toggle to the orders table
  2. bulk import orders from a file (unknown file formats)
  3. change the currency label on the invoice
```

### Solution

```text
1. add a sort toggle            -> 2  (smaller than the filter, no states)
2. bulk import for a file       -> 13 (bigger than the form; unknown
                                        formats -> split it)
3. change the currency label    -> 1  (one field, no interaction)
```

Every size is a comparison against a shared reference, so the estimate survives the discovery of a missed task — the number measures the item against its peers, not against a clock. What makes the comparison honest is that all three people sized the same items and agreed within one step, using the same two anchors, and the coarse 1, 2, 3, 5, 8, 13 scale absorbed the rest. The trap is a hidden clock: the moment someone says "one point is about a day", absolute estimation and its guesses return.

## Example 2 — A velocity chart on the wall

A team plots each developer's points per sprint on the wall. The chart below is the last four sprints. Rewrite what is measured so it forecasts a batch rather than comparing people.

```text
Points completed
  Sprint 11   Alice 13  Ben 8   Cara 5
  Sprint 12   Alice 8   Ben 13  Cara 8
  Sprint 13   Alice 8   Ben 5   Cara 13
  Sprint 14   Alice 13  Ben 8   Cara 8
```

### Solution

```text
Team velocity   sprint 11: 26   sprint 12: 29   sprint 13: 26   sprint 14: 29
Forecast        next sprint: about 27 points, plus the two items
                re-sized after their scope changed last sprint.
```

The number belongs to the item and to the team, so the useful reading is whether the recent average predicts the next batch — within about twenty per cent, it does. Plotting per person invites anchoring and turns sizing into a competition, which is exactly how a forecasting aid becomes a productivity metric and the estimates start to inflate. The trap is re-estimating under pressure: an estimate that moves with the deadline is a commitment in disguise, so re-size only when the scope changed and say what changed.
