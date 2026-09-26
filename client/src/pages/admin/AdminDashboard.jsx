import React from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  UserCheck,
  CheckCircle2,
  TrendingUp,
  Award,
  Sparkles,
  ArrowRight,
  Shield,
  Layers,
  Calendar,
  CheckSquare
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import Card from '../../components/common/Card';
import StatCard from '../../components/common/StatCard';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { mockAdminStats } from '../../data/mockData';

export default function AdminDashboard() {
  const COLORS = ['#2563EB', '#7C3AED', '#06B6D4', '#F59E0B', '#10B981'];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              LaunchPad Administration
            </h1>
            <Badge variant="primary" icon={Shield}>
              Admin Console
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time oversight of new hire onboarding progression, cohort velocity, and curriculum management
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link to="/admin/journey">
            <Button variant="outline" size="sm" icon={Calendar}>
              Manage Journey
            </Button>
          </Link>
          <Link to="/admin/activities">
            <Button variant="primary" size="sm" icon={CheckSquare}>
              Create Activity
            </Button>
          </Link>
        </div>
      </div>

      {/* Admin KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          title="Total Cohort"
          value={mockAdminStats.totalUsers}
          subtext="Registered new hires"
          icon={Users}
          iconBg="bg-blue-50 text-blue-600"
        />

        <StatCard
          title="Active Learners"
          value={mockAdminStats.activeUsers}
          subtext="Active in past 24 hrs"
          icon={UserCheck}
          iconBg="bg-indigo-50 text-indigo-600"
        />

        <StatCard
          title="Graduated"
          value={mockAdminStats.completedUsers}
          subtext="Day 15 completed"
          icon={CheckCircle2}
          iconBg="bg-emerald-50 text-emerald-600"
        />

        <StatCard
          title="Avg Progress"
          value={`${mockAdminStats.averageProgress}%`}
          subtext="Across active cohort"
          icon={TrendingUp}
          iconBg="bg-purple-50 text-purple-600"
        />

        <StatCard
          title="Avg Quiz Score"
          value={`${mockAdminStats.averageQuizScore}%`}
          subtext="Pre-joining tests"
          icon={Award}
          iconBg="bg-amber-50 text-amber-600"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Cohort Engagement */}
        <Card className="p-6 lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Daily Completion Activity
              </h3>
              <p className="text-xs text-slate-500">
                Number of modules completed daily across cohorts
              </p>
            </div>
            <Badge variant="success">94.2% Attendance</Badge>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockAdminStats.weeklyActivity}>
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
                <Bar dataKey="completed" fill="#2563EB" radius={[6, 6, 0, 0]} name="Completed Activities" />
                <Bar dataKey="active" fill="#C7D9FE" radius={[6, 6, 0, 0]} name="Active Learners" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Cohort Journey Distribution */}
        <Card className="p-6 space-y-4">
          <div className="pb-2 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900">
              Stage Distribution
            </h3>
            <p className="text-xs text-slate-500">
              Learners across 15-day milestones
            </p>
          </div>

          <div className="space-y-3 pt-2">
            {mockAdminStats.progressDistribution.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span className="truncate max-w-[160px]">{item.stage}</span>
                  <span className="text-blue-600 font-bold">{item.count} users</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${(item.count / mockAdminStats.totalUsers) * 100}%`,
                      backgroundColor: COLORS[idx % COLORS.length],
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent Learners Quick Table */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Recent Learner Status</h3>
            <p className="text-xs text-slate-500">Latest progress updates from new hires</p>
          </div>

          <Link
            to="/admin/users"
            className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            <span>View All Learners</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-wider font-semibold">
                <th className="py-3 px-4">Learner Name</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4">Current Day</th>
                <th className="py-3 px-4">Progress</th>
                <th className="py-3 px-4">XP</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {mockAdminStats.recentUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-900">
                    <div>{user.name}</div>
                    <div className="text-[10px] text-slate-400 font-normal">{user.email}</div>
                  </td>
                  <td className="py-3 px-4">{user.department}</td>
                  <td className="py-3 px-4 font-bold text-blue-600">Day {user.currentDay}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-blue-600 h-full rounded-full"
                          style={{ width: `${user.progress}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-bold">{user.progress}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-bold text-purple-600">{user.xp.toLocaleString()} XP</td>
                  <td className="py-3 px-4">
                    <Badge variant={user.status === 'completed' ? 'success' : user.status === 'active' ? 'primary' : 'default'}>
                      {user.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
