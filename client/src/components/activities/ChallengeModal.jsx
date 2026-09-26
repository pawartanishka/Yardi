import React, { useState } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import { Sparkles, CheckCircle2, AlertCircle, HelpCircle, ArrowRight } from 'lucide-react';

export default function ChallengeModal({ isOpen, onClose, activity, onComplete }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(activity?.status === 'completed');
  const [feedback, setFeedback] = useState(null);

  if (!activity) return null;

  const challengeData = activity.challengeData || {
    scenario: "You and a senior developer have differing opinions on how to structure a new REST API endpoint for tenant lease payments. The release deadline is in two days.",
    question: "Which sequence of actions best aligns with Yardi's collaborative culture?",
    options: [
      { id: "opt-1", text: "Push your code directly to production since you wrote the feature and know it best.", correct: false },
      { id: "opt-2", text: "Schedule a 15-minute sync with the senior engineer, present architectural trade-offs, and lean on documented squad standards.", correct: true },
      { id: "opt-3", text: "Immediately escalate the dispute to the Department Director to make the final call.", correct: false },
      { id: "opt-4", text: "Abandon your implementation completely without discussing the merits of your design.", correct: false }
    ],
    explanation: "Scheduling a brief 15-minute sync with objective trade-offs respects team members' expertise and squad standards while moving quickly toward delivery."
  };

  const handleSubmit = () => {
    if (selectedOption === null) return;
    const option = challengeData.options[selectedOption];
    setIsSubmitted(true);
    setFeedback({
      correct: option.correct,
      explanation: challengeData.explanation
    });

    if (option.correct) {
      onComplete(activity.id);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={activity.title}
      subtitle={`Interactive Decision Challenge • +${activity.xp || 100} XP`}
      maxWidth="max-w-2xl"
    >
      <div className="space-y-6">
        {/* Scenario Box */}
        <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-900 mb-2">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Real-World Workplace Scenario</span>
          </div>
          <p className="text-sm text-slate-800 leading-relaxed font-medium">
            "{challengeData.scenario}"
          </p>
        </div>

        {/* Question */}
        <div>
          <h4 className="text-sm font-bold text-slate-900 mb-3">
            {challengeData.question}
          </h4>

          {/* Options */}
          <div className="space-y-2.5">
            {challengeData.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              return (
                <div
                  key={opt.id || idx}
                  onClick={() => !isSubmitted && setSelectedOption(idx)}
                  className={`p-4 rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/60 text-blue-900 ring-2 ring-blue-500/20'
                      : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                  } ${isSubmitted ? 'cursor-default' : ''}`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center border ${
                        isSelected
                          ? 'border-blue-600 bg-blue-600 text-white'
                          : 'border-slate-300 text-slate-500 bg-white'
                      }`}
                    >
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{opt.text}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Feedback Section */}
        {feedback && (
          <div
            className={`p-4 rounded-2xl border ${
              feedback.correct
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : 'bg-rose-50 border-rose-200 text-rose-900'
            }`}
          >
            <div className="flex items-center gap-2 text-xs font-bold mb-1">
              {feedback.correct ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Correct Strategy! +{activity.xp || 100} XP Awarded</span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-4 h-4 text-rose-600" />
                  <span>Not quite the recommended approach. Review below:</span>
                </>
              )}
            </div>
            <p className="text-xs leading-relaxed">{feedback.explanation}</p>
          </div>
        )}

        {/* Actions */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <Button variant="ghost" size="md" onClick={onClose}>
            Close
          </Button>

          {!isSubmitted ? (
            <Button
              variant="primary"
              size="md"
              onClick={handleSubmit}
              disabled={selectedOption === null}
            >
              Submit Decision
            </Button>
          ) : (
            <Button variant="outline" size="md" onClick={onClose}>
              Done
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
}
