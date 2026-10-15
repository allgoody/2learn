## Example 1 — A scan hidden inside a loop

A nightly job matches users against a subscriber list and takes minutes on inputs of a few thousand each. Both sides arrive as ordinary lists. Rewrite the lookup so the cost no longer grows with both lengths.

```py
subscribers = read_subscribers()      # list of dicts
allowed = []
for user in read_users():
    for sub in subscribers:
        if sub["email"] == user["email"]:
            allowed.append(user)
```

### Solution

```py
subscribers = read_subscribers()
by_email = {sub["email"] for sub in subscribers}

allowed = [user for user in read_users() if user["email"] in by_email]
```

Testing membership in a set is effectively constant time, so each user is answered in one check instead of a walk down the whole subscriber list, and the users are still read in a single pass. The mistake is to keep the nested loop and tune it, when the collection rather than the loop decides the cost. Reach for a dictionary when the answer needed is a value rather than a yes or no.

## Example 2 — Processing a file that does not fit in memory

A script totals the numbers in an export file. It works on the sample and is killed on the real file, which is several times larger than the memory available. Rewrite it to hold one line at a time.

```py
def totals(path):
    with open(path) as handle:
        numbers = [int(line) for line in handle]
    return sum(numbers)
```

### Solution

```py
def lines(path):
    with open(path) as handle:
        for line in handle:
            yield line.strip()

def totals(path):
    return sum(int(line) for line in lines(path) if line)
```

Each value is produced when it is asked for, so the pipeline holds only the current line and works on a file larger than memory, and the file still closes when the generator is exhausted. The mistake is to reintroduce `list(...)` partway through the pipeline, which puts the whole file back into memory and returns the original failure. A generator is also the right answer when only the first match is needed and the rest would be discarded.
