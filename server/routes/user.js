const express = require("express")
const router = express.Router()
const User = require("../models/User")

// "/user/register"
router.post("/register", async (req,res) => {
    const user = new User({
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        PhoneNumber: req.body.PhoneNumber,
        Password: req.body.Password
    })
    try {
        const newUser = await user.save()
        res.status(201).json(newUser)
    } catch (error) {
        res.status(400).json({error})
    }
})



router.route("/login")
.get((req,res) => {
    res.send("login")
})

module.exports = router