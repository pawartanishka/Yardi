const Activity = require('../models/Activity');
const ActivityProgress = require('../models/ActivityProgress');
const JourneyDay = require('../models/JourneyDay');
const User = require('../models/User');
const Notification = require('../models/Notification');
const calculateStreak = require('../utils/calculateStreak');
const awardBadge = require('../utils/awardBadge');

// @desc    Get activity by ID
// @route   GET /api/activities/:id
// @access  Private
const getActivity = async (req, res, next) => {
  try {
    const activity = await Activity.findById(req.params.id);
    if (!activity) {
      return res.status(404).json({ success: false, message: 'Activity not found' });
    }
    res.json({ success: true, activity });
  } catch (error) {
    next(error);
  }
};

// @desc    Mark activity as completed
// @route   POST /api/activities/:id/complete
// @access  Private
const completeActivity = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const activity = await Activity.findById(req.params.id);

    if (!activity) {
      return res.status(404).json({ success: false, message: 'Activity module not found' });
    }

    // Security check: normal user cannot complete activities in future locked days
    if (user.role !== 'admin' && activity.dayNumber > user.currentDay) {
      return res.status(403).json({
        success: false,
        message: 'Cannot complete activity in a locked milestone.',
      });
    }

    // Check if already completed
    let progress = await ActivityProgress.findOne({
      userId: user._id,
      activityId: activity._id.toString(),
    });

    if (progress && progress.status === 'completed') {
      return res.json({
        success: true,
        alreadyCompleted: true,
        message: 'Activity already completed previously',
        xpEarned: 0,
      });
    }

    if (!progress) {
      progress = new ActivityProgress({
        userId: user._id,
        activityId: activity._id.toString(),
        dayNumber: activity.dayNumber,
      });
    }

    progress.status = 'completed';
    progress.completedAt = new Date();
    await progress.save();

    // Award XP
    const xpGained = activity.xp || 50;
    user.xp = (user.xp || 0) + xpGained;
    user.todayXp = (user.todayXp || 0) + xpGained;

    // Update streak
    const streakUpdate = calculateStreak(user.lastActiveDate, user.currentStreak, user.longestStreak);
    user.currentStreak = streakUpdate.currentStreak;
    user.longestStreak = streakUpdate.longestStreak;
    user.lastActiveDate = streakUpdate.lastActiveDate;

    // Check day completion: how many required activities are done?
    const allDayActivities = await Activity.find({ dayNumber: activity.dayNumber });
    const allUserDayProgress = await ActivityProgress.find({
      userId: user._id,
      dayNumber: activity.dayNumber,
      status: 'completed',
    });

    const isDayCompleted = allUserDayProgress.length >= allDayActivities.length;
    let nextDayUnlocked = false;

    if (isDayCompleted) {
      // Day completed bonus XP
      const dayBonusXp = 200;
      user.xp += dayBonusXp;

      if (user.currentDay === activity.dayNumber && user.currentDay < 15) {
        user.currentDay += 1;
        nextDayUnlocked = true;
      }

      // Recalculate overall progress %
      user.overallProgress = Math.min(100, Math.round((user.currentDay / 15) * 100));

      await Notification.create({
        userId: user._id,
        title: `Day ${activity.dayNumber} Finished! 🎉`,
        message: `Outstanding job completing all Day ${activity.dayNumber} activities! Day ${user.currentDay} is now open (+${dayBonusXp} XP bonus).`,
        type: 'completion',
      });

      // Award Day 1 Badge
      if (activity.dayNumber === 1) {
        await awardBadge(user._id, 'badge-1');
      }

      // Award Day 3 Badge
      if (activity.dayNumber === 3) {
        await awardBadge(user._id, 'badge-2');
      }

      // Award Day 8 Badge
      if (activity.dayNumber === 8) {
        await awardBadge(user._id, 'badge-6');
      }

      // Award Day 15 Completion Badge!
      if (activity.dayNumber === 15) {
        await awardBadge(user._id, 'badge-8');
      }
    } else {
      await Notification.create({
        userId: user._id,
        title: `Activity Completed! (+${xpGained} XP)`,
        message: `Completed "${activity.title}".`,
        type: 'completion',
      });
    }

    // Award streak badge if reached 5 days
    if (user.currentStreak >= 5) {
      await awardBadge(user._id, 'badge-5');
    }

    await user.save();

    res.json({
      success: true,
      xpEarned: xpGained,
      isDayCompleted,
      nextDayUnlocked,
      userStats: {
        xp: user.xp,
        currentDay: user.currentDay,
        currentStreak: user.currentStreak,
        overallProgress: user.overallProgress,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getActivity, completeActivity };
