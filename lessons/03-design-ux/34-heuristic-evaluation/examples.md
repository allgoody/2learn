## Example 1 — Tying an impression to a named rule

A first heuristic pass has produced four impressions, written as opinions. As they stand they cannot be argued, only agreed or dismissed. Rewrite each one against a named rule and say what the reviewer saw.

```text
Impressions from one pass
  the disabled button gives no clue why it is off
  the error message is unfriendly
  some screens say "Sign in" and others "Log in"
  the delete button just deletes
```

### Solution

```text
Rule                     Where      Violation
Visibility of status     checkout   no sign the form is submitting; the
                                    button is disabled with no explanation
Match with the world     payment    "authentication token" shown to a shopper
Consistency              account    "Sign in" here, "Log in" on the next screen
Error prevention         account    delete runs without a confirmation step
```

Every impression is now attached to a rule, so a reader can check the claim and disagree with the rule rather than with the reviewer's taste. The disabled button is the clearest case: tied to visibility of status it is a violation, left as an impression it is a colour preference. The usual failure is reviewing on taste, which gets the whole list dismissed because none of it is arguable.

## Example 2 — Reviewing alone, then merging

Two colleagues each reviewed the same flow on their own. Their lists overlap in places and each caught something the other missed. Merge them, keeping what two reviewers found or what one can demonstrate, then rate by severity. Produce the merged list.

```text
Reviewer A                          Reviewer B
no sign the form is submitting      no sign the form is submitting
"authentication token" shown        error message has no next step
delete runs without confirmation    "authentication token" shown
tooltips unusable on mobile         tooltips unusable on mobile
```

### Solution

```text
Rule                     Violation                          Severity
Error prevention         delete runs without confirmation   blocking
Visibility of status     no sign the form is submitting     serious
Match with the world     "authentication token" shown       serious
Help and documentation   error names no remedy              minor

Kept: items found by both reviewers, plus the delete case, which
Reviewer A demonstrated on screen. Dropped: none.
```

Merging two independent lists keeps the items that survived a second pair of eyes and holds the rest to a demonstration, which is why the union is longer than any single pass. The delete failure leads on severity rather than on the number of mentions, because losing a record cannot be worked around. Reviewing as a group would have let the first confident voice set the list; the merge is what preserves the quiet findings.
