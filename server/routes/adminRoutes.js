const express = require('express');
const router = express.Router();
const {
  getAdminUsers,
  getAdminAnalytics,
  updateUserStatus,
  createJourneyDay,
  updateJourneyDay,
  deleteJourneyDay,
  createActivity,
  deleteActivity,
  getAdminQuizzes,
  createQuiz,
} = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/adminMiddleware');

// Protect all admin routes
router.use(protect);
router.use(adminOnly);

router.get('/users', getAdminUsers);
router.put('/users/:id/status', updateUserStatus);
router.get('/analytics', getAdminAnalytics);

router.route('/days').post(createJourneyDay);
router.route('/days/:id').put(updateJourneyDay).delete(deleteJourneyDay);

router.route('/activities').post(createActivity);
router.route('/activities/:id').delete(deleteActivity);

router.route('/quizzes').get(getAdminQuizzes).post(createQuiz);

module.exports = router;
