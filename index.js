const express = require("express")
const app = express()
const mongoose = require('mongoose')
mongoose.connect("mongodb://127.0.0.1:27017/Ecom")
    .then(() => console.log("Connection Eastablish Successfully"))
    .catch((e) => console.log("No Connection", e))

const user_route = require("./routes/UserRoute")
const store_route = require("./routes/StoreRoute")
const category_route = require("./routes/CategoryRoute")
const subcategory_route = require("./routes/SubCategoryRoute")
app.use('/api', user_route)
app.use('/api', store_route)
app.use('/api', category_route)
app.use('/api', subcategory_route)


// app.get("/hello", (req, res) => {
//     res.send("Hello =000")
// })

app.listen(3000, function () {
    console.log("Server is ready")
})
