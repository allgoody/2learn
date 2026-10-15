## Example 1 — Replacing a stored key with a role

A nightly export job on a single server writes to one storage bucket, and it authenticates with a long-lived access key kept in a file. Give the job a role scoped to what it actually calls, then remove the key.

```text
calls observed over 30 days: put one object into a bucket, list that bucket
credential in use: a long-lived access key stored in a file on the server
```

### Solution

```text
attach a role to the server whose policy allows only:
  put an object into the export bucket
  list the export bucket
remove the stored key from the file and from the job's configuration
verify: the job runs with no key present, and each call is recorded under the role
```

Temporary credentials issued to the attached role remove the thing to leak: nothing secret rests on the disk, the token expires on its own, and every call is attributable to the role rather than to a shared key. Scoping the policy to the two calls observed keeps the grant narrow from the start. The usual mistake is to create the role with a broad pre-built policy and intend to narrow it later, which never happens.

## Example 2 — A trust statement that is a wide door

A role built for a pipeline may be assumed by anything in its development account. List who can assume it, narrow it to the pipeline's own identity, and say what stays unchanged.

```text
trust statement today: any principal in the development account may assume the role
intended caller: the deploy pipeline's own identity, and nothing else
```

### Solution

```text
replace the account-wide principal with the pipeline's specific identity
the permissions the role grants are unchanged: this narrows who, not what
verify: a principal outside the pipeline is refused, while the pipeline still
        receives temporary credentials and deploys
```

The trust policy decides which principals may assume the role, so narrowing it matters as much as narrowing the permissions the role carries; a statement that accepts a whole account is a door that any principal in it can open. Restricting the principal leaves the deploy path working. The usual mistake is to review the permission policy line by line and never read the trust statement, which is the part written once and forgotten.
