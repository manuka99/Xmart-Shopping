const cors = require("cors");
const body_parser = require("body-parser");
const { connect } = require("mongoose");
const express = require("express");
const passport = require("passport");
const { DB, PORT } = require("./config/index");

// init app
const app = express();

// middlewares
app.use(body_parser.json());
app.use(cors());

app.use(passport.initialize());
require("./middlewares/Passport")(passport);

// routes
app.use("/api/auth", require("./routes/Auth"));

const startApp = async () => {
  try {
    // connect db
    await connect(DB, {
      useFindAndModify: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    console.log("Connected to database");

    await app.listen(PORT, () => console.log(`App is running on port ${PORT}`));
  } catch (error) {
    console.error("Database connectivity failed", error);
    startApp();
  }
};

// start the app
startApp();
