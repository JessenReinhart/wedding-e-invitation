import { useEffect, useState } from "react";

// Comprehensive iOS detection utility
export const detectDevice = () => {
  if (typeof window === 'undefined') {
    return {
      isIOS: false,
      isAndroid: false,
      isMobile: false,
      isDesktop: true,
      isSafari: false,
    };
  }

  const userAgent = navigator.userAgent.toLowerCase();
  const platform = navigator.platform?.toLowerCase() || '';

  // iOS detection - covers iPhone, iPad, iPod
  const isIOS = 
    /iphone|ipad|ipod/.test(userAgent) ||
    /iphone|ipad|ipod/.test(platform) ||
    // Modern iPad detection (iPadOS reports as Mac)
    (navigator.maxTouchPoints > 1 && /macintosh/.test(userAgent));

  // Android detection
  const isAndroid = /android/.test(userAgent);

  // Mobile detection
  const isMobile = /mobile|android|iphone|ipad|ipod|blackberry|iemobile|opera mini/.test(userAgent);

  // Desktop detection
  const isDesktop = !isMobile;

  // Safari detection (useful for iOS-specific fixes)
  const isSafari = /safari/.test(userAgent) && !/chrome|chromium|edg/.test(userAgent);

  return {
    isIOS,
    isAndroid,
    isMobile,
    isDesktop,
    isSafari,
  };
};

// Hook version
export const useDeviceDetection = () => {
  const [deviceInfo, setDeviceInfo] = useState(detectDevice());

  useEffect(() => {
    setDeviceInfo(detectDevice());
  }, []);

  return deviceInfo;
};