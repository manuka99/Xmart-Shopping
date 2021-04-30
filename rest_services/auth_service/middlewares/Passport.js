const { Strategy, ExtractJwt } = require("passport-jwt");
const { KEY } = require("../config");
const User = require("../model/User");

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: KEY,
};

module.exports = (passport) => {
    passport.use(
        new Strategy(opts, async(payload, done) => {
            await User.findById(payload.user_id)
                .then((user) => (user ? done(null, user) : done(null, false)))
                .catch((error) => done(null, false));
        })
    );
};