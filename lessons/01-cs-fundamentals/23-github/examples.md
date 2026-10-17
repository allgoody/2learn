## Example 1 — A push that rewrites published history

A developer tidies their commits by rebuilding the trunk locally and then sends it with `--force`, which replaces the remote's ref instead of refusing the push. A teammate's clone now disagrees with the remote about what `main` is. Show what the push did, then the way to publish a tidy history without rewriting what others already have.

```bash
git log --oneline origin/main..main   # commits my main has that the remote's main lacks: 2
git push --force origin main          # move the remote's ref to my commit and drop the old one
# a ref is a name pointing at a commit; origin/main is my record of the remote's main
# teammate: git pull -> "diverged"; their 3 commits sit on a commit main no longer reaches
```

### Solution

```bash
git fetch origin                 # receive what was pushed since my last fetch, and move origin/main
git rebase origin/main           # replay my 2 commits on top of theirs: same content, 2 new parents
git push origin main             # the remote already has my parents, so this is a plain fast-forward

# anything already published and reviewed takes the branch route instead:
git push -u origin fix/142-coupon   # -u records the upstream, so later pushes name no remote or branch
```

A remote is another repository holding the same objects, so a force-push does not send one new commit — it discards the ref everyone built on and points that ref somewhere else. Rewriting your own unpushed commits is harmless; rewriting a ref others have already fetched costs them a manual replay of however many commits sat on the old one, 3 in this case. The rule this example applies is to tidy in private, rebase on top of what is published, and put anything that changes published history through a pull request, where the change is visible before it lands.

## Example 2 — A sixty-file pull request

A branch accumulated three unrelated changes over a fortnight, so the pull request has 60 changed files, 900 insertions and 120 deletions. The first reviewer leaves a comment about formatting and stops. Improve the review without changing what is being delivered.

```bash
git switch -c feat/dashboard   # branched 14 days (a fortnight) before the review
git push -u origin feat/dashboard
# host: pull request into main - 60 files changed, 900 insertions(+), 120 deletions(-), no linked issue
```

### Solution

```bash
git switch -c feat/dashboard-layout main    # 1 concern: the layout work
git switch -c fix/142-expired-coupon main   # 1 concern: the bug the issue names
git switch -c chore/upgrade-linter main     # 1 concern: the tooling
git push -u origin fix/142-expired-coupon
# host: pull request body "Closes #142", 1 approval required, 1 passing check required

changed lines = 900 + 120 = 1020 in the first pull request
1020 / 3 = 340 changed lines per pull request, and 60 / 3 = 20 files each
```

A pull request is where the diff, the discussion and the decision live, so its size is a review-quality decision rather than a git detail. Three pull requests of about 340 lines and 20 files each read in minutes, each link to the issue that says why the change exists, and each can be merged without dragging the other two along. Splitting also puts the reasoning where a maintainer can find it later, since a private conversation about a design leaves nothing behind in the repository. The protected trunk is what makes the small-diff habit enforceable rather than merely encouraged.
