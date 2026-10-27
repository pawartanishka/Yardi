import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, Award, Flame, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import Button from '../common/Button';
import { useAuth } from '../../context/AuthContext';
import { useJourney } from '../../context/JourneyContext';

export default function CompletionCelebrationModal({ isOpen, onClose }) {
  const { user } = useAuth();
  const { badges } = useJourney();
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      // Fire sustained confetti bursts
      const duration = 3 * 1000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#2563EB', '#7C3AED', '#10B981', '#F59E0B'],
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#2563EB', '#7C3AED', '#10B981', '#F59E0B'],
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const earnedBadgesCount = badges.filter((b) => b.earned).length;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity" />

      <div className="flex min-h-full items-center justify-center p-4 text-center">
        <div className="relative transform overflow-hidden rounded-3xl bg-white text-left shadow-2xl transition-all max-w-lg w-full p-8 border border-slate-100 text-center animate-in zoom-in-95 duration-300">
          {/* Trophy Illustration */}
          <div className="relative mx-auto w-24 h-24 mb-6">
            <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-xl animate-pulse" />
            <div className="relative w-24 h-24 rounded-3xl bg-gradient-to-tr from-amber-500 to-yellow-400 flex items-center justify-center text-white shadow-xl shadow-amber-500/30">
              <Trophy className="w-12 h-12" />
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 mb-3">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Graduation Milestone</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-2">
            Congratulations, {user?.name || 'Explorer'}! 🎉
          </h2>
          <p className="text-sm text-slate-600 mb-8 max-w-sm mx-auto leading-relaxed">
            You have successfully completed your <span className="font-semibold text-slate-800">15-Day LaunchPad Pre-Joining Journey</span> at Yardi. You are primed and ready for Day 1!
          </p>

          {/* Stats Summary Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3">
              <div className="text-xs text-slate-500 font-semibold mb-1">Days</div>
              <div className="text-lg font-extrabold text-blue-600">15 / 15</div>
              <div className="text-[10px] text-slate-400">100% Done</div>
            </div>

            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3">
              <div className="text-xs text-slate-500 font-semibold mb-1">Total XP</div>
              <div className="text-lg font-extrabold text-purple-600">
                {(user?.xp || 4500).toLocaleString()}
              </div>
              <div className="text-[10px] text-slate-400">Master Level</div>
            </div>

            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3">
              <div className="text-xs text-slate-500 font-semibold mb-1">Badges</div>
              <div className="text-lg font-extrabold text-amber-600">{earnedBadgesCount} / 8</div>
              <div className="text-[10px] text-slate-400">Achievements</div>
            </div>

            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3">
              <div className="text-xs text-slate-500 font-semibold mb-1">Streak</div>
              <div className="text-lg font-extrabold text-emerald-600">15 Days</div>
              <div className="text-[10px] text-slate-400">Flawless</div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2.5">
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              icon={ArrowRight}
              iconPosition="right"
              onClick={() => {
                onClose();
                navigate('/dashboard');
              }}
            >
              Back to Dashboard
            </Button>

            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="md"
                onClick={() => {
                  onClose();
                  navigate('/progress');
                }}
              >
                View Analytics
              </Button>
              <Button
                variant="outline"
                size="md"
                onClick={() => {
                  onClose();
                  navigate('/achievements');
                }}
              >
                View Badges
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
