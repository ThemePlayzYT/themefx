import { useRef } from 'react';
import useLazyVideo from '../hooks/useLazyVideo.js';

/* A video that loads and plays according to its mode. See hooks/useLazyVideo.js for the rules. */
export default function LazyVideo({ src, poster, mode = 'autoplay', progressRef, className = '' }) {
  const videoRef = useRef(null);
  useLazyVideo(videoRef, { src, mode, progressRef });

  return (
    <video
      ref={videoRef}
      className={className}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      tabIndex={-1}
      aria-hidden="true"
      disablePictureInPicture
    />
  );
}
