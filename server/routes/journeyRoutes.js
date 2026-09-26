const express = require('express');
const router = express.Router();
const { getJourneyDays, getDayDetails } = require('../controllers/journeyController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);
router.get('/', getJourneyDays);
router.get('/:dayId', getDayDetails);

module.exports = router;
