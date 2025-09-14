
import React from 'react';
import { EventInfo } from '../types';
import SectionWrapper from './SectionWrapper';
import EventDetailsCard from './EventDetailsCard';
import Countdown from './Countdown';
import { WEDDING_DETAILS } from '../constants';

interface EventTimelineProps {
  ceremony: EventInfo;
  reception: EventInfo;
}

const CeremonyIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
  </svg>
);

const ReceptionIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25Z" />
  </svg>
);


const EventTimeline: React.FC<EventTimelineProps> = ({ ceremony, reception }) => {
  return (
    <SectionWrapper id="event" className="bg-cream pattern-bg" title="Detail Acara">
      <div className="text-center mb-16 animate-fade-in-up">
        <p className="text-lg text-slate-600">Bergabunglah dengan kami untuk momen-momen istimewa ini.</p>
      </div>
      
      {/* Countdown Component */}
      <div className="mb-12 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <Countdown 
          targetDate={WEDDING_DETAILS.date}
          className="max-w-4xl mx-auto"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-10 md:gap-12 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
        <EventDetailsCard event={ceremony} icon={<CeremonyIcon />} />
        <EventDetailsCard event={reception} icon={<ReceptionIcon />} />
      </div>
    </SectionWrapper>
  );
};

export default EventTimeline;
