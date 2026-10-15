---
title: Files, permissions and environment
prereqs: ["01-cs-fundamentals/13-unix-shell/01-pipelines-and-filters"]
---

## What it is

Everything the shell works with lives somewhere in one filesystem tree, carries a set of permission bits saying who may read, write or execute it, and inherits an environment of variables when a process starts. Those three ideas — location, permission and environment — explain most of the errors you will meet: a command not found, a permission denied, a script that works in your terminal and fails in a cron job. Learning them turns each of those from a mystery into a quick check.

## Why it matters

Production is where these details stop being trivia. A deployment script fails because the file is not executable; a service cannot read its configuration because it runs as a different user; a scheduled task works everywhere except the automated runner because the environment differs. None of these are deep problems, but each can take an afternoon when the model is missing. Knowing where files live, how permission bits are read and how a process finds its environment makes them one-line diagnoses.

## Core ideas

### One tree, with conventions that matter

There is a single root and everything hangs off it. Conventions place system configuration in one directory, variable data such as logs and caches in another, programs in a third, and each user's files under their home. The conventions are not enforced, so knowing them tells you where a file lives and which of two similar paths is the machine-wide one.

```text
/etc      configuration
/var      variable data (logs, spools, caches)
/usr/bin  programs installed for everyone
/home/you your files, and your own dotfiles
```

### Permissions answer three questions

Each file has an owner, a group and a set of bits for each: read, write and execute. A directory's execute bit means "may pass through", which is why a readable directory without it cannot be listed, and why permissions on the path matter as much as on the file. Making something world-writable to get past a permission error solves the symptom and creates a security hole.

```text
-rwxr-xr--  owner: rwx, group: r-x, others: r--
chmod +x deploy.sh      # make a script runnable
umask                   # the bits new files will not get
```

### Environment variables are the configuration channel

Every process starts with key-value variables inherited from its parent. That is how a shell finds programs, how a service learns its port, and how a script knows which environment it is in. The search path matters most: a command not found usually means its directory is not on the path, not that the program is absent.

```bash
echo "$PATH"            # the directories searched for a bare command name
export API_BASE=api.example.test   # visible to child processes
```

### Shells have configuration, and it loads conditionally

Personal settings live in dotfiles in the home directory, and which are read depends on whether the shell is interactive and whether it is a login shell. That conditional loading is why an alias works in your terminal and not in a script, and why a scheduled job seems to be missing your path. When something behaves differently in automation, suspect the environment first.

```text
interactive shell -> reads your aliases
cron / CI         -> does not; it starts with a minimal environment
```

### Globbing and finding

The shell expands patterns such as a wildcard into a list of matching paths before the command sees them, which is why a pattern matching nothing is passed through literally. Beyond simple patterns, use a search command that walks the tree with conditions and actions. Knowing which of the two you are using explains most surprises about which files a command received.

```bash
rm *.tmp                      # shell expands the pattern first
find . -name '*.log' -mtime +7 -delete   # walk, filter, act
```

## Practice

### Diagnose a not-found and a permission-denied

Produce each error deliberately: run a program from a directory not on your path, and a script without execute permission. Then fix both.

Done when: both commands run, and you can state exactly what you changed and why it worked.

### Compare your interactive and minimal environments

Print the environment inside your interactive shell, then print it from a process started without your shell configuration.

Done when: you can name three variables present in one and missing in the other, and explain why the difference matters for a script.

## Common mistakes

- **Making a file world-writable to fix a permission error** — the command works and the system is unsafe; fix: change the owner or group, or grant only the permission the task needs.
- **Adding a directory to the path in an interactive file only** — automation does not read it and the command is not found; fix: set it where the non-interactive process will see it.
- **Assuming a scheduled job has your environment** — it runs with a minimal set of variables and a different working directory; fix: set what it needs explicitly in the job.
- **Deleting with an unquoted wildcard** — the shell expands it and a wider match than intended is removed; fix: run the command with the pattern shown first, then quote it.
- **Confusing a symlink with its target** — permissions and paths behave differently depending on which one is used, and a broken link looks like a missing file; fix: inspect the link itself when a path behaves unexpectedly.

## Go deeper

- **Pipelines and filters** (`01-cs-fundamentals/13-unix-shell/01-pipelines-and-filters`) — the streams and composition these files are read through, so read it first.
- **Operating Systems** (`01-cs-fundamentals/15-operating-systems`) — the process model, ownership and permissions underneath these commands.
- **Command-Line Interface** (`01-cs-fundamentals/24-command-line-interface`) — working in this environment fluently rather than visiting it under duress.
