require("dotenv").config();

module.exports = {
    DB: process.env.APP_DB,
    PORT: process.env.APP_PORT,
    PAYMENT_SECRET: process.env.PAYMENT_SECRET,
};