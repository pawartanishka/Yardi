import React from 'react';
import { Link } from 'react-router-dom';
import {
  Menu,
  Bell,
  Shield,
  ChevronDown,
  PanelLeftClose,
  PanelLeftOpen
} from 'lucide-react';
import Avatar from '../common/Avatar';
import YardiLogo from '../common/YardiLogo';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';

export default function Navbar({
  onOpenMobile,
  collapsed = false,
  onToggleCollapse
}) {
  const { user } = useAuth();
  const { unreadCount } = useNotifications();

  return (
    <header className="sticky top-0 z-30 h-16 bg-white border-b border-slate-200/90 px-4 sm:px-6 flex items-center justify-between">
      {/* Left: Mobile trigger, Desktop collapse toggle & context */}
      <div className="flex items-center gap-3">
        {/* Mobile menu drawer trigger */}
        <button
          type="button"
          onClick={onOpenMobile}
          className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors focus:outline-none"
          aria-label="Open Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Desktop Sidebar Collapse Toggle */}
        {onToggleCollapse && (
          <button
            type="button"
            onClick={onToggleCollapse}
            className="hidden lg:flex items-center justify-center p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            title={collapsed ? "Expand sidebar menu" : "Collapse sidebar menu"}
            aria-label={collapsed ? "Expand sidebar menu" : "Collapse sidebar menu"}
          >
            {collapsed ? (
              <PanelLeftOpen className="w-4 h-4 text-slate-700" />
            ) : (
              <PanelLeftClose className="w-4 h-4 text-slate-500" />
            )}
          </button>
        )}

        {/* Mobile Logo */}
        <div className="lg:hidden flex items-center">
          <YardiLogo className="h-6" variant="blue" />
        </div>

        {/* Executive Breadcrumb */}
        <div className="hidden sm:flex items-center gap-2 text-xs">
          <span className="font-semibold text-slate-500 uppercase tracking-wider text-[11px]">
            {user?.role === 'admin' ? 'Administration' : 'Pre-Joining Journey'}
          </span>
          <span className="text-slate-300">/</span>
          <span className="font-bold text-slate-800">
            {user?.role === 'admin' ? 'Admin Portal' : `Day ${user?.currentDay || 1} of 15`}
          </span>
        </div>
      </div>

      {/* Right: Notifications, Admin Switcher & Profile */}
      <div className="flex items-center gap-2.5">
        {/* Admin Quick Switcher Button */}
        {user?.role === 'admin' && (
          <Link
            to="/admin"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl bg-blue-50 text-blue-700 border border-blue-200/80 hover:bg-blue-100 hover:border-blue-300 transition-all shadow-2xs"
            title="Open Admin Console"
          >
            <Shield className="w-3.5 h-3.5 text-blue-600" />
            <span className="hidden md:inline">Admin Console</span>
          </Link>
        )}

        {/* Notifications Icon with Unread Badge */}
        <Link
          to="/notifications"
          className="relative p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-600 ring-2 ring-white" />
          )}
        </Link>

        {/* Divider */}
        <div className="h-5 w-px bg-slate-200 mx-1 hidden sm:block" />

        {/* User Mini Profile dropdown trigger */}
        <Link
          to="/profile"
          className="flex items-center gap-2.5 p-1 rounded-lg hover:bg-slate-50 transition-colors"
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
