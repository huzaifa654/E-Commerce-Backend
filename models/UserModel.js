const mongoose = require("mongoose");
const User = mongoose.Schema({
    name: {
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
    mobile: {
        type: Number,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    user_status:{
        type:String,
        default:'Inactive'
    },
    token: {
        type: String,
        default: ''
    }
});

module.exports = mongoose.model("User", User)
