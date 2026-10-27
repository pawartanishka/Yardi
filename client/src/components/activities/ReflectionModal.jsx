import React, { useState } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import { Edit3, CheckCircle2, Sparkles } from 'lucide-react';

export default function ReflectionModal({ isOpen, onClose, activity, onComplete }) {
  const [reflectionText, setReflectionText] = useState('');
  const [isSaved, setIsSaved] = useState(activity?.status === 'completed');

  if (!activity) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!reflectionText.trim()) return;
    setIsSaved(true);
    onComplete(activity.id);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={activity.title}
      subtitle={`Self Reflection • +${activity.xp || 50} XP`}
      maxWidth="max-w-xl"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 mb-1.5">
            <Edit3 className="w-4 h-4 text-emerald-600" />
            <span>Prompt for Reflection</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
            {activity.reflectionPrompt || "What is one communication habit you want to practice during your first month at Yardi?"}
          </p>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-2">
            Your Reflection Notes
          </label>
          <textarea
            rows={5}
            disabled={isSaved}
            value={reflectionText}
            onChange={(e) => setReflectionText(e.target.value)}
            placeholder="Type your thoughts, goals, and commitments here..."
            className="w-full text-xs sm:text-sm rounded-xl border border-slate-300 p-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-slate-50"
          />
        </div>

        {isSaved && (
          <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Reflection recorded successfully! +{activity.xp || 50} XP added.</span>
          </div>
        )}

        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
          <Button variant="ghost" size="md" onClick={onClose}>
            Close
          </Button>

          {!isSaved ? (
            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={!reflectionText.trim()}
            >
              Save Reflection
            </Button>
          ) : (
            <Button variant="outline" size="md" onClick={onClose}>
              Done
            </Button>
          )}
        </div>
      </form>
    </Modal>
  );
}
