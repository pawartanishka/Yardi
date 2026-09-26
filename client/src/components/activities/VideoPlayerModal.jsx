import React, { useState } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import { PlayCircle, CheckCircle2, Sparkles, BookOpen, Clock } from 'lucide-react';

export default function VideoPlayerModal({ isOpen, onClose, activity, onComplete }) {
  const [completed, setCompleted] = useState(activity?.status === 'completed');

  if (!activity) return null;

  const handleComplete = () => {
    setCompleted(true);
    onComplete(activity.id);
  };

  const takeaways = activity.content?.takeaways || [
    "Always provide complete context when pinging colleagues on Microsoft Teams.",
    "Document architectural decisions in shared squad repositories.",
    "Respect working hours across different regional time zones.",
    "Set realistic response expectations for asynchronous queries."
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={activity.title}
      subtitle={`Pre-Joining Video Guide • ${activity.duration || '12 mins'} • +${activity.xp || 80} XP`}
      maxWidth="max-w-3xl"
    >
      <div className="space-y-6">
        {/* Video Player Frame with Realistic Enterprise Player UI */}
        <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-lg flex items-center justify-center group">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent z-10 pointer-events-none" />

          {/* Fallback clean video display frame */}
          <div className="text-center p-6 z-20">
            <div className="w-16 h-16 rounded-full bg-blue-600/90 text-white flex items-center justify-center mx-auto mb-3 shadow-glow group-hover:scale-110 transition-transform cursor-pointer">
              <PlayCircle className="w-8 h-8 fill-white/20" />
            </div>
            <p className="text-sm font-semibold text-white">Yardi Academy • Stream Ready</p>
            <p className="text-xs text-slate-400 mt-1">High-Definition Enterprise Media Player</p>
          </div>

          {/* Player controls preview bar */}
          <div className="absolute bottom-3 left-4 right-4 z-20 flex items-center justify-between text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span>08:45 / {activity.duration || '12:00'}</span>
            </div>
            <span className="text-slate-400">1080p HD • Closed Captions (EN)</span>
          </div>
        </div>

        {/* Description & Overview */}
        <div className="space-y-2">
          <h4 className="text-sm font-bold text-slate-900">Module Overview</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            {activity.content?.overview || activity.description}
          </p>
        </div>

        {/* Key Takeaways */}
        <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-900">
            <BookOpen className="w-4 h-4 text-blue-600" />
            <span>Key Takeaways & Best Practices</span>
          </div>
          <ul className="space-y-2">
            {takeaways.map((takeaway, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                <span className="w-4 h-4 rounded-full bg-blue-200 text-blue-800 text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span>{takeaway}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Completion Action */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-purple-700 font-bold">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span>Earn +{activity.xp || 80} XP upon completion</span>
          </div>

          <div className="flex gap-2">
            <Button variant="ghost" size="md" onClick={onClose}>
              Close
            </Button>
            <Button
              variant={completed ? 'success' : 'primary'}
              size="md"
              icon={completed ? CheckCircle2 : CheckCircle2}
              onClick={handleComplete}
              disabled={completed}
            >
              {completed ? 'Completed ✓' : 'Mark as Complete'}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
