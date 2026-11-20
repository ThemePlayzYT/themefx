import { useRef } from 'react';
import { Link } from 'react-router-dom';
import LazyVideo from './LazyVideo.jsx';

/* Library and collection card. Uses a 1080p preview, a small progress line, and a hover glow. */
export default function AnimationCard({ to, title, video, poster, mode = 'autoplay', index = 0 }) {
  const progressRef = useRef(null);

  return (
    <Link to={to} className="card" style={{ '--i': index }} aria-label={title}>
      <div className="card-thumb">
        <LazyVideo src={video} poster={poster} mode={mode} progressRef={progressRef} className="card-video" />
      </div>
      <div className="card-progress" aria-hidden="true">
        <span ref={progressRef} className="card-progress-fill" />
      </div>
      <div className="card-meta">
        <h3>{title}</h3>
        <span className="card-cat">ANIMATIONS</span>
      </div>
    </Link>
  );
}
