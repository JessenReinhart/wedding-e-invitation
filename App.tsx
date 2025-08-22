import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { WEDDING_DETAILS } from './constants';
import Header from './components/Header';
import Hero from './components/Hero';
import OurStory from './components/OurStory';
import EventTimeline from './components/EventTimeline';
import RSVPSection from './components/RSVPSection';
import GallerySection from './components/GallerySection';
import Footer from './components/Footer';
import MessageFromCouple from './components/MessageFromCouple';
import AdminPage from './components/AdminPage';
import RSVPPage from './components/RSVPPage';
import CommentSection from './components/CommentSection';
import LoginPage from './components/LoginPage';
import PrivateRoute from './components/PrivateRoute';

import { Toaster } from 'react-hot-toast';
import MusicPlayer from './components/MusicPlayer';
import { MusicProvider } from './hooks/MusicContext';
import { useScrollLock } from './hooks/useScrollLock';

import BrideGroomSection from './components/BrideGroomSection';
import IndividualPartnerSections from './components/IndividualPartnerSections';
import WeddingGiftSection from './components/WeddingGiftSection';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [partnerImagesLoaded, setPartnerImagesLoaded] = useState(false);
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isScrollLocked, setIsScrollLocked] = useState(() => {
    // Check if scroll was already unlocked in this session
    const wasUnlocked = sessionStorage.getItem('scrollUnlocked');
    return !wasUnlocked;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Update loading state when both hero and partner images are loaded
  useEffect(() => {
    if (heroLoaded && partnerImagesLoaded) {
      setLoading(false);
    }
  }, [heroLoaded, partnerImagesLoaded]);

  const handleHeroLoaded = () => {
    setHeroLoaded(true);
  };

  const handlePartnerImagesLoaded = () => {
    setPartnerImagesLoaded(true);
  };

  const handleScrollUnlock = () => {
    setIsScrollLocked(false);
    // Mark as unlocked in session storage
    sessionStorage.setItem('scrollUnlocked', 'true');
    // Smooth scroll to bride-groom section after a brief delay
    setTimeout(() => {
      const brideGroomElement = document.getElementById('bride-groom');
      if (brideGroomElement) {
        brideGroomElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // Reset scroll lock when navigating away from home page
  useEffect(() => {
    if (location.pathname !== '/') {
      setIsScrollLocked(false);
    } else {
      // Check session storage when returning to home page
      const wasUnlocked = sessionStorage.getItem('scrollUnlocked');
      setIsScrollLocked(!wasUnlocked);
    }
  }, [location.pathname]);

  // Initialize scroll lock hook
  useScrollLock({
    isLocked: isScrollLocked && location.pathname === '/',
    onUnlock: handleScrollUnlock
  });

  const showLoader = loading && location.pathname === '/';

  return (
    <MusicProvider>
      <div className="min-h-screen bg-cream text-charcoal-gray antialiased">
        {showLoader && (
          <div className="fixed inset-0 flex items-center justify-center bg-cream z-50">
            <div className="loader ease-linear rounded-full h-32 w-32"></div>
          </div>
        )}
        {!isMobile && <MusicPlayer className="music-player-desktop" />}
        <Toaster />
        <Header brideName={WEDDING_DETAILS.brideName} groomName={WEDDING_DETAILS.groomName} isMobile={isMobile} />
        <main className={showLoader ? 'hidden' : ''}>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Hero
                    brideName={WEDDING_DETAILS.brideName}
                    groomName={WEDDING_DETAILS.groomName}
                    date={WEDDING_DETAILS.date}
                    heroImage={WEDDING_DETAILS.heroImage}
                    heroMobileImage={WEDDING_DETAILS.heroMobileImage}
                    onImageLoad={handleHeroLoaded}
                    isScrollLocked={isScrollLocked}
                    onScrollUnlock={handleScrollUnlock}
                  />
                  <BrideGroomSection
                    brideName={WEDDING_DETAILS.brideName}
                    brideImage={WEDDING_DETAILS.brideImage}
                    groomName={WEDDING_DETAILS.groomName}
                    groomImage={WEDDING_DETAILS.groomImage}
                  />
                  <IndividualPartnerSections
                    groom={WEDDING_DETAILS.groomDetails}
                    bride={WEDDING_DETAILS.brideDetails}
                    onImagesLoad={handlePartnerImagesLoaded}
                  />
                  <OurStory story={WEDDING_DETAILS.story} title={WEDDING_DETAILS.storyTitle} />
                  <EventTimeline
                    ceremony={WEDDING_DETAILS.ceremony}
                    reception={WEDDING_DETAILS.reception}
                  />
                  <RSVPSection rsvpDate={WEDDING_DETAILS.rsvpByDate} />
                  <WeddingGiftSection giftInfo={WEDDING_DETAILS.giftInfo} />
                  <GallerySection images={WEDDING_DETAILS.galleryImages} />
                  <MessageFromCouple brideName={WEDDING_DETAILS.brideName} groomName={WEDDING_DETAILS.groomName} />
                  <CommentSection />
                </>
              }
            />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/admin"
              element={
                <PrivateRoute>
                  <AdminPage />
                </PrivateRoute>
              }
            />
            <Route path="/rsvp" element={<RSVPPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </MusicProvider>
  );
};

export default App;

