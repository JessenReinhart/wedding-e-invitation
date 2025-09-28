import React from "react";
import { Map, Marker } from "pigeon-maps";
import { EventInfo } from "../types";

interface EventDetailsCardProps {
  event: EventInfo;
  icon: React.ReactNode;
}

const containerStyle = {
  width: "100%",
  height: "250px",
};

const voyagerTheme = (x: number, y: number, z: number) => {
  const s = String.fromCharCode(97 + ((x + y + z) % 3));
  return `https://${s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/${z}/${x}/${y}@2x.png`;
};

const EventDetailsCard: React.FC<EventDetailsCardProps> = ({ event, icon }) => {
  const center: [number, number] = [event.latitude, event.longitude];

  return (
    <div className="bg-white p-8 rounded-xl shadow-xl w-full text-center hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1">
      <div className="flex justify-center text-rose-gold mb-6">{icon}</div>
      <h3 className="text-3xl font-serif text-deep-green mb-4">
        {event.title}
      </h3>
      <p className="text-xl text-charcoal-gray font-semibold mb-2">
        {event.time}
      </p>
      <p className="text-lg text-charcoal-gray mb-1">{event.venue}</p>
      <p className="text-md text-slate-600 mb-4">{event.address}</p>
      {event.details && (
        <p className="text-md text-slate-500 leading-relaxed">
          {event.details}
        </p>
      )}

      <div className="mt-6 rounded-lg overflow-hidden" style={containerStyle}>
        <Map
          defaultCenter={center}
          defaultZoom={15}
          height={Number(containerStyle.height)}
          provider={voyagerTheme}
        >
          <Marker anchor={center} color="rgb(183 110 121)" width={50} />
        </Map>
      </div>

      <a
        href={`https://maps.google.com/maps?q=${event.latitude},${event.longitude}`}
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
