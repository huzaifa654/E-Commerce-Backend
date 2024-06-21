const mongoose = require("mongoose");
const SemsterCourses = mongoose.Schema({
    SemesterNo: {
        type: Number,
        required: true
    },
    Course1: [
        {
            code: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            teacher: {
                type: String,
                required: true
            }
        }],
    Course2: [
        {
            code: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            teacher: {
                type: String,
                required: true
            }
        }],
    Course3: [
        {
            code: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            teacher: {
                type: String,
                required: true
            }
        }],
    Course4: [
        {
            code: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            }
        }],
    Course5: [
        {
            code: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            teacher: {
                type: String,
                required: true
            }
        }],
    Course6: [
        {
            code: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            teacher: {
                type: String,
                required: true
            }
        }],

});
module.exports = mongoose.model("Courses", SemsterCourses)
