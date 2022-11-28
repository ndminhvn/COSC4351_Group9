const mongoose = require("mongoose");

let reservationSchema = new mongoose.Schema({
    phoneNumber:{
       type: String,
       required: true
    }
});

let Reservation = mongoose.model("Reservation", reservationSchema);

module.exports.model = Reservation;
module.exports.schema = reservationSchema;
