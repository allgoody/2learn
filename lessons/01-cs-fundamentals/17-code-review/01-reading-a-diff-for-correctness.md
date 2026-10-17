---
title: Reading a diff for correctness
prereqs: ["01-cs-fundamentals/08-clean-code"]
---

## What it is

Reviewing for correctness is the practice of finding the ways a change can be wrong before it merges. It means reading the diff as a change to a running system rather than as a document: what does this do at the boundary values, on the failure path, when two of these run at once, and to the data it writes. The output is a few findings, each naming a line, its consequence and a value to check; a review that produces 3 findings with values in them has done its job, and one that produces 10 lines of preference has not.

## Why it matters

Most defects that reach production are not subtle. They are a missing null check, an error swallowed to keep a loop of 10 000 iterations going, a range written inclusive where it should have been exclusive, a write not in the same transaction as the read before it — all of them visible in the diff to a reader who is looking for them. The off-by-one is the small version of the class: a range written `0 <= i < length` visits `length` items, and the same range written `0 <= i <= length` visits `length + 1`, so with `length = 10` it reads index 10 of a 10-item list that holds indexes 0 to 9. What stops those defects being found is not the difficulty of seeing them but the order of attention: naming first, a 300-line diff read in fragments, and by the time the reviewer reaches the failure path there is nothing left to spend. Name the classes of change where defects live and check those first, and the same diff yields its findings in one pass.

## Core ideas

### Understand the intent before the code

Read the description, the ticket and the commit message first, and write 1 sentence of your own: what should this change do? Everything after that is a comparison against your sentence, which is the point — judged against the author's claim, the code gets a fair reading. Skip the step and you judge the code against your guess, which is how a diff that is right gets argued about for 90 lines.

```text
intent: "reject duplicate emails at signup"
then:   does the check run before the insert, and does it hold when 2 signups
        arrive in the same second? Both SELECT find 0 rows and both INSERT,
        so the unique index is the only thing between 1 address and 2 accounts.
```

### Read the whole change before commenting

Read to the end, then comment. A finding raised on line 10 of a 300-line diff is often answered by line 90, and a review that comments on fragments reads as 10 unrelated objections rather than 1 response. A single pass also shows you the shape of the change: 300 lines that rename a module across 11 files are 1 idea, and 300 lines that rename the module and change a rounding rule are 2 ideas wearing one diff.

```text
300 lines, 11 files, rename only              1 idea   -> review it in one pass
300 lines, 11 files, rename + rounding rule   2 ideas  -> ask for 2 diffs
```

### Hunt the classes of change where defects live

Some kinds of change carry more risk than others, so hunting those classes directly beats giving every line equal attention. A diff is risky where it meets a boundary, handles an error, writes data, runs concurrently or checks permission, and each of those classes reduces to a short question with a value you can try.

```text
class        question                                      value to try
boundary     what do the first and the last one do?        0 items, 1 item, the largest allowed
error path   can it fail here, and who finds out?          the call that throws on attempt 3 of 3
data         what is written, and in what order?           balance 100.00 -> debit 30.00 -> 70.00
concurrency  what if 2 of these run at once?               both read 100.00, both write 70.00, correct is 40.00
permission   who may do this, and is it checked here?      user 7 reads user 8's order
```

"The largest allowed" is a value the type decides: a count kept in 1 byte runs from 0 to 2^8 - 1 = 256 - 1 = 255, so 256 is the boundary that breaks it.

### Treat the tests as part of the change

The tests that come with a change tell you what the author believes it does, and that is often more revealing than the production code. Ask whether a test would fail if the change were reverted, whether the boundary values above have a case each, and whether any test asserts an implementation detail that will break on the next rename. A change with no tests is a question to raise rather than automatically a blocker: a 3-line configuration change may need 0 new tests, while a new error branch needs 1 that triggers it.

```text
new error branch, 1 test   -> reverting the branch turns that test red
new error branch, 0 tests  -> reverting it changes nothing; the suite stays green
```

### Ask rather than assert

"I think this loses the error cause — is that intended?" gets an answer; "this swallows exceptions" invites a defence. A question also says that you may be missing context, which keeps the discussion on the code rather than on the two of you. When you are certain, be plain and give the consequence with its value: "on attempt 3 of 3 this returns `{ status: "pending" }`, so the caller marks an order paid that was never charged" is a claim the author can check in one read, and can either fix or refute.

```text
assertion: "this swallows exceptions"           answers who, not what happens
question:  "does the caller see this error?"    answers with the value the caller gets
```

## Practice

### Build a review checklist

Take a change you reviewed recently and go through it again against a written checklist of the classes above. Then apply that checklist to the next diff you review.

```text
[ ] I can state the intent in one sentence
[ ] the diff does one thing
[ ] boundary inputs: 0 items, 1 item, the largest allowed (255 in a one-byte count), a negative number, an unexpected type
[ ] every error path either handles the failure or propagates it with context
[ ] no failure is silently swallowed
[ ] writes are ordered and recoverable; a read followed by a write is not racy
[ ] permissions are checked where the operation happens
[ ] each public behaviour change is deliberate, and its callers are updated
[ ] reverting the change makes at least 1 test fail
[ ] every value in the boundary line above has a test
```

Done when: the checklist finds at least 1 thing you missed on the first reading, and you have added or removed 1 line because a real codebase taught you something.

### Follow one change end to end

Pick a recent merge and trace its behaviour through the system: the caller, the storage, the failure path. Do not read for style at all.

Done when: you can describe what happens when the new code fails halfway — say the 2nd of its 3 writes fails — and whether anything is left inconsistent.

## Common mistakes

- **Reviewing for style while defects hide further down** — the formatter and the linter already check layout, so a spacing comment spends attention where the tooling is stronger; fix: read for correctness first, then let the linter handle format.
- **Commenting before finishing the diff** — half the objections are already answered 200 lines below the line you are on; fix: one full pass, then a single set of comments.
- **Approving because the tests pass** — the suite covers only the values the author thought of, so 0 items, 1 item and the largest allowed go untested; fix: check the risky classes of change directly.
- **Raising ten findings as equals** — a naming preference reads as seriously as a data-loss bug, and the author must guess which of the 10 holds the merge; fix: state which are blockers and which are optional.
- **Assuming you know what the code does without reading the caller** — the diff shows 1 changed function and hides its 6 call sites, which is where the wrong return value lands; fix: open the file the change is called from before concluding.

## Go deeper

- **Clean Code** (`01-cs-fundamentals/08-clean-code`) — the readability bar a diff is judged against, so read it first and get the style question out of the way.
- **Reviewing for clarity and tone** (`01-cs-fundamentals/17-code-review/02-reviewing-for-clarity-and-tone`) — how to say what you found so that it gets acted on.
- **Debugging** (`01-cs-fundamentals/11-debugging`) — the systematic method that a good review applies to code that has not run yet.
