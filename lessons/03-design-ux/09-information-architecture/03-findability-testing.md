---
title: Findability testing
prereqs: ["03-design-ux/09-information-architecture/02-hierarchy-and-navigation"]
---

## What it is

Findability testing checks whether people can locate things in your structure without help. A participant is given a target in plain language — an object or a piece of information — and asked where they would look, or asked to find it in a prototype. You record the first place they look and whether they succeed.

## Why it matters

Structures look obvious to everyone who built them, and a debate about two candidate labels has no evidence until someone tries to use them. Findability testing is cheap — no working code, no design polish, often just a page of labels and links — and it converts an argument about taste into a count of first clicks. Run before launch, it is the last cheap moment; after launch, the same failure is discovered by users who leave quietly.

## Core ideas

### Write tasks as targets, not routes

"Find the last invoice for the Bristol account" is a target. "Go to Billing then Invoice history" is a route and tests your instructions instead of your structure.

```text
Good task: "You need the invoice for last month's order."
Bad task:  "Click Billing and find the invoice."
```

### Record the first click and the path

The first place a person looks is the strongest signal about the label and the grouping. Note it even when they eventually succeed — a correct answer after four guesses is a failure of structure.

```text
Task: find last month's invoice
P1 first click: "Your plan and bills"   success  2 clicks
P2 first click: "Your orders"           success  5 clicks  <- structure weak
P3 first click: "Help and support"      failed
```

### Use a rough prototype, not the finished design

Strip out visual design so the test measures the information architecture and not the styling. Grey boxes and text links are enough, and they make it obvious that you are testing structure.

### Reverse the test sometimes

Ask people to say what they expect to find under a category, then compare with what is there. The gaps found this way are often bigger than the misses found forwards.

### Act on the first-click rate, not on individual outcomes

If more than about a third of first clicks land in the wrong group, the label or the grouping is wrong for that target. Report the rate per task and fix the worst two before testing again.

## Practice

### Run a ten-task findability test

Write ten targets from your structure, run them with three people against a plain prototype, and record the first click, the path and the outcome for each.

Done when: you have a first-click rate per task and can name the two worst tasks.

### Fix and re-test the worst two

Change the label or the grouping for the two worst tasks, then run the same tasks with three new people.

Done when: the first-click rate for both tasks has improved, or you have written why the structure cannot support the task.

## Common mistakes

- **Giving the route instead of the target** — you test instruction-following rather than findability; fix: state what the person needs, not where to go.
- **Counting only success** — a five-click success hides a broken label; fix: record the first click as the primary measure.
- **Testing the visual design** — comments drift to colour and the structure is never judged; fix: use grey boxes and plain links.
- **Too few participants for a decision** — one person's path becomes a redesign; fix: three to five people per round and report rates.
- **Testing once before launch and never again** — new content erodes the structure; fix: re-run the worst tasks after every significant addition.

## Go deeper

- **Hierarchy and navigation** (`03-design-ux/09-information-architecture/02-hierarchy-and-navigation`) — the structure under test.
- **The hand-off to layout** (`03-design-ux/09-information-architecture/04-the-hand-off-to-layout`) — what to do once the structure passes.
- **Card Sorting** (`03-design-ux/26-card-sorting`) — the discovery method that precedes this test.
- **Usability Testing** (`03-design-ux/33-usability-testing`) — the wider session technique this borrows from.
