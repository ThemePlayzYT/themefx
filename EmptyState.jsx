export default function EmptyState({ title, text, onReset }) {
  return (
    <div className="empty-state" role="status">
      <h2>{title}</h2>
      <p>{text}</p>
      {onReset && (
        <button className="btn btn-ghost" onClick={onReset}>
          Clear search
        </button>
      )}
    </div>
  );
}
