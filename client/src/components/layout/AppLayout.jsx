import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import MobileDrawer from './MobileDrawer';

export default function AppLayout() {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    return localStorage.getItem('yardi_sidebar_collapsed') === 'true';
  });

  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard' || location.pathname === '/';

  const toggleSidebar = () => {
    setSidebarCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem('yardi_sidebar_collapsed', String(next));
      return next;
    });
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50 font-sans">
      {/* Desktop Collapsible Sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0 transition-all duration-300 ease-in-out">
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggleCollapse={toggleSidebar}
          onCloseMobile={() => setMobileDrawerOpen(false)}
        />
      </div>

      {/* Mobile Navigation Drawer */}
      <MobileDrawer
        isOpen={mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Navbar
          onOpenMobile={() => setMobileDrawerOpen(true)}
          collapsed={sidebarCollapsed}
          onToggleCollapse={toggleSidebar}
        />

        {isDashboard ? (
          <main className="flex-1 overflow-y-auto bg-[#F4F6F9]">
            <Outlet />
          </main>
        ) : (
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-50">
            <div className="max-w-7xl mx-auto">
              <Outlet />
            </div>
          </main>
        )}
      </div>
    </div>
  );
}
