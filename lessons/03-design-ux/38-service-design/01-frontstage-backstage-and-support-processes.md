---
title: Frontstage, backstage and support processes
prereqs: []
---

## What it is

A service has two layers. Frontstage is everything the customer sees: the screen, the courier, the person on the phone. Backstage is the work that makes it possible: the picking, the queue, the approval, the nightly batch job. Support processes are the systems that keep backstage running — staffing plans, inventory feeds, escalation routes.

## Why it matters

Faults concentrate in the seam. Each team can be meeting its own target while the customer waits, because no one owns the hand-off: the label is printed before the parcel is packed, the confirmation email goes out before the payment clears, the call centre cannot see the order the app just took. Mapping the layers makes those seams visible and gives them an owner, which is the only way they get fixed.

## Core ideas

### Draw the line, then check it holds

Mark the line of visibility on your journey map. Every frontstage moment must name the backstage action that supports it and the support process that keeps that action available.

```text
Frontstage:  "Your parcel is on its way"   (notification)
Backstage:   parcel scanned at depot
Support:     depot scanner sync job every 15 minutes
Failure:     scan happens at 18:40, sync at 19:00, message reads wrong for 20 min
```

If a frontstage promise has no named backstage action, it is a wish.

### Model capacity, not just flow

A journey diagram looks the same whether one person or ten thousand use it. Add the volumes and the bottleneck: how many arrive per hour, how many can be served, what happens at peak.

```text
Arrivals 09:00-10:00   420 tickets
Agents available       6  x  8 tickets/hour = 48
Backlog at 10:00       372
```

The customer experience of a service is largely the experience of waiting, so the queue is a design surface.

### Failures are designed too

Write the failure path for each step: what the customer sees when the scan is missing, the payment fails, the agent is unavailable. Unplanned failure paths are where trust is lost, and they are cheap to sketch while the happy path is being drawn.

### Put a person on every hand-off

Each seam between frontstage and backstage, or between two systems, needs an owner and a stated agreement: what is handed over, in what state, by when. Hand-offs without owners decay silently.

## Practice

### Map one service and mark the seams

Take a service you use weekly — a delivery, a repair, a booking. Draw three rows: customer steps, backstage actions, support processes. Mark the line of visibility and ring every hand-off between two parties.

Done when: every frontstage step has a backstage action beside it, and every ringed hand-off has an owner named.

### Write one failure path

Choose the step most likely to fail and write the script for it: what the customer sees, what the agent sees, and what the customer is told within the first minute.

Done when: the failure script names a message, a channel and a person responsible, and no step says "handled automatically".

## Common mistakes

- **Mapping only the frontstage** — the map looks complete and explains nothing about why the service breaks; fix: add the backstage row and the support process behind it.
- **Ignoring volume** — a design that works for ten users collapses at a peak; fix: annotate arrivals, capacity and backlog on the map.
- **No failure paths** — the happy path ships and the first outage is improvised; fix: write the failure script for every step that can fail.
- **Hand-offs with no owner** — each team blames the other and the customer waits; fix: give every seam one named owner and one agreed hand-over state.
- **Confusing a touchpoint with the service** — polishing one screen changes little if the queue behind it is the real problem; fix: fix capacity and hand-offs before surface polish.

## Go deeper

- **Service Design** (`03-design-ux/38-service-design`) — the track this chapter belongs to.
- **Journey Mapping** (`03-design-ux/22-journey-mapping`) — the end-to-end chart this layer sits under.
- **Information Architecture** (`03-design-ux/09-information-architecture`) — structuring what the customer must find along the way.
- **Usability Testing** (`03-design-ux/33-usability-testing`) — testing the moments the customer actually touches.
