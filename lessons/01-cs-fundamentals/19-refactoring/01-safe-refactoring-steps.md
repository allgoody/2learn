---
title: Safe refactoring steps
prereqs: ["01-cs-fundamentals/08-clean-code", "01-cs-fundamentals/10-unit-testing"]
---

## What it is

A safe refactoring step is a change small enough that you can be confident it preserved behaviour, and verifiable enough that you can prove it. The verification is a test run. The size is chosen so that when the test fails, the cause is the last thing you did; a step carrying 40 edits leaves 40 candidate causes, and only 1 of them is the one you just made. One step is one transformation — extract one function, rename one symbol, move one method — and if you cannot name it in one sentence, it is several steps wearing one name. This is the whole procedure: make the smallest change that improves the structure, run the tests, keep or revert, repeat.

## Why it matters

The alternative to small steps is the big change, and the big change has no working state inside it. Restructure 5 things in one commit and a red test has 5 candidate causes at once; if the fix lies in 1 of the 4 edits you wanted to keep, then reverting costs those 4 as well, and keeping them costs a debugging session you did not plan. Small steps keep the codebase releasable at every point, which matters when the refactor runs over days and other people are merging into the same files: a refactor spread over 3 days, each ending green, hands colleagues 3 mergeable states, while one that is only green at the end hands them 1 state on day 3. Reading the unit testing entry first will make the rest of this entry concrete, because the safety net is the part that does the work.

## Core ideas

### Behaviour unchanged is the invariant

Write down what "behaviour" covers before you start: the return values, the errors raised, the side effects and their order, and the public shape other code depends on. Performance is behaviour too, and so is the order in which two writes happen. A change that improves the structure and alters any of those is not a refactoring, whatever the commit message says.

```text
behaviour of a function that sorts a list and writes 2 rows

outputs       3 values, sorted                  same 3 values, same order
errors        1 case: an empty list throws      same error, same condition
side effects  2 writes: row 1, then row 2       the same 2 writes in the other
                                               order is a different behaviour
public shape  the name and the 2 parameters    unchanged

refactor = hold all 4 rows fixed and change anything else
```

### One step per test run

Keep the step small enough to describe in one sentence: "extract the tax calculation into its own function". Run the tests. Only when they are green do you start the next step, and only then do you have a state worth committing. The rhythm feels slow and is not: the alternative is a debugging session in a codebase whose structure you are still changing, so you are hunting a cause among edits that are themselves moving.

```text
5 edits in 1 commit    a red test has 5 candidate causes
1 edit per commit      a red test has 1 candidate cause

each step costs 1 test run; say the suite finishes in 2 seconds
5 steps cost 5 * 2 s = 10 s of test time
the debugging session they replace opens with 5 candidates,
and ruling each one out costs its own run and its own reason
```

### One hat at a time

Do not fix a bug or add a feature while refactoring. The moment the behaviour changes, the test run no longer tells you whether your restructure was safe, because a failing test might be the new feature rather than the refactor. Split the work: refactor so the new behaviour is easy to add, then add it in a separate step. Reviewers will thank you, because the two kinds of change read completely differently in a diff.

```text
1 diff holding both hats:  1 red test -> the cause is the rename, the new rule, or both
2 diffs, 1 hat each:       diff 1 renames and stays green
                           diff 2 adds the rule and goes red
                           the red test now has 1 candidate cause

2 commits, 2 reviews, each reading as one kind of change
```

### A net around untested code first

Refactoring code with no tests is guesswork. Before restructuring it, write a few tests that pin down what it does today, including the odd cases you suspect are accidental. They are not there to prove the code is right; they are there to prove it is unchanged. One test per branch you are about to move is enough — say the function has 12 branches and you are moving 3 of them, then 3 tests are the net, and the other 9 branches can wait. Only after those tests pass against the current implementation do you have the licence to move things.

```ts
// characterisation test: records current behaviour, right or wrong
expect(legacyFormatter(input)).toBe("odd, but current");
```

### When to stop, and when to rewrite

Stop when a change to the next requirement would be local and obvious: if a new case adds 1 file and 1 line rather than edits in 5 files, the structure is doing its job. Refactoring is not a licence to keep reshaping code nobody needs to change, and it is not a substitute for a rewrite when the requirements themselves have changed beyond recognition. Count what the code still serves to tell the two apart: a module where 8 of its 10 behaviours are still wanted is bent back into shape, while a module whose requirements have moved so far that none of its 10 behaviours is still wanted is rewritten. Say which one you are doing, out loud, before you start.

## Practice

### Refactor under a running test suite

Take a function with no tests. Write three characterisation tests that capture its current output for a normal input, an empty input and one edge case. Then extract one responsibility from the function and run the tests.

Done when: all three tests pass before and after, and the extracted function has a name a colleague can explain without reading its body.

### Revert on purpose

Make a refactoring step you believe is safe, then break it deliberately in the smallest way you can think of and watch the tests fail.

Done when: you have seen the failure, reverted the deliberate break, and can name the one test that caught it.

## Common mistakes

- **Refactoring without tests** — a silent behaviour change goes unnoticed until production, where the same change now costs an incident instead of 1 test run; fix: pin the current behaviour with a couple of tests first.
- **Mixing a refactor with a feature in one change** — a failing test has 2 candidate causes instead of 1; fix: commit them as two separate steps.
- **Taking a step too large to describe** — a red test in a commit of 40 edits has 40 candidate causes and no way to tell which edit is the one; fix: split it until you can state the change in one sentence.
- **Rewriting instead of refactoring** — the working state disappears and the accumulated knowledge with it, so the 10 behaviours the module already got right have to be rediscovered; fix: keep the program releasable throughout.
- **Refactoring code that never changes** — effort is spent on structure nobody will benefit from, 1 step at a time on a file no requirement will touch; fix: refactor where change is actually expected.

## Go deeper

- **Clean Code** (`01-cs-fundamentals/08-clean-code`) — the target state you are refactoring toward, in terms of names, size and structure.
- **Unit Testing** (`01-cs-fundamentals/10-unit-testing`) — the safety net this entire procedure depends on, so read it first.
- **Refactorings you will actually use** (`01-cs-fundamentals/19-refactoring/02-refactorings-you-will-actually-use`) — the named steps to apply now that you have the rhythm.
