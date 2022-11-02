const express = require("express")
const router = express.Router()
const User = require("../models/User")
var bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

router.post("/register", jsonParser, async (req,res) => {
    try {
        const user = new User({
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            PhoneNumber: req.body.PhoneNumber,
            Password: req.body.Password
        })
        await user.save()
        console.log("User added to database")
    } catch (error) {
        console.log("Error adding user", error)
    }
})

router.get("/login", (req,res) => {
    res.send("This is login page")
})

module.exports = router;