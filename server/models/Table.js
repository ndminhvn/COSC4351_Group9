const mongoose = require("mongoose");
const reservationSchema = require("./Reservation");

const tableSchema = new mongoose.Schema({
    capacity: {
        type: Number,
        require: true
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

module.exports = mongoose.model('Table', tableSchema);