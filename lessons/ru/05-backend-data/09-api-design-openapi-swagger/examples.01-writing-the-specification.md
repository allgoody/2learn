## Пример 1 — Одна форма, на которую ссылаются обе стороны

Эндпоинт черновиков принимает черновик и возвращает ту же форму, а фрагмент ниже выписывает её дважды: один раз прямо в запросе, один раз прямо в ответе. Допишите его так, чтобы форма была названа один раз, обе стороны на неё указывали, а у отклонённого черновика был описанный сбой.

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

### Решение

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

Теперь запрос и ответ ссылаются на один `Draft`: поле, добавленное для одной стороны, появляется и у другой той же правкой, и две копии разойтись уже не могут. Оба имени — существительные предметной области, поэтому документ учит собственному словарю. Однако в полях черновик не ошибался — просто рядом стояли две схемы, которые сегодня случайно совпадали, — а `required` и общая `Error` теперь говорят, какие поля приходят всегда и как выглядит отклонение.

## Пример 2 — Параметр, который сервер никогда не отклоняет

Параметр размера страницы не описан нигде, поэтому клиент может запросить десять тысяч записей, и сервис ответит — вот что приходит на самом деле. Добавьте описание параметра во фрагмент так, чтобы предел был указан один раз, а сгенерированный клиент отправлял целое число в его границах.

```bash
GET /orders?pageSize=10000&sort=-placedAt
```

### Решение

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

Диапазон, значение по умолчанию и допустимые значения сортировки стали частью интерфейса: клиент генерируется с целым числом, которое не может превысить предел, а не со строкой, переданной как есть. Пропуск параметра по-прежнему работает — так говорит значение по умолчанию, — и это заявленный контракт, а не случайность. Сервер никогда не принимал неверного: документ просто не говорил, что эндпоинт должен принимать, и описание, написанное под текущее поведение, фиксирует этот пропуск как контракт.
