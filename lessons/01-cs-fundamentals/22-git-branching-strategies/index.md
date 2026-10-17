---
title: Git Branching Strategies
type: skill
topic: 01-cs-fundamentals
tier: small
status: drafted
aliases: []
prereqs: ["01-cs-fundamentals/12-git"]
related: []
---

## What it is

A branching strategy is a team's shared agreement about what its branches mean: how long each one lives, what may be merged into what, and which commit a release is cut from. Git enforces none of it — a branch is only a name pointing at a commit, and a merge only joins two such pointers into one — so the strategy lives in the team's habits and in the host's settings. Two named strategies dominate the discussion. Trunk-based development keeps the trunk (the line everyone merges into, named `main` by convention) releasable at every commit, meaning any commit on it can be deployed as it stands, and keeps every other branch short-lived, often under a day. GitFlow keeps several long-lived branches beside each other — a develop line, release branches and hotfix branches — and merges them at release boundaries.

## Why it matters

With five developers merging two changes a day each, the trunk takes 5 × 2 = 10 merges a day. A branch that lives a day meets the 10 changes merged that day; a branch that lives three weeks — 21 days — meets 10 × 21 = 210 changes at once, and every file both sides touched has to be settled by hand before the merge can land. The pain therefore tracks branch age rather than team size: the same five developers cost 210 changes of drift per merge when branches live 21 days instead of 1. Long-lived branches also make the automation blind, because a green build on a branch proves the branch works against the trunk as it stood at its branch point — the commit at which that branch left the trunk — and says nothing about the 210 changes it has never seen. Continuous integration — rebuilding and testing the whole project after each change, so that a green result describes software that can exist as a whole — tells the truth only about the line everyone is actually changing.

## Core ideas

### Trunk-based: short branches, one always-releasable main

Work is done on a branch that lives hours or days and merges back into the trunk the same week. A branch's age is measured from the branch point — the commit at which it left the trunk — to the merge commit that joins it back. Anything incomplete is hidden behind a feature flag: a boolean value read at run time, off by default, that switches the unfinished path out of the running program. The integration surface of a merge is what the two sides each changed since the branch point, and that is the number the strategy is really buying down.

```text
trunk  ----o----o----o----o---->   every commit deployable as it stands
            \  /    \  /
             o       o             branch age 1 commit, merged the same day

branch point  = the commit the branch left the trunk at
branch age    = days from the branch point to the merge commit
feature flag  = a boolean read at run time, e.g. newCheckout = false
integration surface = trunk merges since the branch point + the branch's own commits
   1-day branch:  10 merges on the trunk + 1 commit here =  11 changes to reconcile
  21-day branch: 210 merges on the trunk + 1 commit here = 211 changes to reconcile
```

### GitFlow: long-lived lines for a scheduled release train

A develop branch collects work, a release branch stabilises a candidate, and hotfix branches patch production directly. Stabilising means the branch takes fixes only, so the candidate — the commit the branch was cut from — stops moving. The cost is visible as drift: during a five-working-day test cycle the develop line keeps taking 10 merges a day, so on the day the release ships the candidate is 10 × 5 = 50 merges behind the line it came from.

```text
main     ----o--------------------o------>   tagged v1.4 at the commit that ships
              \                  /
develop  ------o--o--o--o--o--o--o--o       keeps taking merges
                 \  5 working days /
release            o--o--o                 fixes only, candidate frozen

test cycle         = 5 working days
merges a day       = 5 developers * 2 changes each = 10
drift by ship day  = 10 * 5 = 50 merges the candidate never saw
```

This suits products with a real release cadence, several supported versions in the field, or a stabilisation step that has to be done by hand. When one of those holds, the 50 merges are the price of shipping a candidate that a test cycle has already run on, rather than a trunk nobody has; when none of them holds, the same 50 merges buy nothing.

### The strategy follows the release process

The useful question is not which strategy is better but what a release looks like for this team. If any commit can be deployed at any moment, releasing is one step — `git tag v1.4 <commit>` gives the name v1.4 to the exact commit running in production — and there is nothing for a stabilisation branch to stabilise. If instead a release means freezing a candidate, running a five-day test cycle and shipping on a date, then the release branch is a real thing and GitFlow models it directly. Two releases a month is 2 × 12 = 24 releases a year, so a stabilisation step the process does not use is cut and skipped 24 times a year, while a step it does need but nobody performs ships an untested commit 24 times a year. Choosing a strategy your release process contradicts produces process that everyone works around.

### Continuous integration and branch age

Continuous integration (CI) means every change is merged into a line that the automation then rebuilds and tests, so a green result describes software that can exist as a whole. That holds only while the branch is close to the trunk. A green run on a branch tests the branch against its branch point, so the result describes a tree that is 0 days old when it is pushed, 10 merges old one day later, and 210 merges old three weeks later. Merging a one-day branch puts any failure in front of the author while they still remember what they changed, and in units of one change; merging a 21-day branch defers the same failure to the one moment when they have already started the next piece of work.

```text
trunk takes 10 merges a day, so a branch point is 10 commits old after 1 day, 210 after 21

1-day branch   CI green -> merge meets  10 + 1 =  11 changes -> merge is routine
21-day branch  CI green -> merge meets 210 + 1 = 211 changes -> merge is the event
```

### A written rule, and stated exceptions

Either strategy works while the team follows it consistently and the release process agrees with it. What fails is a mixture nobody agreed on: a release branch nobody merges back, a hotfix applied in two places, a develop line that is three weeks ahead. A hotfix that has to reach both production and the develop line is two commits carrying the same fix, and the copy that gets forgotten is the develop one, so the next release, cut from develop, ships the bug again. Write the rule in one file the repository's front page points at, name who may cut a release branch, and require every exception to be stated rather than assumed. The rule is also measurable: over the last 20 merges into the trunk, count the ones that came from a branch older than 1 day — 0 means the written strategy and the practised one agree.

## Practice

### Measure a branch's age and the drift it met

Take the five most recent merge commits on your trunk and measure the branch behind each one:

```bash
git log --merges -n 5 --format=%h main     # the 5 most recent merges, newest first
# for each hash M printed above:
base=$(git merge-base M^1 M^2)             # branch point: the common ancestor of M's two parents
git log -1 --format=%cI $base             # when the branch left the trunk
git log -1 --format=%cI M                 # when it was merged back
git rev-list --count $base..M^1           # commits the trunk took while the branch was open
```

A merge commit has two parents: `M^1`, the trunk's tip at merge time, and `M^2`, the branch's tip. Their common ancestor is the branch point, so the days between the two dates are the branch's age.

Done when: for five merges you can state the age in days and the number of commits the trunk took meanwhile, and say whether the pairs match the strategy the team believes it follows — on a team merging 10 times a day, a one-day branch reads "1 day, 10 commits" and a three-week branch reads "21 days, 210 commits".

### Try the other strategy on one change

Take the next small change and run it the way the other strategy would: branch from the trunk and merge within one day, and if the change is incomplete put it behind a feature flag whose default is off, so the deployed program behaves exactly as before.

Done when: the change is on the trunk within 24 hours with the check green, and you can name the flag you will remove and one decision the strategy forced you to take earlier — usually the flag's name and its default value.

## Common mistakes

- **Long-lived feature branches** — a branch 21 days old meets 210 merges at its merge on a team merging 10 times a day, and every file both sides touched is a conflict to settle by hand; fix: keep branches to about a day and hide unfinished work behind a feature flag.
- **Adopting GitFlow without a release train** — a develop line 21 days (210 merges) ahead of the trunk exists to serve a stabilisation step the deploys skip, so merges back stay large and nothing tests the result; fix: match the strategy to the release process, and if any commit can be deployed, use trunk-based.
- **A develop line nobody merges back** — three weeks of work accumulates on one line while tags land on the trunk, so the next integration is a project of its own; fix: merge forward on a fixed schedule, or delete the line and work on the trunk.
- **Hotfixing in two places** — the same fix becomes 2 commits and the develop copy is the one forgotten, so the next release from develop ships the bug a second time; fix: fix on the trunk and promote, or make the hotfix branch the only path and merge it forward the same day.
- **An unwritten strategy** — 5 people follow 5 rules and the exceptions become the norm; fix: write the rule in one file, name who may cut a release branch, and count the branches older than 1 day among the last 20 merges.

## Go deeper

- **Git (Version Control System)** (`01-cs-fundamentals/12-git`) — the object model and merge mechanics this strategy is built on, so read it first: what a branch name points at and what a merge commit records.
- **GitHub** (`01-cs-fundamentals/23-github`) — where branches become pull requests and a protected trunk turns the strategy into a rule the host enforces.
- **Software Architecture** (`01-cs-fundamentals/25-software-architecture`) — how the shape of a deployment limits which branching strategies are possible at all.
