import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'A submission must belong to a user']
  },
  challenge: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Challenge',
    required: [true, 'A submission must be for a challenge']
  },
  code: {
    type: String,
    required: [true, 'Please provide the submitted code']
  },
  language: {
    type: String,
    required: [true, 'Please specify the programming language']
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'wrong_answer', 'time_limit_exceeded', 'memory_limit_exceeded', 'runtime_error', 'compilation_error'],
    default: 'pending'
  },
  executionTime: {
    type: Number
  },
  memoryUsed: {
    type: Number
  },
  submittedAt: {
    type: Date,
    default: Date.now
  },
  testCasesPassed: {
    type: Number,
    default: 0
  },
  totalTestCases: {
    type: Number,
    required: true
  },
  output: {
    type: String
  },
  stderr: {
    type: String
  }
});

// Virtual property for passing percentage
submissionSchema.virtual('passingPercentage').get(function() {
  return (this.testCasesPassed / this.totalTestCases) * 100;
});

const Submission = mongoose.model('Submission', submissionSchema);

export default Submission;