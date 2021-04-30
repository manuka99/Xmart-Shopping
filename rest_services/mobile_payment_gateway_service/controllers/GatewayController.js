const Mobile = require("../models/Mobile");
const {
    validatePaymentRequest,
    validateMobileNumber,
} = require("../util/GatewayValidations");
const { sendSms } = require("../util/SmsService");

exports.makePayment = async(req, res) => {
    try {
        var errors = validatePaymentRequest(req.body);
        if (Object.keys(errors) == 0) {
            var mobile = await Mobile.findOne({ mobile_no: req.body.mobile_no });
            // console.log(mobile);
            if (!mobile) throw new Error("invalid mobile number");

            if (mobile.pin != req.body.pin)
                return res.status(200).json({
                    errors: { pin: "pin number did not match" },
                });
            else {
                // complete transaction
                mobile.balance += req.body.transfer_amount;
                mobile.save();
                return res.status(200).json({
                    payment: "Payment was successfull",
                    status: "1",
                });
            }
        } else return res.status(200).json({ errors: errors });
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errors: { number: "This mobile number does not accept payments" },
        });
    }
};

exports.requestPin = async(req, res) => {
    try {
        var phone_number = req.params.number;
        var errors = validateMobileNumber(phone_number);

        if (Object.keys(errors) == 0) {
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

            mobile.save();

            // send the pin via sms
            var smsOptions = {
                to: phone_number,
                body: `Your XMart Payment Pin is - ${pin}`,
            };

            // sendSms(smsOptions);

            return res.status(200).json({
                message: "Pin was sent successfull",
            });
        }
        return res.status(200).json({ errors: errors });
    } catch (error) {
        console.log(error);
        return res
            .status(200)
            .json({ errors: { number: "Invalid mobile number" } });
    }
};