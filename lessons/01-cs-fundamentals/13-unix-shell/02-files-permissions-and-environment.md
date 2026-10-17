---
title: Files, permissions and environment
prereqs: ["01-cs-fundamentals/13-unix-shell/01-pipelines-and-filters"]
---

## What it is

Everything the shell works with lives somewhere in one filesystem tree, carries a set of permission bits saying who may read, write or execute it, and starts inside an environment of variables inherited from its parent process. Those three ideas — location, permission and environment — explain most of the errors you will meet: a command not found, a permission denied, a script that works in your terminal and fails under the scheduler. Learning them turns each of those from a mystery into a 1-line check.

## Why it matters

Production is where these details stop being trivia. A deployment fails because a script's permission bits lack the execute bit; a service cannot read its configuration because it runs as a different user; a nightly job works in every terminal and fails in the runner because its `PATH` holds 2 directories instead of your 4. None of these is a deep problem, but each can take an afternoon when the model is missing. Knowing where files live, how the 9 permission bits are read and how a process finds its environment makes them 1-line diagnoses.

## Core ideas

### One tree, with conventions that matter

There is a single root, written `/`, and every absolute path descends from it, so a file's location is its address. Conventions place system configuration, variable data, installed programs and personal files in different branches; they are not enforced, so knowing them tells you which of 2 similar paths is the machine-wide one.

```text
/            the root: every path below starts here
/etc         configuration files, one per service
/var         variable data: logs, mail, caches, spools
/usr/bin     programs installed for every user
/home/you    your files, and your own dotfiles

/home/you/project/app.ts sits 4 components below the root:
  home, you, project, app.ts
/etc/app/app.conf sits 3 below it: etc, app, app.conf.
```

A file can be reached through more than one path when a symbolic link points at one of its directories, which is why 2 paths can name the same bytes while behaving differently.

### Permissions answer three questions

Every file has an owner, a group and 9 permission bits: 3 for the owner, 3 for the group, 3 for everyone else, each showing read, write and execute. Read is worth 4, write 2 and execute 1, so each triple is one octal digit from 0 to 7, and the whole set is 3 digits.

```text
-rwxr-xr--  1 deploy deploy 218 deploy.sh
 |  |  |  |
 |  |  |  others: r--  = 4 + 0 + 0 = 4
 |  |  group:  r-x  = 4 + 0 + 1 = 5
 |  owner:     rwx  = 4 + 2 + 1 = 7
 |
 file type: - for a plain file, d for a directory

the 4 fields that follow the mode on that line, left to right:
  1        link count, 1 name pointing at this file
  deploy   owner
  deploy   group
  218      size in bytes

chmod +x deploy.sh           adds 1 to each triple: 754 becomes 755
umask                        prints the bits a new file will not get
  666  rw- rw- rw-   a new file starts here: read and write for all 3 classes
  022  --- -w- -w-   the mask clears write for group and others
  666 AND NOT 022 = 644  rw- r-- r--  what the file actually gets

  777  rwx rwx rwx   a new directory starts here, its execute bits included
  022  --- -w- -w-
  777 AND NOT 022 = 755  rwx r-x r-x  what the directory actually gets
```

For a directory, the execute bit means "may pass through", which is why a directory that is readable but not executable cannot be entered even though its names can be listed. Permissions on every component of the path matter as much as the file's own. Making something world-writable to get past a refusal grants write to every account on the machine.

### Environment variables are the configuration channel

Every process starts with key-value variables inherited from its parent. That is how a shell finds programs, how a service learns its port, and how a script knows which environment it is in. The search path matters most: `PATH` is a colon-separated list of directories, searched left to right, and the first match wins.

```bash
echo "$PATH"
# /home/you/.local/bin:/usr/local/bin:/usr/bin:/bin
# 4 directories, in order; a bare command name is looked for in each of them in turn

type -a backup-tool
# lists every match in that order; the first line is the 1 a bare backup-tool would run

export API_BASE=api.example.test   # export puts the name in the environment of every child process
env | wc -l                        # env prints the inherited set; wc -l counts how many variables arrived
```

A command not found almost always means its directory is not on the list, not that the program is absent.

### Shells have configuration, and it loads conditionally

Personal settings live in dotfiles in your home directory, and which file is read depends on 2 things: whether the shell is interactive, and whether it is a login shell. An interactive shell reads your aliases; a job started by cron runs a non-interactive shell, reads none of them and arrives with a small environment — commonly `HOME`, `SHELL`, `LOGNAME` and `PATH`, with `PATH` often just 2 directories, `/usr/bin:/bin`. That is why an alias works in your terminal and not in a script, and why a scheduled job seems to be missing your path.

```bash
bash -lc 'echo "$PATH"'   # -l makes it a login shell, so the login file is read
bash -c  'echo "$PATH"'   # non-interactive: no login file is read, so it keeps only the values its parent passed in
```

When something behaves differently in automation, suspect the environment first: 1 missing variable explains most of these differences.

### Globbing and finding

The shell expands patterns such as `*` into a list of matching paths before the command sees them, so the command receives names, not a pattern. `find` is a different tool: it walks the tree itself, tests each entry against conditions, and can act on the matches.

```bash
rm *.tmp                    # the shell expands this first; with 0 matching files it passes the literal *.tmp and rm reports it missing
find . -name '*.log' -mtime +7 -delete
#  .        start at the current directory and descend into every subdirectory
#  -name    match the filename; quoted so the shell leaves the pattern to find
#  -mtime +7  modified more than 7 * 24 = 168 hours ago
#  -delete  remove each match as it is found
```

The difference shows up in the failure: a glob matching nothing reaches the command as a literal 5-character name, while `find` matching nothing simply prints nothing and exits 0.

## Practice

### Diagnose a not-found and a permission-denied

Produce each error deliberately: run a program from a directory not on your path, and a script without execute permission. Then fix both.

Done when: both commands run, and you can state which path entry or which permission bit you changed and why that was enough.

### Compare your interactive and minimal environments

Print the environment inside your interactive shell, then print it from a process started without your shell configuration.

Done when: you can name 3 variables present in one and missing in the other, and explain what a script using any of them would do differently.

## Common mistakes

- **Making a file world-writable to fix a permission error** — `chmod 777` sets all 9 bits for all 3 classes, so every account that can reach the path may rewrite the file; fix: change the owner or group, or grant only the 1 bit the task needs, such as execute.
- **Adding a directory to the path in an interactive file only** — the interactive shell reads it and the job's shell does not, so the command is not found; fix: set it where the non-interactive process will see it, or name the program by its full path.
- **Assuming a scheduled job has your environment** — it starts with about 4 variables and often `PATH=/usr/bin:/bin`, 2 directories against your 4; fix: set what it needs explicitly in the job.
- **Deleting with an unquoted wildcard** — the shell expands the pattern before `rm` runs, so `rm *.tmp` removes every match, and `rm * .tmp` removes everything in the directory; fix: list the matches first with `echo`, then run the command.
- **Confusing a symlink with its target** — permissions and paths behave differently depending on which one is used, and a link whose target is gone looks like a missing file; fix: inspect the link itself, not the path through it, when a location behaves unexpectedly.

## Go deeper

- **Pipelines and filters** (`01-cs-fundamentals/13-unix-shell/01-pipelines-and-filters`) — the streams and composition these files are read through, so read it first.
- **Operating Systems** (`01-cs-fundamentals/15-operating-systems`) — the process model, ownership and permission bits underneath these commands.
- **Command-Line Interface** (`01-cs-fundamentals/24-command-line-interface`) — working in this environment fluently rather than visiting it under duress.
