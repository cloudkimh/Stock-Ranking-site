import express from "express";
import testRoute from './test.routes.js'; 
import authRoute from './auth.routes.js'; 
import stockRoute from './stock.routes.js'; 

var router = express.Router();

router.get('/', function(req, res, next) {
    res.status(200).send('Hello V1 GET API...');
});

// define all modules route
router.use('/test', testRoute);
router.use('/auth', authRoute);
router.use('/stock', stockRoute);

export default router