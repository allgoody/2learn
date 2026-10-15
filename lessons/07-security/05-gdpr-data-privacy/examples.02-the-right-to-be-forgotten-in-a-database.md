## Example 1 — One identifier that reaches everything

An erasure request has arrived and the team is tracing a customer by hand, because the user id appears in some stores and an email address in others. The schema below copies the person's email into every table it touches. Work out what makes the next request cheap, and write the fields that carry the link instead.

```text
users.id
orders.customer_email      copied, not referenced
events.email
```

### Solution

```text
users.id                  the subject identifier, assigned once
orders.user_id            reference users.id; never copy the email
events.subject_id         the same identifier, propagated to analytics
logs.subject_id           structured logging carries it beside the IP
```

Propagating one stable identifier to every store — database, logs, analytics, queue, search index and warehouse — is what turns the next request into a query rather than a week of tracing joins. A copied email is a second thing to find and delete, and the copy is usually the one that gets forgotten. The usual mistake is to design this after the request arrives; the cost is one identifier, and retrofitting it is the expensive version of the same work.

## Example 2 — Delete, anonymise or keep

The erasure routine is being written and the first draft deletes every row that mentions the person, including the orders that accounting still needs. Decide per field for the one person, and keep the routine so the second request is an execution rather than a project.

```text
draft routine
  delete from users where id = ?
  delete from orders where user_id = ?
```

### Solution

```sql
begin;
  delete from users where id = :subject;          -- profile, email, phone
  update orders
     set customer_ref = 'erased-' || :hash        -- anonymise the reference
   where user_id = :subject;
  -- keep: order total, date, line items (legal retention)
  insert into erasure_log (subject, run_at, action) values (:subject, now(), 'erased');
commit;
```

Erasure does not mean deleting the order: the transaction is needed for accounting, while the personal fields inside it are not, so the reference is replaced with a tombstone and the aggregate stays. Writing the routine and its log as a script means the next request produces proof of what was removed or kept. The usual mistake is to forget the immutable copies — backups, append-only logs and event streams — which return the data after a restore unless the tombstone list is applied at restore time.
