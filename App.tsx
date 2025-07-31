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


import BrideGroomSection from './components/BrideGroomSection';
import IndividualPartnerSections from './components/IndividualPartnerSections';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleHeroLoaded = () => {
    setLoading(false);
  };

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
                  />
                  <BrideGroomSection
                    brideName={WEDDING_DETAILS.brideName}
                    brideDob={WEDDING_DETAILS.brideDob}
                    brideImage={WEDDING_DETAILS.brideImage}
                    groomName={WEDDING_DETAILS.groomName}
                    groomDob={WEDDING_DETAILS.groomDob}
                    groomImage={WEDDING_DETAILS.groomImage}
                  />
                  <IndividualPartnerSections
                    groom={WEDDING_DETAILS.groomDetails}
                    bride={WEDDING_DETAILS.brideDetails}
                  />
                  <OurStory story={WEDDING_DETAILS.story} title={WEDDING_DETAILS.storyTitle} />
                  <EventTimeline
                    ceremony={WEDDING_DETAILS.ceremony}
                    reception={WEDDING_DETAILS.reception}
                  />
                  <RSVPSection rsvpDate={WEDDING_DETAILS.rsvpByDate} />
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

