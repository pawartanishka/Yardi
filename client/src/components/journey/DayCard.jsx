import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Lock, ArrowRight, Clock, Sparkles } from 'lucide-react';
import Badge from '../common/Badge';

export default function DayCard({ day }) {
  const navigate = useNavigate();
  const isCompleted = day.status === 'completed';
  const isCurrent = day.status === 'current';
  const isLocked = day.status === 'locked';

  const handleClick = () => {
    if (isLocked) return;
    navigate(`/journey/day-${day.dayNumber}`);
  };

  return (
    <div
      onClick={handleClick}
      className={`relative rounded-3xl p-5 sm:p-6 transition-all duration-300 border text-left ${
        isLocked
          ? 'bg-slate-50/80 border-slate-200/60 opacity-70 cursor-not-allowed'
          : isCurrent
          ? 'bg-white border-blue-500 shadow-lg shadow-blue-500/10 ring-2 ring-blue-500/20 cursor-pointer hover:-translate-y-1'
          : isCompleted
          ? 'bg-white border-emerald-200 shadow-soft cursor-pointer hover:shadow-card hover:-translate-y-0.5'
          : 'bg-white border-slate-200 shadow-soft cursor-pointer hover:shadow-card hover:-translate-y-0.5'
      }`}
    >
      {/* Top row */}
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2.5">
          <span
            className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs ${
              isCompleted
                ? 'bg-emerald-500 text-white'
                : isCurrent
                ? 'bg-blue-600 text-white shadow-glow'
                : isLocked
                ? 'bg-slate-200 text-slate-500'
                : 'bg-slate-100 text-slate-700'
            }`}
          >
            {day.dayNumber < 10 ? `0${day.dayNumber}` : day.dayNumber}
          </span>

          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Day {day.dayNumber}
          </span>
        </div>

        {/* Status indicator badge */}
        <div>
          {isCompleted && (
            <Badge variant="success" icon={CheckCircle2}>
              Completed
            </Badge>
          )}
          {isCurrent && (
            <Badge variant="primary" className="animate-pulse">
              ● In Progress
            </Badge>
          )}
          {isLocked && (
            <Badge variant="default" icon={Lock}>
              Locked
            </Badge>
          )}
        </div>
      </div>

      {/* Title & Description */}
      <h3
        className={`text-base font-bold mb-1.5 line-clamp-1 ${
          isLocked ? 'text-slate-500' : 'text-slate-900'
        }`}
      >
        {day.title}
      </h3>
      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
        {day.description}
      </p>

      {/* Progress mini bar if current or completed */}
      {!isLocked && (
        <div className="mb-4">
          <div className="flex justify-between items-center text-[11px] font-semibold text-slate-500 mb-1">
            <span>
              {day.completedCount || 0} of {day.activitiesCount || 4} Activities
            </span>
            <span>
              {Math.round(((day.completedCount || 0) / (day.activitiesCount || 4)) * 100)}%
            </span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                isCompleted ? 'bg-emerald-500' : 'bg-blue-600'
              }`}
              style={{
                width: `${Math.round(((day.completedCount || 0) / (day.activitiesCount || 4)) * 100)}%`,
              }}
            />
          </div>
        </div>
      )}

      {/* Bottom meta */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            {day.estimatedTime || '30 mins'}
          </span>
          <span className="flex items-center gap-1 font-semibold text-purple-600">
            <Sparkles className="w-3.5 h-3.5" />
            +{day.xp} XP
          </span>
        </div>

        {!isLocked && (
          <div className="flex items-center gap-1 text-xs font-bold text-blue-600 group">
            <span>{isCompleted ? 'Review' : 'Continue'}</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </div>
        )}
      </div>
    </div>
  );
}
