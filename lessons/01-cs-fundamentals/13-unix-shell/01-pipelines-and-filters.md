---
title: Pipelines and filters
prereqs: []
---

## What it is

Every command in a pipeline reads from one stream, writes its results to a second and its diagnostics to a third, and a pipe connects the output of one command to the input of the next. A filter is a command that reads text and writes transformed text, and most of the shell's power comes from combining filters rather than from any single tool. The exit status — 0 for success, anything else for failure — is the other half of the model, and it is what lets one command decide whether the next one runs.

## Why it matters

Composition is why the shell has outlived every attempt to replace it. A graphical tool has to implement every feature itself; a filter does 1 job and can then be piped into any other 1, with no coordination between the two. A pipeline also documents itself: the 5 stages below name exactly what was done to the data and in which order, so the command is a record that can be read back, repeated on another machine and dropped into a build. Once this clicks, a one-liner stops looking like an incantation and starts looking like a 5-line program.

## Core ideas

### Three streams, each doing one job

The three streams are numbered by file descriptor: 0 is standard input, where a command reads; 1 is standard output, where it writes results; 2 is standard error, where it writes diagnostics. Keeping the last two apart is what lets results flow into a pipe while errors still reach your terminal. Redirection sends one of those descriptors to a file, and the difference between overwriting and appending is 1 character.

```bash
sort names.txt > sorted.txt      # creates or truncates; a 200-line file becomes 0 lines plus the sorted output
sort names.txt >> history.txt    # appends; 200 lines become 200 lines plus the sorted output
grep error app.log 2> err.txt    # the 2 is a descriptor number: send stream 2 to the file, matches to the screen
grep error app.log > matches.txt 2>&1   # send stream 1 to the file, then point stream 2 at the same place
```

`>` truncates before the command runs, so a pipeline that writes its own input destroys the input first.

### A pipe hands one command's output to the next

The pipe operator joins the two processes: it wires stream 1 of the left command into stream 0 of the right one, so the left command never learns who is reading and the right one never learns who wrote. Build the pipeline from the left, running it after each addition, so a wrong field or flag shows up after 1 command instead of inside a confident final answer.

```text
orders.csv holds 8 lines: 1 header + 7 orders, 5 comma-separated fields each

cut -d, -f2 orders.csv     -d, means the field separator is a comma, -f2 takes the second field
  7 lines out, one endpoint per order:  /basket /home /basket /login /basket /home /basket

| sort                     equal endpoints become neighbours
  /basket /basket /basket /basket /home /home /login

| uniq -c                  -c prefixes each run of identical adjacent lines with its count
  4 /basket   2 /home   1 /login      4 + 2 + 1 = 7 lines accounted for

| sort -rn                 -n compares as numbers, -r reverses: 4, then 2, then 1
| head -5                  keeps the first 5 lines; only 3 exist, so all 3 print
```

The `sort` before `uniq -c` is not decoration: `uniq` compares only adjacent lines, so unsorted input would report `/basket` 4 separate times with a count of 1 each.

### The filter vocabulary is small and general

6 filters cover most text work: one selects lines by pattern, one cuts columns, one sorts, one collapses adjacent duplicates, one counts, one takes the first or last lines. Each reads standard input when given no filename, so they compose in any order, and a wrong order is visible as a wrong count rather than as an error.

```bash
grep -i "error" app.log | wc -l    # -i ignores case; -l counts newline characters, so a 500-line file with no trailing newline on its last line reports 499
awk -F, '{ sum += $3 } END { print sum }' sales.csv   # $3 is the third comma-separated field; sum keeps a running total; END prints it once, after the last line
sed 's/old-name/new-name/g' file.txt   # s/a/b/ replaces the first occurrence per line; the trailing g replaces every one, so 12 occurrences become 12 replacements
```

### Exit codes turn commands into conditions

A command reports success as exit status 0 and failure as anything else, which is why the same convention returns in every language that wraps one. The shell reads that status to decide what runs next, and `$?` holds the status of the last command, so it must be read before anything else runs.

```bash
make build && run-tests || echo "build or tests failed"
# && runs the right side only if the left exited 0; || runs its side only if the left exited non-zero

grep -q "ERROR" app.log; echo "exit was $?"
# -q asks for the status alone, with no matching lines printed
```

```text
grep -q "ERROR" app.log, exit status by case
  1 or more matches      0     success
  0 matches              1     failure: the pattern was not there
  app.log cannot be read 2     failure of a different kind, so a script can tell them apart

the shell adds two of its own:
  127   the command name was not found on the search path
  126   the file exists but has no execute permission
```

A script that ignores `1` and `2` cannot tell a quiet day from a missing log file.

### Compose with variables and command substitution

A command's output can become another command's argument with `$(...)`, and the shell can hold a value in a variable. This is where a pipeline grows into a small script. A variable's value is split into words on spaces unless you quote it, and that splitting is the quietest bug in shell scripting.

```bash
today=$(date +%F)                  # +%F prints the date as YYYY-MM-DD, so today holds 10 characters
tar -czf "backup-$today.tar.gz" ./data
# quoting keeps the whole name 1 argument; unquoted, a value with no spaces survives by luck

name="quarterly report.csv"
wc -l  $name     # the shell splits the value on the space: wc receives 2 names, "quarterly" and "report.csv"
wc -l "$name"    # the quotes make it 1 argument, so wc opens the 1 file the value names, and fails if it is absent
```

Prefer a short script with a name over an ever-cleverer one-liner once the pipeline needs a loop or a condition.

## Practice

### Build a report in one pipeline

From a log or CSV file, produce the 5 most frequent values in one column, with a count beside each. Start from the file and add 1 filter at a time, running the pipeline after each step.

Done when: the final pipeline prints at most 5 lines, each a value and its count, the counts add up to the number of lines the file held, and you can name what each of the stages contributes.

### Make a two-stream command

Run a command whose output you keep while its errors go to a file, then run a second command that only executes if the first succeeded.

Done when: the errors are in the file, the successful output reached your screen, and the conditional command behaved as its exit status required — you can state the status the first command returned.

## Common mistakes

- **Building a long pipeline in one go** — a wrong stage produces a confident, wrong answer with no error line, and 4 stages give 4 places to look; fix: add 1 stage at a time and check the intermediate output.
- **Ignoring exit codes** — a log file that cannot be read yields 0 lines, and an empty result is read as a valid one, so the failure looks like a quiet day; fix: chain with `&&`, or check `$?` before running anything else.
- **Leaving variables unquoted** — a value holding 1 space becomes 2 arguments, so `rm $file` removes 2 paths and reports the first as missing; fix: quote every variable expansion.
- **Mixing up overwrite and append** — `>` truncates first, so redirecting a file onto itself leaves 0 lines; fix: read the redirection operator before running the command.
- **Counting lines without `sort` before `uniq`** — `uniq` sees only adjacent duplicates, so a value appearing 4 times in unsorted input is reported as 4 counts of 1; fix: sort first, then count.

## Go deeper

- **Files, permissions and environment** (`01-cs-fundamentals/13-unix-shell/02-files-permissions-and-environment`) — where these commands read and write, and what they are allowed to touch.
- **Command-Line Interface** (`01-cs-fundamentals/24-command-line-interface`) — the habits that make this fluency sustainable day to day.
- **Operating Systems** (`01-cs-fundamentals/15-operating-systems`) — the streams, descriptors and processes that these pipes are built from.
