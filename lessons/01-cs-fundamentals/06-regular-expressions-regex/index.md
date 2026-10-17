---
title: Regular Expressions (Regex)
type: skill
topic: 01-cs-fundamentals
tier: small
status: drafted
aliases: ["Regex"]
prereqs: []
related: []
---

## What it is

A regular expression is a small pattern language for describing text. You write what the text should look like, and a matching engine tells you whether a string fits, which part of it matched, or what pieces it contains. The pattern `\d{4}-\d{2}-\d{2}`, 17 characters long, stands in for one rule about dates; the same syntax appears in a validation rule, an editor search-and-replace, a log filter and a route definition, which is why it is worth learning properly rather than copying a pattern from a search result you cannot explain.

## Why it matters

A regex is the shortest way to express some checks and the most expensive way to express others. A pattern that validates an email address can reject `ana@example.com` or accept `not-an-address`, and because the syntax is dense a wrong pattern still matches something, so the bug is a false positive that no error message points at. A pattern with nested quantifiers can turn a 27-character input into 2^26 = 67 108 864 attempts before it gives up, which is minutes of processor time inside a single request. The practical skill is knowing the few constructs that cover ordinary work, and recognising the shapes that risk runaway matching.

## Core ideas

### A pattern describes one position at a time

The engine walks the string and asks whether the pattern can match starting at each position, unless you anchor it. `^` means the start of the string or line and `$` means the end, so an anchored pattern must consume the whole value rather than a piece of it. Without anchors a validation pattern confirms only that the text contains a match somewhere, which is the commonest source of false positives.

```text
pattern: [0-9]{3}      three digits anywhere
value:   "abc123def"  9 characters, positions 0 to 8

without anchors:
  position 0 "a": not a digit
  position 1 "b": not a digit
  position 2 "c": not a digit
  position 3 "1": the first of three digits -> the match is "123", positions 3, 4 and 5
  so "abc123def" is accepted, though it is not three digits

pattern: ^[0-9]{3}$
  the match must start at position 0 and end at position 8, and "abc" is not
  three digits -> no match, so the value is rejected
```

### Character classes and escapes name the alphabet

A literal character matches itself. A class in square brackets matches any one of its members, and the shorthands cover the common sets: a digit, a word character, whitespace. A `^` just inside the opening bracket inverts the class. Metacharacters that should stand for themselves have to be escaped, and the escaping happens twice when the pattern is written inside a string literal, which is why a backslash so often needs two.

```text
\d      one digit, 0 to 9
\w      one word character: a letter, a digit or an underscore
\s      one whitespace character: a space, a tab or a newline
[^,]    one character that is not a comma
\.      a full stop, not "any one character"

a string literal that has to hold the 2-character pattern \.:
  "\."  in the source is the 1-character string "." in most languages, because the
        backslash escapes the dot in the literal instead of reaching the pattern
  "\\." in the source is the 2-character string "\." — the pattern that matches a dot
```

### Quantifiers are greedy by default

A quantifier says how many times the previous item may repeat: zero or more, one or more, optional, or an exact count. By default it takes as many characters as it can and then gives them back one at a time until the rest of the pattern fits. A trailing `?` makes it take as few as possible instead. Greediness is the usual reason a pattern matches far more text than intended.

```text
text: "<b>one</b> and <b>two</b>" — 25 characters, positions 0 to 24

<b>.+</b>   greedy: ".+" takes positions 3 to 24, then gives characters back until
            "</b>" fits — the first fit it reaches is the last of the two
            occurrences, at positions 21 to 24
            -> the match is positions 0 to 24, all 25 characters

<b>.+?</b>  lazy: ".+" takes position 3 only, and "</b>" has to fit at positions 4 to 7,
            where "n</b" does not match; one more character each time, until "</b>"
            fits at positions 6 to 9
            -> the match is positions 0 to 9, the 10 characters of "<b>one</b>"
```

### Groups capture, and backreferences look back

Parentheses group part of a pattern and record the text that matched, so you can extract it or match it again. The recorded texts are numbered from 1 in the order of their opening bracket, and a backreference names the group: `\1` matches the same text that group 1 matched. Groups also let a quantifier apply to a whole sequence rather than to one character.

```text
pattern: \b(\w+)\s+\1\b        on the 7-character text "the the"
  \b(\w+) records "the" as group 1, 3 characters
  \s+     consumes the single space between the words, 1 character
  \1      matches "the" again
  \b      ends the match at the end of the second word

pattern: (\d{4})-(\d{2})      on "2026-10"
  group 1 is "2026", group 2 is "10", and the "-" between them is not captured
```

### Catastrophic backtracking is a real risk

When several quantifiers can each consume the same text, the engine may try every way of dividing that text before it concludes that there is no match. The number of ways doubles with each extra character, so a short input is enough to make it take minutes inside one request handler. The shapes to avoid are nested quantifiers over overlapping classes, and alternatives that can match the same prefix. Anchors, a lazy or possessive quantifier in place of one greedy one, and character classes that cannot overlap all cut the count.

```text
pattern: (a+)+b     on "aaaaaaaaaaaaaaaaaaaaaaaaac" — 26 a's and a c, 27 characters
n = 26              the number of a's the engine has to divide between the inner "+"
                    and the repetition of the group

the inner "+" can take 1 a, or 2, or ... up to all 26, and the outer "+" repeats that
group, so the number of ways to divide the run doubles with each extra a:
2^26 = 67 108 864 attempts, every one of them ending on the "c", which is not a "b"
so no match can exist and none of that work produces anything
```

## Practice

### Validate instead of containing

Write a pattern that accepts a date written as four digits, a dash, two digits, a dash and two digits, and make it reject anything that contains such a date inside a longer string.

Done when: the pattern accepts `2026-10-15`, 10 characters, and rejects both `2026-10-15T09:00` and `x 2026-10-15 y`, and you can point at the two anchors that do it.

### Extract and reuse a capture

Take a log line with a timestamp, a level and a message. Write one pattern that captures the three fields separately, and a second that finds any word repeated twice in a row, using a backreference rather than a copy of the word.

Done when: the first pattern returns three non-empty groups for `2026-10-15 ERROR disk full`, and the second reports `the the` in `we we read the the spec` while leaving `read the` alone.

## Common mistakes

- **Leaving out the anchors on a validation pattern** — `\d{4}-\d{2}-\d{2}` accepts `x 2026-10-15 y`, because it only asks whether a date appears in those 14 characters; fix: anchor to the start and the end when the whole value must match.
- **Nesting quantifiers over overlapping classes** — `(a+)+b` on 26 a's tries 2^26 = 67 108 864 ways of splitting them; fix: simplify the classes or make one quantifier lazy or possessive.
- **Forgetting to escape a literal dot** — `\d+.\d+` matches `1x2` as readily as `1.2`, because `.` stands for any one character; fix: escape the metacharacters that should stand for themselves.
- **Relying on greedy matching for the wrong job** — `<b>.+</b>` runs to the last `</b>` in the text, all 25 characters here instead of the 10 of `<b>one</b>`; fix: use a lazy quantifier or a class that excludes the delimiter.
- **Writing one unreadable pattern with no explanation** — a pattern of 40 characters of classes, quantifiers and groups is not self-explanatory, so the next reader cannot change it safely; fix: name it, comment what it accepts, and test it against the awkward inputs.

## Go deeper

- **Unix Shell** (`01-cs-fundamentals/13-unix-shell`) — the tools where patterns are used most, and where the dialect differences show up.
- **Clean Code** (`01-cs-fundamentals/08-clean-code`) — treating a pattern as named, documented code rather than an inline mystery.
- **Debugging** (`01-cs-fundamentals/11-debugging`) — isolating a pattern that matches too much, by testing it against a deliberately awkward sample.
