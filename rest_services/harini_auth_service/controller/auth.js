const crypto = require("crypto");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");

exports.register = async (req, res) => {
  // Register
  const {
    firstname,
    lastname,
    username,
    email,
    telephone,
    password,
    userrole,
  } = req.body; //Register
  try {
    const user = await User.findOne({ email }); // check wheather there is a user with the requested email
    if (!user) {
      const user = await User.create({
        firstname,
        lastname,
        username,
        email,
        telephone,
        password,
        userrole,
      }); //if not, create the user
      sendToken(user, 201, res);
    } else {
      return res
        .status(400)
        .json({
          success: false,
          error: "Email in use. Please provide new email",
        });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.login = async (req, res) => {
  //Login
  const { email, password } = req.body; // check that email and password are provided
  if (!email || !password) {
    return res
      .status(422)
      .json({ success: false, error: "Please provide email and password" }); // bad request
  }

  try {
    const user = await User.findOne({ email }).select("+password"); // check that user is avaliable by email

    if (!user) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid credentials" });
    }

    const isMatch = await user.matchPasswords(password); // check that passwords match

    if (!isMatch) {
      return res
        .status(404)
        .json({ success: false, error: "Invalid credentials" });
    }

    sendToken(user, 200, res);
  } catch (error) {
    res.status(500).json({ success: false, error: error.messeage });
  }
};
exports.forgotPassword = async (req, res) => {
  // Forgot Password
  const { email } = req.body;
  try {
    const user = await User.findOne({ email }); // checks if email exists or not
    if (!user) {
      return res
        .status(404)
        .json({ success: false, error: "Email could not be sent" });
    }
    const resetToken = user.getResetPasswordToken(); // Generate reset token, convert into hash code and store
    await user.save();
    const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`; // message with url
    const message = `
                        <h1> You have requested a password reset </h1>
                        <p> Please go to this link to reset your password </p>
                        <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
                      `;
    try {
      await sendEmail({
        to: user.email,
        subject: "Password reset request",
        text: message,
      });
      res.status(200).json({ success: true, data: "Email sent" });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();
      return res
        .status(500)
        .json({ success: false, error: "Email could not be sent" });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.resetPassword = async (req, res) => {
  //Reset Password
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex"); // compare the token in url and hashed version

  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }, // token expiration
    });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid Reset Token" });
    }
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.status(201).json({
      success: true,
      data: "Password Updated Success",
      token: user.getSignedJwtToken(),
    });
  } catch (error) {
    console.log(err);
  }
};

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();
  res.status(statusCode).json({ success: true, token });
};

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
