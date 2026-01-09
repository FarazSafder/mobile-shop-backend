import mongoose, { Schema } from "mongoose";


const companySchema = new Schema({
    name: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    }
}, { timestamps: true })

export const company = mongoose.model('Company', companySchema)