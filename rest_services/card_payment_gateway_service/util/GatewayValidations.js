exports.validatePaymentRequest = (details) => {
  var errors = {};
  if (!details && !details.order_id) errors.message = "Invalid payment details";
  else if (!details.card_no) errors.message = "Enter card number";
  else if (isNaN(details.card_no)) errors.message = "Invalid card number";
  else if (!details.card_cvc) errors.message = "Enter card CVC";
  else if (isNaN(details.card_cvc)) errors.message = "Invalid card CVC";
  else if (!details.card_holder_name) errors.message = "Enter card holder name";
  else if (!details.transfer_amount) errors.message = "Enter transfer amount";
  else if (isNaN(details.transfer_amount))
    errors.message = "Invalid transfer amount";
  return errors;
};
