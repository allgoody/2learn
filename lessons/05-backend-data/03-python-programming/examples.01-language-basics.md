## Example 1 — The list two names share

A helper adds a tag to a list of labels and returns it. The caller passes its cached list, and afterwards the cache holds the new tag although nobody asked it to change. Explain the model and make the helper safe to call.

```py
def add_tag(tags, tag):
    tags.append(tag)
    return tags

cached = ["draft"]
add_tag(cached, "public")
print(cached)          # ['draft', 'public'] — the caller's own list
```

### Solution

```py
def add_tag(tags, tag):
    return tags + [tag]

cached = ["draft"]
labels = add_tag(cached, "public")
print(cached)          # ['draft']
print(labels)          # ['draft', 'public']
```

Assignment attaches a name to an object rather than copying it, so the first version appends to the caller's list; building a new value leaves the caller's data untouched. A tuple put through the original helper would have raised on the append instead, which is why an immutable value is the safer default for anything passed across a boundary. The usual mistake is to believe that `tags` inside the function is a copy of `cached`.

## Example 2 — A default argument that accumulates

A logging helper keeps recent events. On the first call it prints one event; by the third it prints all of them, and the helper is called from unrelated parts of the program. Fix the default.

```py
def record(event, history=[]):
    history.append(event)
    return history

print(record("start"))    # ['start']
print(record("stop"))     # ['start', 'stop']
```

### Solution

```py
def record(event, history=None):
    if history is None:
        history = []
    history.append(event)
    return history

print(record("start"))    # ['start']
print(record("stop"))     # ['stop']
```

The default is evaluated once, when the function is defined, so a mutable one is shared by every call that omits it; defaulting to `None` and creating the list inside gives each call its own. The defect is invisible in the definition and appears only as state that grows between calls, which is why the default should be immutable wherever the value can change. Passing a list explicitly still works exactly as before.
