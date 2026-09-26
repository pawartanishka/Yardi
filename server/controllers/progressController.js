const User = require('../models/User');
const ActivityProgress = require('../models/ActivityProgress');
const QuizAttempt = require('../models/QuizAttempt');
const UserBadge = require('../models/UserBadge');

// @desc    Get detailed user learning progress & stats
// @route   GET /api/progress
// @access  Private
const getProgress = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const completedActivities = await ActivityProgress.find({
      userId: user._id,
      status: 'completed',
    });

    const quizAttempts = await QuizAttempt.find({ userId: user._id });
    const earnedBadges = await UserBadge.find({ userId: user._id });

    // Calculate avg quiz score
    let avgQuiz = 0;
    if (quizAttempts.length > 0) {
      const sum = quizAttempts.reduce((acc, curr) => acc + (curr.percentage || 0), 0);
      avgQuiz = Math.round(sum / quizAttempts.length);
    }

    res.json({
      success: true,
      stats: {
        overallProgress: user.overallProgress || 42,
        currentDay: user.currentDay || 1,
        totalDays: 15,
        completedActivities: completedActivities.length,
        totalActivities: 58,
        xp: user.xp,
        currentStreak: user.currentStreak,
        longestStreak: user.longestStreak,
        quizAverage: avgQuiz || 90,
        badgesEarnedCount: earnedBadges.length,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getProgress };
