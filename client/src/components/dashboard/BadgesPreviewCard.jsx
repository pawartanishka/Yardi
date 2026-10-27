import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, ArrowRight, Award, Lock, Sparkles } from 'lucide-react';
import Card from '../common/Card';
import Badge from '../common/Badge';

export default function BadgesPreviewCard({ badges = [] }) {
  const earnedBadges = badges.filter((b) => b.earned);

  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
            <Trophy className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Achievements</h3>
            <p className="text-[11px] text-slate-500">Unlocked badges and milestones</p>
          </div>
        </div>

        <Link
          to="/achievements"
          className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
        >
          <span>View All ({badges.length})</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {badges.slice(0, 4).map((badge) => (
          <div
            key={badge.id}
            className={`p-3 rounded-2xl border text-center transition-all ${
              badge.earned
                ? 'bg-amber-50/50 border-amber-200/80 shadow-2xs hover:shadow-xs'
                : 'bg-slate-50/60 border-slate-200/60 opacity-60'
            }`}
          >
            <div
              className={`w-10 h-10 rounded-xl mx-auto flex items-center justify-center mb-2 ${
                badge.earned
                  ? 'bg-amber-400 text-amber-950 shadow-sm'
                  : 'bg-slate-200 text-slate-400'
              }`}
            >
              {badge.earned ? <Award className="w-5 h-5" /> : <Lock className="w-4 h-4" />}
            </div>

            <p className="text-xs font-bold text-slate-800 truncate mb-0.5">
              {badge.name}
            </p>
            <p className="text-[10px] text-slate-500 line-clamp-1">
              +{badge.xp} XP
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}
