// High-fidelity YARDI 15-Day Pre-Joining Journey Mock Data

export const mockBadges = [
  {
    id: "badge-1",
    name: "First Step",
    description: "Completed Day 1 of the LaunchPad Journey",
    icon: "Rocket",
    requirement: "Complete Day 1",
    xp: 100,
    earned: true,
    earnedAt: "2026-09-20T10:30:00Z"
  },
  {
    id: "badge-2",
    name: "Getting Started",
    description: "Completed 3 consecutive journey days",
    icon: "Flame",
    requirement: "Complete 3 Days",
    xp: 200,
    earned: true,
    earnedAt: "2026-09-22T14:15:00Z"
  },
  {
    id: "badge-3",
    name: "Quiz Master",
    description: "Scored 100% on any pre-joining knowledge assessment",
    icon: "Award",
    requirement: "Score 100% on a quiz",
    xp: 250,
    earned: true,
    earnedAt: "2026-09-23T11:45:00Z"
  },
  {
    id: "badge-4",
    name: "Culture Champion",
    description: "Explored Yardi core values and community ethics",
    icon: "HeartHandshake",
    requirement: "Complete Day 3 & 4 activities",
    xp: 200,
    earned: true,
    earnedAt: "2026-09-24T16:00:00Z"
  },
  {
    id: "badge-5",
    name: "Consistency",
    description: "Maintained an active 5-day learning streak",
    icon: "Zap",
    requirement: "Maintain a 5-day streak",
    xp: 300,
    earned: true,
    earnedAt: "2026-09-25T09:00:00Z"
  },
  {
    id: "badge-6",
    name: "Halfway There",
    description: "Completed Day 8 - milestone halfway point reached!",
    icon: "Compass",
    requirement: "Complete Day 8",
    xp: 400,
    earned: false
  },
  {
    id: "badge-7",
    name: "Problem Solver",
    description: "Passed real-world workplace scenario challenges",
    icon: "ShieldCheck",
    requirement: "Complete Day 12 scenarios",
    xp: 350,
    earned: false
  },
  {
    id: "badge-8",
    name: "LaunchPad Champion",
    description: "Successfully graduated from the complete 15-Day Journey",
    icon: "Trophy",
    requirement: "Complete all 15 days",
    xp: 1000,
    earned: false
  }
];

export const mockNotifications = [
  {
    id: "notif-1",
    title: "Day 5 Unlocked!",
    message: "Communication & Collaboration activities are now ready for you.",
    type: "unlock",
    read: false,
    createdAt: "2026-09-26T08:00:00Z"
  },
  {
    id: "notif-2",
    title: "Badge Earned: Consistency 🔥",
    message: "You maintained a 5-day streak and earned +300 XP.",
    type: "badge",
    read: false,
    createdAt: "2026-09-25T09:05:00Z"
  },
  {
    id: "notif-3",
    title: "Quiz Completed!",
    message: "You scored 100% in Culture & Values check (+100 XP).",
    type: "quiz",
    read: true,
    createdAt: "2026-09-24T16:15:00Z"
  },
  {
    id: "notif-4",
    title: "Welcome to YARDI LaunchPad",
    message: "We are thrilled to have you join our team. Start your Day 1 journey!",
    type: "welcome",
    read: true,
    createdAt: "2026-09-20T09:00:00Z"
  }
];

export const mockJourneyDays = [
  {
    id: "day-1",
    dayNumber: 1,
    title: "Welcome to YARDI LaunchPad",
    description: "Kick off your pre-joining journey with a warm leadership welcome and platform overview.",
    estimatedTime: "35 mins",
    xp: 250,
    status: "completed", // completed, current, available, locked
    activitiesCount: 4,
    completedCount: 4,
    order: 1
  },
  {
    id: "day-2",
    dayNumber: 2,
    title: "Understanding the Organization",
    description: "Discover Yardi's legacy, global property technology footprint, and market impact.",
    estimatedTime: "40 mins",
    xp: 300,
    status: "completed",
    activitiesCount: 4,
    completedCount: 4,
    order: 2
  },
  {
    id: "day-3",
    dayNumber: 3,
    title: "Culture & Core Values",
    description: "Learn how we take care of our clients, our employees, and our communities.",
    estimatedTime: "45 mins",
    xp: 350,
    status: "completed",
    activitiesCount: 4,
    completedCount: 4,
    order: 3
  },
  {
    id: "day-4",
    dayNumber: 4,
    title: "People & Teams",
    description: "Understand organizational structure, leadership hierarchy, and cross-functional teams.",
    estimatedTime: "30 mins",
    xp: 300,
    status: "completed",
    activitiesCount: 4,
    completedCount: 4,
    order: 4
  },
  {
    id: "day-5",
    dayNumber: 5,
    title: "Communication & Collaboration",
    description: "Master modern workplace collaboration, async communication, and feedback loops.",
    estimatedTime: "50 mins",
    xp: 400,
    status: "current",
    activitiesCount: 5,
    completedCount: 3,
    order: 5
  },
  {
    id: "day-6",
    dayNumber: 6,
    title: "Workplace Tools & Tech Ecosystem",
    description: "Get familiar with our productivity suite, development environments, and cloud tools.",
    estimatedTime: "45 mins",
    xp: 350,
    status: "locked",
    activitiesCount: 4,
    completedCount: 0,
    order: 6
  },
  {
    id: "day-7",
    dayNumber: 7,
    title: "Security & Data Awareness",
    description: "Critical cybersecurity guidelines, enterprise data protection, and compliance norms.",
    estimatedTime: "40 mins",
    xp: 400,
    status: "locked",
    activitiesCount: 4,
    completedCount: 0,
    order: 7
  },
  {
    id: "day-8",
    dayNumber: 8,
    title: "Professional Skills & Agility",
    description: "Time management, problem decomposition, and working in fast-paced software squads.",
    estimatedTime: "45 mins",
    xp: 350,
    status: "locked",
    activitiesCount: 4,
    completedCount: 0,
    order: 8
  },
  {
    id: "day-9",
    dayNumber: 9,
    title: "Workplace Etiquette & Inclusivity",
    description: "Meeting guidelines, virtual workplace etiquette, and fostering respectful teamwork.",
    estimatedTime: "35 mins",
    xp: 300,
    status: "locked",
    activitiesCount: 4,
    completedCount: 0,
    order: 9
  },
  {
    id: "day-10",
    dayNumber: 10,
    title: "Continuous Learning & Growth",
    description: "Explore Yardi learning portals, certifications, mentorship, and career pathways.",
    estimatedTime: "40 mins",
    xp: 350,
    status: "locked",
    activitiesCount: 4,
    completedCount: 0,
    order: 10
  },
  {
    id: "day-11",
    dayNumber: 11,
    title: "Role Preparation & Expectations",
    description: "Review specific expectations for your squad role, deliverables, and first 90-day roadmap.",
    estimatedTime: "50 mins",
    xp: 400,
    status: "locked",
    activitiesCount: 4,
    completedCount: 0,
    order: 11
  },
  {
    id: "day-12",
    dayNumber: 12,
    title: "Real-World Scenarios & Case Studies",
    description: "Tackle realistic simulated engineering and client delivery scenarios.",
    estimatedTime: "55 mins",
    xp: 450,
    status: "locked",
    activitiesCount: 4,
    completedCount: 0,
    order: 12
  },
  {
    id: "day-13",
    dayNumber: 13,
    title: "Connect & Engage",
    description: "Meet your buddy, join employee resource groups, and introduce yourself to the squad.",
    estimatedTime: "35 mins",
    xp: 300,
    status: "locked",
    activitiesCount: 4,
    completedCount: 0,
    order: 13
  },
  {
    id: "day-14",
    dayNumber: 14,
    title: "Final Day 1 Checklist & Verification",
    description: "Double-check your hardware delivery, HR documents, ID badges, and Day 1 reporting link.",
    estimatedTime: "30 mins",
    xp: 350,
    status: "locked",
    activitiesCount: 4,
    completedCount: 0,
    order: 14
  },
  {
    id: "day-15",
    dayNumber: 15,
    title: "LaunchPad Completion & Celebration",
    description: "Final readiness assessment, graduation reflection, and official certificate of readiness.",
    estimatedTime: "45 mins",
    xp: 600,
    status: "locked",
    activitiesCount: 4,
    completedCount: 0,
    order: 15
  }
];

// Detailed Activities for Day 5 (Current active day)
export const mockDayActivities = {
  "day-5": [
    {
      id: "act-5-1",
      dayId: "day-5",
      title: "Mastering Asynchronous Collaboration at Yardi",
      description: "Learn how global teams collaborate seamlessly across timezones with documentation-first mindset.",
      type: "video",
      duration: "12 mins",
      xp: 80,
      order: 1,
      isRequired: true,
      status: "completed",
      videoUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ", // demo placeholder
      content: {
        overview: "Asynchronous communication allows team members to deliver their best work without meeting fatigue. At Yardi, we prioritize clear writing, thoughtful ticket comments, and transparent documentation.",
        takeaways: [
          "Always provide complete context when pinging colleagues on Microsoft Teams.",
          "Document decisions in shared wikis and Jira tickets instead of private 1:1 chats.",
          "Respect working hours across different regional time zones (PST, EST, IST, CET).",
          "Set realistic response expectations for non-urgent inquiries."
        ]
      }
    },
    {
      id: "act-5-2",
      dayId: "day-5",
      title: "Reading: The Yardi Communication Playbook",
      description: "Comprehensive guide to meeting standards, chat etiquette, and transparent updates.",
      type: "reading",
      duration: "15 mins",
      xp: 70,
      order: 2,
      isRequired: true,
      status: "completed",
      content: {
        overview: "Effective communication is the lifeblood of high-performing engineering and client-success teams. This playbook outlines expectations for daily standups, sprint reviews, and technical documentation.",
        sections: [
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
        ],
        takeaways: [
          "Send pre-reads at least 4 hours before technical alignment meetings.",
          "Keep comments in Pull Requests polite, objective, and solution-oriented.",
          "Use the Yardi praise channel to recognize peer contributions publicly."
        ]
      }
    },
    {
      id: "act-5-3",
      dayId: "day-5",
      title: "Interactive Scenario: Conflict Resolution & Feedback",
      description: "Walk through a practical scenario where two squad members have differing code design preferences.",
      type: "challenge",
      duration: "15 mins",
      xp: 100,
      order: 3,
      isRequired: true,
      status: "completed",
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
      id: "act-5-4",
      dayId: "day-5",
      title: "Knowledge Check: Communication Best Practices",
      description: "Test your understanding of workplace communication, async collaboration, and etiquette.",
      type: "quiz",
      duration: "10 mins",
      xp: 100,
      order: 4,
      isRequired: true,
      status: "in-progress",
      quizId: "quiz-day-5"
    },
    {
      id: "act-5-5",
      dayId: "day-5",
      title: "Personal Reflection & Day 5 Commitment",
      description: "Write a short personal reflection on how you plan to foster open communication in your new squad.",
      type: "reflection",
      duration: "8 mins",
      xp: 50,
      order: 5,
      isRequired: false,
      status: "pending",
      reflectionPrompt: "What is one communication habit you want to practice during your first month at Yardi?"
    }
  ],
  "day-1": [
    {
      id: "act-1-1",
      dayId: "day-1",
      title: "Welcome Address by Yardi Leadership",
      description: "A warm welcome from executive leadership introducing our mission and journey.",
      type: "video",
      duration: "10 mins",
      xp: 80,
      order: 1,
      isRequired: true,
      status: "completed"
    },
    {
      id: "act-1-2",
      dayId: "day-1",
      title: "Platform Orientation: Navigating LaunchPad",
      description: "How to use your daily dashboard, submit activities, and collect achievement badges.",
      type: "reading",
      duration: "10 mins",
      xp: 60,
      order: 2,
      isRequired: true,
      status: "completed"
    },
    {
      id: "act-1-3",
      dayId: "day-1",
      title: "Day 1 Quick Orientation Quiz",
      description: "A brief 3-question check on the LaunchPad guidelines.",
      type: "quiz",
      duration: "8 mins",
      xp: 70,
      order: 3,
      isRequired: true,
      status: "completed"
    },
    {
      id: "act-1-4",
      dayId: "day-1",
      title: "First Day Checklist & Profile Setup",
      description: "Confirm contact information and emergency contacts.",
      type: "checklist",
      duration: "7 mins",
      xp: 40,
      order: 4,
      isRequired: true,
      status: "completed"
    }
  ]
};

// Quiz detail for Day 5
export const mockQuizDay5 = {
  id: "quiz-day-5",
  dayId: "day-5",
  title: "Day 5: Communication & Collaboration Knowledge Check",
  description: "Answer these 4 questions to validate your understanding of team collaboration and earn +100 XP.",
  passingScore: 75,
  xp: 100,
  questions: [
    {
      id: "q-1",
      question: "Which communication habit is most effective for an asynchronous distributed team?",
      options: [
        "Sending 'Hi' and waiting for a reply before explaining your question",
        "Writing a complete, contextual message with details, links, and desired outcome in the first message",
        "Calling team members directly on video without sending a prior chat notice",
        "Only communicating through monthly team emails"
      ],
      correctAnswer: 1,
      explanation: "Providing full context upfront minimizes unnecessary back-and-forth and respects teammates' focus time across time zones."
    },
    {
      id: "q-2",
      question: "When conducting code reviews or peer evaluations, feedback should primarily be:",
      options: [
        "Personal and focused on individual flaws",
        "Objective, respectful, actionable, and centered around code quality and squad standards",
        "Delayed until annual performance reviews",
        "Shared exclusively in private direct messages without team visibility"
      ],
      correctAnswer: 1,
      explanation: "Constructive feedback should always focus on the work, provide actionable alternatives, and adhere to team standards."
    },
    {
      id: "q-3",
      question: "What is the recommended practice prior to scheduling a meeting with multiple cross-functional stakeholders?",
      options: [
        "Schedule 60 minutes with no agenda so everyone can brainstorm freely",
        "Ensure there is a clear agenda, documented desired outcome, and relevant pre-read materials attached",
        "Only invite the highest ranking executives",
        "Mandate that all attendees read 50 pages of documentation during the call"
      ],
      correctAnswer: 1,
      explanation: "Clear agendas and pre-reads maximize meeting efficiency and allow participants to prepare meaningful insights beforehand."
    },
    {
      id: "q-4",
      question: "At Yardi, how should team members handle confidential client or tenant data discussed in chat channels?",
      options: [
        "Post it in public channels as long as it helps resolve the question quickly",
        "Share it on personal social media groups for debugging help",
        "Never share sensitive PII or credentials; adhere strictly to enterprise data privacy policies",
        "Only redact phone numbers but leave banking details visible"
      ],
      correctAnswer: 2,
      explanation: "Data security and client privacy are non-negotiable pillars of Yardi's engineering standards."
    }
  ]
};

// Current demo user profile
export const mockUser = {
  id: "user-1",
  name: "Alex Rivera",
  email: "alex.rivera@yardi.com",
  role: "Software Engineer I",
  department: "Cloud Real Estate Solutions",
  joiningDate: "October 12, 2026",
  employeeId: "YAR-84920",
  profileImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250",
  currentDay: 5,
  totalDays: 15,
  xp: 1450,
  todayXp: 180,
  currentStreak: 5,
  longestStreak: 5,
  daysActive: 5,
  overallProgress: 42, // percent
  completedActivities: 19,
  totalActivities: 58,
  quizAverage: 92,
  userRole: "user" // 'user' or 'admin'
};

// Admin metrics mock data
export const mockAdminStats = {
  totalUsers: 148,
  activeUsers: 132,
  completedUsers: 45,
  averageProgress: 68,
  averageQuizScore: 89,
  averageCompletionDays: 14.2,
  recentUsers: [
    {
      id: "u-101",
      name: "Alex Rivera",
      email: "alex.rivera@yardi.com",
      role: "user",
      department: "Cloud Solutions",
      currentDay: 5,
      progress: 42,
      xp: 1450,
      status: "active"
    },
    {
      id: "u-102",
      name: "Priya Sharma",
      email: "priya.sharma@yardi.com",
      role: "user",
      department: "Product Engineering",
      currentDay: 12,
      progress: 80,
      xp: 3200,
      status: "active"
    },
    {
      id: "u-103",
      name: "Marcus Vance",
      email: "marcus.vance@yardi.com",
      role: "user",
      department: "Client Services",
      currentDay: 15,
      progress: 100,
      xp: 4600,
      status: "completed"
    },
    {
      id: "u-104",
      name: "Sarah Chen",
      email: "sarah.chen@yardi.com",
      role: "user",
      department: "Data Platform",
      currentDay: 3,
      progress: 25,
      xp: 900,
      status: "active"
    },
    {
      id: "u-105",
      name: "David Kim",
      email: "david.kim@yardi.com",
      role: "user",
      department: "QA Automation",
      currentDay: 1,
      progress: 8,
      xp: 250,
      status: "inactive"
    }
  ],
  weeklyActivity: [
    { day: "Mon", active: 110, completed: 85 },
    { day: "Tue", active: 124, completed: 98 },
    { day: "Wed", active: 130, completed: 112 },
    { day: "Thu", active: 128, completed: 105 },
    { day: "Fri", active: 142, completed: 120 },
    { day: "Sat", active: 45, completed: 38 },
    { day: "Sun", active: 62, completed: 50 }
  ],
  progressDistribution: [
    { stage: "Days 1-3 (Foundations)", count: 28 },
    { stage: "Days 4-7 (Culture & Tools)", count: 42 },
    { stage: "Days 8-11 (Skills & Role)", count: 35 },
    { stage: "Days 12-14 (Scenarios)", count: 23 },
    { stage: "Day 15 (Graduated)", count: 45 }
  ]
};
