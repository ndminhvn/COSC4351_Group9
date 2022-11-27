const express = require("express")
const router = express.Router()
const User = require("../models/User")
const bcrypt = require("bcrypt")

router.use(express.json()) //body parser

router.get("/register", async (req, res) => {
    res.send("register page")
})

router.post("/register", async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phoneNumber: req.body.phoneNumber,
            password: hashedPassword,
            mailingAddress: req.body.mailingAddress,
            billingAddress: req.body.billingAddress
        });
        const isExisted = await User.findOne({ phoneNumber: user.phoneNumber })
        if (isExisted === null) {
            await user.save()
            res.send("Successfully registered " + user.firstName)
        } else {
            res.send("Phone number found, please login.")
        }

    } catch (error) {
        console.log("Error adding user", error)
    }
})

router.get("/login", (req, res) => {
    res.send("login page")
})

router.post("/login", async (req, res) => {
    const user = await User.findOne({ phoneNumber: req.body.phoneNumber })
    if (user === null) {
        return res.send("This phone number is not yet registered")
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            res.send("Login successfully")
        } else {
            res.send("Wrong password")
        }
    } catch (error) {
        res.status(500).send("Error logging in")
    }

})

module.exports = router;