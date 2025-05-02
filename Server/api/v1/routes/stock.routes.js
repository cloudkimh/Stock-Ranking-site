import express from 'express';
// import { authToken } from '../middlewares/auth.token.middlewares.js';
// import { loginValidator } from '../validators/auth/login.auth.validations.js';
import { stockListController } from '../controllers/stock.controlles.js';

const router = express.Router();

router.get('/list', stockListController);

export default router;