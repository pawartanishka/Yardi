import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useJourney } from '../../context/JourneyContext';
import GreetingSection from '../../components/dashboard/GreetingSection';
import JourneyStatusCard from '../../components/dashboard/JourneyStatusCard';
import TodayTasksCard from '../../components/dashboard/TodayTasksCard';
import UpcomingDaysCard from '../../components/dashboard/UpcomingDaysCard';
import BadgesPreviewCard from '../../components/dashboard/BadgesPreviewCard';
import StatCard from '../../components/common/StatCard';
import VideoPlayerModal from '../../components/activities/VideoPlayerModal';
import ReadingViewerModal from '../../components/activities/ReadingViewerModal';
import ChallengeModal from '../../components/activities/ChallengeModal';
import ReflectionModal from '../../components/activities/ReflectionModal';
import QuizPlayer from '../../components/quiz/QuizPlayer';
import Modal from '../../components/common/Modal';
import CompletionCelebrationModal from '../../components/journey/CompletionCelebrationModal';
import { mockQuizDay5 } from '../../data/mockData';

import {
  Compass,
  Sparkles,
  Flame,
  CheckCircle2,
  Trophy,
  Calendar,
  Layers
} from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();
  const {
    days,
    badges,
    showCelebration,
    closeCelebration,
    getDayActivities,
    completeActivity,
  } = useJourney();

  const currentDayId = `day-${user?.currentDay || 5}`;
  const currentDay = days.find((d) => d.dayNumber === (user?.currentDay || 5)) || days[4];
  const activities = getDayActivities(currentDayId);

  // Active modal state for interactive activities
  const [activeActivity, setActiveActivity] = useState(null);
  const [modalType, setModalType] = useState(null); // 'video', 'reading', 'challenge', 'reflection', 'quiz'

  const handleOpenActivity = (activity) => {
    setActiveActivity(activity);
    setModalType(activity.type);
  };

  const handleCloseModal = () => {
    setActiveActivity(null);
    setModalType(null);
  };

  const handleActivityComplete = (activityId) => {
    completeActivity(currentDayId, activityId);
  };

  return (
    <div className="space-y-6">
      {/* 1. Top Salutation & Roadmap Progress */}
      <GreetingSection user={user} />

      {/* 2. Key Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Overall Progress"
          value={`${user?.overallProgress || 42}%`}
          subtext={`Day ${user?.currentDay || 5} of 15 Days`}
          icon={Layers}
          iconBg="bg-blue-50 text-blue-600"
          trend="+8%"
          trendType="positive"
        />

        <StatCard
          title="Total Experience"
          value={`${(user?.xp || 1450).toLocaleString()} XP`}
          subtext={`+${user?.todayXp || 180} XP earned today`}
          icon={Sparkles}
          iconBg="bg-purple-50 text-purple-600"
          trend="+180 XP"
          trendType="positive"
        />

        <StatCard
          title="Learning Streak"
          value={`${user?.currentStreak || 5} Days`}
          subtext="Consecutive daily engagement"
          icon={Flame}
          iconBg="bg-amber-50 text-amber-600"
          trend="Top 5% of Cohort"
          trendType="positive"
        />

        <StatCard
          title="Activities Done"
          value={`${user?.completedActivities || 19} / ${user?.totalActivities || 58}`}
          subtext="Pre-joining tasks completed"
          icon={CheckCircle2}
          iconBg="bg-emerald-50 text-emerald-600"
          trend="On Track"
          trendType="positive"
        />
      </div>

      {/* 3. Main Dashboard Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols on lg): Active Journey & Daily Tasks */}
        <div className="lg:col-span-2 space-y-6">
          <JourneyStatusCard day={currentDay} activities={activities} />

          <TodayTasksCard
            activities={activities}
            onOpenActivity={handleOpenActivity}
          />
        </div>

        {/* Right Column (1 Col on lg): Achievements Preview & Upcoming Days */}
        <div className="space-y-6">
          <BadgesPreviewCard badges={badges} />

          <UpcomingDaysCard days={days} />
        </div>
      </div>

      {/* Interactive Activity Modals */}
      {modalType === 'video' && activeActivity && (
        <VideoPlayerModal
          isOpen={true}
          onClose={handleCloseModal}
          activity={activeActivity}
          onComplete={handleActivityComplete}
        />
      )}

      {modalType === 'reading' && activeActivity && (
        <ReadingViewerModal
          isOpen={true}
          onClose={handleCloseModal}
          activity={activeActivity}
          onComplete={handleActivityComplete}
        />
      )}

      {modalType === 'challenge' && activeActivity && (
        <ChallengeModal
          isOpen={true}
          onClose={handleCloseModal}
          activity={activeActivity}
          onComplete={handleActivityComplete}
        />
      )}

      {modalType === 'reflection' && activeActivity && (
        <ReflectionModal
          isOpen={true}
          onClose={handleCloseModal}
          activity={activeActivity}
          onComplete={handleActivityComplete}
        />
      )}

      {modalType === 'quiz' && activeActivity && (
        <Modal
          isOpen={true}
          onClose={handleCloseModal}
          title=""
          maxWidth="max-w-3xl"
        >
          <QuizPlayer
            quiz={mockQuizDay5}
            onComplete={({ score, total, percentage, xp }) => {
              handleActivityComplete(activeActivity.id);
            }}
            onClose={handleCloseModal}
          />
        </Modal>
      )}

      {/* Day 15 Completion Celebration Screen */}
      <CompletionCelebrationModal
        isOpen={showCelebration}
        onClose={closeCelebration}
      />
    </div>
  );
}
