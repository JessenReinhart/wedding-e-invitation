
import React from 'react';

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ children, className = '', id }) => {
  return (
    <section id={id} className={`py-16 md:py-24 px-6 md:px-12 ${className}`}>
      <div className="container mx-auto max-w-5xl">
        {children}
      </div>
    </section>
  );
};

export default SectionWrapper;
