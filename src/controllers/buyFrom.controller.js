import { buyFrom } from "../models/buyFrom.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const addBuyFrom = asyncHandler(async (req, res) => {
    const { name, address, phone } = req.body;

    if (!name || name.trim() === "") {
        throw new ApiError(400, "Name is required")
    }

    name = name.trim().toLowerCase();

    const buyFromExist = await buyFrom.findOne({ name });

    if (buyFromExist) {
        throw new ApiError(409, "Buying Shop already exist")
    }

    const createBuyFrom = await buyFrom.create({
        name,
        address,
        phone
    })

    if (!createBuyFrom) {
        throw new ApiError(500, "Server Error")
    }

    return res.status(201).json(new ApiResponse(201, createBuyFrom, "Buying shop added"));

})

export { addBuyFrom }