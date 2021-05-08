const Cart = require("../model/Cart");
const Product = require("../model/Product");
const OrderValidator = require("../validators/OrderValidator");

exports.addToCart = async (req, res) => {
  try {
    // validate the products in the cart
    //use the validator used to validate order products
    var validatedOrder = await OrderValidator.ValidateOrderProducts(req, res);

    var cart = await Cart.findOne({ user_id: req.user._id });

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

    // if cart save fail
    if (result && result.error) return res.status(400).json(result);

    return res
      .status(200)
      .json({ message: "All changes was saved", cart: result._doc });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Unexpected error" });
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
    return res.status(400).json({ message: "User cart not found" });
  }
};

// add, update or delete a product in cart
exports.storeToCart = async (req, res) => {
  try {
    var validatedCart = {};
    // validate the products in the cart if it has products only
    if (
      req.body.products &&
      Array.isArray(req.body.products) &&
      req.body.products.length > 0
    )
      validatedCart = await OrderValidator.ValidateOrderProducts(req, res);
    else {
      // no cart products means that user have deleted all the products from the cart
      // we can allow it because the cart can be empty
      validatedCart.products = [];
      validatedCart.payment_value = 0;
    }
    // get cart details
    var cart = await Cart.findOne({ user_id: req.user._id });
    if (!cart) {
      // ifthe user does not habve a cart
      cart = new Cart({
        user_id: req.user._id,
        products: validatedCart.products,
        payment_value: validatedCart.payment_value,
      });
    } else {
      // if the user already have a cart
      cart.products = validatedCart.products;
      cart.payment_value = validatedCart.payment_value;
    }
    // save cart
    var result = await cart.save();
    if (result && result.error) return res.status(400).json(result);
    return res
      .status(200)
      .json({ message: "All changes was saved", cart: result._doc });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Invalid cart details" });
  }
};
