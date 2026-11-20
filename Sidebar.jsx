import { NavLink } from 'react-router-dom';
import { GridIcon } from './icons.jsx';

/* The sidebar contains only All Animations, as requested. */
export default function Sidebar({ onNavigate }) {
  return (
    <aside className="sidebar" aria-label="Sidebar">
      <nav>
        <NavLink to="/" end className="side-link" onClick={onNavigate}>
          <GridIcon />
          <span>All Animations</span>
        </NavLink>
      </nav>
    </aside>
  );
}
