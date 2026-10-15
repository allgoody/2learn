## Example 1 — A push that rewrites published history

A developer tidies their commits by rebuilding the main line locally, then sends it. A teammate's clone now disagrees with the remote. Show what the push did, then the way to publish a tidy history without rewriting what others already have.

```bash
git log --oneline origin/main..main   # what my local main adds
git push --force origin main          # replaces the published ref
# teammate: git pull -> "diverged" and a duplicated commit
```

### Solution

```bash
git fetch origin
git rebase origin/main                # replay my commits on top of theirs
git push origin main                  # fast-forward, nothing replaced
# feature work instead: push the branch and open a pull request
git push -u origin fix/142-coupon
```

A remote is just another repository holding the same objects, so a force-push does not send one new commit — it discards the ref everyone else built on and points it somewhere else. Rewriting your own unpushed commits is harmless; rewriting a ref others have fetched costs them a manual recovery. The rule that follows is the one this example applies: tidy in private, rebase on top of what is published, and put anything that changes published history through a pull request where the change is visible.

## Example 2 — A sixty-file pull request

A branch accumulated three unrelated changes over a fortnight. The pull request has sixty changed files; the first reviewer leaves a comment about formatting and stops. Improve the review without changing what is being delivered.

```bash
git switch -c feat/dashboard   # branched a fortnight ago
git push -u origin feat/dashboard
# host: pull request into main, 60 changed files, no linked issue
```

### Solution

```bash
git switch -c feat/dashboard-layout main        # one concern per branch
git switch -c fix/142-expired-coupon main
git switch -c chore/upgrade-linter main
git push -u origin fix/142-expired-coupon
# host: open a pull request, body "Closes #142", one approval required
```

A pull request is where the diff, the discussion and the decision live, so its size is a review-quality decision and not just a git detail. Three small pull requests each read in minutes, each link to the issue that explains why the change exists, and each can be merged without dragging the other two along. Splitting also puts the reasoning where a maintainer can find it later, since a private conversation about a design leaves nothing behind in the repository. The protected main branch is what makes the small-diff habit enforceable rather than merely encouraged.
