import React from 'react';

const CommentSkeleton: React.FC = () => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 shadow-sm animate-pulse bg-white">
      <div className="flex items-center mb-3">
        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
        <div className="ml-auto h-3 bg-gray-200 rounded w-1/6"></div>
      </div>
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    </div>
  );
};

export default CommentSkeleton;