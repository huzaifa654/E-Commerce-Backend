const express = require("express")
const app = express()
const mongoose = require('mongoose')
mongoose.connect("mongodb://127.0.0.1:27017/Ecom")
    .then(() => console.log("Connection Eastablish Successfully"))
    .catch((e) => console.log("No Connection", e))

const user_route = require("./routes/UserRoute")
app.use('/api', user_route)
// app.get("/hello",(req,res)=>{
//     res.send("Hello =000")
// })
app.listen(3000, function () {
    console.log("Server is ready")
})
