const express = require('express');
const router = express.Router();
const { getBadges } = require('../controllers/badgeController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);
router.get('/', getBadges);
router.get('/me', getBadges);

module.exports = router;
