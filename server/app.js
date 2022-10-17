const express = require("express");
const mongoose = require("mongoose")

const dbURL = "mongodb+srv://admin:group9@database.b6uwacv.mongodb.net/?retryWrites=true&w=majority";

const app = express();
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => console.log("Connected to database"))
    .catch((err) => console.log(err));

app.listen(3000);