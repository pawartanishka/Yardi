import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Sparkles,
  CheckCircle2,
  Lock,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import { useJourney } from '../../context/JourneyContext';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
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

export default function DayDetails() {
  const { dayId = 'day-1' } = useParams();
  const navigate = useNavigate();
  const {
    days,
    loadDayActivities,
    getDayActivities,
    completeActivity,
    showCelebration,
    closeCelebration
  } = useJourney();
  const { user } = useAuth();

  const dayNumber = parseInt(dayId.replace('day-', ''), 10) || 1;
  const day = days.find((d) => d.dayNumber === dayNumber);
  const activities = getDayActivities(dayId);

  const [activeActivity, setActiveActivity] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [quizLoading, setQuizLoading] = useState(false);

  // Load activities from MongoDB on mount / day change
  useEffect(() => {
    loadDayActivities(dayId);
  }, [dayId, loadDayActivities]);

  const isLocked = user?.role !== 'admin' && dayNumber > (user?.currentDay || 1);

  const completedCount = activities.filter((a) => a.status === 'completed').length;
  const totalCount = activities.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const isAllDone = totalCount > 0 && completedCount === totalCount;

  const handleOpenActivity = async (activity) => {
    setActiveActivity(activity);
    setModalType(activity.type);

    if (activity.type === 'quiz') {
      setQuizLoading(true);
      try {
        const quizId = activity.quizId || `quiz-day-${dayNumber}`;
        const res = await api.get(`/quizzes/${quizId}`);
        if (res.data && res.data.quiz) {
          setActiveQuiz(res.data.quiz);
        }
      } catch (err) {
        console.error('Failed to load quiz content:', err.message);
      } finally {
        setQuizLoading(false);
      }
    }
  };

  const handleCloseModal = () => {
    setActiveActivity(null);
    setModalType(null);
    setActiveQuiz(null);
  };

  const handleCompleteActivity = (actId, reflectionAnswer) => {
    completeActivity(dayId, actId, reflectionAnswer);
  };

  if (isLocked) {
    return (
      <div className="space-y-6 max-w-3xl mx-auto">
        <Button
          variant="outline"
          size="sm"
          icon={ArrowLeft}
          onClick={() => navigate('/journey')}
        >
          Back to Timeline
        </Button>

        <Card className="p-10 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 mx-auto flex items-center justify-center">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-slate-900">Milestone Locked</h2>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            Day {dayNumber} is scheduled for later in your journey. Complete all activities on Day {user?.currentDay || 1} to unlock this milestone.
          </p>
          <div className="pt-2">
            <Button
              variant="primary"
              size="md"
              onClick={() => navigate(`/journey/day-${user?.currentDay || 1}`)}
            >
              Go to Current Day ({user?.currentDay || 1})
            </Button>
          </div>
        </Card>
      </div>
    );
  }

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
              {day?.title || `Day ${dayNumber} Curriculum`}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              {day?.description}
            </p>

            <div className="flex items-center gap-4 pt-2 text-xs font-semibold text-slate-600">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-slate-400" />
                {day?.estimatedTime || '40 mins'}
              </span>
              <span className="flex items-center gap-1.5 text-purple-700">
                <Sparkles className="w-4 h-4 text-purple-500" />
                +{day?.xp || 300} XP Total
              </span>
            </div>
          </div>

          {/* Day Progress Ring / Bar */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 min-w-[240px]">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-2">
              <span>Day Completion</span>
              <span>{progressPercent}%</span>
            </div>

            <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-blue-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="text-[11px] text-slate-500 mt-2 font-medium">
              {completedCount} of {totalCount} activities finished
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
            key={act.id || act._id}
            activity={act}
            onOpen={handleOpenActivity}
          />
        ))}

        {activities.length === 0 && (
          <Card className="p-8 text-center text-slate-500 text-sm">
            No activities configured for this milestone.
          </Card>
        )}
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
          {quizLoading ? (
            <div className="p-10 text-center space-y-3">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="text-xs font-semibold text-slate-500">Loading assessment questions...</p>
            </div>
          ) : activeQuiz ? (
            <QuizPlayer
              quiz={activeQuiz}
              onComplete={({ score, total, percentage, xp }) => {
                handleCompleteActivity(activeActivity.id || activeActivity._id);
              }}
              onClose={handleCloseModal}
            />
          ) : (
            <div className="p-8 text-center text-slate-500">
              <p>Quiz content is not currently available.</p>
            </div>
          )}
        </Modal>
      )}

      <CompletionCelebrationModal
        isOpen={showCelebration}
        onClose={closeCelebration}
      />
    </div>
  );
}
