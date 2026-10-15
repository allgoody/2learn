## Example 1 — Putting the four beats into a real week

A one-week iteration is starting and the calendar holds only build time. An iteration has four beats — decide, build, review with someone who can react, adjust — and the review is what makes the short cycle worth having. Fill in the week below so every beat has a slot and the review has a named participant.

```text
Mon  build: reporting export
Tue  build: reporting export
Wed  build: filters
Thu  build: filters
Fri  build: buffer
```

### Solution

```text
Day 1   decide: pick the smallest item worth shipping
Day 2-3 build: export, integrated and running
Day 4   review: show the running export to the analyst who asked
Day 5   adjust: change the backlog from what the analyst said
```

The review now sits inside the cycle with a person who can react, so adjust has an input rather than an opinion. The usual failure is a review with an audience that cannot change anything: a demo to peers produces praise, no information, and a short waterfall.

## Example 2 — Measuring how much of the plan survived

Two iterations have finished and the team wants to know whether the interruptions are normal. Measuring the plan's survival turns busyness into a number that points at a cause rather than at effort. From the records below, work out the survival rate and write one sentence naming what moved it.

```text
Iteration 12 — planned: filter panel, saved views, export fix
            — finished: filter panel, export fix
Iteration 13 — planned: saved views, export retry, empty states
            — finished: saved views, empty states
              (export retry moved on after an incident)
```

### Solution

```text
Survival: 7 of 9 planned items finished = about 78%.
What moved it: one incident in iteration 13 pulled the engineer off
the export retry for most of two days.

Finding: the items are the right size; the interruptions are the
missing capacity. Change: plan four items per cycle, not five, and
count unplanned work in the same record.
```

The rate comes from records rather than impressions, and the sentence separates a process cause from an effort cause. The usual mistake is reading a low rate as the team not trying: it almost always means the items are too large or the same people are being interrupted.
