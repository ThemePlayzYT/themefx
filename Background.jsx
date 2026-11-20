/* Ambient background. Only transform animations on composited layers, so it costs very little GPU/CPU. */
export default function Background() {
  return (
    <div className="bg" aria-hidden="true">
      <span className="blob blob-yellow" />
      <span className="blob blob-violet" />
      <span className="blob blob-soft" />
      <span className="grid-lines" />
    </div>
  );
}
