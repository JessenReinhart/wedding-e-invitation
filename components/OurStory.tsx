
import React from 'react';
import SectionWrapper from './SectionWrapper';

interface OurStoryProps {
  title: string;
  story: string;
}

const OurStory: React.FC<OurStoryProps> = ({ title, story }) => {
  return (
    <SectionWrapper id="story" className="bg-soft-blush pattern2-bg" title={title}>
      <div className="text-center animate-fade-in-up">
        <p className="text-lg md:text-xl text-charcoal-gray leading-relaxed max-w-3xl mx-auto">
          {story}
        </p>
      </div>
    </SectionWrapper>
  );
};

export default OurStory;
