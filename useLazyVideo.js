import { useEffect } from 'react';

/*
  Performance rules implemented here:
  - A video's file is requested only when it is near the viewport (lazy loading).
  - Autoplay videos play only while visible and pause when they scroll away.
  - At most MAX_ACTIVE videos play at the same time.
  - Playback pauses when the browser tab is hidden.
  - Progress is written straight to the DOM, so no React re-render happens per frame.

  mode 'autoplay': muted and looping while on screen, no hover needed (library cards).
  mode 'hover':    plays only while the pointer is over its card (collection list on the detail page).
*/

const MAX_ACTIVE = 4;
const activeVideos = [];

function markActive(video) {
  const index = activeVideos.indexOf(video);
  if (index !== -1) activeVideos.splice(index, 1);
  activeVideos.push(video);
  while (activeVideos.length > MAX_ACTIVE) {
    const oldest = activeVideos.shift();
    if (oldest && oldest !== video) oldest.pause();
  }
}

function releaseActive(video) {
  const index = activeVideos.indexOf(video);
  if (index !== -1) activeVideos.splice(index, 1);
  video.pause();
}

export default function useLazyVideo(videoRef, { src, mode = 'autoplay', progressRef }) {
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return undefined;

    video.muted = true;
    let loaded = false;
    const load = () => {
      if (loaded) return;
      loaded = true;
      video.src = src;
    };

    /* 1. Load the file only when close to the screen */
    const loadObserver = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          load();
          loadObserver.disconnect();
        }
      },
      { rootMargin: '300px 0px' }
    );
    loadObserver.observe(video);

    /* 2. Progress bar on the card, updated without React re-renders */
    const onTimeUpdate = () => {
      if (progressRef && progressRef.current && video.duration) {
        progressRef.current.style.transform = `scaleX(${video.currentTime / video.duration})`;
      }
    };
    video.addEventListener('timeupdate', onTimeUpdate);

    /* 3. Pause everything when the tab is hidden */
    const onVisibility = () => {
      if (document.hidden) video.pause();
    };
    document.addEventListener('visibilitychange', onVisibility);

    let playObserver = null;
    let card = null;
    const onPointerEnter = () => {
      load();
      markActive(video);
      const p = video.play();
      if (p && p.catch) p.catch(() => {});
    };
    const onPointerLeave = () => releaseActive(video);

    if (mode === 'autoplay') {
      /* 4a. Autoplay while visible */
      playObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              load();
              markActive(video);
              const p = video.play();
              if (p && p.catch) p.catch(() => {});
            } else {
              releaseActive(video);
            }
          });
        },
        { threshold: 0.35 }
      );
      playObserver.observe(video);
    } else {
      /* 4b. Hover to play */
      card = video.closest('.card');
      if (card) {
        card.addEventListener('pointerenter', onPointerEnter);
        card.addEventListener('pointerleave', onPointerLeave);
      }
    }

    return () => {
      loadObserver.disconnect();
      if (playObserver) playObserver.disconnect();
      video.removeEventListener('timeupdate', onTimeUpdate);
      document.removeEventListener('visibilitychange', onVisibility);
      if (card) {
        card.removeEventListener('pointerenter', onPointerEnter);
        card.removeEventListener('pointerleave', onPointerLeave);
      }
      releaseActive(video);
    };
  }, [src, mode, videoRef, progressRef]);
}
