---
title: Why patterns are named
prereqs: ["01-cs-fundamentals/09-solid-principles"]
---

## What it is

A pattern is a description of a recurring problem, the forces that make it hard, and a solution shape with its consequences. The name is a handle onto all of that. Patterns came out of observing real code and noticing that the same structures kept reappearing, so the catalogue is descriptive rather than prescriptive: it records what works, along with what it costs. The best-known catalogue lists 23 of them, and the number stays that small because a shape has to recur across many codebases before it earns a name of its own.

## Why it matters

Two things go wrong without this framing: adding a factory "because factories are good" to a program with one implementation, and re-deriving a known solution badly because the author did not know that the problem has a name and a documented set of pitfalls. The first failure is countable — an interface with one implementation puts 1 extra hop in front of every call, and with the implementation count at 1 that hop buys nothing — while the second shows up as a defect the catalogue already records. Take the observer whose notify loop removes a finished subscriber while iterating: give the loop 4 subscribers, `[a, b, c, d]`, and removing `a` at index 0 shifts `b, c` and `d` each one place down, so the loop's next index 1 now reaches `c` and `b` is never notified — 2 of the 4 subscribers notified, and nothing in the code says so. Both failures come from the same missing sentence, what the shape costs and when it pays, which is why the question is never "should I use a pattern" but "is this the cost I want to pay for this flexibility".

## Core ideas

### A pattern is a shared name for a trade-off

The name compresses a paragraph of design discussion into a word, and the compression only works because the reader has agreed what the word stands for. If a pattern did not buy that compression, it would not be worth cataloguing — the code itself already expresses the structure. The value shows up in conversation: "make it an observer" or "that is a decorator wrapping a transport" lands in a review immediately and carries a known set of consequences.

```text
"make it a strategy"

takes 3 words and expands to:
  1 seam, the interface at the point of variation    the thing the caller chooses between
  N implementations, 1 per algorithm                 N = 2 means two real alternatives
  1 selection step, taken by the caller              the choice stays outside the algorithm
  1 extra hop per call: caller -> interface -> implementation

the name is 3 words because the consequences it stands for are already agreed,
not because there is nothing to say
```

### Every pattern costs indirection

A pattern almost always adds a type, an interface or a level of delegation. That cost is worth paying when the variation it accommodates is real and expected to grow, and not worth paying when it is hypothetical. Ask how many implementations exist today and how likely a third one is: one implementation with no plan for another is a function call wearing a costume.

```text
3 call sites, each reaching a price calculation

direct call      caller -> price()                    1 hop, 1 type
strategy, N = 1  caller -> Pricing -> RetailPricing   2 hops, 2 types (1 interface + 1 implementation)
strategy, N = 3  caller -> Pricing -> one of 3        2 hops, 4 types (1 interface + 3 implementations)

adding a 2nd implementation
  direct:   3 call sites must now choose -> 3 edits
  strategy: 1 new class + 1 line where it is chosen -> 1 + 1 = 2 edits
  the 2 hops were paid on every call in between, for a variation that had not arrived
```

### Patterns, idioms and anti-patterns

An idiom is a language-specific convention — the standard way to iterate, or to write an error type — and is not worth naming as a pattern because it is simply how the language is used: there is no choice to record, so a name would compress nothing. An anti-pattern is the other extreme, a shape that looks like a solution and reliably causes trouble, such as a class that knows about every other class. Naming it is useful precisely so it can be recognised and avoided, and its cost can be counted.

```text
a class that knows about every other class, 20 classes, each holding a reference to the other 19

pairs = 20 * 19 / 2 = 190
  (divided by 2 because "A holds B" and "B holds A" are one pair)
edit 1 of the 20 classes and up to 19 others can be affected

the same 20 classes behind 1 shared interface:
  20 implementations, 1 dependency each, 20 edges instead of 190
```

### The problem must exist first

The most common misuse is applying a pattern to a problem you expect to have. Design for the variation that exists, and refactor toward the pattern when a second case appears. Refactoring into a pattern is usually cheap because the code you move is already written and working; removing one that turned out to be unnecessary is the expensive direction, because it means deleting types other code now depends on.

```text
cases to handle, and the shape that handles them cheapest

1 case   1 direct call                          1 implementation, 0 extra types, 1 hop
2 cases  1 conditional at 1 selection site     2 branches, 0 extra types, 1 hop
3 cases  a named shape behind 1 interface      3 implementations, 2 hops

coming back from that shape, assuming one type per file:
  3 callers + 3 implementations = 6 files to edit to reach what a conditional gives at 2 cases
  at 2 cases the same journey costs 0 files: the conditional is already there
```

### Patterns describe collaborations, not classes

What matters is how the pieces work together: who creates what, who calls whom, and which piece knows about which. Two implementations of the same pattern can look very different in code — one using inheritance, one using closures — and still be the same pattern, because the collaboration is the same. Read a pattern as a diagram of responsibilities rather than as a file to copy.

```text
a strategy has the same 3 roles in every language and in both spellings

  the caller          decides which implementation runs, once per call
  the interface       names the operation and hides which implementation answers
  the implementation  holds one algorithm, and knows nothing about the others

class spelling:    caller -> Pricing -> RetailPricing    3 types, 2 hops, 3 files (1 type each)
closure spelling:  caller -> { retail: () => 1.2, ... }  1 object, 2 hops, 1 file

same roles, same 2 hops: the spelling changes the file count, not the collaboration
```

## Practice

### Count the variation before you name it

Pick a piece of your own code where one function takes a flag or a mode and behaves differently depending on it. Count three things before you decide: the number of branches the flag selects between, the number of call sites that pass it, and the number of extra types an extraction would add.

Done when: you have written down all three counts, and one sentence saying whether the variation is real or whether no pattern is warranted.

### Cost out a hypothetical pattern

Take a place in your code with a single implementation behind an interface. Write down the edits each direction needs when a second implementation arrives: with the interface, 1 new class plus 1 line at the selection site; with a direct call, 1 edit at each call site that must choose.

Done when: you have both edit counts written down and can say which cost you would rather pay now.

## Common mistakes

- **Applying a pattern to a problem you do not have yet** — 1 implementation behind an interface pays 2 hops on every call and names 2 types where a direct call names 1; fix: wait for the second or third case and refactor into the pattern then.
- **Believing patterns are a quality checklist** — each one adds at least a type, and either a hop per call or a lifetime to manage, whether or not a variation exists; fix: judge each pattern by the specific cost it charges on the calls you actually make.
- **Copying a pattern's class diagram literally** — a strategy with 2 implementations drawn as 4 classes (context, interface, 2 algorithms) becomes 4 types where 3 roles were doing the work; fix: adapt the collaboration to the language and keep the 3 responsibilities.
- **Confusing an idiom with a pattern** — ordinary language usage gets named as a design choice, and a name that compresses nothing dilutes the ones that do; fix: reserve pattern names for shapes that carry a real trade-off.
- **Using the name to end a discussion** — "that is a singleton" is not an argument, and naming the pattern in place of stating the consequence saves 1 sentence while leaving the thing you were worried about unsaid; fix: name the pattern and then state the consequence.

## Go deeper

- **SOLID Principles** (`01-cs-fundamentals/09-solid-principles`) — the design properties most patterns exist to achieve, so read it first.
- **The patterns that earn their keep** (`01-cs-fundamentals/18-design-patterns/02-the-patterns-that-earn-their-keep`) — the concrete set to learn once the framing is clear.
- **Code Reusability** (`01-cs-fundamentals/16-code-reusability`) — the same question about extracting a shared shape, asked before the pattern is named.
