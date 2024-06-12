const mongoose = require("mongoose");
const User = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    seatNo: {
        type: String,
        required: true
    },
    semester: {
        type: String,
        required: true
    },
    semesterGPA: {
        type: String,
        required: true
    },
    overAllGPA: {
        type: String,
        required: true
    },
    skilledCourses: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },
   

});
module.exports = mongoose.model("Student", User)
