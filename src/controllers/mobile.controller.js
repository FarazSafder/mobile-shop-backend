import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { mobile } from "../models/mobile.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const addNewMobile = asyncHandler(async (req, res) => {
    const { company, model, buyingfrom, buyprice, sellprice, imeis } = req.body;

    if (!company || !model || !buyingfrom || !buyprice || !sellprice || !imeis.length) {
        throw new ApiError(400, "All fields are required");
    }

    if (!mongoose.Types.ObjectId.isValid(company)) {
        throw new ApiError(400, "Invalid company id");
    }

    if (!mongoose.Types.ObjectId.isValid(buyingfrom)) {
        throw new ApiError(400, "Invalid Buying From id");
    }

    const newMobile = await mobile.create({
        company,
        model,
        buyingfrom,
        buyprice,
        sellprice,
        is2ndhand: {
            status: false
        },
        imeis
    })

    if (!newMobile) {
        throw new ApiError(500, "Server Error");
    }

    return res.status(201).json(new ApiResponse(201, newMobile, "New mobiles are added"))
})

const add2ndHandMobile = asyncHandler(async (req, res) => {
    const { company, model, buyprice, sellprice, imeis, is2ndhand } = req.body;

    if (!company || !model || !is2ndhand || !buyprice || !sellprice || !imeis.length) {
        throw new ApiError(400, "All fields are required");
    }

    if (!mongoose.Types.ObjectId.isValid(company)) {
        throw new ApiError(400, "Invalid company id");
    }

    const newMobile = await mobile.create({
        company,
        model,
        buyprice,
        sellprice,
        is2ndhand,
        imeis
    })

    if (!newMobile) {
        throw new ApiError(500, "Server Error");
    }

    return res.status(201).json(new ApiResponse(201, newMobile, "Mobile is added"));
})

const findMobileByImei = asyncHandler(async (req, res) => {
    const { imei } = req.params;

    if (!imei) {
        throw new ApiError(400, "IMEI is required");
    }

    const foundMobile = await mobile.findOne({ "imeis.imeiNumber": imei });

    if (!foundMobile) {
        throw new ApiError(404, "Mobile not found");
    }

    return res.status(200).json(new ApiResponse(200, foundMobile, "Mobile found"));
})

const findMobileByModel = asyncHandler(async (req, res) => {
    const { model } = req.query;

    if (!model) {
        throw new ApiError(400, "Model is required");
    }

    const foundMobiles = await mobile.find({ model: model });

    if (!foundMobiles.length) {
        throw new ApiError(404, "No mobiles found for this model");
    }

    return res.status(200).json(new ApiResponse(200, foundMobiles, "Mobiles found"));
});



export { addNewMobile, add2ndHandMobile, findMobileByImei, findMobileByModel }