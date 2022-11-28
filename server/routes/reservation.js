var express = require("express")
var router = express.Router()
var mongoose = require("mongoose")
const Day = require("../models/Day").model
const Table = require("../models/Table").model
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
      console.log("Record already exist")
      let selectedTable = pickTable(isExist.tables, partySize)
      res.status(200).send(selectedTable)
    } else {
      const allTables = await Table.find({});
      const day = new Day({
        date: dateTime,
        tables: allTables
      })
      await day.save()
      console.log("Record not exist, initalized new record")
      const selectedTable = await pickTable(allTables, partySize)
      res.status(200).send(selectedTable)
    }
  } catch (error) {
    res.status(500).send("Error looking for table")
  }

});

function pickTable(tables, partySize) {
  try {
    //sort all tables based on size
    tables.sort((a, b) => {
      if (a.capacity < b.capacity) return -1;
      if (a.capacity > b.capacity) return 1;
      if (a.capacity === b.capacity) return 0;
    })
    var size = Object.keys(tables).length;
    let maxCapacity = tables[size - 1].capacity;
    let reserveTable = [];
    let msg = ""

    if (partySize > maxCapacity) { //combine table algorithm
      temp = []
      for (let t of tables) {
        if (t.isAvailable) {
          if ((partySize - t.capacity) > 0) {
            temp.push(t)
            partySize = partySize - t.capacity
          } else {
            temp.push(t)
            return temp
          }
        }
      }
      msg = "Does not support this party size"
    } else { // single table algorithm
      for (let t of tables) {
        if ((t.capacity >= partySize) && t.isAvailable) {
          reserveTable.push(t)
          return reserveTable
        }
      }
      msg = "Party size supported but no available table"
    }

    return msg
  } catch (error) {res.status(500).send("Error during combining table")}

}

module.exports = router;