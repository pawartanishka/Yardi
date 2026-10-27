const JourneyDay = require('../models/JourneyDay');
const Activity = require('../models/Activity');
const ActivityProgress = require('../models/ActivityProgress');
const User = require('../models/User');

// @desc    Get all 15 journey days with user progress
// @route   GET /api/journey
// @access  Private
const getJourneyDays = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const days = await JourneyDay.find().sort({ order: 1 });

    // Fetch user activity progress
    const progressList = await ActivityProgress.find({ userId: req.user.id });

    // Format days with user-specific unlock & completion state
    const formattedDays = days.map((day) => {
      const actCount = day.activitiesCount || (day.dayNumber === 5 ? 5 : 4);
      const dayActivities = progressList.filter((p) => p.dayNumber === day.dayNumber);
      let completedCount = dayActivities.filter((p) => p.status === 'completed').length;

      let status = 'locked';
      if (day.dayNumber < user.currentDay) {
        status = 'completed';
        completedCount = actCount;
      } else if (day.dayNumber === user.currentDay) {
        status = completedCount >= actCount ? 'completed' : 'current';
      } else if (day.dayNumber === user.currentDay + 1 && completedCount >= actCount) {
        status = 'available';
      }

      return {
        id: `day-${day.dayNumber}`,
        dayNumber: day.dayNumber,
        title: day.title,
        description: day.description,
        estimatedTime: day.estimatedTime,
        xp: day.xp,
        status,
        activitiesCount: actCount,
        completedCount,
        order: day.order,
      };
    });

    res.json({
      success: true,
      currentDay: user.currentDay,
      days: formattedDays,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get details & activities of a specific day
// @route   GET /api/journey/:dayId
// @access  Private
const getDayDetails = async (req, res, next) => {
  try {
    const { dayId } = req.params;
    const dayNumber = parseInt(dayId.replace('day-', ''), 10);

    const user = await User.findById(req.user.id);

    // Verify day unlock status: normal users cannot view days beyond their unlocked horizon
    if (user.role !== 'admin' && dayNumber > user.currentDay) {
      return res.status(403).json({
        success: false,
        message: `Day ${dayNumber} is currently locked. Complete Day ${user.currentDay} to unlock this milestone.`,
      });
    }

    const day = await JourneyDay.findOne({ dayNumber });
    if (!day) {
      return res.status(404).json({ success: false, message: 'Day milestone not found' });
    }

    let activities = await Activity.find({ dayNumber }).sort({ order: 1 });
    const userProgress = await ActivityProgress.find({ userId: req.user.id, dayNumber });

    // If no activities seeded in DB for this day, provide curated fallback activities
    if (activities.length === 0) {
      const defaultActivities = [
        {
          _id: `act-${dayNumber}-1`,
          dayNumber,
          dayId: `day-${dayNumber}`,
          title: `Overview & Welcome to ${day.title}`,
          description: `Key conceptual walkthrough of ${day.title.toLowerCase()} for incoming team members.`,
          type: 'video',
          duration: '10 mins',
          xp: 80,
          order: 1,
          isRequired: true,
          content: {
            overview: day.description,
            takeaways: [
              'Understand the core principles and standards expected in your team.',
              'Familiarize yourself with documentation and internal tools.',
              'Reach out to your designated buddy for any domain questions.'
            ]
          }
        },
        {
          _id: `act-${dayNumber}-2`,
          dayNumber,
          dayId: `day-${dayNumber}`,
          title: `Essential Reading: Best Practices in ${day.title}`,
          description: `Comprehensive playbook guidelines and operational frameworks.`,
          type: 'reading',
          duration: '15 mins',
          xp: 70,
          order: 2,
          isRequired: true,
          content: {
            overview: `Deep dive into standard operating procedures and best practices for ${day.title}.`,
            sections: [
              { heading: 'Core Principles', text: 'Adhere to our high bar for client delivery, clear documentation, and cross-functional empathy.' },
              { heading: 'Practical Applications', text: 'Apply these frameworks to your daily deliverables and squad interactions.' }
            ]
          }
        },
        {
          _id: `act-${dayNumber}-3`,
          dayNumber,
          dayId: `day-${dayNumber}`,
          title: `Interactive Challenge: ${day.title} Scenario`,
          description: `Solve an interactive real-world situation encountered by Yardi teams.`,
          type: 'challenge',
          duration: '12 mins',
          xp: 100,
          order: 3,
          isRequired: true,
          challengeData: {
            scenario: `You encounter a priority task related to ${day.title.toLowerCase()} with upcoming deadlines.`,
            question: 'How do you coordinate with your squad for the most effective outcome?',
            options: [
              { text: 'Communicate early in the squad channel with context and proposed solutions.', correct: true },
              { text: 'Wait until the sprint review before mentioning blockers.', correct: false },
              { text: 'Work entirely in isolation without informing the team.', correct: false }
            ],
            explanation: 'Early and contextual communication prevents blockers and empowers the team to assist.'
          }
        },
        {
          _id: `act-${dayNumber}-4`,
          dayNumber,
          dayId: `day-${dayNumber}`,
          title: `Day ${dayNumber} Milestone Knowledge Check`,
          description: `Validate your comprehension of the concepts covered in this milestone.`,
          type: 'quiz',
          duration: '10 mins',
          xp: 100,
          order: 4,
          isRequired: true,
          quizId: `quiz-day-${dayNumber}`
        }
      ];
      activities = defaultActivities;
    }

    const formattedActivities = activities.map((act) => {
      const actIdStr = act._id ? act._id.toString() : act.id;
      const prog = userProgress.find((p) => p.activityId === actIdStr || p.activityId === act.dayId);
      const isPastDay = dayNumber < user.currentDay;
      return {
        id: actIdStr,
        dayId: `day-${act.dayNumber}`,
        title: act.title,
        description: act.description,
        type: act.type,
        duration: act.duration,
        xp: act.xp,
        order: act.order,
        isRequired: act.isRequired,
        status: isPastDay ? 'completed' : (prog ? prog.status : 'pending'),
        content: act.content,
        challengeData: act.challengeData,
        reflectionPrompt: act.reflectionPrompt,
        quizId: act.quizId,
      };
    });

    res.json({
      success: true,
      day: {
        id: `day-${day.dayNumber}`,
        dayNumber: day.dayNumber,
        title: day.title,
        description: day.description,
        estimatedTime: day.estimatedTime,
        xp: day.xp,
      },
      activities: formattedActivities,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getJourneyDays, getDayDetails };
