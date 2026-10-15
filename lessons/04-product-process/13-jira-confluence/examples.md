## Example 1 — A research report stored as a ticket

A Jira ticket holds nine paragraphs of research about a payment provider that the reader cannot find in the wiki. Move each thing to the tool shaped for it, and make the ticket readable in six months.

```text
Jira board (team board)
  Backlog        In progress     Done
  PAY-141 vendor research        PAY-138 tax rounding
  PAY-139 refund fix

PAY-141  "stuff about the new payment provider"
  (nine paragraphs of comparison, no owner, no decision)
```

### Solution

```text
Confluence page  "Payment provider comparison"
  Owner: Dana   Review: 2027-01-15   Decision: stay with current provider
  Linked from PAY-141.

Jira ticket PAY-141
  Title  Decide payment provider for EU invoices
  Body   Outcome wanted; options considered; link to the page
  Links  the decision page, the change that raised the need
Status   Done
```

The page holds content and carries an owner and a review date, so a stale comparison is flagged rather than trusted, while the ticket keeps the state and the reasoning one click away. The ticket answers what a reader six months from now will ask, because the outcome is in the title and today's context is written down. The trap is storing a document as a ticket: it becomes unsearchable the moment it leaves the board.

## Example 2 — A workflow configured by the tool's default

A Jira workflow has eleven statuses, and an estimate field is filled in only for a weekly dashboard. The audit below covers the last fifty items. Say which statuses to delete and what to decide about the field.

```text
Status            items through   longest wait
Open                  50            2 days
In analysis           11            9 days
In progress           38            3 days
In review             40            2 days
Awaiting approval      4           14 days
Blocked                2           21 days
In staging             9            4 days
Deploying              9            1 day
... 3 more statuses, 0 items each
```

### Solution

```text
Delete    Open, In analysis, Awaiting approval, Deploying and the three
          zero-count statuses: nobody moves items through them.
Keep      In progress, In review, Blocked, In staging: each means
          something a person acts on and each has a way out.
Field     the estimate exists only for the dashboard -> decide whether
          to keep the report or stop collecting it.
```

Every remaining status means something a person can act on and has a way out; the seven deleted statuses were inherited defaults that added clicking without information. The estimate field is the second lesson: the tool is shaping the process when a field exists for its report rather than for the work, so that is a decision to make on purpose. The trap is leaving a column nobody uses, which is where items quietly age.
