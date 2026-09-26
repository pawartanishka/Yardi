import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import confetti from 'canvas-confetti';
import { mockJourneyDays, mockDayActivities, mockBadges } from '../data/mockData';
import { useAuth } from './AuthContext';
import { useNotifications } from './NotificationContext';

const JourneyContext = createContext();

export function JourneyProvider({ children }) {
  const { user, updateStats } = useAuth();
  const { addNotification } = useNotifications();

  const [days, setDays] = useState(() => {
    const saved = localStorage.getItem('yardi_journey_days');
    return saved ? JSON.parse(saved) : mockJourneyDays;
  });

  const [activitiesMap, setActivitiesMap] = useState(() => {
    const saved = localStorage.getItem('yardi_activities_map');
    return saved ? JSON.parse(saved) : mockDayActivities;
  });

  const [badges, setBadges] = useState(() => {
    const saved = localStorage.getItem('yardi_badges');
    return saved ? JSON.parse(saved) : mockBadges;
  });

  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    localStorage.setItem('yardi_journey_days', JSON.stringify(days));
  }, [days]);

  useEffect(() => {
    localStorage.setItem('yardi_activities_map', JSON.stringify(activitiesMap));
  }, [activitiesMap]);

  useEffect(() => {
    localStorage.setItem('yardi_badges', JSON.stringify(badges));
  }, [badges]);

  // Load from backend if available
  useEffect(() => {
    const fetchJourney = async () => {
      try {
        const res = await axios.get('/api/journey').catch(() => null);
        if (res && res.data && res.data.days && res.data.days.length > 0) {
          setDays(res.data.days);
        }
      } catch {
        // fallback to existing state
      }
    };
    fetchJourney();
  }, []);

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#2563EB', '#7C3AED', '#10B981', '#F59E0B'],
      });
    } catch {
      // ignore
    }
  };

  const getDayActivities = (dayId) => {
    return activitiesMap[dayId] || activitiesMap['day-5'] || [];
  };

  const completeActivity = async (dayId, activityId) => {
    const currentList = activitiesMap[dayId] || [];
    const targetActivity = currentList.find((a) => a.id === activityId);
    if (!targetActivity || targetActivity.status === 'completed') {
      return { success: true, alreadyCompleted: true };
    }

    const xpEarned = targetActivity.xp || 50;

    // Update activity state
    const updatedActivities = currentList.map((a) =>
      a.id === activityId ? { ...a, status: 'completed' } : a
    );

    const newMap = { ...activitiesMap, [dayId]: updatedActivities };
    setActivitiesMap(newMap);

    // Calculate completed count for this day
    const completedCount = updatedActivities.filter((a) => a.status === 'completed').length;
    const isDayCompleted = completedCount === updatedActivities.length;

    // Update days state
    let nextDayNumber = user?.currentDay || 5;
    const updatedDays = days.map((d) => {
      if (d.id === dayId) {
        return {
          ...d,
          completedCount,
          status: isDayCompleted ? 'completed' : 'current',
        };
      }
      return d;
    });

    if (isDayCompleted) {
      // Find current day number
      const thisDay = days.find((d) => d.id === dayId);
      const currentDayNum = thisDay ? thisDay.dayNumber : 5;
      nextDayNumber = Math.min(15, currentDayNum + 1);

      // Unlock next day
      for (let i = 0; i < updatedDays.length; i++) {
        if (updatedDays[i].dayNumber === nextDayNumber && updatedDays[i].status === 'locked') {
          updatedDays[i].status = 'current';
        }
      }

      addNotification({
        title: `Day ${currentDayNum} Completed! 🎉`,
        message: `Outstanding job completing all activities for Day ${currentDayNum}. Day ${nextDayNumber} is now unlocked!`,
        type: 'completion',
      });

      triggerConfetti();

      // Check if Day 15 finished!
      if (currentDayNum === 15) {
        setShowCelebration(true);
        triggerConfetti();
      }
    } else {
      addNotification({
        title: `Activity Completed! +${xpEarned} XP`,
        message: `You completed "${targetActivity.title}".`,
        type: 'activity',
      });
    }

    setDays(updatedDays);
    updateStats({
      xpGained: xpEarned,
      currentDay: nextDayNumber,
    });

    // Award badges check
    if (completedCount >= 1 && !badges.find((b) => b.id === 'badge-1')?.earned) {
      unlockBadge('badge-1');
    }

    return { success: true, xpEarned, isDayCompleted };
  };

  const unlockBadge = (badgeId) => {
    setBadges((prev) =>
      prev.map((b) =>
        b.id === badgeId
          ? { ...b, earned: true, earnedAt: new Date().toISOString() }
          : b
      )
    );
    const targetBadge = badges.find((b) => b.id === badgeId);
    if (targetBadge) {
      addNotification({
        title: `Badge Unlocked: ${targetBadge.name} 🏆`,
        message: targetBadge.description,
        type: 'badge',
      });
      triggerConfetti();
    }
  };

  const closeCelebration = () => setShowCelebration(false);

  return (
    <JourneyContext.Provider
      value={{
        days,
        activitiesMap,
        badges,
        showCelebration,
        closeCelebration,
        triggerConfetti,
        getDayActivities,
        completeActivity,
        unlockBadge,
        setDays,
        setActivitiesMap,
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
