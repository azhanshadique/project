import express from 'express';
import { 
  getUserProfile, 
  updateUserProfile, 
  getUserProgress, 
  getLeaderboard 
} from '../controllers/userController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/leaderboard', getLeaderboard);

// Protected routes
router.get('/profile/:id', protect, getUserProfile);
router.put('/profile/:id', protect, updateUserProfile);
router.get('/progress/:id', protect, getUserProgress);

export default router;