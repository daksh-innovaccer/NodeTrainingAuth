const express = require("express")
const router = express.Router()

router.use("/user", require("./user"))

router.get("/", (req,res)=>{
    res.send("core default page")
})



module.exports = router