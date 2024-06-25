const mongoose = require("mongoose");
const Report = mongoose.Schema({
    email: {
        type: String,
        required: true
    },

    report: {
        type: String,
        required: true
    },


});
module.exports = mongoose.model("Report", Report)
