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

GitHub is a hosting service built on top of git: it stores copies of repositories and adds the parts a team needs in order to work in one — remote repositories, pull requests, issues, permissions and automated checks. The repository model itself is unchanged, because a remote is just another copy of the same object graph: the same commits, trees and blobs, reached by the same branch names. What the service adds is the collaboration layer above them, and that layer is where most of the day-to-day decisions live.

## Why it matters

A repository on its own records what the code is; the host records why it is like that, and that record is what the next developer reads. A pull request is the unit of review, the place a design discussion happens and the artefact that says a change was accepted: one branch, one diff, one conversation, and the merge is the decision. Without it, three developers push to the trunk in parallel and the only way to learn who wrote a line is to ask them; with it, `git log` names the commit and the pull request holds the 20 comments behind it. Issues are the backlog, and the line `Closes #142` in a pull request body writes the link into the history on merge. Permissions and protected branches are the part that keeps a mistake out of production, and continuous integration (CI) — rebuilding and testing every change automatically — reports its result on the pull request even though the pipeline itself belongs to another topic.

## Core ideas

### A remote as another repository

Pushing sends the objects the remote does not have and then moves the branch name; fetching receives the objects you do not have and records where the remote's names point. A repository is objects plus names: one commit object per version of the project, one tree object per directory in that version, one blob per file content, and refs — names such as `main`, or `origin/main` for your record of the remote's `main` as of the last fetch — that point at commits.

```text
push 1 commit that changes 3 files in 2 directories
  1 commit object                                 1
  1 tree object per changed directory              2
  1 blob per changed file version                 3
  objects sent = 1 + 2 + 3 = 6
  plus 1 name moved: origin/main, from the old commit to the new one

fetch: the same count in the other direction, 6 objects, then origin/main is updated
```

Because the objects are the whole state, a local repository is fully functional with no server at all, and the remote's role is coordination rather than authority. The same fact explains why rewriting published history is disruptive: a force-push moves the ref to a different commit, so every clone holding the old commits disagrees with the remote about what `main` is, and the work built on those commits has to be replayed by hand.

### Pull requests: a conversation attached to a branch

Opening one proposes merging a branch into another and attaches the diff, the comments and the checks to that proposal. It is not a git feature: it is the host's record of a decision. Because it is the unit of review, its size decides whether the review is real.

```text
git diff --shortstat  ->  60 files changed, 900 insertions(+), 120 deletions(-)
changed lines = 900 + 120 = 1020

reading rate = 100 lines a minute (substitute your own; the arithmetic is the point)
1020 / 100 = 10.2 minutes of reading before any judgement, and 60 files of context to hold

split by concern: 1020 / 3 = 340 changed lines and 60 / 3 = 20 files per pull request
340 / 100 = 3.4 minutes each, three times, each read on its own
```

Those minutes are the floor of a review, not its total, and the context is what costs: a reviewer holding 60 files judges each change against a remembered whole, while a reviewer holding 20 judges three separate wholes. Keeping the branch short and the diff small is therefore a review-quality decision, not a git detail.

### Issues: the backlog and its links

An issue records a problem or a request, and a pull request that names it links the two. One line in the pull request body, `Closes #142`, gives the host enough to close issue 142 on merge and to show the merged commit on the issue. Over time those two links are how a maintainer answers "why is this code like this?": the pull request holds the discussion, the issue holds the reason, and following 2 links costs 0 questions. Writing the reason in a private chat instead puts it in 1 place that nobody reading the repository can see.

### Forks, branches and permissions

A contributor without write access forks the repository — a copy of the whole object graph under their own account — pushes to the fork, and opens a pull request across the two. For a team, branch permissions are the guardrail: a protected branch can require one approving review and one passing check, and refuse a direct push. That reduces the number of ways a bad commit reaches the trunk from every push a write-access developer can make to a single route that has to pass 2 gates.

```text
main:        protected - 1 approval + 1 passing check required, direct push refused
contributor: fork -> push to the fork -> pull request -> merge (3 steps, 0 write access needed)

team member: push a branch -> pull request -> 1 approval -> 1 green check -> merge
```

The shape of the permission model decides how much of the process the host enforces and how much the team has to trust.

### Continuous integration: reported here, designed elsewhere

The host builds the commit a pull request proposes, runs the checks the repository declares — tests, a linter, a type check, one or more of each — and reports every result on the conversation. A required check blocks the merge button until it is green, and pushing a new commit onto the branch starts the checks again from that commit, because the previous results described the previous one.

```text
pull request:     check 1 running -> check 1 passed -> merge button enabled
new commit pushed: the same check runs again on the new commit, from the start
```

Designing those pipelines — choosing runners, caching, managing secrets — is a separate skill, covered with the cloud and DevOps tooling. This entry stops at the fact that the checks appear on the pull request and can be required before a merge.

## Practice

### Take a change through a pull request

Create a branch, make one commit that changes one file, push it with `-u` (set the upstream, so later pushes name neither remote nor branch), and open a pull request whose body contains `Closes #142` for an issue you have opened. Request one review, answer one comment with a second commit, and merge.

Done when: the pull request shows the linked issue, the review conversation and the merged commit, and you can name which of those three the host added rather than git.

### Require a check before merging

On a repository you control, protect the main branch so that a pull request needs at least one approval and one passing check, then test the rule twice: push straight to main, and open a pull request with no approval.

Done when: both attempts are refused, one refusal naming the direct push and the other naming the missing approval.

## Common mistakes

- **Treating the remote as the only copy of the truth** — a force-push moves the ref, so 1 replaced name leaves every clone disagreeing about what `main` is and replaying work by hand; fix: treat the remote as 1 copy among several, and never move a name others have already fetched.
- **Opening a pull request with a huge diff** — 1020 changed lines at 100 lines a minute is 10.2 minutes of reading and 60 files of context before any judgement, so reviewers skim and defects pass through; fix: split by concern into pull requests of roughly 340 lines and 20 files, each read on its own.
- **Discussing a design in a private channel** — the reason lives in 1 chat nobody reads again and the repository says nothing, so the next maintainer has 0 of it; fix: put the conclusion in the pull request or the issue, where `Closes #142` keeps the link.
- **Leaving the main branch unprotected** — every push is a route to the trunk, and 1 unreviewed commit is enough to put a mistake into production history; fix: require 1 approval and 1 passing check, and let the host refuse the direct push.
- **Confusing the host's automation with git** — the repository works with 0 checks and no server at all, and the pipeline is a separate skill; fix: keep the concerns apart and put pipeline design with the cloud and DevOps topic.

## Go deeper

- **Git (Version Control System)** (`01-cs-fundamentals/12-git`) — the object model this service copies around, so read it first: commits, trees, blobs and the refs that name them.
- **Git Branching Strategies** (`01-cs-fundamentals/22-git-branching-strategies`) — what branches mean once a pull request is the unit of review, and how branch age sets the size of the merge.
- **Code Review** (`01-cs-fundamentals/17-code-review`) — how to read and write the conversation a pull request hosts, so that a review fits into minutes rather than days.
