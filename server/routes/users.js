import express from 'express';
import {
	getUser,
	getUserFollowing,
	addRemoveFollowing,
	getUsers,
} from '../controllers/users.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

/* READ */
router.get('/', getUsers);
router.get('/:username', verifyToken, getUser);
router.get('/:id/following', verifyToken, getUserFollowing);

/* UPDATE */
router.patch('/:id/:followingId', verifyToken, addRemoveFollowing);

export default router;
