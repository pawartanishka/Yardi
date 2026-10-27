const User = require('../models/User');
const Activity = require('../models/Activity');
const ActivityProgress = require('../models/ActivityProgress');
const QuizAttempt = require('../models/QuizAttempt');
const UserBadge = require('../models/UserBadge');

// @desc    Get detailed user learning progress & stats
// @route   GET /api/progress
// @access  Private
const getProgress = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const completedActivities = await ActivityProgress.find({
      userId: user._id,
      status: 'completed',
    });

    const totalActivities = await Activity.countDocuments();
    const quizAttempts = await QuizAttempt.find({ userId: user._id });
    const earnedBadges = await UserBadge.find({ userId: user._id });

    // Calculate verified avg quiz score
    let avgQuiz = 0;
    if (quizAttempts.length > 0) {
      const sum = quizAttempts.reduce((acc, curr) => acc + (curr.percentage || 0), 0);
      avgQuiz = Math.round(sum / quizAttempts.length);
    }

    // Category breakdown derived from real activity records
    const allActivities = await Activity.find().select('type');
    const completedActIds = new Set(completedActivities.map((c) => c.activityId));

    const categoryCounts = {
      video: { name: 'Video Modules', completed: 0, total: 0, color: '#2563EB' },
      reading: { name: 'Reading Guides', completed: 0, total: 0, color: '#7C3AED' },
      quiz: { name: 'Quizzes & Checks', completed: 0, total: 0, color: '#10B981' },
      challenge: { name: 'Workplace Simulations', completed: 0, total: 0, color: '#F59E0B' },
      reflection: { name: 'Checklists & Reflections', completed: 0, total: 0, color: '#06B6D4' },
      checklist: { name: 'Checklists & Reflections', completed: 0, total: 0, color: '#06B6D4' },
    };

    allActivities.forEach((act) => {
      const cat = categoryCounts[act.type] || categoryCounts['reading'];
      cat.total += 1;
      if (completedActIds.has(act._id.toString())) {
        cat.completed += 1;
      }
    });

    // Deduplicate categories for charting
    const categoryData = [
      categoryCounts.video,
      categoryCounts.reading,
      categoryCounts.quiz,
      categoryCounts.challenge,
      categoryCounts.reflection,
    ].filter((c) => c.total > 0);

    res.json({
      success: true,
      stats: {
        overallProgress: user.overallProgress !== undefined ? user.overallProgress : 0,
        currentDay: user.currentDay || 1,
        totalDays: 15,
        completedActivities: completedActivities.length,
        totalActivities: totalActivities || 0,
        xp: user.xp || 0,
        currentStreak: user.currentStreak || 0,
        longestStreak: user.longestStreak || 0,
        quizAverage: avgQuiz,
        badgesEarnedCount: earnedBadges.length,
        categoryData,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getProgress };
