import fetch from 'node-fetch';
import Submission from '../models/Submission.js';
import Challenge from '../models/Challenge.js';
import User from '../models/User.js';

// Helper function to map Judge0 API status to our status
const mapJudge0Status = (status) => {
  const statusMap = {
    1: 'pending',         // In Queue
    2: 'pending',         // Processing
    3: 'accepted',        // Accepted
    4: 'wrong_answer',    // Wrong Answer
    5: 'time_limit_exceeded', // Time Limit Exceeded
    6: 'compilation_error', // Compilation Error
    7: 'runtime_error',   // Runtime Error (SIGSEGV)
    8: 'runtime_error',   // Runtime Error (SIGXFSZ)
    9: 'runtime_error',   // Runtime Error (SIGFPE)
    10: 'runtime_error',  // Runtime Error (SIGABRT)
    11: 'runtime_error',  // Runtime Error (NZEC)
    12: 'runtime_error',  // Runtime Error (Other)
    13: 'runtime_error',  // Internal Error
    14: 'memory_limit_exceeded' // Memory Limit Exceeded
  };
  
  return statusMap[status] || 'pending';
};

// Helper function to map language IDs to Judge0 API language IDs
const getLanguageId = (language) => {
  const languageMap = {
    'c': 50,
    'cpp': 54,
    'java': 62,
    'python': 71,
    'javascript': 63,
    'go': 60,
    'ruby': 72,
    'rust': 73,
    'csharp': 51
  };
  
  return languageMap[language.toLowerCase()] || 71; // Default to Python
};

// Submit code to Judge0 API
export const submitCode = async (req, res) => {
  try {
    const { challengeId, code, language } = req.body;
    const userId = req.user.id;
    
    // Get challenge details
    const challenge = await Challenge.findById(challengeId);
    if (!challenge) {
      return res.status(404).json({
        success: false,
        message: 'Challenge not found'
      });
    }
    
    // Create submission record
    const submission = await Submission.create({
      user: userId,
      challenge: challengeId,
      code,
      language,
      status: 'pending',
      totalTestCases: challenge.testCases.length
    });
    
    // Prepare API request to Judge0
    const languageId = getLanguageId(language);
    const testCase = challenge.testCases[0]; // Use first test case for initial submission
    
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': process.env.JUDGE0_API_KEY,
        'X-RapidAPI-Host': new URL(process.env.JUDGE0_API_URL).host
      },
      body: JSON.stringify({
        source_code: code,
        language_id: languageId,
        stdin: testCase.input || '',
        expected_output: testCase.expectedOutput || ''
      })
    };
    
    // For demo purposes, we'll mock the Judge0 API response
    // In a real application, you would use:
    // const response = await fetch(`${process.env.JUDGE0_API_URL}/submissions`, options);
    // const data = await response.json();
    
    // Mock successful submission
    const mockResponse = {
      token: `mock-token-${Date.now()}`,
      status: { id: 3, description: 'Accepted' },
      stdout: testCase.expectedOutput,
      time: "0.01",
      memory: 9492
    };
    
    // Update submission with results
    submission.status = mapJudge0Status(mockResponse.status.id);
    submission.executionTime = parseFloat(mockResponse.time) * 1000; // Convert to ms
    submission.memoryUsed = mockResponse.memory; // In KB
    submission.output = mockResponse.stdout;
    
    // Calculate test cases passed (simplified for demo)
    submission.testCasesPassed = mockResponse.status.id === 3 ? 1 : 0;
    
    // Save updated submission
    await submission.save();
    
    // If all test cases are passed, update user progress
    if (submission.status === 'accepted' && submission.testCasesPassed === challenge.testCases.length) {
      const user = await User.findById(userId);
      
      // Check if challenge is already completed
      if (!user.progress.completedChallenges.includes(challengeId)) {
        user.progress.completedChallenges.push(challengeId);
        user.progress.xpPoints += challenge.xpReward;
        
        // Check if user has leveled up (very simple level system)
        const newLevel = Math.floor(user.progress.xpPoints / 100) + 1;
        if (newLevel > user.progress.level) {
          user.progress.level = newLevel;
          // Add a badge for leveling up if it's a milestone
          if (newLevel % 5 === 0) {
            user.progress.badges.push(`Level ${newLevel} Achiever`);
          }
        }
        
        await user.save({ validateBeforeSave: false });
      }
    }
    
    res.status(200).json({
      success: true,
      data: {
        submissionId: submission._id,
        status: submission.status,
        executionTime: submission.executionTime,
        memoryUsed: submission.memoryUsed,
        output: submission.output,
        testCasesPassed: submission.testCasesPassed,
        totalTestCases: submission.totalTestCases
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error submitting code',
      error: error.message
    });
  }
};

// Get submission by ID
export const getSubmission = async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id)
      .populate('challenge', 'title difficulty category')
      .populate('user', 'username');
    
    if (!submission) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found'
      });
    }
    
    // Check if user is authorized to view this submission
    if (submission.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this submission'
      });
    }
    
    res.status(200).json({
      success: true,
      data: submission
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching submission',
      error: error.message
    });
  }
};

// Get all submissions for a user
export const getUserSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find({ user: req.user.id })
      .populate('challenge', 'title difficulty category')
      .sort({ submittedAt: -1 });
    
    res.status(200).json({
      success: true,
      count: submissions.length,
      data: submissions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching submissions',
      error: error.message
    });
  }
};