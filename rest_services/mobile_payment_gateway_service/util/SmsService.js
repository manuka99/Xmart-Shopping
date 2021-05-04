const {
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_NUMBER,
} = require("../config");

const client = require("twilio")(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

exports.sendSms = async (smsOptions) => {
  try {
    await client.messages
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
