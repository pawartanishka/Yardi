import React from 'react';

export default function Button({
  children,
  variant = 'primary', // 'primary', 'secondary', 'outline', 'ghost', 'danger', 'success'
  size = 'md', // 'sm', 'md', 'lg'
  icon: Icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  className = '',
  onClick,
  type = 'button',
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed select-none rounded-xl';

  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-glow focus:ring-blue-500 border border-transparent',
    secondary: 'bg-slate-900 hover:bg-slate-800 text-white shadow-sm focus:ring-slate-700 border border-transparent',
    outline: 'border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-700 focus:ring-blue-500 shadow-xs',
    ghost: 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:ring-slate-400',
    danger: 'bg-rose-600 hover:bg-rose-700 text-white shadow-sm focus:ring-rose-500',
    success: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm focus:ring-emerald-500',
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2.5 gap-2',
    lg: 'text-base px-6 py-3 gap-2.5 font-semibold',
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : Icon && iconPosition === 'left' ? (
        <Icon className={`${size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'}`} />
      ) : null}
      
      <span>{children}</span>

      {!loading && Icon && iconPosition === 'right' && (
        <Icon className={`${size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'}`} />
      )}
    </button>
  );
}
