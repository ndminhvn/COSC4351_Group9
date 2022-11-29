var express = require("express")
var router = express.Router()
var mongoose = require("mongoose")
const Day = require("../models/Day").model
const Table = require("../models/Table").model
const isHighTrafficDay = require("../controllers/isHighTrafficDay")


router.use(express.json())

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

  //case 1: reserve only one table
  for (let table of tables){
    if (table.capacity >= partySize && table.isAvailable == true){
      return table
    }
  }
  msg += `No single table available for party size of ${partySize}, so we have to combine tables. \n`;

  //case 2: reserve more than 1 table
  let combinedTables = []
  tables.sort((a, b) => b.capacity - a.capacity); // sort table size in descending order [6,6,6,4,4,4,2,2]

  //If we get here, partySize > maxCapacity for sure
  for (let table of tables){
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
  } catch (error) {res.status(500).send("Error during combining table")}

}

module.exports = router;