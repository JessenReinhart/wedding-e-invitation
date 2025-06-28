import React, { useState } from 'react';
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

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const handleHeroLoaded = () => {
    setLoading(false);
  };

  const showLoader = loading && location.pathname === '/';

  return (
    <div className="min-h-screen bg-cream text-charcoal-gray antialiased">
      {showLoader && (
        <div className="fixed inset-0 flex items-center justify-center bg-cream z-50">
          <div className="loader ease-linear rounded-full h-32 w-32"></div>
        </div>
      )}
      <Header brideName={WEDDING_DETAILS.brideName} groomName={WEDDING_DETAILS.groomName} />
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
                  onImageLoad={handleHeroLoaded}
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
  );
};

export default App;
