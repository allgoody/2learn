## Example 1 — Building the report one stage at a time

A log file holds 1 line per request and the endpoint is field 7 when a line is split on spaces. From the 7 request lines below, produce the endpoints ordered by how often each was requested, most frequent first, with a count beside each. The stages are to be run one at a time. Say what each stage adds, and why the diagnostics are sent somewhere else.

```bash
wc -l access.log
# 8 access.log          8 lines: 1 header + 7 requests

head -2 access.log
# 10.0.0.7 - - [14/Feb/2026:09:01:02 +0000] "GET /basket HTTP/1.1" 200 512
#            1  2         3        4       5    6     7        8      9  10       10 fields,
# so splitting on spaces puts the endpoint /basket in field 7

cut -d' ' -f7 access.log
# /basket /home /basket /login /basket /home /basket         7 lines out, one per request
```

### Solution

```bash
cut -d' ' -f7 access.log 2> errors.txt \
  | sort | uniq -c | sort -rn | head -5

sort     groups equal endpoints into neighbours, so /basket's 4 lines are adjacent
uniq -c  prefixes each run of identical adjacent lines with its count:
           4 /basket
           2 /home
           1 /login
         4 + 2 + 1 = 7 lines accounted for, one per request
sort -rn -n compares the counts as numbers and -r reverses them, so 4 comes first
head -5  keeps the first 5 lines; only 3 exist, so all 3 print
2> errors.txt  sends stream 2 to a file, keeping diagnostics out of the counts
```

Building from the left makes a wrong field visible after the first command instead of inside a confident final answer: `cut` alone showed 7 endpoints, the fourth line being `/login`. Sorting before counting is the stage people skip, because `uniq` compares only adjacent lines — unsorted, `/basket` appears 4 separate times with a count of 1 each and the tally still adds to 7. The trap is the 3 streams: letting diagnostics share stream 1 would have added a `cut` warning as an extra counted line.

## Example 2 — A missing log that looked like a quiet day

A nightly script counts the errors of the day and prints the number. The run below reported no count at all while the log file was in fact missing, and the same script prints `0` on a day with no errors. Say what each status means, then rewrite the script so a failure cannot be read as a valid result.

```bash
count=$(grep -c "ERROR" /var/log/app.log)     # the file was removed by log rotation
echo "errors: $count"
# errors:                                     <- $count is empty: grep wrote nothing to stream 1
# grep: /var/log/app.log: No such file or directory      <- and this went to stream 2

grep -c "ERROR" /var/log/app.log; echo "status $?"
# grep: /var/log/app.log: No such file or directory
# status 2

grep -c "ERROR" /var/log/app.log   # with the file present and 0 matching lines
# 0
# and the status would be 1
```

### Solution

```bash
if count=$(grep -c "ERROR" /var/log/app.log); then
  echo "errors: $count"
else
  status=$?
  echo "could not read the log (exit $status)" >&2
  exit 1
fi
```

```text
the 3 statuses grep returns here, and what each means
  0  1 or more lines matched, and $count holds their number
  1  0 lines matched in a file that was read: a quiet day
  2  the file could not be read: a different problem, and stream 1 stayed empty
```

A command reports success as status 0 and failure as anything else, and the failing `grep` left `$count` empty instead of a number, so the script could not tell a quiet day from a deleted file — and the same confusion arises with the file present, where `0` arrives with status 1. Testing the status first removes the ambiguity: the success path prints the count, and the failure path names what could not be read and exits 1 so the caller notices. The trap is that both outputs look perfectly plausible, so the fault surfaces much later as a report that was quietly counting nothing.
