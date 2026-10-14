---
title: Pseudocode
type: skill
topic: cs-fundamentals
tier: small
status: drafted
aliases: []
prereqs: []
related: []
---

## What it is

Pseudocode is the logic of a program written in plain, structured language instead of a programming language. It keeps the shapes that matter — sequence, condition, loop, function, return — and drops the ones that do not: types, punctuation, imports, a build step. You write it to find out whether an idea holds together before you invest in making it run.

## Why it matters

Most wasted programming time goes into making the wrong thing work. A compiler will happily accept a careful implementation of a confused design, and by the time the confusion surfaces the code has grown roots. Pseudocode moves that failure forward: a design that cannot be stated in plain language in twenty lines usually has a hole in it. It also gives you an artefact to show people who do not read your language — a designer, a product manager, the person who owns the database — so you get a useful answer before writing production code. Finally, a short pseudocode block above a dense function explains the intent faster, and more honestly, than the code does — for the next reader and for you in six months.

## Core ideas

### Structure first, syntax never

Pseudocode has vocabulary but no grammar you must satisfy. Use numbered steps, `if`/`else`, `while`, `for each` and named procedures, and write the rest as English. If you catch yourself worrying about semicolons, you have already written enough to start coding.

```text
parse(line):
  fields = split(line, ",")
  if fields is empty:
    return error "empty record"
  record = { id: fields[0], name: fields[1], amount: number(fields[2]) }
  return record
```

### One level of abstraction at a time

A block should describe one layer. If a step says "load the file, skip the header, split each line, validate the columns and insert the rows", that is five steps wearing one sentence. Name each step and move the detail into its own block. A reader should be able to stop at any level and still follow the story.

### Write the edges, not the happy path

The value of the exercise is in the branches you would otherwise forget: empty input, a value that is not a number, a file that does not exist, two records with the same key. Write them down as ordinary steps. If a path is genuinely impossible, say why in a line of prose; do not leave the reader guessing whether you thought about it.

```text
total = 0
rejected = 0
for each row in rows:
  amount = parse amount, or skip the row and rejected = rejected + 1
  total = total + amount
if rejected > 0:
  warn "skipped " + rejected + " rows"
return total
```

### Trace it by hand

Pseudocode is cheap to run in your head and expensive to run in production. Walk the smallest interesting input through the block line by line, writing each variable's value in the margin. This catches off-by-one errors, mutations you did not intend, and loops that never end — for the price of a few minutes.

## Practice

### Trace an algorithm you already know

Pick something you use without thinking — binary search, a merge of two sorted lists, the retry loop in your HTTP client. Write it as pseudocode from memory, then trace the input that makes it do the most work. Compare your version against the real implementation.

Done when: your trace ends with the expected result and you have written down at least one branch the real code has but your version did not.

### Design a feature before you open the editor

Choose the next small feature on your list. Write twenty lines of pseudocode covering its inputs, its outputs and its failure paths before you touch a file. Hand it to one person who did not write it and ask them to describe what it does.

Done when: the other person describes the behaviour you intended, and the code you write afterwards is shorter than your first instinct.

## Common mistakes

- **Writing code with the syntax deleted** — the result is unhelpful code rather than a design; fix: describe the intent of each block in a sentence before adding any steps.
- **Leaving out the failure paths** — the design looks complete until the first empty input arrives; fix: write the error and edge branches before the happy path.
- **Mixing levels of detail in one block** — a reader cannot tell which steps matter; fix: keep one layer per block and push detail into named sub-blocks.
- **Never tracing it** — a design that reads well can still loop forever; fix: walk one input through by hand and write the variable values down.
- **Keeping pseudocode as a stale document** — it drifts from the code and starts to mislead; fix: treat it as a sketch, keep the parts that still explain the code and delete the rest.

## Go deeper

- **Algorithms & Big-O** (`cs-fundamentals/algorithms-big-o`) — the vocabulary for judging whether the design you sketched will hold as its input grows.
- **Data Structures** (`cs-fundamentals/data-structures`) — most pseudocode decisions are really choices about the shape of the data.
- **Refactoring** (`cs-fundamentals/refactoring`) — how to change a working design in small steps once a trace exposes its weak point.
