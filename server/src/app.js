const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
require("express-async-errors");

const { productRouter } = require("./resources/product/product.router");
const { orderRouter } = require("./resources/order/order.router");
const { userRouter } = require("./resources/user/user.router");
const { categoryRouter } = require("./resources/category/category.router");
const { errorRequestHandler } = require("./error");
const {
  ShippingMethodRouter,
} = require("./resources/shippingMethod/shippingMethod.route");

const app = express();
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(
  cookieSession({
    name: "session",
    keys: ["aVeryS3cr3tK3y"],
    maxAge: 1000 * 60 * 60 * 24, // 24 Hours
    sameSite: "strict",
    httpOnly: true,
    secure: false,
  })
);

// Add routers
app.use("/api", productRouter);
app.use("/api", orderRouter);
app.use("/api", userRouter);
app.use("/api", categoryRouter);
app.use("/api", ShippingMethodRouter);

app.use((req, res) => {
  console.log("!404!");
  res.status(404).json("Missing resource");
});

// Error handler
app.use(errorRequestHandler);

module.exports = { app };
