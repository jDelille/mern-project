import express from 'express';
import { updateBetOutcome } from '../controllers/bet.js';

const router = express.Router();

/* UPDATE */
router.patch('/:parlayId/update', updateBetOutcome);

export default router;
