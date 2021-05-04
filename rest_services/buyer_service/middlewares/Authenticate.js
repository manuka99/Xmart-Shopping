const { getAuthUserFromBearerToken } = require("../util/Auth");

const Authenticate = async (req, res, next) => {
  // get the auth user from token by the auth service
  let user = await getAuthUserFromBearerToken(req.header("authorization"));
  if (user) req.user = user;
  return next();
};

module.exports = Authenticate;
