const mongoose = require("mongoose");

let reservationSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    phoneNumber: String,
    creditCard: {
        cardNumber: String,
        expDate: String,
        cvv: String
        }                 
    });

let Reservation = mongoose.model("Reservation", reservationSchema);

module.exports.model = Reservation;
module.exports.schema = reservationSchema;
