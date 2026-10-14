---
title: Reviewing for clarity and tone
prereqs: ["cs-fundamentals/code-review/01-reading-a-diff-for-correctness"]
---

## What it is

The second half of review is communication: saying what you found in a way the author can act on, and judging which findings matter enough to hold up the merge. A review is a written artefact about someone's work, produced under time pressure, and its tone decides whether the author understands the point or defends themselves against it. Clarity and tone are not politeness for its own sake; they are what makes the review effective.

## Why it matters

A review that lists twenty equal-weight comments teaches the author nothing about priorities and slows the merge to a crawl. A review that reads as a personal judgement makes authors defensive, and defensive authors explain rather than fix. Both failures are common, and both are fixable with a few habits: separating blockers from suggestions, being specific about the code rather than the person, and keeping the diff small enough that a careful review is possible at all.

## Core ideas

### Separate blockers, suggestions and nitpicks

Say which is which, in the words. A blocker is something that must change before merging: a defect, a security problem, a broken contract. A suggestion is "I would have done it this way, consider it". A nitpick is trivia, and labelling it as such costs nothing and stops the author from treating it as an order. Without the labels, the reader assigns the highest urgency to everything.

```text
blocker: this write is not in the same transaction as the read above
suggestion: a value object for start/end would make the range check obvious
nit: typo in the docstring
```

### Be specific, and about the code

"Confusing" is not actionable; "I could not tell whether `total` includes tax — the name suggests it does not" is. Point at the line, describe what you expected and what you see, and leave the person out of it. This is also the fastest route to being wrong gracefully: a specific claim can be refuted with evidence, and the conversation moves forward.

```text
not: "this is bad naming"
yes: "`data` holds the parsed record, not the raw response — rename?"
```

### Small diffs are reviewed better

A large diff gets a shallower review than a small one, and every reviewer knows it. Breaking a change into a sequence of small, individually understandable pieces raises the quality of attention it receives and makes a bisect useful later. When asking for review, prefer several small changes over one large one, and say what order they should be read in.

```text
good: refactor (no behaviour change) -> then the behaviour change
bad:  one diff that does both, and a note saying which lines are which
```

### The author controls the quality of the review

Describe the intent, point out the parts you are unsure about, and self-review the diff before asking. A change presented with "I am not sure the retry loop is right" gets attention exactly there. A change dropped without context gets a style review. The reviewer is not a mind reader, and asking for scrutiny on a specific decision is not an admission of weakness.

### Receiving review without taking it personally

Assume the reviewer read the code carefully and wants the change to succeed. Answer the substance, ask for clarification where the comment is unclear, and say when you disagree and why. If a comment is a matter of taste, it is legitimate to say so and move on — but check whether the same point has come up twice before declaring it taste.

## Practice

### Label your next review

On your next review, put `blocker:`, `suggestion:` or `nit:` at the start of every comment, and make one pass that deletes everything that would not change the author's next hour.

Done when: the author can list your blockers in one line without rereading the thread, and you have removed at least one comment as noise.

### Split a change before requesting review

Take the next change you make and split it into a structural commit and a behavioural commit. Ask for the structural one first.

Done when: the structural diff contains no behaviour change, and you can say how much longer the review took as a result.

## Common mistakes

- **Listing every observation as equal** — the author cannot tell what must change; fix: label blocker, suggestion and nit.
- **Commenting on the person rather than the line** — the discussion turns defensive and the defect goes unfixed; fix: name the location, the expectation and the observation.
- **Requesting review of a huge diff** — the review becomes a skim and real defects slip through; fix: split by concern and state the reading order.
- **Silently rewriting the author's branch** — the author learns nothing and loses ownership; fix: comment, or pair on the change.
- **Treating every preference as a requirement** — the codebase absorbs the reviewer's taste rather than a standard; fix: reserve blockers for defects and agreed conventions.

## Go deeper

- **Reading a diff for correctness** (`cs-fundamentals/code-review/01-reading-a-diff-for-correctness`) — what to look for before deciding what to say, so read it first.
- **Clean Code** (`cs-fundamentals/clean-code`) — the shared standard that makes a style comment unnecessary.
- **Refactoring** (`cs-fundamentals/refactoring`) — how to keep structural and behavioural changes apart, which is what makes a diff reviewable.
