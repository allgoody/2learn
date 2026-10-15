## Example 1 — A destructive command straight from a search result

A developer pastes a one-liner from an answer they found, changing only the path. It runs, and the result is not what they expected. Explain what the terminal was missing here, then show the habit that prevents it.

```bash
# from a search result written for a different repository layout
rm -rf $(grep -rl "TODO" src/)
# output: nothing. exit status: 0, because rm succeeded
```

### Solution

```bash
grep -rl "TODO" src/          # see the match list first
grep -rl "TODO" src/ | wc -l  # count it before deleting anything
grep -rl "TODO" src/ | xargs rm   # now the decision is an informed one
```

Because every tool reads text and writes text, output can be inspected as data before it is acted on, and that one habit turns an irreversible class of accident into a few seconds' delay. Two details make it necessary: `grep` exiting non-zero with empty output looks exactly like a valid empty result, so the `rm` can silently do nothing or delete a surprising set. Reading the help for the tool you actually have, rather than trusting a command written for another version, is the same discipline the entry calls on for anything that deletes or overwrites.

## Example 2 — A command typed for the third time this week

An engineer keeps typing the same long invocation to see what they have been working on. It is error-prone and slow, and they retype it from memory each time. Say which habit this is asking for, then apply it.

```bash
# retyped from memory, third time this week
git log --since="1 week ago" --author="$(git config user.name)" --oneline
```

### Solution

```bash
# ~/bin/weekly  — a named script beats a sixty-character invocation
#!/bin/sh
# list my commits from the last week
git log --since="1 week ago" --author="$(git config user.name)" --oneline

# for the short one, an alias is enough
alias ll='ls -alh'
```

The first time a long command is a one-off; the second time it is a script. A name with a comment is faster to recall than the invocation, runs from any directory once it is on the path, and gives the next reader — often the same person months later — a one-line explanation of what it does. The complementary habit is searching history instead of retyping, which reuses the command exactly as it ran rather than as it is remembered. Together they are most of what separates a comfortable terminal user from a fluent one.
