import express from 'express';
// import { authToken } from '../middlewares/auth.token.middlewares.js';
import { loginValidator } from '../validators/auth/login.auth.validations.js';
import { loginController, logoutController } from '../controllers/auth.controlles.js';

const router = express.Router();

router.post('/login', loginValidator, loginController);
router.post('/logout', logoutController);

export default router;