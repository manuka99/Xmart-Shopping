const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { KEY } = require("../config");
const {
  validateUserInfo,
  validateLoginCredentials,
} = require("../util/AuthValidator");

// register user
exports.Register = async (req, res) => {
  try {
    var validatedUserInfo = await validateUserInfo(req, res);

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
    return res.status(400).json({
      message: "User was not registered",
      success: false,
    });
  }
};

// authenticate user
exports.Authenticate = async (req, res) => {
  try {
    let validatedLoginCredentials = validateLoginCredentials(req, res);
    // fetch user with that email
    var user = await User.findOne({
      email: validatedLoginCredentials.email,
    });
    // response error if user was not found
    if (!user) {
      return res.status(400).json({
        message: "Unable match user credentials",
        success: false,
      });
    }

    // match password
    var isMatch = await bcrypt.compare(
      validatedLoginCredentials.password,
      user.password
    );
    // return error if passwods dopes nbot match
    if (!isMatch)
      return res.status(400).json({
        message: "Password does not match",
        success: false,
      });
    else {
      // login user with jwt token
      // jwt - create token
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
    return res.status(400).json({
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
  try {
    // validate token in request
    if (!req.body.token)
      return res.status(422).json({ message: "JWT token is required" });
    // validate JWT token
    var decodedToken = jwt.verify(req.body.token, KEY);
    // fetch user token token user id
    var user = await User.findById(decodedToken.user_id);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ message: "JWT token is not valid" });
  }
};
