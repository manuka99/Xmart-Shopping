require("dotenv").config();

module.exports = {
  DB: process.env.APP_DB,
  PORT: process.env.APP_PORT,
  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
  TWILIO_NUMBER: process.env.TWILIO_NUMBER,
  PAYMENT_SECRET: process.env.PAYMENT_SECRET,
  ORDER_SECRET: process.env.ORDER_SECRET,
  PAYMENT_NOTIFY_URL: process.env.PAYMENT_NOTIFY_URL,
};
