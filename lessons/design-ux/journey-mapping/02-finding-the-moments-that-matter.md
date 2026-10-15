---
title: Finding the moments that matter
prereqs: ["design-ux/journey-mapping/01-laying-out-the-journey"]
---

## What it is

Reading a journey map means finding the two or three moments that decide whether the experience succeeds, and turning each into a change someone owns. Most steps are fine; the value of the map is that it makes the few that are not impossible to miss.

## Why it matters

A map is easy to produce and easy to admire. Without a reading pass it joins the shelf of artefacts that everyone agrees with and nobody acts on. The reading pass also protects against the instinct to fix the most visible step: the deepest dip is often a wait the team cannot shorten directly, while the real leverage sits one step earlier, in what creates the wait.

## Core ideas

### Mark the three kinds of moment

Look for the deepest emotion dip, the point of highest effort (re-typing, repeating, phoning) and the point of abandonment. They frequently sit on the same step, which is a strong signal.

```text
Deepest dip     payment failure with no recovery path
Highest effort  re-entering the address after the failure
Abandonment     two of six never returned after the failure
-> one moment, three kinds of cost
```

### Compare the moment with its cause

The failure the customer sees is usually downstream of the cause. Ask what happened one step earlier: the address was lost because the basket was rebuilt on a new session.

### Check what the moment costs, in the customer's units

Minutes, calls, re-typing, a wasted day waiting for a delivery. Put the number beside the moment so two moments can be compared without an argument about taste.

### Look for the moments your metrics cannot see

Analytics counts events inside your product; it cannot see the phone call, the depot trip or the friend's recommendation. Those off-product moments are often the most expensive and are invisible to dashboards.

### Turn each moment into one change with an owner

Write the moment, the change, the owner and the date on a single strip, and rank the strips against each other. Anything without an owner is a note, not a decision.

## Practice

### Read one map and rank its moments

Take the map you drew. Mark every dip, every high-effort step and every abandonment, write the cost beside each, then rank them.

Done when: you have one page with at most three ranked moments, each with a quoted observation and a cost in the customer's units.

### Write the change strips

For the top moment, write the change, the owner and the date. Repeat for the second and third.

Done when: each change names a step on the map and no change reads as a general improvement goal.

## Common mistakes

- **Fixing the deepest dip directly** — often a wait you cannot shorten; fix: move one step earlier and change what creates it.
- **Ranking by visibility** — the loudest moment gets the work and a cheaper one keeps costing money; fix: put a cost in the customer's units beside every moment before ranking.
- **Trusting only in-product metrics** — the expensive off-product moments stay invisible; fix: add the phone, email and physical steps to the evidence you compare against.
- **Ending with a list of problems** — nothing changes and the map is run again next quarter; fix: give every ranked moment an owner and a date.
- **Re-drawing the map instead of acting** — the artefact improves while the experience does not; fix: treat the map as finished once three moments are ranked.

## Go deeper

- **Laying out the journey** (`design-ux/journey-mapping/01-laying-out-the-journey`) — the map this reading depends on.
- **Journey Mapping** (`design-ux/journey-mapping`) — the track this chapter closes.
- **Service Design** (`design-ux/service-design`) — the backstage changes that fix a frontstage dip.
- **From findings to decisions** (`design-ux/user-research/04-from-findings-to-decisions`) — the same ranking and ownership discipline.
