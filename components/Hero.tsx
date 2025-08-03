import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface HeroProps {
  brideName: string;
  groomName: string;
  date: string;
  heroImage: string;
  heroMobileImage: string;
  onImageLoad: () => void;
  isScrollLocked: boolean;
  onScrollUnlock: () => void;
}

const Hero: React.FC<HeroProps> = ({ brideName, groomName, date, heroImage, heroMobileImage, onImageLoad, isScrollLocked, onScrollUnlock }) => {
  const [blur, setBlur] = useState(0);
  const location = useLocation();
  const [visitorName, setVisitorName] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const name = params.get('name');
    if (name) {
      setVisitorName(name);
    }
  }, [location.search]);

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

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center text-center text-white overflow-hidden">
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
        <img src={heroImage} alt="Hero" className="hidden" onLoad={onImageLoad} />
      </div>
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="relative z-10 p-6 animate-fade-in-up">
        {visitorName && (
          <h2 className="font-serif text-xl md:text-3xl mb-4">
            Kepada {visitorName} & Pasangan,
          </h2>
        )}
        <h2 className="font-serif text-3xl md::text-5xl mb-4">Anda Diundang Untuk Merayakan Pernikahan</h2>
        <h1 className="font-serif text-6xl md:text-8xl font-bold mb-2">
          {brideName} &amp; {groomName}
        </h1>
        <p className="text-2xl md:text-3xl font-light mb-8">{date}</p>
        <button
          onClick={(e) => {
            e.preventDefault();
            onScrollUnlock();
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onScrollUnlock();
            }
          }}
          className={`mt-4 inline-block bg-rose-gold hover:bg-opacity-80 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-rose-gold focus:ring-opacity-50 ${
            isScrollLocked ? 'cta-button-locked' : ''
          }`}
          aria-label="Unlock scrolling and view more details"
          tabIndex={0}
        >
          Selengkapnya
        </button>
      </div>
      <div 
        className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-pulse-slow ${
          isScrollLocked ? 'scroll-indicator-locked' : ''
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
