## Example 1 — Reading a finished map into three changes

The renter map is finished and the team has one hour to decide next quarter's work. Read the rows below, mark the moments that decide the experience, and leave with ranked changes rather than a list of problems.

```text
Step       People  Fall   Note (illustrative counts)
Compare     600     -    price versus trust, no clear answer
Check       540    10%   postcode checker rejects valid flats
Order       300    44%   longest fall; call queue before ordering
Wait        280     7%    no date given after ordering
```

### Solution

```text
1. Moment: postcode check rejects valid addresses
   Cost:   1 in 3 checks ends in a phone call
   Cause:  step before — the checker runs on the old coverage file
   Change: return coverage per address, not per postcode
   Owner:  platform team, 14 March
2. Moment: 20-minute call queue
   Cost:   calls abandoned before any order exists
   Change: show the queue position and offer a callback
   Owner:  support tools, 28 March
3. Moment: no installation date
   Cost:   a second call to ask when it will arrive
   Change: send the date with the order confirmation
   Owner:  comms, 4 April
```

The deepest fall sits at Order, but the ranked moment moves one step earlier to the checker that creates it, which is where the leverage is. Each strip names a step on the map and an owner, so the hour ends in decisions rather than three problem statements. The usual mistake is to fix the loudest visible step directly, and to close without an owner or a date on any of them.
