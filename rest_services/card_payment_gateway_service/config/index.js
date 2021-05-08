require("dotenv").config();

module.exports = {
  DB: process.env.APP_DB,
  PORT: process.env.APP_PORT,
  PAYMENT_SECRET: process.env.PAYMENT_SECRET,
  ORDER_SECRET: process.env.ORDER_SECRET,
  PAYMENT_NOTIFY_URL: process.env.PAYMENT_NOTIFY_URL,
};
