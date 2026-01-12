import { ApiResponse } from "../utils/ApiResponse.js";
import { company } from "../models/company.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";



const companyName = asyncHandler(async (req, res) => {
    let { name } = req.body;

    if (!name || name.trim() === "") {
        throw new ApiError(400, "Company name is required")
    }

    name = name.trim().toLowerCase();

    const companyExist = await company.findOne({ name })

    if (companyExist) {
        throw new ApiError(409, "Company already exist")
    }

    const companycreate = await company.create({
        name
    })

    if (!companycreate) {
        throw new ApiError(500, "Server error")
    }

    return res.status(201).json(new ApiResponse(201, companycreate, "Company Created"))
})

const companiesList = asyncHandler(async (req, res) => {

    const companies = await company.getCompaniesList();

    return res.status(200).json(new ApiResponse(200, companies, "Companies List"))
})

export { companyName, companiesList }