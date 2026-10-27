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
  ShieldCheck,
  Building2,
  Calendar,
  CheckCircle2,
  Users,
  Award,
  Layers,
  MapPin,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useJourney } from '../../context/JourneyContext';
import VideoPlayerModal from '../../components/activities/VideoPlayerModal';
import ReadingViewerModal from '../../components/activities/ReadingViewerModal';
import ChallengeModal from '../../components/activities/ChallengeModal';
import ReflectionModal from '../../components/activities/ReflectionModal';
import QuizPlayer from '../../components/quiz/QuizPlayer';
import Modal from '../../components/common/Modal';
import CompletionCelebrationModal from '../../components/journey/CompletionCelebrationModal';
import api from '../../services/api';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const {
    days,
    showCelebration,
    closeCelebration,
    loadDayActivities,
    getDayActivities,
    completeActivity,
  } = useJourney();

  const currentDayNum = user?.currentDay || 1;
  const currentDayId = `day-${currentDayNum}`;
  const currentDay = days.find((d) => d.dayNumber === currentDayNum) || days[0];
  const activities = getDayActivities(currentDayId);

  // Active modal state
  const [activeActivity, setActiveActivity] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [quizLoading, setQuizLoading] = useState(false);

  React.useEffect(() => {
    loadDayActivities(currentDayId);
  }, [currentDayId, loadDayActivities]);

  const handleOpenActivity = async (activity) => {
    setActiveActivity(activity);
    setModalType(activity.type);

    if (activity.type === 'quiz') {
      setQuizLoading(true);
      try {
        const quizId = activity.quizId || `quiz-day-${currentDayNum}`;
        const res = await api.get(`/quizzes/${quizId}`);
        if (res.data && res.data.quiz) {
          setActiveQuiz(res.data.quiz);
        }
      } catch (err) {
        console.error('Failed to load quiz content:', err.message);
      } finally {
        setQuizLoading(false);
      }
    }
  };

  const handleCloseModal = () => {
    setActiveActivity(null);
    setModalType(null);
    setActiveQuiz(null);
  };

  const handleActivityComplete = (activityId, reflectionAnswer) => {
    completeActivity(currentDayId, activityId, reflectionAnswer);
  };

  // Section 1: Top 3 Hero Cards (Matches reference consulting layout: Business Strategy, Market Research, Resource Optimization)
  const coreStrategyCards = [
    {
      title: "Business Strategy",
      subtitle: `Day ${currentDayNum}: ${currentDay?.title || 'Communication & Collaboration'}`,
      description: "Explore Yardi corporate history, cross-functional squads, and core real estate client service standards.",
      icon: Compass,
      actionText: "Learn More",
      actionPath: `/journey/${currentDayId}`
    },
    {
      title: "Market Research",
      subtitle: "Enterprise Standards & Compliance",
      description: "Review security protocols, SOC-2 data governance, and cloud platform best practices before Day 1.",
      icon: Search,
      actionText: "Learn More",
      actionClick: () => {
        const quizAct = activities.find(a => a.type === 'quiz') || {
          id: 'act-quiz-default',
          title: 'Communication & Ethics Check',
          type: 'quiz'
        };
        handleOpenActivity(quizAct);
      }
    },
    {
      title: "Resource Optimization",
      subtitle: "Operational Readiness & Tools",
      description: "Verify development toolchains, communication channels, and squad collaboration frameworks.",
      icon: Settings,
      actionText: "Learn More",
      actionPath: "/journey"
    }
  ];

  // Section 2: 4 Consulting Focus Pillars (Growth, Efficiency, Innovation, Analysis)
  const focusPillars = [
    {
      id: "growth",
      name: "Growth",
      tagline: "Career Pathways & Mentorship",
      description: "Structured technical learning pathways, leadership shadowing, and designated onboarding buddy pairings.",
      icon: TrendingUp,
      actionText: "Learn More",
      link: "/progress"
    },
    {
      id: "efficiency",
      name: "Efficiency",
      tagline: "Asynchronous Workflows",
      description: "Streamline cross-regional team collaboration with documentation-first communication norms.",
      icon: Zap,
      actionText: "Learn More",
      actionClick: () => {
        const readAct = activities.find(a => a.type === 'reading') || activities[0];
        if (readAct) handleOpenActivity(readAct);
      }
    },
    {
      id: "innovation",
      name: "Innovation",
      tagline: "Enterprise Cloud Platforms",
      description: "Scalable multi-tenant cloud architectures powering commercial, residential, and investment asset management.",
      icon: Lightbulb,
      actionText: "Learn More",
      link: "/journey"
    },
    {
      id: "analysis",
      name: "Analysis",
      tagline: "Operational Problem Solving",
      description: "Real-world incident response protocols, code review standards, and client-centric decision making.",
      icon: PieChart,
      actionText: "Learn More",
      actionClick: () => {
        const challAct = activities.find(a => a.type === 'challenge') || activities[2];
        if (challAct) handleOpenActivity(challAct);
      }
    }
  ];

  // Section 3: Recent Projects / Day Modules
  const recentProjects = [
    {
      id: "proj-1",
      title: "Strategic Growth Planning",
      category: "Culture & Values Ethos",
      summary: "Explore Yardi 40-year heritage: taking care of clients, employees, and community philanthropy.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600",
      status: "Milestone",
      link: "/journey/day-3"
    },
    {
      id: "proj-2",
      title: "Market Insights & Analysis",
      category: "Squad Collaboration & Delivery",
      summary: "Mastering Jira ticket workflows, Microsoft Teams hygiene, and constructive pull request reviews.",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600",
      status: "In Progress",
      link: `/journey/${currentDayId}`
    },
    {
      id: "proj-3",
      title: "Operational Efficiency",
      category: "Workplace Tools & Security SOP",
      summary: "Enterprise cloud environments, data privacy protocols, zero-trust infrastructure, and Day 1 checklist.",
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=600",
      status: "Upcoming",
      link: "/journey/day-6"
    }
  ];

  return (
    <div className="w-full bg-[#F4F6F9] min-h-full text-slate-800 font-sans pb-16">
      
      {/* =========================================================================
          HERO BANNER: Full-width corporate architectural skyline
          ========================================================================= */}
      <section className="relative w-full bg-slate-950 text-white overflow-hidden pb-32 sm:pb-36 pt-14 sm:pt-18 px-6 sm:px-12 lg:px-16">
        {/* Background Architectural Skyline */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000"
            alt="Corporate Architecture"
            className="w-full h-full object-cover object-center opacity-40 filter brightness-75 contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-blue-950/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
        </div>

        {/* Hero Headline & Subtext */}
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-semibold backdrop-blur-sm">
            <Building2 className="w-3.5 h-3.5 text-blue-400" />
            <span>Yardi Systems • Enterprise Onboarding</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-tight">
            Empowering Business <br />
            <span className="font-extrabold text-white">Success</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-200/90 font-light max-w-xl leading-relaxed">
            Elevate your pre-joining journey with structured enterprise systems orientation, squad collaboration standards, and Day-1 readiness.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-3">
            <Link
              to={`/journey/${currentDayId}`}
              className="px-6 py-2.5 rounded bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm shadow-md transition-all"
            >
              Resume Day {currentDayNum}
            </Link>

            <Link
              to="/journey"
              className="px-6 py-2.5 rounded bg-slate-900/80 hover:bg-slate-800 text-white font-medium text-xs sm:text-sm border border-slate-700 transition-all"
            >
              View 15-Day Curriculum
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          FLOATING SECTION: 3 White Feature Cards
          Directly matches reference consulting design: Business Strategy, Market Research, Resource Optimization
          ========================================================================= */}
      <section className="relative z-20 max-w-6xl mx-auto px-4 sm:px-8 -mt-16 sm:-mt-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {coreStrategyCards.map((card, idx) => {
            const IconComponent = card.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl p-8 shadow-xl border border-slate-100 flex flex-col justify-between hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 text-center group"
              >
                <div>
                  {/* Clean Circular Outline Icon */}
                  <div className="w-16 h-16 rounded-full border-2 border-slate-700 text-slate-700 flex items-center justify-center mx-auto mb-5 group-hover:bg-[#4A7298] group-hover:border-[#4A7298] group-hover:text-white transition-all duration-300">
                    <IconComponent className="w-7 h-7" />
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {card.title}
                  </h3>

                  <p className="text-xs text-slate-500 leading-relaxed font-normal mb-8 px-2">
                    {card.description}
                  </p>
                </div>

                <div>
                  {card.actionPath ? (
                    <Link
                      to={card.actionPath}
                      className="inline-block w-full py-2.5 px-4 rounded bg-[#4A7298] hover:bg-[#3B5E80] text-white text-xs font-semibold tracking-wide transition-all shadow-sm"
                    >
                      {card.actionText}
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={card.actionClick}
                      className="w-full py-2.5 px-4 rounded bg-[#4A7298] hover:bg-[#3B5E80] text-white text-xs font-semibold tracking-wide transition-all shadow-sm cursor-pointer"
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
          Growth, Efficiency, Innovation, Analysis
          ========================================================================= */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 py-20 text-center">
        <div className="mb-14 space-y-1">
          <h2 className="text-lg sm:text-xl font-extrabold uppercase tracking-widest text-[#4A7298]">
            OUR CONSULTING FOCUS
          </h2>
          <div className="w-12 h-0.5 bg-[#4A7298] mx-auto rounded-full mt-2" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {focusPillars.map((pillar) => {
            const PillarIcon = pillar.icon;
            return (
              <div
                key={pillar.id}
                className="bg-white rounded-xl p-6 border border-slate-200/70 shadow-sm hover:shadow-md transition-all flex flex-col justify-between text-center group"
              >
                <div>
                  <div className="w-12 h-12 rounded-full bg-blue-50 text-[#4A7298] flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <PillarIcon className="w-6 h-6" />
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    {pillar.name}
                  </h3>

                  <p className="text-xs text-slate-500 leading-relaxed font-normal mb-6">
                    {pillar.description}
                  </p>
                </div>

                <div>
                  {pillar.link ? (
                    <Link
                      to={pillar.link}
                      className="inline-block w-full py-2 px-3 rounded border border-slate-300 hover:border-[#4A7298] text-slate-700 hover:text-[#4A7298] text-xs font-medium transition-all"
                    >
                      {pillar.actionText}
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={pillar.actionClick}
                      className="w-full py-2 px-3 rounded border border-slate-300 hover:border-[#4A7298] text-slate-700 hover:text-[#4A7298] text-xs font-medium transition-all cursor-pointer"
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
          SECTION 3: "RECENT PROJECTS" (3 Photo-Card Showcase)
          ========================================================================= */}
      <section className="relative bg-slate-950 text-white py-16 px-4 sm:px-8 lg:px-12 overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12 space-y-1">
            <h2 className="text-lg sm:text-xl font-extrabold uppercase tracking-widest text-slate-300">
              RECENT PROJECTS
            </h2>
            <div className="w-12 h-0.5 bg-blue-500 mx-auto rounded-full mt-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-lg overflow-hidden shadow-xl flex flex-col justify-between text-slate-900 group"
              >
                <div>
                  {/* Photo Header */}
                  <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-2">
                    <h3 className="text-sm font-bold text-slate-900">
                      {project.title}
                    </h3>

                    <p className="text-xs text-slate-500 leading-relaxed font-normal">
                      {project.summary}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <Link
                    to={project.link}
                    className="block w-full text-center py-2 rounded bg-[#4A7298] hover:bg-[#3B5E80] text-white text-xs font-semibold transition-all shadow-sm"
                  >
                    View Project
                  </Link>
                </div>
              </div>
            ))}
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
          {quizLoading ? (
            <div className="p-10 text-center space-y-3">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="text-xs font-semibold text-slate-500">Loading assessment questions...</p>
            </div>
          ) : activeQuiz ? (
            <QuizPlayer
              quiz={activeQuiz}
              onComplete={({ score, total, percentage, xp }) => {
                handleActivityComplete(activeActivity.id || activeActivity._id);
              }}
              onClose={handleCloseModal}
            />
          ) : (
            <div className="p-8 text-center text-slate-500">
              <p>Quiz content is not currently available.</p>
            </div>
          )}
        </Modal>
      )}

      <CompletionCelebrationModal
        isOpen={showCelebration}
        onClose={closeCelebration}
      />
    </div>
  );
}
