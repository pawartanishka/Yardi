/**
 * Idempotent Shared Curriculum Initialization Script
 *
 * Populates or updates the official Yardi 15-Day Onboarding Curriculum:
 * - 15 Journey Days
 * - Complete Activity Modules (videos, readings, simulations, reflections, quizzes)
 * - Formal Assessment Quizzes
 * - Official Achievement Badges
 *
 * ZERO DEMO USERS CREATED. ZERO USER PROGRESS ALTERED.
 *
 * Usage:
 *   node scripts/initCurriculum.js
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const JourneyDay = require('../models/JourneyDay');
const Activity = require('../models/Activity');
const Quiz = require('../models/Quiz');
const Badge = require('../models/Badge');

const DAYS_DATA = [
  { dayNumber: 1, title: 'Welcome & Orientation to Yardi', description: 'Kick off your pre-joining journey with executive leadership welcome and platform overview.', estimatedTime: '35 mins', xp: 250, order: 1 },
  { dayNumber: 2, title: 'Understanding the Organization & Tech Stack', description: 'Explore Yardi global property technology footprint, architectural legacy, and market reach.', estimatedTime: '40 mins', xp: 300, order: 2 },
  { dayNumber: 3, title: 'Culture, Core Values & Client Philosophy', description: 'Learn how we take care of our clients, employees, and communities with fiduciary integrity.', estimatedTime: '45 mins', xp: 350, order: 3 },
  { dayNumber: 4, title: 'People, Squads & Cross-Functional Teams', description: 'Understand departmental taxonomy, engineering squad hierarchies, and collaborative rituals.', estimatedTime: '35 mins', xp: 300, order: 4 },
  { dayNumber: 5, title: 'Communication, Etiquette & Async Collaboration', description: 'Master asynchronous communication standards, respectful code review etiquette, and documentation.', estimatedTime: '50 mins', xp: 400, order: 5 },
  { dayNumber: 6, title: 'Developer Tools, Environments & Cloud Setup', description: 'Get acquainted with our cloud infrastructure, productivity tools, and development standards.', estimatedTime: '45 mins', xp: 350, order: 6 },
  { dayNumber: 7, title: 'Enterprise Security, Compliance & Data Privacy', description: 'Critical cybersecurity protocols, SOC-2 standards, tenant data protection, and privacy mandates.', estimatedTime: '45 mins', xp: 400, order: 7 },
  { dayNumber: 8, title: 'Professional Agility & Problem Decomposition', description: 'Technical problem-solving, sprint delivery cadence, and working effectively in fast-moving squads.', estimatedTime: '45 mins', xp: 350, order: 8 },
  { dayNumber: 9, title: 'Workplace Etiquette, Hybrid Norms & Inclusivity', description: 'Guidelines for productive meetings, virtual workspace etiquette, and fostering inclusive culture.', estimatedTime: '35 mins', xp: 300, order: 9 },
  { dayNumber: 10, title: 'Continuous Learning, Mentorship & Growth Portals', description: 'Explore Yardi internal academies, professional certifications, mentorship squads, and career tracks.', estimatedTime: '40 mins', xp: 350, order: 10 },
  { dayNumber: 11, title: 'Squad Role Expectations & 90-Day Roadmap', description: 'Review expectations for your functional role, deliverables, and your first 90-day onboarding milestones.', estimatedTime: '50 mins', xp: 400, order: 11 },
  { dayNumber: 12, title: 'Real-World Engineering & Client Delivery Simulations', description: 'Tackle realistic simulated engineering trade-offs, tenant escalations, and cross-team alignment.', estimatedTime: '55 mins', xp: 450, order: 12 },
  { dayNumber: 13, title: 'Team Networking, Community Groups & Connect', description: 'Meet your onboarding buddy, explore employee resource groups, and introduce yourself to your squad.', estimatedTime: '35 mins', xp: 300, order: 13 },
  { dayNumber: 14, title: 'Final Day 1 Preparation & Logistics Verification', description: 'Verify hardware shipping status, IT access credentials, HR documentation, and Day 1 reporting details.', estimatedTime: '30 mins', xp: 350, order: 14 },
  { dayNumber: 15, title: 'Pre-Boarding Graduation & Readiness Attestation', description: 'Complete your final readiness assessment, attestation reflection, and receive your credential of completion.', estimatedTime: '45 mins', xp: 600, order: 15 },
];

const BADGES_DATA = [
  { badgeId: 'badge-1', name: 'First Step', description: 'Completed Day 1 of the Pre-Joining Journey', icon: 'Rocket', requirement: 'Complete Day 1', xp: 100 },
  { badgeId: 'badge-2', name: 'Getting Started', description: 'Completed 3 consecutive journey days', icon: 'Flame', requirement: 'Complete 3 Days', xp: 200 },
  { badgeId: 'badge-3', name: 'Quiz Master', description: 'Scored 100% on any pre-joining knowledge assessment', icon: 'Award', requirement: 'Score 100% on a quiz', xp: 250 },
  { badgeId: 'badge-4', name: 'Culture Champion', description: 'Explored Yardi core values and community ethics', icon: 'HeartHandshake', requirement: 'Complete Day 3 & 4 activities', xp: 200 },
  { badgeId: 'badge-5', name: 'Consistency', description: 'Maintained an active 5-day learning streak', icon: 'Zap', requirement: 'Maintain a 5-day streak', xp: 300 },
  { badgeId: 'badge-6', name: 'Halfway There', description: 'Completed Day 8 - milestone halfway point reached!', icon: 'Compass', requirement: 'Complete Day 8', xp: 400 },
  { badgeId: 'badge-7', name: 'Problem Solver', description: 'Passed real-world workplace scenario challenges', icon: 'ShieldCheck', requirement: 'Complete Day 12 scenarios', xp: 350 },
  { badgeId: 'badge-8', name: 'Yardi Onboarding Champion', description: 'Successfully graduated from the complete 15-Day Journey', icon: 'Trophy', requirement: 'Complete all 15 days', xp: 1000 },
];

const QUIZZES_DATA = [
  {
    quizId: 'quiz-day-1',
    activityId: 'act-1-3',
    dayNumber: 1,
    title: 'Day 1: Platform & Orientation Knowledge Check',
    description: 'Verify your understanding of the 15-day pre-boarding journey and milestone structure.',
    passingScore: 70,
    xp: 75,
    questions: [
      {
        question: 'What is the primary objective of the Yardi 15-Day Pre-Joining Journey?',
        options: [
          'To replace Day 1 onboarding entirely with automated videos',
          'To prepare incoming team members smoothly before Day 1 through structured daily micro-learning',
          'To assign sprint tickets before your official start date',
          'To administer formal performance reviews'
        ],
        correctAnswer: 1,
        explanation: 'The platform is engineered to eliminate Day 1 anxiety and equip new hires with foundational knowledge before their start date.'
      },
      {
        question: 'How do milestone unlocks work throughout your journey?',
        options: [
          'All 15 days are immediately unlocked at once without prerequisites',
          'Each day unlocks sequentially as you complete the required activities for your active milestone',
          'Days unlock only after passing a 4-hour comprehensive exam',
          'Only administrative staff can unlock daily activities'
        ],
        correctAnswer: 1,
        explanation: 'Each milestone is unlocked sequentially upon completing the prerequisite activities of the current day.'
      },
      {
        question: 'Where can you track your progress, XP, and earned achievement badges?',
        options: [
          'On personal spreadsheets sent to HR weekly',
          'Directly in your learner dashboard, timeline, and achievements gallery',
          'Exclusively via monthly email reports',
          'On external certification sites'
        ],
        correctAnswer: 1,
        explanation: 'All metrics, streak cadence, and achievement badges are recorded in real-time in your learner portal.'
      }
    ]
  },
  {
    quizId: 'quiz-day-5',
    activityId: 'act-5-4',
    dayNumber: 5,
    title: 'Day 5: Communication & Collaboration Assessment',
    description: 'Validate your understanding of asynchronous communication, feedback loops, and meeting hygiene.',
    passingScore: 75,
    xp: 100,
    questions: [
      {
        question: 'Which communication habit is most effective for an asynchronous distributed squad at Yardi?',
        options: [
          'Sending "Hi" and waiting for a reply before stating your question',
          'Writing a complete, contextual message with details, links, and desired outcome in the first message',
          'Calling team members directly on video without sending a prior chat notice',
          'Only communicating through monthly team emails'
        ],
        correctAnswer: 1,
        explanation: 'Providing full context upfront minimizes unnecessary back-and-forth and respects teammates focus time across time zones.'
      },
      {
        question: 'When conducting peer code reviews or architectural evaluations, feedback should be:',
        options: [
          'Personal and focused on individual flaws',
          'Objective, respectful, actionable, and centered around code quality and squad standards',
          'Delayed until annual performance reviews',
          'Shared exclusively in private direct messages without team visibility'
        ],
        correctAnswer: 1,
        explanation: 'Constructive feedback should always focus on the work, provide actionable alternatives, and adhere to team standards.'
      },
      {
        question: 'What is the recommended practice prior to scheduling a meeting with multiple cross-functional stakeholders?',
        options: [
          'Schedule 60 minutes with no agenda so everyone can brainstorm freely',
          'Ensure there is a clear agenda, documented desired outcome, and relevant pre-read materials attached',
          'Only invite the highest ranking executives',
          'Mandate that all attendees read 50 pages of documentation during the call'
        ],
        correctAnswer: 1,
        explanation: 'Clear agendas and pre-reads maximize meeting efficiency and allow participants to prepare meaningful insights beforehand.'
      },
      {
        question: 'At Yardi, how should team members handle confidential client or tenant data discussed in chat channels?',
        options: [
          'Post it in public channels as long as it helps resolve the question quickly',
          'Share it on personal social media groups for debugging help',
          'Never share sensitive PII or credentials; adhere strictly to enterprise data privacy policies',
          'Only redact phone numbers but leave banking details visible'
        ],
        correctAnswer: 2,
        explanation: 'Data security and client privacy are non-negotiable pillars of Yardi engineering standards.'
      }
    ]
  },
  {
    quizId: 'quiz-day-7',
    activityId: 'act-7-3',
    dayNumber: 7,
    title: 'Day 7: Cybersecurity & Enterprise Data Governance Check',
    description: 'Assess your proficiency in SOC-2 compliance, credential hygiene, and phishing defense.',
    passingScore: 80,
    xp: 120,
    questions: [
      {
        question: 'Which password management practice adheres to Yardi corporate security policy?',
        options: [
          'Using the same password across personal and corporate platforms',
          'Storing unencrypted passwords in local text files or desktop notes',
          'Using enterprise Single Sign-On (SSO) with Multi-Factor Authentication (MFA) and distinct complex passwords',
          'Sharing system credentials with teammates over instant messaging'
        ],
        correctAnswer: 2,
        explanation: 'Multi-factor authentication and enterprise password managers protect company and client systems from unauthorized access.'
      },
      {
        question: 'What immediate action should you take if you receive an unexpected email requesting urgent credential verification or bank wire changes?',
        options: [
          'Click the link to verify if the website looks authentic',
          'Forward the email to personal contacts for a second opinion',
          'Report the message immediately using the enterprise Phishing Alert button and contact the Security Operations Center (SOC)',
          'Reply to the sender asking for proof of identity'
        ],
        correctAnswer: 2,
        explanation: 'Always report suspicious emails directly through official security channels without clicking links or opening attachments.'
      }
    ]
  }
];

const ACTIVITIES_DATA = [
  // Day 1
  {
    dayNumber: 1,
    dayId: 'day-1',
    title: 'Welcome Address by Yardi Leadership',
    description: 'A warm welcome from executive leadership introducing our mission, values, and journey.',
    type: 'video',
    duration: '10 mins',
    xp: 80,
    order: 1,
    isRequired: true,
    content: {
      overview: 'Executive welcome briefing introducing Yardi history, global footprint, and vision for property technology innovation.',
      takeaways: ['Understand Yardi client-first philosophy.', 'Overview of the 15-day pre-joining journey.', 'Key support contacts and onboarding resources.']
    }
  },
  {
    dayNumber: 1,
    dayId: 'day-1',
    title: 'Platform Orientation: Navigating Your Journey',
    description: 'How to use your daily dashboard, submit activities, and collect achievement badges.',
    type: 'reading',
    duration: '10 mins',
    xp: 60,
    order: 2,
    isRequired: true,
    content: {
      overview: 'Your structured pre-joining platform is designed to pace your onboarding experience smoothly over 15 business days.',
      sections: [
        { heading: 'Daily Cadence', text: 'Spend 30-45 minutes per day engaging with curated modules.' },
        { heading: 'Activity Types', text: 'Engage with briefing videos, reading playbooks, scenario dilemmas, and knowledge assessments.' },
        { heading: 'Achievements & Milestones', text: 'Every verified milestone awards curriculum points and collectible honors.' }
      ]
    }
  },
  {
    dayNumber: 1,
    dayId: 'day-1',
    title: 'Day 1 Orientation Knowledge Check',
    description: 'A brief 3-question check on the onboarding guidelines and roadmap.',
    type: 'quiz',
    duration: '8 mins',
    xp: 75,
    order: 3,
    isRequired: true,
    quizId: 'quiz-day-1'
  },
  {
    dayNumber: 1,
    dayId: 'day-1',
    title: 'Initial Profile Setup & Onboarding Checklist',
    description: 'Confirm contact preferences, verify your squad department, and review Day 1 readiness items.',
    type: 'checklist',
    duration: '7 mins',
    xp: 40,
    order: 4,
    isRequired: true,
    content: {
      overview: 'Essential setup checklist to confirm personal contact details, review emergency protocols, and confirm readiness.'
    }
  },

  // Day 2
  {
    dayNumber: 2,
    dayId: 'day-2',
    title: 'The Yardi Ecosystem: Voyager & Cloud Solutions',
    description: 'Deep dive into Yardi flagship Voyager platform and our cloud software architecture.',
    type: 'video',
    duration: '15 mins',
    xp: 90,
    order: 1,
    isRequired: true,
    content: {
      overview: 'Explore how Yardi Voyager powers residential, commercial, investment management, and affordable housing portfolios globally.',
      takeaways: ['Voyager core ledger and property management architecture.', 'Cloud SaaS delivery model and tenant lifecycle solutions.']
    }
  },
  {
    dayNumber: 2,
    dayId: 'day-2',
    title: 'Reading: Global Real Estate Technology Footprint',
    description: 'Understanding our market impact across North America, Europe, Asia-Pacific, and the Middle East.',
    type: 'reading',
    duration: '12 mins',
    xp: 75,
    order: 2,
    isRequired: true,
    content: {
      overview: 'Yardi serves over 30,000 corporate clients managing tens of millions of property units worldwide.',
      sections: [
        { heading: 'Enterprise Scale', text: 'Supporting mission-critical financial systems for institutional property owners.' },
        { heading: 'Innovation Cadence', text: 'Continuous investment in AI, automated leasing, energy intelligence, and mobile apps.' }
      ]
    }
  },
  {
    dayNumber: 2,
    dayId: 'day-2',
    title: 'Day 2 Reflection: Aligning with Our Mission',
    description: 'Brief reflection on how your domain background aligns with enterprise property technology.',
    type: 'reflection',
    duration: '10 mins',
    xp: 60,
    order: 3,
    isRequired: false,
    reflectionPrompt: 'Which aspect of Yardi technology ecosystem interests you most, and how do you envision contributing to it?'
  },

  // Day 3
  {
    dayNumber: 3,
    dayId: 'day-3',
    title: 'Core Values: Taking Care of Clients & Community',
    description: 'An exploration of Yardi founding ethos and philanthropic community commitment.',
    type: 'video',
    duration: '12 mins',
    xp: 85,
    order: 1,
    isRequired: true,
    content: {
      overview: 'Our corporate philosophy is simple: Take care of our clients, take care of our employees, and take care of our communities.',
      takeaways: ['Client trust is earned through reliability and long-term partnership.', 'Community giving and sustainability initiatives worldwide.']
    }
  },
  {
    dayNumber: 3,
    dayId: 'day-3',
    title: 'Reading: Code of Business Ethics & Integrity',
    description: 'Professional standards guiding our daily decisions, client confidentiality, and fiduciary trust.',
    type: 'reading',
    duration: '15 mins',
    xp: 80,
    order: 2,
    isRequired: true,
    content: {
      overview: 'Ethical conduct is the foundation of our reputation. We adhere to high transparency and accountability in all dealings.',
      sections: [
        { heading: 'Client Privacy', text: 'Treat client information with utmost security and confidentiality.' },
        { heading: 'Equal Opportunity', text: 'Foster a respectful, diverse, and merit-based environment.' }
      ]
    }
  },

  // Day 4
  {
    dayNumber: 4,
    dayId: 'day-4',
    title: 'Engineering & Product Squad Architecture',
    description: 'How squads, product managers, quality assurance, and DevOps collaborate in agile sprints.',
    type: 'video',
    duration: '15 mins',
    xp: 90,
    order: 1,
    isRequired: true,
    content: {
      overview: 'Squads operate with autonomy and ownership, following sprint cycles to ship robust enterprise releases.',
      takeaways: ['Agile sprint ceremonies and planning.', 'Cross-functional alignment between engineering and client success.']
    }
  },
  {
    dayNumber: 4,
    dayId: 'day-4',
    title: 'Reading: Navigating Your First 30 Days in Squad',
    description: 'Essential guidance on getting your development environment configured and pair programming.',
    type: 'reading',
    duration: '12 mins',
    xp: 75,
    order: 2,
    isRequired: true,
    content: {
      overview: 'Your first month centers on learning the codebase, mastering testing standards, and shipping your first pull request.'
    }
  },

  // Day 5
  {
    dayNumber: 5,
    dayId: 'day-5',
    title: 'Mastering Asynchronous Collaboration at Yardi',
    description: 'Learn how global teams collaborate seamlessly across timezones with documentation-first mindset.',
    type: 'video',
    duration: '12 mins',
    xp: 80,
    order: 1,
    isRequired: true,
    content: {
      overview: 'Asynchronous communication allows team members to deliver their best work without meeting fatigue. At Yardi, we prioritize clear writing, thoughtful ticket comments, and transparent documentation.',
      takeaways: [
        'Always provide complete context when pinging colleagues on Microsoft Teams.',
        'Document decisions in shared wikis and Jira tickets instead of private 1:1 chats.',
        'Respect working hours across different regional time zones (PST, EST, IST, CET).',
        'Set realistic response expectations for non-urgent inquiries.'
      ]
    }
  },
  {
    dayNumber: 5,
    dayId: 'day-5',
    title: 'Reading: The Yardi Communication Playbook',
    description: 'Comprehensive guide to meeting standards, chat etiquette, and transparent updates.',
    type: 'reading',
    duration: '15 mins',
    xp: 70,
    order: 2,
    isRequired: true,
    content: {
      overview: 'Effective communication is the lifeblood of high-performing engineering and client-success teams. This playbook outlines expectations for daily standups, sprint reviews, and technical documentation.',
      sections: [
        {
          heading: '1. The 3 Pillars of Written Updates',
          text: 'Every update should include: What was accomplished, what is in progress, and any active blockers or dependencies. Be succinct, quantify results, and tag team members who need to take action.'
        },
        {
          heading: '2. Meeting Hygiene & Purpose',
          text: 'No meeting without an agenda. If a topic can be resolved via an email or a shared document discussion in under 10 minutes, skip the call and protect focus time.'
        },
        {
          heading: '3. Giving & Receiving Constructive Feedback',
          text: 'Feedback is a gift that accelerates personal and team growth. Frame code reviews and architectural critique around problem-solving rather than individual personalities.'
        }
      ],
      takeaways: [
        'Send pre-reads at least 4 hours before technical alignment meetings.',
        'Keep comments in Pull Requests polite, objective, and solution-oriented.',
        'Use the Yardi praise channel to recognize peer contributions publicly.'
      ]
    }
  },
  {
    dayNumber: 5,
    dayId: 'day-5',
    title: 'Interactive Scenario: Conflict Resolution & Feedback',
    description: 'Walk through a practical scenario where two squad members have differing code design preferences.',
    type: 'challenge',
    duration: '15 mins',
    xp: 100,
    order: 3,
    isRequired: true,
    challengeData: {
      scenario: 'You and a senior developer have differing opinions on how to structure a new REST API endpoint for tenant lease payments. The release deadline is in two days.',
      question: 'Which sequence of actions best aligns with Yardi collaborative culture?',
      options: [
        { text: 'Push your code directly to production since you wrote the feature and know it best.', correct: false },
        { text: 'Schedule a 15-minute sync with the senior engineer, present architectural trade-offs, and lean on documented squad standards.', correct: true },
        { text: 'Immediately escalate the dispute to the Department Director to make the final call.', correct: false },
        { text: 'Abandon your implementation completely without discussing the merits of your design.', correct: false }
      ],
      explanation: 'Scheduling a brief 15-minute sync with objective trade-offs respects team members expertise and squad standards while moving quickly toward delivery.'
    }
  },
  {
    dayNumber: 5,
    dayId: 'day-5',
    title: 'Knowledge Check: Communication Best Practices',
    description: 'Test your understanding of workplace communication, async collaboration, and etiquette.',
    type: 'quiz',
    duration: '10 mins',
    xp: 100,
    order: 4,
    isRequired: true,
    quizId: 'quiz-day-5'
  },
  {
    dayNumber: 5,
    dayId: 'day-5',
    title: 'Personal Reflection: Team Communication Commitment',
    description: 'Write a short personal reflection on how you plan to foster open communication in your squad.',
    type: 'reflection',
    duration: '8 mins',
    xp: 50,
    order: 5,
    isRequired: false,
    reflectionPrompt: 'What is one communication habit you want to practice during your first month at Yardi?'
  },

  // Days 6-15 foundational curriculum
  {
    dayNumber: 6,
    dayId: 'day-6',
    title: 'Cloud Infrastructure & DevOps Workflows',
    description: 'Overview of our continuous integration, cloud hosting, and automated deployment pipelines.',
    type: 'video',
    duration: '18 mins',
    xp: 90,
    order: 1,
    isRequired: true,
    content: {
      overview: 'Learn how automated CI/CD pipelines validate code, run test suites, and deploy enterprise services safely.'
    }
  },
  {
    dayNumber: 7,
    dayId: 'day-7',
    title: 'Enterprise Security & SOC-2 Compliance Guidelines',
    description: 'Critical cybersecurity protocols, password management, and data handling standards.',
    type: 'reading',
    duration: '20 mins',
    xp: 100,
    order: 1,
    isRequired: true,
    content: {
      overview: 'Yardi is SOC-2 Type II certified. Learn essential guidelines for data encryption, credential storage, and incident response.'
    }
  },
  {
    dayNumber: 7,
    dayId: 'day-7',
    title: 'Cybersecurity & Data Privacy Assessment',
    description: 'Validate your understanding of security hygiene and confidential data handling.',
    type: 'quiz',
    duration: '10 mins',
    xp: 120,
    order: 2,
    isRequired: true,
    quizId: 'quiz-day-7'
  },
  {
    dayNumber: 8,
    dayId: 'day-8',
    title: 'Midpoint Milestone: Technical Agility & Problem Decomposition',
    description: 'Strategies for breaking complex business requirements into clean, testable user stories.',
    type: 'reading',
    duration: '15 mins',
    xp: 85,
    order: 1,
    isRequired: true,
    content: {
      overview: 'Decomposing epics into vertical slices accelerates delivery and enables rapid feedback from product stakeholders.'
    }
  },
  {
    dayNumber: 12,
    dayId: 'day-12',
    title: 'Workplace Dilemma: Client Production Incident Simulation',
    description: 'Simulate resolving a high-priority production issue while balancing stakeholder updates.',
    type: 'challenge',
    duration: '20 mins',
    xp: 150,
    order: 1,
    isRequired: true,
    challengeData: {
      scenario: 'A major property client reports intermittent payment processing delays during peak monthly rent collection.',
      question: 'What is the correct incident triage sequence?',
      options: [
        { text: 'Wait until the end of the day to review server logs quietly.', correct: false },
        { text: 'Notify the Incident Commander, post a status update to the client incident bridge, and isolate service telemetry.', correct: true },
        { text: 'Tell the client it is probably their network and close the ticket.', correct: false }
      ],
      explanation: 'Prompt communication via designated incident channels combined with swift telemetry isolation ensures transparent resolution.'
    }
  },
  {
    dayNumber: 15,
    dayId: 'day-15',
    title: 'Day 1 Readiness Attestation & Final Reflection',
    description: 'Verify your hardware setup, logistics readiness, and commit to Day 1 success.',
    type: 'reflection',
    duration: '15 mins',
    xp: 200,
    order: 1,
    isRequired: true,
    reflectionPrompt: 'Looking ahead to Day 1, what are your top three goals for your first 90 days at Yardi?'
  }
];

async function initCurriculum() {
  const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/yardi_launchpad';

  console.log('='.repeat(65));
  console.log('[Curriculum Init] Starting Idempotent Shared Curriculum Provisioning');
  console.log('='.repeat(65));

  try {
    await mongoose.connect(mongoUri);
    console.log('[Curriculum Init] Connected to MongoDB');

    // 1. Upsert Journey Days
    console.log(`\n[1/4] Upserting 15 Journey Days...`);
    for (const day of DAYS_DATA) {
      await JourneyDay.findOneAndUpdate(
        { dayNumber: day.dayNumber },
        {
          $set: {
            dayNumber: day.dayNumber,
            title: day.title,
            description: day.description,
            estimatedTime: day.estimatedTime,
            xp: day.xp,
            order: day.order,
            status: 'locked', // default; user status is calculated per user
          }
        },
        { upsert: true, new: true }
      );
    }
    console.log(`[Curriculum Init] 15 Journey Days verified.`);

    // 2. Upsert Badges
    console.log(`\n[2/4] Upserting 8 Standard Achievement Badges...`);
    for (const b of BADGES_DATA) {
      await Badge.findOneAndUpdate(
        { badgeId: b.badgeId },
        { $set: b },
        { upsert: true, new: true }
      );
    }
    console.log(`[Curriculum Init] 8 Badges verified.`);

    // 3. Upsert Quizzes
    console.log(`\n[3/4] Upserting Curriculum Quizzes...`);
    for (const q of QUIZZES_DATA) {
      await Quiz.findOneAndUpdate(
        { quizId: q.quizId },
        { $set: q },
        { upsert: true, new: true }
      );
    }
    console.log(`[Curriculum Init] Quizzes verified.`);

    // 4. Upsert Activities
    console.log(`\n[4/4] Upserting Curriculum Activities across Days...`);
    for (const act of ACTIVITIES_DATA) {
      await Activity.findOneAndUpdate(
        { dayNumber: act.dayNumber, order: act.order },
        { $set: act },
        { upsert: true, new: true }
      );
    }
    const totalActivities = await Activity.countDocuments();
    console.log(`[Curriculum Init] Activities verified. Total activities in catalog: ${totalActivities}`);

    console.log('\n' + '='.repeat(65));
    console.log('[Curriculum Init] SUCCESS! Curriculum initialized without modifying user records.');
    console.log('='.repeat(65));
    process.exit(0);
  } catch (err) {
    console.error('[Curriculum Init Error]:', err.message);
    process.exit(1);
  }
}

initCurriculum();
