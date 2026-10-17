---
title: Reviewing for clarity and tone
prereqs: ["01-cs-fundamentals/17-code-review/01-reading-a-diff-for-correctness"]
---

## What it is

The second half of review is communication: saying what you found in a form the author can act on, and judging which findings matter enough to hold up the merge. A review is a written artefact about someone else's work, produced under time pressure, and its tone decides whether the author understands the point or defends against it. Clarity and tone are not politeness for its own sake; they are what makes the review work.

## Why it matters

A review that lists 20 equal-weight comments teaches the author nothing about priority and slows the merge to a crawl, because the author now has to rank 20 comments they did not write and cannot tell which 1 holds the merge. A review that reads as a personal judgement makes authors defensive, and a defensive author explains rather than fixes: the thread runs to 12 replies and the defect is still in the code at the end of it. Both failures are common and both are fixable with 3 habits — separating blockers from suggestions, naming the line and the value, and keeping the diff small enough that a careful review is possible at all. None of the 3 requires more time than the review you are already doing; they change where the time goes.

## Core ideas

### Separate blockers, suggestions and nitpicks

Say which is which, in words the author cannot misread. A blocker must change before the merge: a defect, a security hole, a broken contract. A suggestion is "I would have done it this way — consider it". A nit is trivia, and naming it as trivia costs nothing and stops the author treating it as an order. Without the 3 labels, an author reading 20 comments assigns the highest urgency to all 20, which is the same as assigning none.

```text
blocker: this write is not in the same transaction as the read above
suggestion: a value object for the range start and end would make the check obvious
nit: typo in the docstring
```

### Be specific, and about the code

"Confusing" is not actionable; "I could not tell whether `total` includes tax — the name says it does not, and on a 40.00 basket the two readings differ by 8.00" is actionable, because it names the line, the expectation and the value at stake. Keep the person out of the sentence: the subject is the code. A specific claim can also be refuted with evidence in 1 reply, which is the fastest way to be wrong gracefully.

```text
not: "this is bad naming"
yes: "`data` holds the parsed record, not the raw response — rename?"
```

### Small diffs are reviewed better

A large diff gets a shallower review than a small one, and the arithmetic says why. Give a reviewer 30 minutes for a 620-line diff and you have given them 30 * 60 = 1 800 seconds for 620 lines, which is 1 800 / 620 = 2.9 seconds per line — enough to skim, not enough to follow a failure path. Split the same work into a 600-line rename and a 20-line behaviour change and nearly all of the attention lands on the 20 lines that can be wrong, and a later bisect lands on a commit that means 1 thing.

```text
good: rename the module (600 lines, no behaviour change) -> then the rounding rule (20 lines)
bad:  both in one 620-line diff, with a note saying which lines are which
```

### The author controls the quality of the review

Describe the intent, point at the parts you are unsure of, and self-review the diff before asking. A change presented with "I am not sure the retry loop is right" gets attention on the retry loop; a change dropped with no context gets a style review. Naming the 3 lines you are unsure of costs 3 sentences and buys the scrutiny you actually need, and asking for it is not an admission of weakness.

```text
"the retry loop is the part I am unsure about: if all 3 attempts fail, the
caller still sees a charge — is that the contract we want?"
```

### Receiving review without taking it personally

Assume the reviewer read the code carefully and wants the change to succeed. Answer the substance, ask where a comment is unclear, and say when you disagree and why. If a comment is a matter of taste, it is fair to say so and move on — but check whether the same point has come up before you declare it taste, because a point raised 2 or 3 times is a convention nobody has written down yet.

```text
the same point raised 1 time                              -> taste; say so and move on
the same point raised 2 or 3 times by different reviewers -> a convention nobody wrote down
```

## Practice

### Label your next review

On your next review, put `blocker:`, `suggestion:` or `nit:` at the start of every comment, and make 1 pass that deletes every comment that would not change the author's next hour.

Done when: the author can list your blockers in one line without rereading the thread, and you have removed at least 1 comment as noise.

### Split a change before requesting review

Take the next change you make and split it into a structural commit and a behavioural commit. Ask for the structural one first.

Done when: the structural diff contains no behaviour change, and you can say how much longer the review took as a result.

## Common mistakes

- **Listing every observation as equal** — the author has to rank 20 comments they did not write and cannot tell which 1 holds the merge; fix: label each comment blocker, suggestion or nit.
- **Commenting on the person rather than the line** — the thread turns defensive and the defect survives 12 replies; fix: name the location, the expectation and the observation.
- **Requesting review of a huge diff** — 620 lines in 30 minutes is 1 800 / 620 = 2.9 seconds per line, so the review becomes a skim and real defects slip through; fix: split by concern and state the reading order.
- **Silently rewriting the author's branch** — the author learns nothing from the change and loses ownership of it; fix: comment, or pair on the change.
- **Treating every preference as a requirement** — the codebase absorbs 1 reviewer's taste rather than a shared standard; fix: reserve blockers for defects and agreed conventions.

## Go deeper

- **Reading a diff for correctness** (`01-cs-fundamentals/17-code-review/01-reading-a-diff-for-correctness`) — what to look for before deciding what to say, so read it first.
- **Clean Code** (`01-cs-fundamentals/08-clean-code`) — the shared standard that makes most style comments unnecessary.
- **Refactoring** (`01-cs-fundamentals/19-refactoring`) — how to keep structural and behavioural changes apart, which is what makes a diff reviewable.
