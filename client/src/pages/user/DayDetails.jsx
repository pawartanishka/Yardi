import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Sparkles,
  CheckCircle2,
  Lock,
  ChevronRight
} from 'lucide-react';
import { useJourney } from '../../context/JourneyContext';
import { useAuth } from '../../context/AuthContext';
import ActivityCard from '../../components/activities/ActivityCard';
import ProgressBar from '../../components/common/ProgressBar';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import VideoPlayerModal from '../../components/activities/VideoPlayerModal';
import ReadingViewerModal from '../../components/activities/ReadingViewerModal';
import ChallengeModal from '../../components/activities/ChallengeModal';
import ReflectionModal from '../../components/activities/ReflectionModal';
import QuizPlayer from '../../components/quiz/QuizPlayer';
import Modal from '../../components/common/Modal';
import CompletionCelebrationModal from '../../components/journey/CompletionCelebrationModal';
import { mockQuizDay5 } from '../../data/mockData';

export default function DayDetails() {
  const { dayId = 'day-5' } = useParams();
  const navigate = useNavigate();
  const { days, getDayActivities, completeActivity, showCelebration, closeCelebration } = useJourney();
  const { user } = useAuth();

  // Extract day number from dayId (e.g. 'day-5' -> 5)
  const dayNumber = parseInt(dayId.replace('day-', ''), 10) || 5;
  const day = days.find((d) => d.dayNumber === dayNumber) || days[4];
  const activities = getDayActivities(dayId);

  const [activeActivity, setActiveActivity] = useState(null);
  const [modalType, setModalType] = useState(null);

  const completedCount = activities.filter((a) => a.status === 'completed').length;
  const totalCount = activities.length || 5;
  const progressPercent = Math.round((completedCount / totalCount) * 100);
  const isAllDone = completedCount === totalCount;

  const handleOpenActivity = (activity) => {
    setActiveActivity(activity);
    setModalType(activity.type);
  };

  const handleCloseModal = () => {
    setActiveActivity(null);
    setModalType(null);
  };

  const handleCompleteActivity = (actId) => {
    completeActivity(dayId, actId);
  };

  return (
    <div className="space-y-6">
      {/* Back button and breadcrumb */}
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="sm"
          icon={ArrowLeft}
          onClick={() => navigate('/journey')}
        >
          Back to Timeline
        </Button>
        <span className="text-slate-300">/</span>
        <span className="text-xs font-semibold text-slate-500">
          Day {dayNumber} of 15
        </span>
      </div>

      {/* Day Overview Banner */}
      <div className="rounded-3xl bg-white border border-slate-200/80 p-6 sm:p-8 shadow-soft relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-glow">
                {dayNumber < 10 ? `0${dayNumber}` : dayNumber}
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                Milestone Overview
              </span>

              {isAllDone && (
                <Badge variant="success" icon={CheckCircle2}>
                  Milestone Completed
                </Badge>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {day?.title}
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {day?.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-medium text-slate-500">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-slate-400" />
                Est. Duration: {day?.estimatedTime || '45 mins'}
              </span>
              <span className="flex items-center gap-1.5 text-purple-600 font-bold">
                <Sparkles className="w-4 h-4" />
                +{day?.xp} XP Milestone Reward
              </span>
            </div>
          </div>

          {/* Progress Box */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 min-w-[260px]">
            <div className="flex justify-between items-center text-xs font-semibold text-slate-600 mb-2">
              <span>Day Completion</span>
              <span className="font-bold text-slate-900">{completedCount} / {totalCount} Done</span>
            </div>
            <ProgressBar value={completedCount} max={totalCount} color="blue" size="md" />
            <div className="mt-3 flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-200/60">
              <span className="font-bold text-blue-600">{progressPercent}% Completed</span>
              {isAllDone && (
                <span className="text-emerald-600 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Unlocked Next Day
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Activities Header */}
      <div className="flex items-center justify-between pt-2">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Required Activities</h2>
          <p className="text-xs text-slate-500">
            Complete all modules below in sequence to finish this day.
          </p>
        </div>

        <Badge variant="primary">
          {totalCount} Total Activities
        </Badge>
      </div>

      {/* Activity Cards List */}
      <div className="space-y-4">
        {activities.map((act) => (
          <ActivityCard
            key={act.id}
            activity={act}
            onOpen={handleOpenActivity}
          />
        ))}
      </div>

      {/* Interactive Modals */}
      {modalType === 'video' && activeActivity && (
        <VideoPlayerModal
          isOpen={true}
          onClose={handleCloseModal}
          activity={activeActivity}
          onComplete={handleCompleteActivity}
        />
      )}

      {modalType === 'reading' && activeActivity && (
        <ReadingViewerModal
          isOpen={true}
          onClose={handleCloseModal}
          activity={activeActivity}
          onComplete={handleCompleteActivity}
        />
      )}

      {modalType === 'challenge' && activeActivity && (
        <ChallengeModal
          isOpen={true}
          onClose={handleCloseModal}
          activity={activeActivity}
          onComplete={handleCompleteActivity}
        />
      )}

      {modalType === 'reflection' && activeActivity && (
        <ReflectionModal
          isOpen={true}
          onClose={handleCloseModal}
          activity={activeActivity}
          onComplete={handleCompleteActivity}
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
              handleCompleteActivity(activeActivity.id);
            }}
            onClose={handleCloseModal}
          />
        </Modal>
      )}

      <CompletionCelebrationModal
        isOpen={showCelebration}
        onClose={closeCelebration}
      />
    </div>
  );
}
