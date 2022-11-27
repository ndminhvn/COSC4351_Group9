const mongoose = require("mongoose");
const tableSchema = require("./Table");

const daySchema = new mongoose.Schema({
    date: {
        type: Date
    },
    tables: [tableSchema]
})

module.exports = mongoose.model('Day', daySchema);