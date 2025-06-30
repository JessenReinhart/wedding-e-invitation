import React from 'react';
import { GalleryImage } from '../types';
import SectionWrapper from './SectionWrapper';
import GalleryImageItem from './GalleryImageItem';

interface GallerySectionProps {
  images: GalleryImage[];
}

const GallerySection: React.FC<GallerySectionProps> = ({ images }) => {
  return (
    <SectionWrapper id="gallery" className="bg-cream pattern-bg" title="Our Moments">
      <div className="text-center mb-16 animate-fade-in-up">
        <p className="text-lg text-slate-600">A glimpse into our journey together.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
        {images.map((image, index) => (
          <GalleryImageItem
            key={index}
            src={image.src}
            alt={image.alt}
          />
        ))}
      </div>
    </SectionWrapper>
  );
};

export default GallerySection;