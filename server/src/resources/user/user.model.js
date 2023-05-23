const { Schema, model, models } = require("mongoose");
const Joi = require("joi");

const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true, select: false },
  isAdmin: { type: Boolean, required: true, default: false },
});

const UserModel = models.user || model("user", UserSchema);

const UserCreateValidationSchema = Joi.object({
  firstName: Joi.string().strict().required(),
  lastName: Joi.string().strict().required(),
  email: Joi.string().email().strict().required(),
  password: Joi.string().strict().required(),
  isAdmin: Joi.boolean().strict(),
});

module.exports = { UserModel, UserCreateValidationSchema };
