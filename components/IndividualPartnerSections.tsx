import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { PartnerDetails } from '../types';
import { useDeviceDetection } from '../utils/deviceDetection';

interface IndividualPartnerSectionsProps {
  groom: PartnerDetails;
  bride: PartnerDetails;
}

interface ImageState {
  loaded: boolean;
  error: boolean;
}

const IndividualPartnerSections: React.FC<IndividualPartnerSectionsProps> = ({
  groom,
  bride
}) => {
  const { isIOS } = useDeviceDetection();
  const [groomImage, setGroomImage] = useState<ImageState>({
    loaded: false,
    error: false
  });
  const [brideImage, setBrideImage] = useState<ImageState>({
    loaded: false,
    error: false
  });

  // Preload images with error handling
  useEffect(() => {
    const preloadImage = (
      src: string,
      setImageState: React.Dispatch<React.SetStateAction<ImageState>>
    ) => {
      if (!src) {
        setImageState({ loaded: false, error: true });
        return;
      }

      const img = new Image();
      img.onload = () => setImageState({ loaded: true, error: false });
      img.onerror = () => setImageState({ loaded: false, error: true });
      img.src = src;
    };

    preloadImage(groom.image, setGroomImage);
    preloadImage(bride.image, setBrideImage);
  }, [groom.image, bride.image]);
  // Helper function to render Instagram link
  const renderInstagramLink = (partner: PartnerDetails) => {
    if (!partner.instagramHandle?.trim()) return null;

    const cleanHandle = partner.instagramHandle.replace('@', '').trim();
    const instagramUrl = `https://instagram.com/${cleanHandle}`;

    return (
      <div className="mt-6">
        <a
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm border border-white/40 rounded-full bg-white/10 backdrop-blur-sm text-white transition-all duration-300 hover:bg-white/25 hover:border-white/60 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-500 active:scale-95 sm:text-base sm:px-6 sm:py-3 lg:text-lg lg:px-8 lg:py-4"
          aria-label={`Visit ${partner.fullName}'s Instagram profile`}
        >
          <FontAwesomeIcon
            icon={faInstagram}
            className="text-base transition-all duration-300 hover:text-pink-400 sm:text-lg lg:text-xl"
          />
          <span>@{cleanHandle}</span>
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
    // Get fallback gradient classes for error state
    const errorGradient = sectionType === 'groom'
      ? 'bg-gradient-to-br from-green-800 to-green-600'
      : 'bg-gradient-to-br from-rose-600 to-rose-400';

    return (
      <section
        className={`
          bg-[url(${partner.image})]
          md:bg-[url(${partner.imageDesktop})]
          relative w-full h-screen md:h-[80vh] lg:h-[85vh] xl:h-[90vh]
          flex items-center justify-center bg-cover bg-center bg-no-repeat
          ${isIOS ? 'bg-fixed' : ''}
          ${imageState.error ? errorGradient : ''}
        `}
        style={{
          // Use scroll attachment for iOS to prevent zoom issues
          backgroundAttachment: isIOS ? 'scroll' : 'fixed',
          // iOS-specific optimizations
          ...(isIOS && {
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            willChange: "transform",
            // Prevent iOS Safari zoom issues
            WebkitBackgroundSize: 'cover',
          })
        }}
        role="region"
        aria-labelledby={`${sectionType}-heading`}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/20 to-black/40 flex items-center justify-center p-4 md:p-8">
          {/* Content container */}
          <div className="text-center text-white max-w-screen mx-auto mt-56 space-y-2 md:space-y-6 relative">
            {/* Loading state */}
            {!imageState.loaded && !imageState.error && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 backdrop-blur-sm rounded-lg p-6">
                <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin mb-4"></div>
                <p className="text-white/80 font-light animate-pulse">Loading photo...</p>
              </div>
            )}

            {/* Error state */}
            {imageState.error && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 backdrop-blur-sm rounded-lg p-6">
                <FontAwesomeIcon
                  icon={faUser}
                  className="text-6xl mb-4 text-white/70 drop-shadow-lg animate-pulse"
                />
                <p className="text-white/80 font-light">Photo unavailable</p>
              </div>
            )}

            {/* Partner name */}
            <h2
              id={`${sectionType}-heading`}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif"
              style={{ textShadow: '3px 3px 6px rgba(0, 0, 0, 0.9)' }}
            >
              {partner.fullName || 'Name unavailable'}
            </h2>

            {/* Partner family info */}
            <p
              className="text-sm md:text-xl max-w-screen mx-auto md:leading-relaxed"
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