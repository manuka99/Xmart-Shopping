const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { KEY } = require("../config");
const {
  validateUserInfo,
  validateUserLoginCredentials,
  validateEmail,
  validateJWTToken,
} = require("../util/Auth");

// register user
exports.Register = async (req, res) => {
  try {
    let validatedUserInfo = await validateUserInfo(req.body);
    if (!validatedUserInfo)
      return res.status(422).json({
        message:
          "Please enter your valid details with a password not less than 9 characters. and mobile must only have 9 characters",
        success: false,
      });

    var validEmail = await validateEmail(validatedUserInfo.email);

    if (!validEmail)
      return res.status(422).json({
        message: "There is a registered user with the email provided.",
        success: false,
      });

    // save user
    const hashedPassword = await bcrypt.hash(validatedUserInfo.password, 12);

    const newUser = new User({
      ...validatedUserInfo,
      role: "user",
      password: hashedPassword,
    });

    var result = await newUser.save();

    return res.status(201).json({
      message: "User was registered",
      success: true,
      user: result._doc,
    });
  } catch (error) {
    console.error(error);
    return res.status(422).json({
      message: "User was not registered",
      success: false,
    });
  }
};

// authenticate user
exports.Authenticate = async (req, res) => {
  try {
    let validatedUserLoginCredentials = validateUserLoginCredentials(req.body);
    if (!validatedUserLoginCredentials)
      return res.status(422).json({
        message: "Please enter your valid email and password.",
        success: false,
      });
    const user = await User.findOne({
      email: validatedUserLoginCredentials.email,
    });
    if (!user) {
      return res.status(422).json({
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
      let token = jwt.sign(
        {
          user_id: user._id,
          role: user.role,
          name: user.name,
        },
        KEY,
        { expiresIn: "2 days" }
      );

      let result = {
        user_id: user._id,
        role: user.role,
        name: user.name,
        token,
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

exports.Logout = async (req, res) => {
  req.logOut();
  return res.status(200).json({ message: "You have successfully logout" });
};

exports.Profile = async (req, res) => res.send(req.user);

exports.ValidateToken = async (req, res) => {
  var decodedToken = validateJWTToken(req.body.token);
  var user = await User.findById(decodedToken.user_id);
  return res.json(user);
};
