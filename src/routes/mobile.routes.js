import { Router } from "express";
import { add2ndHandMobile, addNewMobile, findMobileByImei, findMobileByModel } from "../controllers/mobile.controller.js";



const router = Router()

router.route('/add').post(addNewMobile);

router.route('/add-2ndhand').post(add2ndHandMobile);

router.route('/:imei').get(findMobileByImei);

router.route('/').get(findMobileByModel);


export default router