const mongoose = require('mongoose');

const journeyDaySchema = new mongoose.Schema(
  {
    dayNumber: {
      type: Number,
      required: true,
      unique: true,
      min: 1,
      max: 15,
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
    estimatedTime: {
      type: String,
      default: '45 mins',
    },
    xp: {
      type: Number,
      default: 300,
    },
    status: {
      type: String,
      enum: ['completed', 'current', 'available', 'locked'],
      default: 'locked',
    },
    order: {
      type: Number,
      required: true,
    },
    activitiesCount: {
      type: Number,
      default: 4,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('JourneyDay', journeyDaySchema);
