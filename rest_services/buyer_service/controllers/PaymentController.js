// sent from payment gateways

const Order = require("../model/Order");
const { notifyPaymentSuccessfull } = require("../util/Payment");

// payement gateways will send info after the payemnt completed
exports.paymentOrderNotification = async(req, res) => {
    try {
        var order = await Order.findById(req.body.order_id);
        console.log(order);
        order.payment_status = "paid";
        order.order_status = "validating";
        order.payment_type = req.body.payment_type;
        await order.save();
        // send email and mobile sms after completing payment
        notifyPaymentSuccessfull(order);
    } catch (error) {
        console.error(error);
    }
    return res.status(200).json("ok");
};

// complete the cash on delivery order
exports.codPayment = async(req, res) => {
    try {
        var order = await Order.findById(req.body.order_id);
        order.payment_status = "paid";
        order.order_status = "validating";
        order.payment_type = "COD";
        await order.save();
        // send email and mobile sms after completing payment
        notifyPaymentSuccessfull(order);
        return res.status(200).json({ message: "Order was placed successfully" });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: "Payment failed" });
    }
};