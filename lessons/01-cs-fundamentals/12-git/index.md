---
title: Git (Version Control System)
type: skill
topic: 01-cs-fundamentals
tier: medium
status: drafted
aliases: ["Git"]
prereqs: []
related: []
---

## What it is

Git is a distributed version control system: every clone holds the full history, and commits form a graph rather than a list. It stores the state of your project as content-addressed objects, and a branch is simply a movable name pointing into that graph. Understanding the shape explains almost everything git does that otherwise looks arbitrary.

## Why it matters

Version control is the shared memory of a team. It is how you find out why a line exists, how you undo a mistake without losing the good work around it, and how several people change the same codebase without overwriting each other. Almost all the pain developers have with git comes from treating it as a set of spells: the recovery commands make no sense, so they are copied from a search result and applied with hope. Once the object graph and the pointer model are clear, the commands become predictable and the scary ones become ordinary.

## In this track

1. **The object model and history** (`01-cs-fundamentals/12-git/01-the-object-model-and-history`) — what a commit actually is, and how to read the history as a graph of snapshots.
2. **The daily workflow** (`01-cs-fundamentals/12-git/02-the-daily-workflow`) — committing, branching, merging, rebasing and undoing, each tied to the problem it solves.

## Prerequisites

None.

## Go deeper

- **Git Branching Strategies** (`01-cs-fundamentals/22-git-branching-strategies`) — how a team agrees on what branches mean, once the mechanics are clear.
- **GitHub** (`01-cs-fundamentals/23-github`) — hosting, pull requests and issues, built on top of this repository model.
- **Command-Line Interface** (`01-cs-fundamentals/24-command-line-interface`) — working fluently in the terminal where git is most usable.
