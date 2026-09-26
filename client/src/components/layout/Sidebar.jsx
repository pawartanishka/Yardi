import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Compass,
  LayoutDashboard,
  Map,
  BookOpen,
  Trophy,
  BarChart3,
  User,
  LogOut,
  HelpCircle,
  Shield,
  Users,
  Calendar,
  CheckSquare,
  HelpCircle as QuizIcon,
  PieChart,
  Settings,
  Sparkles,
  Flame,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Sidebar({ onCloseMobile }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const userNavItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: '15-Day Journey', path: '/journey', icon: Map },
    { name: 'Learning & Tasks', path: `/journey/day-${user?.currentDay || 5}`, icon: BookOpen },
    { name: 'Challenges', path: '/challenges', icon: Sparkles },
    { name: 'Achievements', path: '/achievements', icon: Trophy },
    { name: 'Progress', path: '/progress', icon: BarChart3 },
    { name: 'My Profile', path: '/profile', icon: User },
  ];

  const adminNavItems = [
    { name: 'Admin Overview', path: '/admin', icon: LayoutDashboard },
    { name: 'User Management', path: '/admin/users', icon: Users },
    { name: 'Journey Setup', path: '/admin/journey', icon: Calendar },
    { name: 'Activities Master', path: '/admin/activities', icon: CheckSquare },
    { name: 'Quizzes & Tests', path: '/admin/quizzes', icon: QuizIcon },
    { name: 'Analytics', path: '/admin/analytics', icon: PieChart },
    { name: 'System Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col h-full border-r border-slate-800 select-none">
      {/* Brand Header */}
      <div className="p-6 border-b border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-glow">
            <Compass className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold tracking-wider text-sm text-blue-400">YARDI</span>
              <span className="text-[10px] bg-blue-500/20 text-blue-300 font-semibold px-1.5 py-0.5 rounded">v2.0</span>
            </div>
            <h1 className="text-base font-bold tracking-tight text-white">LaunchPad</h1>
          </div>
        </div>
      </div>

      {/* User Mini Status card */}
      {user && user.role !== 'admin' && (
        <div className="px-4 py-3 mx-4 my-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-slate-400 font-medium">Current Milestone</span>
            <span className="font-bold text-amber-400 flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 fill-amber-400" />
              Day {user.currentDay || 5}/15
            </span>
          </div>
          <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 to-indigo-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.round(((user.currentDay || 5) / 15) * 100)}%` }}
            />
          </div>
        </div>
      )}

      {/* Navigation Sections */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-6">
        <div>
          <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
            Learner Journey
          </p>
          <nav className="space-y-1">
            {userNavItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onCloseMobile}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-4 h-4 flex-shrink-0" />
                  <span>{item.name}</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 opacity-40" />
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Admin Navigation */}
        {user?.role === 'admin' && (
          <div>
            <div className="flex items-center justify-between px-3 mb-2">
              <p className="text-[11px] font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
                <Shield className="w-3 h-3 text-blue-400" />
                Administration
              </p>
              <span className="text-[10px] bg-blue-900/60 text-blue-200 px-1.5 py-0.5 rounded border border-blue-700/50">Admin</span>
            </div>
            <nav className="space-y-1">
              {adminNavItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onCloseMobile}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-4 h-4 flex-shrink-0" />
                    <span>{item.name}</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 opacity-40" />
                </NavLink>
              ))}
            </nav>
          </div>
        )}
      </div>

      {/* Footer Navigation & Logout */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/40 space-y-1">
        <NavLink
          to="/help"
          onClick={onCloseMobile}
          className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
        >
          <HelpCircle className="w-4 h-4" />
          <span>Support & FAQs</span>
        </NavLink>
        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
