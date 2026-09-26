import React from 'react';

export default function LoadingSkeleton({ count = 3, type = 'card' }) {
  if (type === 'card') {
    return (
      <div className="space-y-4 w-full">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-soft animate-pulse">
            <div className="flex items-center justify-between mb-4">
              <div className="h-4 bg-slate-200 rounded w-1/4"></div>
              <div className="h-4 bg-slate-200 rounded w-12"></div>
            </div>
            <div className="h-6 bg-slate-200 rounded w-3/4 mb-3"></div>
            <div className="h-3 bg-slate-100 rounded w-full mb-2"></div>
            <div className="h-3 bg-slate-100 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="animate-pulse space-y-3">
      <div className="h-4 bg-slate-200 rounded w-full"></div>
      <div className="h-4 bg-slate-200 rounded w-5/6"></div>
      <div className="h-4 bg-slate-200 rounded w-4/6"></div>
    </div>
  );
}
