import React from "react";
import { Link, useLocation } from "react-router-dom";
import SectionWrapper from "./SectionWrapper";

interface RSVPSectionProps {}

const RSVPSection: React.FC<RSVPSectionProps> = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const visitorName = params.get("name");

  return (
    <SectionWrapper
      id="rsvp"
      className="bg-soft-blush pattern2-bg"
      title="Mohon Konfirmasi Kehadiran"
    >
      <div className="text-center animate-fade-in-up">
        <p className="text-lg md:text-xl text-charcoal-gray mb-10">
          Dimohon untuk mengisi konfirmasi kehadiran di bawah ini.
        </p>

        <div className="flex flex-col items-center space-y-8">
          <Link
            to={visitorName ? `/rsvp?name=${visitorName}` : "/rsvp"}
            className="inline-block bg-deep-green hover:bg-opacity-90 text-white font-semibold py-4 px-10 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 text-lg"
          >
            RSVP Online
          </Link>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default RSVPSection;
