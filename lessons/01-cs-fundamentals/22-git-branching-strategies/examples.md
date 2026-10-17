## Example 1 — A feature branch that lived for three weeks

A team keeps one branch per feature until the feature is finished, and the record below is for a branch merged last month. Three weeks is 21 days, the trunk took 41 commits in that time, and the diff that landed touched 60 files, 27 of which conflicted. Say what the strategy cost, then show the same work done under day-old branches.

```text
branch feature/new-checkout   branched 3 weeks before the merge, written as 21 days
trunk (main)                  landed +41 commits since the branch point
merge into the trunk          60 files in the diff, 27 of them conflicted
fix-up                        2 working days resolving those 27 conflicts

branch point = the commit the branch left the trunk at
```

### Solution

```text
day 0  branch from the trunk for 1 slice of the work
day 0  merge it behind a flag: newCheckout = false, the value read when nothing else sets it
day 1  branch again from the day-1 trunk for the next slice
ship   set the flag to true; nothing left to merge, no stabilisation branch to cut

old rule: 1 branch for the whole feature
  branch age           = 21 days
  trunk drift at merge = 41 commits
  work meeting at once = 41 + 1 = 42 commits, and 27 of the 60 files conflicted
  cost to land         = 2 working days

new rule: 1 branch per slice, merged the day it is written
  branch age           = 1 day
  trunk drift at merge = 10 commits             (5 developers * 2 changes each)
  work meeting at once = 10 + 1 = 11 commits, and 0 conflicts expected
  cost to land         = the review of 1 slice

21 days / 1 day = 21 slices, each landing against the trunk it was written against
```

Short branches keep the integration surface small, because two changes meet the day after each was written rather than 21 days later, so 11 changes have to be held in mind at the merge instead of 42. The work that is not finished yet is hidden behind the flag, so the trunk stays deployable and the check result describes something close to what the team is actually building. The cost is the flag itself: it is a second code path that has to be tested and then removed once the feature is on, and a flag nobody removes is a branch that was never merged.

## Example 2 — A strategy that contradicts the release process

A team deploys any green commit several times a day, but it adopted GitFlow because a previous company used it. Two months in, the develop line sits three weeks — 21 days — ahead of the trunk, and the release branch is the only artefact any test cycle has ever run on. Diagnose the mismatch, then name the strategy the release process actually needs.

```text
team        deploys any commit that passes the checks, 3 times a day on average
strategy    GitFlow, carried over from a previous company
develop     21 days (3 weeks) ahead of the trunk
release     the only branch a test cycle has run on
trunk/main  the line every deploy comes from
```

### Solution

```text
trunk  ----o----o----o----o---->   any commit deployable; 3 deploys a day
             \  /    \  /
              o       o             one slice per branch, merged the same day

ship    tag the commit you deployed: git tag v1.4 <commit>
hotfix  fix on the trunk, deploy the fix, tag v1.4.1; nothing is fixed twice

what the 21-day develop line carried beside the deploys
  3 deploys a day * 21 days = 63 deploys produced from the trunk while develop
  collected work no deploy had ever run on
what a 1-day branch meets
  10 merges on the trunk + 1 commit of its own = 11 changes to reconcile
```

The release process decides the strategy, not the other way round. If any commit can be deployed, there is nothing for a stabilisation branch to stabilise: the release branch is a step the process skips, and the develop line exists only to make the trunk look stale. Trunk-based development models this process directly, tagging the deployed commit instead of freezing it. The mixture to avoid is the one nobody agreed on — here the release branch is the only artefact anyone tests, which is exactly the drift the strategy was meant to prevent.
