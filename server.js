const express = require("express")
const app = express()
const mongoose = require("mongoose") //mongodb ODM
const helmet = require("helmet") // to protect from mal-practioners (attacks)
const cors = require("cors")

app.use(express.json()) //middleware
app.use(express.urlencoded({extended: true})) //middleware

app.use(helmet())
app.use(cors()) //injecting throught middleware

app.use("/core", require("./routes/index")) //index path

app.get("/", (req,res)=>{ // root path
    res.send("Welcome to User CRUD")
})

app.listen(3000,(e)=>{
    console.log("Server Started")
    mongoose.connect("mongodb://localhost/myusers").then((result)=>{ // if no database named myusers, then creates one
        console.log("Database connected...")
    }).catch((e)=>{
        console.log("error connecting database");
        console.log(e)
    })
});