const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema({
    Size: {
        type: Number,
        require: true
    },
    Open:{
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Table', tableSchema);