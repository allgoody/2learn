---
title: Safe refactoring steps
prereqs: ["01-cs-fundamentals/08-clean-code", "01-cs-fundamentals/10-unit-testing"]
---

## What it is

A safe refactoring step is a change small enough that you can be confident it preserved behaviour, and verifiable enough that you can prove it. The verification is a test run. The size is chosen so that when the test fails, the cause is the last thing you did rather than one of forty things. This is the whole procedure: make the smallest change that improves the structure, run the tests, keep or revert, repeat.

## Why it matters

The alternative to small steps is the big change, and the big change has no working state inside it. If you restructure five things at once, the test failures arrive together and interleaved, and finding the cause means undoing work you want to keep. Small steps keep the codebase releasable at every point, which matters when the refactor runs over days and other people are merging into the same files. Reading the unit testing entry first will make the rest of this entry concrete, because the safety net is the part that does the work.

## Core ideas

### Behaviour unchanged is the invariant

Write down what "behaviour" covers before you start: the return values, the errors raised, the side effects and their order, and the public shape other code depends on. Performance is behaviour too, and so is the order in which two writes happen. A change that improves the structure and alters any of those is not a refactoring, whatever the commit message says.

```text
behaviour = outputs + errors + side effects + their order
refactor   = change everything else
```

### Take one step at a time, run the tests after each

Keep the step small enough to describe in one sentence: "extract the tax calculation into its own function". Run the tests. Only when they are green do you start the next step. The rhythm feels slow and is not: the alternative is a debugging session in a codebase whose structure you are still changing.

```text
edit -> run tests -> green -> commit-sized checkpoint -> next step
                  -> red   -> revert, take a smaller step
```

### Wear one hat at a time

Do not fix a bug or add a feature while refactoring. The moment the behaviour changes, the test run no longer tells you whether your restructure was safe, because a failing test might be the new feature rather than the refactor. Split the work: refactor so the new behaviour is easy to add, then add it in a separate step. Reviewers will thank you, because the two kinds of change read completely differently in a diff.

### Get a net around untested code first

Refactoring code with no tests is guesswork. Before restructuring it, write a few tests that pin down what it does today, including the odd cases you suspect are accidental. They are not there to prove the code is right; they are there to prove it is unchanged. Only after they pass against the current implementation do you have the licence to move things.

```ts
// characterisation test: records current behaviour, right or wrong
expect(legacyFormatter(input)).toBe("odd, but current");
```

### Know when to stop, and when to stop refactoring

Stop when a change to the next requirement would be local and obvious — that is the goal, not beauty. Refactoring is not a licence to keep reshaping code nobody needs to change, and it is not a substitute for a rewrite when the requirements themselves have changed beyond recognition. Say which one you are doing, out loud, before you start.

## Practice

### Refactor under a running test suite

Take a function with no tests. Write three characterisation tests that capture its current output for a normal input, an empty input and one edge case. Then extract one responsibility from the function and run the tests.

Done when: all three tests pass before and after, and the extracted function has a name a colleague can explain.

### Revert on purpose

Make a refactoring step you believe is safe, then break it deliberately in the smallest way you can think of and watch the tests fail.

Done when: you have seen the failure, reverted the deliberate break, and can describe which test caught it.

## Common mistakes

- **Refactoring without tests** — a silent behaviour change goes unnoticed until production; fix: pin the current behaviour with a couple of tests first.
- **Mixing a refactor with a feature in one change** — a failing test no longer tells you which change caused it; fix: commit them as two separate steps.
- **Taking a step too large to describe** — the cause of a failure is somewhere in the last twenty edits; fix: split it until you can state it in one sentence.
- **Rewriting instead of refactoring** — the working state disappears and the accumulated knowledge with it; fix: keep the program releasable throughout.
- **Refactoring code that never changes** — effort is spent on structure nobody will benefit from; fix: refactor where change is actually expected.

## Go deeper

- **Clean Code** (`01-cs-fundamentals/08-clean-code`) — the target state you are refactoring toward, in terms of names, size and structure.
- **Unit Testing** (`01-cs-fundamentals/10-unit-testing`) — the safety net this entire procedure depends on, so read it first.
- **Refactorings you will actually use** (`01-cs-fundamentals/19-refactoring/02-refactorings-you-will-actually-use`) — the named steps to apply now that you have the rhythm.
