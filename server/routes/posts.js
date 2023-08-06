import express from 'express';
import {
	betPost,
	deletePost,
	getBet,
	getFeedPosts,
	getPost,
	getUserPosts,
	likePost,
	retweetPost,
} from '../controllers/posts.js';
import { verifyToken } from '../middleware/auth.js';
import { createComment } from '../controllers/comment.js';

const router = express.Router();

/* CREATE */
router.post('/:id/comment', verifyToken, createComment);
router.post('/:id/retweet', verifyToken, retweetPost);
router.post('/bet', verifyToken, betPost);

/* READ */
router.get('/', getFeedPosts);
router.get('/:username/posts', getUserPosts);
router.get('/:postId', getPost);
router.get('/bet/:betId', getBet);

/* UPDATE */
router.patch('/:id/like', verifyToken, likePost);

/* DELETE */
router.delete('/:postId', verifyToken, deletePost);

export default router;
