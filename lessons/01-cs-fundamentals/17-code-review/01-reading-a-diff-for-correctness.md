---
title: Reading a diff for correctness
prereqs: ["01-cs-fundamentals/08-clean-code"]
---

## What it is

Reviewing for correctness is the practice of finding the ways a change can be wrong before it merges. It means reading the diff as a change to a running system rather than as a document: what does this do at the boundaries, on the failure path, when two of these run at once, and to the data it touches. The output is a few specific findings, not a verdict on the author.

## Why it matters

Most defects that reach production are not subtle. They are a missing null check, an error swallowed to keep the loop going, an off-by-one in an exclusive range, a write not transactional with the read before it — all visible in the diff to a reader looking for them. What stops them being found is reviewing for style first and running out of attention before the risky parts, or reading the change in fragments.

## Core ideas

### Understand the intent before the code

Read the description, the ticket and the commit message first, and form one sentence of your own: what should this change do? Everything afterwards is a comparison against that sentence. Without it you judge the code against your idea of it, which is how style debates start.

```text
intent: "reject duplicate emails at signup"
then:   does the check run before the insert, and does it hold under two requests?
```

### Read the whole change before commenting

Read to the end, then comment. A finding you raise on line 10 is often answered by line 90, and a review that comments on fragments reads as a pile of unrelated objections. A single coherent pass also lets you see the shape of the change: is this one idea, or three that should have been three diffs?

### Hunt the classes of change where defects live

Certain kinds of change are disproportionately risky, and hunting them directly is more effective than reading line by line with equal attention. Boundaries between systems, error handling, data writes, concurrency and anything to do with permissions are where the majority of real defects sit.

```text
- boundary: empty, zero, one, max, negative, unicode, very long
- error path: can it fail, and what happens then
- data: what is written, in what order, and is it recoverable
- concurrency: what happens if two of these run at once
- security: who is allowed to do this, and is that checked here
```

### Treat the tests as part of the change

Tests that came with the change tell you what the author believes the change does, which is often more revealing than the production code. Ask whether a test would fail if the change were reverted, whether the edge cases are covered, and whether any test asserts an implementation detail that will break on the next refactor. A change with no tests is a question to raise, not automatically a blocker.

### Ask rather than assert

"I think this loses the error cause — is that intended?" is answered; "this swallows exceptions" invites a defence. Questions also acknowledge that you may be missing context, which keeps the discussion on the code. When you are certain, say so plainly and explain the consequence — certainty is useful when it is specific.

## Practice

### Build a review checklist

Take a change you reviewed recently and go through it again against a written checklist. Then apply that checklist to the next diff you review.

```text
[ ] I can state the intent in one sentence
[ ] the diff does one thing
[ ] boundary inputs: empty, one, max, negative, unexpected type
[ ] every error path either handles or propagates with context
[ ] no failure is silently swallowed
[ ] writes are ordered and recoverable, and reads-then-writes are not racy
[ ] permissions checked where the operation happens
[ ] public behaviour changed deliberately, and callers updated
[ ] tests fail if the change is reverted
[ ] the edge cases in the checklist above have a test
```

Done when: the checklist finds at least one thing you missed the first time, and you have added or removed a line because a real codebase taught you something.

### Follow one change end to end

Pick a recent merge and trace its behaviour through the system: the caller, the storage, the failure path. Do not read for style at all.

Done when: you can describe what happens when the new code fails halfway and whether anything is left inconsistent.

## Common mistakes

- **Reviewing for style while defects hide further down** — attention is spent where automated tooling is stronger; fix: read for correctness first, then let the linter handle format.
- **Commenting before finishing the diff** — half the objections are already answered below; fix: one full pass, then a single set of comments.
- **Approving because the tests pass** — the tests only cover what the author thought of; fix: check the risky classes of change directly.
- **Raising ten findings as equals** — a naming preference reads as seriously as a data-loss bug; fix: state which are blockers and which are optional.
- **Assuming you know what the code does without reading the caller** — context lives outside the diff; fix: open the file the change is called from before concluding.

## Go deeper

- **Clean Code** (`01-cs-fundamentals/08-clean-code`) — the readability bar a diff is judged against, so read it first.
- **Reviewing for clarity and tone** (`01-cs-fundamentals/17-code-review/02-reviewing-for-clarity-and-tone`) — how to say what you found so it gets acted on.
- **Debugging** (`01-cs-fundamentals/11-debugging`) — the systematic method that a good review applies to code that has not run yet.
