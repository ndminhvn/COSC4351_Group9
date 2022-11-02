const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema({
    Size: {
        type: int,
        required: true
    },
    Open:{
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('Table', tableSchema);