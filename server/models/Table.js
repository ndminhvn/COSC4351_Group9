const mongoose = require("mongoose");
const reservationSchema = require("./Reservation").schema;

const tableSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    isAvailable:{
        type: Boolean,
        default: true
    },
    reservation: {
        required: false,
        type: reservationSchema
      }
});

// module.exports = mongoose.model('Table', tableSchema);
var Table = mongoose.model("Table", tableSchema);

module.exports.model = Table;
module.exports.schema = tableSchema;