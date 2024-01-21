const mongoose = require("mongoose");
const StoreSchema = mongoose.Schema({
    vendor_id: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        required: true
    },
    bussiness_email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    pin: {
        type: String,
        required: true
    },
    location: {
        type: { type: String, required: true },
        cordinates: []
    },
})
StoreSchema.index({ location: "2dsphere" })
module.exports = mongoose.model("Store", StoreSchema)
