## Example 1 — One shape, referenced from both sides

A drafts endpoint accepts a draft and returns the same shape. The fragment below writes that shape out twice, once inline in the request and once inline in the response. Finish it so the shape is named once, both sides point at it, and a rejected draft has a described failure.

```yaml
paths:
  /drafts:
    put:
      requestBody:
        content:
          application/json:
            schema:
              type: object
              properties: { draftId: { type: string }, body: { type: string } }
      responses:
        "200":
          content:
            application/json:
              schema:
                type: object
                properties: { draftId: { type: string }, body: { type: string } }
```

### Solution

```yaml
paths:
  /drafts:
    put:
      requestBody:
        content:
          application/json:
            schema: { $ref: "#/components/schemas/Draft" }
      responses:
        "200":
          content:
            application/json:
              schema: { $ref: "#/components/schemas/Draft" }
        "422":
          content:
            application/json:
              schema: { $ref: "#/components/schemas/Error" }
components:
  schemas:
    Draft:
      type: object
      required: [draftId, body]
      properties: { draftId: { type: string }, body: { type: string } }
    Error: { type: object, required: [code, message], properties: { code: { type: string }, message: { type: string } } }
```

The request and the response now reference one `Draft`, so a field added for one appears for the other in the same edit and the two copies cannot drift. Both names are domain nouns, so the document teaches its own vocabulary. The draft was not wrong about the fields; it was two schemas that happened to match today, and `required` and the shared `Error` now say which fields always arrive and what a rejection looks like.

## Example 2 — A parameter the server never refuses

A page-size parameter is described nowhere, so a client can ask for ten thousand records and the service answers. The request below is what arrives. Add the parameter description to the fragment so the limit is stated once and a generated client sends an integer within it.

```bash
GET /orders?pageSize=10000&sort=-placedAt
```

### Solution

```yaml
paths:
  /orders:
    get:
      parameters:
        - name: pageSize
          in: query
          schema: { type: integer, minimum: 1, maximum: 100, default: 20 }
        - name: sort
          in: query
          schema: { type: string, enum: [placedAt, "-placedAt", total, "-total"] }
```

The range, the default and the permitted sort values are now part of the interface, so the client is generated with an integer that cannot exceed the limit instead of a string passed straight through. Omitting the parameter still works, because the default says so; that is a stated contract rather than an accident. The server was never accepting the wrong thing — the document simply did not say what the endpoint was meant to accept, and writing the description to match current behaviour records that omission as a contract.
