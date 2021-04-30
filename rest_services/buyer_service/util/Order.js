const Product = require("../model/Product");

exports.validateNewOrder = (order) => {
    if (
        order &&
        order.product_id &&
        order.product_quantity &&
        !isNaN(order.product_quantity)
    )
        return true;
    else return false;
};

// exports.validateOrderDetails = (order) => {
//     var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
//     if (
//         order &&
//         order.product_id &&
//         order.product_quantity &&
//         !isNaN(order.product_quantity) &&
//         order.buyer_name &&
//         order.buyer_email &&
//         order.buyer_email.match(mailformat) &&
//         order.buyer_phone &&
//         order.delivery_type &&
//         (order.delivery_type == "pickup" || order.delivery_type == "delivery") &&
//         (order.payment_type == "card" ||
//             order.payment_type == "bank" ||
//             order.payment_type == "COD")
//     )
//         return true;
//     else return false;
// };

exports.validateOrderDetails = async(order, user) => {
    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    var errors = {};

    if (!order ||
        order.user_id !== user._id ||
        order.order_status !== "pending"
    ) {
        errors.order = "Invalid order";
        return { order, errors };
    }

    var { errors, validatedOrder } = await this.validateOrderProducts(order);

    if (Object.keys(errors) == 0) {
        if (!validatedOrder.buyer_name || !validatedOrder.buyer_email)
            errors.buyer = "Fill all the required buyer details";
        else if (!validatedOrder.buyer_email.match(mailformat))
            errors.buyer = "Enter a valid email";
        else if (!validatedOrder.buyer_phone ||
            isNaN(validatedOrder.buyer_phone) ||
            validatedOrder.buyer_phone.length > 10 ||
            validatedOrder.buyer_phone.length < 9
        )
            errors.buyer = "Enter a valid mobile number";
        else if (!validatedOrder.delivery_type ||
            !(
                validatedOrder.delivery_type == "pickup" ||
                validatedOrder.delivery_type == "delivery"
            )
        )
            errors.delivery_type = "Select delivery type";
        else if (
            validatedOrder.delivery_type == "delivery" &&
            !validatedOrder.delivery_address
        )
            errors.delivery_address = "Enter delivery address";

        if (validatedOrder.delivery_type == "pickup")
            validatedOrder.delivery_address = "";
    }
    return { validatedOrder, errors };
};

exports.validateOrderProducts = async(order) => {
    var errors = {};
    var validatedOrder = order;
    try {
        if (!order ||
            !order.products ||
            !Array.isArray(order.products) ||
            order.products.length == 0
        )
            errors.order = "Invalid order details";
        else {
            var productErrors = [];
            var totalValue = 0;
            for (let index = 0; index < order.products.length; index++) {
                try {
                    var orderProduct = order.products[index];
                    var product = await Product.findById(orderProduct.id);

                    if (!product)
                        productErrors.push(`${orderProduct.id} Invalid product details`);
                    else if (!orderProduct.quantity || isNaN(orderProduct.quantity))
                        productErrors.push(`${orderProduct.id} Select order quantity`);
                    else if (orderProduct.quantity > product.stock)
                        productErrors.push(
                            `${orderProduct.id} Product does not have enough stock`
                        );
                    else totalValue += product.price * orderProduct.quantity;
                } catch (error) {
                    productErrors.push(`${orderProduct.id} Invalid product details`);
                }
            }

            if (productErrors.length > 0) errors.productErrors = productErrors;
            if (Object.keys(errors) == 0) validatedOrder.payment_value = totalValue;
        }
    } catch (error) {
        errors.product = "Invalid product details";
    }

    return { errors, validatedOrder };
};