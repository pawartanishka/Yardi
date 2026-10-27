import React, { useState } from 'react';
import { Sparkles, Trophy, CheckCircle2, Clock, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import ChallengeModal from '../../components/activities/ChallengeModal';
import { useJourney } from '../../context/JourneyContext';

export default function Challenges() {
  const { completeActivity } = useJourney();
  const [selectedChallenge, setSelectedChallenge] = useState(null);

  const challengesList = [
    {
      id: "act-5-3",
      dayId: "day-5",
      title: "Interactive Scenario: Conflict Resolution & Feedback",
      description: "Walk through a practical scenario where two squad members have differing code design preferences.",
      difficulty: "Intermediate",
      duration: "15 mins",
      xp: 100,
      status: "completed",
      type: "challenge",
      challengeData: {
        scenario: "You and a senior developer have differing opinions on how to structure a new REST API endpoint for tenant lease payments. The release deadline is in two days.",
        question: "Which sequence of actions best aligns with Yardi's collaborative culture?",
        options: [
          { id: "opt-1", text: "Push your code directly to production since you wrote the feature and know it best.", correct: false },
          { id: "opt-2", text: "Schedule a 15-minute sync with the senior engineer, present architectural trade-offs, and lean on documented squad standards.", correct: true },
          { id: "opt-3", text: "Immediately escalate the dispute to the Department Director to make the final call.", correct: false },
          { id: "opt-4", text: "Abandon your implementation completely without discussing the merits of your design.", correct: false }
        ],
        explanation: "Scheduling a brief 15-minute sync with objective trade-offs respects team members' expertise and squad standards while moving quickly toward delivery."
      }
    },
    {
      id: "act-12-1",
      dayId: "day-12",
      title: "Real-World Dilemma: Production Incident Response",
      description: "A staging database migration throws an unexpected deadlock during an offshore client demo.",
      difficulty: "Advanced",
      duration: "20 mins",
      xp: 150,
      status: "pending",
      type: "challenge",
      challengeData: {
        scenario: "During a client test migration, a script locks the tenant registry table. You have 30 minutes before client leadership logs in.",
        question: "What is your immediate first step according to Yardi Site Reliability Engineering SOP?",
        options: [
          { id: "opt-1", text: "Quietly kill the database cluster and restart it from scratch without informing anyone.", correct: false },
          { id: "opt-2", text: "Notify the on-call incident channel, post the status update with Jira tracking link, and initiate safe rollback.", correct: true },
          { id: "opt-3", text: "Ignore the alert hoping it will resolve once the client arrives.", correct: false },
          { id: "opt-4", text: "Send a direct email to the CEO apologizing for the outage.", correct: false }
        ],
        explanation: "Transparency and standard incident protocol via on-call channels ensure fast triage without introducing catastrophic data corruption."
      }
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900 text-white p-6 sm:p-8 shadow-card relative overflow-hidden">
        <div className="relative z-10 space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold border border-purple-400/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Workplace Simulations</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            LaunchPad Dilemmas & Challenges
          </h1>
          <p className="text-xs sm:text-sm text-purple-100 leading-relaxed">
            Test your real-world judgment and situational problem-solving in realistic engineering and client delivery scenarios.
          </p>
        </div>
      </div>

      {/* Challenges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {challengesList.map((ch) => (
          <Card key={ch.id} className="p-6 space-y-4 hover:shadow-card transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-100">
                {ch.difficulty}
              </span>

              {ch.status === 'completed' ? (
                <Badge variant="success" icon={CheckCircle2}>
                  Passed
                </Badge>
              ) : (
                <Badge variant="warning">Ready to Play</Badge>
              )}
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900">{ch.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed mt-1">
                {ch.description}
              </p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                {ch.duration}
              </span>
              <span className="font-bold text-purple-600 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                +{ch.xp} XP
              </span>
            </div>

            <Button
              variant={ch.status === 'completed' ? 'outline' : 'primary'}
              size="md"
              className="w-full"
              icon={ArrowRight}
              iconPosition="right"
              onClick={() => setSelectedChallenge(ch)}
            >
              {ch.status === 'completed' ? 'Review Simulation' : 'Launch Simulation'}
            </Button>
          </Card>
        ))}
      </div>

      {selectedChallenge && (
        <ChallengeModal
          isOpen={true}
          onClose={() => setSelectedChallenge(null)}
          activity={selectedChallenge}
          onComplete={(actId) => {
            completeActivity(selectedChallenge.dayId, actId);
          }}
        />
      )}
    </div>
  );
}
