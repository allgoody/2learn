---
title: Data and iteration
prereqs: ["backend-data/python-programming/01-language-basics"]
---

## What it is

Python's built-in collections — list, tuple, dictionary, set — plus the comprehension syntax and the iteration protocol that all of them implement. A dictionary maps keys to values with fast lookup; a set stores unique values; a list is an ordered, mutable sequence; a tuple is an ordered, immutable one. Iteration is a protocol rather than a syntax: anything that can produce values one at a time can appear in a loop.

## Why it matters

Choosing the right collection is the single largest performance decision in ordinary Python, far larger than micro-optimising a loop. Looking something up in a dictionary is effectively constant time while scanning a list is proportional to its length, so a program that searches a list inside a loop can be quadratic without looking like it. Iteration matters for the same reason: a generator that produces values on demand keeps memory flat where a list would hold everything at once.

## Core ideas

### The four collections answer different questions

A list answers "what is at position n" and preserves order; a dictionary answers "what is the value for this key" quickly; a set answers "is this present" quickly and removes duplicates; a tuple is an ordered value that cannot change, and therefore can be used as a dictionary key. The choice is made by the question the code asks most often, not by which type is most familiar.

```text
members = [1, 2, 3]                 -> ordered, indexable, lookup is a scan
index   = {1: "a", 2: "b"}         -> lookup by key, constant time
unique  = {1, 2, 3}                -> membership test, constant time
point   = (3, 4)                   -> immutable, usable as a key
```

### Comprehensions express a transformation without the loop boilerplate

A comprehension builds a collection from an iterable in one expression, optionally filtering. It is readable when it stays close to natural language and becomes hostile when it nests or carries side effects. The useful rule is to keep one `for` and at most one `if`, and to use an ordinary loop otherwise.

### Iteration is lazy, and generators make it lazier

Anything iterable can appear in a `for` loop, including a file, a database cursor and a generator. A generator function yields values as they are requested, so a pipeline of generators processes one item at a time and holds only the current item in memory. That is what makes it possible to process a file larger than memory.

```text
def rows(path):
    with open(path) as f:
        for line in f:
            yield line.strip()
```

### Sorting and grouping are driven by keys and dictionaries

Sorting takes a key function rather than a comparison, which keeps the common cases short. Grouping is usually a dictionary whose values are lists, and the `setdefault` or `defaultdict` pattern removes the branch that would otherwise precede every append. Both are the ordinary way to turn a stream of records into a structure.

### Copying is shallow unless it says otherwise

Copying a list duplicates the outer container but not the objects inside it, so modifying a nested list is visible through both copies. This is the same reference model as before, one level deeper, and it is the source of bugs that appear to modify an unrelated value.

### Dictionary ordering is now guaranteed, but that is not a reason to rely on it

Dictionaries preserve insertion order, which makes them convenient for records. That guarantee is about iteration, not about meaning: a structure that depends on order for correctness should be an ordered type explicitly, so a reader can see the intent.

## Practice

### Replace a quadratic scan with a lookup

Take a function that checks membership by scanning a list inside a loop over another list, and rewrite it with a set.

Done when: the rewritten version returns the same results on the same input and you can state why its cost is no longer proportional to both lengths.

### Process a large file lazily

Write a pipeline of generator functions that reads a file, filters lines and yields a transformed value, and confirm the memory used does not grow with the file.

Done when: a file several times larger than the available memory is processed successfully and produces the same result as a non-lazy version on a small input.

## Common mistakes

- **Searching a list inside a loop** — the cost becomes quadratic; fix: use a set or dictionary for membership and lookup.
- **Building a list when only the first match is needed** — memory and time are spent on values that are discarded; fix: use a generator or break out of the loop.
- **Copying nested structures shallowly** — the inner objects are still shared; fix: copy deeply, or better, treat the data as immutable.
- **Nesting comprehensions for their own sake** — the expression stops being readable; fix: use a loop with a name for each step.
- **Relying on dictionary order for correctness** — order comes from insertion, not intent; fix: use an explicitly ordered structure when order matters.

## Go deeper

- **Language basics** (`backend-data/python-programming/01-language-basics`) — including the reference model these collections obey.
- **Python Programming** (`backend-data/python-programming`) — the language these collections and loops belong to.
- **Modules and packaging** (`backend-data/python-programming/03-modules-and-packaging`) — how the code built from these structures is organised and shared.
