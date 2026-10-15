## Example 1 — One line per stakeholder, with a decision in every row

Three people are on the map for the refunds work. Write the short plan that says what each of them gets, when, and from whom — and make every row a decision or a change, not an update.

```text
Stakeholders from the map
  Maya, finance lead   must sign off the refund audit trail
  Tom, CTO             no new system
  Priya, support lead  her team's calls will change
```

### Solution

```text
Who    What they get                            When               From
Maya   sign-off request + the audit-trail note  before the build   PM
Tom    one-line architecture impact note        monthly            tech lead
Priya  what changes for her team + FAQ          2 weeks pre-release PM
All    one-page status listing decisions made   fortnightly        PM
```

Every row names a decision or a change, so nobody has to guess what they are being asked for; the form, the frequency and the sender are fixed in advance rather than remembered. The usual mistake is sending "updates", which keep people informed and aligned to nothing.

## Example 2 — Record the decision and chase the silence

A decision was taken in a small meeting with two people absent. Write the note that goes to both the room and the absentees, and that treats the silence as un-agreed until it is answered.

```text
Wednesday's meeting
  Decision: refunds over the approval limit need manager sign-off
  Present: PM, Maya      Absent: Tom, Priya
  Rejected: routing every refund through finance (too slow)
```

### Solution

```text
Subject: decision — manager sign-off for refunds over the limit

Decision: from 1 September, refunds above the limit need manager
sign-off before finance confirms.
Present: PM, Maya.   Not present: Tom, Priya.
Rejected: routing every refund through finance.
Please reply by Friday — confirm, or raise an objection now.

Next: if no reply by Friday, follow up with Tom and Priya directly.
```

One short note carrying who was there, what was decided and what was rejected is the only reliable protection against memories drifting apart within weeks. Asking for a reply before Friday turns silence from implied consent into an open item. The usual mistake is treating no answer as agreement, so the objection arrives after the build.
