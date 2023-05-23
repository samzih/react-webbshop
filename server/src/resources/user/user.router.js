const express = require("express");
const { register, login, logout, authorize } = require("./user.controller");
const { UserCreateValidationSchema } = require("./user.model");
const { validate } = require("../middlewares");

const userRouter = express
  .Router()
  .post("/users/register", validate(UserCreateValidationSchema), register)
  .post("/users/login", login)
  .post("/users/logout", logout)
  .get("/users/authorize", authorize);

module.exports = { userRouter };
