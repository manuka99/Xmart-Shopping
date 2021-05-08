// validate payment request boduy
exports.validatePaymentRequest = (req, res) => {
  var message = "";
  var details = req.body;

  if (!details && !details.order_id) message = "Invalid payment details";
  else if (!details.hash_order_code) message = "Invalid payment hash";
  else if (!details.card_no) message = "Enter card number";
  else if (isNaN(details.card_no)) message = "Invalid card number";
  else if (!details.card_cvc) message = "Enter card CVC";
  else if (isNaN(details.card_cvc)) message = "Invalid card CVC";
  else if (!details.card_holder_name) message = "Enter card holder name";
  else if (!details.transfer_amount) message = "Enter transfer amount";
  else if (isNaN(details.transfer_amount)) message = "Invalid transfer amount";

  if (message.length > 0) return res.status(422).json({ message });
  else return details;
};

// validate credit card deatils with provided details
exports.matchCardDetails = (card, req_details, res) => {
  var err_message = "";
  if (!card)
    err_message =
      "There is no credit card associated with the card no provided";
  else if (card.card_cvc != req_details.card_cvc)
    err_message = "Card CVC number did not match";
  else if (card.card_holder_name != req_details.card_holder_name)
    err_message = "Card holder name did not match";
  else if (card.balance < req_details.transfer_amount)
    err_message = "Card balance is not suffient";

  if (err_message.length > 0)
    return res.status(422).json({ message: err_message });
  else return req_details;
};
