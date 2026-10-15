## Example 1 — Importing a file starts a program

A colleague wants to reuse one function from a script. Importing the file prints a progress line, writes an index and takes seconds, because the work sits at module level. Make the file both a module and a program.

```py
import json

def load(path):
    with open(path) as handle:
        return json.load(handle)

def build_index(rows):
    return {row["id"]: row for row in rows}

rows = load("rows.json")
index = build_index(rows)
print(f"indexed {len(rows)} rows")
run_report(index)
```

### Solution

```py
import json

def load(path):
    with open(path) as handle:
        return json.load(handle)

def build_index(rows):
    return {row["id"]: row for row in rows}

def main():
    rows = load("rows.json")
    index = build_index(rows)
    print(f"indexed {len(rows)} rows")
    return run_report(index)

if __name__ == "__main__":
    main()
```

Importing executes a module's top-level statements the first time and only then, which is why the import alone printed and indexed; under the main guard the work happens only when the file is run directly, and the functions become callable from a test. The mistake is to move the work into a function but leave the call outside the guard, so the import still starts a program. Keep the guard and the top level free of side effects.

## Example 2 — Two projects sharing one interpreter

Installing a library for a second project upgraded the copy the first project relies on, and the first project now fails at import. The readme records only what the author remembered. Produce the environment and the recorded list that the next person can rebuild from.

```py
# report.py — worked on the author's machine
from <dependency> import read_rows
```

### Solution

```text
python -m venv .venv
.venv/bin/python -m pip install -r requirements.txt
.venv/bin/python -m pip freeze > requirements.lock

# each project now builds from its own lock file, not from memory
```

A virtual environment gives each project its own interpreter and set of installed packages, so an upgrade for one cannot touch the other, and the frozen list records the versions a colleague rebuilds from. Installing into whatever interpreter happens to be active, and writing the dependency list from memory, is the mistake. Substitute your own dependency name for the placeholder above — the point is the two recorded files, not the package.
