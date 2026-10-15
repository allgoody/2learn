## Example 1 — A research page that cannot be filtered

A study's notes live in one long page mixing the questions, the findings and the decisions made afterwards. Split it so a decision can point at the finding and the study behind it.

```text
"Checkout study — all notes"
  ...question, method, participant quotes,
  findings, what we changed, more quotes...
```

### Solution

```text
Studies    owner, date, method, participants, question, notes
Findings   study, screen, count, severity, status
Decisions  finding, change, owner, date, status

Study page template
  Question · Method · Participants
  Findings · Decisions   (raw notes in a child page)
```

One database per kind of object gives each its own fields, so findings can be filtered by screen and a decision can cross-reference the finding and study behind it. The trap is the single long page: a study, a finding and a decision have different fields, and mixing them means search returns the page rather than the answer.

## Example 2 — A decision record with its evidence attached

A decision to move the help link is known only inside a chat thread. Write the decision record so a colleague can see why the alternative was rejected, without leaving the tool.

```text
Chat: "let's move help to the header"
      "ok" — no reason, no owner, no date
```

### Solution

```text
Decision: Move help to the header
Finding:  3 of 6 participants looked under account first
Study:    Sign-up sessions, March   -> raw notes
Owner:    Priya
Date:     12 Jun
Status:   decided
Rejected: keep help in the footer — not found in 4 of 6
          first attempts
```

Linking the decision to its finding and study is what lets the evidence survive the person who collected it, and recording the rejected option says why the change was made and not just what it was. Storing the decision as a bare line without an owner, a date or its evidence is the usual slip, because six months later it reads as an assertion that no one can check.
