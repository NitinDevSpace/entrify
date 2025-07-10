const express = require("express");
const app = express();
app.use(express.json()); // json parsing middleware

require("dotenv").config(); //For Loading ENV variables in Process.env

//Connecting to the Databse and intializing the connection
const connectDB = require('./config/db');
connectDB();

//Importing routes
const userRouter = require("./routes/userRoutes");


// Routes/API calls
app.use("/api/users", userRouter); // all api calls for users will go to userRouter which will handle them

const Port = 8081;
app.listen(Port, () => {
    console.log(`Listening on port ${Port}`);    
})