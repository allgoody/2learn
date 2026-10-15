## Example 1 — A specification with the edges written down

A service reads a CSV of orders. Each line holds an id, a name and an amount, and the file may contain a header, blank lines and rows whose amount is not a number. The pseudocode below is the draft written before any code. Say what it does with a blank line and a bad amount, then give the same algorithm in a real language.

```text
parse_line(line):
  fields = split(line, ",")
  id = fields[0]
  name = fields[1]
  amount = number(fields[2])
  return { id, name, amount }
```

### Solution

```text
a blank line splits into one empty field, so fields[1] and fields[2] are
missing; a non-numeric amount becomes a wrong number, not an error. The
draft has the happy path and no edges.

parse_line(line):
  if line is blank: return skip
  fields = split(line, ",")
  if fields has fewer than 3 parts: return reject "short row"
  amount = number(fields[2]), or return reject "amount is not a number"
  return { id: fields[0], name: fields[1], amount }
```

```py
def parse_line(line):
    if not line.strip():
        return None                      # header or blank line
    parts = line.split(",")
    if len(parts) < 3:
        return None
    try:
        amount = float(parts[2])
    except ValueError:
        return None
    return {"id": parts[0], "name": parts[1], "amount": amount}
```

Writing the branches before the code surfaces the two decisions the draft left implicit: blank lines are skipped silently, and a bad amount rejects the row rather than raising. The trap is that both behave identically on a clean file, so only the pseudocode pass, or a test with a deliberately messy file, finds the difference.

## Example 2 — One sentence hiding five steps

A design review turns up the block below. It reads as a single step, so a reviewer cannot see where the decisions are. Say what is wrong with it, and rewrite it so each layer is visible.

```text
process_upload(file):
  load the file, skip the header, split each line, validate the columns,
  insert the rows and email a summary to the uploader
```

### Solution

```text
process_upload(file):
  rows = read_rows(file)           # load, skip header, split lines
  valid, rejected = validate(rows)
  inserted = insert(valid)
  notify_uploader(inserted, rejected)

read_rows(file):
  lines = read all lines of file
  drop the first line if it is a header
  return split each remaining line on ","
```

Naming the four steps exposes the decisions the long sentence buried: whether a header is always present, what becomes of rejected rows, and whether a summary is sent when nothing was inserted. The trap is that the one-sentence version looks complete — every operation is named — while giving a reviewer nothing to disagree with.
