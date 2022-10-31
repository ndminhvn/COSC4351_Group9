const mongoose = require("mongoose");

let reservationSchema = new mongoose.Schema({
    Date:{
       type: String,
       required: true
    },
    PartySize:{
        type: int,
        required: true
    },
    BookedTable: [],
});

module.exports = mongoose.model('Reservation', reservationSchema);

