const mongoose = require("mongoose");
const TimeTable = mongoose.Schema({
    SemesterNo: {
        type: Number,
        required: true
    },
    Day: {
        type: String,
        required: true
    },
    Time: {
        type: String,
        required: true
    },
    Code: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },


});
module.exports = mongoose.model("TimeTable", TimeTable)
