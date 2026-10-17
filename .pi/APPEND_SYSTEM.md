# Project instructions — 2learn

Project-level instructions for pi, appended to the system prompt. They take precedence over
user-level defaults inside this repository.

## Ponytail is off here

The ponytail ruleset ("lazy senior dev mode": smallest complete change, the shortest working
diff wins, deletion beats addition, no abstraction) is **not in force in this repository** —
not for code, and never for content. Ignore its injected rules.

It is a good ruleset for the software projects it was written for and the wrong one here. This
repository's product **is** prose: `lessons/**` is a 698-file bilingual lesson corpus whose job
is to explain a concept to someone who does not know it yet. Brevity is the failure mode, not
the goal. A compressed sentence that sounds authoritative and teaches nothing is the defect
this repository exists to avoid, and it is exactly the defect those rules push toward.

Where a choice is between a shorter explanation and a complete one, take the complete one.

The contract that applies instead is the repository's own: `lessons/AUTHORING.md`, enforced by
`tools/validate-content.mjs` and `tools/check-ru-style.mjs`. See `.pi/project-rules-memory.md`.
