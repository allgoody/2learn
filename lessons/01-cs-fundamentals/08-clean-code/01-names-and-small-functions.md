---
title: Names and small functions
prereqs: []
---

## What it is

A name is the interface between the code and the person reading it. A function is the unit that name attaches to. Everything else in clean code follows from taking those two seriously: a name that says what the thing is, and a function small enough that the name can honestly describe all of it. When a function is hard to name, that is usually a message that it is doing more than one thing.

## Why it matters

Most of the time spent on a change is spent understanding the current behaviour, and bad names inflate that cost directly. A variable called `data` or `temp` forces the reader to trace where it came from and what it holds. A function called `process` forces them to read the whole body to find out if it validates, transforms or saves. Renaming is the cheapest refactoring there is — it cannot break anything if the tools are honest — and it is the one that pays back on every read afterwards.

## Core ideas

### A name should say what, not how

Prefer a name that states the meaning of the value over one that describes its type or its origin. `elapsedSeconds` beats `t`; `activeSubscriptions` beats `list`. Length is not the enemy — a long precise name beats a short cryptic one every time, and the usual convention that booleans read as a question or a predicate makes conditions read as sentences.

```ts
// unclear
const d = users.filter((u) => u.a === 1);

// states intent
const activeUsers = users.filter((user) => user.status === "active");
```

### A function should do one thing

The test is whether you can describe it in one sentence without "and". If the sentence needs "and", there are two functions inside. This is not about line counts for their own sake: a small function has few moving parts, so a reader can hold the whole thing at once, and the name tells them the rest.

```ts
function invoiceTotal(lines) {
  const subtotal = sumLines(lines);
  const tax = computeTax(subtotal);
  return subtotal + tax;
}
```

### Push detail down, keep the top level readable

The function that coordinates should read like a summary. Each line is one step at the same level, and the low-level detail — string manipulation, bit flags, an awkward API — lives one call deeper. This is what makes a file navigable: the reader can stop at the level they need instead of wading through detail that is not relevant to them yet.

```ts
function importCsv(path) {
  const rows = readRows(path);
  const records = rows.map(parseRecord).filter(Boolean);
  return saveRecords(records);
}
```

### Keep the number of parameters small

Each parameter is another thing a caller must get right, and a long parameter list usually means the function needs a concept that has not been named yet. Two or three are comfortable; beyond that, look for a value that groups naturally, or split the function at a real boundary. Boolean parameters are a special case: they hint that the function has two behaviours behind one name, so they often want to become two functions.

```ts
// two behaviours behind one flag
render(record, true);

// one behaviour each
renderSummary(record);
renderDetail(record);
```

### Comments explain why, not what

The code already says what it does. A comment earns its place by recording something the code cannot: a constraint from outside, a workaround with a reason, a decision that looks wrong but is deliberate. A comment that restates the next line, or that has drifted out of date, is noise that makes the reader trust the file less.

## Practice

### Rename a function until the call site reads well

Pick the worst-named function in a file you maintain. Write the call site as an English sentence, then rename the function and its parameters until the call site reads like that sentence.

Done when: the call site is understandable without opening the function, and the change was a pure rename with no behaviour edits.

### Split one function into steps

Take a function longer than about twenty lines and rewrite it as a sequence of named steps at one level, with each step a small function of its own.

Done when: the original function reads as a summary of three or four calls, and its tests still pass unchanged.

## Common mistakes

- **Naming a function for how it works** — `stringSplitAndJoin` describes the mechanism, not the purpose, so the caller must read it; fix: name the outcome the caller wants.
- **Keeping a function long to avoid "too many functions"** — the file feels tidy and the reader cannot hold any of it; fix: split by step, not by line count.
- **Using comments to repair a bad name** — the name stays wrong and the comment drifts; fix: rename first, and only comment what the code cannot say.
- **Abbreviating to save typing** — `usrMgr` costs the reader a translation on every occurrence; fix: write the name out, and let the editor autocomplete do the typing.
- **Leaving a boolean parameter** — every call site reads as a puzzle and the two paths age differently; fix: split into two functions with names that say which behaviour each one provides.

## Go deeper

- **Structure and error handling** (`01-cs-fundamentals/08-clean-code/02-structure-and-error-handling`) — the next half of the habit: ordering and failure paths, once the pieces are small.
- **Code Reusability** (`01-cs-fundamentals/16-code-reusability`) — how far to take extraction before shared code becomes a burden.
- **Refactoring** (`01-cs-fundamentals/19-refactoring`) — how to make these renames and splits safely in code you did not write.
