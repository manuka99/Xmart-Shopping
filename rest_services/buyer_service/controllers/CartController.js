const Cart = require("../model/Cart");
const Product = require("../model/Product");
const { validateOrderProducts } = require("../util/Order");

exports.addToCart = async (req, res) => {
  try {
    var cart = await Cart.findOne({ user_id: req.user._id });
    // validate the products in the cart
    var { errors, validatedOrder } = await validateOrderProducts(req.body);
    if (Object.keys(errors) == 0) {
      if (!cart) {
        // ifthe user does not habve a cart
        cart = new Cart({
          user_id: req.user._id,
          products: validatedOrder.products,
          payment_value: validatedOrder.payment_value,
        });
      } else {
        // if the user already have a cart
        cart.products = [...cart.products, ...validatedOrder.products];
        cart.payment_value =
          validatedOrder.payment_value + validatedOrder.payment_value;
      }
      var result = await cart.save();
      if (result && result.error) return res.status(422).json(result);
      return res.status(200).json({ message: "All changes was saved" });
    } else return res.status(422).json(errors);
  } catch (error) {
    console.error(error);
    return res.status(422).json({ message: "Unexpected error" });
  }
};

// get cart od the logged in user
exports.getCart = async (req, res) => {
  try {
    var cart = await Cart.findOne({ user_id: req.user._id });
    // if the cart exist and if the cart has products, get the products rom the cart
    if (cart && cart.products.length > 0) {
      for (var index = 0; index < cart.products.length; index++) {
        try {
          // add all the product data
          cart.products[index].data = await Product.findById(
            cart.products[index].id
          );
        } catch (error) {
          console.log(error);
        }
      }
    }
    return res.status(200).json(cart ? cart : {});
  } catch (error) {
    console.error(error);
    return res.status(422).json({ message: "User cart not found" });
  }
};

// add, update or delete a product in cart
exports.storeToCart = async (req, res) => {
  try {
    var cart = await Cart.findOne({ user_id: req.user._id });
    // validate the products in the cart
    var { errors, validatedOrder } = await validateOrderProducts(req.body);
    if (Object.keys(errors) == 0) {
      if (!cart) {
        // ifthe user does not habve a cart
        cart = new Cart({
          user_id: req.user._id,
          products: validatedOrder.products,
          payment_value: validatedOrder.payment_value,
        });
      } else {
        // if the user already have a cart
        cart.products = validatedOrder.products;
        cart.payment_value = validatedOrder.payment_value;
      }
      var result = await cart.save();
      if (result && result.error) return res.status(422).json(result);
      return res
        .status(200)
        .json({ message: "All changes was saved", result: result._doc });
    } else return res.status(422).json(errors);
  } catch (error) {
    console.error(error);
    return res.status(422).json({ message: "Invalid cart details" });
  }
};
