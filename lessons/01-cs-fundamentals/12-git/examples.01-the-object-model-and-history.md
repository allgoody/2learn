## Example 1 — A commit is a snapshot, not a diff

A colleague believes a commit stores only the lines that changed, and worries that checking out an old commit will half-apply a patch. The commands below run in a scratch repository with three commits. Say what they prove, and what a rewrite does to the hashes.

```bash
git log --oneline
# a1b2c3 third commit
# 9d8e7f second commit
# 4c5d6e first commit

git checkout 9d8e7f
ls
# readme.md  src/          <- the whole project, not a patch

git switch -c reworded 4c5d6e
git commit --amend -m "first commit, reworded"
git log --oneline
# 7f8a9b first commit, reworded      <- a new hash for the same tree
# 9d8e7f second commit
```

### Solution

```text
checking out 9d8e7f restored a complete tree, so a commit is the project
at that moment, not a set of changed lines.

amending 4c5d6e produced 7f8a9b: a commit's content includes its parent
and its message.
```

The tree is what a commit points at, so checkout is total rather than a partial patch, and the diff a log shows is computed for display from two snapshots. The amended commit gets a new hash because its content includes its parent and message, which is why rewriting an old commit on a shared branch forces every later hash to change. The trap is reading a new hash as a file change: here the tree is identical.

## Example 2 — Recovering work after a bad reset

A developer runs a hard reset to discard what looked like a dead end, then realises two of the commits were wanted. Say where those commits still are, and give the commands that bring them back.

```bash
git reset --hard HEAD~3
# HEAD is now at 4c5d6e first commit

git log --oneline
# 4c5d6e first commit       <- the three commits are gone from the log
git reflog
# 4c5d6e HEAD@{0}: reset: moving to HEAD~3
# a1b2c3 HEAD@{1}: commit: third commit
# 9d8e7f HEAD@{2}: commit: second commit
```

### Solution

```text
the commits are still objects; the reset only moved the branch pointer,
and the reflog recorded where that pointer had been.

git switch -c rescued a1b2c3      # name the old tip again
git log --oneline                 # all three commits are back
```

A reset moves a ref, and the objects it used to point at are untouched until garbage collection drops anything unreachable, so the old tip is still addressable by the hash the reflog kept. The trap is assuming the work died with the branch name: unreferenced objects survive for a period, and the reflog is the standard way back.
