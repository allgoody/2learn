## Example 1 — A specification with the edges written down

A service reads a CSV of orders. Each line holds an id, a name and an amount, and the file may contain a header, blank lines and rows whose amount is not a number. The pseudocode below is the draft written before any code. Say what it does with a blank line and with a bad amount, then give the same algorithm in a real language.

```text
parse_line(line):
  fields = split(line, ",")      split returns the pieces of the line as a list
  id = fields[0]                 the first piece
  name = fields[1]               the second piece
  amount = number(fields[2])     the third piece, read as a number
  return { id, name, amount }

a blank line "":        split gives 1 piece, [""], so fields[1] and fields[2] are missing
a short row "7,ana":    split gives 2 pieces, so fields[2] is missing
a bad amount "7,ana,x": split gives 3 pieces, and number("x") is not a number
```

### Solution

```text
the draft has the happy path and no edges: a blank line makes it read a piece that is
not there, and a bad amount becomes whatever number("x") returns rather than an error.

parse_line(line):
  if line is blank: return skip
  fields = split(line, ",")
  if fields has fewer than 3 pieces: return reject "short row"
  amount = number(fields[2]), or return reject "amount is not a number"
  return { id: fields[0], name: fields[1], amount }
```

```py
def parse_line(line):
    if not line.strip():
        return None                      # a blank line: skip it
    parts = line.split(",")
    if len(parts) < 3:
        return None                      # a short row: reject it
    try:
        amount = float(parts[2])
    except ValueError:
        return None                      # the amount is not a number: reject the row
    return {"id": parts[0], "name": parts[1], "amount": amount}
```

Writing the branches before the code surfaces the two decisions the draft left implicit: a blank line is skipped and a bad amount rejects the row rather than raising. The Python then shows the cost of collapsing them, because `None` stands for three different outcomes, so a caller can count what was dropped but not say why. The trap is that both versions behave identically on a clean file, so only the pseudocode pass, or a test with a deliberately messy file, finds the difference.

## Example 2 — One sentence hiding five steps

A design review turns up the block below. The single step reads as one action, though the sentence inside it names six operations and settles five decisions on the way. Say what is wrong with it, and rewrite it so each layer is visible.

```text
process_upload(file):
  load the file, skip the header, split each line, validate the columns,
  insert the rows and email a summary to the uploader

the one step holds six operations: load, skip, split, validate, insert, email
```

### Solution

```text
process_upload(file):
  rows = read_rows(file)             # load, skip the header, split the lines
  valid, rejected = validate(rows)
  inserted = insert(valid)
  notify_uploader(inserted, rejected)

read_rows(file):
  lines = read all lines of file
  drop line 0 if it is a header
  return split each remaining line on ","
```

Naming the four steps exposes the five decisions the long sentence buried: whether a header is always present, what becomes of a rejected row, whether one bad row stops the whole upload, what is emailed when nothing was inserted, and who handles a failure of the email. Until they are named, a reviewer can only agree that the sentence sounds reasonable. The trap is that the one-sentence version looks complete — it does name all six operations — while giving a reviewer nothing to disagree with.
