const User = require("../model/User");

// validations
const validateUserInfo = async (req, res) => {
  var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  var message = "";
  var user = req.body;

  //  validate request body

  if (!user) message = "Invalid user details";
  else if (!user.name || user.name.length == 0)
    message = "Enter a valid username";
  else if (!user.email || user.email.length == 0)
    message = "Enter a valid email";
  else if (!user.email.match(mailformat)) message = "Email format is invalid";
  else if (!user.phone) message = "Enter user contact number";
  else if (isNaN(user.phone))
    message = "Mobile number contains invalid characters";
  else if (user.phone.toString().length != 9)
    message = "Enter a valid 9 digit mobile number";
  else if (!user.password || user.name.password < 8)
    message = "Password must have at least 8 characters";
  else {
    // validate email
    var isEmailValid = await validateEmail(user.email);
    if (!isEmailValid)
      message = "There is a registered user with the email provided.";
  }
  // handle req errors
  if (message.length > 0)
    return res.status(422).json({
      message,
      success: false,
    });
  else return user;
};

// check if the provided email is saved on db
const validateEmail = async (email) => {
  let user = await User.findOne({ email });
  return user ? false : true;
};

const validateLoginCredentials = (req, res) => {
  var message = "";
  var credentials = req.body;
  // validate req body
  if (!credentials) message = "Invalid login credentials";
  else if (!credentials.email || credentials.email.length == 0)
    message = "Enter a valid user email";
  else if (!credentials.password || credentials.password.length == 0)
    message = "Enter a valid password";
  // handle req errors
  if (message.length > 0)
    return res.status(422).json({
      message,
    });
  else return credentials;
};

module.exports = {
  validateUserInfo,
  validateLoginCredentials,
};
