---
title: The daily workflow
prereqs: ["cs-fundamentals/git/01-the-object-model-and-history"]
---

## What it is

The daily workflow is the small set of operations you perform constantly: staging exactly what belongs in a commit, creating a branch for a piece of work, bringing your work together with someone else's, and undoing something. Each of these is a straightforward consequence of the object model. The commands matter far less than the decision each one expresses, which is why knowing why you run them makes them safe.

## Why it matters

Git is learned badly by most people, by copying commands from a search result at the moment of panic. That works until the situation differs slightly from the one in the answer, and then it destroys work. The commands here are the ones that appear in those panics — reset, revert, rebase, force push — and each has a precise meaning: which commits it moves, which files it changes, and whether anyone else notices. Knowing that turns a frightening tool into an ordinary one.

## Core ideas

### Staging chooses the snapshot

A commit is the contents of the index, not of your working tree. `git add` lets you decide what that snapshot contains, which is why committing everything at once is often a mistake: a commit mixing a refactor with a fix is hard to review and impossible to revert cleanly. Interactive staging lets you choose hunks, so one logical change becomes one commit.

```text
working tree: fix + rename + debug print
stage: the fix only, then commit
result: a commit that can be reviewed and reverted on its own
```

### A branch is a name you move

Creating a branch costs nothing, so use one for every piece of work: it keeps unfinished work off the main line and makes the change reviewable as a unit. `git switch` covers the ordinary case of changing branch; the older `checkout` does the same job among others, which is why the newer command reads more clearly.

```text
git switch -c fix/rounding    # start a line of work
git switch main               # abandon the context, not the work
```

### Merging joins two lines; fast-forwarding avoids a commit

Merging records that two lines of history came together. If the target has not moved, git moves the name forward — a fast-forward, leaving a linear history. If both sides moved, it creates a merge commit with two parents. That commit is not overhead: it records an integration point, and keeping it shows when a feature landed as a unit.

```text
A <- B <- C        (main)
     \    \
      D <- E <- M (feature merged into main)
```

### Rebasing rewrites commits, so it is for private history

`git rebase` replays your commits onto a new base, creating new commits with new hashes. On a branch only you have, that keeps history linear and readable. On a branch others have pulled, it replaces commits they already have, and their next pull duplicates work or needs a force push that discards someone else's changes. The rule: rebase what you have not shared; merge what you have.

```text
before: A <- B <- C (main)
                 \ D <- E (feature)
rebase onto main: A <- B <- C <- D' <- E'
```

### Undoing depends on what you actually want

These are different problems wearing similar names. Fixing the message or contents of the last, unpushed commit is an amend. Moving your branch back because the last commits were wrong and nobody has them is a reset. Undoing a commit others already have is a revert: a new commit that reverses the old one. Discarding changes in one file is a restore. Naming the problem first stops you reaching for the wrong tool.

```text
"wrong message, not pushed"        -> amend
"these three commits were a dead end" -> reset to the last good commit
"this shipped and is wrong"        -> revert the commit
"undo my edits to this file"       -> restore the file from the last commit
```

## Practice

### Split one working change into two commits

Make a change containing two unrelated edits. Stage and commit them separately, then inspect each commit's diff.

Done when: each commit reads as one idea on its own, and reverting either leaves the other intact.

### Undo three different ways

In a scratch repository, practise all three: amend the last message, reset the branch back two commits, and revert a commit already on the main branch.

Done when: you can state for each case which commits moved, which files changed, and whether another clone would notice.

## Common mistakes

- **Committing everything with one message** — every unrelated change becomes permanently entangled; fix: stage the one logical change and commit it alone.
- **Rebasing a branch other people have pulled** — their commits are replaced and history diverges; fix: merge shared branches instead, and rebase only your own work.
- **Using a reset to undo something already published** — colleagues' clones keep the old commits and the next push reintroduces them; fix: revert instead.
- **Resolving a conflict by taking one side wholesale** — the other side's intent silently disappears; fix: read all three versions and merge the meaning.
- **Force-pushing without checking what will be lost** — someone else's commits are discarded on the remote; fix: inspect the difference first, and prefer a force that fails if the remote moved.

## Go deeper

- **The object model and history** (`cs-fundamentals/git/01-the-object-model-and-history`) — what these commands are actually moving, so read it first.
- **Git Branching Strategies** (`cs-fundamentals/git-branching-strategies`) — what a team decides about branches, once the mechanics are second nature.
- **GitHub** (`cs-fundamentals/github`) — where the commits you stage and push become a shared pull request.
