const { model, Schema } = require("mongoose");

const cardSchema = new Schema(
  {
    card_no: { type: Number, required: true },
    card_cvc: { type: Number, required: true },
    card_holder_name: { type: String, required: true },
    balance: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = model("card", cardSchema);
