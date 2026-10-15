## Example 1 — Making the system the shortest path

A library ships with a Button, a FormField and a Card, and a template that still uses none of them. Every new screen is faster to copy from an old one, so that is what people do. Change the default path. Produce the starting setup that makes building inside the system the quick option.

```text
How a new screen gets built today
  1 copy an old screen as the starting point
  2 tweak its local button and spacing
  3 ship; the component library is never opened

Library contains: Button, FormField, Card, tokens
Starting template: plain markup, no imports
```

### Solution

```text
Starting template now imports Button, FormField, Card and the tokens.
The copy-paste starter screen is removed from the skeleton.
A new screen begins from the template, so the system path is the
shortest path from an empty file.
A lint warning fires when a local button appears under the screens folder.
```

Making the template the only starting point means the fast route and the system route are the same route, so nothing has to be announced. Removing the copy-paste starter is the part teams skip; without it the old screen stays quicker. The lint warning keeps the default from decaying.

## Example 2 — Watching one person build a screen

A designer spends forty minutes on a settings screen and leaves the system three times. The reasons matter more than the count. Watch the build, write down each departure and what caused it, and turn the notes into blockers you can remove.

```text
Notes, 40 minutes, settings screen
  0:06  copies an old screen instead of the template
  1:15  needs a toggle with a long label; grows a local toggle
  2:40  cannot find the surface token in the theme
  3:20  asks in chat; the answer arrives 25 minutes later
```

### Solution

```text
Blockers, in their words
  "the toggle can't take a long label"     missing variant
  "the surface token isn't in the theme"   missing token
  "I asked and waited for an answer"       private answers

Remove this week: add the toggle variant.
Then: add the surface token to the theme, and answer questions in an
open channel so the next joiner finds them.
Also migrate this settings screen so it stops being a copy source.
```

The notes name fixable obstacles rather than a vague unwillingness, and one, the toggle variant, can be removed this week. The temptation is to blame people's habits; watching shows a missing variant and token are the cause. Counting forks over the next month checks the fixes worked.
