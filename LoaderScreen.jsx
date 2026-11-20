/* Brand loader. Fades out once the app is ready. Pure CSS animation, no JS work per frame. */
export default function LoaderScreen({ done }) {
  return (
    <div className={`loader ${done ? 'is-done' : ''}`} aria-hidden="true">
      <div className="loader-blocks">
        {Array.from({ length: 9 }, (_, i) => <span key={i} />)}
      </div>
      <div className="loader-word">THEMEFX</div>
    </div>
  );
}
