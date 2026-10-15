## Example 1 — A subprocess whose failure is ignored

A nightly job renders a directory and then moves on to the next stage. The command is assembled as a string, and a failure in the render step goes unnoticed until an empty output appears later. Rewrite it so a failed command stops the job.

```py
import os

def render(source, target):
    os.system("python render.py " + source + " " + target)
    print("rendered")
```

### Solution

```py
import subprocess
from pathlib import Path

def render(source: Path, target: Path) -> None:
    result = subprocess.run(
        ["python", "render.py", str(source), str(target)],
        capture_output=True,
        text=True,
    )
    if result.returncode != 0:
        raise RuntimeError(result.stderr.strip())
```

Passing a list of arguments removes the quoting rules, so a path containing a space can no longer change the meaning of the command, and checking the return code turns a silent failure into a stopped job. Writing progress to the error stream keeps standard output clean for the data the caller may be reading, which matters the moment the script is used in a pipeline. The usual mistake is to assume the command worked because it printed nothing.

## Example 2 — A script that fails on its second run

A report script creates its output directory and writes a summary. It works once; a retry after a partial failure stops with an error, so the directory has to be cleaned up by hand. Make it safe to run twice.

```py
from pathlib import Path

out = Path("build", "report")
out.mkdir()                              # fails when it already exists
(out / "summary.txt").write_text(summarise())
```

### Solution

```py
from pathlib import Path

out = Path("build", "report")
out.mkdir(parents=True, exist_ok=True)   # second run reuses it
(out / "summary.txt").write_text(summarise())
```

Creating what is missing and continuing means the script can be retried after a partial failure, which is what makes automation safe to leave unattended. The path library handles separators, extensions and existence checks on either platform, so the one expression keeps working where joined strings would not. The mistake is to treat the script as run-once: something that must happen exactly once needs a person to supervise it, which defeats the purpose.
