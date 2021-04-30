const { model, Schema } = require("mongoose");

const productSchema = new Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    sku: { type: String, required: true },
    size: { type: String, required: true },
    stock: { type: Number, required: true },
}, { timestamps: true });

module.exports = model("product", productSchema);