import mongoose, { Schema } from "mongoose";

const secondHandSchema = new Schema({
    status: { type: Boolean, default: false },
    condition: {
        type: String,
        enum: ['like new', 'good', 'fair', 'poor']
    },
    sellerName: {
        type: String,
        required: function () { return this.status; }
    },
    sellerCNIC: {
        type: String,
        required: function () { return this.status; }
    },
    sellerphone: {
        type: String,
        required: function () { return this.status; }
    },
    purchaseDate: {
        type: Date,
        required: function () { return this.status; }
    }

}, { _id: false })

// IMEI subdocument schema
const imeiSchema = new Schema({
    imeiNumber: {
        type: String,
        required: true,
        unique: true
    },
    color: {
        type: String,
        required: true
    },
    ram: { // RAM for this IMEI
        type: Number,
        required: true,
        min: 1
    },
    storageValue: { // Storage for this IMEI
        type: Number,
        required: true,
        min: 1
    },
    storageUnit: {
        type: String,
        enum: ['GB', 'TB'],
        default: 'GB'
    },
    isSold: {
        type: Boolean,
        default: false
    }
}, { _id: false });


const mobileSchema = new Schema({
    company: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    model: {
        type: String,
        lowercase: true,
        required: true
    },
    buyingfrom: {
        type: Schema.Types.ObjectId,
        ref: "BuyFrom",
        required: function () {
            return !this.is2ndhand?.status;
        }
    },
    buyprice: {
        type: Number,
        required: true
    },
    sellprice: {
        type: Number,
        required: true
    },
    is2ndhand: {
        type: secondHandSchema,

        required: function () {
            // Required if the mobile is second-hand
            return this.is2ndhand?.status;
        }
    },
    imeis: {
        type: [imeiSchema]
    }

}, { timestamps: true });

export const mobile = mongoose.model('Mobile', mobileSchema)