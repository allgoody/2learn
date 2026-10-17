---
title: Pseudocode
type: skill
topic: 01-cs-fundamentals
tier: small
status: drafted
aliases: []
prereqs: []
related: []
---

## What it is

Pseudocode is the logic of a program written in plain, structured language instead of a programming language. It keeps the shapes that matter — sequence, condition, loop, function, return — and drops the ones that do not: types, punctuation, imports, a build step. You write it to find out whether an idea holds together before you spend the hours it takes to make it run.

## Why it matters

Most wasted programming time goes into making the wrong thing work, and the bill arrives as code that has to be thrown away. A compiler accepts a careful 200-line implementation of a confused design, and by the time the confusion surfaces those 200 lines have tests, callers and a place in the module graph. Twenty lines of pseudocode state the same design in twenty lines, so an empty input that nothing handles, or a loop that never ends, is visible in a few minutes instead of in a review days later. It also gives you an artefact to show people who do not read your language — a designer, a product manager, the person who owns the database — so you get a useful answer before writing production code. Finally, a short pseudocode block above a dense function explains the intent faster, and more honestly, than the code does — for the next reader and for you in six months.

## Core ideas

### Structure first, syntax never

Pseudocode has vocabulary but no grammar you have to satisfy. Use numbered steps, `if`/`else`, `while`, `for each` and named procedures, and write the rest as English. If you catch yourself worrying about semicolons, the block already holds every decision it is going to hold, and the language you pick afterwards cannot change them.

```text
parse(line):
  fields = split(line, ",")          split returns the pieces of the line as a list
  record = { id: fields[0], name: fields[1], amount: number(fields[2]) }
  return record

the block holds 3 steps and settles 3 things: the separator is a comma, the third
piece — position 2, because counting starts at 0 — is the amount, and the amount is
read as a number rather than as text
```

### One level of abstraction at a time

A block should describe one layer of the work. If a step says "load the file, skip the header, split each line, validate the columns and insert the rows", that is five steps wearing one sentence, and a reader cannot tell which of the five is the one under discussion. Name each step and move its detail into a block of its own, so that a reader can stop at any level and still follow the story.

```text
one level:
  process(file):
    rows = read_rows(file)
    valid, rejected = validate(rows)
    insert(valid)
    report(rejected)

the next level down, for the one step that needs it:
  read_rows(file):
    lines = read all lines of file
    drop line 0 if it is a header
    return split each remaining line on ","
```

### Write the edges, not the happy path

The value of the exercise is in the branches you would otherwise forget: an empty input, a value that is not a number, a file that does not exist, two records with the same key. Write them down as ordinary steps. If a path is genuinely impossible, say why in one line of prose, so that the reader knows it was considered rather than missed.

```text
rows: 100 lines read from one file
  90 ordinary rows
   3 blank lines
   2 repeated header rows
   5 rows whose amount is not a number

total = 0
rejected = 0
for each row in rows:
  amount = the amount field, read as a number
  if the row is blank, or is a repeated header, or has no number:
    rejected = rejected + 1
    continue
  total = total + amount

after the loop: 100 = 90 added + 10 rejected
10 rejected = 3 blank + 2 headers + 5 bad amounts
the total is short by the amounts of the 5 rows that could not be read, and the count
of 10 is printed, so neither silence nor a wrong total hides the loss
```

### Trace it by hand

Pseudocode is cheap to run in your head and expensive to run in production, and a trace is the whole price you pay. Walk the smallest interesting input through the block line by line, writing each variable's value in the margin. An off-by-one error, a mutation you did not intend and a loop that never ends all show up in the trace, for a few minutes of your attention rather than a deploy.

```text
binary search for 70 in the sorted list [10, 20, 30, 40, 50, 60, 70]
  the list holds 7 values, at indexes 0 to 6
  low  = 0, the first index the value could sit at
  high = 6, the last index it could sit at
  mid  = the index halfway between low and high, rounded down

step 1: mid = (0 + 6) / 2 = 3;  list[3] = 40 < 70 -> low = 4
step 2: mid = (4 + 6) / 2 = 5;  list[5] = 60 < 70 -> low = 6
step 3: mid = (6 + 6) / 2 = 6;  list[6] = 70 = 70 -> found after 3 comparisons

3 comparisons for 7 values; for 1 000 000 values it is at most 20, because
2^20 = 1 048 576 >= 1 000 000, so 20 halvings are enough to reach any one of the indexes
```

Written as `while low < high` instead of `while low <= high`, step 3 never runs, because `low` = 6 is not less than `high` = 6, and the search reports that 70 is absent; the last slot is exactly the case a trace exists to catch.

## Practice

### Trace an algorithm you already know

Pick something you use without thinking — binary search, a merge of two sorted lists, the retry loop in your HTTP client. Write it as pseudocode from memory, then trace the input that makes it do the most work: for a search over 1 000 000 sorted values that is 20 probes, because 2^20 = 1 048 576 >= 1 000 000. Compare your version against the real implementation.

Done when: your trace ends with the expected result in at most 20 probes, and you have written down at least one branch the real code has but your version did not.

### Design a feature before you open the editor

Choose the next small feature on your list. Write 20 lines of pseudocode covering its inputs, its outputs and its failure paths before you touch a file. Hand it to one person who did not write it and ask them to describe what it does.

Done when: the other person describes the behaviour you intended, and the code you write afterwards is shorter than the implementation you would have written on instinct.

## Common mistakes

- **Writing code with the syntax deleted** — the result is code without a compiler, so the reader gets 20 lines of mechanics and no statement of intent; fix: describe what each block achieves in one sentence before adding any steps.
- **Leaving out the failure paths** — the design looks complete until the first empty input arrives, and then 1 unhandled case stops the run; fix: write the error and edge branches before the happy path.
- **Mixing levels of detail in one block** — a reader cannot tell which of the 5 steps matter, so the review discusses the wrong ones; fix: keep one layer per block and push detail into named sub-blocks.
- **Never tracing it** — a design that reads well can still loop forever, and a loop that never ends costs the whole program rather than one record; fix: walk one input through by hand and write the variable values down.
- **Keeping pseudocode as a stale document** — it drifts from the code one field at a time and then misleads the next reader; fix: treat it as a sketch, keep the parts that still explain the code and delete the rest.

## Go deeper

- **Algorithms & Big-O** (`01-cs-fundamentals/14-algorithms-big-o`) — the vocabulary for judging whether the design you sketched will still hold as its input grows.
- **Data Structures** (`01-cs-fundamentals/02-data-structures`) — most pseudocode decisions are really choices about the shape of the data.
- **Refactoring** (`01-cs-fundamentals/19-refactoring`) — how to change a working design in small steps once a trace exposes its weak point.
