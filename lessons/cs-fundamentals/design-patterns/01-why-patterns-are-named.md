---
title: Why patterns are named
prereqs: ["cs-fundamentals/solid-principles"]
---

## What it is

A pattern is a description of a recurring problem, the forces that make it hard, and a solution shape with its consequences. The name is a handle onto all of that. Patterns came out of observing real code and noticing that the same structures kept reappearing, so the catalogue is descriptive rather than prescriptive: it records what works, along with what it costs.

## Why it matters

Two things go wrong without this framing. The first is treating patterns as ingredients — adding a factory "because factories are good" to a program with one implementation, and paying for indirection that solves nothing. The second is re-deriving a known solution badly, because the author did not know that the problem has a name and a documented set of pitfalls. Both cost time. Understanding that a pattern is a trade-off means the question is never "should I use a pattern" but "is this the cost I want to pay for this flexibility".

## Core ideas

### A pattern is a shared name for a trade-off

The name compresses a paragraph of design discussion into a word. If a pattern did not buy that compression, it would not be worth cataloguing — the code itself already expresses the structure. The value shows up in conversation: "make it an observer" or "that is a decorator wrapping a transport" lands in a review immediately and carries a known set of consequences.

```text
"we need a strategy here" ->
  an interface at the point of variation, chosen by the caller
```

### Every pattern costs indirection

A pattern almost always adds a type, an interface or a level of delegation. That cost is worth paying when the variation it accommodates is real and expected to grow, and not worth paying when it is hypothetical. Ask how many implementations exist today and how likely a third one is. One implementation and no plan for another is a function call wearing a costume. 

```text
direct:      caller -> implementation
strategy:    caller -> interface -> one implementation
```

### Patterns, idioms and anti-patterns

An idiom is a language-specific convention — the standard way to iterate, or to write an error type — and is not worth naming as a pattern because it is simply how the language is used. An anti-pattern is a shape that looks like a solution and reliably causes trouble, such as a class that knows about every other class. Naming it is useful precisely so it can be recognised and avoided.

### The problem must exist first

The most common misuse is applying a pattern to a problem you expect to have. Design for the variation that exists, and refactor toward the pattern when a second case appears. Refactoring into a pattern is usually cheap; removing one that turned out to be unnecessary means deleting types other code now depends on.

```text
two cases today  -> write the second case, see what it shares
three cases      -> extract the shape, name it, and refactor
```

### Patterns describe collaborations, not classes

What matters is how the pieces work together: who creates what, who calls whom, and which piece knows about which. Two implementations of the same pattern can look very different in code — one using inheritance, one using closures — and still be the same pattern, because the collaboration is the same. Read a pattern as a diagram of responsibilities rather than as a file to copy.

## Practice

### Name what you already have

Pick a piece of your own code where one function takes a flag or a mode and behaves differently depending on it. Decide whether the variation is real, and if it is, name the pattern that would describe the split.

Done when: you can state the pattern or state why no pattern is warranted, in one sentence each.

### Cost out a hypothetical pattern

Take a place in your code with a single implementation behind an interface. Write down what the interface would need to change if a second implementation were added, and what a direct call would cost instead.

Done when: you have a written answer for both directions and can say which cost you would rather pay now.

## Common mistakes

- **Applying a pattern to a problem you do not have yet** — indirection with no variation to justify it; fix: wait for the second or third case and refactor into the pattern then.
- **Believing patterns are a quality checklist** — the code acquires ceremony without gaining flexibility; fix: judge each pattern by the specific cost it charges.
- **Copying a pattern's class diagram literally** — the code grows types that exist only to match a diagram; fix: adapt the collaboration to the language and keep the responsibilities.
- **Confusing an idiom with a pattern** — ordinary language usage gets named as a design choice; fix: reserve pattern names for shapes that carry a real trade-off.
- **Using the name to end a discussion** — "that is a singleton" is not an argument; fix: name the pattern and then state the consequence you are worried about.

## Go deeper

- **SOLID Principles** (`cs-fundamentals/solid-principles`) — the design properties most patterns exist to achieve, so read it first.
- **The patterns that earn their keep** (`cs-fundamentals/design-patterns/02-the-patterns-that-earn-their-keep`) — the concrete set to learn once the framing is clear.
- **Code Reusability** (`cs-fundamentals/code-reusability`) — the same question about extracting a shared shape, asked before the pattern is named.
