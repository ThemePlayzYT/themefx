import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="page-state">
      <h1>Page not found</h1>
      <p>This page does not exist.</p>
      <Link to="/" className="btn btn-primary">Back to All Animations</Link>
    </section>
  );
}
