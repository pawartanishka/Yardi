import React from 'react';
import JourneyTimeline from '../../components/journey/JourneyTimeline';
import CompletionCelebrationModal from '../../components/journey/CompletionCelebrationModal';
import { useJourney } from '../../context/JourneyContext';

export default function Journey() {
  const { showCelebration, closeCelebration } = useJourney();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            15-Day LaunchPad Journey
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track your progression across all 15 pre-joining milestones
          </p>
        </div>
      </div>

      <JourneyTimeline />

      <CompletionCelebrationModal
        isOpen={showCelebration}
        onClose={closeCelebration}
      />
    </div>
  );
}
