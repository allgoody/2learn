---
title: Git Branching Strategies
type: skill
topic: cs-fundamentals
tier: small
status: drafted
aliases: []
prereqs: ["cs-fundamentals/git"]
related: []
---

## What it is

A branching strategy is a team's shared agreement about what branches mean: how long they live, what may be merged into what, and how a release is cut. Two named strategies dominate the discussion. Trunk-based development keeps `main` always releasable and every branch short-lived, often a day. GitFlow keeps several long-lived branches — a develop line, release branches and hotfix branches — and integrates them at release boundaries.

## Why it matters

The strategy decides how much integration pain a team experiences and how often. Long-lived branches delay the moment two changes meet, so the eventual merge is large and the conflicts are real. Trunk-based development forces that meeting daily, when each change is small and easy to understand. That difference also decides whether continuous integration is possible at all: a CI system can only tell you the build is green if the thing it builds is close to what people are working on.

## Core ideas

### Trunk-based: short branches, one always-releasable main

Work is done on a branch that lives hours or days, merged back to trunk frequently. Anything incomplete is hidden behind a feature flag so the code can ship without the feature being visible. The payoff is a small integration surface, a build that always reflects reality, and a release process that is a decision rather than a project.

```text
main  ----o----o----o----o---->   always releasable
           \  /    \  /
            o       o            branches merge within a day
```

### GitFlow: long-lived lines for a scheduled release train

A develop branch collects work, a release branch stabilises it, and hotfix branches patch production directly. This suits products with a real release cadence, several supported versions in the field, or a step where the release must be stabilised by hand. The cost is that develop diverges from main for long stretches, so merges are big, conflicts are frequent, and CI on develop does not tell you whether production would build.

```text
main     ----o--------------o-------->
              \            /
develop  ------o--o--o--o--o
                    \
release               o--o
```

### The strategy follows the release process

The right question is not which strategy is better but what your releases look like. If you can deploy any commit at any time, trunk-based is the only coherent option. If a release means freezing a candidate, running a manual test cycle and shipping on a date, a release branch is a real thing and GitFlow models it directly. Choosing a strategy your release process contradicts produces process that everyone works around.

### Continuous integration depends on trunk-based

CI means every change is integrated and verified, which only happens if branches are short. With week-long branches, CI verifies a branch nobody else is merging into, and the interesting failures appear at merge time — exactly when the developer has moved on. This is the strongest practical argument for short branches, and it holds even for a small team.

```text
short branch -> CI result predicts the merge -> merge is boring
long branch  -> CI is green, merge is a surprise -> merge is an event
```

### Choose one, write it down, and keep the exception explicit

Either strategy can work when the team follows it consistently. What fails is a mixture nobody agreed on: a release branch nobody merges back, a hotfix applied in two places, a develop branch that is three weeks ahead. Write the rule down in the repository, name who may cut a release branch, and require the exception to be stated rather than assumed.

## Practice

### Measure your branch lifetimes

Look at the last twenty merged branches in your repository and record how long each lived from first commit to merge.

Done when: you can state the median lifetime and say whether the number matches the strategy your team believes it follows.

### Try the other strategy on one change

Take the next small change and integrate it to trunk within one day, behind a flag if it is incomplete. Note what had to be done differently from your usual flow.

Done when: the change is on trunk within a day and you can name what the strategy forced you to decide earlier.

## Common mistakes

- **Long-lived feature branches** — the merge becomes a multi-day event and the CI signal is stale; fix: keep branches short and hide incomplete work behind flags.
- **Adopting GitFlow without a release train** — develop and main drift apart for no benefit; fix: choose the strategy your release process actually needs.
- **A develop branch nobody merges back** — work accumulates and the eventual integration is a project of its own; fix: merge forward on a schedule, or delete the branch and use trunk.
- **Hotfixing in two places** — the same fix exists twice and one copy is forgotten; fix: fix on trunk and promote, or make the hotfix branch the only path.
- **An unwritten strategy** — everyone follows a different one and the exceptions become the norm; fix: write the rule in the repository and name who may break it.

## Go deeper

- **Git (Version Control System)** (`cs-fundamentals/git`) — the object model and merge mechanics this strategy is built on, so read it first.
- **GitHub** (`cs-fundamentals/github`) — where branches become pull requests and the strategy meets the review process.
- **Software Architecture** (`cs-fundamentals/software-architecture`) — how deployment shape constrains which branching strategies are possible.
