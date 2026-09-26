const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema(
  {
    dayNumber: {
      type: Number,
      required: true,
      index: true,
    },
    dayId: {
      type: String,
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['video', 'reading', 'quiz', 'challenge', 'reflection', 'checklist'],
      required: true,
    },
    duration: {
      type: String,
      default: '15 mins',
    },
    xp: {
      type: Number,
      default: 75,
    },
    order: {
      type: Number,
      required: true,
    },
    isRequired: {
      type: Boolean,
      default: true,
    },
    status: {
      type: String,
      enum: ['pending', 'in-progress', 'completed'],
      default: 'pending',
    },
    content: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    challengeData: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    reflectionPrompt: {
      type: String,
    },
    quizId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Activity', activitySchema);
