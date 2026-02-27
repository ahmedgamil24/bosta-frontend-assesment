import React from 'react'

  // Skeleton
  const SkeletonCard = () => (
    <div className="card bg-base-200 animate-pulse h-80 rounded-lg p-4 flex flex-col justify-between">
      <div className="h-32 bg-base-300 rounded mb-4"></div>
      <div className="h-6 bg-base-300 rounded w-3/4 mb-2"></div>
      <div className="h-6 bg-base-300 rounded w-1/2 mb-2"></div>
      <div className="h-8 bg-base-300 rounded w-full"></div>
  </div>
  );

export default SkeletonCard