# YouTube GIFs

Chrome extension (Manifest V3) that adds a GIF comment section to YouTube videos. GIFs are provided by Giphy; comments, likes and auth are handled by a companion backend (expected at `http://localhost:8080`, see `src/ts/base/variables.ts`).

## Structure

- `src/ts/content` — content script injected on youtube.com: tabs UI, comments panel, GIF palette
- `src/ts/background` — MV3 service worker: API proxy, OAuth login window, SPA navigation watcher
- `src/ts/popup` — extension popup (login / dashboard)
- `src/ts/client` — endpoint definitions, request handlers and runtime providers (messaging between contexts)
- `src/ts/base` — shared code: DI container, event emitter, HTTP client, DTOs, hooks

## Development

```bash
npm install
npm run dev        # webpack watch build (development mode, with request logging)
```

Then load the extension in Chrome: `chrome://extensions` → Developer mode → "Load unpacked" → select this directory.

## Production build

```bash
npm run build      # minified build, debug logging stripped
```

## Checks

```bash
npm run typecheck  # tsc --noEmit (babel build does not type-check)
npm run lint       # eslint
npm run format     # prettier
```
