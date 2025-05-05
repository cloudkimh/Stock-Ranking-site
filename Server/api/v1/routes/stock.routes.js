import express from 'express';
// import { authToken } from '../middlewares/auth.token.middlewares.js';
import { stockDetailsValidator } from '../validators/stock/stock_details.validators.js';
import { stockListController, stockDetailsController } from '../controllers/stock.controlles.js';

const router = express.Router();

router.get('/list', stockListController);
router.get('/details', stockDetailsValidator, stockDetailsController);

export default router;