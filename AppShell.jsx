import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Topbar from './Topbar.jsx';
import Sidebar from './Sidebar.jsx';
import Background from './Background.jsx';
import useMediaQuery from '../hooks/useMediaQuery.js';

/* Layout shared by every page: top bar, collapsible sidebar, animated background, page outlet. */
export default function AppShell() {
  const location = useLocation();
  const isMobile = useMediaQuery('(max-width: 860px)');
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  /* Each page change starts at the top of the page and closes the mobile menu */
  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [location.pathname]);

  const toggleSidebar = () => {
    if (isMobile) setMobileOpen((open) => !open);
    else setCollapsed((value) => !value);
  };

  const sidebarOpen = isMobile ? mobileOpen : !collapsed;
  const shellClass = ['app-shell', collapsed && !isMobile && 'is-collapsed', mobileOpen && 'is-mobile-open']
    .filter(Boolean)
    .join(' ');

  return (
    <div className={shellClass}>
      <Background />
      <Topbar onToggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
      <Sidebar onNavigate={() => setMobileOpen(false)} />
      {mobileOpen && (
        <button className="sidebar-scrim" aria-label="Close sidebar" onClick={() => setMobileOpen(false)} />
      )}
      <main className="main" id="main">
        {/* Keyed by path so every page change plays the same entrance transition */}
        <div className="page-transition" key={location.pathname}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
