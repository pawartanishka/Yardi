import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Compass,
  Search,
  Settings,
  TrendingUp,
  Zap,
  Lightbulb,
  PieChart,
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  Building2,
  Calendar,
  Sparkles,
  Flame,
  CheckCircle2,
  Users,
  Award,
  Layers,
  MapPin,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useJourney } from '../../context/JourneyContext';
import YardiLogo from '../../components/common/YardiLogo';
import VideoPlayerModal from '../../components/activities/VideoPlayerModal';
import ReadingViewerModal from '../../components/activities/ReadingViewerModal';
import ChallengeModal from '../../components/activities/ChallengeModal';
import ReflectionModal from '../../components/activities/ReflectionModal';
import QuizPlayer from '../../components/quiz/QuizPlayer';
import Modal from '../../components/common/Modal';
import CompletionCelebrationModal from '../../components/journey/CompletionCelebrationModal';
import { mockQuizDay5 } from '../../data/mockData';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const {
    days,
    badges,
    showCelebration,
    closeCelebration,
    getDayActivities,
    completeActivity,
  } = useJourney();

  const currentDayNum = user?.currentDay || 5;
  const currentDayId = `day-${currentDayNum}`;
  const currentDay = days.find((d) => d.dayNumber === currentDayNum) || days[4];
  const activities = getDayActivities(currentDayId);

  // Active modal state
  const [activeActivity, setActiveActivity] = useState(null);
  const [modalType, setModalType] = useState(null);

  const handleOpenActivity = (activity) => {
    setActiveActivity(activity);
    setModalType(activity.type);
  };

  const handleCloseModal = () => {
    setActiveActivity(null);
    setModalType(null);
  };

  const handleActivityComplete = (activityId) => {
    completeActivity(currentDayId, activityId);
  };

  // Section 1: Top 3 Hero Cards (Aligned with image: Business Strategy, Market Research, Resource Optimization)
  const coreStrategyCards = [
    {
      title: "Business Strategy & Journey",
      subtitle: `Day ${currentDayNum}: ${currentDay?.title || 'Communication & Collaboration'}`,
      description: "Structured corporate progression roadmap aligning your technical capabilities with Yardi client property solutions.",
      icon: Compass,
      actionText: "Resume Roadmap",
      actionPath: `/journey/${currentDayId}`,
      badge: "Current Milestone",
      badgeColor: "bg-blue-50 text-blue-700 border-blue-200"
    },
    {
      title: "Market Research & Knowledge",
      subtitle: "Verified Pre-Joining Assessments",
      description: "Validate compliance, cybersecurity protocols, and cloud architecture standards before Day 1 reporting.",
      icon: Search,
      actionText: "Start Knowledge Check",
      actionClick: () => {
        const quizAct = activities.find(a => a.type === 'quiz') || {
          id: 'act-quiz-default',
          title: 'Communication & Ethics Check',
          type: 'quiz'
        };
        handleOpenActivity(quizAct);
      },
      badge: "Quiz Ready",
      badgeColor: "bg-purple-50 text-purple-700 border-purple-200"
    },
    {
      title: "Resource Optimization",
      subtitle: `${user?.xp || 1450} XP • ${user?.currentStreak || 5}-Day Streak`,
      description: "Track your onboarding velocity, earned milestone badges, and squad integration readiness indices.",
      icon: Settings,
      actionText: "View Achievements",
      actionPath: "/achievements",
      badge: "Top 5% Cohort",
      badgeColor: "bg-amber-50 text-amber-700 border-amber-200"
    }
  ];

  // Section 2: 4 Consulting Focus Pillars (Growth, Efficiency, Innovation, Analysis)
  const focusPillars = [
    {
      id: "growth",
      name: "Growth",
      tagline: "Career Velocity & Mentorship",
      description: "Fast-track technical mastery through Yardi University pathways, leadership shadowing, and assigned squad buddies.",
      icon: TrendingUp,
      actionText: "Explore Growth",
      link: "/progress"
    },
    {
      id: "efficiency",
      name: "Efficiency",
      tagline: "Asynchronous Workflows",
      description: "Streamline communication across global regions (PST, EST, IST, CET) with documentation-first hygiene.",
      icon: Zap,
      actionText: "Read Playbook",
      actionClick: () => {
        const readAct = activities.find(a => a.type === 'reading') || activities[0];
        if (readAct) handleOpenActivity(readAct);
      }
    },
    {
      id: "innovation",
      name: "Innovation",
      tagline: "Enterprise Cloud Solutions",
      description: "Architect scalable multi-tenant solutions across commercial, residential, and investment asset management.",
      icon: Lightbulb,
      actionText: "View Challenges",
      link: "/challenges"
    },
    {
      id: "analysis",
      name: "Analysis",
      tagline: "Real-World Dilemma Solving",
      description: "Exercise critical situational judgment through simulated engineering rollbacks and client escalation scenarios.",
      icon: PieChart,
      actionText: "Solve Dilemma",
      actionClick: () => {
        const challAct = activities.find(a => a.type === 'challenge') || activities[2];
        if (challAct) handleOpenActivity(challAct);
      }
    }
  ];

  // Section 3: Recent Projects / Day Modules (Matching bottom 3 cards of attached design)
  const recentProjects = [
    {
      id: "proj-1",
      title: "Strategic Growth Planning",
      category: "Culture & Values Ethos",
      summary: "Understand Yardi 40+ year legacy: taking care of clients, employees, and community philanthropy.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600",
      dayRef: "Day 3 Completed",
      status: "Completed",
      link: "/journey/day-3"
    },
    {
      id: "proj-2",
      title: "Market Insights & Analysis",
      category: "Asynchronous Squad Collaboration",
      summary: "Mastering Jira ticket workflows, Teams channel etiquettes, and transparent pull request reviews.",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600",
      dayRef: "Day 5 In Progress",
      status: "Active Today",
      link: `/journey/${currentDayId}`
    },
    {
      id: "proj-3",
      title: "Operational Efficiency",
      category: "Workplace Tools & Security SOP",
      summary: "Cloud toolchains, SOC2 data privacy guidelines, zero-trust infrastructure, and Day 1 checklist.",
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=600",
      dayRef: "Day 6 Unlocking Soon",
      status: "Upcoming",
      link: "/journey/day-6"
    }
  ];

  return (
    <div className="-m-4 sm:-m-6 lg:-m-8 bg-[#F4F6F9] min-h-screen text-slate-800 font-sans">
      
      {/* =========================================================================
          HERO BANNER: Full-width modern architectural background
          Matches the attached image with modern corporate city towers & bold typography
          ========================================================================= */}
      <section className="relative w-full bg-slate-950 text-white overflow-hidden pb-32 sm:pb-36 pt-10 sm:pt-16 px-6 sm:px-12 lg:px-20">
        {/* Background Skyline Image with Corporate Blue Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000"
            alt="Corporate Architecture"
            className="w-full h-full object-cover object-center opacity-35 filter brightness-75 contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-blue-950/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
        </div>

        {/* Hero Top Sub-Nav in Corporate Style */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pb-12 border-b border-white/10">
          <div className="flex items-center gap-3">
            <YardiLogo className="h-8" variant="white" />
            <span className="hidden sm:inline-block h-5 w-px bg-white/20" />
            <span className="text-xs uppercase tracking-widest text-blue-300 font-semibold">
              LaunchPad Consulting Platform
            </span>
          </div>

          <div className="flex items-center gap-6 text-xs font-semibold tracking-wide text-slate-300">
            <Link to="/journey" className="hover:text-white transition-colors">Journey</Link>
            <Link to="/challenges" className="hover:text-white transition-colors">Challenges</Link>
            <Link to="/achievements" className="hover:text-white transition-colors">Achievements</Link>
            <Link to="/progress" className="hover:text-white transition-colors">Analytics</Link>
            <Link
              to="/profile"
              className="px-4 py-1.5 rounded-md bg-blue-600/80 hover:bg-blue-600 text-white font-bold transition-all border border-blue-400/30 shadow-sm"
            >
              Candidate Portal
            </Link>
          </div>
        </div>

        {/* Hero Headline & Subtext */}
        <div className="relative z-10 max-w-3xl pt-12 sm:pt-16 space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-400/30 backdrop-blur-md">
            <Building2 className="w-3.5 h-3.5 text-blue-400" />
            <span>Yardi Enterprise Onboarding Ecosystem</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-tight">
            Empowering Business <br />
            <span className="font-extrabold text-white">Success.</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-200/90 font-light max-w-xl leading-relaxed">
            Elevate your pre-joining journey with structured engineering modules, interactive culture playbooks, and Day 1 readiness.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Link
              to={`/journey/${currentDayId}`}
              className="px-6 py-3 rounded-md bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold text-sm shadow-lg transition-all"
            >
              Resume Day {currentDayNum}
            </Link>

            <Link
              to="/journey"
              className="px-6 py-3 rounded-md bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 backdrop-blur-md transition-all"
            >
              Explore 15-Day Roadmap
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          FLOATING SECTION: 3 Prominent White Feature Cards
          Directly matches the 3 elevated cards overlapping the hero in the reference image
          ========================================================================= */}
      <section className="relative z-20 max-w-7xl mx-auto px-6 sm:px-12 -mt-20 sm:-mt-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {coreStrategyCards.map((card, idx) => {
            const IconComponent = card.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl p-8 sm:p-10 shadow-xl border border-slate-200/90 flex flex-col justify-between hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 text-center group"
              >
                <div>
                  {/* Circular Icon with Outline */}
                  <div className="w-16 h-16 rounded-full border-2 border-slate-800 text-slate-800 flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 group-hover:border-blue-600 group-hover:text-white transition-all duration-300">
                    <IconComponent className="w-7 h-7" />
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {card.title}
                  </h3>

                  <p className="text-xs font-semibold text-blue-700 mb-3 uppercase tracking-wider">
                    {card.subtitle}
                  </p>

                  <p className="text-xs text-slate-600 leading-relaxed font-normal mb-8">
                    {card.description}
                  </p>
                </div>

                <div>
                  {card.actionPath ? (
                    <Link
                      to={card.actionPath}
                      className="inline-block w-full py-2.5 px-4 rounded-md bg-[#4A7298] hover:bg-[#3B5E80] text-white text-xs font-bold tracking-wide transition-all shadow-sm"
                    >
                      {card.actionText}
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={card.actionClick}
                      className="w-full py-2.5 px-4 rounded-md bg-[#4A7298] hover:bg-[#3B5E80] text-white text-xs font-bold tracking-wide transition-all shadow-sm cursor-pointer"
                    >
                      {card.actionText}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: "OUR CONSULTING FOCUS" (4 Pillars)
          Directly matches the middle 4-column section of the attached design:
          Growth, Efficiency, Innovation, Analysis
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 py-20 sm:py-24 text-center">
        <div className="mb-14 space-y-2">
          <p className="text-xs font-extrabold uppercase tracking-widest text-[#4A7298]">
            Pre-Joining Competency Roadmap
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            OUR CONSULTING FOCUS
          </h2>
          <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full mt-3" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {focusPillars.map((pillar) => {
            const PillarIcon = pillar.icon;
            return (
              <div
                key={pillar.id}
                className="bg-white rounded-xl p-8 border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between text-center group"
              >
                <div>
                  <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform">
                    <PillarIcon className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-1">
                    {pillar.name}
                  </h3>

                  <p className="text-[11px] font-semibold text-slate-500 mb-3 uppercase tracking-wider">
                    {pillar.tagline}
                  </p>

                  <p className="text-xs text-slate-600 leading-relaxed font-normal mb-6">
                    {pillar.description}
                  </p>
                </div>

                <div>
                  {pillar.link ? (
                    <Link
                      to={pillar.link}
                      className="inline-block w-full py-2 px-3 rounded border border-slate-300 hover:border-blue-600 text-slate-700 hover:text-blue-700 text-xs font-bold transition-all"
                    >
                      {pillar.actionText}
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={pillar.actionClick}
                      className="w-full py-2 px-3 rounded border border-slate-300 hover:border-blue-600 text-slate-700 hover:text-blue-700 text-xs font-bold transition-all cursor-pointer"
                    >
                      {pillar.actionText}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: "RECENT PROJECTS" (Milestone Showcase)
          Matches the bottom dark cards with photographic headers in the attached image
          ========================================================================= */}
      <section className="relative bg-slate-950 text-white py-20 px-6 sm:px-12 lg:px-20 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-14 space-y-2">
            <p className="text-xs font-extrabold uppercase tracking-widest text-blue-400">
              Interactive Case Studies & Milestones
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase">
              Recent Projects & Scenarios
            </h2>
            <div className="w-16 h-1 bg-blue-500 mx-auto rounded-full mt-3" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-xl overflow-hidden shadow-2xl flex flex-col justify-between text-slate-900 group"
              >
                <div>
                  {/* Photo Header */}
                  <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded bg-black/60 backdrop-blur-md text-white text-[10px] font-bold tracking-wider uppercase">
                      {project.status}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-2">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-600">
                      {project.category}
                    </span>

                    <h3 className="text-base font-bold text-slate-900">
                      {project.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {project.summary}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    to={project.link}
                    className="block w-full text-center py-2.5 rounded bg-[#4A7298] hover:bg-[#3B5E80] text-white text-xs font-bold transition-all shadow-sm"
                  >
                    View Project
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Quick stats footer inside the section */}
          <div className="mt-16 pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Current Candidate: <strong className="text-white">{user?.name || 'Alex Rivera'}</strong></span>
            </div>

            <div className="flex items-center gap-6">
              <span>Overall Completion: <strong className="text-blue-400">{user?.overallProgress || 42}%</strong></span>
              <span>Total Points: <strong className="text-purple-400">{user?.xp || 1450} XP</strong></span>
              <span>Active Streak: <strong className="text-amber-400">{user?.currentStreak || 5} Days</strong></span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          MODALS & DELIGHTERS
          ========================================================================= */}
      {modalType === 'video' && activeActivity && (
        <VideoPlayerModal
          isOpen={true}
          onClose={handleCloseModal}
          activity={activeActivity}
          onComplete={handleActivityComplete}
        />
      )}

      {modalType === 'reading' && activeActivity && (
        <ReadingViewerModal
          isOpen={true}
          onClose={handleCloseModal}
          activity={activeActivity}
          onComplete={handleActivityComplete}
        />
      )}

      {modalType === 'challenge' && activeActivity && (
        <ChallengeModal
          isOpen={true}
          onClose={handleCloseModal}
          activity={activeActivity}
          onComplete={handleActivityComplete}
        />
      )}

      {modalType === 'reflection' && activeActivity && (
        <ReflectionModal
          isOpen={true}
          onClose={handleCloseModal}
          activity={activeActivity}
          onComplete={handleActivityComplete}
        />
      )}

      {modalType === 'quiz' && activeActivity && (
        <Modal
          isOpen={true}
          onClose={handleCloseModal}
          title=""
          maxWidth="max-w-3xl"
        >
          <QuizPlayer
            quiz={mockQuizDay5}
            onComplete={({ score, total, percentage, xp }) => {
              handleActivityComplete(activeActivity.id);
            }}
            onClose={handleCloseModal}
          />
        </Modal>
      )}

      <CompletionCelebrationModal
        isOpen={showCelebration}
        onClose={closeCelebration}
      />
    </div>
  );
}
