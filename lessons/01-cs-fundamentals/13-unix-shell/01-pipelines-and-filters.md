---
title: Pipelines and filters
prereqs: []
---

## What it is

Every command in a pipeline has an input stream, an output stream and a separate stream for errors, and a pipe connects the output of one command to the input of the next. A filter is a command that reads text and writes transformed text, and most of the shell's power comes from combining filters rather than from any single tool. The exit status — zero for success, non-zero for failure — is the other half of the model, and it is what lets commands make decisions.

## Why it matters

The composition style is why the shell has outlived every attempt to replace it. A new graphical tool has to implement every feature; a new command-line filter only has to do one thing and it immediately combines with everything else. Reading a pipeline tells you exactly what was done to the data and in what order, which makes it a form of documentation as well as an operation. Once this clicks, shell one-liners stop looking like incantations and start looking like short programs.

## Core ideas

### Three streams, each doing one job

Standard input is where a command reads, standard output is where it writes results, and standard error is where it writes diagnostics. Keeping errors separate means you can pipe the results somewhere while the errors still reach your terminal — which is exactly what you want when a long job is producing output. Redirection sends a stream to a file, and the difference between overwriting and appending is one character.

```bash
sort names.txt > sorted.txt      # overwrite
sort names.txt >> history.txt    # append
grep error app.log 2> err.txt    # errors to a file, matches to the screen
```

### A pipe hands one command's output to the next

The pipe is the whole idea: write each step as a small transformation and connect them. A single pipeline can filter, sort, count and format with no temporary file and no scripting. Build it from the left, running it after each addition, so you can see the intermediate result and catch a mistake immediately.

```bash
cut -d, -f2 orders.csv | sort | uniq -c | sort -rn | head -5
```

### The filter vocabulary is small and general

A handful of filters covers most text work. One selects lines by pattern, one cuts columns, one sorts, one collapses adjacent duplicates, one counts, one takes the first or last lines, one substitutes text. Because each reads from standard input, they compose in any order, and learning six well beats learning sixty badly.

```bash
grep -i "error" app.log | wc -l        # count matching lines
awk -F, '{ sum += $3 } END { print sum }' sales.csv   # sum a column
sed 's/old-name/new-name/g' file.txt  # replace every occurrence
```

### Exit codes turn commands into conditions

A command reports success as zero and failure as anything else, which is why the same convention appears in every language that wraps one. The shell can chain on that: run the next command only if this one worked, or only if it failed. Scripts and CI pipelines are built from exactly this, and it is the reason a well-behaved program must return a meaningful status rather than always succeeding.

```bash
make build && run-tests || echo "build or tests failed"
grep -q "ERROR" app.log; echo "exit was $?"
```

### Compose with variables and command substitution

A command's output can become another command's argument, and the shell can hold values in variables. This is where a pipeline grows into a small script. Quote variables when they may contain spaces, and prefer writing a short script over an increasingly clever one-liner once the pipeline needs a loop or a conditional.

```bash
today=$(date +%F)
tar -czf "backup-$today.tar.gz" ./data
```

## Practice

### Build a report in one pipeline

From a log or CSV file, produce the five most frequent values in one column, with a count beside each. Start from the file and add one filter at a time, running the pipeline after each step.

Done when: the final pipeline prints five lines, each a value and its count, and you can name what each stage contributes.

### Make a two-stream command

Run a command whose output you keep while its errors go to a file, then run a second command that only executes if the first succeeded.

Done when: the errors are in the file, the successful output reached your screen, and the conditional command behaved as its exit status required.

## Common mistakes

- **Building a long pipeline in one go** — a mistake anywhere produces a confident, wrong answer; fix: add one stage at a time and check the intermediate output.
- **Ignoring exit codes** — a failing command's empty output is read as a valid result; fix: chain with `&&`, or check the status explicitly.
- **Leaving variables unquoted** — a value with a space becomes two arguments and the command quietly does the wrong thing; fix: quote every variable expansion.
- **Mixing up overwrite and append** — `>` destroys the previous contents of the file; fix: read the redirection operator before running the command.
- **Writing a one-liner that needs a paragraph to explain** — the next reader cannot safely change it; fix: put it in a script with a name and a comment.

## Go deeper

- **Files, permissions and environment** (`01-cs-fundamentals/13-unix-shell/02-files-permissions-and-environment`) — where these commands read and write, and what they are allowed to touch.
- **Command-Line Interface** (`01-cs-fundamentals/24-command-line-interface`) — the habits that make this fluency sustainable day to day.
- **Operating Systems** (`01-cs-fundamentals/15-operating-systems`) — the streams, processes and signals that these pipes are built from.
