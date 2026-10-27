import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowRight, CheckCircle2, Sparkles, Clock } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';
import ProgressBar from '../common/ProgressBar';

export default function JourneyStatusCard({ day, activities = [] }) {
  const currentDay = day || {
    dayNumber: 5,
    title: 'Communication & Collaboration',
    description: 'Master modern workplace collaboration, async communication, and feedback loops.',
    estimatedTime: '50 mins',
    xp: 400,
  };

  const completedActivities = activities.filter((a) => a.status === 'completed').length;
  const totalActivities = activities.length || 5;

  return (
    <Card className="p-6 bg-white border-blue-100 shadow-soft relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-2xl pointer-events-none -mr-8 -mt-8" />

      <div className="relative z-10 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-glow">
              {currentDay.dayNumber < 10 ? `0${currentDay.dayNumber}` : currentDay.dayNumber}
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
              Active Milestone
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-purple-700 font-bold bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200">
            <Sparkles className="w-3.5 h-3.5" />
            <span>+{currentDay.xp || 400} XP Available</span>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-900 mb-1">
            Day {currentDay.dayNumber}: {currentDay.title}
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
            {currentDay.description}
          </p>
        </div>

        <div>
          <div className="flex justify-between items-center text-xs font-semibold text-slate-600 mb-1.5">
            <span>Progress: {completedActivities} of {totalActivities} activities completed</span>
            <span>{Math.round((completedActivities / totalActivities) * 100)}%</span>
          </div>
          <ProgressBar value={completedActivities} max={totalActivities} color="blue" size="md" />
        </div>

        <div className="pt-2 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Clock className="w-3.5 h-3.5" />
            <span>Est. {currentDay.estimatedTime || '45 mins'}</span>
          </div>

          <Link to={`/journey/day-${currentDay.dayNumber}`}>
            <Button
              variant="primary"
              size="md"
              icon={ArrowRight}
              iconPosition="right"
            >
              Continue Journey
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}
