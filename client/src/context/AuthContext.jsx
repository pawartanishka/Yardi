import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { mockUser } from '../data/mockData';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('yardi_user');
    return saved ? JSON.parse(saved) : mockUser;
  });
  const [token, setToken] = useState(() => localStorage.getItem('yardi_token') || 'demo-jwt-token');
  const [loading, setLoading] = useState(false);

  // Sync token to Axios default authorization header
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('yardi_token', token);
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('yardi_token');
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('yardi_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('yardi_user');
    }
  }, [user]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      // Attempt backend API call first
      const response = await axios.post('/api/auth/login', { email, password }).catch(() => null);

      if (response && response.data && response.data.token) {
        setUser(response.data.user);
        setToken(response.data.token);
        return { success: true, user: response.data.user };
      }

      // Seamless Mock Fallback for Demo & instant preview
      let loggedUser = { ...mockUser };
      if (email.toLowerCase().includes('admin')) {
        loggedUser = {
          ...mockUser,
          id: 'admin-1',
          name: 'Sarah Connor',
          email: 'admin@yardi.com',
          role: 'admin',
          department: 'Talent & Organizational Development',
        };
      } else {
        loggedUser = {
          ...mockUser,
          email: email || 'alex.rivera@yardi.com',
          name: email.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase()),
          role: 'user',
        };
      }

      setUser(loggedUser);
      setToken('demo-session-token');
      return { success: true, user: loggedUser };
    } catch (err) {
      return { success: false, error: err.response?.data?.message || 'Login failed. Please check credentials.' };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      const response = await axios.post('/api/auth/register', userData).catch(() => null);
      if (response && response.data && response.data.token) {
        setUser(response.data.user);
        setToken(response.data.token);
        return { success: true, user: response.data.user };
      }

      const newUser = {
        ...mockUser,
        id: `user-${Date.now()}`,
        name: userData.name,
        email: userData.email,
        department: userData.department || 'Cloud Solutions',
        role: 'user',
        currentDay: 1,
        xp: 0,
        overallProgress: 0,
      };

      setUser(newUser);
      setToken('demo-registered-token');
      return { success: true, user: newUser };
    } catch (err) {
      return { success: false, error: err.response?.data?.message || 'Registration failed.' };
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = (updatedFields) => {
    setUser((prev) => {
      const updated = { ...prev, ...updatedFields };
      return updated;
    });
  };

  const updateStats = ({ xpGained, dayCompleted, currentDay }) => {
    setUser((prev) => {
      const newXp = (prev?.xp || 0) + (xpGained || 0);
      const newTodayXp = (prev?.todayXp || 0) + (xpGained || 0);
      const nextDay = currentDay !== undefined ? currentDay : prev?.currentDay || 5;
      const progress = Math.min(100, Math.round((nextDay / 15) * 100));

      return {
        ...prev,
        xp: newXp,
        todayXp: newTodayXp,
        currentDay: nextDay,
        overallProgress: progress,
      };
    });
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('yardi_user');
    localStorage.removeItem('yardi_token');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!user,
        login,
        register,
        updateProfile,
        updateStats,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
