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
      const dayActivities = progressList.filter((p) => p.dayNumber === day.dayNumber);
      const completedCount = dayActivities.filter((p) => p.status === 'completed').length;

      let status = 'locked';
      if (day.dayNumber < user.currentDay) {
        status = 'completed';
      } else if (day.dayNumber === user.currentDay) {
        status = completedCount >= (day.activitiesCount || 4) ? 'completed' : 'current';
      } else if (day.dayNumber === user.currentDay + 1 && completedCount >= (day.activitiesCount || 4)) {
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
        activitiesCount: day.activitiesCount || 4,
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

    const activities = await Activity.find({ dayNumber }).sort({ order: 1 });
    const userProgress = await ActivityProgress.find({ userId: req.user.id, dayNumber });

    const formattedActivities = activities.map((act) => {
      const prog = userProgress.find((p) => p.activityId === act._id.toString() || p.activityId === act.dayId);
      return {
        id: act._id,
        dayId: `day-${act.dayNumber}`,
        title: act.title,
        description: act.description,
        type: act.type,
        duration: act.duration,
        xp: act.xp,
        order: act.order,
        isRequired: act.isRequired,
        status: prog ? prog.status : 'pending',
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
