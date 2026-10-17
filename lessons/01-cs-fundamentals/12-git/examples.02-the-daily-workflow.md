## Example 1 — Two unrelated edits in one working tree

A developer fixed a rounding bug, renamed an unrelated module and left a debug print behind in the same session. The status below shows everything three of those files are carrying. Say what committing all of it at once would entangle, then stage and commit the changes separately.

```bash
git status --short
#  M src/price/round.ts        the actual fix
#  M src/price/index.ts        rename of the module
#  M src/cart.ts               debug print
# 3 files modified in the working tree, 0 staged
```

### Solution

```bash
git add -p src/cart.ts          # the 6-line change splits into 2 hunks
                                # hunk 1, the debug print: answer n
                                # hunk 2, the intended edit: answer y
git add src/price/round.ts
git commit -m "fix: round half-pence up in price totals"
# 1 commit; its tree differs from its parent in 1 file, src/price/round.ts

git add src/price/index.ts
git commit -m "chore: rename the price module"
# 1 more commit, 1 more changed file

git status --short
#  M src/cart.ts               the debug print was never staged
```

A commit holds the contents of the index, not of the working tree, so staging decides what the snapshot contains. Committing all 3 files at once makes 1 commit that changes 3 files, and `git revert` on that commit reverses all 3, which means undoing a 1-line fix also undoes a module rename and a debug print. Interactive staging chooses hunks, and this file's 6-line diff is 2 of them, so the fix becomes its own commit and reverting it touches 1 file. The trap is that `git add .` is the fastest thing to type, and the entanglement only shows up weeks later when someone wants the fix gone and cannot take it without the rename.

## Example 2 — Four problems that all look like undo

A team hits the four situations below on the same afternoon. Say which git operation belongs to each, how many commits it moves, and why reaching for the wrong one is destructive.

```text
1. the last commit has a typo in its message; 0 commits have been pushed
2. the last 3 commits were a dead end and exist in 1 clone only
3. a commit merged yesterday caused the outage; 12 colleagues have pulled it
4. an experiment in src/cart.ts should be discarded; the commits are fine
```

### Solution

```bash
git commit --amend -m "fix: correct rounding in price totals"
# case 1, whose commits are local only: 1 commit replaced by 1 new commit with a new name

# case 2, 3 commits nobody else has: 1 ref moves 3 commits back, 3 commits become unreachable
git reset --hard HEAD~3

# case 3, seen by 12 colleagues: +1 commit whose diff reverses 9d8e7f2; all 12 clones converge
git revert 9d8e7f2

# case 4, file edits only, history is fine: 1 file rewritten from the index, 0 commits move
git restore src/cart.ts
```

Each situation asks a different question about how many commits move and who notices: amending replaces 1 unpushed commit, resetting moves the branch back over 3 commits nobody else has, reverting adds 1 commit so all 12 clones converge, and restoring rewrites 1 file while history stays put. The trap is that all 4 feel like "undo", so a reset gets reached for in case 3, where it moves the branch back and leaves the other 12 clones naming the outage commit — and their next push quietly reintroduces it. Read the count on the remote first: if a commit is on a ref others already hold, the answer is revert, never reset.
