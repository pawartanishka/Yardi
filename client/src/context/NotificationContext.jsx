import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { mockNotifications } from '../data/mockData';

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('yardi_notifications');
    return saved ? JSON.parse(saved) : mockNotifications;
  });

  useEffect(() => {
    localStorage.setItem('yardi_notifications', JSON.stringify(notifications));
  }, [notifications]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = async (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
    try {
      await axios.put(`/api/notifications/${id}/read`).catch(() => null);
    } catch {
      // ignore
    }
  };

  const markAllAsRead = async () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    try {
      await axios.put('/api/notifications/read-all').catch(() => null);
    } catch {
      // ignore
    }
  };

  const addNotification = (notif) => {
    const newNotif = {
      id: `notif-${Date.now()}`,
      createdAt: new Date().toISOString(),
      read: false,
      ...notif,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        addNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}
