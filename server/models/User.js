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
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    mailingAddress: {
        type: String,
        require: true
    },
    billingAddress: {
        type: String,
        require: true
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
        cardNumber: Number,
        expDate: Date,
        cvv: Number
    }

});

module.exports = mongoose.model('User', userSchema);

