import React from 'react';

export default function Card({
  children,
  className = '',
  hoverEffect = false,
  glass = false,
  onClick,
  ...props
}) {
  return (
    <div
      onClick={onClick}
      className={`rounded-2xl border transition-all duration-200 ${
        glass
          ? 'glass-panel'
          : 'bg-white border-slate-200/80 shadow-soft'
      } ${
        hoverEffect ? 'hover:shadow-card hover:-translate-y-0.5 cursor-pointer hover:border-blue-200' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
