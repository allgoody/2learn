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

A regular expression is a small pattern language for describing text. You write what the text should look like, and a matching engine tells you whether a string fits, which part of it matched, or what pieces it contains. The same syntax appears in a validation rule, an editor search-and-replace, a log filter and a route definition, which is why it is worth learning properly rather than copying from a search result.

## Why it matters

A regex is the shortest way to express some checks and the most expensive way to express others. A pattern that validates an email address can silently reject real addresses or accept nonsense; a pattern with nested quantifiers can take exponential time on a short string and hang a request handler. Because the syntax is dense, a wrong pattern still matches something, so the bug is a false positive no error message points at. The practical skill is knowing the few constructs that cover ordinary work, and recognising the shapes that risk runaway matching.

## Core ideas

### A pattern describes one position at a time

The engine walks the string and asks whether the pattern can match starting at each position, unless you anchor it. `^` means the start of the string or line, `$` the end. Without anchors, a validation pattern confirms only that the text contains a match somewhere, not that the whole value is valid, which is the single most common source of false positives.

```text
pattern: [0-9]{3}
"abc123def" -> matches "123"      (contains it)
"^[0-9]{3}$" -> does not match    (whole value is not three digits)
```

### Character classes and escapes name the alphabet

A literal character matches itself. A class in square brackets matches any one of its members, and the shorthands cover the common sets: a digit, a word character, whitespace. Negation with `^` inside the class inverts it. Metacharacters that should be literal must be escaped, and the rules differ between the pattern and the surrounding string, which is why a backslash so often needs two.

```text
\d      one digit
\w      a word character (letter, digit, underscore)
\s      whitespace
[^,]    anything except a comma
\.      a literal dot, not "any character"
```

### Quantifiers are greedy by default

A quantifier says how many times the previous item may repeat: zero or more, one or more, optional, or an exact count. By default it takes as many as possible and then gives back one at a time until the rest of the pattern fits. A trailing `?` makes it take as few as possible. Greediness is the usual reason a pattern matches far more text than intended.

```text
"<b>one</b> and <b>two</b>"
<.+>    -> matches the whole line  (greedy)
<.+?>   -> matches "<b>one</b>"     (lazy)
```

### Groups capture, and backreferences look back

Parentheses group part of a pattern and record what matched so you can extract or reuse it. A backreference matches the same text again, which is how you find doubled words. Groups also let you apply a quantifier to a whole sequence rather than a single character.

```text
\b(\w+)\s+\1\b     -> "the the"   (the same word twice)
(\d{4})-(\d{2})    -> captures year then month
```

### Catastrophic backtracking is a real risk

When several quantifiers can each consume the same text, the engine may try an exponential number of combinations before concluding there is no match. A short input with many repetitions is enough to make it take minutes. The shapes to avoid are nested quantifiers over overlapping classes, and alternatives that can match the same prefix. Anchoring, making one quantifier possessive or lazy, and simplifying the character classes all reduce the risk.

```text
(a+)+b     on "aaaaaaaaaaaaaaaaaaaaaaaaac"
the engine retries 2^n splits before giving up
```

## Practice

### Validate instead of containing

Write a pattern that accepts a date in the form four digits, dash, two digits, dash, two digits, and make it reject anything that contains such a date inside a longer string.

Done when: the pattern accepts a bare date, rejects a value with extra characters before or after, and you can point at the anchors responsible.

### Extract and reuse a capture

Take a log line with a timestamp, a level and a message. Write one pattern that captures the three fields, and a second that finds any word repeated twice in a row.

Done when: the first pattern returns the three fields separately, and the second reports only genuine doubled words.

## Common mistakes

- **Leaving out the anchors on a validation pattern** — a value with junk around it is accepted; fix: anchor to the start and end when the whole value must match.
- **Nesting quantifiers over overlapping classes** — matching time explodes on ordinary input; fix: simplify the classes or make one quantifier lazy or possessive.
- **Forgetting to escape a literal dot** — the pattern matches any character instead of a full stop; fix: escape metacharacters that should be literal.
- **Relying on greedy matching for the wrong job** — a match runs from the first opening tag to the last closing one; fix: use a lazy quantifier or a class that excludes the delimiter.
- **Writing one unreadable pattern with no explanation** — the next reader cannot safely change it; fix: name it, comment what it accepts, and test it with the awkward inputs.

## Go deeper

- **Unix Shell** (`01-cs-fundamentals/13-unix-shell`) — the tools where patterns are used most, and where the dialect differences show up.
- **Clean Code** (`01-cs-fundamentals/08-clean-code`) — treating a pattern as named, documented code rather than an inline mystery.
- **Debugging** (`01-cs-fundamentals/11-debugging`) — isolating a pattern that matches too much, by testing it against a deliberately awkward sample.
