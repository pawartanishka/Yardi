/**
 * Calculates user streak based on consecutive daily activity.
 * If user completed an activity yesterday or today, streak increments/maintains.
 * If more than 48 hours have elapsed, streak resets to 1.
 */
function calculateStreak(lastActiveDate, currentStreak = 0, longestStreak = 0) {
  const now = new Date();
  if (!lastActiveDate) {
    return {
      currentStreak: 1,
      longestStreak: Math.max(1, longestStreak),
      lastActiveDate: now,
    };
  }

  const lastDate = new Date(lastActiveDate);

  // Normalize to UTC calendar date
  const nowDay = Math.floor(now.getTime() / (1000 * 60 * 60 * 24));
  const lastDay = Math.floor(lastDate.getTime() / (1000 * 60 * 60 * 24));

  const diffDays = nowDay - lastDay;

  let newStreak = currentStreak;

  if (diffDays === 0) {
    // Already active today; retain current streak
    newStreak = Math.max(1, currentStreak);
  } else if (diffDays === 1) {
    // Active yesterday; streak increments
    newStreak = currentStreak + 1;
  } else {
    // Missed a day; reset to 1
    newStreak = 1;
  }

  const newLongest = Math.max(newStreak, longestStreak);

  return {
    currentStreak: newStreak,
    longestStreak: newLongest,
    lastActiveDate: now,
  };
}

module.exports = calculateStreak;
