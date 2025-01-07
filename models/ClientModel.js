const mongoose = require("mongoose");
const Client = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
 
    mobile: {
        type: Number,
        required: true
    },
   
});

module.exports = mongoose.model("Client", Client)
