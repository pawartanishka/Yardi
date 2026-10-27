import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import api from '../services/api';
import { useAuth } from './AuthContext';
import { useNotifications } from './NotificationContext';

const JourneyContext = createContext();

export function JourneyProvider({ children }) {
  const { user, isAuthenticated, updateStats } = useAuth();
  const { fetchNotifications } = useNotifications();

  const [days, setDays] = useState([]);
  const [activitiesMap, setActivitiesMap] = useState({});
  const [badges, setBadges] = useState([]);
  const [loadingDays, setLoadingDays] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  // Fetch full 15-day journey overview from MongoDB
  const fetchJourney = useCallback(async () => {
    if (!isAuthenticated) {
      setDays([]);
      setActivitiesMap({});
      return;
    }
    setLoadingDays(true);
    try {
      const res = await api.get('/journey');
      if (res.data && res.data.days) {
        setDays(res.data.days);
      }
    } catch (err) {
      console.error('Failed to load journey days:', err.message);
    } finally {
      setLoadingDays(false);
    }
  }, [isAuthenticated]);

  // Fetch official badges from MongoDB
  const fetchBadges = useCallback(async () => {
    if (!isAuthenticated) {
      setBadges([]);
      return;
    }
    try {
      const res = await api.get('/badges');
      if (res.data && res.data.badges) {
        setBadges(res.data.badges);
      }
    } catch (err) {
      console.error('Failed to load badges:', err.message);
    }
  }, [isAuthenticated]);

  // Load activities for a specific journey day
  const loadDayActivities = useCallback(async (dayId) => {
    if (!dayId) return [];
    try {
      const res = await api.get(`/journey/${dayId}`);
      if (res.data && res.data.activities) {
        setActivitiesMap((prev) => ({
          ...prev,
          [dayId]: res.data.activities,
        }));
        return res.data.activities;
      }
    } catch (err) {
      console.error(`Failed to load activities for ${dayId}:`, err.message);
    }
    return [];
  }, []);

  const getDayActivities = (dayId) => {
    return activitiesMap[dayId] || [];
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchJourney();
      fetchBadges();
    } else {
      setDays([]);
      setActivitiesMap({});
      setBadges([]);
    }
  }, [isAuthenticated, fetchJourney, fetchBadges]);

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0f172a', '#2563EB', '#10B981', '#F59E0B'],
      });
    } catch {
      // ignore
    }
  };

  // Complete an activity via backend verification
  const completeActivity = async (dayId, activityId, reflectionAnswer) => {
    try {
      const payload = reflectionAnswer ? { reflectionAnswer } : {};
      const res = await api.post(`/activities/${activityId}/complete`, payload);

      if (res.data && res.data.success) {
        // Update activity status in local cache
        setActivitiesMap((prev) => {
          const currentList = prev[dayId] || [];
          return {
            ...prev,
            [dayId]: currentList.map((a) =>
              a.id === activityId ? { ...a, status: 'completed' } : a
            ),
          };
        });

        // Update authenticated user stats in AuthContext
        if (res.data.userStats) {
          updateStats(res.data.userStats);
        }

        // Refresh days from server to recalculate completion and milestone unlocks
        await fetchJourney();
        await fetchBadges();
        if (fetchNotifications) {
          await fetchNotifications();
        }

        if (res.data.isDayCompleted) {
          triggerConfetti();
          const dayNum = parseInt((dayId || '').replace('day-', ''), 10);
          if (dayNum === 15) {
            setShowCelebration(true);
          }
        }

        return {
          success: true,
          xpEarned: res.data.xpEarned,
          isDayCompleted: res.data.isDayCompleted,
          nextDayUnlocked: res.data.nextDayUnlocked,
        };
      }

      return { success: false, error: res.data?.message || 'Completion failed' };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.message || 'Failed to complete activity on server',
      };
    }
  };

  const closeCelebration = () => setShowCelebration(false);

  return (
    <JourneyContext.Provider
      value={{
        days,
        loadingDays,
        activitiesMap,
        badges,
        showCelebration,
        closeCelebration,
        triggerConfetti,
        loadDayActivities,
        getDayActivities,
        completeActivity,
        fetchJourney,
        fetchBadges,
      }}
    >
      {children}
    </JourneyContext.Provider>
  );
}

export function useJourney() {
  const context = useContext(JourneyContext);
  if (!context) {
    throw new Error('useJourney must be used within a JourneyProvider');
  }
  return context;
}
