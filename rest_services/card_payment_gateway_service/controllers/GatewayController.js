var md5 = require("md5");
const { default: axios } = require("axios");
const { PAYMENT_SECRET } = require("../config");
const Card = require("../models/Card");
const { validatePaymentRequest } = require("../util/GatewayValidations");

exports.makePayment = async (req, res) => {
  try {
    var errors = validatePaymentRequest(req.body);
    if (Object.keys(errors) == 0) {
      var card = await Card.findOne({ card_no: req.body.card_no });
      // console.log(card);
      if (!card) throw new Error("invalid card number");

      if (card.card_cvc != req.body.card_cvc)
        return res.status(422).json({
          errors: { message: "Card CVC number did not match" },
        });
      else if (card.card_holder_name != req.body.card_holder_name)
        return res.status(422).json({
          errors: {
            message: "Card holder name did not match",
          },
        });
      else if (card.balance < req.body.transfer_amount)
        return res.status(422).json({
          errors: { message: "Card balance is not suffient" },
        });
      else {
        // complete transaction
        card.balance -= req.body.transfer_amount;
        await card.save();
        // notify main server payment complted
        notifyServer(req.body.order_id, req.body.transfer_amount);
        return res.status(200).json({
          payment: "Payment was successfull",
          status: 1,
        });
      }
    } else return res.status(422).json({ errors: errors });
  } catch (error) {
    console.log(error);
    return res.status(422).json({ errors: { message: "Invalid card number" } });
  }
};

const notifyServer = (orderID, transfer_amount) => {
  // hash the payment data to validate at the buyer server
  var hash_pay_code = md5(`${PAYMENT_SECRET}${orderID}${transfer_amount}`);
  console.log(hash_pay_code);
  axios
    .post("http://localhost:5001/api/payment/notify", {
      order_id: orderID,
      payment_type: "card",
      hash_pay_code,
    })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};
