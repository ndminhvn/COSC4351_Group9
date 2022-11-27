const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 8000



//Connect to MongoDB
const dbURI = "mongodb+srv://admin:group9@database.b6uwacv.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => console.log("Connected to database"))
    .catch((err) => console.log(err));

//Routes
app.use("/user", require("./routes/user"))

app.listen(PORT, () =>{
    console.log("Server running on port 8000");
});