## Example 1 — Choosing the assumption worth testing

The solution has four assumptions and the team wants to start with the easiest, which would produce a pleasant and uninformative result. Discovery asks for the one most likely to be wrong and most expensive if it is, tested alone, with its decision rule defined alongside. Pick it from the list below and write the cheap test.

```text
Proposed solution: remember card details for repeat buyers.
Assumptions
  - repeat buyers will have a card stored
  - the security review for storage passes
  - users will find the toggle
  - the consent wording is clear
```

### Solution

```text
Riskiest assumption   repeat buyers will have a card stored
Why                   if it is wrong, the whole approach is wrong.
Cheap test            offer "remember my details for next time"
                      without storing anything, for one week.
Signal                use of the option at checkout, plus repeat rate.
Threshold             below 15% uptake means storage was never the
                      point; decision: stop the build.
Decision written with the test, before it runs.
```

The test costs a week and can remove a quarter of work, and it measures behaviour: a click at checkout is evidence where "I would use that" is not. The common failure is testing the wording or the toggle, which cannot change the direction of the work.

## Example 2 — A concierge test with its decision attached

The team is unsure whether small accounts want a quarterly review, and building the scheduling and reporting would take a quarter. A concierge test delivers the outcome by hand for the first few customers, so willingness shows up before automation exists. Write the one-page test plan below, with its decision rule agreed in advance.

```text
Idea: a quarterly review call for small accounts.
Open question: does anyone want it, and would they attend the call?
Concern: building it first would cost a quarter.
```

### Solution

```text
Assumption   small accounts will attend a scheduled review call
Test         run the reviews by hand for the next three renewing
             accounts, writing the prep note each time.
Week 1       offer the date to four; two accepting is the floor.
Week 2       run the calls; record every manual step.
Threshold    3 of 4 accept and attend -> automate the scheduling.
             2 or fewer -> stop and record that for the next team.
Result recorded either way, with the manual steps listed.
```

Running the job by hand answers the question a quarter of engineering would have answered, and it doubles as the specification for whatever gets automated. The common failure is a test stated without its threshold, so the result arrives and the team debates whether it was good.
