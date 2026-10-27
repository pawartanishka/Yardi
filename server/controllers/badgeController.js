const Badge = require('../models/Badge');
const UserBadge = require('../models/UserBadge');

// @desc    Get all badges and user's earned badges
// @route   GET /api/badges
// @access  Private
const getBadges = async (req, res, next) => {
  try {
    const allBadges = await Badge.find();
    const userBadges = await UserBadge.find({ userId: req.user.id });

    const formatted = allBadges.map((b) => {
      const earnedRecord = userBadges.find((ub) => ub.badgeId === b.badgeId);
      return {
        id: b.badgeId,
        name: b.name,
        description: b.description,
        icon: b.icon,
        requirement: b.requirement,
        xp: b.xp,
        earned: !!earnedRecord,
        earnedAt: earnedRecord ? earnedRecord.earnedAt : null,
      };
    });

    res.json({
      success: true,
      badges: formatted,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getBadges };
