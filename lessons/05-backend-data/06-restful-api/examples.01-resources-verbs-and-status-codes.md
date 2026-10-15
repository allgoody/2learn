## Example 1 — A refund is a resource

The support team needs a way to refund an order. The first draft adds the operation to the order's path and reports the outcome with one success code. Rewrite the request and the response so the address identifies a thing, the status says what happened, and the client can find the refund without guessing.

```text
POST /orders/refundOrder
{ "order_id": 42, "amount": "12.50" }

200 OK
{ "success": true }
```

### Solution

```text
POST /orders/42/refunds
Idempotency-Key: refund-42-1
{ "amount": "12.50", "reason": "damaged" }

201 Created
Location: /orders/42/refunds/7

{ "id": 7, "order_id": 42, "amount": "12.50", "status": "pending" }
```

The refund is now a thing owned by the order, so the address says what was created rather than what action was taken; the status says a new resource exists, and the location header carries its address, so the client neither polls nor constructs an identifier. The draft returns the same success code whether the refund was accepted or the order had already been refunded, which forces a special case into every client. What usually goes wrong is a retrieval that changes state, which a pre-fetcher will then perform.

## Example 2 — The retry that must not refund twice

A client gives up waiting for its refund response and sends the request again. The server creates a second refund, and the customer is paid twice. The log below is from that afternoon. Write the request and the server behaviour that make the repeat safe.

```text
14:02:11  POST /orders/42/refunds   201  id=7
14:02:11  ...client timed out, response never arrived
14:02:12  POST /orders/42/refunds   201  id=8
14:02:12  alert: order 42 refunded twice        (illustrative)
```

### Solution

```text
14:02:11  POST /orders/42/refunds
          Idempotency-Key: refund-42-1        201  id=7
14:02:12  POST /orders/42/refunds
          Idempotency-Key: refund-42-1        201  id=7

the server records the key with the first result and returns it unchanged
```

The client supplies a key that identifies the attempt rather than the moment, and the server stores the key beside the result, so the second delivery returns the first outcome and writes nothing. That is what lets a timeout be treated as unknown rather than fatal. What usually goes wrong is generating the key per attempt, which makes every retry look like new work.
