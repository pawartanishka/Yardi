import React from 'react';

export default function Avatar({
  src,
  alt = 'User',
  name = '',
  size = 'md', // 'sm', 'md', 'lg', 'xl'
  status, // 'online', 'offline'
  className = '',
}) {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-base font-semibold',
    xl: 'w-20 h-20 text-xl font-bold',
  };

  const getInitials = (str) => {
    if (!str) return 'Y';
    const parts = str.trim().split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return str.slice(0, 2).toUpperCase();
  };

  return (
    <div className={`relative inline-block ${className}`}>
      {src ? (
        <img
          src={src}
          alt={alt}
          className={`${sizeClasses[size] || sizeClasses.md} rounded-full object-cover ring-2 ring-white shadow-xs`}
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      ) : (
        <div
          className={`${sizeClasses[size] || sizeClasses.md} rounded-full bg-gradient-to-tr from-blue-700 to-indigo-600 text-white flex items-center justify-center font-bold tracking-tight ring-2 ring-white shadow-xs`}
        >
          {getInitials(name)}
        </div>
      )}

      {status && (
        <span
          className={`absolute bottom-0 right-0 block w-2.5 h-2.5 rounded-full ring-2 ring-white ${
            status === 'online' ? 'bg-emerald-500' : 'bg-slate-400'
          }`}
        />
      )}
    </div>
  );
}
