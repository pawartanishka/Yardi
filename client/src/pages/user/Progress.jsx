import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  BarChart3,
  Calendar,
  CheckCircle2,
  Clock,
  Flame,
  Sparkles,
  Trophy,
  Award
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useJourney } from '../../context/JourneyContext';
import Card from '../../components/common/Card';
import StatCard from '../../components/common/StatCard';
import ProgressBar from '../../components/common/ProgressBar';

export default function Progress() {
  const { user } = useAuth();
  const { days, badges } = useJourney();

  const completedDays = days.filter((d) => d.status === 'completed').length;
  const earnedBadgesCount = badges.filter((b) => b.earned).length;

  const weeklyData = [
    { day: 'Mon', xp: 240, time: 35 },
    { day: 'Tue', xp: 310, time: 42 },
    { day: 'Wed', xp: 280, time: 38 },
    { day: 'Thu', xp: 390, time: 55 },
    { day: 'Fri', xp: 180, time: 25 },
    { day: 'Sat', xp: 0, time: 0 },
    { day: 'Sun', xp: 50, time: 10 },
  ];

  const categoryData = [
    { name: 'Video Modules', completed: 8, total: 15, color: '#2563EB' },
    { name: 'Reading Guides', completed: 6, total: 15, color: '#7C3AED' },
    { name: 'Quizzes & Checks', completed: 4, total: 12, color: '#10B981' },
    { name: 'Challenges & Scenarios', completed: 3, total: 10, color: '#F59E0B' },
    { name: 'Checklists & Reflections', completed: 4, total: 6, color: '#06B6D4' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Learning Analytics & Progress
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Detailed metrics tracking your pre-joining journey momentum and assessment scores
        </p>
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Overall Completion"
          value={`${user?.overallProgress || 42}%`}
          subtext="15-Day Journey progress"
          icon={BarChart3}
          iconBg="bg-blue-50 text-blue-600"
        />

        <StatCard
          title="Milestone Days"
          value={`${completedDays} / 15`}
          subtext="Days fully completed"
          icon={Calendar}
          iconBg="bg-indigo-50 text-indigo-600"
        />

        <StatCard
          title="Quiz Accuracy"
          value={`${user?.quizAverage || 92}%`}
          subtext="Avg knowledge score"
          icon={CheckCircle2}
          iconBg="bg-emerald-50 text-emerald-600"
        />

        <StatCard
          title="Active Streak"
          value={`${user?.currentStreak || 5} Days`}
          subtext={`Longest: ${user?.longestStreak || 5} Days`}
          icon={Flame}
          iconBg="bg-amber-50 text-amber-600"
        />
      </div>

      {/* Visual Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Activity & XP Chart (2 cols on lg) */}
        <Card className="p-6 lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Weekly Engagement & XP Gains
              </h3>
              <p className="text-xs text-slate-500">
                Experience points accumulated per active day
              </p>
            </div>
            <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200">
              Total XP: {(user?.xp || 1450).toLocaleString()}
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyData}>
                <defs>
                  <linearGradient id="colorXp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="day" stroke="#94A3B8" fontSize={12} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    borderRadius: '0.75rem',
                    color: '#fff',
                    border: 'none',
                    fontSize: '12px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="xp"
                  stroke="#2563EB"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorXp)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Learning Categories Progress Breakdown (1 col on lg) */}
        <Card className="p-6 space-y-4">
          <div className="pb-2 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900">Activity Breakdown</h3>
            <p className="text-xs text-slate-500">
              Progress by learning modality
            </p>
          </div>

          <div className="space-y-4 pt-1">
            {categoryData.map((cat, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span>{cat.name}</span>
                  <span className="text-slate-500">
                    {cat.completed} / {cat.total}
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${(cat.completed / cat.total) * 100}%`,
                      backgroundColor: cat.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Cohort Summary Box */}
      <Card className="p-6 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-white">
              LaunchPad Readiness Score: Top 5%
            </h3>
            <p className="text-xs text-blue-200">
              You are currently maintaining flawless attendance and high quiz scores. Your manager and buddy have been notified of your outstanding dedication.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-[10px] text-blue-300 block uppercase">Cohort Rank</span>
              <span className="text-xl font-black text-amber-400">#4 of 148</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
