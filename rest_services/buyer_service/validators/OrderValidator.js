const Product = require("../model/Product");

// validate the request and check if there is user_id, buyer_email, buyer_name, buyer_phone, delivery_type and address
exports.ValidateOrderDetails = async (req, res) => {
  var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  var order = req.body;
  var err_message = "";

  if (!order) err_message = "Invalid order";
  else if (order.user_id !== req.user._id)
    err_message = "This order does not belongs to you";
  else if (order.order_status !== "pending")
    err_message =
      "User cannot modify order details at this stage please contact our customer service";
  else if (!order.buyer_name || order.buyer_name.length == 0)
    err_message = "Buyer name is required";
  else if (!order.buyer_email || order.buyer_email.length == 0)
    err_message = "Buyer email is required";
  else if (!order.buyer_email.match(mailformat))
    err_message = "Email format is invalid";
  else if (!order.buyer_phone) err_message = "Buyer contact number is required";
  else if (isNaN(order.buyer_phone))
    err_message = "Mobile number contains invalid characters";
  else if (order.buyer_phone.toString().length != 9)
    err_message =
      "Mobile number must only have 9 characters without the initial 0";
  else if (!order.delivery_type) err_message = "Select delivery type";
  else if (
    !(order.delivery_type == "pickup" || order.delivery_type == "delivery")
  )
    err_message = "Selected delivery type is not valid";
  else if (order.delivery_type == "delivery" && !order.delivery_address)
    err_message = "Enter delivery address";
  else if (order.delivery_type == "pickup") order.delivery_address = "";

  if (err_message.length > 0)
    return res.status(422).json({ message: err_message });
  else return order;
};

// validate order products
// validate the request and check if there is product_id, product_quantity,
exports.ValidateOrderProducts = async (req, res) => {
  var order = req.body;
  var err_message = "";

  try {
    // validate req body
    if (!order) err_message = "Invalid order details";
    else if (
      !order.products ||
      !Array.isArray(order.products) ||
      order.products.length == 0
    )
      err_message = "Invalid order products";
    else {
      var productErrors = [];
      var totalValue = 0;
      var validateOrderProducts = [];

      // validate products individually
      for (let index = 0; index < order.products.length; index++) {
        try {
          var orderProduct = order.products[index];
          // check if order product id exist in DB
          var product = await Product.findById(orderProduct.id);
          if (!product)
            productErrors.push(`${orderProduct.id} Invalid product details`);
          else if (!orderProduct.quantity || isNaN(orderProduct.quantity))
            productErrors.push(`${orderProduct.id} Select order quantity`);
          else if (orderProduct.quantity > product.stock)
            productErrors.push(
              `${orderProduct.id} Product does not have enough stock`
            );
          else {
            totalValue += product.price * orderProduct.quantity;
            // to remove unnessory data sent from the frontend( ex description, image)
            validateOrderProducts.push({
              id: orderProduct.id,
              quantity: orderProduct.quantity,
            });
          }
        } catch (error) {
          productErrors.push(`${orderProduct.id} Invalid product details`);
        }
      }

      if (productErrors.length > 0)
        return res
          .status(422)
          .json({ message: "There were errors in products", productErrors });
      else {
        // set order payment and validated order products
        order.payment_value = totalValue;
        order.products = validateOrderProducts;
      }
    }
    if (err_message.length > 0)
      return res.status(422).json({ message: err_message });
    else return order;
  } catch (error) {
    return res.status(422).json({ message: "There were errors in products" });
  }
};
