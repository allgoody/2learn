## Example 1 — Turn an attack into an objection

A design review stalls on one sentence. The reviewer objects to the person rather than the proposal, and the author has nothing checkable to answer. Rewrite the reviewer's line as a technical objection with a test attached.

```text
Reviewer: I do not think we should ship this. You always rush these things.
Author:   we have shipped worse. What exactly is wrong with it?
```

### Solution

```text
Reviewer: I object to the assumption that the queue never exceeds ten
          thousand items. At launch it passed that, and this design drops
          messages above it. I am at level 2: pull the launch figures and
          I will withdraw if they stayed under.
Author:   the cap was deliberate, but I will pull the figures and we
          decide from them on Thursday.
```

Every sentence names the thing objected to — an assumption about queue depth — and the evidence that would settle it, so it can be answered and then dropped. "You always rush these" attacks the person and leaves nothing to check. The usual mistake is keeping the feeling and losing the claim, so a real technical risk is heard as a preference.

## Example 2 — Disagree, then commit

The decision went the other way. Write the note that records your objection once, states your support, and names the date you revisit it.

```text
Decision    keep the single-region database
Your view   the failover test has never run outside office hours
```

### Solution

```text
Agreed      single-region database, decided at Monday's review
Position    I disagree and will support the decision
Risk        if a regional outage happens before the failover test has
            run outside office hours, recovery time is unproven
Revisit     after the next scheduled failover test, or on 14 November,
            whichever comes first
```

The note ends the argument and leaves the risk somewhere it can be found rather than in a later "I told you so". The usual mistake is re-arguing after the decision in side channels; the team learns to stop deciding in front of you, and the objection costs more than the risk ever did.
