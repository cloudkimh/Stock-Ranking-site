import express from 'express';
import { authToken } from '../middlewares/auth.token.middlewares.js';
import { testValidator } from '../validators/test/test.validations.js';
import { createController, findController, createEncryptStringController, createDecryptStringController } from '../controllers/test.controllers.js';

const router = express.Router();

router.get('/', authToken, findController);
router.post('/create', testValidator, createController);
router.post('/encrypt-string', createEncryptStringController);
router.post('/decrypt-string', createDecryptStringController);

export default router;