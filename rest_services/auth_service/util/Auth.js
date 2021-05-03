const User = require("../model/User");

// validations
const validateUserInfo = async (user) => {
  var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (
    user &&
    user.name &&
    user.email &&
    user.email.match(mailformat) &&
    user.phone &&
    user.phone.toString().length === 9 &&
    user.password &&
    user.password.length > 8
  ) {
    // var emailValid = await validateEmail(user.email);
    // return emailValid ? user : null;
    return user;
  } else return null;
};

const validateEmail = async (email) => {
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

module.exports = {
  validateUserInfo,
  validateEmail,
  validateUserLoginCredentials,
  validateJWTToken,
};
