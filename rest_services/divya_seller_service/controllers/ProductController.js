const Product = require("../model/Product");

// list all the products
exports.listProducts = async (req, res) => {
  try {
    let products = await Product.find();
    return res.status(200).json(products);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Error when retrriving products" });
  }
};

// find product based on id
exports.findProduct = async (req, res) => {
  try {
    let product = await Product.findById(req.params.pid);
    if (product) return res.status(200).json(product);
    else return res.status(400).json({ message: "Product not found" });
  } catch (error) {
    console.error(error);
    return res.status(400).json(error);
  }
};

// create / update a product
exports.saveProduct = async (req, res) => {
  try {
    // initialize product to be be created or update
    var product = new Product();

    // if product id is sent then retrive that product and update else create new product.
    if (req.params.pid) product = await Product.findById(req.params.pid);

    // set new product data
    product.name = req.body.name;
    product.image = req.body.image;
    product.description = req.body.description;
    product.price = req.body.price;
    product.sku = req.body.sku;
    product.size = req.body.size;
    product.stock = req.body.stock;
    product.category = req.body.category;
    // save product
    var result = {};
    try {
      result = await product.save();
    } catch (error) {
      return res.status(422).json(error);
    }
    // updating / saving failes
    if (result && result.error)
      return res.status(400).json({
        message: "Error when saving product",
        product: result._doc,
      });
    // saved successfully
    return res.status(200).json({
      message: "Product was saved successfully",
      product: result._doc,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Product not found" });
  }
};

// delete a product
exports.deleteProduct = async (req, res) => {
  try {
    let result = await Product.findByIdAndDelete(req.params.pid);
    // delete failed
    if (result && result.error)
      return res.status(400).json({ message: "Error when deleting product" });
    // delete successfull
    return res
      .status(200)
      .json({ message: "Product was deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(400).json(error);
  }
};
