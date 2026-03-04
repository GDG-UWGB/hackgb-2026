import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Custom hook to force the window to scroll to the top 
 * whenever the route changes (when navigating between pages).
 */
export const useScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to the top of the window whenever the 'pathname' changes
    window.scrollTo(0, 0);

    // Dependency array: runs every time the route path changes
  }, [pathname]);
};