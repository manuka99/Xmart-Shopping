const { model, Schema } = require("mongoose");

const orderSchema = new Schema(
  {
    order_status: { type: String, required: true },
    user_id: { type: String, required: true },
    products: { type: Array, required: true },

    buyer_name: { type: String, required: false },
    buyer_email: { type: String, required: false },
    buyer_phone: { type: Number, required: false },

    payment_value: { type: Number, required: false },
    payment_type: {
      type: String,
      default: "card",
      enum: ["COD", "card", "mobile"],
    },
    payment_status: { type: String, required: false },

    delivery_type: {
      type: String,
      default: "delivery",
      enum: ["pickup", "delivery"],
    },
    delivery_address: { type: String, required: false },
    delivery_status: { type: String, required: false },
  },
  { timestamps: true }
);

module.exports = model("order", orderSchema);
