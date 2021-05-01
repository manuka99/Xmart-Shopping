const {
    TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN,
    TWILIO_NUMBER,
} = require("../config");

const client = require("twilio")(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

// send sms using twilio
exports.sendSms = (smsOptions) => {
    try {
        client.messages
            .create({
                body: smsOptions.body,
                from: TWILIO_NUMBER,
                to: `+94${smsOptions.to}`,
            })
            .then((message) => console.log(message));
    } catch (error) {
        console.log(error);
    }
};