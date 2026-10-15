---
title: GitHub
type: skill
topic: 01-cs-fundamentals
tier: small
status: drafted
aliases: []
prereqs: ["01-cs-fundamentals/12-git"]
related: []
---

## What it is

GitHub is a hosting service built on top of git, and it adds the parts a repository needs to be a place a team works: remote repositories, pull requests, issues, permissions and automated checks. The repository model is unchanged — a remote is just another copy of the object graph — but the collaboration layer is where most of the day-to-day decisions live.

## Why it matters

The collaboration layer is where code and conversation meet, and where a team's conventions become visible. A pull request is the unit of review, the place a design discussion happens, and the record of why a change was accepted. Issues are the backlog, and their links to pull requests are the project's history. Permissions and protected branches are what stop a mistake from reaching production. Continuous integration also runs here, though the pipeline itself is a separate concern covered in the cloud and DevOps topic.

## Core ideas

### A remote is just another repository

Pushing is sending objects the remote does not have, and fetching is receiving objects you do not have. Nothing more. That is why a local repository is fully functional without a server, and why the remote's role is coordination rather than authority. It also explains why rewriting published history is disruptive: the remote and every clone hold objects your local copy no longer references.

```text
push:  send the objects the remote is missing, then move the branch ref
fetch: receive new objects, then update the remote-tracking ref
```

### A pull request is a conversation attached to a branch

Opening one proposes merging a branch into another and gives everyone a place to read the diff, comment on lines and approve. It is not a git feature: it is the host's way of attaching discussion and status to a branch. Because it is the unit of review, keeping the branch short and the diff small is what makes the review useful.

```text
feature/pricing -> main      review, comments, approval, merge
```

### Issues are the backlog, and the links are the history

An issue records a problem or a request; a pull request that mentions it links the two. Over time the links are how a maintainer answers "why is this code like this?" — the pull request holds the discussion and the issue holds the reason. Writing the reason in the issue rather than in a private chat is what makes that possible.

### Forks, branches and permissions

Contributors without write access fork the repository, push to their fork and open a pull request across the two. For a team, branch permissions and protected branches are the guardrail: they can require a passing check and a review before a merge, and prevent a direct push to the main line. The shape of the permission model decides how much of the process is enforced rather than trusted.

```text
main: protected, requires 1 approval and a green check
contributor: fork -> push to fork -> pull request
```

### Continuous integration runs here, but belongs to another topic

The host runs automated checks against a pull request — building, testing, linting — and reports the result on the conversation. Designing those pipelines, choosing the runners and managing secrets is a separate skill, and is covered under cloud and DevOps with the automation tooling for GitHub repositories. This entry stops at the fact that the checks appear on the pull request and can be required before merging.

```text
pull request: 1 check running -> 2 passed -> merge button enabled
```

## Practice

### Take a change through a pull request

Create a branch, make one small change, push it and open a pull request that references an issue. Request a review, respond to a comment, and merge.

Done when: the pull request shows the linked issue, the review conversation and the merged commit, and you can name which of those the host added rather than git.

### Require a check before merging

On a repository you control, protect the main branch so that a pull request needs at least one approval and one passing check.

Done when: a direct push to main is refused, and a pull request without an approval cannot be merged.

## Common mistakes

- **Treating the remote as the only copy of the truth** — local work stops when the network does, and history rewrites confuse everyone; fix: remember the remote is one copy among many.
- **Opening a pull request with a huge diff** — reviewers skim and defects pass through; fix: keep branches short and split unrelated changes.
- **Discussing a design in a private channel** — the reasoning never reaches the repository; fix: move the conclusion into the pull request or the issue.
- **Leaving the main branch unprotected** — a mistake can be pushed straight to production history; fix: require review and a passing check before merging.
- **Confusing the host's automation with git** — the repository works fine without it, and the pipeline is a separate skill; fix: keep the two concerns distinct and put pipeline design in the cloud and DevOps topic.

## Go deeper

- **Git (Version Control System)** (`01-cs-fundamentals/12-git`) — the object model and workflow this service is built on, so read it first.
- **Git Branching Strategies** (`01-cs-fundamentals/22-git-branching-strategies`) — what branches mean, once pull requests are the unit of review.
- **Code Review** (`01-cs-fundamentals/17-code-review`) — how to read and write the conversation that a pull request hosts.
