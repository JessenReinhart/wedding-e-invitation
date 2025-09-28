import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import AdminPage from "./components/AdminPage";
import CommentSection from "./components/CommentSection";
import EventTimeline from "./components/EventTimeline";
import Footer from "./components/Footer";
import GallerySection from "./components/GallerySection";
import Header from "./components/Header";
import Hero from "./components/Hero";
import LoginPage from "./components/LoginPage";
import MessageFromCouple from "./components/MessageFromCouple";
import PrivateRoute from "./components/PrivateRoute";
import RSVPPage from "./components/RSVPPage";
import RSVPSection from "./components/RSVPSection";
import { WEDDING_DETAILS } from "./constants";

import { Toaster } from "react-hot-toast";
import MusicPlayer from "./components/MusicPlayer";
import { MusicProvider } from "./hooks/MusicContext";

import BrideGroomSection from "./components/BrideGroomSection";
import IndividualPartnerSections from "./components/IndividualPartnerSections";
import WeddingGiftSection from "./components/WeddingGiftSection";
import { useInvitation } from "./hooks/useInvitation";
import { useLoading } from "./hooks/useLoading";
import { useWindowSize } from "./hooks/useWindowSize";

const App: React.FC = () => {
  const location = useLocation();
  const { isMobile } = useWindowSize();
  const { handleHeroLoaded, showLoader } = useLoading({
    pathname: location.pathname,
  });
  const {
    isOpened: isInvitationOpened,
    isAnimating: isInvitationAnimating,
    handleOpen: handleInvitationOpen,
  } = useInvitation(location.pathname);

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
        <Header
          brideName={WEDDING_DETAILS.brideName}
          groomName={WEDDING_DETAILS.groomName}
          isMobile={isMobile}
          isInvitationOpened={isInvitationOpened}
        />
        <main className={showLoader ? "hidden" : ""}>
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
                    isMobile={isMobile}
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
