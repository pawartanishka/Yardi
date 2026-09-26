import React from 'react';
import { CheckCircle2, Circle, ArrowRight, Sparkles, Clock, CheckSquare } from 'lucide-react';
import Card from '../common/Card';
import Badge from '../common/Badge';

export default function TodayTasksCard({ activities = [], onOpenActivity }) {
  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
            <CheckSquare className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Today's Activities</h3>
            <p className="text-[11px] text-slate-500">Day 5 Milestones checklist</p>
          </div>
        </div>

        <Badge variant="primary">
          {activities.filter((a) => a.status === 'completed').length} / {activities.length} Done
        </Badge>
      </div>

      <div className="space-y-2.5">
        {activities.map((act) => {
          const isDone = act.status === 'completed';

          return (
            <div
              key={act.id}
              onClick={() => onOpenActivity(act)}
              className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                isDone
                  ? 'bg-slate-50/70 border-slate-200/60 hover:bg-slate-100/60'
                  : 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-xs'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                {isDone ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-300 flex-shrink-0 hover:text-blue-500" />
                )}

                <div className="min-w-0">
                  <p
                    className={`text-xs font-semibold truncate ${
                      isDone ? 'text-slate-500 line-through' : 'text-slate-800'
                    }`}
                  >
                    {act.title}
                  </p>
                  <div className="flex items-center gap-2 text-[10px] text-slate-400">
                    <span>{act.type?.toUpperCase()}</span>
                    <span>•</span>
                    <span className="flex items-center gap-0.5">
                      <Clock className="w-3 h-3" />
                      {act.duration}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-xs font-bold text-purple-600 flex items-center gap-0.5">
                  <Sparkles className="w-3 h-3" />
                  +{act.xp} XP
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
