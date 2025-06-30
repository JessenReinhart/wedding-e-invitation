import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import SectionWrapper from './SectionWrapper';

interface RSVPSectionProps {
  rsvpDate: string;
}

const RSVPSection: React.FC<RSVPSectionProps> = ({ rsvpDate }) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const visitorName = params.get('name');

  return (
    <SectionWrapper id="rsvp" className="bg-soft-blush pattern2-bg" title="Kindly RSVP">
      <div className="text-center animate-fade-in-up">
        <p className="text-lg md:text-xl text-charcoal-gray mb-4">
          Please let us know if you can celebrate with us by <strong className="text-deep-green">{rsvpDate}</strong>.
        </p>
        <p className="text-md text-slate-600 mb-10">
          Click the button to access our RSVP form.
        </p>

        <div className="flex flex-col items-center space-y-8">
          <Link
            to={visitorName ? `/rsvp?name=${visitorName}` : "/rsvp"}
            className="inline-block bg-deep-green hover:bg-opacity-90 text-white font-semibold py-4 px-10 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 text-lg"
          >
            RSVP Online
          </Link>
        </div>
        <p className="mt-8 text-sm text-slate-500">
          We can't wait to share our special day with you!
        </p>
      </div>
    </SectionWrapper>
  );
};

export default RSVPSection;