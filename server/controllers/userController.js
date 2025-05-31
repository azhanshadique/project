import User from '../models/User.js';

// Get user profile
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-__v');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: {
        _id: user._id,
        username: user.username,
        name: user.name,
        profilePicture: user.profilePicture,
        progress: user.progress,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching user profile',
      error: error.message
    });
  }
};

// Update user profile
export const updateUserProfile = async (req, res) => {
  try {
    // Check if the user is updating their own profile
    if (req.params.id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this profile'
      });
    }
    
    // Fields that can be updated
    const { name, profilePicture } = req.body;
    
    const updatedFields = {};
    if (name) updatedFields.name = name;
    if (profilePicture) updatedFields.profilePicture = profilePicture;
    
    const user = await User.findByIdAndUpdate(
      req.params.id,
      updatedFields,
      { new: true, runValidators: true }
    ).select('-__v');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: {
        _id: user._id,
        username: user.username,
        name: user.name,
        profilePicture: user.profilePicture,
        progress: user.progress
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating user profile',
      error: error.message
    });
  }
};

// Get user progress
export const getUserProgress = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('progress')
      .populate('progress.completedChallenges', 'title difficulty category');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: user.progress
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching user progress',
      error: error.message
    });
  }
};

// Get user leaderboard
export const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await User.find()
      .select('username name profilePicture progress.xpPoints progress.level')
      .sort({ 'progress.xpPoints': -1 })
      .limit(20);
    
    res.status(200).json({
      success: true,
      data: leaderboard
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching leaderboard',
      error: error.message
    });
  }
};