import { Router } from "express";
import { companyName } from "../controllers/company.controller.js";



const router = Router();

router.route('/addcompany').post(companyName);

export default router