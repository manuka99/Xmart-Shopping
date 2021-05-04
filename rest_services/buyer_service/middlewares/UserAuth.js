const { getAuthUserFromBearerToken } = require("../util/Auth");

const userAuth = async (req, res, next) => {
  if (req.user && req.user._id.length > 0) return next();
  else return res.send(401, "Unauthorized");
};

module.exports = userAuth;
