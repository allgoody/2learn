## Example 1 — Narrowing a policy that allows everything in one service

An export service holds a policy granting every action on every resource of its storage service. Observed use is two calls against one bucket. Write the narrowed policy and state what the narrowing breaks.

```json
{
  "effect": "allow",
  "actions": ["storage:*"],
  "resources": ["*"]
}
```

### Solution

```json
{
  "effect": "allow",
  "actions": ["storage:put-object", "storage:list-bucket"],
  "resources": ["export bucket"],
  "condition": { "encrypted": true }
}
```

```text
what the narrowing breaks: any action other than the two observed, any bucket other
than the export bucket, and any request not made over an encrypted connection
checked first: the two observed calls were the only ones recorded in the period
```

An action wildcard on a resource wildcard is the broadest grant possible, and the useful review questions are which actions and which resources, then whether either is a wildcard. The condition adds intent the action list cannot express, restricting the grant to encrypted requests without inventing a second policy. The usual mistake is to start broad and plan to narrow later; the observation period is what makes the narrow list safe, so run it before the change.

## Example 2 — Finding the drift that undoes the narrowing

A quarter after the policy above was narrowed, deploys and one incident response have passed. Write the comparison to run on a schedule and state how each difference should be treated.

```text
reference: the reviewed policy set recorded when the narrowing shipped
live:      the account's current policy set for the same identity, after a quarter
```

### Solution

```text
on a schedule: compare the live set with the reference and report every difference
added action or resource -> who added it, why, does it still have a reason
added principal in trust -> the same question about who may assume the role
unused identity for months -> candidate for removal
```

Drift is what undoes least privilege: new resources arrive with default permissions, deploys add convenient grants, and incident responses leave widenings behind, each reasonable on its own. Comparing the current set with the intended one turns every difference into a small reviewable question rather than a slow decline nobody can date. The usual mistake is to run the comparison once and trust it afterwards, so the account narrows only when someone remembers.
