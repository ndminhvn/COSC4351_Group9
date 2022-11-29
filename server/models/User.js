const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    mailingAddress: {
        type: String,
        default: "None entered"
    },
    billingAddress: {
        type: String,
        default: "None entered"
    },
    preferDiner: {
        type: Number,
        default: 2
    },
    earnedPoints: {
        type: Number,
        default: 0
    },
    preferPayment: {
        type: String,
        enum : ['Credit','Cash', 'Check'],
        default: 'Credit'
    },
    creditCard: {
        cardNumber: {
            type: String,
            default: "0000 0000 0000 0000"
        },
        expDate: {
            type: String,
            default: "0000"
        },
        cvv: {
            type: String,
            default: "000"
        }                 
    }

});

module.exports = mongoose.model('User', userSchema);

