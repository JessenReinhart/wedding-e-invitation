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
  const [partnerImagesLoaded, setPartnerImagesLoaded] = useState(false);
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

  // Update loading state when both hero and partner images are loaded
  useEffect(() => {
    if (heroLoaded && partnerImagesLoaded) {
      setLoading(false);
    }
  }, [heroLoaded, partnerImagesLoaded]);

  // Fallback: Hide loader after 3 seconds regardless of image loading status
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      if (loading) {
        setLoading(false);
      }
    }, 3000);

    return () => clearTimeout(fallbackTimer);
  }, [loading]);

  // Additional fallback: Hide loader if we're not on home page
  useEffect(() => {
    if (location.pathname !== '/' && loading) {
      setLoading(false);
    }
  }, [location.pathname, loading]);

  const handleHeroLoaded = () => {
    setHeroLoaded(true);
  };

  const handlePartnerImagesLoaded = () => {
    setPartnerImagesLoaded(true);
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
                    onInvitationOpen={handleInvitationOpen}
                    isInvitationOpened={isInvitationOpened}
                    isInvitationAnimating={isInvitationAnimating}
                  />
                  {isInvitationOpened && (
                    <div className="invitation-content-reveal">
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
                      <EventTimeline
                        ceremony={WEDDING_DETAILS.ceremony}
                        reception={WEDDING_DETAILS.reception}
                      />
                      <RSVPSection rsvpDate={WEDDING_DETAILS.rsvpByDate} />
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
        <Footer />
      </div>
    </MusicProvider>
  );
};

export default App;

