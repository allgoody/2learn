## Example 1 — A diff that swallows its failures

The diff below adds retry behaviour to a payment call. Read it as a change to a running system and write the review: specific findings, each with its consequence and severity.

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
BLOCKER — after three failures it returns "pending" and the caller marks
the order paid: a failed charge is reported as a success.
  ask: what should happen when every attempt fails?

BLOCKER — the caught error is logged without its cause, so the reason is
lost. ask: can the log carry the error and the attempt number?

QUESTION — retrying a definitive decline is pointless.
  ask: is this retryable, or only a timeout?
```

The first two findings are the review: the change turns a failure into a plausible-looking value and destroys what is needed to diagnose it. Everything else is secondary, and saying which is which is part of the job. The trap is reviewing naming and loop style first — by the time attention reaches the failure path it is spent, and this diff's risk lives entirely there.

## Example 2 — A diff that reads a balance and then writes it

The diff below checks a balance and then debits it. Say which class of defect it risks, then write the finding.

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
BLOCKER — the read and the write are not atomic. Two concurrent debits can
both read the same balance, both pass the check and both save, so the
account is overdrawn.
  ask: can this be a single conditional update, or a transaction holding
  the row while it reads and writes?

NOTE — the comparison is safe only if balance is an integer number of minor
units; worth naming the unit in the type.
```

This is the kind of change a review should hunt directly — a read, a decision, then a write — rather than reading every line with equal attention. The missing test is worth raising too: a test that runs two debits at once would fail. The trap is that the code is correct when requests arrive one at a time, which is how it will be tested and almost never how it will run.
