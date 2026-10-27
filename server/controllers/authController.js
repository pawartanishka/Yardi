const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const Notification = require('../models/Notification');

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, department } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields (name, email, password)',
      });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'An account with this email address already exists',
      });
    }

    const user = await User.create({
      name,
      email,
      password,
      department: department || 'Cloud Real Estate Solutions',
      role: 'user',
      currentDay: 1,
      overallProgress: 0,
      xp: 0,
    });

    // Create welcome notification
    await Notification.create({
      userId: user._id,
      title: 'Welcome to YARDI LaunchPad! 🎉',
      message: 'Your 15-Day Pre-Joining Onboarding journey has begun. Start with Day 1 activities!',
      type: 'welcome',
    });

    const token = generateToken(user._id, user.role);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department,
        currentDay: user.currentDay,
        xp: user.xp,
        currentStreak: user.currentStreak,
        overallProgress: user.overallProgress,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please enter both email and password',
      });
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    const token = generateToken(user._id, user.role);

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department,
        employeeId: user.employeeId,
        joiningDate: user.joiningDate,
        profileImage: user.profileImage,
        bio: user.bio,
        phone: user.phone,
        currentDay: user.currentDay,
        xp: user.xp,
        todayXp: user.todayXp,
        currentStreak: user.currentStreak,
        longestStreak: user.longestStreak,
        overallProgress: user.overallProgress,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { registerUser, loginUser, getMe };
