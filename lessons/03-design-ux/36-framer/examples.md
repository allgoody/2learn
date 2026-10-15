## Example 1 — Choosing what to publish, and publishing one screen

A team has five questions left about a new onboarding step and can test it either as a static click-through or as a live published page. Decide which questions need the page, then say what actually gets published.

```text
Questions left
does the step feel right at full speed on a phone
is the sequence of screens logical
is the heading clear
does the layout hold at 360px
does the copy still read once it is scrolled past
```

### Solution

```text
Publish (Framer)              Static prototype
timing at full speed on a phone   is the sequence logical
layout holding at 360px           is the heading clear
copy read while scrolled          is the hierarchy right

Published: the single onboarding step, one path through it
Left out:  the other eleven screens, sign-in, error states
```

Two of the five questions are about the artefact running, and a picture of a page cannot answer those; publishing one step keeps the work to an afternoon. The usual mistake is rebuilding the whole flow so it can be linked, which costs a week and answers nothing the static prototype had not already answered.

## Example 2 — A published link with an honest note

The onboarding step is now live at a shareable address and participants will open it on their own devices. Write the note that goes with the link, and list the shortcuts that must not be mistaken for requirements.

```text
Session planned: five people, each opening the link unaccompanied
Risk: the page looks finished, so feedback turns into typos
```

### Solution

```text
Note above the link
"Rough prototype. One product only, no sign-in, no error states.
 Structure is what we want feedback on, not the wording."

Shortcut record kept beside the wireframes
single product hard-coded
"Buy" shows the confirmation screen without charging
back button always returns to a fixed screen
no empty or loading states drawn
```

Saying plainly what is rough keeps the session on structure instead of spelling, and the shortcut record stops hard-coded content being re-specified as a requirement. The usual mistake is letting the polish speak for itself, so a week later nobody can say which parts were deliberate.
