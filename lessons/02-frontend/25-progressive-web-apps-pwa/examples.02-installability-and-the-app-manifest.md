## Example 1 — A manifest with one icon and no short name

The site is installable but the launcher shows a truncated name and an icon with its edges cropped away. Say which fields are responsible, then describe the app properly.

```json
{
  "name": "Field Notes for Surveying Teams",
  "start_url": "/app",
  "display": "standalone",
  "icons": [{ "src": "/icons/logo.png" }]
}
```

### Solution

```json
{
  "name": "Field Notes for Surveying Teams",
  "short_name": "Notes",
  "start_url": "/app",
  "display": "standalone",
  "background_color": "#0f172a",
  "theme_color": "#0f172a",
  "icons": [
    { "src": "/icons/192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icons/512.png", "sizes": "512x512", "type": "image/png" },
    { "src": "/icons/maskable-512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
  ]
}
```

The full name is what a launcher truncates, so `short_name` is the field that decides whether the installed app is identifiable at a glance. A single icon has to be scaled by the launcher and cropped into its own shape, which is why a full-bleed logo loses its edges; declaring several sizes and one maskable variant puts the content inside a safe area instead. A manifest missing any field the browser requires is ignored outright and the install prompt never appears, so the minimum set — name, short name, start URL, display mode and an icon with a declared size — is worth treating as a checklist rather than as optional detail.

## Example 2 — An installed app with no way back

The app opens in its own window from a deep screen, and once inside there is no address bar and no back button. Say what the display mode removed, then restore the navigation the browser used to provide.

```json
{ "name": "Field Notes", "short_name": "Notes", "start_url": "/app/settings/sync", "display": "standalone" }
```

### Solution

```json
{ "name": "Field Notes", "short_name": "Notes", "start_url": "/app", "display": "standalone" }
```

```html
<nav aria-label="Main">
  <a href="/app">Home</a>
  <a href="/app/settings">Settings</a>
</nav>
<!-- external links open in a browser rather than replacing the app -->
<a href="/help" target="_blank" rel="noopener">Help</a>
```

`display: standalone` removes the browser chrome, and with it the back button and the address bar — so navigation becomes the application's responsibility rather than the browser's. Pointing `start_url` at a settings screen compounds it: the user lands somewhere they did not choose and has no obvious way to the part of the app they wanted. Starting at a home screen and providing in-app navigation restores both, and external links belong in a browser tab so a help page does not strand the user inside the app with no way back. Installation is also something to offer rather than demand: the prompt belongs after the user has had a reason to want it.
