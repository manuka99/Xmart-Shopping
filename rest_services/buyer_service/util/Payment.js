const { MAIL_USER } = require("../config");
const { sendMail, readHTMLFile } = require("./MailService");
var handlebars = require("handlebars");
const { sendSms } = require("./SmsService");

// send email and sms notifing payment successfully
exports.notifyPaymentSuccessfull = async (order) => {
  // send email
  var html = await readHTMLFile("./templates/mail/OrderPlaced.html");
  // get the email template
  var template = handlebars.compile(html);

  var replacements = {
    orderID: order._id,
    buyer_name: order.buyer_name,
    delivery_address: order.delivery_address,
    payment_type: order.payment_type,
    payment_value: order.payment_value,
    products: JSON.stringify(order.products),
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
    body: `Order has been placed Order ID - ${order._id} with a payment value of Rs ${order.payment_value}. You can track your order through our website http://localhost:3000/track-order. Thank you for shopping with Xmart shopping`,
  };
  // sendSms(smsOptions);
};

// send email and sms notifing payment successfully
exports.notifyPaymentFailed = async (order) => {
  var message = `Order has not been placed - ${order._id}, There were errors while placing your order please contact our customer service for assistance`;

  var mailOptions = {
    from: MAIL_USER,
    to: order.buyer_email,
    subject: `Order has not been placed - ${order._id}`,
    text: message,
  };
  sendMail(mailOptions);

  // send sms
  var smsOptions = {
    to: order.buyer_phone,
    body: message,
  };
  // sendSms(smsOptions);
};
