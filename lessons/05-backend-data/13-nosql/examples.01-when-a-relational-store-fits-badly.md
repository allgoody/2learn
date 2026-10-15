## Example 1 — A table most of whose columns are empty

The table below holds a catalogue of books and downloads in one place. Most rows leave most of these columns null, and every new kind of item adds more. Name what the table is imitating, decide whether the varying attributes are genuinely variable, and produce the shape you would store instead.

```sql
CREATE TABLE items (
  id          bigint PRIMARY KEY,
  title       text NOT NULL,
  author      text,        -- books only
  pages       integer,
  isbn        text,
  duration    integer,     -- downloads only
  resolution  text,
  media_id    text
);
```

### Solution

```text
title: Ship It
kind: book
detail: { author: "A. Writer", pages: 320, isbn: "9780000000000" }

title: Systems in Practice
kind: download
detail: { durationSeconds: 5400, resolution: "1080p", mediaId: "med_a1" }
```

The relational model assumes every row of a table has the same attributes, and here it plainly does not: the varying part is genuinely variable rather than merely sparse, so the table is a document shape wearing columns and the constraints on the unused columns are meaningless. Two honest options exist — a table per kind, joined when both are needed, or a document with a `kind` field whose shape is validated at the boundary. The second does not remove the schema, it moves enforcement into the reading code, where an unvalidated collection accumulates a dozen variants of the same record.

## Example 2 — Three datasets and what decides each store

The three workloads below are being moved off the relational database at once. Say for each which property of the access pattern decides the store, and state which of them cannot be justified by size.

```text
session store       read and written by one key on every request
product catalogue   records whose attributes differ by category
social graph        "people who follow people who follow this account"
```

### Solution

```text
session store       fetched only by a single key      -> key-value
product catalogue   varying attributes per record     -> document
social graph        traversal several levels deep     -> graph

none of the three is decided by size
```

A relational engine maintains indexes and a planner so it can answer questions nobody has asked yet, and the session workload only asks for the value of a key, paying for machinery it never uses. The graph query is a join repeated an unknown number of times, awkward to express and direct where relationships are the data. In all three the mismatch is about how the data is shaped and read rather than how much there is: the usual justification is scale, and the usual reality is a small workload with an awkward schema.
