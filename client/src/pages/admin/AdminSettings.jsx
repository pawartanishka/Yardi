import React, { useState } from 'react';
import { Settings, Save, CheckCircle2, Sliders, Bell, Shield, Sparkles } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

export default function AdminSettings() {
  const [autoUnlockNextDay, setAutoUnlockNextDay] = useState(true);
  const [streakGraceHours, setStreakGraceHours] = useState(24);
  const [dayCompletionXp, setDayCompletionXp] = useState(200);
  const [quizBonusMultiplier, setQuizBonusMultiplier] = useState(1.5);
  const [notifyManagerOnGraduation, setNotifyManagerOnGraduation] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            System & Journey Settings
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Configure gamification rules, automated unlocks, and notification policies
          </p>
        </div>

        {saved && (
          <span className="text-xs text-emerald-600 font-bold flex items-center gap-1 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
            <CheckCircle2 className="w-4 h-4" />
            Settings Saved
          </span>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Gamification rules */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <h3 className="text-base font-bold text-slate-900">Gamification & XP Rules</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Day Completion Bonus XP
              </label>
              <input
                type="number"
                value={dayCompletionXp}
                onChange={(e) => setDayCompletionXp(Number(e.target.value))}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-300"
              />
              <p className="text-[10px] text-slate-400 mt-1">Awarded when all activities of a day are completed</p>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Quiz Perfect Score Multiplier
              </label>
              <input
                type="number"
                step="0.1"
                value={quizBonusMultiplier}
                onChange={(e) => setQuizBonusMultiplier(Number(e.target.value))}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-300"
              />
              <p className="text-[10px] text-slate-400 mt-1">Multiplier for 100% quiz accuracy</p>
            </div>
          </div>
        </Card>

        {/* Journey progression rules */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Sliders className="w-5 h-5 text-blue-600" />
            <h3 className="text-base font-bold text-slate-900">Automation & Unlock Rules</h3>
          </div>

          <div className="space-y-3 text-xs">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={autoUnlockNextDay}
                onChange={(e) => setAutoUnlockNextDay(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <div>
                <span className="font-bold text-slate-800 block">Auto-unlock next day upon day completion</span>
                <span className="text-[11px] text-slate-500">Allows learners to progress immediately to Day N+1 once all mandatory tasks are done.</span>
              </div>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={notifyManagerOnGraduation}
                onChange={(e) => setNotifyManagerOnGraduation(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <div>
                <span className="font-bold text-slate-800 block">Notify Hiring Manager upon Day 15 graduation</span>
                <span className="text-[11px] text-slate-500">Sends automated readiness report to manager 48 hours prior to Day 1.</span>
              </div>
            </label>
          </div>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" variant="primary" size="md" icon={Save}>
            Save Platform Settings
          </Button>
        </div>
      </form>
    </div>
  );
}
