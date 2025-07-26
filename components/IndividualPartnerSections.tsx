import React, { useState, useEffect } from 'react';
import { PartnerDetails } from '../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';

interface IndividualPartnerSectionsProps {
  groom: PartnerDetails;
  bride: PartnerDetails;
}

interface ImageState {
  loaded: boolean;
  error: boolean;
  src: string;
}

const IndividualPartnerSections: React.FC<IndividualPartnerSectionsProps> = ({
  groom,
  bride
}) => {
  // Helper function to get appropriate image based on screen size
  const getResponsiveImage = (partner: PartnerDetails): string => {
    // Use desktop image for large screens (lg and above), mobile image for smaller screens
    if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
      return partner.imageDesktop || partner.image;
    }
    return partner.image;
  };

  const [groomImage, setGroomImage] = useState<ImageState>({
    loaded: false,
    error: false,
    src: getResponsiveImage(groom)
  });
  const [brideImage, setBrideImage] = useState<ImageState>({
    loaded: false,
    error: false,
    src: getResponsiveImage(bride)
  });
  // Fallback images for when primary images fail to load
  const FALLBACK_IMAGES = {
    groom: 'https://via.placeholder.com/1920x1080/2d5a27/ffffff?text=Groom+Photo',
    bride: 'https://via.placeholder.com/1920x1080/b76e79/ffffff?text=Bride+Photo'
  };

  // Preload images with error handling and fallback
  useEffect(() => {
    const preloadImageWithFallback = (
      src: string,
      fallbackSrc: string,
      setImageState: React.Dispatch<React.SetStateAction<ImageState>>
    ) => {
      const img = new Image();

      img.onload = () => {
        setImageState({
          loaded: true,
          error: false,
          src: src
        });
      };

      img.onerror = () => {
        // Try fallback image
        const fallbackImg = new Image();

        fallbackImg.onload = () => {
          setImageState({
            loaded: true,
            error: false,
            src: fallbackSrc
          });
        };

        fallbackImg.onerror = () => {
          // Even fallback failed, show error state
          setImageState({
            loaded: false,
            error: true,
            src: ''
          });
        };

        fallbackImg.src = fallbackSrc;
      };

      img.src = src;
    };

    // Load appropriate images based on current screen size
    const groomImageSrc = getResponsiveImage(groom);
    const brideImageSrc = getResponsiveImage(bride);

    preloadImageWithFallback(groomImageSrc, FALLBACK_IMAGES.groom, setGroomImage);
    preloadImageWithFallback(brideImageSrc, FALLBACK_IMAGES.bride, setBrideImage);

    // Handle screen resize to switch between mobile and desktop images
    const handleResize = () => {
      const newGroomImageSrc = getResponsiveImage(groom);
      const newBrideImageSrc = getResponsiveImage(bride);

      // Only reload if the image source actually changed
      if (newGroomImageSrc !== groomImage.src) {
        setGroomImage(prev => ({ ...prev, loaded: false, error: false, src: newGroomImageSrc }));
        preloadImageWithFallback(newGroomImageSrc, FALLBACK_IMAGES.groom, setGroomImage);
      }

      if (newBrideImageSrc !== brideImage.src) {
        setBrideImage(prev => ({ ...prev, loaded: false, error: false, src: newBrideImageSrc }));
        preloadImageWithFallback(newBrideImageSrc, FALLBACK_IMAGES.bride, setBrideImage);
      }
    };

    // Add resize listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [groom, bride, groomImage.src, brideImage.src]);
  // Helper function to construct Instagram URL
  const getInstagramUrl = (handle: string): string => {
    if (!handle || handle.trim() === '') {
      return '#';
    }
    // Remove @ symbol if present and clean the handle
    const cleanHandle = handle.replace('@', '').trim();
    return `https://instagram.com/${cleanHandle}`;
  };

  // Helper function to check if Instagram handle is valid
  const isValidInstagramHandle = (handle: string): boolean => {
    if (!handle || handle.trim() === '') {
      return false;
    }
    const cleanHandle = handle.replace('@', '').trim();
    // Basic validation: alphanumeric, underscores, dots, max 30 chars
    const instagramRegex = /^[a-zA-Z0-9._]{1,30}$/;
    return instagramRegex.test(cleanHandle);
  };

  // Helper function to render Instagram link with error handling
  const renderInstagramLink = (partner: PartnerDetails) => {
    if (!isValidInstagramHandle(partner.instagramHandle)) {
      return null;
    }

    const instagramUrl = getInstagramUrl(partner.instagramHandle);

    // Don't render if URL construction failed
    if (instagramUrl === '#') {
      return null;
    }

    return (
      <div className="mt-4 sm:mt-5 md:mt-6 lg:mt-7 xl:mt-8 2xl:mt-10 max-[480px]:mt-3 portrait:mt-4 portrait:sm:mt-5 portrait:md:mt-6 landscape:mt-2 landscape:sm:mt-3 landscape:md:mt-4 landscape:lg:mt-5">
        <a
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 sm:gap-2 md:gap-2.5 lg:gap-3 xl:gap-3.5 2xl:gap-4 px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 lg:px-6 lg:py-3 xl:px-7 xl:py-3.5 2xl:px-9 2xl:py-5 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-3xl border border-white/40 rounded-full bg-white/10 backdrop-blur-sm text-white transition-all duration-300 hover:bg-white/25 hover:border-white/60 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-transparent active:scale-95 max-[480px]:text-xs max-[480px]:px-2.5 max-[480px]:py-1 max-[480px]:gap-1 portrait:text-sm portrait:sm:text-base portrait:md:text-lg portrait:lg:text-xl landscape:text-xs landscape:sm:text-sm landscape:md:text-base landscape:lg:text-lg landscape:xl:text-xl"
          aria-label={`Visit ${partner.fullName}'s Instagram profile`}
          onClick={(e) => {
            // Additional validation before navigation
            if (instagramUrl === '#' || !instagramUrl.includes('instagram.com')) {
              e.preventDefault();
              console.warn('Invalid Instagram URL:', instagramUrl);
            }
          }}
        >
          <FontAwesomeIcon
            icon={faInstagram}
            className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-4xl transition-all duration-300 hover:text-pink-400 hover:scale-110 max-[480px]:text-xs portrait:text-base portrait:sm:text-lg portrait:md:text-xl portrait:lg:text-2xl landscape:text-xs landscape:sm:text-sm landscape:md:text-base landscape:lg:text-lg landscape:xl:text-xl"
          />
          <span>@{partner.instagramHandle.replace('@', '')}</span>
        </a>
      </div>
    );
  };

  // Helper function to render section with error states
  const renderPartnerSection = (
    partner: PartnerDetails,
    imageState: ImageState,
    sectionType: 'groom' | 'bride'
  ) => {
    // Base Tailwind classes for the section structure with optimized responsive breakpoints
    const baseSectionClasses = [
      'relative',
      'w-full',
      // Mobile viewport height optimizations - fine-tuned for better mobile experience
      'h-screen', // Mobile-first: full viewport height
      'min-h-screen', // Ensure minimum full height on mobile
      'max-h-screen', // Prevent overflow on mobile
      // Small mobile optimization for very small screens
      'max-[480px]:h-[100dvh]', // Use dynamic viewport height on very small screens
      'max-[480px]:min-h-[100dvh]', // Ensure proper height on small mobile devices
      // Tablet specific height adjustments - optimized for better content visibility
      'sm:h-[85vh]', // Small tablet: 85vh height for better proportions
      'sm:min-h-[600px]', // Minimum height for small tablets
      'sm:max-h-[900px]', // Maximum height to prevent excessive stretching
      'md:h-[80vh]', // Medium tablet: 80vh height for optimal viewing
      'md:min-h-[650px]', // Increased minimum height for medium tablets
      'md:max-h-[1000px]', // Maximum height for medium tablets
      // Desktop specific height and spacing adjustments - fine-tuned for optimal proportions
      'lg:h-[85vh]', // Large desktop: 85vh height
      'lg:min-h-[700px]', // Adjusted minimum height for large screens
      'lg:max-h-[1100px]', // Maximum height for large screens
      'xl:h-[88vh]', // Extra large desktop: slightly reduced from 90vh for better balance
      'xl:min-h-[750px]', // Adjusted minimum height for extra large screens
      'xl:max-h-[1200px]', // Maximum height for extra large screens
      '2xl:h-[82vh]', // Ultra-wide: further reduced for better proportions on very wide screens
      '2xl:min-h-[800px]', // Minimum height for ultra-wide screens
      '2xl:max-h-[1300px]', // Maximum height for ultra-wide screens
      // Orientation-specific styling optimizations - enhanced for better user experience
      'portrait:h-screen', // Full height in portrait mode
      'portrait:min-h-screen', // Ensure full height in portrait
      'portrait:max-h-screen', // Prevent overflow in portrait
      'landscape:h-[88vh]', // Slightly reduced in landscape for better content visibility
      'landscape:min-h-[500px]', // Minimum height in landscape mode
      'landscape:max-h-[800px]', // Maximum height in landscape mode
      'landscape:sm:h-[78vh]', // Further optimized for small landscape screens
      'landscape:sm:min-h-[450px]', // Minimum height for small landscape
      'landscape:md:h-[82vh]', // Optimized for medium landscape screens
      'landscape:md:min-h-[550px]', // Minimum height for medium landscape
      'landscape:lg:h-[85vh]', // Large landscape optimization
      'landscape:lg:min-h-[600px]', // Minimum height for large landscape
      // Additional responsive optimizations
      'transition-all', // Smooth transitions during resize
      'duration-300', // Transition duration
      'ease-in-out', // Smooth easing
      'flex',
      'items-center',
      'justify-center'
    ];

    // Background image classes - applied when image is loaded
    const backgroundImageClasses = [
      'bg-cover', // Responsive background sizing
      'bg-top', // Responsive background positioning
      'bg-no-repeat', // Prevent image repetition
      'bg-fixed', // Optional: parallax effect on larger screens
    ];

    // Error state gradient classes using Tailwind utilities
    const errorGradientClasses = sectionType === 'groom'
      ? ['bg-gradient-to-br', 'from-green-800', 'to-green-600'] // Groom fallback gradient
      : ['bg-gradient-to-br', 'from-rose-600', 'to-rose-400']; // Bride fallback gradient

    // Combine classes based on image state
    let sectionClasses: string[];
    if (imageState.loaded && imageState.src) {
      // Image loaded successfully - use background image classes
      sectionClasses = [...baseSectionClasses, ...backgroundImageClasses];
    } else if (imageState.error) {
      // Image failed - use gradient background classes
      sectionClasses = [...baseSectionClasses, ...errorGradientClasses];
    } else {
      // Loading state - use base classes only
      sectionClasses = [...baseSectionClasses];
    }

    const finalSectionClasses = sectionClasses.join(' ');

    // Inline styles for dynamic image URLs (maintaining existing functionality)
    const backgroundStyle: React.CSSProperties = {};

    if (imageState.loaded && imageState.src) {
      // Apply background image via inline style for dynamic URLs
      backgroundStyle.backgroundImage = `url(${imageState.src})`;
    }
    // Note: Error gradients are now handled via Tailwind classes, no inline styles needed

    return (
      <section
        className={finalSectionClasses}
        style={backgroundStyle}
        role="region"
        aria-labelledby={`${sectionType}-heading`}
      >
        {/* Overlay with Tailwind gradient and positioning utilities - optimized for responsive breakpoints */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/20 to-black/40 flex items-center justify-center p-4 sm:p-5 md:p-6 lg:p-8 xl:p-10 2xl:p-12 max-[480px]:p-3 portrait:p-4 portrait:sm:p-5 portrait:md:p-6 landscape:p-3 landscape:sm:p-4 landscape:md:p-5 landscape:lg:p-6">
          {/* Content container with responsive centering and spacing using Tailwind flex utilities - fine-tuned for all breakpoints */}
          <div className="text-center text-white max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-4xl mx-auto space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-7 xl:space-y-8 2xl:space-y-9 max-[480px]:space-y-3 max-[480px]:max-w-[280px] portrait:space-y-4 portrait:sm:space-y-5 portrait:md:space-y-6 landscape:space-y-3 landscape:sm:space-y-4 landscape:md:space-y-5 landscape:lg:space-y-6 relative">
            {/* Show loading indicator with Tailwind animations and positioning - optimized for all breakpoints */}
            {!imageState.loaded && !imageState.error && (
              <div
                className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 backdrop-blur-sm rounded-lg p-4 sm:p-5 md:p-6 lg:p-7 xl:p-8 2xl:p-10 transition-opacity duration-300 ease-in opacity-100 max-[480px]:p-3 portrait:p-4 portrait:sm:p-5 portrait:md:p-6 landscape:p-3 landscape:sm:p-4 landscape:md:p-5 landscape:lg:p-6"
                aria-label="Loading partner photo"
              >
                {/* Loading spinner with Tailwind animation utilities - responsive sizing */}
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16 2xl:w-20 2xl:h-20 border-3 sm:border-4 md:border-4 lg:border-4 border-white/30 border-t-white rounded-full animate-spin mb-3 sm:mb-4 md:mb-5 lg:mb-6 xl:mb-7 2xl:mb-8 max-[480px]:w-6 max-[480px]:h-6 max-[480px]:border-2 max-[480px]:mb-2 portrait:w-10 portrait:h-10 portrait:sm:w-12 portrait:sm:h-12 portrait:md:w-14 portrait:md:h-14 landscape:w-6 landscape:h-6 landscape:sm:w-8 landscape:sm:h-8 landscape:md:w-10 landscape:md:h-10 landscape:lg:w-12 landscape:lg:h-12"></div>
                {/* Loading text with Tailwind typography utilities - responsive text sizing */}
                <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl text-white/80 font-light tracking-wide animate-pulse max-[480px]:text-xs portrait:text-base portrait:sm:text-lg portrait:md:text-xl landscape:text-xs landscape:sm:text-sm landscape:md:text-base landscape:lg:text-lg">Loading photo...</p>
              </div>
            )}

            {/* Show error message if image failed completely with Tailwind utilities - optimized for all breakpoints */}
            {imageState.error && (
              <div
                className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 backdrop-blur-sm rounded-lg p-4 sm:p-5 md:p-6 lg:p-7 xl:p-8 2xl:p-10 transition-all duration-300 ease-in-out max-[480px]:p-3 portrait:p-4 portrait:sm:p-5 portrait:md:p-6 landscape:p-3 landscape:sm:p-4 landscape:md:p-5 landscape:lg:p-6"
                aria-label="Photo unavailable"
              >
                {/* Error icon with Tailwind styling - responsive sizing */}
                <FontAwesomeIcon
                  icon={faUser}
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl mb-3 sm:mb-4 md:mb-5 lg:mb-6 xl:mb-7 2xl:mb-8 text-white/70 drop-shadow-lg animate-pulse max-[480px]:text-3xl max-[480px]:mb-2 portrait:text-5xl portrait:sm:text-6xl portrait:md:text-7xl portrait:lg:text-8xl landscape:text-3xl landscape:sm:text-4xl landscape:md:text-5xl landscape:lg:text-6xl landscape:xl:text-7xl"
                />
                {/* Error text with Tailwind typography utilities - responsive text sizing */}
                <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl text-white/80 font-light tracking-wide text-center leading-relaxed max-[480px]:text-xs portrait:text-base portrait:sm:text-lg portrait:md:text-xl landscape:text-xs landscape:sm:text-sm landscape:md:text-base landscape:lg:text-lg">
                  Photo unavailable
                </p>
              </div>
            )}

            {/* Partner name with responsive typography - optimized for all breakpoints and orientations */}
            <h2
              id={`${sectionType}-heading`}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-9xl font-light mb-2 sm:mb-3 md:mb-4 lg:mb-5 xl:mb-6 2xl:mb-7 max-[480px]:text-2xl max-[480px]:mb-2 portrait:text-4xl portrait:sm:text-5xl portrait:md:text-6xl portrait:lg:text-7xl landscape:text-2xl landscape:sm:text-3xl landscape:md:text-4xl landscape:lg:text-5xl landscape:xl:text-6xl"
              style={{ textShadow: '3px 3px 6px rgba(0, 0, 0, 0.9)' }}
            >
              {partner.fullName || 'Name unavailable'}
            </h2>

            {/* Partner family info with responsive typography and spacing - fine-tuned for all screen sizes */}
            <p
              className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-4xl mb-4 sm:mb-5 md:mb-6 lg:mb-8 xl:mb-10 2xl:mb-14 max-w-full sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-3xl mx-auto leading-relaxed max-[480px]:text-xs max-[480px]:mb-3 max-[480px]:leading-snug portrait:text-base portrait:sm:text-lg portrait:md:text-xl portrait:lg:text-2xl landscape:text-xs landscape:sm:text-sm landscape:md:text-base landscape:lg:text-lg landscape:xl:text-xl"
              style={{ textShadow: '3px 3px 6px rgba(0, 0, 0, 0.9)' }}
            >
              {partner.parentInfo || 'Family information unavailable'}
            </p>

            {/* Instagram link */}
            {renderInstagramLink(partner)}
          </div>
        </div>
      </section>
    );
  };

  return (
    <div className="w-full">
      {renderPartnerSection(groom, groomImage, 'groom')}
      {renderPartnerSection(bride, brideImage, 'bride')}
    </div>
  );
};

export default IndividualPartnerSections;