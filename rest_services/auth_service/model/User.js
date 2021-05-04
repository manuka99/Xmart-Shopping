const { model, Schema } = require("mongoose");

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number, required: true },
    password: { type: String, required: true },
    role: { type: String, default: "buyer", enum: ["buyer", "seller"] },
}, { timestamps: true });

module.exports = model("user", userSchema);