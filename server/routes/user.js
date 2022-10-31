const express = require("express")
const router = express.Router()
const User = require("../models/User")

/* 
/user/{route}
*/
router.post("/register", async (req,res) => {
    try {
        const user = new User({
            FirstName: "req.body.FirstName",
            LastName: "req.body.LastName",
            PhoneNumber: "req.body.PhoneNumber",
            Password: "req.body.Password"
        })
        await user.save()
        res.redirect("/login")
    } catch (error) {
        //res.status(400).json({error})
        console.log("Error adding user")
    }
    console.log("User added to database")
})


router.route("/login")
.get((req,res) => {
    res.send("This is login page")
})

module.exports = router;