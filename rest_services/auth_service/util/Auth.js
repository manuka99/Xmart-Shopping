const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { KEY } = require("../config");
const passport = require("passport");

// register user
const register = async(user, role, res) => {
    try {
        let validatedUserInfo = validateUserInfo(user);
        if (!validatedUserInfo)
            return res.status(400).json({
                message: "Please enter your valid details with a password not less than 9 characters.",
                success: false,
            });
        if (await !validateEmail(validatedUserInfo.email))
            return res.status(400).json({
                message: "There is a registered user with the email provided.",
                success: false,
            });
        // save user
        const hashedPassword = await bcrypt.hash(validatedUserInfo.password, 12);

        const newUser = new User({
            ...validatedUserInfo,
            role,
            password: hashedPassword,
        });

        newUser.save();

        return res.status(201).json({
            message: "User was registered",
            success: true,
        });
    } catch (error) {
        console.error(error);
        return res.status(400).json({
            message: "User was not registered",
            success: false,
        });
    }
};

// authenticate user
const authenticate = async(loginCredentials, res) => {
    try {
        let validatedUserLoginCredentials = validateUserLoginCredentials(
            loginCredentials
        );
        if (!validatedUserLoginCredentials)
            return res.status(400).json({
                message: "Please enter your valid email and password.",
                success: false,
            });
        const user = await User.findOne({
            email: validatedUserLoginCredentials.email,
        });
        if (!user) {
            return res.status(500).json({
                message: "Unable match user credentials",
                success: false,
            });
        }

        // match password
        let isMatch = await bcrypt.compare(
            validatedUserLoginCredentials.password,
            user.password
        );
        if (!isMatch)
            return res.status(500).json({
                message: "Invalid user password",
                success: false,
            });
        else {
            // jwt
            let token = jwt.sign({
                    user_id: user._id,
                    role: user.role,
                    name: user.name,
                },
                KEY, { expiresIn: "2 days" }
            );

            let result = {
                user_id: user._id,
                role: user.role,
                name: user.name,
                token: `Bearer ${token}`,
                expiresIn: 168,
            };

            return res.status(200).json({
                ...result,
                message: "Success user login",
                success: true,
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Failed to authenticate",
            success: false,
        });
    }
};

// passport middleware
const userAuth = passport.authenticate("jwt", { session: false });

// validations

const validateUserInfo = (user) => {
    if (
        user &&
        user.name &&
        user.email &&
        user.phone &&
        user.phone.toString().length === 9 &&
        user.password &&
        user.password.length > 8
    )
        return user;
    else return null;
};

const validateEmail = async(email) => {
    let user = await User.findOne({ email });
    return user ? false : true;
};

const validateUserLoginCredentials = (credentials) => {
    if (credentials && credentials.email && credentials.password)
        return credentials;
    else return null;
};

const validateJWTToken = (token) => {
    try {
        var decoded = jwt.verify(token, KEY);
        return decoded;
    } catch (error) {
        console.error(error);
        return {};
    }
};

module.exports = { register, authenticate, userAuth, validateJWTToken };