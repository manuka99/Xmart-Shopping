const { ORDER_SECRET } = require("../config");
const Order = require("../model/Order");
var md5 = require("md5");
const OrderValidator = require("../validators/OrderValidator");

// new order
exports.newOrder = async (req, res) => {
  try {
    // validate the order products including product id and product stock
    var validatedOrder = await OrderValidator.ValidateOrderProducts(req, res);

    //save the order
    let order = new Order({
      order_status: "pending",
      user_id: req.user._id,
      products: validatedOrder.products,
      payment_value: validatedOrder.payment_value,
    });

    let result = await order.save();
    if (result && result.error) return res.status(400).json(result);
    else return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(400).json(error);
  }
};

// retrive the order tails based on id
exports.getOrderDetails = async (req, res) => {
  try {
    var order = await Order.findById(req.params.order_id);
    return res.status(200).json(order);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Order not found" });
  }
};

// after the order is created user can save the buyer info and the delivery info
exports.saveOrderDetails = async (req, res) => {
  try {
    // validate the requset
    var validatedOrder = await OrderValidator.ValidateOrderDetails(req, res);

    // get the order
    var order = await Order.findById(req.params.order_id);

    order.buyer_name = validatedOrder.buyer_name;
    order.buyer_email = validatedOrder.buyer_email;
    order.buyer_phone = validatedOrder.buyer_phone;
    order.delivery_type = validatedOrder.delivery_type;
    order.delivery_address = validatedOrder.delivery_address;

    // save details
    var result = await order.save();
    if (result && result.error) return res.status(400).json(result.error);
    else {
      // hash parameters of the order to confirm payment details from gateways
      var hash_order_code = md5(
        `${ORDER_SECRET}${order._id}${order.payment_value}`
      );
      result = { ...result._doc, hash_order_code };
      return res.status(200).json(result);
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Order not found" });
  }
};
