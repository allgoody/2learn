---
title: Names and small functions
prereqs: []
---

## What it is

A name is the interface between the code and the person reading it, and a function is the unit that name attaches to. Everything else in clean code follows from taking those two seriously: a name that says what the thing is, and a function small enough that the name can honestly describe all of it. When a function is hard to name, that is usually a message that it is doing more than one thing.

## Why it matters

Most of the time spent on a change is spent understanding the behaviour that is already there, and a vague name charges that cost on every line it appears on. Take a 60-line function that holds today's orders in a value named `data`: the reader meets the name 9 times, and at each of those 9 places the meaning of `data` is not on the line in front of them, so they must recall what the earlier lines stored in it before they can read the line they are on. Rename it `ordersPlacedToday` and all 9 look-ups become reads, because the answer arrives with the name. Renaming is the cheapest edit there is — a compiler checks every use of the old name at once, so a missed one is an error rather than a silent change of meaning — and it pays back on every later read of the file.

## Core ideas

### A name should say what, not how

A name is a claim about the value inside it, and the reader acts on that claim without checking it. State the meaning of the value rather than its type or its origin: `activeUsers` tells the reader which users are in the list, while `list` only reports that a list exists. The unit belongs in the name as well, because a value has no meaning without one — `Date.now()` returns milliseconds, so a value named `elapsedSeconds` is wrong by a factor of 1000, since one second is 1000 milliseconds, and every piece of arithmetic that uses it is wrong with it.

```ts
const t = Date.now() - startedAt;                     // 1500 — what unit?
const elapsedMilliseconds = Date.now() - startedAt;   // 1500 ms, and 1500 / 1000 = 1.5 s
```

Length is not the enemy: `elapsedMilliseconds` is 19 characters and `t` is 1, and the long precise name wins every time. A boolean name reads as a question or a predicate, so the condition around it reads as a sentence: `if (subscription.isActive)` states the check, `if (subscription.flag)` makes the reader look up which flag.

### A function should do one thing

The test is whether you can describe the function in one sentence with no "and" in it. "Sums the lines and rounds the total" fails the test: that is two jobs, and each one has its own reason to change. A small function has few moving parts, so the reader holds the whole body at once and the name carries the rest.

```ts
function invoiceTotal(lines) {
  const subtotal = sumLines(lines);
  const tax = computeTax(subtotal);
  return subtotal + tax;
}
```

The body above is 3 lines and 3 calls. Changing how tax is computed edits `computeTax` — 1 of those 3 names — and the other 2 calls are not opened at all. That is the whole benefit, stated as a count: 1 reason to change, 1 place to change, and 2 functions the reader can leave alone. The test is not the line count; a 12-line body with two jobs is still two functions, and a 30-line body with one job and no branches is still one.

### Push detail down, keep the top level readable

The function that coordinates should read like a summary. Each line is one step at the same level, and the low-level detail — splitting a string, calling an awkward API — lives one call deeper. This is what makes a file navigable: the reader stops at the level they need instead of wading through detail that is not relevant to them yet.

```ts
function importCsv(path) {
  const rows = readRows(path);
  const records = rows.map(parseRecord).filter(Boolean);
  return saveRecords(records);
}
```

`importCsv` holds 3 steps, so reading it costs 3 lines; the file reading sits in `readRows` and the comma splitting sits in `parseRecord`, each reachable by name when that is the step you are changing. A reader who only wants the order of the steps reads 3 lines, not the 40 the three helpers would take inline, and a change to how a line is split touches 1 function rather than the coordinating one.

### Keep the number of parameters small

Each parameter is another value the caller must supply, in the right position, on every call. Two or three are comfortable; a fourth usually means the function needs a concept that has not been named yet. Boolean parameters are the sharper case, because they put two behaviours behind one name and each extra one doubles the number of ways the function can be called: 1 boolean gives 2^1 = 2 combinations, 2 booleans give 2^2 = 2 * 2 = 4, and 3 booleans give 2^3 = 2 * 2 * 2 = 8.

```ts
// 1 boolean, 2^1 = 2 behaviours behind one name
render(record, true);     // summary
render(record, false);    // detail

// one behaviour each, so the name says which one
renderSummary(record);
renderDetail(record);
```

Three booleans give 8 call shapes, so a test suite that covers the function honestly needs 8 cases, and a caller reading the call site sees none of them. Two functions with names that say which behaviour they provide need 1 case each, and the compiler enforces the choice.

### Comments explain why, not what

The code already says what it does. A comment earns its place by recording something the code cannot: a constraint from outside, a workaround with a reason, a decision that looks wrong but is deliberate. A comment that restates the next line makes the reader read that line twice — once as prose, once as code — and the two readings can drift apart: rename a value and the comment above it keeps the old name and the old unit.

```ts
// the provider rejects a batch over 5 MB, so cap the batch at 4 MB
const batchSize = 4 * 1024 * 1024;   // 4 194 304 bytes
```

The numbers are checkable from the comment alone: 5 MB is 5 * 1024 * 1024 = 5 242 880 bytes and 4 MB is 4 * 1024 * 1024 = 4 194 304 bytes, so the cap leaves 5 242 880 - 4 194 304 = 1 048 576 bytes, one megabyte of headroom under the limit. A comment that says what the line already says spends the reader's attention and returns nothing: `counter++;  // increment the counter` adds 0 information and 1 more place to keep in step with the code.

## Practice

### Rename a function until the call site reads well

Pick the worst-named function in a file you maintain. Write its call site as an English sentence — for example "the active users, ordered by spend, capped at ten" — then rename the function and its parameters until the call site reads like that sentence, with no flags and no abbreviations.

Done when: the call site is understandable without opening the function, the rename changed no logic, and your existing tests pass without a single edit.

### Split one function into steps

Take a function longer than about twenty lines and rewrite it as a sequence of named steps at one level, each step a small function of its own, with the low-level work moved down into those helpers.

Done when: the original function reads as three or four calls and nothing else, and its tests still pass unchanged.

## Common mistakes

- **Naming a function for how it works** — `stringSplitAndJoin` names the two steps inside the body, so the caller must open it to learn the outcome; fix: name the outcome the caller wants, such as `parseCsvLine`.
- **Keeping a function long to avoid "too many functions"** — a 200-line body gives the reader 200 lines to hold before they can change any of it; fix: split by step, not by line count, so every name is one honest sentence.
- **Using comments to repair a bad name** — the name stays wrong, the comment repeats it, and the two drift apart on the next rename; fix: rename first, then comment only what the code cannot say.
- **Abbreviating to save typing** — `usrMgr`, 6 characters standing in for "user manager", costs the reader a translation at each of its occurrences; fix: write the name out in full and let the editor's autocomplete do the typing.
- **Leaving a boolean parameter** — 1 flag hides 2 behaviours behind 1 name, and the two paths age apart; fix: split into two functions whose names say which behaviour each one provides.

## Go deeper

- **Structure and error handling** (`01-cs-fundamentals/08-clean-code/02-structure-and-error-handling`) — the next half of the habit: ordering and failure paths, once the pieces are small.
- **Code Reusability** (`01-cs-fundamentals/16-code-reusability`) — how far to take extraction before shared code becomes a burden.
- **Refactoring** (`01-cs-fundamentals/19-refactoring`) — how to make these renames and splits safely in code you did not write.
