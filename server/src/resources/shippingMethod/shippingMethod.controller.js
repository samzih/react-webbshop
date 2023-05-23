const { ShippingMethodModel } = require("./shippingMethod.model");

const addShippingMethod = async (req, res) => {
  const shippingMethod = new ShippingMethodModel(req.body);
  await shippingMethod.save();
  res.status(201).json(shippingMethod);
};

const getAllShippingMethods = async (req, res) => {
  const shippingMethods = await ShippingMethodModel.find();
  res.status(200).json(shippingMethods);
};

module.exports = { addShippingMethod, getAllShippingMethods };
