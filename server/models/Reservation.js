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
    Customer:{
        
    }
});

let Reservation = mongoose.model("Reservation", reservationSchema)

module.exports.model = Reservation;
module.exports.Schema = reservationSchema;
