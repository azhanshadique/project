import Challenge from '../models/Challenge.js';

// Get all challenges with filtering
export const getChallenges = async (req, res) => {
  try {
    const { difficulty, category, search } = req.query;
    
    // Build filter object
    const filter = {};
    
    if (difficulty) {
      filter.difficulty = difficulty;
    }
    
    if (category) {
      filter.category = category;
    }
    
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    const challenges = await Challenge.find(filter)
      .select('title difficulty category xpReward source createdAt')
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: challenges.length,
      data: challenges
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching challenges',
      error: error.message
    });
  }
};

// Get a single challenge by ID
export const getChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id);
    
    if (!challenge) {
      return res.status(404).json({
        success: false,
        message: 'Challenge not found'
      });
    }
    
    // Don't send hidden test cases to the client
    const visibleTestCases = challenge.testCases
      .filter(testCase => !testCase.isHidden)
      .map(({ input, expectedOutput }) => ({ input, expectedOutput }));
    
    const challengeData = {
      ...challenge.toObject(),
      testCases: visibleTestCases,
      // Don't send solution code to the client
      solutionCode: undefined
    };
    
    res.status(200).json({
      success: true,
      data: challengeData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching challenge',
      error: error.message
    });
  }
};

// Create a new challenge (admin only)
export const createChallenge = async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to create challenges'
      });
    }
    
    const challenge = await Challenge.create(req.body);
    
    res.status(201).json({
      success: true,
      data: challenge
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating challenge',
      error: error.message
    });
  }
};

// Update a challenge (admin only)
export const updateChallenge = async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update challenges'
      });
    }
    
    const challenge = await Challenge.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!challenge) {
      return res.status(404).json({
        success: false,
        message: 'Challenge not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: challenge
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating challenge',
      error: error.message
    });
  }
};

// Delete a challenge (admin only)
export const deleteChallenge = async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete challenges'
      });
    }
    
    const challenge = await Challenge.findByIdAndDelete(req.params.id);
    
    if (!challenge) {
      return res.status(404).json({
        success: false,
        message: 'Challenge not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting challenge',
      error: error.message
    });
  }
};