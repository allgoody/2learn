---
title: Reproduce before you fix
prereqs: []
---

## What it is

Reproducing a bug means making it happen on demand, in a way you can run again: one command, one fixed input, one wrong value you can point at. Until that exists you are working from a report, and a report is a story about a system that includes the reporter's memory, their environment and their expectations — "the member total was 4200 pence, it should have been 3780" is a sentence, not a fact. A reproduction is a fact: this order, 4 200 pence of goods, a member flag of true, and 4 200 pence coming back where 4 200 − 420 = 3 780 is due. It is the first and most valuable step, because nothing afterwards — no fix, no test, no regression check — can be trusted until the failure can be switched on and off at will.

## Why it matters

Fixing without reproducing is guessing with a good chance of breaking something else. A report that says the total is wrong "sometimes" gives you almost nothing to check a fix against: if the case fails 37 runs in 1 000 — 3.7 percent, about one run in 27 — then a single green run after your change is what you would see 963 times in 1 000 even if nothing had been fixed. With a reproduction the same change is measured: 1 000 runs before the fix, 37 red; 1 000 runs after it, 0 red. That is a statement you can defend in review, and it is the only kind that survives the next release. A reproduction also shrinks the problem, because the act of finding the smallest input that still fails usually reveals the cause before you have read a line of code: a report about a three-item checkout becomes one order and one member flag. Experienced debuggers spend their time here deliberately, even when they think they already know the answer.

## Core ideas

### Read the error before theorising

Start with what actually happened: the full error message, the stack trace, the log lines immediately before it, the version and the environment. A trace is read from the top down, and the top is not where the answer is.

```text
TypeError: Cannot read properties of undefined (reading 'rate')
  at memberRate (src/pricing/discount.ts:14:22)   <- your code
  at calculateTotal (src/pricing/total.ts:31:10)

4 lines in total: line 1 names the error type and the property that was read
of nothing, line 2 names the file, line number 14 and column 22 of the call,
line 3 the caller of that call
```

Line 1 alone says a discount rate was read from nothing; it does not say where, and lines 2 and 3 do. If there is no error, write down the precise difference between what happened and what should have happened, with the values in it: the member's order totalled 4 200 pence and should have been 3 780, because ten percent of 4 200 is 420 and 4 200 − 420 = 3 780. That sentence is the specification your reproduction has to satisfy.

### Build the smallest reproduction

Start from the failing case and remove everything that is not necessary, re-running after each removal. The goal is the fewest inputs and the least code that still fails.

```text
report: a member order, one item at 4200 pence, came back 4200 instead of 3780

full checkout flow, 5 steps: cart -> address -> shipping -> payment -> confirm
  the wrong total is already there at step 1, so steps 2 to 5 are 4 removals

remove the address and the shipping setup -> still wrong:
  1 order, 1 item, 4200 pence
remove member = true                      -> 4200 pence, which is correct
  for a guest: 4200 - 0 = 4200, so the member flag is one input the
  failure needs, and the item's 4200 pence is the other

smallest reproduction: 1 order, 2 input values, 1 command
  check_total --order fixtures/member_single.json   -> prints 4200, expected 3780
```

That is the whole case: one item and one flag, in one command with a fixed input — fast to run, easy to reason about, and a few lines from being a test. When the case is large, a whole workflow, shrink it to the step before the wrong value appears.

### Make it deterministic

A reproduction that fails one run in five is almost as bad as none: it has no signal you can compare a change against. Pin the sources of variation — the random seed, the clock, the locale and timezone, the sort order — and run the case in a loop until you know its failure rate.

```text
the collection is built from a keyed map, and the order it yields varies per process

1 000 runs, nothing pinned:          37 failures -> 37 / 1000 = 3.7 percent
                                                  1 run in 27
1 000 runs, the seed fixed to the
  one that failed:                 1 000 failures -> 1 000 / 1000 = 100 percent
  the order is the failing order on every run now, so every run reproduces

a rate of 3.7 percent is not an experiment: change one line, see green,
and the odds are 963 in 1 000 that the green run meant nothing
```

Once it is repeatable you can measure it, and once you can measure it you can bisect it. Repeatability is not a nicety of the method; it is the measuring instrument.

### Capture the state at the moment of failure

Inspect the values, not just the outcome. Print or breakpoint the inputs, the intermediate results and the object identity at the point where the wrong value appears.

```text
breakpoint at the first line of calculateTotal, one frame, 3 values:
  items  = [{ sku: "book", qty: 1, price: 4200 }]   the one item, 4 200 pence
  member = true                                     the order was placed by a member
  rate   = 0                                        the discount rate in use

2 of the 3 are what the reproduction intends; the third is the defect
rate should be 10 for a member, and 4200 * 10 / 100 = 420 pence is what it costs
```

Debugging by reading code alone answers "what could happen". Inspecting state answers "what did happen", and on a failure that happens 37 times in 1 000 that difference is the whole job. Prefer it whenever it is cheap.

### Turn the reproduction into a test

A reproduction you do not keep is a reproduction you will rebuild. Once it is small and deterministic it is usually a few lines from an automated test: the one order at 4 200 pence, the member flag, and the expected 3 780 pence.

```ts
test("applies the member rate to a single item", () => {
  const cart = cartWith(item("book", 4200), { member: true });
  expect(cart.total()).toBe(3780);   // 4200 - (4200 * 10 / 100) = 4200 - 420
});
```

Write it before the fix if the tooling allows, and watch it fail: that red run is the proof the test can fail at all, and the green run immediately after the fix is the evidence that matters. A test written after the fix passes on its first run whether or not it could ever have gone red.

## Practice

### Shrink a real failure

Take a bug you are currently working on and reduce the reproduction to under ten lines, or to a single command with a fixed input. Re-run after every removal.

Done when: the reproduction still fails, it finishes in under a second, and you have removed at least half of what you started with — ten lines down to four, or five flow steps down to one command.

### Pin the nondeterminism

For a failure that happens sometimes, run the reproduction in a loop and record the failure rate before changing anything. Then pin the seed, the clock and the ordering, and run the loop again.

Done when: the failure rate is either zero or one hundred percent — say 37 failures in 1 000 runs before pinning and 1 000 in 1 000 after — and you can name which sources of variation you removed.

## Common mistakes

- **Starting to fix before there is a reproduction** — nothing can be checked afterwards, and a case that fails 37 runs in 1 000 turns green by luck 963 times in 1 000, which feels like a fix; fix: reproduce first, even when the cause looks obvious.
- **Reading only the first line of an error** — in a four-line trace the frame naming your file sits on line 2, and line 1 stops at the error type; fix: read the whole message and the stack.
- **Reproducing with the full production dataset** — a run over 1 000 000 rows is slow and the signal is buried in it, while the one order at 4 200 pence fails just as reliably; fix: shrink to the smallest input that still fails.
- **Accepting an intermittent reproduction** — a rate of one run in five cannot tell you whether a fix worked, since one green run is what you expect four times in five anyway; fix: pin the seed, clock and ordering until the rate is 0 or 100 percent.
- **Fixing and discarding the reproduction** — the defect returns unnoticed and the second investigation starts from the report again; fix: turn it into an automated test before you change the code.

## Go deeper

- **Unit Testing** (`01-cs-fundamentals/10-unit-testing`) — how to turn the reproduction you just built into a test that stays in the suite.
- **Isolate and prove the cause** (`01-cs-fundamentals/11-debugging/02-isolate-and-prove-the-cause`) — the next step, once the failure is repeatable on demand.
- **Concurrency & Async Programming** (`01-cs-fundamentals/05-concurrency-async-programming`) — why some failures resist reproduction, and what to pin to make them behave.
