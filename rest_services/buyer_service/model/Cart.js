const { model, Schema } = require("mongoose");

const cartSchema = new Schema({
    user_id: { type: String, required: true },
    products: { type: Array, required: true },
    payment_value: { type: Number, required: false },
}, { timestamps: true });

module.exports = model("cart", cartSchema);