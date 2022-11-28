const express = require("express")
const router = express.Router()
const User = require("../models/User")
const bcrypt = require("bcrypt")
router.use(express.json()) //body parser

//registration page
router.get("/register", async (req, res) => {
    res.send("register page")
})

router.post("/register", async (req, res) => {
    try {
        const isExisted = await User.findOne({ phoneNumber: req.body.phoneRegister})

        if (isExisted === null) {
            const hashedPassword = await bcrypt.hash(req.body.passwordRegister, 10)
            const user = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                phoneNumber: req.body.phoneRegister,
                password: hashedPassword
            });
            await user.save()
            res.send("Successfully registered " + user.firstName)
        } else {
            res.send("Phone number found, please login.")
        }

    } catch (error) {
        console.log("Error adding user", error)
    }
})

//Login page
router.get("/login", (req, res) => {
    res.send("login page")
})

router.post("/login", async (req, res) => {
    const user = await User.findOne({ phoneNumber: req.body.phoneLogin })
    if (user === null) {
        return res.status(400).send("This phone number is not yet registered")
    }
    try {
        if (await bcrypt.compare(req.body.passwordLogin, user.password)) {
            res.status(200).send(user.phoneNumber)
        } else {
            res.status(400).send("Wrong password")
        }
    } catch (error) {
        res.status(500).send("Login Page")
    }
})


/*
Parameters 
    input: +1%20111%20222%203333
    output: +1 111 222 3333
    %20 acts as whitespace
*/
router.get("/details/:phone", async (req, res) =>{
    const user = await User.findOne({phoneNumber: req.params.phone})
    res.send(user)
})

router.put("/details/:phone", async (req, res) =>{
    //update ALL user's non-required information
    const user = await User.findOne({phoneNumber: req.params.phone})
    if (user === null){
        return res.send("bad params")
    }else{
        console.log("Found user to update")
    }
    try {
        //Miscellaneous 
        mailingAddress = req.body.mailingAddress
        billingAddress = req.body.billingAddress
        preferDiner = req.body.preferDiner
        preferPayment = req.body.preferPayment
        //Payments
        cardNumber = req.body.cardNumber
        expDate = req.body.expDate
        cvv = req.body.cvv
        await User.updateOne({ phoneNumber:req.params.phone}, { $set: {
            mailingAddress: mailingAddress, 
            billingAddress: billingAddress,
            preferDiner: preferDiner,
            preferPayment: preferPayment,
            creditCard:{
                cardNumber: cardNumber,
                expDate: expDate,
                cvv: cvv
            }
        }})
        res.status(200).send("Update success")
    } catch (error) {
        res.status(500).send("Error update user")
    }
})



module.exports = router;