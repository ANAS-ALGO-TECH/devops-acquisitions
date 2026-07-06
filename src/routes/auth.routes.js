// Dependencies
import express from 'express';

// Controllers
import { signUp } from '#controllers/auth.controller.js';
import { signIn } from '#controllers/auth.controller.js';
import { signOut } from '#controllers/auth.controller.js';

const router = express.Router();

router.post('/sign-up', signUp);
router.post('/sign-in', signIn);
router.post('/sign-out', signOut);

export default router;