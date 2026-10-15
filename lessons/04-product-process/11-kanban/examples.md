## Example 1 — A board with generic columns

A support team runs its kanban board as to do, doing, done, with no limits. The board below is today's state. Redraw it so the real waits are visible and each column that fills has a limit.

```text
To do (23)   | Doing (9)      | Done
A  fix login  A  migrate X     (many)
B  refund     B  fix login
C  report     C  refund
... 20 more   ... 6 more
```

### Solution

```text
| Ready (4) | In progress (2) | Waiting on customer (2) | In review (2) | Done |
| 4 items   | 2 items         | 2 items                 | 2 items       |      |
```

Generic columns hide every wait: the nine items "doing" include four blocked on a customer reply, and the queue that limits flow is the review step nobody named. Naming the real stages and putting a number on each is what makes the board an instrument rather than a wall of sticky notes. The thing that usually goes wrong is setting a limit on a column that never fills — if it is never full it is not the constraint, and its number only adds noise. Start limits on the stage that fills first.

## Example 2 — A weekly report that measures velocity

A kanban team's only number is how many items each person completed this week. Rewrite the report around flow metrics and say what the team does with it once a week.

```text
Weekly report
  Alice   7 items
  Ben     5 items
  Cara    6 items
  Total  18 items completed
```

### Solution

```text
Flow, week 31
  Cycle time   median 6 days, 85th percentile 14 days
  Throughput   11 items per week
  WIP          7 against a limit of 9
  Blocked      two items, both waiting on a customer reply
Review each Monday: the two blocked items, then whether review is the
constraint.
```

Cycle time, throughput and the work-in-progress count describe the system; per-person completion counts describe people and invite the team to split work to raise a number. The point of the weekly review is to act on the constraint it reveals — here the percentile says long items sit in review, so the policy change belongs there. The trap is treating improving numbers as the goal: they improve while the flow does not. Keep velocity off a flow board entirely.
