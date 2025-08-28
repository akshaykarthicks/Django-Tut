import React from 'react';

export const LoadingSkeleton: React.FC = () => {
  return (
    <div className="mt-8 bg-gray-900 border border-gray-700 rounded-lg p-6 w-full animate-pulse">
      <div className="h-6 bg-gray-700 rounded w-1/3 mb-4"></div>
      <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-700 rounded w-5/6 mb-6"></div>
      
      <div className="h-6 bg-gray-700 rounded w-1/4 mb-4"></div>
      <div className="bg-gray-800 rounded-lg p-4">
        <div className="h-3 bg-gray-700 rounded w-full mb-2"></div>
        <div className="h-3 bg-gray-700 rounded w-2/3 mb-2"></div>
        <div className="h-3 bg-gray-700 rounded w-full mb-2"></div>
        <div className="h-3 bg-gray-700 rounded w-1/2"></div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-700">
        <div className="h-5 bg-gray-700 rounded w-1/5 mb-3"></div>
        <div className="h-4 bg-gray-700 rounded w-4/5"></div>
      </div>
    </div>
  );
};