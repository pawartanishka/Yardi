const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide your full name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/\S+@\S+\.\S+/, 'Please provide a valid email address'],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 6,
      select: false,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    department: {
      type: String,
      default: 'Cloud Real Estate Solutions',
    },
    employeeId: {
      type: String,
      default: () => `YAR-${Math.floor(10000 + Math.random() * 90000)}`,
    },
    joiningDate: {
      type: String,
      default: 'October 12, 2026',
    },
    profileImage: {
      type: String,
      default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    },
    bio: {
      type: String,
      default: 'Incoming Software Engineer passionate about enterprise cloud applications and scalable distributed systems.',
    },
    phone: {
      type: String,
      default: '+1 (555) 234-8921',
    },
    xp: {
      type: Number,
      default: 0,
    },
    todayXp: {
      type: Number,
      default: 0,
    },
    currentStreak: {
      type: Number,
      default: 1,
    },
    longestStreak: {
      type: Number,
      default: 1,
    },
    lastActiveDate: {
      type: Date,
      default: Date.now,
    },
    currentDay: {
      type: Number,
      default: 1,
    },
    overallProgress: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'completed'],
      default: 'active',
    },
  },
  {
    timestamps: true,
  }
);

// Encrypt password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Match entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
