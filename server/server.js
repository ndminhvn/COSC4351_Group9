const express = require("express")
const app = express()
const mongoose = require("mongoose")



//Connect to MongoDB
const dbURI = "mongodb+srv://admin:group9@database.b6uwacv.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => console.log("Connected to database"))
    .catch((err) => console.log(err));

//Routes
const userRoute = require("./routes/user")
app.use("/user", userRoute)
//use register.js file to handle
//endpoints that start with /register



app.get('/', (req,res) =>{
    res.send("Home Page")
})

app.listen(3000);