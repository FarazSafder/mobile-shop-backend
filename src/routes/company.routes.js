import { Router } from "express";
import { companiesList, companyName } from "../controllers/company.controller.js";



const router = Router();

router.route('/addcompany').post(companyName);

router.route('/companiesall').get(companiesList);

export default router