import mongoose from 'mongoose';

const challengeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a challenge title'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide a challenge description']
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    required: [true, 'Please specify the difficulty level']
  },
  category: {
    type: String,
    required: [true, 'Please provide a category'],
    enum: ['algorithms', 'data-structures', 'web', 'database', 'machine-learning']
  },
  starterCode: {
    type: Map,
    of: String,
    required: [true, 'Please provide starter code for at least one language']
  },
  testCases: [{
    input: String,
    expectedOutput: String,
    isHidden: { type: Boolean, default: false }
  }],
  solutionCode: {
    type: Map,
    of: String
  },
  hints: [String],
  xpReward: {
    type: Number,
    default: 10
  },
  timeLimit: {
    type: Number,
    default: 1000 // milliseconds
  },
  memoryLimit: {
    type: Number,
    default: 256 // MB
  },
  source: {
    type: String,
    enum: ['LeetCode', 'GeeksforGeeks', 'HackerRank', 'CodeAcademy', 'Other'],
    default: 'CodeAcademy'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Challenge = mongoose.model('Challenge', challengeSchema);

export default Challenge;