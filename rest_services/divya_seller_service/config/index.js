require("dotenv").config();

module.exports = {
  DB: process.env.APP_DB,
  PORT: process.env.APP_PORT,
  AUTH_GATEWAY: process.env.AUTH_GATEWAY,
};
