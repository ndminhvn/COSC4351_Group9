const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Schema for users collection
const userSchema = new Schema({
    FirstName: {
        type: String,
        required: true
    },
    LastName: {
        type: String,
        required: true
    },
    PhoneNumber: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;