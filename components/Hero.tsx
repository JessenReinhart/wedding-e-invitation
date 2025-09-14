import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface HeroProps {
  brideName: string;
  groomName: string;
  date: string;
  heroImage: string;
  heroMobileImage: string;
  onImageLoad: () => void;
  onInvitationOpen: () => void;
  isInvitationOpened: boolean;
  isInvitationAnimating: boolean;
}

const Hero: React.FC<HeroProps> = ({ brideName, groomName, date, heroImage, heroMobileImage, onImageLoad, onInvitationOpen, isInvitationOpened, isInvitationAnimating }) => {
  const [blur, setBlur] = useState(0);
  const location = useLocation();
  const [visitorName, setVisitorName] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [imagesLoaded, setImagesLoaded] = useState({ desktop: false, mobile: false });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const name = params.get('name');
    if (name) {
      setVisitorName(name);
    }
  }, [location.search]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle image loading completion
  useEffect(() => {
    const currentImage = isMobile ? 'mobile' : 'desktop';
    if (imagesLoaded[currentImage]) {
      onImageLoad();
    }
  }, [imagesLoaded, isMobile, onImageLoad]);

  const handleDesktopImageLoad = () => {
    setImagesLoaded(prev => ({ ...prev, desktop: true }));
  };

  const handleMobileImageLoad = () => {
    setImagesLoaded(prev => ({ ...prev, mobile: true }));
  };

  const handleImageError = () => {
    // Still call onImageLoad to prevent infinite loading
    onImageLoad();
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxBlur = 10;
      const scrollThreshold = 300;

      const newBlur = Math.min(maxBlur, scrollY / scrollThreshold * maxBlur);
      setBlur(newBlur);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Don't render hero if invitation is fully opened
  if (isInvitationOpened && !isInvitationAnimating) {
    return null;
  }

  return (
    <section 
      id="hero" 
      className={`relative h-screen flex items-end justify-center text-center text-white overflow-hidden transition-opacity duration-500 ease-in-out ${
        isInvitationAnimating ? 'invitation-opening' : ''
      }`}
    >
      <div
        className={`bg-[url(${heroMobileImage})]
          md:bg-[url(${heroImage})] absolute inset-0`}
        style={{
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: `scale(${1 + blur / 100})`,
          filter: `blur(${blur}px)`,
          transition: 'filter 0.1s ease-out'
        }}
      >
        <img src={heroImage} alt="Hero desktop" className="hidden" onLoad={handleDesktopImageLoad} onError={handleImageError} />
        <img src={heroMobileImage} alt="Hero mobile" className="hidden" onLoad={handleMobileImageLoad} onError={handleImageError} />
      </div>
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="relative z-10 p-6 pb-20 md:pb-24 animate-fade-in-up">
        {visitorName && (
          <h2 className="font-serif text-xl md:text-3xl mb-4">
            Kepada {visitorName} & Pasangan,
          </h2>
        )}
        <h2 className="font-serif text-2xl md:text-5xl mb-4">The Wedding Of</h2>
        <h1 className="font-serif text-4xl md:text-8xl font-bold mb-2">
          {brideName} &amp; {groomName}
        </h1>
        <p className="text-2xl md:text-3xl font-light mb-8">{date}</p>
        <button
          onClick={(e) => {
            e.preventDefault();
            onInvitationOpen();
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onInvitationOpen();
            }
          }}
          disabled={isInvitationAnimating}
          className={`mt-4 inline-block bg-rose-gold hover:bg-opacity-80 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-rose-gold focus:ring-opacity-50 ${
            isInvitationAnimating ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          aria-label="Open invitation and view more details"
          tabIndex={0}
        >
          {isInvitationAnimating ? 'Membuka...' : 'Buka Undangan'}
        </button>
      </div>
      <div 
        className={`absolute bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2 ${
          isInvitationAnimating ? 'animate-pulse' : 'animate-pulse-slow'
        }`}
        aria-hidden="true"
        role="presentation"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white">
          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
