var md5 = require("md5");
const { PAYMENT_SECRET } = require("../config");
const Order = require("../model/Order");
const { notifyPaymentSuccessfull } = require("../util/Payment");

// sent from payment gateways
// payement gateways will send info after the payemnt completed
exports.paymentOrderNotification = async (req, res) => {
  try {
    var order = await Order.findById(req.body.order_id);
    console.log(order);

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
      await order.save();
      // send email and mobile sms after completing payment
      notifyPaymentSuccessfull(order);
    } else console.error("Invalid payment");
  } catch (error) {
    console.error(error);
    console.error("Invalid payment");
  }
  return res.status(200).json("ok");
};

// complete the cash on delivery order
exports.codPayment = async (req, res) => {
  try {
    var order = await Order.findById(req.body.order_id);
    var { validatedOrder, errors } = await validateOrderDetails(
      order,
      req.user
    );
    validatedOrder.payment_status = "pending";
    validatedOrder.order_status = "validating";
    validatedOrder.payment_type = "COD";
    await validatedOrder.save();
    // send email and mobile sms after completing payment
    notifyPaymentSuccessfull(validatedOrder);
    return res.status(200).json({ message: "Order was placed successfully" });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Payment failed" });
  }
};
