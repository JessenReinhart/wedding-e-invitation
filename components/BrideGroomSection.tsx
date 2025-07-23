import React from 'react';
import SectionWrapper from './SectionWrapper';

interface BrideGroomSectionProps {
  brideName: string;
  brideDob: string;
  brideImage: string;
  groomName: string;
  groomDob: string;
  groomImage: string;
}

const BrideGroomSection: React.FC<BrideGroomSectionProps> = ({
  brideName,
  brideDob,
  brideImage,
  groomName,
  groomDob,
  groomImage,
}) => {
  return (
    <SectionWrapper id="bride-groom" className="bg-cream pattern-bg" title="Mengenal Pasangan">
      <div className="flex flex-col md:flex-row items-center justify-center gap-12 text-center">
        {/* Bride's Section */}
        <div className="flex flex-col items-center animate-fade-in-up">
          <img
            src={brideImage}
            alt={brideName}
            className="w-48 h-48 rounded-full object-cover shadow-lg mb-4 border-4 border-rose-gold"
          />
          <h3 className="text-3xl font-serif text-deep-green mb-2">{brideName}</h3>
          <p className="text-lg text-charcoal-gray">Lahir: {brideDob}</p>
        </div>

        {/* Separator */}
        <div className="text-5xl font-serif text-rose-gold hidden md:block">&#x26;</div>

        {/* Groom's Section */}
        <div className="flex flex-col items-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <img
            src={groomImage}
            alt={groomName}
            className="w-48 h-48 rounded-full object-cover shadow-lg mb-4 border-4 border-rose-gold"
          />
          <h3 className="text-3xl font-serif text-deep-green mb-2">{groomName}</h3>
          <p className="text-lg text-charcoal-gray">Lahir: {groomDob}</p>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default BrideGroomSection;
