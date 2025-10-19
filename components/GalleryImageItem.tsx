import React, { useState } from 'react';
import ImageSkeleton from './ImageSkeleton';

interface GalleryImageItemProps {
  src: string;
  alt: string;
}

const GalleryImageItem: React.FC<GalleryImageItemProps> = ({ src, alt }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    console.error(`Failed to load image: ${src}`);
    setError(true);
    setIsLoaded(true); // Treat error as loaded to remove skeleton and show fallback
  };

  return (
    <div className="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group">
      {!isLoaded && <ImageSkeleton className="w-full h-full" />}
      {error && (
        <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-500">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
          </svg>
          <span className="sr-only">Error loading image: {alt}</span>
        </div>
      )}
      {!error && (
        <img
          src={src}
          alt={alt}
          className={`object-cover w-full h-full transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}
    </div>
  );
};

export default GalleryImageItem;