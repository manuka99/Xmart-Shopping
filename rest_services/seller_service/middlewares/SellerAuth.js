const SellerAuth = async (req, res, next) => {
  if (req.user && req.user.role == "seller") return next();
  else return res.send(401, "Unauthorized");
};

module.exports = SellerAuth;
