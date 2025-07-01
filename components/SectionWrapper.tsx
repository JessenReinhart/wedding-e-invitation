
import React, { useRef, useEffect, useState } from 'react';

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  title?: string;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ children, className = '', id, title }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  return (
    <section id={id} className={`py-16 md:py-24 px-6 md:px-12 ${className}`} ref={sectionRef}>
      <div className="container mx-auto max-w-5xl">
        {title && (
          <div className="flex items-center justify-center mb-12">
            <div className={`flex-grow border-t border-rose-gold ${inView ? 'line-expand line-expand-left' : ''}`}></div>
            <h2 className="text-2xl md:text-5xl font-serif text-rose-gold mx-4 md:mx-8 text-center">{title}</h2>
            <div className={`flex-grow border-t border-rose-gold ${inView ? 'line-expand line-expand-right' : ''}`}></div>
          </div>
        )}
        {children && (
          <div className={`${inView ? 'fade-in-slide-up' : ''}`}>
            {children}
          </div>
        )}
      </div>
    </section>
  );
};

export default SectionWrapper;
