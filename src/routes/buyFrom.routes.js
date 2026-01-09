import { Router } from "express";
import { addBuyFrom } from "../controllers/buyFrom.controller.js";

const router = Router();

router.route('/addbuyingshop').post(addBuyFrom);

export default router