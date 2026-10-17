## Example 1 — From a report to a reproduction

A report says the total looks wrong for members. The log below is the only evidence: one order, id 4471, three items, and a total of 4 200 pence, where a member with a ten percent rate should have paid 4 200 − 420 = 3 780 pence. Say what is still missing, then write the reproduction you would build before changing any code.

```text
report:  "member order total was 4200, it should have been 3780"
log:     INFO calculateTotal order=4471 items=3
         INFO calculateTotal done total=4200 currency=GBP
```

### Solution

```text
specification: a member order; expected 3780 pence, actual 4200 pence
  10 percent of 4200 = 4200 * 10 / 100 = 420, and 4200 - 420 = 3780
still missing: which member, the prices of the 3 items, the locale

smallest reproduction, one command with a fixed input:
  1 order, member = true, 1 item priced 4200 pence, member rate 10 percent
  check_total --order fixtures/member_single.json --expect 3780
```

Start from what actually happened and write the expected and the actual as a pair — 3 780 against 4 200 — because that sentence is the specification the reproduction has to satisfy. Then remove everything unnecessary: the log shows three items, but a single item at 4 200 pence already proves the discount is not applied, since a guest owes exactly 4 200 pence and 4 200 − 0 = 4 200 is the correct guest total. The trap is starting from the report's narrative instead of its numbers, because "sometimes" is a story about the reporter's memory while the two values are the fact you can test.

## Example 2 — A failure that happens one time in five

The test fails on roughly one run in five and passes on the rest — 1 failure in the 5 runs below, a rate of 20 percent, and worse than it looks: after any change, a green run is what you expect 4 times in 5 anyway. Say what has to be pinned before the failure can be worked on, then write the reproduction and the test that keeps it.

```text
run 1: PASS
run 2: PASS
run 3: FAIL  expected 3 items, got 2
run 4: PASS
run 5: PASS
```

### Solution

```text
pin: the random seed, the clock, the locale and timezone, the sort order

loop the case 1 000 times with the seed fixed -> 1 000 failures, 100 percent
  the order of the cart's items comes from a keyed map, so it varies per
  process; the fixed seed now yields the failing order every run

test("keeps an item whose price is zero", () => {
  const cart = cartWith(fixedSeed, item("free-sample", 0));
  expect(cart.items()).toHaveLength(1);   // 3 items in, 3 items out
});
```

Looping the case a thousand times turns a vague "sometimes" into a number — 1 run in 5, or 20 percent — and pinning the seed, the clock and the ordering turns that number into a certainty, 1 000 failures in 1 000 runs, which is the point at which the difference between the passing and the failing runs becomes visible. Once the failing input is stable, the same few lines become the test that watches for the defect returning: three items in and three items out. The trap is doing it in the other order — changing the code first and running the loop five times to see whether it "seems better" — because four of those five runs pass whatever you changed.
