import React from 'react';
import Card from './Card';

export default function StatCard({
  title,
  value,
  subtext,
  icon: Icon,
  iconBg = 'bg-blue-50 text-blue-600',
  trend,
  trendType = 'positive', // 'positive', 'neutral', 'negative'
  className = '',
}) {
  return (
    <Card className={`p-5 ${className}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{value}</h3>
          {subtext && <p className="text-xs text-slate-500 mt-1 font-medium">{subtext}</p>}
        </div>
        {Icon && (
          <div className={`p-3 rounded-xl flex-shrink-0 ${iconBg}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
      {trend && (
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center text-xs">
          <span
            className={`font-semibold mr-1.5 ${
              trendType === 'positive'
                ? 'text-emerald-600'
                : trendType === 'negative'
                ? 'text-rose-600'
                : 'text-slate-600'
            }`}
          >
            {trend}
          </span>
          <span className="text-slate-400">vs last week</span>
        </div>
      )}
    </Card>
  );
}
