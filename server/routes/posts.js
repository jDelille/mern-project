import express from 'express';
import {
	getFeedPosts,
	getPost,
	getUserPosts,
	likePost,
} from '../controllers/posts.js';
import { verifyToken } from '../middleware/auth.js';
import { createComment } from '../controllers/comment.js';

const router = express.Router();

/* CREATE */
router.post('/:id/comment', verifyToken, createComment);

/* READ */
router.get('/', getFeedPosts);
router.get('/:username/posts', getUserPosts);
router.get('/:postId', getPost);

/* UPDATE */
router.patch('/:id/like', verifyToken, likePost);

export default router;
