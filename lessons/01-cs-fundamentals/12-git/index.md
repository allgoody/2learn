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

Git is a distributed version control system: every clone holds the full history, and commits form a graph rather than a list. It stores the state of your project as content-addressed objects — a blob for one file's contents, a tree for one directory, a commit for one snapshot — and names each one with a SHA-1 hash printed as 40 hexadecimal characters. A branch is a movable 41-byte pointer into that graph, 40 characters of hash plus a newline, so it copies none of your files.

## Why it matters

Version control is the shared memory of a team. It is how you find out why a line exists, how you undo a mistake without losing the good work around it, and how 5 people change the same 1 000-file codebase without overwriting each other. Almost all the pain developers have with git comes from treating it as a set of spells: the recovery commands make no sense, so they are copied from a search result and applied with hope — a hard reset 3 commits back moves 1 ref and leaves 3 commits named by no ref, and a rebase of 5 local commits gives all 5 new names, so a colleague who already pulled them holds 5 objects your branch no longer names. Once the object graph and the pointer model are clear, the commands become predictable and the scary ones become ordinary.

## In this track

1. **The object model and history** (`01-cs-fundamentals/12-git/01-the-object-model-and-history`) — the 4 object kinds and their 40-character names, and how to read history as a graph of snapshots.
2. **The daily workflow** (`01-cs-fundamentals/12-git/02-the-daily-workflow`) — staging, branching, merging, rebasing and undoing, each tied to the commits it moves and the problem it solves.

## Prerequisites

None.

## Go deeper

- **Git Branching Strategies** (`01-cs-fundamentals/22-git-branching-strategies`) — how a team agrees on what each of its branches means, once the pointer model is clear.
- **GitHub** (`01-cs-fundamentals/23-github`) — hosting, pull requests and issues, built on top of this object graph.
- **Command-Line Interface** (`01-cs-fundamentals/24-command-line-interface`) — working fluently in the terminal, where the commands that move those refs are typed.
