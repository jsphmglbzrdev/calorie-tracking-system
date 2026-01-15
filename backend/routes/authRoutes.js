import express from 'express';
import { registerUser, loginUser, getMe } from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/me', authMiddleware, getMe);

router.post('/register', registerUser);
router.post('/login', loginUser);


export default router;