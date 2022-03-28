const express = require("express")
const mongoose = require("mongoose")
const UserSchema = require("../models/User")
const router = express.Router()
const UserService = require("../services/UserService")

const UserServiceObj = new UserService()
router.get("/", (req, res) => {
    res.send("root user page")
})

// to list all the users from the database
router.get("/list", async (req, res) => {
    let users = await UserServiceObj.getUsers();
    res.send(users)
})

//login page, validating the password
router.post("/login", async (req, res) => {
    let loginResult = await UserServiceObj.loginUser(req.body)
    res.send(loginResult)
})

//creating the user, as this is post method, it can be viewed only from postman for backend only
router.post("/create", async (req, res) => {

    /*we can send an object with the response and keep the method "get", but this is hardcoded and not preferred

    let result = await UserServiceObj.createUser({
        fullname: "daksh bindal",
        email: "daksh@google.com",
        gender: "Male",
        phone: "999888",
        salt: "",
        hash: ""
    })*/

    // we use below method to send dynamic entry to the database
    //console.log(req.body)
    let obj = req.body // here the obj is created out of the body that that posted with the request
    let result = await UserServiceObj.createUser(obj) //creating the user
    res.send(result) //returning the created object to the page
})

// to set the isDel:true to the user with the given id, use "postman" for it too
router.delete("/:id", async (req, res) => {
    const result = await UserServiceObj.deleteUser(req.params.id)
    res.send(result)
})

module.exports = router