import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
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
  Flame,
  ChevronRight,
  PanelLeftClose,
  PanelLeftOpen
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import YardiLogo from '../common/YardiLogo';

export default function Sidebar({
  collapsed = false,
  onToggleCollapse,
  onCloseMobile
}) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const userNavItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: '15-Day Journey', path: '/journey', icon: Map },
    { name: 'Learning & Tasks', path: `/journey/day-${user?.currentDay || 1}`, icon: BookOpen },
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
    <aside
      className={`${
        collapsed ? 'w-20' : 'w-64'
      } bg-slate-900 text-white flex flex-col h-full border-r border-slate-800 select-none transition-all duration-300 ease-in-out`}
    >
      {/* Brand Header */}
      <div className={`p-5 border-b border-slate-800/80 flex items-center ${collapsed ? 'justify-center flex-col gap-3' : 'justify-between'}`}>
        <div className="flex items-center gap-3 overflow-hidden">
          {collapsed ? (
            <YardiLogo className="h-7" variant="white" iconOnly={true} />
          ) : (
            <YardiLogo className="h-7" variant="white" />
          )}
        </div>

        {/* Desktop Collapse Toggle Button */}
        {onToggleCollapse && (
          <button
            type="button"
            onClick={onToggleCollapse}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors focus:outline-none"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <PanelLeftOpen className="w-4 h-4 text-slate-400 hover:text-white" />
            ) : (
              <PanelLeftClose className="w-4 h-4 text-slate-400 hover:text-white" />
            )}
          </button>
        )}
      </div>

      {/* User Mini Status card */}
      {user && user.role !== 'admin' && !collapsed && (
        <div className="mx-3 my-3 px-3.5 py-2.5 rounded-lg bg-slate-800/40 border border-slate-800 text-xs">
          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1.5">
            <span>Onboarding</span>
            <span className="font-medium text-slate-300">Day {user.currentDay || 5} of 15</span>
          </div>
          <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
            <div
              className="bg-blue-600 h-full rounded-full transition-all duration-300"
              style={{ width: `${Math.round(((user.currentDay || 5) / 15) * 100)}%` }}
            />
          </div>
        </div>
      )}

      {/* Navigation Sections */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-6">
        <div>
          {!collapsed && (
            <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Learner Portal
            </p>
          )}
          <nav className="space-y-1">
            {userNavItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onCloseMobile}
                title={collapsed ? item.name : undefined}
                className={({ isActive }) =>
                  `flex items-center ${
                    collapsed ? 'justify-center px-0 py-3' : 'justify-between px-3 py-2.5'
                  } rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`
                }
              >
                <div className={`flex items-center ${collapsed ? 'justify-center' : 'gap-3'}`}>
                  <item.icon className="w-4 h-4 flex-shrink-0" />
                  {!collapsed && <span className="truncate">{item.name}</span>}
                </div>
                {!collapsed && <ChevronRight className="w-3.5 h-3.5 opacity-40" />}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Admin Navigation */}
        {user?.role === 'admin' && (
          <div>
            {!collapsed && (
              <div className="flex items-center justify-between px-3 mb-2">
                <p className="text-[11px] font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
                  <Shield className="w-3 h-3 text-blue-400" />
                  Administration
                </p>
                <span className="text-[10px] bg-blue-900/60 text-blue-200 px-1.5 py-0.5 rounded border border-blue-700/50">Admin</span>
              </div>
            )}
            <nav className="space-y-1">
              {adminNavItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onCloseMobile}
                  title={collapsed ? item.name : undefined}
                  className={({ isActive }) =>
                    `flex items-center ${
                      collapsed ? 'justify-center px-0 py-3' : 'justify-between px-3 py-2.5'
                    } rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                    }`
                  }
                >
                  <div className={`flex items-center ${collapsed ? 'justify-center' : 'gap-3'}`}>
                    <item.icon className="w-4 h-4 flex-shrink-0" />
                    {!collapsed && <span className="truncate">{item.name}</span>}
                  </div>
                  {!collapsed && <ChevronRight className="w-3.5 h-3.5 opacity-40" />}
                </NavLink>
              ))}
            </nav>
          </div>
        )}
      </div>

      {/* Footer Navigation & Logout */}
      <div className={`p-3 border-t border-slate-800 bg-slate-950/40 space-y-1 ${collapsed ? 'text-center' : ''}`}>
        <NavLink
          to="/profile"
          onClick={onCloseMobile}
          title={collapsed ? "Settings & Profile" : undefined}
          className={`flex items-center ${
            collapsed ? 'justify-center p-2.5' : 'gap-3 px-3 py-2'
          } rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors`}
        >
          <HelpCircle className="w-4 h-4" />
          {!collapsed && <span>Help & Profile</span>}
        </NavLink>

        <button
          type="button"
          onClick={handleLogout}
          title={collapsed ? "Sign Out" : undefined}
          className={`w-full flex items-center ${
            collapsed ? 'justify-center p-2.5' : 'gap-3 px-3 py-2'
          } rounded-xl text-sm font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 transition-colors`}
        >
          <LogOut className="w-4 h-4" />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
  );
}
