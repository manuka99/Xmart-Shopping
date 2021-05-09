const { model, Schema } = require("mongoose");

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a valid product name"],
      minlength: [8, "Product name must have at least 8 characters"],
    },
    image: {
      type: String,
      required: [true, "Please enter a valid product image"],
      minlength: [8, "Product image must have at least 8 characters"],
    },
    description: {
      type: String,
      required: [true, "Please enter a valid product description"],
      minlength: [20, "Product description must have at least 20 characters"],
    },
    category: {
      type: String,
      required: [true, "Please enter a valid product category"],
      minlength: [4, "Product name must have at least 4 characters"],
    },
    price: {
      type: Number,
      required: [true, "Please enter a valid product price"],
      minlength: [3, "Product name must have at least 3 characters"],
    },
    sku: {
      type: String,
      required: [true, "Please enter a valid product sku"],
      minlength: [8, "Product name must have at least 8 characters"],
    },
    size: {
      type: String,
      required: [true, "Please enter a valid product size"],
      minlength: [2, "Product name must have at least 2 characters"],
    },
    stock: {
      type: Number,
      required: [true, "Please enter a valid product name"],
      minlength: [1, "Product name must have at least 1 character"],
    },
  },
  { timestamps: true }
);

productSchema.index({ name: "text", description: "text" });

module.exports = model("product", productSchema);
