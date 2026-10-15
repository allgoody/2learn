## Example 1 — The query bill follows the columns that are read

An events table is stored by row and queried for a timestamp, a user and an amount, while the same engine also runs continuously whether or not anyone queries it. Declare the storage that lets a three-column query read three columns, and say what happens to the engine's cost.

```text
table:  events (stored by row; every query scans the whole record)
query:  select user_id, date(event_time), sum(amount)
        from events group by user_id, date(event_time)
```

### Solution

```hcl
resource "google_bigquery_table" "events" {
  dataset_id = "<analytics-dataset>"
  table_id   = "events"

  # store by column: this query reads event_time, user_id and amount only
  clustering = ["user_id"]
  time_partitioning { type = "DAY" }
}
```

Stored by column, the same query reads the three fields it names instead of every payload on every matching row, so the bytes scanned — and the charge that follows them — fall by an order of magnitude. Keeping the data in durable, cheap object storage and billing the query engine only while it runs means an idle warehouse costs almost nothing. The usual mistake is to keep analytical data in the row-oriented store the application already writes to, because that store was there first.

## Example 2 — A pipeline that succeeded and loaded nothing

A nightly job refreshes the data that a configured model retrains from. Some nights the source partition is empty and the job still exits successfully, so the model trains again on yesterday's data. Add the check that catches the data failure rather than the job failure.

```bash
# nightly load, exit status 0 whatever the partition contains
load <events-partition> --date yesterday
echo "load ok"
```

### Solution

```bash
set -euo pipefail
load <events-partition> --date yesterday
rows=$(count <events-partition> --date yesterday)
test "$rows" -gt 0 || { echo "yesterday's partition is empty"; exit 1; }
```

The check now asserts on the data's freshness and shape, so an empty partition fails the run and tells the dataset's owner instead of a stale table being served until someone notices. A configured model cannot cover this: the pipeline's dependencies fail late and quietly, and a job's exit code says nothing about what it produced. The usual mistake is to alert only on crashes and to read a green run as evidence of fresh data.
