## Example 1 — A question instead of an answer

A teammate messages you about a failing test. Their message already contains the clue they need, though they have not noticed it. The exchange below is what a mentor who answers immediately would send. Rewrite the reply so that they reach the fix themselves.

```text
Teammate: the checkout test fails on CI but passes locally. any idea?
Mentor:   you need to seed the database before the test runs.
```

### Solution

```text
Teammate: the checkout test fails on CI but passes locally. any idea?
Mentor:   what have you tried so far, and what do you expect the test to
          see at that point?
Teammate: I run it straight after migrate, so I expect a cart row...
          ...hang on. CI runs migrate without the seed in the job.
```

Asking what they tried and what they expected surfaces the missing seed step in the teammate's own answer, so the fact arrives attached to the method that found it. The original reply is not wrong, but it teaches one fact and keeps the mentor in the loop for the next failure, while the question teaches a way to check. Save the direct answer for when someone is genuinely stuck and the clock matters.

## Example 2 — A review that fixes the decision, not the commas

A pull request adds a retry loop around a payment call. The note below is what you were about to send: it corrects style that a formatter could settle, and it says nothing about the retry itself. Rewrite it as three questions about the decisions in the change.

```text
nit: rename `r` to `retryCount`
nit: this line is 104 characters, please wrap it
nit: use `const` instead of `let` here
```

### Solution

```text
What happens to a retry when the payment was already accepted but the
response timed out?
Is three attempts a decision, or a default we should name and reuse?
Which of these branches does the test suite actually exercise?
```

Every comment now points at a decision the author can still change: the duplicate-charge case, the retry budget, and the untested branch. The original notes are not harmful, but a formatter settles all three, so they spend the author's attention without improving the design. Reviewing the approach is where the mentoring happens; leave the whitespace to the tool.
