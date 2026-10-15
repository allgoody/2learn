## Example 1 — A feature branch that lived for three weeks

A team keeps one branch per feature until it is finished. The record below is for a branch merged last month. Say what the strategy cost, then show the same work done under short branches.

```text
feature/new-checkout   branched 3 weeks ago
main                   +41 commits since the branch point
merge                  -> 27 conflicted files, two days of fixes
```

### Solution

```text
day 1  branch from main, commit the first slice
day 1  merge to main behind a flag: newCheckout=false
day 2  branch from main again for the next slice
release  flip the flag; no merge event, no stabilisation branch
```

Short branches keep the integration surface small, because two changes meet the day after each was written rather than three weeks later. The work that is not finished yet is hidden behind the flag, so `main` stays releasable and the CI result describes something close to what the team is actually building. The cost is that the flag has to be maintained and eventually removed, which is far cheaper than resolving three weeks of drift by hand.

## Example 2 — A strategy that contradicts the release process

A team deploys any green commit several times a day, but has adopted GitFlow because a previous company used it. Two months in, `develop` is three weeks ahead of `main`. Diagnose the mismatch, then name the strategy the release process actually needs.

```text
main     ----o------------------o--->
              \                /
develop  ------o--o--o--o--o--o      3 weeks ahead
release                 o--o          the only stabilised artefact
```

### Solution

```text
main   ----o----o----o----o---->   always releasable
              \  /    \  /
               o       o           merged within a day

tag v1.4 at the commit that was deployed; hotfix from the tag, merged forward
```

The release process decides the strategy, not the other way round. If any commit can be deployed, there is nothing for a stabilisation branch to stabilise: the release branch is a stage that the process skips, and `develop` exists only to make `main` look stale. Trunk-based development models this process directly, with the deployed commit tagged rather than frozen. The failure mode to avoid is the mixture nobody agreed on — the release branch here is the only artefact anyone tests, which is exactly the drift the strategy was supposed to prevent.
