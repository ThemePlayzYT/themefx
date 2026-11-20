import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import AnimationCard from '../components/AnimationCard.jsx';
import DownloadButton from '../components/DownloadButton.jsx';
import VideoTimeline from '../components/VideoTimeline.jsx';
import NotFound from './NotFound.jsx';
import { getAnimation, getCollection, getCollectionItems } from '../data/animations.js';

export default function AnimationDetail() {
  const { id } = useParams();
  const item = getAnimation(id);
  const videoRef = useRef(null);

  /* Set the 1080p preview with sound. The click that opened this page is the user gesture
     browsers need for unmuted playback. If sound is still blocked, the video starts muted. */
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !item) return undefined;

    video.src = item.video;
    video.muted = false;
    video.loop = true;
    const p = video.play();
    if (p && p.catch) {
      p.catch(() => {
        video.muted = true;
        video.play().catch(() => {});
      });
    }

    return () => {
      video.pause();
      video.removeAttribute('src');
      video.load();
    };
  }, [item]);

  if (!item) return <NotFound />;

  const collection = getCollection(item.collectionId);
  const related = getCollectionItems(item.collectionId).filter((a) => a.id !== item.id);

  return (
    <section className="page page-detail" aria-labelledby="detail-title">
      <div className="detail-grid">
        <div className="player-col">
          <div className="player-frame">
            <video
              ref={videoRef}
              className="detail-video"
              poster={item.poster}
              playsInline
              controlsList="nodownload noremoteplayback nofullscreen"
              disablePictureInPicture
            />
          </div>
          <VideoTimeline videoRef={videoRef} />
        </div>

        <aside className="info-col">
          <span className="detail-cat">{collection ? collection.title.toUpperCase() : 'ANIMATIONS'}</span>
          <h1 id="detail-title" className="detail-title">{item.title}</h1>
          <p className="detail-desc">{item.description}</p>
          <DownloadButton file={item.download} />
        </aside>
      </div>

      {related.length > 0 && collection && (
        <div className="related">
          <h2>All {collection.title} Animations</h2>
          <div className="grid">
            {related.map((rel, index) => (
              <AnimationCard
                key={rel.id}
                to={`/animation/${rel.id}`}
                title={rel.title}
                video={rel.video}
                poster={rel.poster}
                mode="hover"
                index={index}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
