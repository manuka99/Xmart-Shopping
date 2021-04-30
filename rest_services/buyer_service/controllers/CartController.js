const Cart = require("../model/Cart");
const Product = require("../model/Product");
const { validateOrderProducts } = require("../util/Order");

exports.getCart = async(req, res) => {
    try {
        var cart = await Cart.findOne({ user_id: req.user._id });
        if (cart && cart.products.length > 0) {
            for (let index = 0; index < cart.products.length; index++) {
                try {
                    cart.products[index].data = await Product.findById(
                        cart.products[index].id
                    );
                } catch (error) {
                    console.log(error);
                }
            }
        }
        return res.status(200).json(cart);
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: "User cart not found" });
    }
};

exports.storeToCart = async(req, res) => {
    try {
        var cart = await Cart.findOne({ user_id: req.user._id });
        var { errors, validatedOrder } = await validateOrderProducts(req.body);
        if (Object.keys(errors) == 0) {
            if (!cart) {
                cart = new Cart({
                    user_id: req.user._id,
                    products: validatedOrder.products,
                    payment_value: validatedOrder.payment_value,
                });
            } else {
                cart.products = validatedOrder.products;
                cart.payment_value = validatedOrder.payment_value;
            }
            var result = await cart.save();
            if (result && result.error) return res.status(400).json(result);
            return res.status(200).json({ message: "All changes was saved" });
        } else return res.status(400).json(errors);
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: "Invalid cart details" });
    }
};