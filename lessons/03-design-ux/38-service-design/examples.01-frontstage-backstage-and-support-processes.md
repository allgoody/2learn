## Example 1 — Three rows, the line of visibility and the seams

A parcel service promises the customer four moments: the order is placed, the parcel is packed, it is on its way, and it arrives. Draw the frontstage, backstage and support rows, then place an owner on every hand-off.

```text
Lane          Step 1              Step 2            Step 3             Step 4
Frontstage    order placed        "packed" email    "on its way"       delivered
-------------- line of visibility -------------------------------------------
Backstage     pick list created   parcel picked     scanned at depot   route planned
Support       order queue         pick list feed    scanner sync job   driver rota
Owner         webshop team        warehouse lead    depot ops          depot ops
                ^ seam 1            ^ seam 2          ^ seam 3
```

### Solution

```text
Seams and their agreements
1. webshop -> warehouse: order, address, paid state, within 5 minutes
2. warehouse -> depot:   parcel count, label id, same day by 18:00
3. depot -> driver:      scan confirmed before the van leaves

Unsupported: "on its way" email has no scan behind it at 18:00
```

Every frontstage promise now names the backstage action behind it and the process that keeps that action available, so the promise without a scan is visible instead of wished for. The usual mistake is naming the seam and stopping there; a hand-off with no owner and no agreed state decays quietly while both teams keep meeting their own target.

## Example 2 — The peak hour and the message for it

The same service takes most of its orders on a Monday morning. Work out what the queue does at peak and write the failure script for the hours when the promise cannot be met.

```text
Peak hour, Monday 09:00-10:00 (volumes illustrative)
Arrivals:          420 tickets
Agents on shift:   6, at roughly 8 tickets per hour each = 48 served
Backlog at 10:00:  372
```

### Solution

```text
Message the customer sees
"We are busier than usual. Your place is held and your wait
 time is shown below; you will not lose your queue position."

Message the agent sees
queue position, estimated wait, one escalation route

Within the first minute: same channel the customer used
Owner: contact centre shift lead
```

A journey drawn with volumes attached shows that the Monday experience is mostly the experience of waiting, and the failure script names the message, the channel and the person before the first peak rather than during it. The usual mistake is drawing the happy path at one order an hour, which reads as complete and collapses at 420.
