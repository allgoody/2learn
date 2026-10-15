## Example 1 — A document that earns its keep

The kick-off list below is still produced on every project, though nobody has asked whether anyone reads it. Working software is the measure of progress, so the artefact should be whatever communicates. Replace each item with the smallest thing that still carries the information, and name who reads it twice.

```text
Deliverables agreed at kick-off
  requirements document, 40 pages, edited once
  architecture PDF, reviewed in one meeting
  status report at the end of every sprint
  user guide, written before the first release
```

### Solution

```text
Artefact            Replaces            Read twice by
acceptance tests    requirements doc    engineers, on every change
decision record     architecture PDF    whoever opens the module next
deployed increment  the status report   stakeholders, at the review
one-page summary    the user guide      support, answering tickets
```

The test is whether anyone reads the artefact twice, not whether it exists. The usual failure is over-correcting: "over documentation" is read as "no documentation", so the decision records go too and the next joiner cannot learn why the module is shaped as it is.

## Example 2 — An estimate is a commitment only if you say so

A release note treats the planned date as agreed. A plan is a forecast, and a forecast nobody revises is evidence that nothing is being learned. Rewrite the line so the date reads as a forecast, the change is recorded, and the reader knows what would make it a commitment.

```text
Status: on track. Team committed to ship reporting on 14 March as
agreed in the plan. No changes to the plan.
```

### Solution

```text
Forecast, revised 2 March: reporting is now likely by 21 March.
Moved from 14 March because the export format changed after the data
review; two days of that is the schema, one is retesting.
Commitment: none yet. Say so if you need that decision and we will
take it together.
```

The line says which number is a forecast and names the learning that moved it, so revising the plan reads as the process working. The common mistake is hiding a revision as a failure, after which the team stops reporting what it learns.
