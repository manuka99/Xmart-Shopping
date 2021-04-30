exports.validatePaymentRequest = (details) => {
    var errors = {};
    if (!details) errors.payment = "Invalid payment details";
    else if (!details.card_no) errors.card_no = "Enter card number";
    else if (isNaN(details.card_no)) errors.card_no = "Invalid card number";
    else if (!details.card_cvc) errors.card_cvc = "Enter card CVC";
    else if (isNaN(details.card_cvc)) errors.card_cvc = "Invalid card CVC";
    else if (!details.card_holder_name)
        errors.card_holder_name = "Enter card holder name";
    else if (!details.transfer_amount)
        errors.transfer_amount = "Enter transfer amount";
    else if (isNaN(details.transfer_amount))
        errors.transfer_amount = "Invalid transfer amount";
    return errors;
};