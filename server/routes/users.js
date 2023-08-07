import express from 'express';
import {
	getUser,
	getUserFollowing,
	addRemoveFollowing,
	getUsers,
	getRecommendedUsers,
} from '../controllers/users.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

/* READ */
router.get('/:id/recommendedUsers', getRecommendedUsers);
router.get('/:username', getUser);
router.get('/:id/following', verifyToken, getUserFollowing);
router.get('/', getUsers);

/* UPDATE */
router.patch('/:id/:followingId', verifyToken, addRemoveFollowing);

export default router;
