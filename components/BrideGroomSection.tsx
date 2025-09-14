import React from 'react';
import SectionWrapper from './SectionWrapper';

interface BrideGroomSectionProps {
  coupleImage: string;
  biblicalVerse: string;
  verseReference: string;
}

const BrideGroomSection: React.FC<BrideGroomSectionProps> = ({
  coupleImage,
  biblicalVerse,
  verseReference,
}) => {
  return (
    <SectionWrapper id="bride-groom" className="bg-cream pattern-bg">
      <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto">
        {/* Couple Photo */}
        <div className="animate-fade-in-up mb-8">
          <img
            src={coupleImage}
            alt="Pasangan tersenyum"
            className="w-full max-w-md md:max-w-lg lg:max-w-xl h-auto rounded-lg object-cover shadow-lg border-4 border-rose-gold"
          />
        </div>

        {/* Biblical Verse */}
        <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <blockquote className="text-lg md:text-xl lg:text-2xl font-serif text-deep-green leading-relaxed mb-4 italic px-4">
            "{biblicalVerse}"
          </blockquote>
          <cite className="text-base md:text-lg font-serif text-rose-gold font-semibold">
            {verseReference}
          </cite>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default BrideGroomSection;
