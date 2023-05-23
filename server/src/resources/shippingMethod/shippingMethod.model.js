const { Schema, model, models } = require("mongoose");
const Joi = require("joi");

const ShippingMethodSchema = new Schema({
  company: { type: String, required: true },
  price: { type: Number, required: true },
  deliveryTimeInHours: { type: Number, required: true },
});

const ShippingMethodModel =
  models.shippingMethod || model("shippingMethod", ShippingMethodSchema);

const ShippingMethodValidationSchema = Joi.object({
  company: Joi.string().strict().required(),
  price: Joi.number().strict().required(),
  deliveryTimeInHours: Joi.number().strict().required(),
});

module.exports = {
  ShippingMethodModel,
  ShippingMethodValidationSchema,
  ShippingMethodSchema,
};
