import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Bell, Sparkles, Flame, Shield, ChevronDown } from 'lucide-react';
import Avatar from '../common/Avatar';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';

export default function Navbar({ onOpenMobile }) {
  const { user } = useAuth();
  const { unreadCount } = useNotifications();

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 flex items-center justify-between">
      {/* Left: Mobile trigger & context */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenMobile}
          className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors focus:outline-none"
          aria-label="Open Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:flex items-center gap-2">
          <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100">
            Pre-Joining Journey
          </span>
          <span className="text-slate-400 text-xs">/</span>
          <span className="text-xs font-semibold text-slate-700">
            Day {user?.currentDay || 5} of 15
          </span>
        </div>
      </div>

      {/* Right: Gamification Badges, Notifications, and Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Streak Indicator */}
        <div
          title={`${user?.currentStreak || 5} consecutive days completed`}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200/70 text-amber-800 text-xs font-bold shadow-2xs hover:bg-amber-100/70 transition-colors cursor-default"
        >
          <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-pulse" />
          <span>{user?.currentStreak || 5} Day Streak</span>
        </div>

        {/* XP Counter */}
        <div
          title={`Total XP: ${user?.xp || 1450}`}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 border border-purple-200/70 text-purple-800 text-xs font-bold shadow-2xs hover:bg-purple-100/70 transition-colors cursor-default"
        >
          <Sparkles className="w-4 h-4 text-purple-600" />
          <span>{user?.xp?.toLocaleString() || '1,450'} XP</span>
        </div>

        {/* Notifications Icon with Unread Badge */}
        <Link
          to="/notifications"
          className="relative p-2 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
          title="Notifications"
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white animate-ping" />
          )}
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
          )}
        </Link>

        {/* Divider */}
        <div className="h-6 w-px bg-slate-200 mx-1 hidden sm:block" />

        {/* User Mini Profile dropdown trigger */}
        <Link
          to="/profile"
          className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-slate-100 transition-colors"
        >
          <Avatar
            src={user?.profileImage}
            name={user?.name || 'Alex Rivera'}
            size="sm"
            status="online"
          />
          <div className="hidden md:block text-left">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-slate-800 leading-none">
                {user?.name || 'Alex Rivera'}
              </span>
              {user?.role === 'admin' && (
                <Shield className="w-3 h-3 text-blue-600" />
              )}
            </div>
            <span className="text-[10px] text-slate-500 font-medium">
              {user?.role === 'admin' ? 'Administrator' : user?.department || 'Engineering'}
            </span>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
        </Link>
      </div>
    </header>
  );
}
