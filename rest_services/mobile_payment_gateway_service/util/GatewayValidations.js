exports.validatePaymentRequest = (details) => {
  var errors = {};
  if (!details) errors.message = "Invalid payment details";
  else if (Object.keys(this.validateMobileNumber(details.mobile_no)) != 0)
    errors.message =
      "Enter a valid 9 digit mobile number, without the initial 0";
  else if (!details.pin) errors.message = "Enter pin number";
  else if (isNaN(details.pin)) errors.message = "Invalid pin number";
  else if (details.pin.length != 4)
    errors.message = "Pin number should have 4 digits";
  else if (!details.transfer_amount) errors.message = "Enter transfer amount";
  else if (isNaN(details.transfer_amount))
    errors.message = "Invalid transfer amount";
  return errors;
};

exports.validateMobileNumber = (number) => {
  var errors = {};
  if (!number || isNaN(number) || number.length != 9)
    errors.message =
      "Enter a valid 9 digit mobile number, without the initial 0";
  return errors;
};
