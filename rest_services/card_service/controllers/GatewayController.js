const Card = require("../models/Card");
const { validatePaymentRequest } = require("../util/GatewayValidations");

exports.makePayment = async(req, res) => {
    try {
        var errors = validatePaymentRequest(req.body);
        if (Object.keys(errors) == 0) {
            var card = await Card.findOne({ card_no: req.body.card_no });
            // console.log(card);
            if (Object.keys(card) == 0) throw new Error("invalid card number");

            if (card.card_cvc != req.body.card_cvc)
                return res.status(200).json({
                    errors: { card_cvc: "Card CVC number did not match" },
                });
            else if (card.card_holder_name != req.body.card_holder_name)
                return res.status(200).json({
                    errors: {
                        card_holder_name: "Card holder name did not match",
                    },
                });
            else if (card.balance < req.body.transfer_amount)
                return res.status(200).json({
                    errors: { transfer_amount: "Card balance is not suffient" },
                });
            else {
                // complete transaction
                card.balance -= req.body.transfer_amount;
                card.save();
                return res.status(200).json({
                    payment: "Payment was successfull",
                    status: "1",
                });
            }
        } else return res.status(200).json({ errors: errors });
    } catch (error) {
        console.log(error);
        return res.status(200).json({ errors: { card_no: "Invalid card number" } });
    }
};