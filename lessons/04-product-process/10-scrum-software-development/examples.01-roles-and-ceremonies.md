## Example 1 — A stand-up that is really a status report

A developer reports to the delivery manager each morning, task by task. The transcript is what the team says at stand-up. Rewrite it so the fifteen minutes are about the sprint goal and what is in the way.

```text
Dev 1: finished two tickets yesterday, picking up the next one today
Dev 2: still on the same ticket as yesterday, should be done soon
Dev 3: in meetings all morning, no progress
Dev 4: nothing to report
```

### Solution

```text
Sprint goal: a customer can request a refund and see its status.
Dev 1: refund happy path is merged; nothing blocking me.
Dev 2: blocked — the status endpoint needs the payments team's schema
       decision. Nothing else moves until that lands.
Dev 3: I can take the audit-log item if it is still unstarted.
Dev 4: no obstacles; goal not at risk from my work.
```

The rewrite names what changed toward one goal and surfaces the single obstacle in the room, which planning can act on; the original listed activity, so the blocker stayed with Dev 2 and the team learned nothing. The thing that goes wrong is inviting a manager who asks for updates: the answers drift back to looking busy, however the questions are worded. Keep the stand-up the team's, and let the goal do the framing.

## Example 2 — A retrospective that ends with nothing

The team runs a retrospective every other Friday, and the notes below are all it produces. Say what is missing and turn the session into a change the team can check next time.

```text
Retro, sprint 14
  - stand-ups feel long
  - CI is flaky
  - we should communicate better
  - (next retro scheduled)
```

### Solution

```text
Change 1  cap the stand-up at 15 minutes with a timer; owner: Priya
Change 2  quarantine the two flakiest tests this sprint; owner: Sam
Check     both reviewed at the start of the sprint 15 retrospective
```

A retrospective's artefact is one owned change, checked at the next session, and here two named people with a date replace four observations that would otherwise recur. The three accountabilities make this work — the scrum master holds the process while the developers choose the change, and neither is the other's manager. The trap is agreeing the change and never revisiting it; the loop only closes when the next retrospective opens by reading it back.
