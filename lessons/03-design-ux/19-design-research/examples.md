## Example 1 — A context brief built from the clipboard

A stakeholder asks for an inspection app, described entirely from the office: a clean form on a phone. Spend a day observing the technicians and rewrite the brief so its fixed constraints come from where the work happens.

```text
Request: field technicians need a mobile app to complete their equipment
inspections. Single form, submit at end of shift, works on any phone.
```

### Solution

```text
Context brief — equipment inspection

People      one technician per route; supervisor reviews next morning
Place       plant rooms and outdoor units; gloves, cold hands, no desk
Tools       tablet held one-handed, laminated checklist clipped to the
            machine, paper form behind it, radio for callouts
Artefacts   the laminated sheet, the clipboard, the supervisor's folder
Fixed constraints
  - usable below 5°C and with wet gloves
  - readable in daylight at arm's length
  - must not depend on a signal in the plant room
```

Every constraint comes from something observed rather than assumed, and the laminated checklist is the artefact the technicians actually use. A brief written from the office produces a tidy form that fails on the first cold morning. The usual mistake is studying the users in a meeting room, which deletes the physical context and with it the constraints.

## Example 2 — The landscape, including the workaround

Before designing the inspection app, list what already serves the task. The team's list holds only competing products. Extend it with what each incumbent does well, and add at least one entry that is not software.

```text
Apps: InspectPro, FieldForms
Gaps: both are desktop-only, both need three logins
```

### Solution

```text
Existing              Works because                Gap
laminated checklist   survives weather, no login   no history, no search
paper form            the supervisor accepts it    re-typed into a folder
colleague's macro     builds the weekly report     breaks when she leaves
InspectPro            has an audit trail           desktop only, three logins
```

The table now names what each incumbent does well, which is the bar a new design has to clear, and the macro is a workaround someone built because the need was real. A list of named products only hides the effort of switching. The usual mistake is treating the incumbent as a straw man: the paper form is kept because it never crashes, and nothing clears that bar until it is written down.
