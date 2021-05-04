var md5 = require("md5");
const { PAYMENT_SECRET } = require("../config");
const Order = require("../model/Order");
const {
  notifyPaymentSuccessfull,
  notifyPaymentFailed,
} = require("../util/Payment");
const OrderValidator = require("../validators/OrderValidator");

// sent from payment gateways
// payement gateways will send info after the payemnt completed
exports.paymentOrderNotification = async (req, res) => {
  try {
    var order = await Order.findById(req.body.order_id);

    // hash paras and validate if the payment was made
    var hash_pay_code_valid = md5(
      `${PAYMENT_SECRET}${order._id}${order.payment_value}`
    );

    console.log(`${hash_pay_code_valid} vs ${req.body.hash_pay_code}`);

    if (hash_pay_code_valid == req.body.hash_pay_code) {
      // complete order if hashed matches
      console.log("Valid payment");
      order.payment_status = "paid";
      order.order_status = "validating";
      order.payment_type = req.body.payment_type;
      var result = await order.save();

      // send error if saving failed
      if (result && result.error) {
        notifyPaymentFailed(order);
        return res.status(422).json(result);
      }

      // send email and mobile sms after completing payment
      notifyPaymentSuccessfull(order);
    } else {
      console.error("Failed to match hash in order");
      notifyPaymentFailed(order);
    }
  } catch (error) {
    console.error(error);
    console.error("Invalid payment");
    notifyPaymentFailed(order);
  }
  return res.status(200).json("ok");
};

// complete the cash on delivery order
exports.codPayment = async (req, res) => {
  try {
    var order = await Order.findById(req.body.order_id);

    var req_data = { body: { ...order._doc }, user: { ...req.user } };

    console.log(req_data);

    // validate order details
    var validatedOrder = OrderValidator.ValidateOrderDetails(req_data, res);

    order.payment_status = "pending";
    order.order_status = "validating";
    order.payment_type = "COD";
    var result = await order.save();

    if (result && result.error) {
      notifyPaymentFailed(order);
      return res.status(422).json(result);
    }

    // send email and mobile sms after completing payment
    notifyPaymentSuccessfull(order);
    return res
      .status(200)
      .json({ message: "Order was placed successfully", status: 1 });
  } catch (error) {
    console.error(error);
    notifyPaymentFailed(order);
    return res.status(422).json({ errors: { message: "Payment failed" } });
  }
};
