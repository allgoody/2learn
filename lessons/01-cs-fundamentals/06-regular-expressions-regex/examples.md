## Example 1 — A date pattern that accepts too much

A form field must hold a date written as four digits, a dash, two digits, a dash and two digits, and nothing else. The pattern below is 17 characters long and is used to check the whole field. The two values with extra text pass anyway. Say what the pattern actually checks, and how to make it reject anything but a bare date.

```text
pattern: \d{4}-\d{2}-\d{2}        17 characters long

"2026-10-15"         10 characters   the date occupies positions 0 to 9    -> accepted
"2026-10-15T09:00"   16 characters   the date occupies positions 0 to 9    -> accepted,
                                     with 6 characters left over
"x 2026-10-15 y"     14 characters   the date occupies positions 2 to 11   -> accepted,
                                     with 2 characters in front and 2 behind
```

### Solution

```text
the pattern carries no anchors, so the engine tries it at every position of the value
and succeeds at the first position where a date fits. It asks whether a date appears
somewhere in the text, never whether the whole value is one.

"2026-10-15T09:00": the date consumes positions 0 to 9, and positions 10 to 15 hold
"T09:00" — the value is 16 characters and the pattern allows 10 of them.

anchored: ^\d{4}-\d{2}-\d{2}$
  "2026-10-15"         the 10 characters of the pattern must be the whole 10 -> matches
  "2026-10-15T09:00"   the 10 characters would have to be all 16 -> no match
  "x 2026-10-15 y"     the 10 characters would have to be all 14 -> no match
```

An unanchored pattern is tried at each position of the value, so it succeeds as soon as any substring fits, which is the commonest source of false positives in validation. The caret pins the match to position 0 and the end anchor to the last position, so together they require the pattern to consume the whole value — all 10 characters here. The trap is that in some engines the end anchor also matches just before a trailing newline, so `2026-10-15` followed by one still passes; use the engine's absolute end anchor, or check the length separately, when the input comes from a file.

## Example 2 — Finding the word that was typed twice

An editor must report words repeated back to back, such as `the the`. The first attempt below reports four matches and one of them is not a repeat. Say why, then give a pattern that reports only genuine repeats, and name the group it captures.

```text
text: "we we should should read the the spec"      37 characters

first attempt: \w+ \w+     two or more word characters, one space, two or more again
matches, in order: "we we", "should should", "read the", "the the"
"read the" is two words but not the same word twice, so the pattern reports a repeat
that never happened
```

### Solution

```text
\b(\w+)\s+\1\b
  \b      a word boundary, so the group starts at the start of a word
  (\w+)   group 1: the whole first word — for "the the", group 1 is "the"
  \s+     one or more whitespace characters — here, the single space between the words
  \1      the same text as group 1, matched again
  \b      another word boundary, so "the" inside "then" does not match

matches of "we we should should read the the spec":
  "we we"          group 1 = "we"
  "should should"  group 1 = "should"
  "the the"        group 1 = "the"
  "read the"       none: group 1 = "read", and \1 then needs "read" again
```

A backreference re-matches whatever the group captured, so the pattern compares the second word with the first instead of accepting any second word at all; the word-boundary markers keep it from matching inside longer words such as `then`. The trap is case: with `The the` the group captures `The` and `\1` then demands exactly `The`, so add a case-insensitive flag if that should count, or normalise the case before matching.
