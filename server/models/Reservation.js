const mongoose = require("mongoose");

let reservationSchema = new mongoose.Schema({
    phoneNumber:{
       type: Number,
       required: true
    },
    partySize:{
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Reservation', reservationSchema);

