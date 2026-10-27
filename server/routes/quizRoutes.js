const express = require('express');
const router = express.Router();
const { getQuiz, submitQuiz } = require('../controllers/quizController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);
router.get('/:id', getQuiz);
router.post('/:id/submit', submitQuiz);

module.exports = router;
