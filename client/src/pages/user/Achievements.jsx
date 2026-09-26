import React, { useState } from 'react';
import {
  Trophy,
  Award,
  Lock,
  Sparkles,
  CheckCircle2,
  Calendar,
  Flame,
  Rocket,
  HeartHandshake,
  Zap,
  Compass,
  ShieldCheck
} from 'lucide-react';
import { useJourney } from '../../context/JourneyContext';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';

export default function Achievements() {
  const { badges } = useJourney();
  const [filter, setFilter] = useState('all'); // 'all', 'earned', 'locked'

  const earnedBadges = badges.filter((b) => b.earned);
  const lockedBadges = badges.filter((b) => !b.earned);

  const filteredBadges = badges.filter((b) => {
    if (filter === 'earned') return b.earned;
    if (filter === 'locked') return !b.earned;
    return true;
  });

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Rocket':
        return Rocket;
      case 'Flame':
        return Flame;
      case 'HeartHandshake':
        return HeartHandshake;
      case 'Zap':
        return Zap;
      case 'Compass':
        return Compass;
      case 'ShieldCheck':
        return ShieldCheck;
      case 'Trophy':
        return Trophy;
      case 'Award':
      default:
        return Award;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white p-6 sm:p-8 shadow-card relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/20 text-white text-xs font-bold border border-white/20">
              <Trophy className="w-3.5 h-3.5" />
              <span>LaunchPad Milestones & Rewards</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Badges & Achievements
            </h1>
            <p className="text-xs sm:text-sm text-amber-100 leading-relaxed">
              Earn distinctive badges by maintaining streaks, scoring high on quizzes, and conquering daily pre-joining challenges.
            </p>
          </div>

          <div className="bg-black/30 backdrop-blur-md rounded-2xl p-5 border border-white/10 text-left min-w-[220px]">
            <div className="text-xs font-semibold text-amber-200 mb-1">Total Unlocked</div>
            <div className="text-3xl font-black text-white">
              {earnedBadges.length} / {badges.length}
            </div>
            <div className="text-xs text-amber-200/80 mt-1">
              {Math.round((earnedBadges.length / badges.length) * 100)}% Badges Collected
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-2xl border border-slate-200/80 text-xs font-semibold w-fit">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 rounded-xl transition-all ${
            filter === 'all'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          All Badges ({badges.length})
        </button>
        <button
          onClick={() => setFilter('earned')}
          className={`px-3 py-1.5 rounded-xl transition-all ${
            filter === 'earned'
              ? 'bg-white text-amber-700 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Unlocked ({earnedBadges.length})
        </button>
        <button
          onClick={() => setFilter('locked')}
          className={`px-3 py-1.5 rounded-xl transition-all ${
            filter === 'locked'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Locked ({lockedBadges.length})
        </button>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {filteredBadges.map((badge) => {
          const IconComp = getIcon(badge.icon);

          return (
            <Card
              key={badge.id}
              className={`p-6 text-center space-y-4 transition-all duration-300 ${
                badge.earned
                  ? 'bg-white border-amber-200/80 shadow-soft hover:shadow-card hover:-translate-y-1'
                  : 'bg-slate-50/60 border-slate-200/60 opacity-60'
              }`}
            >
              {/* Badge Icon */}
              <div className="relative mx-auto w-16 h-16">
                {badge.earned ? (
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-300 text-amber-950 flex items-center justify-center shadow-md shadow-amber-400/20">
                    <IconComp className="w-8 h-8" />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-2xl bg-slate-200 text-slate-400 flex items-center justify-center">
                    <Lock className="w-7 h-7" />
                  </div>
                )}

                {badge.earned && (
                  <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </span>
                )}
              </div>

              {/* Title & Description */}
              <div>
                <h3 className="text-base font-bold text-slate-900">{badge.name}</h3>
                <p className="text-xs text-slate-500 leading-relaxed mt-1">
                  {badge.description}
                </p>
              </div>

              {/* Requirement & XP */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-400 font-medium truncate max-w-[120px]">
                  {badge.requirement}
                </span>
                <span className="font-bold text-purple-600 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  +{badge.xp} XP
                </span>
              </div>

              {badge.earned && badge.earnedAt && (
                <div className="text-[10px] text-emerald-700 bg-emerald-50 py-1 px-2 rounded-lg font-medium">
                  Earned {new Date(badge.earnedAt).toLocaleDateString()}
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
