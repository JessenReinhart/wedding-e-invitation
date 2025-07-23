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
  const [groomImage, setGroomImage] = useState<ImageState>({
    loaded: false,
    error: false,
    src: groom.image
  });
  const [brideImage, setBrideImage] = useState<ImageState>({
    loaded: false,
    error: false,
    src: bride.image
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

    preloadImageWithFallback(groom.image, FALLBACK_IMAGES.groom, setGroomImage);
    preloadImageWithFallback(bride.image, FALLBACK_IMAGES.bride, setBrideImage);
  }, [groom.image, bride.image]);
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
      <div className="partner-instagram">
        <a
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="instagram-link"
          aria-label={`Visit ${partner.fullName}'s Instagram profile`}
          onClick={(e) => {
            // Additional validation before navigation
            if (instagramUrl === '#' || !instagramUrl.includes('instagram.com')) {
              e.preventDefault();
              console.warn('Invalid Instagram URL:', instagramUrl);
            }
          }}
        >
          <FontAwesomeIcon icon={faInstagram} className="instagram-icon" />
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
    const sectionClasses = [
      'partner-section',
      `${sectionType}-section`,
      !imageState.loaded ? 'loading' : '',
      imageState.error ? 'error' : ''
    ].filter(Boolean).join(' ');

    const backgroundStyle: React.CSSProperties = {};
    
    if (imageState.loaded && imageState.src) {
      backgroundStyle.backgroundImage = `url(${imageState.src})`;
    } else if (imageState.error) {
      // Use a gradient background when image fails completely
      backgroundStyle.background = sectionType === 'groom' 
        ? 'linear-gradient(135deg, #2d5a27 0%, #4a7c59 100%)'
        : 'linear-gradient(135deg, #b76e79 0%, #d4a5a5 100%)';
    }

    return (
      <section
        className={sectionClasses}
        style={backgroundStyle}
        role="region"
        aria-labelledby={`${sectionType}-heading`}
      >
        <div className="partner-overlay">
          <div className="partner-content">
            {/* Show loading indicator */}
            {!imageState.loaded && !imageState.error && (
              <div className="loading-indicator" aria-label="Loading partner photo">
                <div className="loading-spinner"></div>
                <p className="loading-text">Loading photo...</p>
              </div>
            )}
            
            {/* Show error message if image failed completely */}
            {imageState.error && (
              <div className="error-indicator" aria-label="Photo unavailable">
                <FontAwesomeIcon icon={faUser} className="error-icon" />
                <p className="error-text">Photo unavailable</p>
              </div>
            )}
            
            <h2 id={`${sectionType}-heading`} className="partner-name">
              {partner.fullName || 'Name unavailable'}
            </h2>
            <p className="partner-family-info">
              {partner.parentInfo || 'Family information unavailable'}
            </p>
            {renderInstagramLink(partner)}
          </div>
        </div>
      </section>
    );
  };

  return (
    <div className="individual-partner-sections">
      {renderPartnerSection(groom, groomImage, 'groom')}
      {renderPartnerSection(bride, brideImage, 'bride')}
    </div>
  );
};

export default IndividualPartnerSections;