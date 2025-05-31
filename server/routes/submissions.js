import express from 'express';
import { 
  submitCode, 
  getSubmission, 
  getUserSubmissions 
} from '../controllers/submissionController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// All routes are protected
router.post('/', protect, submitCode);
router.get('/:id', protect, getSubmission);
router.get('/user/me', protect, getUserSubmissions);

export default router;