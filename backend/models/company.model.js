const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
    account: {
        email: String,
        password: String,
        permission: { type: Number, default: 0 },
        createdAt: { type: Date, default: new Date() },
    },
    profile: {
        officialName: String,
        vat: String,
        ateco: String,
        pec: String,
        type: { type: Number, default: 0 },
        employees: { type: Number, default: 0 },
        revenues: { type: Number, default: 0 },
        logo: String,
        background: String,
        introduction: {
            en: String,
            it: String,
        },
        whatWeDo: {
            en: String,
            it: String,
        },
        iso: [String],
        tags: {
            en: [String],
            it: [String],
        },
        product: {
            name: {
                en: String,
                it: String,
            },
            detail: {
                en: String,
                it: String,
            },
            photos: [String],
        },
        contact: {
            email: String,
            email2nd: String,
            website: String,
            address: String,
            region: String,
            city: String,
            phone: String,
            location: {
                type: { type: String, default: "Point" },
                coordinates: [Number],
            },
        },
    },
    posts: [Object],
});

module.exports = mongoose.model("Company", companySchema);
