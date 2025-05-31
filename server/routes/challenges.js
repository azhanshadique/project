import express from 'express';
import { 
  getChallenges, 
  getChallenge, 
  createChallenge, 
  updateChallenge, 
  deleteChallenge 
} from '../controllers/challengeController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getChallenges);
router.get('/:id', getChallenge);

// Protected routes (admin only)
router.post('/', protect, adminOnly, createChallenge);
router.put('/:id', protect, adminOnly, updateChallenge);
router.delete('/:id', protect, adminOnly, deleteChallenge);

export default router;