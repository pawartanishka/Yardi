import React from 'react';
import { Calendar, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProgressBar from '../common/ProgressBar';

export default function GreetingSection({ user }) {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const currentDay = user?.currentDay || 5;
  const progressPercent = Math.min(100, Math.round((currentDay / 15) * 100));

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-900 text-white p-6 sm:p-8 shadow-card border border-slate-800">
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-60 h-60 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 -mb-10 w-44 h-44 bg-purple-500/20 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Left: Salutation & Motivation */}
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-400/20">
            <Calendar className="w-3.5 h-3.5" />
            <span>Pre-Joining Onboarding Journey</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            {getGreeting()}, {user?.name || 'Explorer'} 👋
          </h2>

          <p className="text-sm text-slate-300 leading-relaxed">
            You're on <span className="font-bold text-white">Day {currentDay} of 15</span>. You're making tremendous progress preparing for your first day at Yardi!
          </p>
        </div>

        {/* Right: 15-Day Progress Box */}
        <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/80 rounded-2xl p-5 min-w-[280px]">
          <div className="flex items-center justify-between text-xs font-semibold mb-2">
            <span className="text-slate-300">15-Day Journey Progress</span>
            <span className="text-blue-400 font-bold">{progressPercent}%</span>
          </div>

          <ProgressBar value={currentDay} max={15} color="gradient" size="md" />

          <div className="flex items-center justify-between text-xs text-slate-400 mt-3 pt-3 border-t border-slate-700/70">
            <span className="flex items-center gap-1 text-emerald-400 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Day {currentDay} / 15
            </span>

            <Link
              to={`/journey/day-${currentDay}`}
              className="inline-flex items-center gap-1 text-blue-300 hover:text-white font-bold transition-colors"
            >
              <span>Continue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
