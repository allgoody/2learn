## Example 1 — One row per data category

A team is drafting its privacy record and has written a single line: "user data — purpose: to run the service — basis: consent — kept: indefinitely". That sentence cannot be audited and cannot be enforced. Rewrite it as the table the team actually needs, with a basis and a lifetime per category.

```text
Draft record
  system: customer portal
  data:   user data
  why:    to run the service
  basis:  consent
  kept:   indefinitely
```

### Solution

```text
Data            Purpose           Basis        Location      Retention
email, name     account + login   contract     users         account life
IP address      abuse prevention  legitimate   request logs  30 days
marketing prefs promotions        consent      users         until withdrawn
order history   fulfilment        contract     orders        legal minimum
```

The table is the artefact; everything else — the consent text, the retention jobs, the access decisions — is derived from it. The same person now appears in four rows with different bases and different lifetimes, which is the point: consent is the right answer only for the marketing row, while the data the service cannot run without belongs under contract. The usual mistake is one row per system, which hides the fields that are not justified and never gets a lifetime attached.

## Example 2 — A consent flag that answers nothing

The signup form stores `marketing_opt_in = true` and nothing else. When a user asks what they agreed to and when, support has no answer, and a withdrawal cannot be scoped to a purpose. Replace the boolean with a record the team can defend.

```sql
-- users table, as built
marketing_opt_in boolean not null default false
```

### Solution

```sql
-- consent table, one row per purpose
create table consent (
  user_id      bigint not null,
  purpose      text   not null,
  granted_at   timestamptz not null,
  text_version text   not null,
  withdrawn_at timestamptz
);
-- a withdrawal is an update, not a new email to support
```

Storing the date, the purpose and the version of the text shown turns "did they agree?" into a fact, and consent for promotions no longer stands in for consent to something else. Withdrawal updates the row, so the toggle that set consent unsets it. The usual mistake is to keep the boolean and add a policy statement around it; a policy cannot answer a question the schema was never able to store.
