---
title: Command-Line Interface
type: skill
topic: 01-cs-fundamentals
tier: small
status: drafted
aliases: ["CLI"]
prereqs: ["01-cs-fundamentals/13-unix-shell"]
related: []
---

## What it is

The command-line interface is the habit of reaching for a terminal rather than a graphical tool: you type a command, read its output, and build the next command out of what you have just learned. The toolset underneath is the shell — the program that reads your line, starts the commands it names and connects their input and output. This entry is about the habit rather than the toolset, so it assumes you can already run a command and asks what changes once the terminal is the first place you look. The difference shows on unfamiliar problems, because a command can be adjusted and re-run, while a dialog can only be clicked again.

## Why it matters

A graphical tool shows you one arrangement at a time; a command line answers questions of shape and size, and the answer arrives as text you can count, sort or send on. Ask which files changed recently and the count comes back in one step: `find src -name "*.ts" -mtime -7 | wc -l` prints 137 for a source tree of 1 200 TypeScript files, where `-name "*.ts"` selects names ending in `.ts`, `-mtime -7` selects files modified less than 7 days ago, and `wc -l` counts the lines it receives, one file path per line. That number may not be obtainable from a graphical tool at all, and it is already in the form a script or a message needs. The other half is reproducibility: a command is a record of what you did, so a colleague asking how you produced the list gets 1 line to paste instead of a description of clicks. A dialog leaves 0 of that behind.

## Core ideas

### One interface, many tools

Every command-line tool obeys the same interface: it reads text on standard input, writes text on standard output, writes diagnostics on standard error, and sets an exit status — 0 when it worked, any other value when it did not. That uniformity lets tools written decades apart, by people who never met, chain on one line.

```bash
git log --oneline --since="7 days ago" | grep -i "fix" | wc -l
# git log --oneline   one line per commit: short hash, then the subject
# grep -i "fix"       keep the lines containing fix, ignoring case; exit status 1 if there are none
# wc -l               count the lines kept -> 12 commits mention a fix this week
```

The pipeline prints one number, 12, in one step; the same question in a graphical client is a scroll and a count by eye. A graphical tool's output lives inside the tool, so moving data between two of them needs an export format, a file and a dialog. When a task needs several tools or a repeatable transformation, the terminal wins.

### Fluency is mostly editing and history

The difference between a comfortable terminal user and a fluent one is rarely the number of commands known; it is the seconds spent editing the current line and finding something you ran earlier. `Ctrl+R` searches backwards through the history list, newest entry first. The list holds as many entries as `HISTSIZE` says, so `HISTSIZE=1000` covers 1 000 / 200 = 5 days of work at 200 commands a day, which is why the invocation you want is usually still in it.

```text
Ctrl+R       search backwards through history
Ctrl+A / E   jump to the start / end of the line
Alt+B / F    move back / forward one word
Tab          complete a path or a command name
             typing src/components/ by hand is 15 keystrokes; src/c plus Tab is 6
```

### Self-documenting tools

Almost every command answers a help flag, and most have a manual page. `--help` prints the synopsis and the option list of the version you actually have, which is the version whose behaviour you need; a search result may describe another release, another operating system or another tool. The first 20 lines usually settle one question, and for anything that deletes or overwrites they are cheaper than being wrong.

```bash
tar --help | head -20      # the 20 lines holding the synopsis and the options
man find | less            # the page for the installed version, with -mtime -7 documented on it
```

### Automation on the second use

The first time you type a long command it is a one-off; the second time it is a candidate. Make it an alias when it takes no arguments, or a small script with a name and a comment when it takes arguments or makes a decision. Name the values: the invocation `git log --since="1 week ago" --author="Ada" --oneline` is 53 characters, and it is retyped a few times a week, so 3 retypes cost 53 × 3 = 159 characters a week and carry 3 chances to mistype one of them.

```bash
alias ll='ls -alh'      # a 2-character name for a 7-character invocation
# ~/bin/weekly          # a script, not an alias: it works from other scripts and other shells too
```

That is how a personal toolkit grows, and why a fluent user's environment drifts toward the tasks they actually repeat.

### Output as data, inspected before acting

Because output is text, the useful habit is to inspect before acting: list what a pattern matches, count the files before deleting them, print what a script would do rather than running it. That turns a class of irreversible mistakes into a few seconds' delay, and it also makes the command reusable, because you already know the shape of its output.

```bash
grep -rl "TODO" src/            # -r recurse into directories, -l print the matching file's path -> 41 paths
grep -rl "TODO" src/ | wc -l    # 41: the count you are about to act on
grep -rl "TODO" src/ | head -5  # the first 5 of those paths, to see which files they are
```

The count is the point: a command that deletes takes whatever list it is handed, 41 paths or 4 100. And `grep` sets exit status 1 while printing 0 lines when it matches nothing, so an empty result and a failed search look identical — which is why the check comes before the deletion rather than after it.

### The cases where a graphical tool wins

A tangled merge, an image edit, a dashboard, the review of a 60-file diff: these are often faster in a graphical tool. The merge is the clearest case, because a conflict is printed one screen at a time while the decision is which of two versions to keep: 20 conflicted files hold 20 × 2 = 40 versions to compare, and a terminal asks you to hold them in mind and answer 20 times, where a three-pane view shows both sides at once. The skill is not using the terminal for everything but being at home in both and choosing deliberately, so that the terminal is an option you evaluate rather than a loyalty you defend.

```bash
git merge feature/pricing
# CONFLICT (content): Merge conflict in 1 of the 20 files both branches changed
# one marker block per conflicted file, and the terminal prints them one file at a time
```

## Practice

### Search your own history

Run `Ctrl+R`, type 3 or 4 characters of a command you ran earlier this week, and run the match. Repeat five times, without scrolling and without retyping any of them.

Done when: you have retrieved 5 previous commands by search alone, and you can state your history size from `echo $HISTSIZE` and how many days of work it covers at your own daily command count.

### Turn a repeated command into a script

Find a command you have typed 3 or more times this week, count its characters, and put it behind a name: an alias when it takes no arguments, a script with a comment when it does.

Done when: the named version runs from a different directory and gives the same result, and you can state how many characters you no longer type and how many times a week you had been typing them.

## Common mistakes

- **Copying a destructive command from a search result** — it was written for another tool, another version or another directory layout, and a delete reports exit status 0 whatever it matched; fix: read `--help` for the tool you have and list the matches, with `wc -l`, before acting on them.
- **Retyping a command from an hour ago** — every retype is 1 more chance to mistype a character, and the command as you ran it is already in the history; fix: search backwards with `Ctrl+R` and edit the previous invocation.
- **Building a huge one-liner** — a loop or a condition inside a pipeline becomes 1 line nobody can read twice and no test can cover in one piece; fix: put anything with a loop or a condition into a named script with a comment.
- **Ignoring the exit status** — a failure prints nothing, and printing nothing looks exactly like a valid empty answer: `grep` exits 1 on no match and prints 0 lines, and inside a pipeline that status is easy to lose; fix: check the status, or chain with `&&` and `||`, before acting on the output.
- **Using the terminal for work that is genuinely graphical** — 20 conflicted files are 20 × 2 = 40 versions to compare, answered one screen at a time; fix: choose per task rather than per habit.

## Go deeper

- **Unix Shell** (`01-cs-fundamentals/13-unix-shell`) — streams, pipelines and permissions, so read it first: this entry assumes the toolset and describes the habit built on top of it.
- **Git (Version Control System)** (`01-cs-fundamentals/12-git`) — the tool a fluent terminal user reaches for most, and the one whose output is designed to be read, counted and re-queried.
- **Debugging** (`01-cs-fundamentals/11-debugging`) — the same read-the-output-first discipline, applied to a fault rather than to a task.
