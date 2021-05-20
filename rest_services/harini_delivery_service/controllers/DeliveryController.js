const Delivery = require("../models/Delivery");

exports.newDelivery = async (req, res) => {
  const newDelivery = new Delivery(req.body);
  try {
    const delivery = await newDelivery.save();
    if (!delivery) throw Error("Something went wrong");
    res.status(200).json(delivery);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};

exports.updateDelivery = async (req, res) => {
  try {
    const delivery = await Delivery.findByIdAndUpdate(req.params.id, req.body);
    if (!delivery) throw Error("Error when updating");

    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};

exports.deleteDelivery = async (req, res) => {
  try {
    const delivery = await Delivery.findByIdAndDelete(req.params.id);
    if (!delivery) throw Error("No Delivery found");

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

exports.findDelivery = async (req, res) => {
  try {
    const delivery = await Delivery.findById(req.params.id);
    if (!delivery) throw Error("No such item");
    res.status(200).json(delivery);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

exports.listAllDelivery = async (req, res) => {
  try {
    const delivery = await Delivery.find();
    if (!delivery) throw Error("No items");
    res.status(200).json(delivery);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
