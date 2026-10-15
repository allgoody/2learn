## Example 1 — A call site nobody can read

The function below has one call site, and a reviewer cannot tell what it does without reading the body. Say which two habits it breaks, then rewrite the function and the call so the call reads as a sentence.

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

The old names describe nothing: `u`, `a` and `f` force the reader into the body, and the two boolean flags make one function do four things depending on how they are set. Naming the outcome, and passing the limit as a value instead of a flag, turns the call site into a sentence so the reader never needs to open the function. The trap is that the flag version is the easier one to write, because both branches already exist and adding a boolean looks like a smaller change than splitting the function.

## Example 2 — A function that reads as three functions

The body below validates, transforms and saves in one block. Say how a reader can tell it does more than one thing, then rewrite it as steps at a single level.

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

The coordinating function now reads as a summary — two calls at one level — and the detail sits one step deeper, with `parseRow` holding the splitting and the amount conversion. The trap is that the original block looks efficient, one pass and no extra names, while making the reader hold file reading, parsing, validation and persistence in their head at once; a reviewer cannot even say which of the four steps the next comment applies to.
