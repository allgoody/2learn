---
title: Documenting decisions
prereqs: ["01-cs-fundamentals/25-software-architecture/03-deployment-shape"]
---

## What it is

An architecture decision record is a short document about one decision: the situation that forced it, the options that were considered, what was chosen, and what the choice costs. It is written when the decision is made, kept beside the code, and never edited afterwards — if the decision changes, a new record supersedes the old one. What it preserves is the reasoning, not the system.

## Why it matters

The question that wastes the most time in a mature codebase is "why is it like this?" A design that looks obviously wrong often encodes a constraint that appears nowhere in the code: a latency budget, a compliance rule, a library that had a defect two years ago and was replaced. Without a record, the choice is re-litigated whenever someone new joins, and undoing it is expensive in proportion to how far it spread — a boundary that 12 files cross is 12 files to move back. Writing the record costs about 20 minutes once, and it removes that meeting from every newcomer's first month.

## Core ideas

### Record decisions, not descriptions

A diagram of the current system is out of date the moment it is drawn, and it is not what readers lack — they can read the code. What they cannot reconstruct is the weighing of alternatives: why this database and not the other, why this boundary and not a simpler one. A decision record targets exactly that, which is why it stays true for years while a description does not.

```text
docs/architecture.md, written 2 years ago and never edited
  services it names: 3
  services today:    5
  statements that no longer match the system:
    the count of services:  3, and there are 5
    the shared cache:       removed
    the queue:              added, and the page does not mention it
  a reader who trusts the page is wrong 3 times, and it must be rewritten to
  be useful again

docs/decisions/0007-sync-order-lookups.md, written once
  context:      pricing needs the customer tier at checkout time
  options:      a sync call (simple, adds a failure mode); a cached copy (fast, may be stale)
  decision:     a sync call with a 200 ms timeout, 200 ms being 200 milliseconds, and a fallback tier
  consequences: checkout falls back to a default tier; a cache can be added later
  every statement here is about the day it was written, so none of them expire
```

### Keep it short and specific

One page is enough. State the situation in a few sentences, list two or three real options with their costs, name the one chosen, and write down what it makes harder. A record that runs to several pages is neither read nor maintained, and a decision whose alternatives are not listed cannot be evaluated later.

```text
a useful record, measured in words
  context:        60
  options:        2 options * 40 = 80
  decision:       30
  consequences:   40
  total:          60 + 80 + 30 + 40 = 210 words, about half a page

a description of the system instead
  sections:   services, data, deployment, security, roadmap      5
  length:     12 pages * 250 words = 3 000 words
  reading speed assumed: 200 words a minute
  time to read: 3 000 / 200 = 15 minutes
  time to bring up to date after the next release: 15 minutes again,
  and releases come every 2 weeks
```

The 210-word record answers one question completely. The 3 000-word description answers five questions partially, and starts decaying on the first day of the fortnight.

### Supersede, never rewrite

Editing an old record to match today's reality destroys the only evidence of why the earlier choice was made, which is usually the part that matters. Write a new record that names the old one and explains what changed. The history of decisions is itself the explanation for why the system has the shape it has.

```text
0003-use-redis-for-sessions.md      written once, never edited
0011-sessions-in-the-database.md    supersedes 0003

what an edit in place would destroy
  documents holding the reason Redis was chosen:                    1
  documents holding the reason it was left, a Redis cluster the
  team could not operate overnight:                                 1
  after rewriting 0003: 0 documents holding either reason

what recording it costs
  documents: 2, so the next reader sees why Redis was chosen and why it was left
  the proposal to return to Redis, raised again about 6 months later,
  is answered by reading 0011 rather than by another meeting
```

### Keep records where the code is

A decision stored in a wiki nobody visits, or in a chat thread, is effectively lost. Records belong in the repository, in a directory for them, referenced from the code they affect. The test is the reader's: can the person working on this module find the reasoning without asking a person?

```text
module orders/order.ts, 1 reader, 1 question: why is this call synchronous?

the record beside the code
  path:              docs/decisions/0007-sync-order-lookups.md
  hops from the module: 1, through a comment in order.ts that names the file
  people who must be asked: 0

the record in a wiki
  hops from the module: 0, because nothing in the repository links to it
  people who must be asked: at least 1, for an answer on the order of
  "something about checkout latency in 2023", which is 0% of the reason
```

### Not every choice needs a record

Record decisions that are expensive to reverse, that others will question, or that look wrong without context. Do not record the choice of a logging library or the name of a folder. The value of the practice comes from the records being worth reading, so a directory full of trivia is worse than a small one that is actually consulted.

```text
choices made in one week: 40
  expensive to reverse:                2   the schema split, the auth boundary
  questioned by others, cheap to undo: 1   the retry policy
  routine:                             37   library versions, folder names, log formats
  2 + 1 + 37 = 40, so nothing is missing

if all 40 are recorded
  the records that matter are 2 / 40 = 1 in 20 of the directory
  a reader hunting the schema split reads about 20 records to find 1
if only the 2 are recorded
  every record in the directory is one of the 2 that matter
  the retry policy stays where it belongs, as a comment in the code it shapes
```

## Practice

### Write one record for a past decision

Choose a decision already made in your system that a newcomer would question. Write the record now, from memory, in 4 parts — context, options, decision, consequences — with at least 1 rejected option and the reason it lost.

Done when: you can hand the record to someone who was not there and they explain why the alternative was rejected, in their own words, without asking you anything.

### Test the discoverability

Take an existing decision record and try to reach it from the code it affects, using only the repository: start at the module and follow what is there.

Done when: a reader arriving at the module reaches the record in 1 hop, or you have added the link that makes it 1, and the number of hops is written down.

## Common mistakes

- **Writing a system description instead of a decision** — it names the 3 services of the day and there are 5 now, so every reader starts by being wrong; fix: record 1 choice, its alternatives and its consequences.
- **Editing a record when the decision changes** — the original reasoning is lost, and the question it answered has 0 documents left to answer it; fix: add a new record that supersedes the old one.
- **Listing no alternatives** — the reader cannot tell whether the rejected option was considered or simply unknown, so the decision is re-opened; fix: write down at least 1 rejected option and the reason it lost.
- **Storing records outside the repository** — nothing in the code links to them, so a reader at the module needs 1 conversation to learn why it looks this way; fix: keep the records beside the code and link from the module.
- **Recording every trivial choice** — the 2 records that matter become 1 in 20 of the directory and readers stop reading it; fix: reserve records for decisions that are expensive to reverse or surprising.

## Go deeper

- **Deployment shape** (`01-cs-fundamentals/25-software-architecture/03-deployment-shape`) — the decision most often re-litigated without a record, so read it first.
- **Boundaries and coupling** (`01-cs-fundamentals/25-software-architecture/01-boundaries-and-coupling`) — the other long-lived choice whose reasoning has to outlast the people who made it.
- **Code Review** (`01-cs-fundamentals/17-code-review`) — where a missing record usually shows up, as a reviewer asking why the code is shaped this way.
