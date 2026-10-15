## Example 1 — Re-encoding a status that is colour alone

A queue view shows each order's state as a coloured dot: green for shipped, red for delayed. A colleague cannot tell the two apart. Keep the colour but make the status readable without it, using a second channel.

```text
Queue
  #4021   ●   Bristol
  #4018   ●   Leeds
  #4012   ●   Cardiff
```

### Solution

```text
Queue
  #4021   ✓ shipped    Bristol
  #4018   ⚠ delayed    Leeds
  #4012   ✓ shipped    Cardiff
```

Each state now carries a word and a distinct shape, so it survives colour-blindness, a monochrome printout and a glare-covered screen; the hue is redundant rather than load-bearing. Never encode meaning in hue alone. The common failure is adding the word but leaving the two statuses as different shades of the same red, which removes neither the colour dependence nor the ambiguity between "delayed" and "failed".

## Example 2 — Building a ramp and reserving the accent

A toolbar uses the brand blue for an announcement banner, an info panel, a primary button and a link, so nothing signals "clickable". Replace the one-off swatches with a four-step ramp and give each colour one job.

```text
Current
  [ blue banner: Your trial ends in 3 days ]
  [ blue primary button: Upgrade ]
  [ blue link: Manage plan ]
  [ blue info panel: What you keep ]
```

### Solution

```text
blue-50   surface
blue-200  border
blue-600  base: interactive elements only
blue-800  text on blue-50

  [ neutral-100 banner: Your trial ends in 3 days ]
  [ blue-600 primary button: Upgrade ]
  [ blue-600 link: Manage plan ]
  [ neutral-50 info panel: What you keep ]
  [ red-600 destructive button: Delete account ]
```

Four steps beat fourteen swatches used once each, because every pair you reach for is already known to work; the accent now means "clickable" and a contrasting red is reserved for destructive actions. The failure to watch for is the accent leaking back into decoration: once the banner is blue again, the primary button stops standing out.
