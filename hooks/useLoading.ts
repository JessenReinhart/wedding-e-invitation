import { useState, useEffect } from 'react';

interface UseLoadingOptions {
  initialLoading?: boolean;
  pathname: string;
}

export const useLoading = ({ initialLoading = true, pathname }: UseLoadingOptions) => {
  const [loading, setLoading] = useState(initialLoading);
  const [heroLoaded, setHeroLoaded] = useState(false);

  useEffect(() => {
    if (heroLoaded) {
      setLoading(false);
    }
  }, [heroLoaded]);

  useEffect(() => {
    if (pathname !== '/' && loading) {
      setLoading(false);
    }
  }, [pathname, loading]);

  const handleHeroLoaded = () => {
    setHeroLoaded(true);
  };

  const showLoader = loading && pathname === '/';

  return {
    loading,
    setLoading,
    handleHeroLoaded,
    showLoader,
  };
};
