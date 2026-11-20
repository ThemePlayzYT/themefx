import { useEffect, useRef, useState } from 'react';
import { MuteIcon, PauseIcon, PlayIcon, VolumeIcon } from './icons.jsx';

/* Video-editor style timeline: play/pause, mute, timecode, buffered range, playhead, scrub and hover time. */

function formatTime(seconds) {
  const safe = Number.isFinite(seconds) && seconds > 0 ? seconds : 0;
  const minutes = Math.floor(safe / 60);
  const secs = Math.floor(safe % 60);
  const hundredths = Math.floor((safe % 1) * 100);
  return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}.${String(hundredths).padStart(2, '0')}`;
}

const EVENTS = ['timeupdate', 'loadedmetadata', 'durationchange', 'play', 'pause', 'ended', 'volumechange', 'progress', 'seeked'];

export default function VideoTimeline({ videoRef }) {
  const trackRef = useRef(null);
  const draggingRef = useRef(false);
  const [state, setState] = useState({ current: 0, duration: 0, playing: false, muted: false, buffered: 0 });
  const [hoverRatio, setHoverRatio] = useState(null);

  /* Mirror the video element's state. Only this small component re-renders. */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    const sync = () => {
      const ranges = video.buffered;
      const bufferedEnd = ranges.length ? ranges.end(ranges.length - 1) : 0;
      setState({
        current: video.currentTime,
        duration: video.duration || 0,
        playing: !video.paused && !video.ended,
        muted: video.muted,
        buffered: video.duration ? bufferedEnd / video.duration : 0,
      });
    };

    EVENTS.forEach((name) => video.addEventListener(name, sync));
    sync();
    return () => EVENTS.forEach((name) => video.removeEventListener(name, sync));
  }, [videoRef]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      const p = video.play();
      if (p && p.catch) p.catch(() => {});
    } else {
      video.pause();
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (video) video.muted = !video.muted;
  };

  const ratioFromPointer = (event) => {
    const rect = trackRef.current.getBoundingClientRect();
    return Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
  };

  const seekToRatio = (ratio) => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    video.currentTime = ratio * video.duration;
    setState((s) => ({ ...s, current: video.currentTime }));
  };

  const onPointerDown = (event) => {
    draggingRef.current = true;
    trackRef.current.setPointerCapture(event.pointerId);
    seekToRatio(ratioFromPointer(event));
  };

  const onPointerMove = (event) => {
    const ratio = ratioFromPointer(event);
    setHoverRatio(ratio);
    if (draggingRef.current) seekToRatio(ratio);
  };

  const onPointerUp = (event) => {
    draggingRef.current = false;
    if (trackRef.current.hasPointerCapture(event.pointerId)) {
      trackRef.current.releasePointerCapture(event.pointerId);
    }
  };

  const onKeyDown = (event) => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    if (event.key === 'ArrowRight') {
      video.currentTime = Math.min(video.duration, video.currentTime + 0.05);
      event.preventDefault();
    } else if (event.key === 'ArrowLeft') {
      video.currentTime = Math.max(0, video.currentTime - 0.05);
      event.preventDefault();
    }
  };

  const progress = state.duration ? state.current / state.duration : 0;

  return (
    <div className="timeline-panel">
      <div className="timeline-controls">
        <button className="tl-btn" onClick={togglePlay} aria-label={state.playing ? 'Pause' : 'Play'}>
          {state.playing ? <PauseIcon width={16} height={16} /> : <PlayIcon width={16} height={16} />}
        </button>
        <span className="tl-time">
          {formatTime(state.current)}
          <span className="tl-sep"> / </span>
          {formatTime(state.duration)}
        </span>
        <button className="tl-btn tl-mute" onClick={toggleMute} aria-label={state.muted ? 'Unmute' : 'Mute'}>
          {state.muted ? <MuteIcon width={16} height={16} /> : <VolumeIcon width={16} height={16} />}
        </button>
      </div>

      <div
        ref={trackRef}
        className="timeline-track"
        role="slider"
        tabIndex={0}
        aria-label="Timeline"
        aria-valuemin={0}
        aria-valuemax={Number(state.duration.toFixed(2))}
        aria-valuenow={Number(state.current.toFixed(2))}
        aria-valuetext={formatTime(state.current)}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onPointerLeave={() => setHoverRatio(null)}
        onKeyDown={onKeyDown}
      >
        <div className="tl-track-bg" />
        <div className="tl-buffered" style={{ transform: `scaleX(${Math.min(1, state.buffered)})` }} />
        <div className="tl-progress" style={{ transform: `scaleX(${progress})` }} />
        <div className="tl-playhead" style={{ left: `${progress * 100}%` }} />
        {hoverRatio !== null && (
          <div className="tl-hover" style={{ left: `${hoverRatio * 100}%` }}>
            {formatTime(hoverRatio * state.duration)}
          </div>
        )}
      </div>
    </div>
  );
}
