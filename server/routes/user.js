const express = require("express")
const router = express.Router()
const User = require("../models/User")
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

router.post("/register", jsonParser, async (req,res) => {
    try {
        const user = new User({
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            PhoneNumber: req.body.PhoneNumber,
            Password: req.body.Password
        });
        User.findOne({PhoneNumber: user.PhoneNumber}, (err, docs) => {
            if (docs === null){
                user.save()
                console.log("Successfully added ", user.FirstName)
            } else {
                console.log("Phone number found, please login.")
            }})
     
    } catch (error) {
        console.log("Error adding user", error)
    }
})

router.get("/login", (req,res) => {
    res.send("This is login page")
})

module.exports = router;