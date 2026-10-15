## Example 1 — A backlog ordered by who asked last

A backlog of twenty items sits in the order it was typed. The top ten are below. Re-order them by value and give each a one-clause reason, keeping the detail close to the top few items.

```text
1. redesign the settings page        (asked by the CEO)
2. fix the invoice rounding bug      (asked by support, daily)
3. add an emoji picker               (asked by one salesperson)
4. bulk export of orders             (asked by three customers)
5. refund status page                (asked by support, weekly)
6. saved payment methods             (asked by the largest account)
7. archive old projects              (asked by one team)
8. fix the login timeout             (asked last month)
```

### Solution

```text
1. fix the login timeout             blocks every session
2. fix the invoice rounding bug      wrong money, seen daily
3. saved payment methods             largest account, named need
4. refund status page                weekly support load, ready
5. bulk export of orders             three customers, needs refinement
6. archive old projects              one team, moderate value
7. redesign the settings page        cosmetic, no evidence
8. add an emoji picker               one requester, no evidence
```

The order now says which items are refined enough to forecast and which are placeholders, which is the job of the list; the original encoded arrival, not value, so the team would have picked the emoji picker first because it was small. The trap is refining all twenty in advance: the top few deserve detail, and the rest should stay roughly written until they reach the top.

## Example 2 — One item that fills the whole sprint

An item has been sized as a full sprint on its own. Split it into pieces that can each be demonstrated, and say what happens to a piece the team cannot finish in time.

```text
Item  "bulk import orders from a file"
       estimate: the whole two-week sprint
```

### Solution

```text
A  parse a CSV and preview the rows it will import (demo: upload, see rows)
B  import a validated file and report per-row errors (demo: mixed file)
C  handle XLSX as well as CSV (demo: upload a spreadsheet)
Unfinished: C was not finished -> returns to the product backlog, re-ordered
            above D and named in the sprint review.
```

Each piece is independently demonstrable, so the sprint ends with an increment rather than an all-or-nothing gamble, and the unfinished piece returns visibly instead of being silently carried. That visibility is the point: a carry-over hides the pattern that the items are too large. The trap is splitting by technical layer, where nothing can be demonstrated until the last piece lands.
