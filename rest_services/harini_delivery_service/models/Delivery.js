const mongoose = require("mongoose");

const DeliverySchema = new mongoose.Schema({
  buyername: {
    type: String,
    required: [true, "Please provide buyer name"], // validations
  },

  email: {
    type: String,
    required: [true, "Please provide an email"], // validations
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
  },

  telephone: {
    type: String,
    required: [true, "Please provide a telephone number"], //validations
  },

  address: {
    type: String,
    required: [true, "Please provide the delivery address"], // validations
  },

  paymentType: {
    type: String,
    required: [true, "Please provide the payment type"], // validations
  },

  paymentValue: {
    type: Number,
    required: [true, "Please provide the payment value"], // validations
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

const Delivery = mongoose.model("Delivery", DeliverySchema);
module.exports = Delivery;
