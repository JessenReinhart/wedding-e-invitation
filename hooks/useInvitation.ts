import { useState, useEffect, useCallback } from 'react';

export const useInvitation = (pathname: string) => {
  const [isOpened, setIsOpened] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleOpen = useCallback(() => {
    setIsAnimating(true);
    // After animation completes, show content and scroll
    setTimeout(() => {
      setIsOpened(true);
      setIsAnimating(false);
      // Smooth scroll to bride-groom section
      setTimeout(() => {
        const brideGroomElement = document.getElementById("bride-groom");
        if (brideGroomElement) {
          brideGroomElement.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }, 1000); // Match animation duration
  }, []);

  // Reset invitation state when navigating to home page (initial state)
  useEffect(() => {
    if (pathname === "/") {
      setIsOpened(false);
      setIsAnimating(false);
    }
  }, [pathname]);

  return {
    isOpened,
    isAnimating,
    handleOpen,
  };
};
