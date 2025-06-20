
import React from 'react';
import SectionWrapper from './SectionWrapper';
import QRCodeDisplay from './QRCodeDisplay';

interface RSVPSectionProps {
  rsvpLink: string;
  rsvpDate: string;
}

const RSVPSection: React.FC<RSVPSectionProps> = ({ rsvpLink, rsvpDate }) => {
  return (
    <SectionWrapper id="rsvp" className="bg-soft-blush">
      <div className="text-center animate-fade-in-up">
        <h2 className="text-4xl md:text-5xl font-serif text-rose-gold mb-6">Kindly RSVP</h2>
        <p className="text-lg md:text-xl text-charcoal-gray mb-4">
          Please let us know if you can celebrate with us by <strong className="text-deep-green">{rsvpDate}</strong>.
        </p>
        <p className="text-md text-slate-600 mb-10">
          You can scan the QR code below or click the button to access our RSVP form.
        </p>
        
        <div className="flex flex-col items-center space-y-8">
          <QRCodeDisplay value={rsvpLink} />
          <a
            href={rsvpLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-deep-green hover:bg-opacity-90 text-white font-semibold py-4 px-10 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 text-lg"
          >
            RSVP Online
          </a>
        </div>
        <p className="mt-8 text-sm text-slate-500">
          We can't wait to share our special day with you!
        </p>
      </div>
    </SectionWrapper>
  );
};

export default RSVPSection;
