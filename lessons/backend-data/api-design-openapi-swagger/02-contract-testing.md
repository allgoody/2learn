---
title: Contract testing
prereqs: ["backend-data/api-design-openapi-swagger/01-writing-the-specification"]
---

## What it is

Contract testing checks that the implementation and the API description still agree. The description is treated as the contract; the tests either send real requests to the running service and validate the responses against the document, or generate the request and response shapes from it and assert that the server accepts and produces them. Either way, a divergence becomes a failing build rather than a support ticket.

## Why it matters

A specification that nobody checks is documentation, and documentation drifts. The moment the implementation is edited without the document, the generated client no longer compiles and the published documentation lies. Contract tests make that drift visible at the point it is introduced, when the fix is a one-line schema change, rather than at the point a client breaks. They are the mechanism that makes the single-source claim in the previous entry true.

## Core ideas

### The document is the assertion, not a by-product

Generating documentation from annotations in the code produces a description of what the code does, including its accidents. Treating the document as the source and validating the code against it produces a description of what the API promises. The first is convenient and cannot detect a mistake; the second can.

```text
document (source of truth) -> validate live responses -> pass or fail
```

### Validate real responses against the schemas

Sending a request to the running service and validating the response body and status against the schema catches a field renamed, a type widened, or a code changed. Running it for each described operation means coverage that matches the document rather than the test author's imagination.

### Schemas need to be strict about unexpected fields

A validator that ignores unknown fields in the response will not notice a newly added field, which is often the leading edge of a breaking change. Being explicit about whether additional fields are allowed turns the document into a tightening tool as well as a check.

### Consumer-driven contracts check the other direction

A producer validating its own responses proves the API matches its description, not that clients are satisfied. In a consumer-driven approach each client publishes the requests it sends and the responses it requires, and the producer's build fails if it would break a known consumer. This catches removals before they ship rather than after.

### Contract tests are fast and belong on every change

Because they exercise interface shapes rather than full behaviour, they are cheap enough to run on every commit, which is where they are most useful. A contract check that runs nightly finds drift a day late; one that runs on the pull request finds it before the merge.

### Versioning and contracts are the same discipline

A contract test makes an accidental breaking change impossible to ship quietly. Where a change is intentionally breaking, the version is raised deliberately and the old contract continues to be satisfied until the deprecation window closes. The test is what enforces the schedule.

## Practice

### Validate responses against the document

Write a test that sends a request for every described operation and validates each response against its schema, including the error responses.

Done when: changing a response field in the implementation without changing the document fails the test.

### Detect an undocumented addition

Add a field to a response without declaring it and confirm that the validation reports it.

Done when: the extra field is reported, and you have decided whether the schema should forbid additional properties.

## Common mistakes

- **Generating the document from the code and calling it a contract** — the description follows the mistakes rather than preventing them; fix: treat the document as the source and validate against it.
- **Validating only successful responses** — the error shape drifts unnoticed; fix: validate every described response.
- **Allowing unknown fields silently** — unexpected additions pass; fix: decide and enforce whether additional fields are permitted.
- **Running contract checks occasionally** — drift is found after it ships; fix: run them on every change.
- **Checking only the producer's own promises** — consumer requirements are unverified; fix: use consumer-driven contracts where clients are known.

## Go deeper

- **Writing the specification** (`backend-data/api-design-openapi-swagger/01-writing-the-specification`) — the document these tests assert against.
- **API Design (OpenAPI / Swagger)** (`backend-data/api-design-openapi-swagger`) — the format and tooling this practice uses.
- **CI/CD** (`cloud-devops/ci-cd`) — the pipeline stage where a contract failure blocks a merge.
