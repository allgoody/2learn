## Example 1 — A flaky test everyone has learned to re-run

A test fails about one run in five and passes when the job is retried, so the team retries it. The excerpt below is a representative run. Say what the retry does to the pipeline's verdict, and what must happen to the test instead.

```text
$ run-tests
...
FAIL checkout: expected 1 order, got 2
  at checkout.test.js:41

$ run-tests          # second attempt
PASS checkout
```

### Solution

```text
$ run-tests
...
FAIL checkout: expected 1 order, got 2
  at checkout.test.js:41

quarantine: checkout removed from the blocking path
ticket:     a row shared with an earlier test (suspect), owner: payments
```

Retrying teaches everyone that a failure is negotiable, and once the verdict is negotiable the pipeline is decoration that costs money and time. The failure has a cause — usually shared state, timing or an unseeded value, here a row shared with an earlier test — so quarantining it keeps the blocking path deterministic while it is investigated, and the ticket gives the flake an owner. The mistake is leaving it in the blocking path and asking people to retry, because the next genuine failure will be retried too.

## Example 2 — A debug dump that printed a credential

A failing build echoed its configuration to help debugging, and the output went into a log the whole project can read. The excerpt is below. Say who can now use the value, and what the pipeline must do about it.

```text
$ deploy --verbose
error: connection refused
dump: { host: "api.example.test", token: "…" }   <- written in full
```

### Solution

```text
$ deploy
error: connection refused          # no configuration dump in the log

masked:   the credential is registered as a masked variable
scoped:   only the deploy stage receives it; the test stage does not
rotated:  the credential from the leaked log is replaced
fork PRs: the untrusted path runs with no secrets at all
```

Anyone who can read the build log can use that credential, and the log persists, so rotating it is the only remedy that undoes the leak; masking stops the next one and scoping keeps it away from the stages that do not need it. A run triggered by a fork's pull request must never receive secrets, because the change is untrusted and could deploy. The mistake is deleting the log line and stopping there: the value has already been copied, and it still works.
