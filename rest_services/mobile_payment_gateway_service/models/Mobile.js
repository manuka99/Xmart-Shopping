const { model, Schema } = require("mongoose");

const mobileSchema = new Schema({
    mobile_no: { type: Number, required: true },
    pin: { type: Number, required: true },
    balance: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = model("mobile", mobileSchema);