## Example 1 — A destructive command straight from a search result

A developer pastes a one-liner from an answer they found and changes only the path. `-r` makes `rm` recurse into directories and `-f` stops it asking for confirmation, so the command deletes whatever the pipeline hands it, and the run reports no output and exit status 0. Explain what the terminal was missing here, then show the habit that prevents it.

```bash
# from an answer written for a different repository layout
rm -rf $(grep -rl "TODO" src/)
# $(...) substitutes the command's output, so the file list becomes rm's arguments
# -r recurse into directories, -f never ask
# output: nothing. exit status: 0, because rm succeeded at whatever it was handed
```

### Solution

```bash
grep -rl "TODO" src/                # -l prints each matching file's path, not the matching line: 41 paths
grep -rl "TODO" src/ | wc -l        # 41: the count, before anything is deleted
grep -rl "TODO" src/ | head -5      # the first 5 of those paths, to see which files they are
grep -rl "TODO" src/ | xargs rm     # now the deletion is a decision already checked
```

Because every tool reads text and writes text, output can be inspected as data before it is acted on, and that one habit turns an irreversible class of mistake into a few seconds' delay. Two details make it necessary: `grep` prints 0 lines and exits 1 when it matches nothing, so a surprising list and a failed search have to be told apart before the delete runs rather than afterwards. Reading the help for the tool you actually have, instead of trusting a command written for another version, is the same discipline this entry asks for on anything that deletes or overwrites.

## Example 2 — A command typed for the third time this week

An engineer keeps typing the same 53-character invocation to see what they have been working on, and retypes it from memory each time. It is slow, and every retype is another chance to mistype one of the characters. Say which habit this is asking for, then apply it.

```bash
# retyped from memory, 53 characters, third time this week
git log --since="1 week ago" --author="$(git config user.name)" --oneline
```

### Solution

```bash
# ~/bin/weekly - a script, 6 characters to type, one comment saying what it is for
# list my commits from the last week
git log --since="1 week ago" --author="$(git config user.name)" --oneline

# for an invocation with no arguments, an alias is enough
alias ll='ls -alh'    # a 2-character name for a 7-character invocation

53 - 6 = 47 characters saved per use, at 3 uses a week
```

The first time a long command is a one-off; the second time it is a candidate. A name with a comment is faster to recall than 53 characters, saves 53 - 6 = 47 of them on each of the 3 uses a week, runs from any directory once it is on the path, and gives the next reader — often the same person months later — a one-line explanation of what it does. The complementary habit is searching history with `Ctrl+R` instead of retyping, which reuses the command exactly as it ran rather than as it is remembered. Together those two are most of what separates a comfortable terminal user from a fluent one.
