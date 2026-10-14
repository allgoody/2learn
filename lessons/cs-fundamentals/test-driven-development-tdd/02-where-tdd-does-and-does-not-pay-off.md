---
title: Where TDD does and does not pay off
prereqs: ["cs-fundamentals/test-driven-development-tdd/01-the-red-green-refactor-loop"]
---

## What it is

The red-green-refactor loop is a tool with a shape that suits some problems better than others. It pays off most where the behaviour is expressible as a rule with inputs and outputs, and where you already know roughly what you are building. It pays off least during exploration, where the design is still being discovered and the interface changes every few minutes. Knowing which one you are doing is the skill.

## Why it matters

Advocates and sceptics tend to argue past each other because they are picturing different work. Someone building a pricing engine finds the loop natural and wonders why anyone resists; someone prototyping a user interface finds it a straitjacket and wonders why anyone bothers. Both are right about their own problem. Applying the loop where it fights you produces dogmatic code and abandoned test suites; skipping it where it applies produces the untested branch that ships a bug.

## Core ideas

### It pays off for logic with rules

Business rules, calculations, parsers, state machines and algorithms are ideal: the behaviour can be stated as cases, each case is a test, and the implementation is behind a stable boundary. Bug fixes are the strongest case of all — write the failing test that reproduces the defect, watch it fail, then fix it. That test is the only proof the bug is gone and the only guard against its return.

```text
bug report -> test reproducing it (red) -> fix (green) -> never breaks again
```

### It pays off where the design is already in view

When you know what the unit is called and what it takes, writing the test first costs nothing and gives you the interface for free. This is why TDD is easy on the second and third feature in a module and awkward on the first: the first is design work, and design work is exploration.

### It fights you during exploration

Spikes, prototypes, user-interface layout and anything where you will throw the code away should not be test-driven. The value of a spike is speed, and the code has no future. The discipline is to acknowledge the spike and then delete it, rather than letting the throwaway code become the product without tests — which is how a lot of untested code is born.

```text
spike -> learn -> delete the spike -> write the real thing test-first
```

### It is awkward for glue and configuration

Code that mostly wires other things together — dependency injection setup, route tables, configuration parsing — has little behaviour of its own to assert. Its correctness is demonstrated by an integration test that starts the system. Writing unit tests for it produces brittle assertions about call orders and buys very little.

### Test-first versus test-after

Test-after is not a crime; it is simply a different activity. Writing tests after implementation still gives you regression protection, which is most of the value. What it loses is the design pressure — the moment where a hard-to-test unit tells you the interface is wrong — and the guarantee that the test can fail. If you write tests after, at least break the code once and watch them fail.

## Practice

### Test-first a bug

Take a defect you fixed recently, or one you know about and have not fixed. Write a test that reproduces it and fails. Then fix the code.

Done when: the test fails before the fix and passes after, and it names the defect in the test title.

### Name a deliberate spike

Choose the next exploratory task on your list and declare it a spike in advance: a time limit, no tests, throw the code away afterwards.

Done when: you have deleted the spike and rewritten the part you kept, test-first, in less time than you expected.

## Common mistakes

- **Forcing the loop onto a spike** — exploration slows to a crawl and the code is thrown away anyway; fix: declare the spike, time-box it, delete it.
- **Skipping the loop for "obvious" logic** — the edge case nobody considered ships; fix: use the loop for rules and calculations, and write the failing test for each bug.
- **Unit-testing configuration glue** — the tests assert call order and break on every refactor; fix: cover it with an integration test that starts the system.
- **Claiming TDD while writing tests last** — the design feedback is lost and no test was ever seen failing; fix: either write tests first or be honest that this is test-after.
- **Treating coverage as the goal** — high coverage with vacuous assertions proves nothing; fix: measure whether tests fail when the code breaks.

## Go deeper

- **The red-green-refactor loop** (`cs-fundamentals/test-driven-development-tdd/01-the-red-green-refactor-loop`) — the mechanics of the cycle, so read it first.
- **Unit Testing** (`cs-fundamentals/unit-testing`) — how to write assertions that can genuinely fail.
- **Integration Testing** (`cs-fundamentals/integration-testing`) — the right level for the glue and wiring that unit tests fit badly.
