const Quiz = require('../models/Quiz');
const QuizAttempt = require('../models/QuizAttempt');
const ActivityProgress = require('../models/ActivityProgress');
const Activity = require('../models/Activity');
const User = require('../models/User');
const awardBadge = require('../utils/awardBadge');
const Notification = require('../models/Notification');

// @desc    Get quiz questions (without answers if user)
// @route   GET /api/quizzes/:id
// @access  Private
const getQuiz = async (req, res, next) => {
  try {
    const quiz = await Quiz.findOne({
      $or: [{ quizId: req.params.id }, { activityId: req.params.id }],
    });

    if (!quiz) {
      return res.status(404).json({ success: false, message: 'Quiz not found' });
    }

    // Sanitize questions so learners don't see answers in network tab
    const sanitizedQuestions = quiz.questions.map((q, idx) => ({
      id: q._id || `q-${idx}`,
      question: q.question,
      options: q.options,
    }));

    res.json({
      success: true,
      quiz: {
        id: quiz.quizId,
        title: quiz.title,
        description: quiz.description,
        passingScore: quiz.passingScore,
        xp: quiz.xp,
        questions: sanitizedQuestions,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Submit quiz answers and calculate verified backend score
// @route   POST /api/quizzes/:id/submit
// @access  Private
const submitQuiz = async (req, res, next) => {
  try {
    const { answers } = req.body; // e.g. { 0: 1, 1: 1, 2: 1, 3: 2 } or array

    const quiz = await Quiz.findOne({
      $or: [{ quizId: req.params.id }, { activityId: req.params.id }],
    });

    if (!quiz) {
      return res.status(404).json({ success: false, message: 'Quiz not found' });
    }

    const totalQuestions = quiz.questions.length;
    let correctCount = 0;
    const answerReviews = [];

    quiz.questions.forEach((q, idx) => {
      const userSelected = Array.isArray(answers) ? answers[idx] : answers[idx];
      const isCorrect = userSelected === q.correctAnswer;

      if (isCorrect) {
        correctCount += 1;
      }

      answerReviews.push({
        question: q.question,
        options: q.options,
        userAnswer: userSelected,
        correctAnswer: q.correctAnswer,
        isCorrect,
        explanation: q.explanation,
      });
    });

    const percentage = Math.round((correctCount / totalQuestions) * 100);
    const passed = percentage >= quiz.passingScore;
    const xpEarned = passed ? quiz.xp : 0;

    // Save attempt record
    const attempt = await QuizAttempt.create({
      userId: req.user.id,
      quizId: quiz.quizId,
      answers: Array.isArray(answers) ? answers : Object.values(answers),
      score: correctCount,
      total: totalQuestions,
      percentage,
      passed,
      xpEarned,
    });

    const user = await User.findById(req.user.id);

    if (passed) {
      // Award XP
      user.xp = (user.xp || 0) + xpEarned;
      user.todayXp = (user.todayXp || 0) + xpEarned;
      await user.save();

      // If associated with an activity, mark activity complete
      if (quiz.activityId) {
        let progress = await ActivityProgress.findOne({
          userId: user._id,
          activityId: quiz.activityId,
        });

        if (!progress) {
          progress = new ActivityProgress({
            userId: user._id,
            activityId: quiz.activityId,
            dayNumber: quiz.dayNumber,
          });
        }
        progress.status = 'completed';
        progress.score = percentage;
        progress.completedAt = new Date();
        await progress.save();
      }

      // Check Quiz Master badge (100% score)
      if (percentage === 100) {
        await awardBadge(user._id, 'badge-3');
      }

      await Notification.create({
        userId: user._id,
        title: `Quiz Passed! 🎉 (${percentage}%)`,
        message: `Scored ${correctCount}/${totalQuestions} on "${quiz.title}". +${xpEarned} XP awarded.`,
        type: 'quiz',
      });
    }

    res.json({
      success: true,
      score: correctCount,
      total: totalQuestions,
      percentage,
      passed,
      xpEarned,
      passingScore: quiz.passingScore,
      review: answerReviews,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getQuiz, submitQuiz };
