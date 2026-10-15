## Example 1 — From a report to a reproduction

A report says the total looks wrong for members sometimes. The log below is the only evidence. Say what is missing, then write the reproduction you would build before changing any code.

```text
report:  "member order total was 46.20, should have been 42.00"
log:     INFO calculateTotal order=4471 items=3
         INFO calculateTotal done total=4620 currency=GBP
```

### Solution

```text
specification: member order, expected 42.00, actual 46.20
still missing: which member, the item prices, the locale

smallest reproduction, one command with fixed input:
  a single order, member=true, one line item at 46.20, 10% member rate
  check_total --order fixtures/member_single.json --expect 42.00
```

Start from what actually happened and write the expected and actual as a pair — that sentence is the specification the reproduction must satisfy. Then remove everything unnecessary: the report mentions three items, but one item at the discounted price is enough to prove the discount is not applied. The trap is starting from the report's narrative instead of its numbers, because "sometimes" is a story about the reporter's memory while only the values are facts.

## Example 2 — A failure that happens one time in five

A test fails on roughly one run in five and passes on the rest. The trace shows five runs of the same input. Say what has to be pinned before the failure can be worked on, then write the reproduction and the test that keeps it.

```text
run 1: PASS
run 2: FAIL  expected 3 items, got 2
run 3: PASS
run 4: FAIL  expected 3 items, got 2
run 5: PASS
```

### Solution

```text
pin: the random seed, the clock, the locale and timezone, the sort order

for i in 1..1000: run_case(fixed_seed = true)   -> failure rate becomes 100%

test("keeps an item whose price is zero", () => {
  const cart = cartWith(fixedSeed, item("free-sample", 0));
  expect(cart.items()).toHaveLength(1);
});
```

Looping the case a thousand times turns a vague "sometimes" into a number, and pinning the seed, the clock and the ordering turns that number into a certainty — the point at which the difference between the passing and failing runs becomes visible. Once the failing input is known and stable, the same few lines become the test that watches for the defect returning. The trap is doing it in the other order: changing the code first and re-running the loop a few times to see whether it "seems better", which cannot tell a real fix from luck.
