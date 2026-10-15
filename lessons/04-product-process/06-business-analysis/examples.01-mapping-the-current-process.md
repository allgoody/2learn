## Example 1 — Walk one real case, not the intended one

The procedure manual says a refund takes under two hours. Your decision is whether the manual-refund step is worth replacing. Follow one real ticket end to end and record the actor, system and duration for every step.

```text
Manual (intended process)
Support opens the ticket, checks the order, refunds it, replies.
Expected duration: under 2 hours.
```

### Solution

```text
Case: refund, order 88213

09:12  support   reads ticket, opens order in shop system
09:18  support   gift-card payment — cannot refund here
09:18  support   opens accounts system                    [HANDOFF]
09:26  support   copies amount into manual-refunds sheet  [re-typed]
09:31  support   emails finance                           [HANDOFF]
14:50  finance   confirms and replies                     [wait 5h 19m]
14:52  support   records the confirmation in the ticket

Work 17 min · wait 5h 19m · handoffs 2 · re-typed values 1
```

The manual is not wrong, it is just the intention; the walked case shows the cost sits in the two handoffs and the five-hour wait, not in the work. Marking re-typed values exposes the defect risk. The usual mistake is interviewing instead of following a case, which reproduces the manual on a nicer sheet.

## Example 2 — Put the exceptions and the decision on the map

Two variations were described as "the odd case". Count their frequency across a week's sample and write the decision the map exists to inform at the top of the page.

```text
Illustrative sample: 100 refunds in one week
  card refund, no approval                 72
  gift-card refund, finance approval       19
  refund over the limit, manager approval   6
  partial refund, manual recalculation      3
```

### Solution

```text
Decision: keep the manual process, raise the approval limit, or integrate
the shop and accounts systems.  Timebox: one week, map good enough to choose.

Variation                         Frequency  Extra steps
card, no approval                 72%        none
gift card + finance approval      19%        2 handoffs, 5h wait
over the limit + manager          6%         1 handoff, 1 day
partial + recalculation           3%         re-entry, error-prone
```

With frequencies attached, the "odd case" that is 19% of volume is the real target, and the map is finished when it can choose between options rather than when it is complete. The usual mistake is treating every variation as rare noise and letting the mapping run past the decision it was meant to inform.
