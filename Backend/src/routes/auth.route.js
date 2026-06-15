import express from 'express';
import { getMe, getNewRefreshToken, login, logout, register } from '../controllers/auth.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login)
router.post('/logout', logout)
router.get('/me', authMiddleware, getMe)
router.get('/refresh-token', getNewRefreshToken )


export default router;

