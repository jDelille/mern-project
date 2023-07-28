import express from 'express';
import { login, validateEmail } from '../controllers/auth.js';

const router = express.Router();

router.post('/login', login);
router.post('/validate-email', validateEmail);

export default router;
