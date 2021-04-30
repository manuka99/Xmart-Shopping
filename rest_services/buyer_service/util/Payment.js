const axios = require("axios");
const {
    CARD_PAYMENT_GATEWAY,
    MAIL_USER,
    MOBILE_PAYMENT_GATEWAY,
} = require("../config");
const { sendMail, readHTMLFile } = require("./MailService");
var handlebars = require("handlebars");
const { sendSms } = require("./SmsService");

exports.cardTransfer = async(cardPayment, transfer_amount) => {
    var errors = {};
    try {
        var response = await axios.post(CARD_PAYMENT_GATEWAY, {
            card_no: cardPayment.card_no,
            card_cvc: cardPayment.card_cvc,
            card_holder_name: cardPayment.card_holder_name,
            transfer_amount: transfer_amount,
        });

        errors = response.data.errors;

        if (response.data.status == 1) return { errors, completed: true };
        else return { errors, completed: false };
    } catch (error) {
        console.log(error);
        return error;
    }
};

exports.mobileTransfer = async(mobilePayment, transfer_amount) => {
    var errors = {};
    try {
        var response = await axios.post(MOBILE_PAYMENT_GATEWAY, {
            mobile_no: mobilePayment.mobile_no,
            pin: mobilePayment.pin,
            transfer_amount: transfer_amount,
        });

        errors = response.data.errors;

        if (response.data.status == 1) return { errors, completed: true };
        else return { errors, completed: false };
    } catch (error) {
        console.log(error);
        return error;
    }
};

exports.notifyPaymentSuccessfull = async(order) => {
    // send email
    var html = await readHTMLFile("./templates/mail/OrderPlaced.html");
    var template = handlebars.compile(html);
    var replacements = {
        orderID: order._id,
        buyer_name: order.buyer_name,
        delivery_address: order.delivery_address,
        payment_type: order.payment_type,
        product_quantity: order.product_quantity,
        payment_value: order.payment_value,
        product_id: order.product_id,
    };
    var htmlToSend = template(replacements);

    var mailOptions = {
        from: MAIL_USER,
        to: order.buyer_email,
        subject: `Order has been placed - ${order._id}`,
        html: htmlToSend,
    };
    sendMail(mailOptions);

    // send sms
    var smsOptions = {
        to: order.buyer_phone,
        body: `Order has been placed - ${order._id}`,
    };
    sendSms(smsOptions);
};