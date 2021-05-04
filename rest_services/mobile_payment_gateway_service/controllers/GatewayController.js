var md5 = require("md5");
const { default: axios } = require("axios");
const { PAYMENT_SECRET, PAYMENT_NOTIFY_URL } = require("../config");
const Mobile = require("../models/Mobile");
const {
  validatePaymentRequest,
  validateMobileNumber,
} = require("../util/GatewayValidations");
const { sendSms } = require("../util/SmsService");

exports.makePayment = async (req, res) => {
  try {
    var validatedPayment = validatePaymentRequest(req, res);

    // get the mobile object from DB to validate
    var mobile = await Mobile.findOne({
      mobile_no: validatedPayment.mobile_no,
    });

    // match mobile data with request data
    var err_message = "";
    if (!mobile) err_message = "invalid mobile number";
    else if (mobile.pin != req.body.pin)
      err_message = "pin number did not match";
    // iff data is not matched
    if (err_message.length > 0)
      return res.status(422).json({ message: err_message });

    // if data is matched
    // complete transaction
    mobile.balance += Number.parseFloat(req.body.transfer_amount);
    var result = await mobile.save();

    // save failed
    if (result && result.error) return res.status(422).json(result.error);

    //payment complted therefour notify main server payment complted
    notifyServer(req.body.order_id, req.body.transfer_amount);
    return res.status(200).json({
      payment: "Payment was successfull",
      status: 1,
    });
  } catch (error) {
    console.log(error);
    return res.status(422).json({
      errors: { message: "This mobile number does not accept payments" },
    });
  }
};

exports.requestPin = async (req, res) => {
  try {
    var phone_number = req.params.number;
    console.log(phone_number);

    // validate mobile number
    var error = validateMobileNumber(phone_number);
    if (error.length > 0) return res.status(422).json({ mesaage: error });

    // send pin number
    // generate random 4 digit pin
    var pin = Math.floor(1000 + Math.random() * 9000);
    console.log(pin);

    var mobile = await Mobile.findOne({ mobile_no: phone_number });
    if (!mobile) {
      mobile = new Mobile({
        mobile_no: phone_number,
        pin,
      });
    } else mobile.pin = pin;

    var result = await mobile.save();

    // save failed
    if (result && result.error)
      return res
        .status(422)
        .json({ message: "Unexpected error please try again" });

    // send the pin via sms
    var smsOptions = {
      to: phone_number,
      body: `Your XMart Payment Pin is - ${pin}`,
    };

    sendSms(smsOptions);

    return res.status(200).json({
      message: "Pin was sent successfull",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(422)
      .json({ errors: { message: "Invalid mobile number" } });
  }
};

// notify server that the payment was completed
const notifyServer = (orderID, transfer_amount) => {
  // hash the payment data to validate at the buyer server
  var hash_pay_code = md5(`${PAYMENT_SECRET}${orderID}${transfer_amount}`);
  console.log(hash_pay_code);
  axios
    .post(PAYMENT_NOTIFY_URL, {
      order_id: orderID,
      payment_type: "mobile",
      hash_pay_code,
    })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};
