
import React from 'react';
import { EventInfo } from '../types';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

interface EventDetailsCardProps {
  event: EventInfo;
  icon: React.ReactNode;
}

const containerStyle = {
  width: '100%',
  height: '250px'
};

const EventDetailsCard: React.FC<EventDetailsCardProps> = ({ event, icon }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyC7DMW481fRN8f_QQ_ahKRF1VjCI4haIK0' // REPLACE WITH YOUR ACTUAL API KEY
  });

  const center = {
    lat: event.latitude,
    lng: event.longitude
  };

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

      <div className="mt-6 rounded-lg overflow-hidden">
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={15}
          >
            <Marker position={center} />
          </GoogleMap>
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-200 text-gray-600">
            Memuat Peta...
          </div>
        )}
      </div>
      <a
        href={`https://www.google.com/maps/dir/?api=1&destination=${event.latitude},${event.longitude}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-block bg-deep-green hover:bg-opacity-90 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
      >
        Petunjuk Arah
      </a>
    </div>
  );
};

export default EventDetailsCard;
