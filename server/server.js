const express = require("express");
const app = express();
const mongoose = require("mongoose");
var cors = require("cors");

const PORT = 8000

//Connect to MongoDB
const dbURI = "mongodb+srv://admin:group9@database.b6uwacv.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => console.log("Connected to database"))
    .catch((err) => console.log(err));

// CORS Config
app.use(cors());

//Routes
app.use("/user", require("./routes/user"))
app.use("/reservation", require("./routes/reservation"))

app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`);
});