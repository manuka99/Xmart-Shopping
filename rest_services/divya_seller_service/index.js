const bodyParser = require("body-parser");
const cors = require("cors");
const { connect } = require("mongoose");
const express = require("express");
const { DB, PORT } = require("./config");
const Authenticate = require("./middlewares/Authenticate");
const SellerAuth = require("./middlewares/SellerAuth");

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.all("*", Authenticate);
app.use("/api/admin/product", SellerAuth, require("./routes/ProductRoutes"));

const startApp = async () => {
  try {
    await connect(DB, {
      useFindAndModify: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    console.log("Connected to database");

    await app.listen(PORT, () =>
      console.log(`App is listening on port ${PORT}`)
    );
  } catch (error) {
    console.error(error);
    startApp();
  }
};

startApp();
