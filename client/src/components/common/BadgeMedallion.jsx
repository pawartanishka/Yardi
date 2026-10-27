import React from 'react';
import { Lock, Check } from 'lucide-react';

export const MATURE_BADGE_CONFIGS = {
  'badge-1': {
    code: 'YRD-CRD-01',
    name: 'Induction Verified',
    track: 'FOUNDATION',
    subtitle: 'Orientation & Platform Initiation',
    description: 'Completed Day 1 foundational onboarding curriculum and platform orientation.',
    criteria: 'Complete Day 1 Modules',
    lore: 'Demonstrates successful orientation into Yardi Systems, establishing foundational system comprehension and company orientation.',
    xp: 100,
    metalType: 'slate',
    accentColor: '#2563eb'
  },
  'badge-2': {
    code: 'YRD-CRD-02',
    name: 'Cadence & Momentum',
    track: 'VELOCITY',
    subtitle: '3-Day Consecutive Engagement',
    description: 'Maintained active curriculum progression for three consecutive business days.',
    criteria: 'Active progression across 3 consecutive days',
    lore: 'Reflects consistent professional engagement and self-directed cadence during the transition window.',
    xp: 200,
    metalType: 'steel',
    accentColor: '#0284c7'
  },
  'badge-3': {
    code: 'YRD-CRD-03',
    name: 'Assessment Excellence',
    track: 'PROFICIENCY',
    subtitle: 'Knowledge Check Perfection',
    description: 'Achieved a 100% score on comprehensive technical & domain assessments.',
    criteria: 'Score 100% on any module evaluation',
    lore: 'Awarded for precision and mastery in real estate technology fundamentals and property operational principles.',
    xp: 250,
    metalType: 'gold',
    accentColor: '#d97706'
  },
  'badge-4': {
    code: 'YRD-CRD-04',
    name: 'Values & Ethics Ambassador',
    track: 'GOVERNANCE',
    subtitle: 'Corporate Standards & Conduct',
    description: 'Explored and affirmed Yardi core values, business ethics, and client trust standards.',
    criteria: 'Complete Ethics & Core Values curriculum',
    lore: 'Certifies understanding of Yardi’s fiduciary obligations, client privacy standards, and culture of integrity.',
    xp: 200,
    metalType: 'platinum',
    accentColor: '#4f46e5'
  },
  'badge-5': {
    code: 'YRD-CRD-05',
    name: 'Learning Discipline',
    track: 'DEDICATION',
    subtitle: '5-Day Continuous Cadence',
    description: 'Established a verified 5-day continuous learning streak across pre-boarding.',
    criteria: 'Maintain a 5-day continuous learning streak',
    lore: 'Recognizes self-discipline, time management, and proactive preparation prior to Day 1.',
    xp: 300,
    metalType: 'steel',
    accentColor: '#0d9488'
  },
  'badge-6': {
    code: 'YRD-CRD-06',
    name: 'Midpoint Benchmark',
    track: 'MILESTONE',
    subtitle: 'Halfway Completion Checkpoint',
    description: 'Successfully reached Day 8 milestone, transitioning from theory to applied casework.',
    criteria: 'Complete Day 8 modules and checkpoints',
    lore: 'Marks the official transition from foundational orientation to high-level workplace simulations.',
    xp: 400,
    metalType: 'sapphire',
    accentColor: '#1d4ed8'
  },
  'badge-7': {
    code: 'YRD-CRD-07',
    name: 'Scenario Resolution',
    track: 'PRACTICE',
    subtitle: 'Workplace Dilemma Simulations',
    description: 'Demonstrated analytical decision-making across real-world operational scenarios.',
    criteria: 'Successfully resolve Day 12 workplace simulations',
    lore: 'Certifies competency in navigating ambiguous client dilemmas, stakeholder conflict, and operational ethics.',
    xp: 350,
    metalType: 'titanium',
    accentColor: '#6366f1'
  },
  'badge-8': {
    code: 'YRD-CRD-08',
    name: 'Pre-Joining Certified',
    track: 'CREDENTIAL',
    subtitle: 'Complete 15-Day Curriculum Graduate',
    description: 'Graduated from the full 15-Day Pre-Joining Curriculum with honors.',
    criteria: 'Complete all 15 pre-boarding journey modules',
    lore: 'The premier pre-boarding credential. Certifies thorough readiness for Day 1 operational integration at Yardi.',
    xp: 1000,
    metalType: 'executive-gold',
    accentColor: '#b45309'
  }
};

/**
 * Mature, executive corporate seal / credential emblem
 */
export default function BadgeMedallion({ badgeId, earned = true, size = 'md', className = '' }) {
  const sizeClasses = {
    sm: 'w-14 h-14',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
    xl: 'w-40 h-40'
  }[size] || 'w-24 h-24';

  const config = MATURE_BADGE_CONFIGS[badgeId] || MATURE_BADGE_CONFIGS['badge-1'];

  // Render mature vector emblems
  const renderEmblem = () => {
    switch (badgeId) {
      case 'badge-1': // Induction Verified - Minimalist Compass / Gateway Crest
        return (
          <g>
            <defs>
              <linearGradient id="seal-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e293b" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>
            </defs>
            {/* Outer Precision Bezel */}
            <circle cx="50" cy="50" r="44" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
            <circle cx="50" cy="50" r="40" fill="url(#seal-grad-1)" />
            {/* Engraved Measurement Ticks */}
            <circle cx="50" cy="50" r="36" fill="none" stroke="#475569" strokeWidth="1" strokeDasharray="1.5 3.5" />
            {/* Minimalist Horizon & Ascending Beacon */}
            <line x1="28" y1="56" x2="72" y2="56" stroke="#64748b" strokeWidth="1" />
            {/* Precision Geometric Launch Chevron */}
            <polygon points="50,24 62,50 50,44 38,50" fill="#38bdf8" />
            <polygon points="50,24 50,44 38,50" fill="#0284c7" />
            <circle cx="50" cy="66" r="3" fill="#ffffff" />
            <line x1="50" y1="50" x2="50" y2="60" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="2 2" />
          </g>
        );

      case 'badge-2': // Cadence & Momentum - Triple Ascending Chevrons
        return (
          <g>
            <defs>
              <linearGradient id="seal-grad-2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e293b" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="44" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
            <circle cx="50" cy="50" r="40" fill="url(#seal-grad-2)" />
            <circle cx="50" cy="50" r="36" fill="none" stroke="#475569" strokeWidth="1" strokeDasharray="2 2" />
            {/* Stacked Clean Architectural Velocity Chevrons */}
            <g transform="translate(0, 0)">
              <polyline points="34,62 50,48 66,62" fill="none" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <polyline points="34,50 50,36 66,50" fill="none" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <polyline points="34,38 50,24 66,38" fill="none" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          </g>
        );

      case 'badge-3': // Assessment Excellence - Certified Honors Laurels & Star
        return (
          <g>
            <defs>
              <linearGradient id="gold-seal" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#78350f" />
                <stop offset="50%" stopColor="#451a03" />
                <stop offset="100%" stopColor="#1e293b" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="44" fill="#fffbeb" stroke="#fcd34d" strokeWidth="1.5" />
            <circle cx="50" cy="50" r="40" fill="url(#gold-seal)" />
            <circle cx="50" cy="50" r="36" fill="none" stroke="#b45309" strokeWidth="1" strokeDasharray="3 2" />
            {/* Minimalist Laurel Branch Silhouette */}
            <path
              d="M32,64 C26,52 28,38 36,30 C34,38 36,48 42,56 Z"
              fill="#fbbf24"
              opacity="0.9"
            />
            <path
              d="M68,64 C74,52 72,38 64,30 C66,38 64,48 58,56 Z"
              fill="#fbbf24"
              opacity="0.9"
            />
            {/* Precision 5-Point Honor Star */}
            <polygon
              points="50,28 54,38 64,38 56,44 59,54 50,48 41,54 44,44 36,38 46,38"
              fill="#ffffff"
              stroke="#f59e0b"
              strokeWidth="1.5"
            />
            <circle cx="50" cy="42" r="2.5" fill="#f59e0b" />
          </g>
        );

      case 'badge-4': // Values & Ethics Ambassador - Intersecting Geometric Rings
        return (
          <g>
            <defs>
              <linearGradient id="seal-grad-4" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e293b" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="44" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
            <circle cx="50" cy="50" r="40" fill="url(#seal-grad-4)" />
            <circle cx="50" cy="50" r="36" fill="none" stroke="#475569" strokeWidth="1" strokeDasharray="1 3" />
            {/* Precision Intersecting Synergy Rings */}
            <circle cx="43" cy="50" r="15" fill="none" stroke="#818cf8" strokeWidth="2" opacity="0.8" />
            <circle cx="57" cy="50" r="15" fill="none" stroke="#38bdf8" strokeWidth="2" opacity="0.8" />
            <circle cx="50" cy="38" r="15" fill="none" stroke="#a5b4fc" strokeWidth="2" opacity="0.8" />
            {/* Central Diamond Core */}
            <polygon points="50,44 54,50 50,56 46,50" fill="#ffffff" />
          </g>
        );

      case 'badge-5': // Learning Discipline - Geometric Pentagonal Cadence
        return (
          <g>
            <defs>
              <linearGradient id="seal-grad-5" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e293b" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="44" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
            <circle cx="50" cy="50" r="40" fill="url(#seal-grad-5)" />
            <circle cx="50" cy="50" r="36" fill="none" stroke="#475569" strokeWidth="1" strokeDasharray="4 2" />
            {/* Clean Precision Cadence Pulse & Pentagon */}
            <polygon
              points="50,22 74,40 65,68 35,68 26,40"
              fill="none"
              stroke="#2dd4bf"
              strokeWidth="2"
            />
            {/* Center Cadence Needle */}
            <line x1="50" y1="30" x2="50" y2="60" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
            <circle cx="50" cy="45" r="5" fill="#2dd4bf" />
            <circle cx="50" cy="45" r="2" fill="#0f172a" />
          </g>
        );

      case 'badge-6': // Midpoint Benchmark - Navigational Meridian Astrolabe
        return (
          <g>
            <defs>
              <linearGradient id="seal-grad-6" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e293b" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="44" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
            <circle cx="50" cy="50" r="40" fill="url(#seal-grad-6)" />
            <circle cx="50" cy="50" r="36" fill="none" stroke="#475569" strokeWidth="1" strokeDasharray="2 3" />
            {/* Meridian Grid & Crosshairs */}
            <circle cx="50" cy="50" r="24" fill="none" stroke="#60a5fa" strokeWidth="1.5" />
            <line x1="22" y1="50" x2="78" y2="50" stroke="#94a3b8" strokeWidth="1.5" />
            <line x1="50" y1="22" x2="50" y2="78" stroke="#94a3b8" strokeWidth="1.5" />
            {/* 45-degree Benchmark Target */}
            <circle cx="50" cy="50" r="10" fill="none" stroke="#3b82f6" strokeWidth="2" />
            <circle cx="50" cy="50" r="3" fill="#ffffff" />
          </g>
        );

      case 'badge-7': // Scenario Resolution - Architectural Shield & Analytical Prism
        return (
          <g>
            <defs>
              <linearGradient id="seal-grad-7" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e293b" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="44" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
            <circle cx="50" cy="50" r="40" fill="url(#seal-grad-7)" />
            <circle cx="50" cy="50" r="36" fill="none" stroke="#475569" strokeWidth="1" strokeDasharray="3 3" />
            {/* Architectural Beveled Shield Inset */}
            <path
              d="M50,22 L72,30 L72,52 C72,66 50,76 50,76 C50,76 28,66 28,52 L28,30 Z"
              fill="none"
              stroke="#a78bfa"
              strokeWidth="2"
            />
            {/* Analytical Dividing Prism */}
            <path d="M50,22 L50,76" stroke="#c4b5fd" strokeWidth="1" strokeDasharray="2 2" />
            <polygon points="50,34 60,48 50,44 40,48" fill="#ffffff" />
          </g>
        );

      case 'badge-8': // Pre-Joining Certified - Distinguished Executive Gold Seal
        return (
          <g>
            <defs>
              <linearGradient id="exec-gold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#78350f" />
                <stop offset="40%" stopColor="#92400e" />
                <stop offset="100%" stopColor="#1e1b4b" />
              </linearGradient>
            </defs>
            {/* Outer Ribbed Medal Teeth */}
            <circle cx="50" cy="50" r="45" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
            <circle cx="50" cy="50" r="40" fill="url(#exec-gold)" />
            <circle cx="50" cy="50" r="37" fill="none" stroke="#fcd34d" strokeWidth="1.5" strokeDasharray="2 2" />
            <circle cx="50" cy="50" r="34" fill="none" stroke="#b45309" strokeWidth="0.75" />
            {/* Formal Certificate Laurel Crest */}
            <path
              d="M30,62 C24,50 26,36 34,28 C33,36 34,46 40,54 Z"
              fill="#fbbf24"
            />
            <path
              d="M70,62 C76,50 74,36 66,28 C67,36 66,46 60,54 Z"
              fill="#fbbf24"
            />
            {/* Corporate Star Cluster */}
            <polygon points="50,30 53,38 61,38 55,43 57,51 50,46 43,51 45,43 39,38 47,38" fill="#ffffff" />
            {/* Certified Ribbon Bar */}
            <rect x="36" y="56" width="28" height="6" rx="2" fill="#fbbf24" stroke="#78350f" strokeWidth="1" />
            <line x1="40" y1="59" x2="60" y2="59" stroke="#78350f" strokeWidth="1" />
          </g>
        );

      default:
        return (
          <circle cx="50" cy="50" r="40" fill="#1e293b" />
        );
    }
  };

  // Locked State: Architectural blueprint / watermark seal
  if (!earned) {
    return (
      <div className={`relative ${sizeClasses} ${className} flex items-center justify-center group cursor-pointer`}>
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Muted Watermark Seal */}
          <div className="w-full h-full opacity-25 filter grayscale transition-opacity duration-300 group-hover:opacity-40">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {renderEmblem()}
            </svg>
          </div>

          {/* Minimalist Corporate Lock Seal */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-9 h-9 rounded-xl bg-slate-100/90 border border-slate-300 shadow-sm flex items-center justify-center text-slate-500 group-hover:text-slate-800 transition-colors">
              <Lock className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Unlocked State: Crisp, embossed corporate medal
  return (
    <div className={`relative ${sizeClasses} ${className} flex items-center justify-center group cursor-pointer`}>
      <div className="relative w-full h-full transition-transform duration-200 transform group-hover:scale-105">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full filter drop-shadow-sm"
        >
          {renderEmblem()}
        </svg>

        {/* Minimalist Verification Check */}
        <span className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-sm border border-white">
          <Check className="w-3 h-3 stroke-[3]" />
        </span>
      </div>
    </div>
  );
}
