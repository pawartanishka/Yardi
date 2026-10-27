import React, { useState } from 'react';
import {
  Sparkles
} from 'lucide-react';
import { useJourney } from '../../context/JourneyContext';
import Card from '../../components/common/Card';
import BadgeMedallion from '../../components/common/BadgeMedallion';

export default function Achievements() {
  const { badges } = useJourney();
  const [filter, setFilter] = useState('all'); // 'all', 'earned', 'locked'

  // Clean badges data to ensure no legacy 'LaunchPad' text
  const cleanBadges = badges.map((b) => {
    let name = b.name;
    let description = b.description;
    if (b.id === 'badge-8' || name === 'LaunchPad Champion') {
      name = 'Yardi Onboarding Champion';
    }
    if (description && description.includes('LaunchPad')) {
      description = description.replace(/LaunchPad Journey/g, 'Pre-Joining Journey');
    }
    return {
      ...b,
      name,
      description,
    };
  });

  const earnedBadges = cleanBadges.filter((b) => b.earned);
  const lockedBadges = cleanBadges.filter((b) => !b.earned);

  const filteredBadges = cleanBadges.filter((b) => {
    if (filter === 'earned') return b.earned;
    if (filter === 'locked') return !b.earned;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Filter Tabs - Exact original design */}
      <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-2xl border border-slate-200/80 text-xs font-semibold w-fit">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 rounded-xl transition-all ${
            filter === 'all'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          All Badges ({cleanBadges.length})
        </button>
        <button
          onClick={() => setFilter('earned')}
          className={`px-3 py-1.5 rounded-xl transition-all ${
            filter === 'earned'
              ? 'bg-white text-slate-900 shadow-xs'
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

      {/* Badges Grid - Exact original card layout with mature medallions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {filteredBadges.map((badge) => {
          return (
            <Card
              key={badge.id || badge.badgeId}
              className={`p-6 text-center space-y-4 transition-all duration-300 ${
                badge.earned
                  ? 'bg-white border-slate-200/80 shadow-soft hover:shadow-card hover:-translate-y-1'
                  : 'bg-slate-50/60 border-slate-200/60 opacity-60'
              }`}
            >
              {/* Badge Emblem */}
              <div className="relative mx-auto flex items-center justify-center">
                <BadgeMedallion
                  badgeId={badge.id || badge.badgeId}
                  earned={badge.earned}
                  size="md"
                />
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
