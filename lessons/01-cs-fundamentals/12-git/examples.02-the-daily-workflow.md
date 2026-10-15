## Example 1 — Two unrelated edits in one working tree

A developer fixed a rounding bug, renamed an unrelated module and left a debug print behind in the same session. The state below is the working tree. Say why committing all of it at once is a problem, then stage and commit the changes separately.

```bash
git status --short
#  M src/price/round.ts        <- the actual fix
#  M src/price/index.ts        <- rename of the module
#  M src/cart.ts               <- debug print
```

### Solution

```bash
git add -p src/cart.ts          # answer no to the debug-print hunk
git add src/price/round.ts
git commit -m "fix: round half-pence up in price totals"

git add src/price/index.ts
git commit -m "chore: rename the price module"
# src/cart.ts stays uncommitted with the debug print still there
```

A commit holds the contents of the index, not of the working tree, so staging decides what the snapshot contains; committing the whole tree would mix a behaviour fix with a rename, making the fix impossible to revert on its own. Interactive staging chooses hunks, so one logical change becomes one commit. The trap is that `git add .` is the fastest thing to type, and the entanglement only shows up weeks later when someone wants to undo the fix and cannot without undoing the rename too.

## Example 2 — Four problems that all look like undo

A team hits the four situations below on the same afternoon. Say which git operation belongs to each, and why reaching for the wrong one is destructive.

```bash
1. the last commit has a typo in its message; nothing has been pushed
2. the last three commits were a dead end and exist only locally
3. a commit merged yesterday caused the outage; colleagues have pulled it
4. an experiment in src/cart.ts should be discarded; the commits are fine
```

### Solution

```bash
1. git commit --amend -m "fix: correct rounding in price totals"
2. git reset --hard HEAD~3          # only because nobody else has them
3. git revert 9d8e7f                # a new commit that reverses it
4. git restore src/cart.ts          # discard file edits, keep the history
```

Each situation asks a different question about which commits move and who notices: amend replaces one unpushed commit, reset moves the branch back over commits nobody else has, revert adds a commit so every clone converges, and restore touches files rather than history. The trap is that all four feel like "undo", so a reset gets reached for in case 3, where it rewrites history colleagues already hold — and their next push quietly reintroduces the outage.
