require("dotenv").config();

module.exports = {
  DB: process.env.APP_DB,
  PORT: process.env.APP_PORT,
  KEY: process.env.APP_KEY,
  AUTH_GATEWAY: process.env.AUTH_GATEWAY,
  MAIL_USER: process.env.MAIL_USER,
  MAIL_PASSWORD: process.env.MAIL_PASSWORD,
  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
  TWILIO_NUMBER: process.env.TWILIO_NUMBER,
  PAYMENT_SECRET: process.env.PAYMENT_SECRET,
  ORDER_SECRET: process.env.ORDER_SECRET,
};
