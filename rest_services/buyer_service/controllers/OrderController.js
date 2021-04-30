const Order = require("../model/Order");
const Product = require("../model/Product");
const {
    validateNewOrder,
    validateOrderDetails,
    validateOrderProduct,
} = require("../util/Order");
const { cardTransfer, notifyPaymentSuccessfull } = require("../util/Payment");

exports.newOrder = async(req, res) => {
    try {
        var { errors, validatedOrder } = await validateOrderProduct(req.body);

        //validate new Order
        console.log(errors);
        if (Object.keys(errors) == 0) {
            //save the order
            let order = new Order({
                order_status: "pending",
                user_id: req.user._id,
                product_id: req.body.product_id,
                product_quantity: req.body.product_quantity,
                payment_value: validatedOrder.payment_value,
            });

            let result = await order.save();
            if (result && result.error) return res.status(400).json(result);
            else return res.status(200).json(result);
        } else return res.status(400).json(errors);
    } catch (error) {
        console.error(error);
        return res.status(400).json(error);
    }
};

exports.getOrderDetails = async(req, res) => {
    try {
        let order = await Order.findById(req.params.order_id);
        return res.status(200).json(order);
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: "Order not found" });
    }
};

exports.saveOrderDetails = async(req, res) => {
    try {
        var order = await Order.findById(req.params.order_id);

        order.buyer_name = req.body.buyer_name;
        order.buyer_email = req.body.buyer_email;
        order.buyer_phone = req.body.buyer_phone;
        order.delivery_type = req.body.delivery_type;
        order.delivery_address = req.body.delivery_address;

        var { validatedOrder, errors } = await validateOrderDetails(
            order,
            req.user
        );
        if (Object.keys(errors) == 0) {
            // save details
            let result = await validatedOrder.save();
            if (result && result.error) return res.status(400).json(result.error);
            else return res.status(200).json(result);
        } else return res.status(400).json(errors);
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: "Order not found" });
        // return res.status(400).json(error);
    }
};

exports.orderPayment = async(req, res) => {
    try {
        var order = await Order.findById(req.params.order_id);
        var { validatedOrder, errors } = await validateOrderDetails(
            order,
            req.user
        );
        if (Object.keys(errors) == 0) {
            // payment types
            switch (req.body.payment_type) {
                case "COD":
                    validatedOrder.payment_status = "pending";
                    validatedOrder.order_status = "validating";
                    break;
                case "payhere":
                    validatedOrder.payment_status = "pending";
                    validatedOrder.order_status = "validating";
                    break;
                case "card":
                    var { errors, completed } = await cardTransfer(
                        req.body,
                        order.payment_value
                    );
                    if (completed) {
                        validatedOrder.payment_status = "paid";
                        validatedOrder.order_status = "validating";
                    } else return res.status(400).json(errors);
                    break;
                case "mobile":
                    var { errors, completed } = await cardTransfer(req.body);
                    if (completed) {
                        validatedOrder.payment_status = "paid";
                        validatedOrder.order_status = "validating";
                    } else return res.status(400).json(errors);
                    break;
                default:
                    return res
                        .status(400)
                        .json({ payment_type: "Please select a valid payment method" });
            }

            // save payment
            let result = await validatedOrder.save();
            if (result && result.error) return res.status(400).json(result.error);
            else {
                notifyPaymentSuccessfull(order);
                return res
                    .status(200)
                    .json({ message: "Order was placed successfull" });
            }
        } else return res.status(400).json(errors);
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: "Order not found" });
        // return res.status(400).json(error);
    }
};