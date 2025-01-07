const express = require("express")
const app = express()
const mongoose = require('mongoose')
mongoose.connect("mongodb://127.0.0.1:27017/HRM")
    .then(() => console.log("Connection Eastablish Successfully"))
    .catch((e) => console.log("No Connection", e))

const user_route = require("./routes/UserRoute")
const clint_route = require("./routes/ClientRoute")


app.use('/api', user_route)
app.use('/api', clint_route)






app.listen(3000, function () {
    console.log("Server is ready")
})
