import React, { useState } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import { BookOpen, CheckCircle2, Sparkles, Clock, FileText } from 'lucide-react';

export default function ReadingViewerModal({ isOpen, onClose, activity, onComplete }) {
  const [completed, setCompleted] = useState(activity?.status === 'completed');

  if (!activity) return null;

  const handleComplete = () => {
    setCompleted(true);
    onComplete(activity.id);
  };

  const sections = activity.content?.sections || [
    {
      heading: "1. The 3 Pillars of Written Updates",
      text: "Every update should include: What was accomplished, what is in progress, and any active blockers or dependencies. Be succinct, quantify results, and tag team members who need to take action."
    },
    {
      heading: "2. Meeting Hygiene & Purpose",
      text: "No meeting without an agenda. If a topic can be resolved via an email or a shared document discussion in under 10 minutes, skip the call and protect focus time."
    },
    {
      heading: "3. Giving & Receiving Constructive Feedback",
      text: "Feedback is a gift that accelerates personal and team growth. Frame code reviews and architectural critique around problem-solving rather than individual personalities."
    }
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={activity.title}
      subtitle={`Structured Reading • ${activity.duration || '15 mins'} • +${activity.xp || 70} XP`}
      maxWidth="max-w-3xl"
    >
      <div className="space-y-6">
        {/* Header meta badge */}
        <div className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200/80 rounded-2xl text-xs text-slate-600">
          <FileText className="w-4 h-4 text-blue-600 flex-shrink-0" />
          <span>
            Required Pre-Joining Material • Read thoroughly to prepare for the Day 5 knowledge assessment.
          </span>
        </div>

        {/* Reading Article Body */}
        <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 space-y-5 leading-relaxed bg-white border border-slate-100 p-5 rounded-2xl max-h-[50vh] overflow-y-auto">
          <p className="font-medium text-slate-800 border-l-4 border-blue-600 pl-3 py-1 bg-blue-50/40 rounded-r-lg">
            {activity.content?.overview || activity.description}
          </p>

          {sections.map((section, idx) => (
            <div key={idx} className="space-y-1.5">
              <h4 className="text-sm font-bold text-slate-900">{section.heading}</h4>
              <p className="text-slate-600">{section.text}</p>
            </div>
          ))}
        </div>

        {/* Footer completion */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-purple-700 font-bold">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span>Earn +{activity.xp || 70} XP</span>
          </div>

          <div className="flex gap-2">
            <Button variant="ghost" size="md" onClick={onClose}>
              Close
            </Button>
            <Button
              variant={completed ? 'success' : 'primary'}
              size="md"
              icon={CheckCircle2}
              onClick={handleComplete}
              disabled={completed}
            >
              {completed ? 'Completed ✓' : 'Mark as Read & Complete'}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
