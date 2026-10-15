## Example 1 — Building the report one stage at a time

A log file holds one request per line, and the seventh space-separated field is the endpoint. The goal is the five most-requested endpoints with their counts, with errors kept out of the results. The stages below are run one at a time. Say what each adds, and why the errors were separated.

```bash
cut -d' ' -f7 access.log           # one endpoint per line
cut -d' ' -f7 access.log | sort    # equal endpoints become neighbours
... | uniq -c                      # counts each run of identical lines
... | sort -rn                     # most frequent first
... | head -5                      # the five asked for
```

### Solution

```bash
cut -d' ' -f7 access.log 2> errors.txt \
  | sort | uniq -c | sort -rn | head -5

sort      groups equal endpoints together so uniq -c can count a run
uniq -c   needs sorted input; unsorted, it reports many small counts
sort -rn  orders by the number uniq printed
2> errors.txt  keeps diagnostics out of the pipeline
```

Each stage is one small transformation, and building from the left makes a wrong field or flag visible after the first command instead of buried in a confident final answer. Sorting before counting is the step people skip: `uniq` collapses only adjacent equal lines, so unsorted input reports the same endpoint several times with small counts. The trap is the three streams — letting diagnostics share standard output would have added junk lines to the tally.

## Example 2 — A failure that looked like an empty result

A script counts today's errors and prints the number. The run below printed `0` while the log file was in fact missing. Say what produced the zero, and rewrite the script so a failure cannot be read as a valid result.

```bash
count=$(grep -c "ERROR" /var/log/app.log)
echo "errors: $count"
# errors: 0        <- the file does not exist
```

### Solution

```bash
if count=$(grep -c "ERROR" /var/log/app.log); then
  echo "errors: $count"
else
  echo "could not read the log (exit $?)" >&2
  exit 1
fi
```

A command reports success as exit status zero and failure as anything else, and the failing `grep` still wrote `0` to standard output, so the script could not tell a quiet day from a missing file. Testing the status first removes the ambiguity: the failure path says what could not be read and exits non-zero so the caller notices. The trap is that the number looks perfectly valid, so the fault surfaces much later as a dashboard that was quietly reporting zero.
