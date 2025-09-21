import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import AdminPage from './components/AdminPage';
import CommentSection from './components/CommentSection';
import EventTimeline from './components/EventTimeline';
import Footer from './components/Footer';
import GallerySection from './components/GallerySection';
import Header from './components/Header';
import Hero from './components/Hero';
import LoginPage from './components/LoginPage';
import MessageFromCouple from './components/MessageFromCouple';
import PrivateRoute from './components/PrivateRoute';
import RSVPPage from './components/RSVPPage';
import RSVPSection from './components/RSVPSection';
import { WEDDING_DETAILS } from './constants';

import { Toaster } from 'react-hot-toast';
import MusicPlayer from './components/MusicPlayer';
import { MusicProvider } from './hooks/MusicContext';


import BrideGroomSection from './components/BrideGroomSection';
import IndividualPartnerSections from './components/IndividualPartnerSections';
import WeddingGiftSection from './components/WeddingGiftSection';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [heroLoaded, setHeroLoaded] = useState(false);
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isInvitationOpened, setIsInvitationOpened] = useState(false);
  const [isInvitationAnimating, setIsInvitationAnimating] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Update loading state when hero image is loaded
  useEffect(() => {
    if (heroLoaded) {
      setLoading(false);
    }
  }, [heroLoaded]);

  

  // Additional fallback: Hide loader if we're not on home page
  useEffect(() => {
    if (location.pathname !== '/' && loading) {
      setLoading(false);
    }
  }, [location.pathname, loading]);

  const handleHeroLoaded = () => {
    setHeroLoaded(true);
  };

  const handleInvitationOpen = () => {
    setIsInvitationAnimating(true);
    // After animation completes, show content and scroll
    setTimeout(() => {
      setIsInvitationOpened(true);
      setIsInvitationAnimating(false);
      // Smooth scroll to bride-groom section
      setTimeout(() => {
        const brideGroomElement = document.getElementById('bride-groom');
        if (brideGroomElement) {
          brideGroomElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }, 1000); // Match animation duration
  };

  // Reset invitation state when navigating away from home page
  useEffect(() => {
    if (location.pathname === '/') {
      setIsInvitationOpened(false);
      setIsInvitationAnimating(false);
    }
  }, [location.pathname]);

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
        <Toaster position="bottom-center" />
        <Header brideName={WEDDING_DETAILS.brideName} groomName={WEDDING_DETAILS.groomName} isMobile={isMobile} isInvitationOpened={isInvitationOpened} />
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
                    onInvitationOpen={handleInvitationOpen}
                    isInvitationOpened={isInvitationOpened}
                    isInvitationAnimating={isInvitationAnimating}
                  />
                  {isInvitationOpened && (
                    <div className="invitation-content-reveal">
                      <BrideGroomSection
                        coupleImage={WEDDING_DETAILS.coupleImage}
                        biblicalVerse={WEDDING_DETAILS.biblicalVerse}
                        verseReference={WEDDING_DETAILS.verseReference}
                      />
                      <IndividualPartnerSections
                        groom={WEDDING_DETAILS.groomDetails}
                        bride={WEDDING_DETAILS.brideDetails}
                      />
                      <EventTimeline
                        ceremony={WEDDING_DETAILS.ceremony}
                        reception={WEDDING_DETAILS.reception}
                      />
                      <RSVPSection />
                      <WeddingGiftSection giftInfo={WEDDING_DETAILS.giftInfo} />
                      <GallerySection images={WEDDING_DETAILS.galleryImages} />
                      <MessageFromCouple
                        brideName={WEDDING_DETAILS.brideName}
                        groomName={WEDDING_DETAILS.groomName}
                      />
                      <CommentSection />
                    </div>
                  )}
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
        {isInvitationOpened && <Footer />}
      </div>
    </MusicProvider>
  );
};

export default App;

