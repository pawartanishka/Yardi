const express = require('express');
const router = express.Router();
const { getActivity, completeActivity } = require('../controllers/activityController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);
router.get('/:id', getActivity);
router.post('/:id/complete', completeActivity);

module.exports = router;
