const UserBadge = require('../models/UserBadge');
const Badge = require('../models/Badge');
const Notification = require('../models/Notification');
const User = require('../models/User');

/**
 * Checks if a user has earned a specific badge and awards it.
 */
async function awardBadge(userId, badgeId) {
  try {
    const existing = await UserBadge.findOne({ userId, badgeId });
    if (existing) return null;

    const badge = await Badge.findOne({ badgeId });
    if (!badge) return null;

    const userBadge = await UserBadge.create({
      userId,
      badgeId,
      earnedAt: new Date(),
    });

    // Add badge XP bonus to user
    await User.findByIdAndUpdate(userId, {
      $inc: { xp: badge.xp || 100 },
    });

    // Create notification
    await Notification.create({
      userId,
      title: `Badge Unlocked: ${badge.name} 🏆`,
      message: `${badge.description} (+${badge.xp} XP bonus)`,
      type: 'badge',
    });

    return { badge, userBadge };
  } catch (err) {
    console.error(`Error awarding badge ${badgeId}:`, err.message);
    return null;
  }
}

module.exports = awardBadge;
