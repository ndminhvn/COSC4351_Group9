const mongoose = require("mongoose");

let reservationSchema = new mongoose.Schema({
    Date:{
       type: String,
       required: true
    },
    PartySize:{
        type: Number,
        required: true
    },
    BookedTable: {
        type: Array,
        required: true
    },
    Date: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Reservation', reservationSchema);

