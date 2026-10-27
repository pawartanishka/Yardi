import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('yardi_token') || null);
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('yardi_user');
    try {
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(true);

  // Validate session on mount if token exists
  useEffect(() => {
    const verifySession = async () => {
      const storedToken = localStorage.getItem('yardi_token');
      if (!storedToken) {
        setUser(null);
        setToken(null);
        setLoading(false);
        return;
      }

      try {
        const response = await api.get('/auth/me');
        if (response.data && response.data.user) {
          setUser(response.data.user);
          localStorage.setItem('yardi_user', JSON.stringify(response.data.user));
        } else {
          logout();
        }
      } catch (err) {
        // Token expired or invalid
        logout();
      } finally {
        setLoading(false);
      }
    };

    verifySession();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await api.post('/auth/login', { email, password });

      if (response.data && response.data.token) {
        const authenticatedUser = response.data.user;
        const authToken = response.data.token;

        setUser(authenticatedUser);
        setToken(authToken);

        localStorage.setItem('yardi_token', authToken);
        localStorage.setItem('yardi_user', JSON.stringify(authenticatedUser));

        return { success: true, user: authenticatedUser };
      }

      return { success: false, error: 'Authentication failed. Please verify your credentials.' };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.message || 'Invalid email or password. Please try again.',
      };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      const response = await api.post('/auth/register', userData);

      if (response.data && response.data.token) {
        const registeredUser = response.data.user;
        const authToken = response.data.token;

        setUser(registeredUser);
        setToken(authToken);

        localStorage.setItem('yardi_token', authToken);
        localStorage.setItem('yardi_user', JSON.stringify(registeredUser));

        return { success: true, user: registeredUser };
      }

      return { success: false, error: 'Registration failed.' };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.message || 'Registration failed. Email may already be registered.',
      };
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updatedFields) => {
    try {
      const response = await api.put('/users/me', updatedFields);
      if (response.data && response.data.user) {
        const updated = response.data.user;
        setUser(updated);
        localStorage.setItem('yardi_user', JSON.stringify(updated));
        return { success: true, user: updated };
      }
      return { success: false, error: 'Failed to update profile' };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.message || 'Error updating profile',
      };
    }
  };

  const updateStats = ({ xpGained, currentDay, currentStreak, overallProgress }) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = {
        ...prev,
        xp: xpGained !== undefined ? (prev.xp || 0) + xpGained : prev.xp,
        currentDay: currentDay !== undefined ? currentDay : prev.currentDay,
        currentStreak: currentStreak !== undefined ? currentStreak : prev.currentStreak,
        overallProgress: overallProgress !== undefined ? overallProgress : prev.overallProgress,
      };
      localStorage.setItem('yardi_user', JSON.stringify(updated));
      return updated;
    });
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('yardi_user');
    localStorage.removeItem('yardi_token');
    localStorage.removeItem('yardi_journey_days');
    localStorage.removeItem('yardi_activities_map');
    localStorage.removeItem('yardi_badges');
    localStorage.removeItem('yardi_notifications');
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
