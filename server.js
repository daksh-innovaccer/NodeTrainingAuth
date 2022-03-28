const express = require("express")
const app = express()
const mongoose = require("mongoose")
const helmet = require("helmet")
const cors = require("cors")

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(helmet())
app.use(cors())

app.use("/core", require("./routes/index"))

app.get("/", (req,res)=>{
    res.send("Welcome to User CRUD")
})

app.listen(3000,(e)=>{
    console.log("Server Started")
    mongoose.connect("mongodb://localhost/myusers").then((result)=>{
        console.log("Database connected...")
    }).catch((e)=>{
        console.log("error connecting database");
        console.log(e)
    })
});