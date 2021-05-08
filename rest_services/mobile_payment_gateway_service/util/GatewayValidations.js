exports.validatePaymentRequest = (req, res) => {
  var message = "";
  var details = req.body;

  if (!details) message = "Invalid payment details";
  else if (!details.order_id) message = "Invalid order details";
  else if (!details.hash_order_code) message = "Invalid payment hash";
  else if (this.validateMobileNumber(details.mobile_no).length > 0)
    message = "Enter a valid 9 digit mobile number, without the initial 0";
  else if (!details.pin) message = "Enter pin number";
  else if (isNaN(details.pin))
    message = "Pin number contains invalid characters";
  else if (details.pin.length != 4) message = "Pin number should have 4 digits";
  else if (!details.transfer_amount) message = "Enter transfer amount";
  else if (isNaN(details.transfer_amount)) message = "Invalid transfer amount";

  if (message.length > 0) return res.status(422).json({ message });
  else return details;
};

exports.validateMobileNumber = (number) => {
  if (!number || isNaN(number) || number.length != 9)
    return "Enter a valid 9 digit mobile number, without the initial 0";
  return "";
};
