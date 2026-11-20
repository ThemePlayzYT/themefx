# THEMEFX

Minecraft editing animation library. React + Vite.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:5173. The site opens on **ALL ANIMATIONS**.

Production build:

```bash
npm run build
npm run preview
```

## Project structure

```
public/
  downloads/          Original 4K source files (served as-is for download, never compressed)
  favicon.png
src/
  assets/             Logo and poster images (posters/ holds one still frame per animation)
  components/         Reusable UI: AppShell, Topbar, Sidebar, AnimationCard, LazyVideo,
                      VideoTimeline, DownloadButton, SearchBar, EmptyState, LoaderScreen, Background, icons
  data/animations.js  Library data: collections and animations (add new animations here)
  hooks/              useLazyVideo (lazy loading and play rules), useMediaQuery
  pages/              AllAnimations (default), AnimationDetail, NotFound
  styles/             base, layout, background, library, detail, timeline CSS
  videos/             1080p website previews with sound (used for playback)
  App.jsx             Routes
  main.jsx            Entry point
index.html            HTML entry
vite.config.js        Vite configuration
package.json          Dependencies and scripts
```

## Video quality

- **Website preview:** 1080p (1920x1080) H.264, AAC audio, loaded lazily.
- **Download:** the original 4K file from `public/downloads/`, copied without re-encoding.

## Adding an animation

1. Encode a 1080p preview into `src/videos/<id>.mp4` (H.264, yuv420p, `-movflags +faststart`).
2. Create a poster JPG in `src/assets/posters/<id>.jpg`.
3. Copy the original file into `public/downloads/`.
4. Add an entry in `src/data/animations.js` with the matching `collectionId`.
   A new `collectionId` creates a new card on ALL ANIMATIONS.

## Performance notes

- Videos are requested only when they are near the viewport.
- Library videos play only while visible and pause when they leave the screen.
- Collection lists on detail pages play only on hover.
- At most 4 videos play at the same time, and playback pauses when the tab is hidden.
- Animations use only `transform` and `opacity`. The top bar has no backdrop blur.
- `content-visibility: auto` on cards skips rendering for off-screen cards.
- The detail page is code-split and loads only when opened.

## Notes

- Single-page routing uses the browser history API. For production hosting, configure your host to serve `index.html` for unknown paths (`npm run preview` already does this).
