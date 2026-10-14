---
title: Installability and the app manifest
prereqs: ["frontend/progressive-web-apps-pwa/01-service-workers-and-offline"]
---

## What it is

A web app manifest is a JSON file a page links to that describes the application: its name, its icons, the colour of its splash screen, and whether it should open in its own window rather than in a browser tab. Together with a service worker and a secure connection it is what makes a browser willing to offer installation.

## Why it matters

Installing a site removes the two things that make a web app feel temporary: the browser chrome and the act of typing an address. A user who has installed the app launches it like any other, finds it on their home screen, and returns more often — which is a real product outcome, not a technicality. The manifest is also where the details that make an installed app look native live: an icon set that survives every launcher's masking, a theme colour that matches the splash screen, and a start URL that opens where the user expects. Getting these wrong produces an installed app that looks visibly unfinished.

## Core ideas

### The manifest is linked and has a minimal set of fields

Link it from the document head so the browser can find it, and declare at least a name, a short name, a start URL, a display mode and an icon. A manifest missing a required field is simply ignored, and the install prompt never appears.

```html
<link rel="manifest" href="/manifest.webmanifest" />
```

```json
{
  "name": "Field Notes",
  "short_name": "Notes",
  "start_url": "/app",
  "display": "standalone",
  "background_color": "#0f172a",
  "theme_color": "#0f172a",
  "icons": [
    { "src": "/icons/192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icons/512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

### `display` decides how much browser remains

`standalone` removes the address bar and gives the app its own window; `minimal-ui` keeps a small amount of chrome; `browser` is an ordinary tab. The choice changes how much of your own navigation the application must provide, because there is no back button once the chrome is gone.

### Installability has requirements beyond the manifest

A secure origin, a registered service worker with a fetch handler, and a manifest meeting the browser's minimum. The rules have changed over time and differ slightly between browsers, so treat "installable" as something to verify on the actual device rather than to assume.

### Icons must survive masking

Launchers crop icons into their own shapes, and they may also want an icon that fills the space with content in a safe area. Provide several sizes and consider a purpose-declared maskable icon; an icon cropped from a full-bleed logo loses its edges.

### Once installed, the rules change

The app has no address bar, so navigation must be self-contained; external links should open in a browser rather than replacing the app. The offline state becomes the default on a bad connection rather than an exception. Theme colour and splash screen are now part of the product's appearance rather than a browser detail.

### Installation should be offered, not demanded

Most browsers require a user gesture before they will show the install prompt. Intercepting the event and showing your own prompt at a moment the user understands — after they have used the app successfully — converts far better than asking on first load.

## Practice

### Make a site installable and verify it on a device

Add a manifest with a full icon set and a registered service worker, then install the site from a phone and launch it from the home screen.

Done when: the icon is not visibly cropped, the app opens without browser chrome, and the start URL is the screen you intended.

### Handle the offline state after install

Turn off the network and launch the installed app.

Done when: it opens, shows a state that makes sense without a connection, and does not present a browser error page.

## Common mistakes

- **Omitting `short_name`** — the launcher truncates the full name to something unreadable; fix: supply a short name that fits.
- **Providing one icon size** — launchers scale it and the result is soft or badly cropped; fix: provide several sizes and a maskable variant.
- **Setting `display: standalone` without providing navigation** — the user has no back button and no way out; fix: provide in-app navigation and open external links in a browser.
- **Pointing `start_url` at the splash or a deep screen** — the app opens somewhere the user did not expect; fix: start at the screen that makes sense as a home.
- **Prompting to install on the first visit** — the request is refused and the opportunity is used up; fix: offer installation after the user has had a reason to want it.

## Go deeper

- **Service workers and offline** (`frontend/progressive-web-apps-pwa/01-service-workers-and-offline`) — installation requires a service worker, and the offline behaviour is what makes an installed app usable.
- **Responsive Web Design** (`frontend/responsive-web-design`) — an installed app runs at every size from a phone to a tablet.
- **Web Performance (Core Web Vitals)** (`frontend/web-performance-core-web-vitals`) — a cold start from the home screen is the least forgiving load a PWA has.
