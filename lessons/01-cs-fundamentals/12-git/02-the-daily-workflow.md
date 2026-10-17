---
title: The daily workflow
prereqs: ["01-cs-fundamentals/12-git/01-the-object-model-and-history"]
---

## What it is

The daily workflow is the small set of operations you perform constantly: staging exactly what belongs in a commit, creating a branch for one piece of work, bringing your work together with someone else's, and undoing something. Each of them moves one of four objects or one ref, and nothing else, so each is a consequence of the object model rather than a spell to memorise. The commands matter far less than the decision each one expresses.

## Why it matters

Git is learned badly by most people, by copying a command from a search result at the moment of panic. That works until the situation differs slightly from the one in the answer, and then it destroys work: `git reset --hard HEAD~3` on a branch already pulled by 4 teammates moves 1 ref 3 commits backwards and leaves 3 commits named by no ref, so their next push brings all 3 back and the reset appears to have undone nothing. The commands below are the ones that appear in those panics — reset, revert, rebase, force push — and each has a precise meaning: which commits move, which of the project's 1 000 files change, and whether any other clone notices.

## Core ideas

### Staging chooses the snapshot

A commit holds the contents of the index, not of your working tree, so `git add` decides what the snapshot contains. Committing the whole working tree is therefore often a mistake: a commit mixing a fix with a rename changes 2 unrelated groups of files, so reverting the fix also reverts the rename or not at all. Interactive staging lets you pick hunks, and one hunk is one contiguous run of changed lines in a file's diff.

```text
git status --short
 M src/price/round.ts    the fix
 M src/price/index.ts    a rename
 M src/cart.ts           a debug print
3 files modified in the working tree, 0 staged

git add src/price/round.ts
  the index now differs from HEAD in 1 file
git commit -m "fix: round half-pence up in price totals"
  1 commit whose tree differs from its parent in 1 file
  the other 2 files are still modified in the working tree, uncommitted

git add -p src/cart.ts    a 6-line change can be 2 hunks:
  hunk 1 the debug print       answer n, leave it unstaged
  hunk 2 the intended edit     answer y, stage it
```

Reverting that commit touches 1 file and leaves the rename intact, which is the whole point of splitting.

### A branch is a name you move

Creating a branch costs one ref file: 40 hex characters plus a newline, 41 bytes, naming a commit that is already in the store — no file content is copied. Use one for every piece of work, so unfinished work stays off the main line and the change can be reviewed, or thrown away, as a unit. `git switch` covers the ordinary case of changing branch; the older `checkout` does the same job among others, which is why the newer command reads more clearly.

```text
git switch -c fix/rounding
  writes .git/refs/heads/fix/rounding, 41 bytes
  copies 0 files, moves 0 commits

git switch main
  writes .git/HEAD, 21 bytes: "ref: refs/heads/main" plus a newline
  the branch fix/rounding still names its commit; the work is not lost
```

### Merging joins two lines; fast-forwarding writes no commit

Merging records that two lines of history came together. If the branch you are on has not moved since the other one started, git moves the name forward — a fast-forward — and writes 0 new commits. If both lines moved, git writes 1 merge commit with 2 parents, built by comparing 3 trees: the merge base where the lines last agreed, your tip and the other tip.

```text
main:     A <- B <- C
feature:       \
                D <- E        branched from B, 2 commits of its own

fast-forward, main still at C:  main = E
  0 new commits, 0 tree comparisons, D and E untouched

both sides moved, main reached F:
  C <- F  (main)          F is 1 commit beyond the merge base B
  D <- E  (feature)       E is 2 commits beyond B
  git merge feature writes M, 1 commit with parents F and E
  M's tree comes from 3 trees: base B, ours F, theirs E
  a conflict is reported per file, so 1 file in disagreement is 1 conflict to resolve
```

That merge commit is not overhead: it marks where the feature landed as a unit, and it is the only place the 2-parent fact is recorded.

### Rebasing rewrites commits, so keep it to private history

`git rebase` copies your commits onto a new base, one new commit object per old one, each with a new 40-character name because its content now names a different parent. On a branch only you hold, that keeps the line straight and readable. On a branch others have pulled, it replaces 2 objects they already have, and their next pull sees 2 diverged versions of the same 2 changes: reconciling them duplicates the work, and force-pushing discards whichever side loses.

```text
before:  A <- B <- C            (main)
                    \
                     D <- E     (feature, 2 commits since C)

git rebase main, run on feature
  2 commits copied onto C, giving D' and E' with 2 new names
  feature names E'; the branch moved, and it is still 1 ref
  2 old commits stay in the store, unreachable, until the reflog entries expire
  main is untouched: 0 of its commits are copied

colleague had pulled D and E
  their clone names D; your branch now names D'
  the remote has to lose one of the 2 lines, which is why force push is the price
```

The rule follows: rebase what you have not shared, merge what you have.

### Undoing depends on what you actually want

These are different problems wearing similar names, and the difference is always which commits move and how many clones notice.

```text
amended message, not pushed
  git commit --amend          1 commit replaced by 1 new commit with a new name
                              the old commit becomes unreachable
reset a local dead end
  git reset --hard HEAD~3     the branch ref moves back 3 commits
                              3 commits become unreachable, 0 files on disk are touched
                              every other clone is unaffected, because no ref they hold changed
undo a published commit
  git revert 9d8e7f           +1 commit whose diff reverses commit 9d8e7f
                              every clone pulls it and converges, 0 history rewritten
discard edits to one file
  git restore src/cart.ts     1 file rewritten from the index, 0 commits touched
```

Naming the problem first — how many commits, whose clones, history or files — stops you reaching for the wrong tool.

## Practice

### Split one working change into two commits

Make a change containing two unrelated edits. Stage and commit them separately, then inspect each commit's diff.

Done when: `git show --stat` prints 1 file for each of the 2 commits, and reverting either one leaves the other intact.

### Undo three different ways

In a scratch repository, practise all three: amend the last message, reset the branch back 2 commits, and revert a commit already on the main branch.

Done when: you can state for each case how many commits moved (1 for the amend, 2 for the reset, 0 for the revert), whether the old commit is still reachable by hash, and whether another clone would notice.

## Common mistakes

- **Committing everything with one message** — a 3-file working tree becomes 1 commit with 3 unrelated changes, so reverting the fix also reverts the rename; fix: stage the 1 logical change and commit it alone.
- **Rebasing a branch other people have pulled** — their 2 commits are replaced by 2 commits with different names and the lines diverge; fix: merge shared branches instead, and rebase only your own work.
- **Using a reset to undo something already published** — one colleague's clone still names the 3 old commits, and the next push reintroduces all 3; fix: revert instead, adding 1 commit that every clone can pull.
- **Resolving a conflict by taking one side wholesale** — the change the other side made to the same file silently disappears, and the merge still reports success; fix: read all 3 versions — the base, ours and theirs — and merge the meaning.
- **Force-pushing without checking what will be lost** — the remote ref moves and every commit that only it named becomes unreachable; fix: fetch first and compare the 2 lines, then prefer a force that fails if the remote moved.

## Go deeper

- **The object model and history** (`01-cs-fundamentals/12-git/01-the-object-model-and-history`) — what these commands are actually moving, so read it first.
- **Git Branching Strategies** (`01-cs-fundamentals/22-git-branching-strategies`) — what a team decides about branches, once the mechanics are second nature.
- **GitHub** (`01-cs-fundamentals/23-github`) — where the commits you stage and push become a shared pull request.
