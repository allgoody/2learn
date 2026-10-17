---
title: Unix Shell
type: skill
topic: 01-cs-fundamentals
tier: medium
status: drafted
aliases: ["Bash"]
prereqs: []
related: []
---

## What it is

A Unix shell is a program that reads commands, runs them, and connects their input and output — a pipe wires stream 1 of one command into stream 0 of the next. Its power is not the commands themselves but the composition: a filter reads text, writes text and reports success as exit status 0 or failure as anything else, so any 2 of them can be joined by a pipe without either one knowing about the other. Around them sits the toolset this track covers: the filesystem, the 9 permission bits, the environment and the pipeline.

## Why it matters

The shell is the default interface of every server, container and build pipeline you will meet. A task that takes 20 clicks in a graphical tool is 1 command here, and that same command runs identically on a colleague's machine and in the deployment pipeline, which is the real argument: a command is a record of what was done, readable, repeatable and ready to be put in a script. It is also the fastest way to ask a system a question — which of its 300 processes holds port 8080, which of 4 000 files changed this week, which of them contain the id you are hunting — because each answer is 1 pipeline rather than a session in a tool.

## In this track

1. **Pipelines and filters** (`01-cs-fundamentals/13-unix-shell/01-pipelines-and-filters`) — the 3 streams, pipes, redirection and the small text filters that compose, with a 5-stage pipeline traced line by line.
2. **Files, permissions and environment** (`01-cs-fundamentals/13-unix-shell/02-files-permissions-and-environment`) — where a file lives, how its 9 permission bits are read as 3 octal digits, and how a process finds what it needs.

## Prerequisites

None.

## Go deeper

- **Command-Line Interface** (`01-cs-fundamentals/24-command-line-interface`) — turning the toolset into a habit of working, once the mechanics are there.
- **Git (Version Control System)** (`01-cs-fundamentals/12-git`) — the tool where this fluency pays off most directly, command for command.
- **Operating Systems** (`01-cs-fundamentals/15-operating-systems`) — the processes, files and permission bits these commands are talking to.
