const express = require("express");
const {
  addShippingMethod,
  getAllShippingMethods,
} = require("./shippingMethod.controller");
const ShippingMethodRouter = express.Router();

ShippingMethodRouter.get("/shippingMethod", getAllShippingMethods);
ShippingMethodRouter.post("/shippingMethod", addShippingMethod);

module.exports = { ShippingMethodRouter };
