import { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppShell from './components/AppShell.jsx';
import LoaderScreen from './components/LoaderScreen.jsx';
import AllAnimations from './pages/AllAnimations.jsx';
import NotFound from './pages/NotFound.jsx';

/* The detail page is code-split so the library loads first. */
const AnimationDetail = lazy(() => import('./pages/AnimationDetail.jsx'));

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <LoaderScreen done={!loading} />
      <Routes>
        <Route element={<AppShell />}>
          {/* Opening the website always lands on ALL ANIMATIONS */}
          <Route index element={<AllAnimations />} />
          <Route
            path="animation/:id"
            element={
              <Suspense fallback={<div className="page-loading" aria-label="Loading" />}>
                <AnimationDetail />
              </Suspense>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}
