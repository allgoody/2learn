## Example 1 — A commit is a snapshot, not a diff

A colleague believes a commit stores only the lines that changed, and worries that checking out an old commit will half-apply a patch. The transcript below runs in a scratch repository whose commits are printed with the first 7 of their 40 hexadecimal characters. Say what each command proves about what a commit holds, and what rewording one does to the names of the commits after it.

```bash
git log --oneline
# a1b2c3f third commit        a1b2c3f is the first 7 of the 40 hex characters naming that commit
# 9d8e7f2 second commit
# 4c5d6e1 first commit
# 3 commits; HEAD names a1b2c3f

git show --stat 9d8e7f2
# readme.md | 1 +
# 1 file changed, 1 insertion(+)

git switch --detach 9d8e7f2
ls
# readme.md  src/           2 entries: the project as it stood, not 1 patched file

git switch main
git commit --amend -m "third commit, reworded"
git log --oneline
# 7f8a9b4 third commit, reworded
# 9d8e7f2 second commit
# 4c5d6e1 first commit

git diff a1b2c3f 7f8a9b4 --stat
# (no output)               0 files differ between the old and the new commit
```

### Solution

```text
checking out 9d8e7f2 produced readme.md and src/: 2 entries, the whole project as it stood.
a commit points at 1 complete tree, so checkout restores all of it and no stored patch exists
that could be half-applied.

amending the message replaced 1 commit with 1 new commit: 7f8a9b4 in place of a1b2c3f.
git diff a1b2c3f 7f8a9b4 printed nothing, so the 2 commits carry the same tree hash
and the only difference is the message text.

rewriting an older commit is worse. Take the 3 commits in the log above and rewrite
the first, 4c5d6e1, with rebase: it gets a new name, and so do the 2 commits after it,
because the content of each one names its parent. 3 commits, 3 new names.
```

The tree is what a commit points at, so a checkout is total rather than a partial patch, and the diff that `git log` shows is computed for display from two snapshots. The amended commit gets a new name because its content includes its parent, its tree, its message and a timestamp, so changing the message changes the bytes the hash is taken over. The trap is reading a new hash as a file change: here the 2 trees are byte-identical and the diff prints nothing, and a rewrite of the first of 3 commits costs 3 new names rather than 1.

## Example 2 — Recovering work after a bad reset

A developer runs a hard reset to discard what looked like a dead end, then realises all three commits were wanted. The transcript below shows the reset and the reflog it left. Say where those three commits now live, and give the commands that bring them back.

```bash
git log --oneline
# a1b2c3f third commit
# 9d8e7f2 second commit
# 4c5d6e1 first commit
# 1122334 base commit
# 4 commits; HEAD names the tip, a1b2c3f

git reset --hard HEAD~3
# HEAD~3 is the commit 3 parent links back from HEAD, so the branch ref moves to 1122334
git log --oneline
# 1122334 base commit
# 1 commit reachable from the branch; the other 3 are named by no ref

git reflog
# 1122334 HEAD@{0}: reset: moving to HEAD~3
# a1b2c3f HEAD@{1}: commit: third commit
```

### Solution

```text
the 3 commits are still objects in the store. The reset moved 1 ref, 41 bytes,
and deleted 0 objects; the reflog recorded where that ref had been.

git switch -c rescued a1b2c3f
# 1 new ref, 41 bytes, naming a1b2c3f
git log --oneline
# 4 commits are reachable again: a1b2c3f, 9d8e7f2, 4c5d6e1, 1122334
```

A reset moves a ref, and the objects that ref used to name are untouched until garbage collection drops whatever is unreachable. An unreachable commit keeps its reflog entry for 30 days by default, and 90 days while it is still reachable from another ref, so the old tip is addressable by the hash the reflog kept for that window. The trap is assuming the work died with the branch name: 1122334 was the only commit the branch named afterwards, yet all 4 are still in the store, and the reflog is the standard way back.
