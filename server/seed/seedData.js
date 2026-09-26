const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

dotenv.config();

const User = require('../models/User');
const JourneyDay = require('../models/JourneyDay');
const Activity = require('../models/Activity');
const Quiz = require('../models/Quiz');
const Badge = require('../models/Badge');
const UserBadge = require('../models/UserBadge');
const Notification = require('../models/Notification');
const ActivityProgress = require('../models/ActivityProgress');

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/yardi_launchpad';
    await mongoose.connect(uri);
    console.log('[Seed] Connected to MongoDB for seeding');
  } catch (error) {
    console.error('[Seed Error]:', error.message);
    process.exit(1);
  }
};

const seedDatabase = async () => {
  try {
    await connectDB();

    console.log('[Seed] Clearing existing collections...');
    await User.deleteMany();
    await JourneyDay.deleteMany();
    await Activity.deleteMany();
    await Quiz.deleteMany();
    await Badge.deleteMany();
    await UserBadge.deleteMany();
    await Notification.deleteMany();
    await ActivityProgress.deleteMany();

    console.log('[Seed] Creating demo users...');
    // Create Admin
    const adminUser = await User.create({
      name: 'Sarah Connor',
      email: 'admin@yardi.com',
      password: 'Admin@123',
      role: 'admin',
      department: 'Talent & Organizational Development',
      currentDay: 15,
      xp: 5000,
      overallProgress: 100,
      currentStreak: 15,
      longestStreak: 15,
      status: 'active',
    });

    // Create Learner Demo User
    const demoUser = await User.create({
      name: 'Alex Rivera',
      email: 'user@yardi.com',
      password: 'User@123',
      role: 'user',
      department: 'Cloud Real Estate Solutions',
      currentDay: 5,
      xp: 1450,
      todayXp: 180,
      currentStreak: 5,
      longestStreak: 5,
      overallProgress: 42,
      status: 'active',
      bio: 'Incoming Software Engineer passionate about enterprise cloud applications and scalable distributed systems.',
      phone: '+1 (555) 234-8921',
      joiningDate: 'October 12, 2026',
    });

    console.log('[Seed] Seeding 15 Journey Days...');
    const daysData = [
      { dayNumber: 1, title: 'Welcome to YARDI LaunchPad', description: 'Kick off your pre-joining journey with a warm leadership welcome and platform overview.', estimatedTime: '35 mins', xp: 250, order: 1, status: 'completed' },
      { dayNumber: 2, title: 'Understanding the Organization', description: 'Discover Yardi legacy, global property technology footprint, and market impact.', estimatedTime: '40 mins', xp: 300, order: 2, status: 'completed' },
      { dayNumber: 3, title: 'Culture & Core Values', description: 'Learn how we take care of our clients, our employees, and our communities.', estimatedTime: '45 mins', xp: 350, order: 3, status: 'completed' },
      { dayNumber: 4, title: 'People & Teams', description: 'Understand organizational structure, leadership hierarchy, and cross-functional squads.', estimatedTime: '30 mins', xp: 300, order: 4, status: 'completed' },
      { dayNumber: 5, title: 'Communication & Collaboration', description: 'Master modern workplace collaboration, async communication, and feedback loops.', estimatedTime: '50 mins', xp: 400, order: 5, status: 'current' },
      { dayNumber: 6, title: 'Workplace Tools & Tech Ecosystem', description: 'Get familiar with our productivity suite, development environments, and cloud tools.', estimatedTime: '45 mins', xp: 350, order: 6, status: 'locked' },
      { dayNumber: 7, title: 'Security & Data Awareness', description: 'Critical cybersecurity guidelines, enterprise data protection, and compliance norms.', estimatedTime: '40 mins', xp: 400, order: 7, status: 'locked' },
      { dayNumber: 8, title: 'Professional Skills & Agility', description: 'Time management, problem decomposition, and working in fast-paced software squads.', estimatedTime: '45 mins', xp: 350, order: 8, status: 'locked' },
      { dayNumber: 9, title: 'Workplace Etiquette & Inclusivity', description: 'Meeting guidelines, virtual workplace etiquette, and fostering respectful teamwork.', estimatedTime: '35 mins', xp: 300, order: 9, status: 'locked' },
      { dayNumber: 10, title: 'Continuous Learning & Growth', description: 'Explore Yardi learning portals, certifications, mentorship, and career pathways.', estimatedTime: '40 mins', xp: 350, order: 10, status: 'locked' },
      { dayNumber: 11, title: 'Role Preparation & Expectations', description: 'Review specific expectations for your squad role, deliverables, and first 90-day roadmap.', estimatedTime: '50 mins', xp: 400, order: 11, status: 'locked' },
      { dayNumber: 12, title: 'Real-World Scenarios & Case Studies', description: 'Tackle realistic simulated engineering and client delivery scenarios.', estimatedTime: '55 mins', xp: 450, order: 12, status: 'locked' },
      { dayNumber: 13, title: 'Connect & Engage', description: 'Meet your buddy, join employee resource groups, and introduce yourself to the squad.', estimatedTime: '35 mins', xp: 300, order: 13, status: 'locked' },
      { dayNumber: 14, title: 'Final Day 1 Checklist & Verification', description: 'Double-check your hardware delivery, HR documents, ID badges, and Day 1 reporting link.', estimatedTime: '30 mins', xp: 350, order: 14, status: 'locked' },
      { dayNumber: 15, title: 'LaunchPad Completion & Celebration', description: 'Final readiness assessment, graduation reflection, and official certificate of readiness.', estimatedTime: '45 mins', xp: 600, order: 15, status: 'locked' },
    ];

    await JourneyDay.insertMany(daysData);

    console.log('[Seed] Seeding Badges...');
    const badgesData = [
      { badgeId: 'badge-1', name: 'First Step', description: 'Completed Day 1 of the LaunchPad Journey', icon: 'Rocket', requirement: 'Complete Day 1', xp: 100 },
      { badgeId: 'badge-2', name: 'Getting Started', description: 'Completed 3 consecutive journey days', icon: 'Flame', requirement: 'Complete 3 Days', xp: 200 },
      { badgeId: 'badge-3', name: 'Quiz Master', description: 'Scored 100% on any pre-joining knowledge assessment', icon: 'Award', requirement: 'Score 100% on a quiz', xp: 250 },
      { badgeId: 'badge-4', name: 'Culture Champion', description: 'Explored Yardi core values and community ethics', icon: 'HeartHandshake', requirement: 'Complete Day 3 & 4 activities', xp: 200 },
      { badgeId: 'badge-5', name: 'Consistency', description: 'Maintained an active 5-day learning streak', icon: 'Zap', requirement: 'Maintain a 5-day streak', xp: 300 },
      { badgeId: 'badge-6', name: 'Halfway There', description: 'Completed Day 8 - milestone halfway point reached!', icon: 'Compass', requirement: 'Complete Day 8', xp: 400 },
      { badgeId: 'badge-7', name: 'Problem Solver', description: 'Passed real-world workplace scenario challenges', icon: 'ShieldCheck', requirement: 'Complete Day 12 scenarios', xp: 350 },
      { badgeId: 'badge-8', name: 'LaunchPad Champion', description: 'Successfully graduated from the complete 15-Day Journey', icon: 'Trophy', requirement: 'Complete all 15 days', xp: 1000 },
    ];

    await Badge.insertMany(badgesData);

    // Award badges 1, 2, 3, 4, 5 to demo user
    await UserBadge.create([
      { userId: demoUser._id, badgeId: 'badge-1', earnedAt: new Date(Date.now() - 5 * 86400000) },
      { userId: demoUser._id, badgeId: 'badge-2', earnedAt: new Date(Date.now() - 3 * 86400000) },
      { userId: demoUser._id, badgeId: 'badge-3', earnedAt: new Date(Date.now() - 2 * 86400000) },
      { userId: demoUser._id, badgeId: 'badge-4', earnedAt: new Date(Date.now() - 1 * 86400000) },
      { userId: demoUser._id, badgeId: 'badge-5', earnedAt: new Date() },
    ]);

    console.log('[Seed] Seeding Day 5 Activities...');
    const day5Activities = [
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
          overview: 'Effective communication is the lifeblood of high-performing engineering and client-success teams.',
          sections: [
            { heading: '1. The 3 Pillars of Written Updates', text: 'Every update should include: What was accomplished, what is in progress, and any active blockers or dependencies.' },
            { heading: '2. Meeting Hygiene & Purpose', text: 'No meeting without an agenda. If a topic can be resolved via an email in under 10 minutes, skip the call.' },
            { heading: '3. Constructive Feedback Loops', text: 'Feedback accelerates team growth. Frame code reviews around problem-solving.' }
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
          explanation: 'Scheduling a brief 15-minute sync with objective trade-offs respects team members expertise while moving quickly toward delivery.'
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
        title: 'Personal Reflection & Day 5 Commitment',
        description: 'Write a short personal reflection on how you plan to foster open communication in your new squad.',
        type: 'reflection',
        duration: '8 mins',
        xp: 50,
        order: 5,
        isRequired: false,
        reflectionPrompt: 'What is one communication habit you want to practice during your first month at Yardi?'
      }
    ];

    const insertedDay5Activities = await Activity.insertMany(day5Activities);

    // Mark the first 3 activities of Day 5 completed for demo user
    await ActivityProgress.create([
      { userId: demoUser._id, activityId: insertedDay5Activities[0]._id.toString(), dayNumber: 5, status: 'completed' },
      { userId: demoUser._id, activityId: insertedDay5Activities[1]._id.toString(), dayNumber: 5, status: 'completed' },
      { userId: demoUser._id, activityId: insertedDay5Activities[2]._id.toString(), dayNumber: 5, status: 'completed' },
    ]);

    console.log('[Seed] Seeding Day 5 Quiz...');
    await Quiz.create({
      quizId: 'quiz-day-5',
      activityId: insertedDay5Activities[3]._id.toString(),
      dayNumber: 5,
      title: 'Day 5: Communication & Collaboration Knowledge Check',
      description: 'Answer these 4 questions to validate your understanding of team collaboration and earn +100 XP.',
      passingScore: 75,
      xp: 100,
      questions: [
        {
          question: 'Which communication habit is most effective for an asynchronous distributed team?',
          options: [
            "Sending 'Hi' and waiting for a reply before explaining your question",
            'Writing a complete, contextual message with details, links, and desired outcome in the first message',
            'Calling team members directly on video without sending a prior chat notice',
            'Only communicating through monthly team emails'
          ],
          correctAnswer: 1,
          explanation: 'Providing full context upfront minimizes unnecessary back-and-forth and respects teammates focus time across time zones.'
        },
        {
          question: 'When conducting code reviews or peer evaluations, feedback should primarily be:',
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
    });

    console.log('[Seed] Seeding Initial Notifications...');
    await Notification.create([
      { userId: demoUser._id, title: 'Day 5 Unlocked!', message: 'Communication & Collaboration activities are now ready for you.', type: 'unlock' },
      { userId: demoUser._id, title: 'Badge Earned: Consistency 🔥', message: 'You maintained a 5-day streak and earned +300 XP.', type: 'badge' },
      { userId: demoUser._id, title: 'Quiz Completed!', message: 'You scored 100% in Culture & Values check (+100 XP).', type: 'quiz', read: true },
      { userId: demoUser._id, title: 'Welcome to YARDI LaunchPad', message: 'We are thrilled to have you join our team. Start your Day 1 journey!', type: 'welcome', read: true },
    ]);

    console.log('----------------------------------------------------');
    console.log('✅ YARDI LaunchPad Database successfully seeded!');
    console.log('Learner Credentials: user@yardi.com  / User@123');
    console.log('Admin Credentials:   admin@yardi.com / Admin@123');
    console.log('----------------------------------------------------');

    process.exit(0);
  } catch (err) {
    console.error('[Seed Error]:', err);
    process.exit(1);
  }
};

seedDatabase();
