import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { MenuIcon, SearchIcon, UserIcon } from './icons.jsx';

export default function Topbar({ onToggleSidebar, sidebarOpen }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [notice, setNotice] = useState('');
  const noticeTimer = useRef(null);

  useEffect(() => () => clearTimeout(noticeTimer.current), []);

  /* Search icon: go to ALL ANIMATIONS if needed, then focus the search field */
  const focusSearch = () => {
    const onLibrary = location.pathname === '/';
    if (!onLibrary) navigate('/');
    setTimeout(() => document.getElementById('library-search')?.focus(), onLibrary ? 0 : 350);
  };

  const showNotice = (message) => {
    setNotice(message);
    clearTimeout(noticeTimer.current);
    noticeTimer.current = setTimeout(() => setNotice(''), 2200);
  };

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="icon-btn" onClick={onToggleSidebar} aria-label="Toggle sidebar" aria-expanded={sidebarOpen}>
          <MenuIcon />
        </button>
        <Link to="/" className="brand" aria-label="THEMEFX home">
          <img className="brand-mark" src={logo} alt="" width="30" height="30" />
          <span className="brand-name">THEMEFX</span>
        </Link>
      </div>

      <nav className="topnav" aria-label="Main">
        <NavLink to="/" end>All Animations</NavLink>
      </nav>

      <div className="topbar-right">
        <button className="icon-btn" onClick={focusSearch} aria-label="Search animations">
          <SearchIcon />
        </button>
        <button className="icon-btn avatar" onClick={() => showNotice('Accounts are not available yet.')} aria-label="Profile">
          <UserIcon />
        </button>
      </div>

      <div className={`toast ${notice ? 'is-visible' : ''}`} role="status" aria-live="polite">{notice}</div>
    </header>
  );
}
