const passport = require("passport");

// passport middleware
exports.UserAuth = passport.authenticate("jwt", { session: false });
