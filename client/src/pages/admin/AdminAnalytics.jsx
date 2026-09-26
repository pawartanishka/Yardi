import React from 'react';
import {
  PieChart as PieChartIcon,
  Download,
  Calendar,
  Users,
  Award,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
  Legend
} from 'recharts';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';

export default function AdminAnalytics() {
  const cohortScores = [
    { day: 'Day 1', avgScore: 95, passRate: 98 },
    { day: 'Day 2', avgScore: 92, passRate: 94 },
    { day: 'Day 3', avgScore: 88, passRate: 91 },
    { day: 'Day 4', avgScore: 89, passRate: 93 },
    { day: 'Day 5', avgScore: 86, passRate: 88 },
    { day: 'Day 6', avgScore: 84, passRate: 86 },
    { day: 'Day 7', avgScore: 91, passRate: 92 },
  ];

  const completionTimes = [
    { range: '< 20 mins', users: 18 },
    { range: '20-35 mins', users: 62 },
    { range: '35-50 mins', users: 48 },
    { range: '> 50 mins', users: 20 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Cohort Analytics & Insights
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Deep dive assessment performance, milestone velocity, and curriculum friction points
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          icon={Download}
          onClick={() => alert('Generating Onboarding Cohort Report (CSV)...')}
        >
          Export CSV Report
        </Button>
      </div>

      {/* Analytics KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-5">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Avg Time to Complete Day
          </span>
          <div className="text-2xl font-black text-slate-900">38.4 Mins</div>
          <p className="text-xs text-emerald-600 font-semibold mt-1">
            Optimal engagement threshold
          </p>
        </Card>

        <Card className="p-5">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Day 15 Completion Rate
          </span>
          <div className="text-2xl font-black text-blue-600">89.2%</div>
          <p className="text-xs text-slate-500 mt-1">
            +6.4% higher than previous quarter
          </p>
        </Card>

        <Card className="p-5">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Knowledge Retention Score
          </span>
          <div className="text-2xl font-black text-purple-600">91.8%</div>
          <p className="text-xs text-purple-700 font-semibold mt-1">
            Exceptional squad readiness
          </p>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quiz Pass Rate Trends */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Quiz Scores & Pass Rates by Milestone
              </h3>
              <p className="text-xs text-slate-500">
                Tracks comprehension across curriculum
              </p>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={cohortScores}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="day" stroke="#94A3B8" fontSize={12} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} domain={[70, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    borderRadius: '0.75rem',
                    color: '#fff',
                    border: 'none',
                    fontSize: '12px',
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="avgScore"
                  stroke="#2563EB"
                  strokeWidth={3}
                  name="Average Score (%)"
                />
                <Line
                  type="monotone"
                  dataKey="passRate"
                  stroke="#10B981"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  name="Pass Rate (%)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Daily Time Spent Distribution */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Daily Time Spent Distribution
              </h3>
              <p className="text-xs text-slate-500">
                Time taken by learners to complete daily modules
              </p>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={completionTimes}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="range" stroke="#94A3B8" fontSize={12} tickLine={false} />
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
                <Bar dataKey="users" fill="#7C3AED" radius={[6, 6, 0, 0]} name="Learners Count" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}
