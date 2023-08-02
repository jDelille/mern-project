import express from 'express';
import { getCommentsById } from '../controllers/comment.js';

const router = express.Router();

/* READ */
router.get('/:ids', getCommentsById);

export default router;
