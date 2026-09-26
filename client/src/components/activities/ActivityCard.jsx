import React from 'react';
import {
  PlayCircle,
  BookOpen,
  HelpCircle,
  Sparkles,
  Edit3,
  CheckSquare,
  CheckCircle2,
  Clock,
  ArrowRight,
  Flame
} from 'lucide-react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import Button from '../common/Button';

export default function ActivityCard({ activity, onOpen }) {
  const isCompleted = activity.status === 'completed';
  const isInProgress = activity.status === 'in-progress';

  const getTypeMeta = (type) => {
    switch (type) {
      case 'video':
        return {
          label: 'Video Guide',
          icon: PlayCircle,
          color: 'text-blue-600 bg-blue-50 border-blue-200',
        };
      case 'reading':
        return {
          label: 'Reading Material',
          icon: BookOpen,
          color: 'text-indigo-600 bg-indigo-50 border-indigo-200',
        };
      case 'quiz':
        return {
          label: 'Knowledge Quiz',
          icon: HelpCircle,
          color: 'text-purple-600 bg-purple-50 border-purple-200',
        };
      case 'challenge':
        return {
          label: 'Interactive Challenge',
          icon: Sparkles,
          color: 'text-amber-600 bg-amber-50 border-amber-200',
        };
      case 'reflection':
        return {
          label: 'Reflection Task',
          icon: Edit3,
          color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
        };
      case 'checklist':
      default:
        return {
          label: 'Checklist Verification',
          icon: CheckSquare,
          color: 'text-teal-600 bg-teal-50 border-teal-200',
        };
    }
  };

  const meta = getTypeMeta(activity.type);
  const IconComponent = meta.icon;

  return (
    <Card
      className={`p-5 sm:p-6 transition-all duration-200 ${
        isCompleted
          ? 'bg-slate-50/60 border-emerald-200/80'
          : isInProgress
          ? 'bg-white border-blue-400 shadow-md ring-2 ring-blue-500/10'
          : 'bg-white border-slate-200/80 hover:border-slate-300'
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        {/* Left: Icon & Description */}
        <div className="flex items-start gap-4">
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 border ${meta.color}`}
          >
            <IconComponent className="w-6 h-6" />
          </div>

          <div className="space-y-1.5 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {meta.label}
              </span>
              {activity.isRequired && (
                <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/60">
                  Required
                </span>
              )}
            </div>

            <h4
              className={`text-base font-bold ${
                isCompleted ? 'text-slate-700 line-through decoration-emerald-500/50' : 'text-slate-900'
              }`}
            >
              {activity.title}
            </h4>

            <p className="text-xs text-slate-500 leading-relaxed max-w-xl">
              {activity.description}
            </p>

            <div className="flex items-center gap-4 pt-2 text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                {activity.duration || '10 mins'}
              </span>
              <span className="flex items-center gap-1.5 text-purple-600 font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                +{activity.xp || 50} XP
              </span>
            </div>
          </div>
        </div>

        {/* Right: Status badge & Action CTA */}
        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
          <div>
            {isCompleted ? (
              <Badge variant="success" icon={CheckCircle2}>
                Completed
              </Badge>
            ) : isInProgress ? (
              <Badge variant="primary" className="animate-pulse">
                In Progress
              </Badge>
            ) : (
              <Badge variant="default">Pending</Badge>
            )}
          </div>

          <Button
            variant={isCompleted ? 'outline' : 'primary'}
            size="sm"
            onClick={() => onOpen(activity)}
            icon={ArrowRight}
            iconPosition="right"
          >
            {isCompleted ? 'Review' : isInProgress ? 'Resume' : 'Start Task'}
          </Button>
        </div>
      </div>
    </Card>
  );
}
