
import React from 'react';
import { EventInfo } from '../types';

interface EventDetailsCardProps {
  event: EventInfo;
  icon: React.ReactNode;
}

const EventDetailsCard: React.FC<EventDetailsCardProps> = ({ event, icon }) => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-xl w-full text-center hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1">
      <div className="flex justify-center text-rose-gold mb-6">
        {icon}
      </div>
      <h3 className="text-3xl font-serif text-deep-green mb-4">{event.title}</h3>
      <p className="text-xl text-charcoal-gray font-semibold mb-2">{event.time}</p>
      <p className="text-lg text-charcoal-gray mb-1">{event.venue}</p>
      <p className="text-md text-slate-600 mb-4">{event.address}</p>
      {event.details && <p className="text-md text-slate-500 leading-relaxed">{event.details}</p>}
    </div>
  );
};

export default EventDetailsCard;
