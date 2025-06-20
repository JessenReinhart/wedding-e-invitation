import React from 'react';

interface ImageSkeletonProps {
  className?: string;
}

const ImageSkeleton: React.FC<ImageSkeletonProps> = ({ className = '' }) => {
  return (
    <div 
      className={`animate-shimmer bg-slate-300 rounded-lg ${className}`}
      aria-busy="true"
      aria-live="polite"
      role="status"
    >
      {/* The aspect ratio will be controlled by the parent div in GalleryImageItem */}
    </div>
  );
};

export default ImageSkeleton;