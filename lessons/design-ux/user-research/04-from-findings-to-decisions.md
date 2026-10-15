---
title: From findings to decisions
prereqs: ["design-ux/user-research/03-running-a-session"]
---

## What it is

Turning research into decisions means compressing sessions of notes into a small number of findings, each tied to evidence, and then attaching a change and an owner to each. It is the stage where research either pays for itself or becomes an interesting document nobody acts on.

## Why it matters

Research that ends in a report changes nothing: the report is read once and the next sprint continues as before. The value appears only when a finding becomes a line item someone owns. This stage is also where the team without the researcher present gets convinced — a finding shown with two quotes and a short clip is far harder to argue with than a summary paragraph.

## Core ideas

### Work from evidence to finding, not the reverse

Group the raw observations first, then name what the group means. If you start from a finding and look for quotes, you will find them whether or not they represent the sessions.

```text
Observations (14 from 6 sessions):
 "scrolled past search three times"      x5
 "used the recent tab before searching"  x6
 "asked a colleague for the order number" x3
Finding: people reach the last order by browsing, not searching.
```

### Keep the count and the words

Report how many participants did something and show at least one verbatim quote. "Several users" cannot be checked; "five of six did X" can, and it survives the meeting where somebody disagrees.

### Rank by frequency times severity

Two axes: how often it happened, and how much it cost when it did. A rare, total block outranks a frequent mild annoyance. Write the ranking down so it can be argued with.

```text
1 payment failure, no recovery path   rare x total block    -> fix now
2 address field asks for company no.  common x 40s detour   -> fix soon
3 label wording on the second button  common x mild         -> fix if cheap
```

### Turn each finding into a change with an owner

A finding is not actionable until it names what will change and who will do it. "Improve onboarding" is not a change; "make the phone number optional and re-run the test next month, owner: Maya" is.

### Present it in the room the work is decided

Show the findings where priorities are set, not in a separate readout. Bring one clip, one quote and the count.

## Practice

### Cluster one study's notes

Take the notes from one study — at least five sessions. Write every observation on a separate line, group them, and name each group in the participants' words.

Done when: every finding has a count, one verbatim quote, and at least one observation that contradicts it noted beneath.

### Write the decision table

For each finding, write the change, the owner and the date, and rank the rows by frequency times severity.

Done when: the table has no row whose change is a verb, and no row without a named owner and date.

## Common mistakes

- **A report instead of a change** — the document is filed and the product is untouched; fix: attach a change, an owner and a date to every finding.
- **Losing the count** — findings cannot be checked and get argued away; fix: report how many of how many, and quote at least one participant.
- **Cherry-picking quotes** — the evidence is selected to fit a preferred answer; fix: cluster first, name second, and note contradictory observations.
- **Ranking by loudness** — the last stakeholder to speak sets the priority; fix: rank by frequency times severity before the meeting.
- **Presenting to the wrong room** — the people who decide priorities are absent; fix: take the findings to the planning session, not a separate review.

## Go deeper

- **Running a session** (`design-ux/user-research/03-running-a-session`) — the notes this stage works from.
- **User Research** (`design-ux/user-research`) — the track this closing stage completes.
- **Journey Mapping** (`design-ux/journey-mapping`) — a shared artefact to hang the findings on.
- **Lean UX** (`design-ux/lean-ux`) — how the decisions become the next cycle's hypothesis.
