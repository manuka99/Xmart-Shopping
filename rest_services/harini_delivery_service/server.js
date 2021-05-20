require("dotenv").config({ path: "./config.env" });
const express = require("express");
const connectDB = require("./config/db");
const passport = require("passport");
const cors = require("cors");

// Routes
const deliveryRoutes = require("./routes/api/delivery");
const AuthRoutes = require("./routes/api/AuthRoutes");
const { UserAuth } = require("./middlewares/UserAuth");

const app = express();
//Bodyparser middleware
app.use(express.json());
app.use(cors());

// Connect to the DB
connectDB();

app.use(passport.initialize());
require("./middlewares/Passport")(passport);

// auth routes
app.use("/api/auth", AuthRoutes);

// delivery routes
app.use("/api/admin/delivery", UserAuth, deliveryRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server run at port " + PORT));

//
