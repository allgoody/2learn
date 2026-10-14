---
title: Scripting and automation
prereqs: ["backend-data/python-programming/03-modules-and-packaging"]
---

## What it is

Using Python as the automation language: the standard-library modules for files and paths, subprocesses, dates, archives, structured data formats and command-line arguments. These replace the shell script once the shell script grows branches, needs to parse a document, or has to run on a machine whose shell behaves differently. The result is a program that is testable, portable across platforms and readable to anyone who knows the language.

## Why it matters

Shell is excellent for a pipeline of three commands and painful for anything with conditionals. Once a script parses JSON, retries a network call, or needs to behave the same on two operating systems, the shell's quoting and error-handling rules become the main source of defects. Python's standard library covers those cases without any dependency, which matters most in the environments automation runs in: a build machine, a container, a server you cannot easily add packages to.

## Core ideas

### Path handling belongs to a library, not to string concatenation

The path modules handle separators, joining, extension changes and existence checks in a way that is correct on every platform. Building paths by concatenating separators works until the code runs on the other kind of machine, and then it fails in a way that looks like a missing file rather than a bug.

```text
from pathlib import Path
config = Path.cwd() / "config" / "app.yaml"
```

### Subprocesses need to be run with explicit arguments and checked exit codes

Running an external command by passing a list of arguments avoids the quoting rules entirely and removes a class of injection problems. The return code must be checked: a subprocess that fails without raising lets the script continue as though it had worked, which is the standard way an automation job reports success while doing nothing.

A script used in automation communicates through its exit code, its standard output and its standard error. Writing progress to the error stream keeps the output stream clean for data, and exiting non-zero on failure is what lets the caller notice. A script that always exits zero is unusable in a pipeline.

### Dates and times need an explicit time zone

Naive datetimes carry no zone and silently compare against anything. Attaching a zone at the point a value enters the program, and converting only for display, avoids the off-by-hours bugs that appear twice a year and after every deployment to a different region.

### Structured data formats have library support, and a schema check is still needed

Reading and writing structured documents is a one-line call; verifying that the document has the fields you expect is not. Configuration files and API responses change, and a script that assumes a key exists fails at the least convenient moment. Validating the shape at the boundary turns that into a clear error.

### Command-line arguments deserve a declared interface

A small argument parser gives the script named options, defaults, types and a generated help message. Positional argument order is the alternative, and it is what makes a script impossible to run from a cron entry six months after it was written.

### Idempotence is what makes automation safe to re-run

A script that can be run twice without harm — creating what is missing rather than failing on what exists — can be retried after a partial failure. Automation that must be run exactly once is automation that must be supervised, which defeats the purpose.

## Practice

### Replace a shell pipeline

Take a shell script that lists files, filters them and runs a command on each, and rewrite it in Python using the path library and a checked subprocess call.

Done when: the script behaves identically on both path separators and exits non-zero when the subprocess fails.

### Make a script safe to re-run

Take an automation script that fails if its output directory already exists and change it to create what is missing and continue.

Done when: running it twice in a row produces the same end state and a zero exit code both times.

## Common mistakes

- **Building paths by string concatenation** — the script breaks on the other platform; fix: use the path library.
- **Ignoring a subprocess's exit code** — a failed command is reported as success; fix: check the return code and act on it.
- **Writing data to standard output and progress to it as well** — the consumer cannot separate them; fix: send progress to standard error.
- **Comparing naive datetimes** — comparisons are wrong across zones and daylight changes; fix: attach a zone where values enter the program.
- **Assuming a configuration key exists** — the failure occurs mid-run; fix: validate the document's shape at the boundary.

## Go deeper

- **Modules and packaging** (`backend-data/python-programming/03-modules-and-packaging`) — how these scripts are organised and their dependencies recorded.
- **Python Programming** (`backend-data/python-programming`) — the language this automation is written in.
- **UNIX Shell** (`cs-fundamentals/unix-shell`) — the tool this entry replaces once a script grows past a few commands.
