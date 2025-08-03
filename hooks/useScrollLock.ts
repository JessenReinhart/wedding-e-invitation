import { useEffect, useCallback, useRef } from 'react';

// Throttle function to limit event processing frequency
const throttle = (func: Function, limit: number) => {
  let inThrottle: boolean;
  return function(this: any, ...args: any[]) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

interface ScrollLockConfig {
  isLocked: boolean;
  onUnlock?: () => void;
}

interface ScrollEvent {
  type: 'wheel' | 'keydown' | 'touchmove';
  prevented: boolean;
  timestamp: number;
}

export const useScrollLock = (config: ScrollLockConfig) => {
  const { isLocked, onUnlock } = config;
  const scrollEventsRef = useRef<ScrollEvent[]>([]);
  const feedbackTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Provide visual feedback for blocked scroll attempts (throttled)
  const showScrollBlockedFeedback = useCallback(
    throttle(() => {
      const heroSection = document.getElementById('hero');
      if (heroSection) {
        heroSection.classList.add('scroll-blocked-feedback');
        
        // Clear existing timeout
        if (feedbackTimeoutRef.current) {
          clearTimeout(feedbackTimeoutRef.current);
        }
        
        // Remove feedback class after animation
        feedbackTimeoutRef.current = setTimeout(() => {
          heroSection.classList.remove('scroll-blocked-feedback');
        }, 300);
      }
    }, 100), // Throttle to max once per 100ms
    []
  );

  // Handle wheel events (mouse scroll)
  const handleWheel = useCallback((e: WheelEvent) => {
    if (isLocked && e.deltaY > 0) { // Only prevent downward scrolling
      e.preventDefault();
      e.stopPropagation();
      
      // Log event for analytics (keep only last 50 events to prevent memory buildup)
      scrollEventsRef.current.push({
        type: 'wheel',
        prevented: true,
        timestamp: Date.now()
      });
      if (scrollEventsRef.current.length > 50) {
        scrollEventsRef.current = scrollEventsRef.current.slice(-50);
      }
      
      showScrollBlockedFeedback();
      
      // Provide haptic feedback on mobile if available
      if (navigator.vibrate) {
        navigator.vibrate(50);
      }
    }
  }, [isLocked, showScrollBlockedFeedback]);

  // Handle keyboard events
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (isLocked) {
      const blockedKeys = [
        'ArrowDown',
        'ArrowUp', 
        'PageDown',
        'PageUp',
        'Space',
        'End',
        'Home'
      ];
      
      // Allow Tab for accessibility
      if (e.key === 'Tab') {
        return;
      }
      
      // Handle Enter key on CTA button
      if (e.key === 'Enter') {
        const activeElement = document.activeElement as HTMLElement;
        if (activeElement && activeElement.textContent?.includes('Selengkapnya')) {
          onUnlock?.();
          return;
        }
      }
      
      if (blockedKeys.includes(e.key) || (e.key === ' ' && e.code === 'Space')) {
        e.preventDefault();
        e.stopPropagation();
        
        scrollEventsRef.current.push({
          type: 'keydown',
          prevented: true,
          timestamp: Date.now()
        });
        if (scrollEventsRef.current.length > 50) {
          scrollEventsRef.current = scrollEventsRef.current.slice(-50);
        }
        
        showScrollBlockedFeedback();
      }
    }
  }, [isLocked, onUnlock, showScrollBlockedFeedback]);

  // Handle touch events (mobile)
  const touchStartRef = useRef<{ y: number; time: number } | null>(null);
  
  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (isLocked && e.touches.length === 1) {
      touchStartRef.current = {
        y: e.touches[0].clientY,
        time: Date.now()
      };
    }
  }, [isLocked]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (isLocked && touchStartRef.current && e.touches.length === 1) {
      const currentY = e.touches[0].clientY;
      const deltaY = touchStartRef.current.y - currentY;
      const deltaTime = Date.now() - touchStartRef.current.time;
      
      // Prevent downward scrolling (deltaY > 0 means scrolling down)
      // Add minimum distance and velocity thresholds to avoid blocking small touches
      if (deltaY > 20 && deltaTime > 50) {
        e.preventDefault();
        e.stopPropagation();
        
        scrollEventsRef.current.push({
          type: 'touchmove',
          prevented: true,
          timestamp: Date.now()
        });
        if (scrollEventsRef.current.length > 50) {
          scrollEventsRef.current = scrollEventsRef.current.slice(-50);
        }
        
        showScrollBlockedFeedback();
        
        // Provide haptic feedback
        if (navigator.vibrate) {
          navigator.vibrate(50);
        }
      }
    }
  }, [isLocked, showScrollBlockedFeedback]);

  const handleTouchEnd = useCallback(() => {
    touchStartRef.current = null;
  }, []);

  // Apply/remove scroll lock
  useEffect(() => {
    const body = document.body;
    const html = document.documentElement;
    
    if (isLocked) {
      // Store current scroll position
      const scrollY = window.scrollY;
      
      // Apply scroll lock classes
      body.classList.add('scroll-locked');
      html.classList.add('scroll-locked');
      
      // Prevent scroll restoration
      body.style.top = `-${scrollY}px`;
      
      // Add event listeners with non-passive options to allow preventDefault
      document.addEventListener('wheel', handleWheel, { passive: false });
      document.addEventListener('keydown', handleKeyDown, { passive: false });
      document.addEventListener('touchstart', handleTouchStart, { passive: false });
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd, { passive: true });
      
      // Add ARIA announcement for screen readers
      const announcement = document.createElement('div');
      announcement.className = 'scroll-lock-announcement';
      announcement.setAttribute('aria-live', 'polite');
      announcement.textContent = 'Scrolling is locked. Click the "Selengkapnya" button to continue.';
      document.body.appendChild(announcement);
      
      return () => {
        // Cleanup announcement
        const existingAnnouncement = document.querySelector('.scroll-lock-announcement');
        if (existingAnnouncement) {
          existingAnnouncement.remove();
        }
      };
    } else {
      // Remove scroll lock classes
      body.classList.remove('scroll-locked');
      html.classList.remove('scroll-locked');
      
      // Restore scroll position
      const scrollY = body.style.top;
      body.style.top = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
      
      // Remove event listeners
      document.removeEventListener('wheel', handleWheel);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      
      // Clear any pending feedback timeouts
      if (feedbackTimeoutRef.current) {
        clearTimeout(feedbackTimeoutRef.current);
        feedbackTimeoutRef.current = null;
      }
    }
  }, [isLocked, handleWheel, handleKeyDown, handleTouchStart, handleTouchMove, handleTouchEnd]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (feedbackTimeoutRef.current) {
        clearTimeout(feedbackTimeoutRef.current);
      }
      
      // Remove event listeners
      document.removeEventListener('wheel', handleWheel);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      
      // Remove scroll lock classes
      document.body.classList.remove('scroll-locked');
      document.documentElement.classList.remove('scroll-locked');
      
      // Remove announcement
      const announcement = document.querySelector('.scroll-lock-announcement');
      if (announcement) {
        announcement.remove();
      }
    };
  }, [handleWheel, handleKeyDown, handleTouchStart, handleTouchMove, handleTouchEnd]);

  // Performance monitoring
  const getPerformanceMetrics = useCallback(() => {
    return {
      scrollEventsCount: scrollEventsRef.current.length,
      memoryUsage: (performance as any).memory ? {
        usedJSHeapSize: (performance as any).memory.usedJSHeapSize,
        totalJSHeapSize: (performance as any).memory.totalJSHeapSize,
        jsHeapSizeLimit: (performance as any).memory.jsHeapSizeLimit
      } : null,
      isLocked,
      timestamp: Date.now()
    };
  }, [isLocked]);

  // Return analytics data for debugging
  return {
    scrollEvents: scrollEventsRef.current,
    clearScrollEvents: () => {
      scrollEventsRef.current = [];
    },
    getPerformanceMetrics
  };
};