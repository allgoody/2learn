---
title: Documenting decisions
prereqs: ["cs-fundamentals/software-architecture/03-deployment-shape"]
---

## What it is

An architecture decision record is a short document that captures one decision: the situation that forced it, the options that were considered, what was chosen, and what the choice costs. It is written when the decision is made, kept next to the code, and never edited afterwards — if the decision changes, a new record supersedes the old one. The point is to preserve the reasoning, not to describe the system.

## Why it matters

The question that wastes the most time in a mature codebase is "why is it like this?" A design that looks obviously wrong often encodes a constraint that no longer appears anywhere: a latency budget, a compliance rule, a library that had a defect. Without a record, the choice gets re-litigated every time someone new joins, or worse, gets undone because the constraint was invisible. Writing it down costs twenty minutes and saves that meeting repeatedly.

## Core ideas

### Record decisions, not descriptions

A diagram of the current system is out of date the moment it is drawn, and it is not what readers lack. What readers cannot reconstruct is the weighing of alternatives: why this database and not the other, why this boundary and not a simpler one. Decision records target exactly that, which is why they stay useful for years while architecture diagrams do not.

```text
context -> options -> decision -> consequences
```

### Keep it short and specific

One page is enough. State the situation in a few sentences, list two or three real options with their costs, name the one chosen, and write down what it makes harder. A record that runs to several pages will not be read or maintained, and a decision whose alternatives are not listed cannot be evaluated later.

```text
title: Synchronous calls for order lookups
context: pricing needs the customer tier at checkout time
options: sync HTTP (simple, adds a failure mode), cached copy (fast, may be stale)
decision: sync HTTP with a 200ms timeout and a fallback tier
consequences: checkout fails open to a default tier; cache can be added later
```

### Supersede, never rewrite

Editing an old record to match today's reality destroys the only evidence of why the earlier choice was made, which is usually the part that matters. Write a new record that references the old one and explains what changed. The history of decisions is itself the explanation for why the system has the shape it has.

### Keep records where the code is

A decision stored in a wiki nobody visits, or in a chat thread, is effectively lost. Records belong in the repository, in a directory for them, referenced from the code they affect. The practical test: someone reading the module should be able to find the reasoning without asking a person.

### Not every choice needs a record

Record decisions that are expensive to reverse, that others will question, or that look wrong without context. Do not record the choice of a logging library or a folder name. The value of the practice comes from the records being worth reading, so a directory full of trivia is worse than a small one that is actually consulted.

## Practice

### Write one record for a past decision

Choose a decision already made in your system that a newcomer would question. Write the record now, from memory, with the context, the options and the consequences.

Done when: you can hand it to someone who was not there and they can explain why the alternative was rejected.

### Test the discoverability

Take an existing decision record and try to reach it from the code it affects, using only the repository.

Done when: a reader arriving at the module can find the record without being told the path.

## Common mistakes

- **Writing a system description instead of a decision** — it dates immediately and answers a question nobody asked; fix: record one choice, its alternatives and its consequences.
- **Editing a record when the decision changes** — the original reasoning is lost and the history cannot be reconstructed; fix: add a new record that supersedes the old one.
- **Listing no alternatives** — the reader cannot tell whether the options were considered; fix: write down at least one rejected option with the reason.
- **Storing records outside the repository** — they drift from the code and stop being found; fix: keep them beside the code and link from the module.
- **Recording every trivial choice** — the useful records are buried among the noise; fix: reserve records for decisions that are expensive to reverse or surprising.

## Go deeper

- **Deployment shape** (`cs-fundamentals/software-architecture/03-deployment-shape`) — the decision most often re-litigated without a record, so read it first.
- **Boundaries and coupling** (`cs-fundamentals/software-architecture/01-boundaries-and-coupling`) — the other long-lived choice whose reasoning needs to survive.
- **Code Review** (`cs-fundamentals/code-review`) — where a missing record usually shows up, as a reviewer asking why the code is shaped this way.
