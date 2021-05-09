const util = require("util");
var request = require("request");
const { AUTH_GATEWAY } = require("../config");

// contact auth service through esb to validate the jwt token and get the user
const getAuthUserFromBearerToken = async (bearer_token) => {
  var token = String(bearer_token).slice(7);
  const options = {
    url: AUTH_GATEWAY,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    maxRedirects: 20,
    body: JSON.stringify({
      token: `${token}`,
    }),
  };

  const requestPromise = util.promisify(request);
  try {
    const response = await requestPromise(options);
    // console.log(response.body);
    let jsonBody = response.body ? JSON.parse(response.body) : {};
    if (response.statusCode == 200 && jsonBody._id) return jsonBody;
    else return null;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { getAuthUserFromBearerToken };
