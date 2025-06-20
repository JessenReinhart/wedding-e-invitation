
import React from 'react';
import { WEDDING_DETAILS } from './constants';
import Header from './components/Header';
import Hero from './components/Hero';
import OurStory from './components/OurStory';
import EventTimeline from './components/EventTimeline';
import RSVPSection from './components/RSVPSection';
import GallerySection from './components/GallerySection';
import Footer from './components/Footer';
import MessageFromCouple from './components/MessageFromCouple';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-cream text-charcoal-gray antialiased">
      <Header brideName={WEDDING_DETAILS.brideName} groomName={WEDDING_DETAILS.groomName} />
      <main>
        <Hero 
          brideName={WEDDING_DETAILS.brideName} 
          groomName={WEDDING_DETAILS.groomName} 
          date={WEDDING_DETAILS.date}
          heroImage={WEDDING_DETAILS.heroImage}
        />
        <OurStory story={WEDDING_DETAILS.story} title={WEDDING_DETAILS.storyTitle} />
        <EventTimeline 
          ceremony={WEDDING_DETAILS.ceremony} 
          reception={WEDDING_DETAILS.reception} 
        />
        <RSVPSection rsvpLink={WEDDING_DETAILS.rsvpLink} rsvpDate={WEDDING_DETAILS.rsvpByDate} />
        <GallerySection images={WEDDING_DETAILS.galleryImages} />
        <MessageFromCouple brideName={WEDDING_DETAILS.brideName} groomName={WEDDING_DETAILS.groomName} />
      </main>
      <Footer />
    </div>
  );
};

export default App;
