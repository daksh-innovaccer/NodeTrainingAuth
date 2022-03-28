const express = require("express")
const mongoose = require("mongoose")
const UserSchema = require("../models/User")
const router = express.Router()
const UserService = require("../services/UserService")

const UserServiceObj = new UserService()
router.get("/", (req, res) => {
    res.send("root user page")
})

router.get("/list", async (req, res) => {
    let users = await UserServiceObj.getUsers();
    //console.log(JSON.stringify(users))
    res.send(users)
})

router.post("/login", async (req, res) => {
    let loginResult = await UserServiceObj.loginUser(req.body)
    res.send(loginResult)
})

router.post("/create", async (req, res) => {
    // let result = await UserServiceObj.createUser({
    //     fullname: "daksh bindal",
    //     email: "daksh@google.com",
    //     gender: "Male",
    //     phone: "999888",
    //     salt: "",
    //     hash: ""
    // })
    console.log(req.body)
    let obj = req.body
    let result = await UserServiceObj.createUser(obj)
    res.send(result)
})

router.get("/find", (req, res) => {
    let result = UserServiceObj.searchUser()
    res.send(JSON.stringify(result))
})

router.get("/add", (req, res) => {
    res.send("User add page")
})

router.delete("/:id", async (req, res) => {
    const result = await UserServiceObj.deleteUser(req.params.id)
    res.send(result)
})

module.exports = router