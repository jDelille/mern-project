import express from 'express';
import { login, validateEmail, validateUsername } from '../controllers/auth.js';

const router = express.Router();

router.post('/login', login);
router.post('/validate-email', validateEmail);
router.post('/validate-username', validateUsername);

export default router;
