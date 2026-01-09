import mongoose, { Schema } from "mongoose";

const buyFromSchema = Schema({
    name: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    address: {
        type: String
    },
    phone: {
        type: Number,
        maxLength: 13
    }

}, { timestamps: true })

export const buyFrom = mongoose.model('BuyFrom', buyFromSchema);