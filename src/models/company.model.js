import mongoose, { Schema } from "mongoose";


const companySchema = new Schema({
    name: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    }
}, { timestamps: true })


companySchema.statics.getCompaniesList = async function () {
    return await this.find({}, { name: 1 }).lean();
}

export const company = mongoose.model('Company', companySchema)