import React, { useState, useEffect } from 'react';
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
import api from '../../services/api';
import Card from '../../components/common/Card';
import StatCard from '../../components/common/StatCard';
import ProgressBar from '../../components/common/ProgressBar';

export default function Progress() {
  const { user } = useAuth();
  const { days, badges } = useJourney();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await api.get('/progress');
        if (res.data && res.data.stats) {
          setStats(res.data.stats);
        }
      } catch (err) {
        console.error('Failed to load progress stats:', err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProgress();
  }, []);

  const completedDays = days.filter((d) => d.status === 'completed').length;
  const earnedBadgesCount = badges.filter((b) => b.earned).length;

  const overallProgress = stats?.overallProgress !== undefined ? stats.overallProgress : (user?.overallProgress || 0);
  const quizAverage = stats?.quizAverage || 0;
  const currentStreak = stats?.currentStreak !== undefined ? stats.currentStreak : (user?.currentStreak || 0);
  const longestStreak = stats?.longestStreak !== undefined ? stats.longestStreak : (user?.longestStreak || 0);
  const categoryData = stats?.categoryData || [];

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
          value={`${overallProgress}%`}
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
          value={`${quizAverage}%`}
          subtext="Avg knowledge score"
          icon={CheckCircle2}
          iconBg="bg-emerald-50 text-emerald-600"
        />

        <StatCard
          title="Active Streak"
          value={`${currentStreak} Days`}
          subtext={`Longest: ${longestStreak} Days`}
          icon={Flame}
          iconBg="bg-amber-50 text-amber-600"
        />
      </div>

      {/* Visual Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Milestone Distribution & Progress */}
        <Card className="p-6 lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Curriculum Milestone Distribution
              </h3>
              <p className="text-xs text-slate-500">
                15-Day sequential progression overview
              </p>
            </div>
            <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200">
              Total XP: {(user?.xp || 0).toLocaleString()}
            </span>
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
              <span>Current Milestone: Day {user?.currentDay || 1} of 15</span>
              <span>{overallProgress}%</span>
            </div>
            <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-600 to-indigo-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
            <div className="grid grid-cols-3 gap-3 pt-4 text-center">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Activities Completed</span>
                <div className="text-xl font-black text-slate-900 mt-0.5">{stats?.completedActivities || 0}</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Total Catalog</span>
                <div className="text-xl font-black text-slate-900 mt-0.5">{stats?.totalActivities || 0}</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Honors Earned</span>
                <div className="text-xl font-black text-slate-900 mt-0.5">{earnedBadgesCount}</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Learning Categories Progress Breakdown */}
        <Card className="p-6 space-y-4">
          <div className="pb-2 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900">Activity Breakdown</h3>
            <p className="text-xs text-slate-500">
              Progress by learning modality
            </p>
          </div>

          <div className="space-y-4 pt-1">
            {categoryData.length > 0 ? (
              categoryData.map((cat, idx) => (
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
                        width: `${cat.total > 0 ? (cat.completed / cat.total) * 100 : 0}%`,
                        backgroundColor: cat.color,
                      }}
                    />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-500 italic py-4 text-center">
                Complete daily modules to see category breakdowns.
              </p>
            )}
          </div>
        </Card>
      </div>

      {/* Cohort Status Box */}
      <Card className="p-6 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-white">
              Pre-Joining Onboarding Velocity
            </h3>
            <p className="text-xs text-slate-300">
              Your engagement and assessment records are synchronized directly with Yardi Talent Development. Keep maintaining your daily cadence for Day 1 readiness.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-[10px] text-blue-300 block uppercase">Curriculum Status</span>
              <span className="text-lg font-bold text-amber-400">
                {overallProgress === 100 ? 'Graduated' : `In Progress (Day ${user?.currentDay || 1})`}
              </span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
