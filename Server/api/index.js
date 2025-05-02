import express from "express";
import v1 from "./v1/routes/index.js";
import v2 from "./v2/routes/index.js";

var router = express.Router();
 
router.use('/v1', v1);
router.use('/v2', v2);

export default router;