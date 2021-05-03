const { PAYMENT_SECRET } = require("../config");
const Order = require("../model/Order");
var md5 = require("md5");
const Product = require("../model/Product");
const {
  validateNewOrder,
  validateOrderDetails,
  validateOrderProducts,
} = require("../util/Order");
const {
  cardTransfer,
  notifyPaymentSuccessfull,
  mobileTransfer,
} = require("../util/Payment");

// new order
exports.newOrder = async (req, res) => {
  try {
    // validate the order products including product id and product stock
    var { errors, validatedOrder } = await validateOrderProducts(req.body);

    //validate new Order
    if (Object.keys(errors) == 0) {
      //save the order
      let order = new Order({
        order_status: "pending",
        user_id: req.user._id,
        products: req.body.products,
        payment_value: validatedOrder.payment_value,
      });

      let result = await order.save();
      if (result && result.error) return res.status(422).json(result);
      else return res.status(200).json(result);
    } else return res.status(422).json(errors);
  } catch (error) {
    console.error(error);
    return res.status(422).json(error);
  }
};

// retrive the order tails based on id
exports.getOrderDetails = async (req, res) => {
  try {
    let order = await Order.findOne({
      _id: req.params.order_id,
      user_id: req.user._id,
    });
    return res.status(200).json(order);
  } catch (error) {
    console.error(error);
    return res.status(422).json({ message: "Order not found" });
  }
};

// after the order is created user can save the buyer info and the delivery info
exports.saveOrderDetails = async (req, res) => {
  try {
    var order = await Order.findById(req.params.order_id);

    order.buyer_name = req.body.buyer_name;
    order.buyer_email = req.body.buyer_email;
    order.buyer_phone = req.body.buyer_phone;
    order.delivery_type = req.body.delivery_type;
    order.delivery_address = req.body.delivery_address;
    // validate the requset
    var { validatedOrder, errors } = await validateOrderDetails(
      order,
      req.user
    );
    if (Object.keys(errors) == 0) {
      // save details
      var result = await validatedOrder.save();
      if (result && result.error) return res.status(422).json(result.error);
      else {
        // hash paras
        var hash_pay_code = md5(
          `${PAYMENT_SECRET}${order._id}${order.payment_value}`
        );
        console.log(hash_pay_code);
        result = { ...result._doc, hash_pay_code };
        return res.status(200).json(result);
      }
    } else return res.status(422).json(errors);
  } catch (error) {
    console.error(error);
    return res.status(422).json({ message: "Order not found" });
    // return res.status(422).json(error);
  }
};

// // validate order payment and perform functions
// exports.orderPayment = async (req, res) => {
//   try {
//     var order = await Order.findById(req.params.order_id);
//     var { validatedOrder, errors } = await validateOrderDetails(
//       order,
//       req.user
//     );
//     if (Object.keys(errors) == 0) {
//       // payment types
//       switch (req.body.payment_type) {
//         case "COD":
//           validatedOrder.payment_status = "pending";
//           validatedOrder.order_status = "validating";
//           break;
//         case "card":
//           var { errors, completed } = await cardTransfer(
//             req.body,
//             order.payment_value
//           );
//           if (completed) {
//             validatedOrder.payment_status = "paid";
//             validatedOrder.order_status = "validating";
//           } else return res.status(422).json(errors);
//           break;
//         case "mobile":
//           var { errors, completed } = await mobileTransfer(
//             req.body,
//             order.payment_value
//           );
//           if (completed) {
//             validatedOrder.payment_status = "paid";
//             validatedOrder.order_status = "validating";
//           } else return res.status(422).json(errors);
//           break;
//         default:
//           return res
//             .status(422)
//             .json({ payment_type: "Please select a valid payment method" });
//       }

//       // save payment
//       let result = await validatedOrder.save();
//       if (result && result.error) return res.status(422).json(result.error);
//       else {
//         notifyPaymentSuccessfull(order);
//         return res
//           .status(200)
//           .json({ message: "Order was placed successfull" });
//       }
//     } else return res.status(422).json(errors);
//   } catch (error) {
//     console.error(error);
//     return res.status(422).json({ message: "Order not found" });
//     // return res.status(422).json(error);
//   }
// };
