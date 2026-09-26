const User = require('../models/User');

// @desc    Get user profile
// @route   GET /api/users/me
// @access  Private
const getUserProfile = async (req, res, next) => {
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

// @desc    Update user editable profile info
// @route   PUT /api/users/me
// @access  Private
const updateUserProfile = async (req, res, next) => {
  try {
    const { name, phone, bio } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (bio) user.bio = bio;

    await user.save();

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getUserProfile, updateUserProfile };
