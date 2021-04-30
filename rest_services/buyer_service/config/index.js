require("dotenv").config();

module.exports = {
    DB: process.env.APP_DB,
    PORT: process.env.APP_PORT,
    KEY: process.env.APP_KEY,
    AUTH_GATEWAY: process.env.AUTH_GATEWAY,
    CARD_PAYMENT_GATEWAY: process.env.CARD_PAYMENT_GATEWAY,
    MOBILE_PAYMENT_GATEWAY: process.env.MOBILE_PAYMENT_GATEWAY,
    PAYHERE_PAYMENT_GATEWAY: process.env.PAYHERE_PAYMENT_GATEWAY,
    MAIL_USER: process.env.MAIL_USER,
    MAIL_PASSWORD: process.env.MAIL_PASSWORD,
    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
    TWILIO_NUMBER: process.env.TWILIO_NUMBER,
};