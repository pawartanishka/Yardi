import React from 'react';
import { Calendar, Lock, Clock, Sparkles } from 'lucide-react';
import Card from '../common/Card';

export default function UpcomingDaysCard({ days = [] }) {
  const upcoming = days.slice(5, 8); // next 3 days

  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Upcoming Milestones</h3>
            <p className="text-[11px] text-slate-500">Unlocks upon daily completion</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {upcoming.map((day) => (
          <div
            key={day.id || day.dayNumber}
            className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/60 flex items-center justify-between gap-3 text-slate-500"
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="w-8 h-8 rounded-lg bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-xs flex-shrink-0">
                {day.dayNumber < 10 ? `0${day.dayNumber}` : day.dayNumber}
              </span>

              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-700 truncate">{day.title}</p>
                <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                  <span className="flex items-center gap-0.5">
                    <Clock className="w-3 h-3" />
                    {day.estimatedTime}
                  </span>
                  <span>•</span>
                  <span>{day.activitiesCount || 4} Activities</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-xs font-semibold text-purple-600">
                +{day.xp} XP
              </span>
              <Lock className="w-4 h-4 text-slate-400" />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
