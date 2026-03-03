import React from 'react';
import GlowSkeleton from '../Global/GlowSkeleton';

// Skeleton for the Product Feed Cards
export const FeedSkeleton = () => (
  <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
    {[...Array(8)].map((_, i) => (
      <div key={i} className="bg-white dark:bg-white/5 rounded-[24px] border border-slate-200 dark:border-white/10 p-5 space-y-4 shadow-sm">
        {/* Image Frame Skeleton */}
        <GlowSkeleton className="h-44 w-full rounded-2xl" />
        <div className="space-y-3">
          {/* Title and Price Skeletons */}
          <GlowSkeleton className="h-3 w-3/4" />
          <GlowSkeleton className="h-6 w-1/2" />
          <div className="flex gap-2">
             <GlowSkeleton className="h-2 w-1/4" />
             <GlowSkeleton className="h-2 w-1/4" />
          </div>
        </div>
        {/* Button Skeleton */}
        <GlowSkeleton className="h-10 w-full rounded-xl mt-2" />
      </div>
    ))}
  </div>
);

// Skeleton for the Product Details View
export const DetailsSkeleton = () => (
  <div className="max-w-[1440px] mx-auto p-4 lg:p-10 flex flex-col lg:flex-row gap-12">
    {/* Left: 3D Stage Skeleton */}
    <div className="flex-1">
      <GlowSkeleton className="h-[500px] w-full rounded-[40px]" />
    </div>

    {/* Right: Info Section Skeleton */}
    <div className="flex-1 space-y-8">
      <div className="space-y-4">
        <GlowSkeleton className="h-4 w-32" />
        <GlowSkeleton className="h-12 w-full" />
        <GlowSkeleton className="h-4 w-48" />
      </div>
      <div className="h-32 w-full border border-slate-200 dark:border-white/10 rounded-3xl p-1 flex gap-2">
        <GlowSkeleton className="flex-1 h-full rounded-2xl" />
        <GlowSkeleton className="flex-1 h-full rounded-2xl" />
        <GlowSkeleton className="flex-1 h-full rounded-2xl" />
      </div>
      <div className="flex gap-4">
        <GlowSkeleton className="h-14 flex-[3] rounded-2xl" />
        <GlowSkeleton className="h-14 flex-1 rounded-2xl" />
      </div>
      <div className="space-y-4 pt-6 border-t border-slate-200 dark:border-white/10">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="flex justify-between">
            <GlowSkeleton className="h-3 w-24" />
            <GlowSkeleton className="h-3 w-32" />
          </div>
        ))}
      </div>
    </div>
  </div>
);