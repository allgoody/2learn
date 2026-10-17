## Example 1 — A call site nobody can read

The function below has one call site, and a reviewer cannot tell what it does without reading the body. Its input is a list of users plus two flags — the second decides whether the result is ordered, the third whether it is trimmed to ten — and its output is a list of at most ten users. Say which two habits it breaks, then rewrite the function and the call so that the call reads as a sentence.

```ts
function proc(u, a, f) {
  let r = [];
  for (const x of u) {
    if (x.s === "active") r.push(x);
  }
  if (f) r = r.slice(0, 10);
  if (a) r.sort((p, q) => q.c - p.c);
  return r;
}

const d = proc(users, true, false);
```

### Solution

```ts
function activeUsersBySpend(users, limit) {
  return users
    .filter((user) => user.status === "active")
    .sort((a, b) => b.spend - a.spend)
    .slice(0, limit);
}

const topActiveUsers = activeUsersBySpend(users, 10);
```

The old names describe nothing: `u` is the users, `a` the ordering flag, `f` the cap flag, `r` the result and `x` the user inside the loop, and none of those meanings is visible at the call site, so the reader must recover all 5 from the 7 lines of the body. The two flags put 2^2 = 2 * 2 = 4 behaviours behind the one name `proc`, and `proc(users, true, false)` is 1 of those 4 combinations — nothing at the call site says which one. The rewrite has 2 parameters, `users` and `limit`, so it has 1 call shape, and `limit = 10` is a value the caller supplies rather than a mode they switch on. The trap is that the flag version looks like the smaller change, because both branches already exist and adding a boolean costs one word at each call site.

## Example 2 — A function that reads as three functions

The body below validates, transforms and saves in one block. It reads the uploaded file, splits it into lines, converts each line into a record, and writes the records — 4 jobs across 10 lines, with no name for any of them. Say how a reader can tell it does more than one thing, then rewrite it as steps at a single level.

```ts
async function handleUpload(file) {
  const text = await fs.readFile(file, "utf8");
  const lines = text.split("\n").filter((l) => l.trim() !== "");
  const rows = [];
  for (const line of lines) {
    const parts = line.split(",");
    if (parts.length < 3) continue;
    rows.push({ id: parts[0], name: parts[1], amount: Number(parts[2]) });
  }
  await db.insertMany(rows);
  return rows.length;
}
```

### Solution

```ts
async function handleUpload(file) {
  const rows = await readRows(file);
  return saveRows(rows);
}

async function readRows(file) {
  const text = await fs.readFile(file, "utf8");
  return text.split("\n").map(parseRow).filter(Boolean);
}

async function saveRows(rows) {
  await db.insertMany(rows);
  return rows.length;
}
```

The coordinating function now reads as a summary — 2 calls at one level — and the detail sits one step deeper, with `parseRow` holding the splitting and the `Number` conversion. The old body's 10 lines become 3 names a reader can stop at, so a change to how a line is parsed touches `parseRow` and a change to the destination touches `saveRows`, 1 function each instead of the whole block. The trap is that the original looks efficient, one pass and no extra names, while making the reader hold 4 jobs in their head at once; a reviewer cannot even say which of the 4 the next comment would apply to.
