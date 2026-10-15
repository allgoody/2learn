## Example 1 — A label that names every request

A checkout service is instrumented with a counter and someone has added the request identifier as a label so that failures can be found directly. The series count has grown until the metric is expensive to keep, and the chart it produces is unreadable. Keep the question the label was meant to answer and correct the instrumentation.

```text
illustrative figures
http_requests_total{route="/checkout", status="200", request_id="a41f9c"} 3418
http_requests_total{route="/checkout", status="200", request_id="b7d2e0"} 1
http_requests_total{route="/checkout", status="200", request_id="c9f1a2"} 1

the monitoring system reports roughly 48,000 series for this one metric
```

### Solution

```text
http_requests_total{route="/checkout", status="200", instance="api-3"} 3418
http_requests_total{route="/checkout", status="500", instance="api-3"} 12

labelled by: route, status, instance — dimensions the team groups by
the request identifier belongs in the log line, which is where the detail lives
```

Labels split a series into dimensions, so a label whose values are unbounded creates a new series for every request and answers nothing once the value has been seen. Keeping the metric to route, status and instance restores its cheapness and its usefulness for trends, and moves the per-request detail to the log. The usual mistake is to add the identifier for debugging and discover the cost only when the storage grows.

## Example 2 — Two log lines that cannot be joined

A request crosses a gateway and the checkout service; a payment call is declined and the investigation has to reconcile the two services' logs by timestamp. Add the missing identifier and say what it buys.

```json
{"time":"t1","service":"gateway","msg":"request received","route":"/checkout"}
{"time":"t2","service":"checkout","msg":"payment declined","route":"/checkout"}
```

### Solution

```json
{"time":"t1","service":"gateway","trace_id":"<trace-id>","msg":"request received","route":"/checkout"}
{"time":"t2","service":"checkout","trace_id":"<trace-id>","span":"charge","duration_ms":810,"msg":"payment declined"}
```

`<trace-id>` stands in for the identifier the platform issues at the entry point; substitute your own.

```text
spans for <trace-id>: gateway 12 ms -> checkout 940 ms -> charge 810 ms
```

The identifier is set once at the entry point and propagated, so the two lines and the trace's spans describe one request rather than two unrelated events. The duration on the span is what points at the step that was slow, which timestamps alone cannot. The usual mistake is to record the identifier in the first service only, leaving the trace partial and unusable downstream.
