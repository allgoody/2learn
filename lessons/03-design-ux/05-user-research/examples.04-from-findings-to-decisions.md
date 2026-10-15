## Example 1 — From six sessions to a decision table

Six checkout sessions produced fourteen observations and a pile of quotes. The team has drafted a finding first and is hunting for quotes to support it. Group the observations first, name the finding, then turn it into a change with an owner, a date and a ranking.

```text
Draft finding the team wants to prove: the address form is too long.
Observations from the sessions:
 "scrolled past search" x5
 "used the recent tab before searching" x6
 "asked a colleague for the order number" x3
 "payment attempt failed, no retry offered" x1
 "retyped the postcode because it did not autofill" x4

Quote on file: "I could not get it to take my card." (P4)
```

### Solution

```text
Finding 1: people reach the last order by browsing, not searching.
  Count: 5 of 6 scrolled past search; 6 of 6 used "recent".
  Quote: "I just go to the last one and copy it." (P2)
  Contradiction: P5 searched every time — noted, not dropped.

Finding 2: a failed payment has no recovery path.
  Count: 1 of 6 attempts. Quote: "I could not get it to take my card."
  Change: add retry and a plain-language failure reason.
  Owner: Maya. Date: next sprint.

Ranking by frequency x severity:
1 failed payment, no recovery   rare x total block   fix now
2 postcode does not autofill   common x short detour fix soon
3 label on the second button   common x mild         fix if cheap
```

The team's draft finding is not what the evidence shows: the address form was never the obstacle — reaching the last order was, and the single payment failure blocked more than the retyped postcode. Clustering first and naming second is what keeps the quotes honest, and the contradiction from P5 sits on the page so the finding can be argued with rather than believed. The usual mistake is a finding with no count: "several users" is a sentence the next meeting dismisses, while "five of six" survives it.
