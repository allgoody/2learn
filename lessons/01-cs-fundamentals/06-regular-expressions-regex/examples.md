## Example 1 — A date pattern that accepts too much

A pattern is meant to validate a date written as four digits, a dash, two digits, a dash and two digits, and it is used to check a whole form field. The value below with a time on the end passes anyway. Say what the pattern actually checks, and how to make it reject anything but a bare date.

```text
pattern: \d{4}-\d{2}-\d{2}

accepted by the pattern:
  "2026-10-15"          yes
  "2026-10-15T09:00"    yes   <- should be rejected
  "x 2026-10-15 y"      yes   <- should be rejected
```

### Solution

```text
the pattern has no anchors, so it only asks whether a date appears
somewhere in the text — not whether the whole value is one.

anchored: ^\d{4}-\d{2}-\d{2}$
  "2026-10-15"          matches
  "2026-10-15T09:00"    no match
  "x 2026-10-15 y"      no match
```

An unanchored pattern is tried at every position in the string, so it succeeds as soon as any substring fits — the commonest source of false positives in validation. The caret pins the match to the start and the end anchor to the end, so together they require the pattern to consume the whole value. The trap is that the anchored form can still accept a trailing newline in engines where the end anchor matches just before one, so use the strict end anchor when the input comes from a file.

## Example 2 — Finding the word that was typed twice

An editor must report words repeated back to back, such as `the the`. The first attempt below reports far too much. Say why, then give a pattern that reports only genuine repeats, and name the group it captures.

```text
text: "we we should should read the the spec"

first attempt: \w+ \w+
matches: "we we", "should should", "read the", "the the"
         <- "read the" is not a repeat
```

### Solution

```text
\b(\w+)\s+\1\b
  group 1 captures the first word; the backreference \1 matches the
  same text again, so the second word must equal the first.
  matches: "we we", "should should", "the the"   (not "read the")
  for "the the": group 1 = "the"
```

A backreference re-matches whatever the group captured, so the pattern compares the second word with the first instead of accepting any word at all; the word-boundary markers keep it from matching inside longer words. The trap is case: `The the` captures `The` and then demands exactly `The`, so add a case-insensitive flag if that should count, or normalise the case before matching.
