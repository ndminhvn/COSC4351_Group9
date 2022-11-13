const express = require("express");
const app = express();
const mongoose = require("mongoose");



//Connect to MongoDB
const dbURI = "mongodb+srv://admin:group9@database.b6uwacv.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => console.log("Connected to database"))
    .catch((err) => console.log(err));

//Routes
app.use(require("./routes"));
app.use(require("./routes/user"))
app.use(require("./routes/addTable"))

app.listen(3000, () =>{
    console.log("Server running on port 3000");
});