require("dotenv").config();

module.exports = {
    KEY: process.env.APP_KEY,
    DB: process.env.APP_DB,
    PORT: process.env.APP_PORT,
};