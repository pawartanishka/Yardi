import React, { useState } from 'react';
import DayCard from './DayCard';
import { useJourney } from '../../context/JourneyContext';
import { useAuth } from '../../context/AuthContext';
import { Calendar, Filter, Sparkles, CheckCircle2 } from 'lucide-react';
import ProgressBar from '../common/ProgressBar';

export default function JourneyTimeline() {
  const { days } = useJourney();
  const { user } = useAuth();
  const [filter, setFilter] = useState('all'); // 'all', 'completed', 'active', 'locked'

  const completedDays = days.filter((d) => d.status === 'completed').length;
  const progressPercent = Math.round((completedDays / 15) * 100);

  const filteredDays = days.filter((d) => {
    if (filter === 'completed') return d.status === 'completed';
    if (filter === 'active') return d.status === 'current' || d.status === 'available';
    if (filter === 'locked') return d.status === 'locked';
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Journey Banner Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white p-6 sm:p-8 shadow-card">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-12 w-48 h-48 bg-purple-500/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold">
              <Calendar className="w-3.5 h-3.5" />
              <span>15-Day Structured Roadmap</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Your Path to First Day Success
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Complete each daily milestone to master our culture, tools, role expectations, and squad workflows before you officially step into Yardi.
            </p>
          </div>

          <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/80 rounded-2xl p-5 min-w-[240px] text-left">
            <div className="flex justify-between items-center text-xs font-semibold text-slate-400 mb-2">
              <span>Overall Milestone</span>
              <span className="text-white font-bold">{completedDays} of 15 Days</span>
            </div>
            <ProgressBar value={completedDays} max={15} color="gradient" size="md" />
            <div className="mt-3 flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-700/60">
              <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {progressPercent}% Complete
              </span>
              <span className="flex items-center gap-1 text-purple-300 font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                {user?.xp || 1450} XP
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl border border-slate-200/80 text-xs font-semibold">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              filter === 'all'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Milestones (15)
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              filter === 'active'
                ? 'bg-white text-blue-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Current & Available
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              filter === 'completed'
                ? 'bg-white text-emerald-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Completed ({completedDays})
          </button>
          <button
            onClick={() => setFilter('locked')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              filter === 'locked'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Upcoming Locked ({15 - completedDays - 1 > 0 ? 15 - completedDays - 1 : 0})
          </button>
        </div>

        <div className="text-xs font-medium text-slate-500">
          Showing <span className="font-bold text-slate-700">{filteredDays.length}</span> of 15 days
        </div>
      </div>

      {/* Day Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredDays.map((day) => (
          <DayCard key={day.id || day.dayNumber} day={day} />
        ))}
      </div>
    </div>
  );
}
