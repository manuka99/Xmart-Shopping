var md5 = require("md5");
const { default: axios } = require("axios");
const {
  ORDER_SECRET,
  PAYMENT_SECRET,
  PAYMENT_NOTIFY_URL,
} = require("../config");
const Card = require("../models/Card");
const {
  validatePaymentRequest,
  matchCardDetails,
} = require("../util/GatewayValidations");

exports.makePayment = async (req, res) => {
  try {
    // validate request body
    var validatedDetails = validatePaymentRequest(req, res);
    // hash paras and validate if the payment details are valid
    var hash_order_code_valid = md5(
      `${ORDER_SECRET}${req.body.order_id}${req.body.transfer_amount}`
    );
    //check if payment details and hash matches
    if (hash_order_code_valid == req.body.hash_order_code) {
      // get card details
      var card = await Card.findOne({ card_no: req.body.card_no });

      // match credit card details
      var transferInfo = matchCardDetails(card, validatedDetails, res);
      // complete transaction
      card.balance -= transferInfo.transfer_amount;
      var result = await card.save();

      // save failed
      if (result && result.error) return res.status(400).json(result.error);
      //payment complted therefour notify main server payment complted
      notifyServer(transferInfo.order_id, transferInfo.transfer_amount);
      return res.status(200).json({
        payment: "Payment was successfull",
        status: 1,
      });
    }
    // if hashing fails
    return res
      .status(400)
      .json({ message: "Invalid payment details, refresh and try again" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Invalid card number" });
  }
};

const notifyServer = (orderID, transfer_amount) => {
  // hash the payment data to validate at the buyer server(main)
  var hash_pay_code = md5(`${PAYMENT_SECRET}${orderID}${transfer_amount}`);
  axios
    .post(PAYMENT_NOTIFY_URL, {
      order_id: orderID,
      payment_type: "card",
      hash_pay_code,
    })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};
