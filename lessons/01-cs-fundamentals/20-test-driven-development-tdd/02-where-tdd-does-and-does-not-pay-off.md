---
title: Where TDD does and does not pay off
prereqs: ["01-cs-fundamentals/20-test-driven-development-tdd/01-the-red-green-refactor-loop"]
---

## What it is

The red-green-refactor loop is a tool with a shape, and that shape suits some work better than other work. It pays off most where the behaviour is a rule with inputs and outputs and where you already know roughly what you are building. It pays off least during exploration, where the design is still being discovered and the names change several times in a morning. Telling the two situations apart is the skill.

## Why it matters

Advocates and sceptics argue past each other because they picture different work. A pricing rule has expected values that hold still — 4 cases, 4 tests, each with one number to assert — while a screen layout has none: the same 5 layout changes in a morning rewrite the positions your test pinned, 5 times, and the test never once reported a defect. Applied where it fights you, the loop produces brittle assertions and a suite that gets abandoned; skipped where it applies, it leaves the branch nobody considered, which is the branch that ships the bug. The same loop is cheap in one case and expensive in the other, and the cost is visible before you start: count the cases with stable expected values, and count how many are still being renamed.

## Core ideas

### It pays off for rules and calculations

Business rules, calculations, parsers, state machines and algorithms are the natural fit: the behaviour can be written as cases, each case becomes one test, and each test asserts one value. A rule with 4 cases gives 4 tests, and each of the 4 is a sentence the reader can check without running anything.

```text
a password rule with 4 cases, one test each
length below counts the characters in the input; the rule needs 10 or more and at least 1 digit

input           length   expected   why
"short1"        6        false      fewer than the 10 required characters
"longenough1"   11       true       long enough, and it holds a digit
"allletters"    10       false      10 characters, but 0 digits
"allletters1"   11       true       long enough and 1 digit
```

The implementation lives behind a boundary the cases do not describe, so a rewrite of the checker keeps the 4 tests and their 4 expected values unchanged. That is the property a calculation has and a screen does not: its correct answers can be written down in advance.

### Bug fixes are the strongest case of all

A reported defect has one enormous advantage over a feature: its expected behaviour is already known, and the wrong behaviour has already been observed in the wild. Write the test that reproduces it, watch it fail with the wrong value printed, then fix the code.

```text
the report: a gift card of 50 takes the SAVE10 discount and sells for 45
the wrong value: 50 * (1 - 0.10) = 45, where 50 is correct
the test: expect(priceOf(giftCard(50), SAVE10)).toBe(50)
the red:  FAIL: expected 50, received 45     <- the defect, reproduced on demand
the fix:  1 guard, and the test turns green and stays
```

That red is the only proof the diagnosis was right, and the test that survives it is the only guard against the defect returning. It also catches the other half of the problem: a fix that makes 1 reported case work while leaving the neighbouring case broken shows up as a new red as soon as you write the second case.

### It pays off once the design is in view

When you know what the unit is called and what it takes, writing the test first costs no thinking and hands you the interface for free. This is why the loop is easy on the second feature in a module and awkward on the first: the first feature chooses the names everything after it will use — say 4 names — and those 4 are still moving under your hands, so the tests that assert on them get rewritten with them. Write the first one as a spike, keep the names you liked, and start the loop on the second.

### It fights you during exploration

Spikes, prototypes, user-interface layout and anything you will throw away should not be test-driven, because their value is speed and their code has no future. Declare the spike out loud, give it a limit, and mean the deletion:

```text
a declared spike
  2 hours, 0 tests, 1 question: which of the 2 candidate libraries fits
  answer: the second one
  the 150 lines written to find that out are deleted; 0 of them ship
  the real implementation starts from a red
```

The failure mode is not the spike. It is the spike that quietly becomes the product: the prototype is renamed into `src/`, the 150 lines stay, and 0 tests were ever written for them. That is where a great deal of untested code comes from.

### Glue and configuration have little behaviour to assert

Code that only wires other things together — dependency injection setup, route tables, configuration parsing — has almost no behaviour of its own. Its correctness is shown by starting the system and using it, and a unit test on it can only assert the details of its own implementation:

```text
registerRoutes(router, handlers) with 12 routes
a unit test on it: 12 assertions, one per route and method
reorder the 12 registrations -> 12 of 12 assertions fail, and the router still works
1 integration test instead: start the system, request 1 route, assert 1 status code
```

The 12 assertions break on a change no user could observe, and none of the 12 says whether a request arrives at its handler. The integration test crosses the real seam, needs 1 assertion, and breaks only when the wiring is genuinely broken.

### Test-first and test-after are different activities

Writing tests after the implementation is not a crime; it is a different activity with a different yield. What it gives you is regression protection, and that is most of what a suite is for. What it cannot give you is the observed red — the test was born against code that already satisfied it — and the design pressure that arrives when a unit turns out to be impossible to pin down. The gap is cheap to close: with the tests written and green, break the code in 1 place, run the suite, and watch the failure. If 0 tests fail, you have found a case the suite does not cover.

## Practice

### Take a reported bug through the loop

Choose a defect you fixed recently, or one you know about and have not fixed. Write the test that reproduces it, with the wrong value written into the expectation as it was reported.

Done when: the suite reports 1 failure before the fix, printing the wrong value you expected — for the gift card above, `expected 50, received 45` — and passes after it.

### Declare a spike before you start it

Choose the next exploratory task on your list and declare it a spike in advance: write down the 1 question it answers, how long it may take, and that it will be deleted.

Done when: the spike is deleted and 0 lines of it ship, and you can state the 1 question it answered; the part you kept is rewritten from a red, in fewer lines than the spike used.

## Common mistakes

- **Forcing the loop onto a spike** — exploration slows to a crawl writing tests for code that will not survive, and the 2 hours go with it; fix: declare the spike, time-box it, answer the question, delete the code.
- **Skipping the loop for "obvious" logic** — a rule with 4 cases written under 1 test ships 3 cases nobody has checked; fix: use the loop for rules and calculations, and write the failing test for every bug.
- **Unit-testing configuration glue** — 12 assertions on registration order break when the routes are reordered, while 0 of them proves a request reaches its handler; fix: cover it with 1 integration test that starts the system.
- **Claiming TDD while writing tests last** — no test in the suite has ever been watched failing, so none of them is known to be wired to the code; fix: either write them first, or call it test-after and break the code once to watch them fail.
- **Treating coverage as the goal** — 100 per cent of lines covered by assertions that hold for every input still catch nothing; fix: measure whether a deliberate break produces a failure.

## Go deeper

- **The red-green-refactor loop** (`01-cs-fundamentals/20-test-driven-development-tdd/01-the-red-green-refactor-loop`) — the mechanics of the cycle, so read it first.
- **Unit Testing** (`01-cs-fundamentals/10-unit-testing`) — how to write assertions that can genuinely fail, which is what the observed red guarantees.
- **Integration Testing** (`01-cs-fundamentals/21-integration-testing`) — the level that covers the glue and wiring a unit test fits badly.
