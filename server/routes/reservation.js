const { response } = require("express")
var express = require("express")
var router = express.Router()
const Day = require("../models/Day").model
const Table = require("../models/Table").model
const Reservation = require("../models/Reservation").model
const isHighTrafficDay = require("../controllers/isHighTrafficDay")
const User = require("../models/User")
router.use(express.json())

/*
Input:
  1.Take in an array of available table(s) to reserve
  2.Customer information

Action:
  1. Assign the reservation to the table
  2. Update the availability of tables
  3. Check if day is weekend or holiday:
    true: prompt user of $10 holding fees 
*/

// http://localhost:8000/reservation/confirm
router.post("/confirm", async (req, res) => {
  //convert time to int and do offsets
  let y = parseInt(req.body.year)
  let m = parseInt(req.body.month) - 1
  let d = parseInt(req.body.day)
  let h = parseInt(req.body.hour) - 5
  const dateTime = new Date(y, m, d, h)

  // create reservation
  let table_arr = req.body.table_arr
  var reservation = new Reservation({
    phoneNumber: req.body.phoneNumber,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    creditCard: {
      cardNumber: req.body.cardNumber,
      expDate: req.body.expDate,
      cvv: req.body.cvv
    }})

  try {
    var day = await Day.findOne({dateTime})
    for (let table of day.tables) {
      for (let availableTable of table_arr){
          if (table.name == availableTable.name){
              console.log("Reserved ",availableTable.name, "on: ", dateTime)
              table.isAvailable = false
              table.reservation = reservation
          }
      }
    }
    await day.save();
    await reservation.save()

    let fee_msg = ""
    if(isHighTrafficDay(dateTime)){
      fee_msg = "Due to weekends/holidays, your card will be charge a holding fee of $10"
    }
    res.status(200).send("Successfully booked.\n" + fee_msg)
  } catch (error) {
    res.status(500).send("Error occured while confirming guest reservation")
  }

})
/*
  Autofill route for registered user
*/
// http://localhost:8000/reservation/confirm
router.get("/confirm/:phone", async (req, res) => {
  // get information for autofill
  let phoneNumber = req.params.phone
  const user = await User.findOne({phoneNumber})
  res.status(200).send(user)
})

//http://localhost:8000/reservation/availability
router.post("/availability", async (req, res) => {
  try {
    //convert time to int and do offsets
    let y = parseInt(req.body.year)
    let m = parseInt(req.body.month) - 1
    let d = parseInt(req.body.day)
    let h = parseInt(req.body.hour) - 5
    const dateTime = new Date(y, m, d, h)
    const partySize = parseInt(req.body.partySize)
    //console.log("Time enter: ", dateTime)

    const isExist = await Day.findOne({ date: dateTime })
    if (isExist !== null) {
      let selectedTable = pickTable(isExist.tables, partySize)
      res.status(200).send(selectedTable)
    } else {
      const allTables = await Table.find({});
      const day = new Day({
        date: dateTime,
        tables: allTables
      })
      await day.save()
      console.log("First reservion for instance: ", dateTime)
      const selectedTable = await pickTable(allTables, partySize)
      res.status(200).send(selectedTable)
    }
  } catch (error) {
    res.status(500).send("Error looking for table")
  }

});

function pickTable(tables, partySize) {
  try {
    let msg = "";
    let singleTable = []
    //case 1: reserve only one table
    for (let table of tables) {
      if (table.capacity >= partySize && table.isAvailable == true) {
        singleTable.push(table)
        return singleTable
      }
    }
    msg += `No single table available for party size of ${partySize}, so we have to combine tables. \n`;

    //case 2: reserve more than 1 table
    let combinedTables = []
    tables.sort((a, b) => b.capacity - a.capacity); // sort table size in descending order [6,6,6,4,4,4,2,2]

    //If we get here, partySize > maxCapacity for sure
    for (let table of tables) {
      if (table.isAvailable) {
        if (partySize - table.capacity > 0) {
          combinedTables.push(table)
          partySize = partySize - table.capacity
        } else if (partySize - table.capacity < -1) {
          continue
        } else { // partySize - table.capacity = {-1,0}
          combinedTables.push(table)
          return combinedTables
        }
      }
    }
    msg += "Not enough tables for this party size."
    return msg
  } catch (error) { res.status(500).send("Error during combining table") }

}

module.exports = router;