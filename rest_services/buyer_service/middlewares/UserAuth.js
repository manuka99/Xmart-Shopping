const { getAuthUserFromBearerToken } = require("../util/Auth");

const userAuth = async(req, res, next) => {
    let user = await getAuthUserFromBearerToken(req.header("authorization"));
    if (user) {
        req.user = user;
        return next();
    } else return res.send(401, "Unauthorized");
};

module.exports = userAuth;