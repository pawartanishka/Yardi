import React from 'react';

export default function ProgressBar({
  value = 0,
  max = 100,
  size = 'md', // 'sm', 'md', 'lg'
  color = 'blue', // 'blue', 'gradient', 'emerald', 'amber', 'purple'
  showLabel = false,
  className = '',
}) {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  const colorClasses = {
    blue: 'bg-blue-600',
    gradient: 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600',
    emerald: 'bg-emerald-500',
    amber: 'bg-amber-500',
    purple: 'bg-purple-600',
  };

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center text-xs font-semibold text-slate-600 mb-1.5">
          <span>Progress</span>
          <span>{percentage}%</span>
        </div>
      )}
      <div className={`w-full bg-slate-100 rounded-full overflow-hidden ${sizeClasses[size] || sizeClasses.md}`}>
        <div
          className={`${sizeClasses[size] || sizeClasses.md} rounded-full transition-all duration-500 ease-out ${
            colorClasses[color] || colorClasses.blue
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
