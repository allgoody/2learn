---
title: Language basics
prereqs: ["backend-data/python-programming"]
---

## What it is

The basics of Python are the pieces every program is made of: values of several built-in types, variables that simply point at them, conditionals, loops, functions, and the indentation that delimits blocks. Types are attached to values rather than to names, checked while the program runs, and a function's arguments can be given defaults and names. This is enough to write a complete program, and everything later is built on it.

## Why it matters

The language's design choices surface here and shape everything else. Because indentation is syntax, formatting is not a matter of taste and code reads the same everywhere. Because types are attached to values, a name can hold a string and later an integer, which is flexible and is also why type errors appear at runtime rather than at build time. Because names are references rather than boxes, two names can point at the same mutable object — the source of a whole family of bugs that become obvious once the model is understood.

## Core ideas

### Names point at values

Assignment attaches a name to an object; it does not copy the object. Two names can therefore refer to the same list, and changing it through one is visible through the other. Types belong to the objects, not the names, which is why a single name can be reused for values of different types and why a type checker needs annotations to help.

```text
a = [1, 2]
b = a          -> b is the same list as a
b.append(3)    -> a is now [1, 2, 3]
```

### Immutable and mutable values behave differently

Numbers, strings and tuples cannot be changed once created; lists, dictionaries and sets can. This is what makes some values safe to share and use as dictionary keys, and what makes others dangerous to pass into functions that might modify in place. Choosing an immutable value when the data should not change removes an entire class of surprise.

### Indentation is the block structure

There are no braces; a consistent indent defines what is inside a block. Tabs and spaces must not be mixed, which the interpreter enforces. The consequence is that every Python file is formatted similarly, which is a real benefit for reading unfamiliar code.

### Functions are objects, and arguments have two conventions

A function can be passed around like any other value, which is how sorting keys, callbacks and decorators work. Arguments can be passed by position or by name, and may have defaults — with the well-known trap that a default mutable value is created once and shared across calls, so it accumulates between them.

### Exceptions are the error channel, and they should be specific

An exception propagates up the call stack until something catches it, and the type of the exception is the information the handler needs. Catching everything hides programming errors as well as expected failures, so catching the narrowest type that can occur keeps unexpected problems visible.

### The context manager is the standard resource pattern

Files, locks and connections support a `with` block that guarantees cleanup even if an exception occurs. Using it removes the need to remember a close call on every path, which is why it is the expected form rather than a nicety.

## Practice

### Demonstrate the reference model

Create a list, assign it to a second name, modify it through the second name, and then repeat with a tuple.

Done when: you can explain why the list changed and the tuple raised an error.

### Write a function with a safe default

Write a function with an optional list argument, call it twice without the argument, and observe the accumulated result; then fix the default.

Done when: two successive calls without the argument produce identical results.

## Common mistakes

- **Using a mutable default argument** — the value is shared between calls and accumulates; fix: default to `None` and create the value inside.
- **Assuming assignment copies** — two names share one object; fix: copy deliberately when a copy is needed.
- **Catching every exception** — programming errors are hidden alongside expected failures; fix: catch the narrowest useful type.
- **Opening a file without a context manager** — a close is skipped on the error path; fix: use `with`.
- **Relying on a variable having a type** — the error appears only when that line runs; fix: annotate and check the types at the boundaries.

## Go deeper

- **Python Programming** (`backend-data/python-programming`) — the language these basics belong to, so read it first.
- **Data and iteration** (`backend-data/python-programming/02-data-and-iteration`) — the collections and loops that most Python code is made of.
- **Concurrency & Async Programming** (`cs-fundamentals/concurrency-async-programming`) — the general model behind Python's asynchronous and threaded options.
