const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport") 
const cors = require("cors");

const config = require('./db/db');
// const User = require("./models/userModel");

app.use(passport.initialize());
require('./Auth/passport')(passport);
const appRoutes = require('./routes/user');
// const appRoutes = express.Router();
const PORT = 4000;
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(config.DB, { useNewUrlParser: true });

const connection = mongoose.connection;
connection.once("open", function() {
  console.log("MongoDB database connection established successfully");
});
app.set('superSecret', config.jwtSecret); // secret variable
 
app.use("/", appRoutes);
app.listen(PORT, function() {
  console.log("Server is running on Port: " + PORT);
});
