## Example 1 — The application generates the wrong scheme

A proxy terminates TLS and forwards to an application server inside the network. Users report a redirect loop on the account pages, and the application's log shows it redirecting to a plain-scheme location. The server block below is what is deployed. Pass the original scheme and host through so the application builds correct locations.

```nginx
upstream app_backend {
    server app:8080;
}

server {
    listen 443 ssl;
    server_name shop.example.test;
    location / {
        proxy_pass app_backend;
    }
}
```

Request arriving: `GET /account/settings`

### Solution

```nginx
# added inside the existing location block
proxy_set_header Host              $host;
proxy_set_header X-Forwarded-Proto $scheme;
proxy_set_header X-Forwarded-Host  $host;
```

```text
response now: 200 for /account/settings, and every generated location uses the secure scheme
```

TLS ends at the proxy, so the backend genuinely receives plain HTTP and can only render the right scheme if the original one is forwarded in a header. The same set tells it the original host, which it needs for any location it generates. The usual mistake is to debug in the browser, where the loop is obvious, and never read the application's log.

## Example 2 — An upload that dies at exactly one minute

A media service accepts uploads through the proxy. Files over a few megabytes are rejected, and the larger ones that pass fail at almost exactly sixty seconds, although the application logs no error. The server block below is what is deployed. Make the limits match what the application accepts and how long it really takes.

```nginx
upstream app_backend {
    server app:8080;
}

server {
    listen 443 ssl;
    server_name media.example.test;
    location /upload {
        proxy_pass app_backend;
    }
}
```

Request arriving: `POST /upload`

### Solution

```nginx
# in the server block, outside the location
client_max_body_size 200m;

# inside the /upload location
client_body_timeout 300s;
proxy_read_timeout  300s;
```

```text
the application accepts 200 MB and holds a request open for up to five minutes
the proxy now does the same, and its log records the outcome for each POST /upload
```

The proxy buffers the body and applies its own timeouts, so its limits, not the application's, decide what a client can send and how long it may take. Setting both from the application's real behaviour removes both failures. The usual mistake is to raise only the size limit, then meet the one-minute failure on the very first large file.
