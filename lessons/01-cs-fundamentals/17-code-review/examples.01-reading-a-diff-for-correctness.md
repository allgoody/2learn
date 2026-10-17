## Example 1 — A diff that swallows its failures

The diff below adds retry behaviour to a payment call. `attempt` counts 0, 1 and 2, so the loop calls the gateway 3 times, and when all 3 attempts fail it returns `{ status: "pending" }` instead of reporting the failure. Read it as a change to a running system and write the review: specific findings, each with its consequence and its severity.

```diff
+ async function chargeWithRetry(order) {
+   for (let attempt = 0; attempt < 3; attempt++) {
+     try {
+       return await gateway.charge(order);
+     } catch (e) {
+       log.warn("charge attempt failed");
+     }
+   }
+   return { status: "pending" };
+ }
```

### Solution

```text
BLOCKER — when all 3 attempts have failed the function returns { status:
"pending" }, and the caller marks the order paid: a charge that never
succeeded is reported as a success.
  ask: what should the caller see when all 3 attempts fail?

BLOCKER — the caught error is logged without its cause, so the reason is
lost. A decline, a timeout and a dropped connection leave the same one-line
warning, and nothing tells the 3 apart afterwards.
  ask: can the log carry the error and the attempt number?

QUESTION — retrying a definitive decline is pointless: the 2nd and 3rd of the
3 attempts would receive the same decline, so 2 of the 3 round trips have no
chance of succeeding.
  ask: is this retryable, or only a timeout?
```

The first 2 findings are the review: the change turns a failure into a plausible-looking value and destroys the evidence needed to diagnose it. Everything else in this diff is secondary, and saying which is which is part of the job. The trap is reviewing the naming and the loop style first — by the time attention reaches the failure path it is spent, and this diff's risk lives entirely in the 3 lines that catch the error and return the fallback value.

## Example 2 — A diff that reads a balance and then writes it

The diff below checks a balance and then debits it. Account 7 holds 100.00, and two debits of 30.00 arrive at the same moment. Say which class of defect it risks, then write the finding.

```diff
+ async function debit(accountId, amount) {
+   const account = await accounts.get(accountId);
+   if (account.balance < amount) throw new InsufficientFunds();
+   account.balance -= amount;
+   await accounts.save(account);
+   return account.balance;
+ }
```

### Solution

```text
BLOCKER — the read and the write are not atomic. Two debits of 30.00 arriving
together can both read 100.00, both pass the check 100.00 > 30.00 and both
save 70.00, while 100.00 - 30.00 - 30.00 = 40.00 is what the account should
hold: 1 debit is lost and 30.00 is spent without being taken.
  ask: can this be one conditional update — UPDATE accounts SET balance =
  balance - 30.00 WHERE balance >= 30.00 — or a transaction that holds the
  row across the read and the write?

NOTE — balance < amount compares two numbers, which is safe only while
balance is an integer count of minor units (pence, cents): in binary floating
point 0.1 + 0.2 = 0.30000000000000004, so a balance built from such
fractions can compare unequal to the amount it should equal.
  ask: can the type name its unit?

NOTE — no test runs 2 debits at once, so the suite would pass on this code
either way.
  ask: add one that starts both and asserts 40.00.
```

This is the class of change a review should hunt directly — a read, a decision, then a write — rather than reading every line with equal attention. The account ends at 70.00 while 2 debits of 30.00 should leave 40.00, and the missing test is worth raising for the same reason: a test that runs both debits at once would fail on the current code. The trap is that the code is correct when requests arrive one at a time, which is how it will be tested and almost never how it will run.
