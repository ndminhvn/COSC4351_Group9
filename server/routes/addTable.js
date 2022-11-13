const express = require("express")
const router = express.Router()
const Table = require("../models/Table")
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

// This is for testing purpose, don't have to make a page for it.
router.post("/addTable", jsonParser, async (req,res) => {
    try { 
        const table = new Table({
            Size: req.body.Size
        })
        table.save()
        console.log("Added table size ",table.Size)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;