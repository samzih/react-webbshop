const { UserModel } = require("../user/user.model");
const bcrypt = require("bcrypt");

async function register(req, res) {
  // Check if the user exists

  const existingUser = await UserModel.findOne({ email: req.body.email });
  if (existingUser) {
    return res.status(409).json("Email already registred");
  }

  const user = new UserModel(req.body);
  user.password = await bcrypt.hash(user.password, 10);
  await user.save();

  const jsonUser = user.toJSON();
  jsonUser._id = user._id;
  delete jsonUser.password;

  res.status(201).send(jsonUser);
}

async function login(req, res) {
  // Check if username and password is correct
  const existingUser = await UserModel.findOne({
    email: req.body.email,
  }).select("+password");

  if (
    !existingUser ||
    !(await bcrypt.compare(req.body.password, existingUser.password))
  ) {
    return res.status(401).json("Wrong password or username");
  }

  const user = existingUser.toJSON();
  user._id = existingUser._id;
  delete user.password;

  // Check if user already is logged in
  if (req.session._id) {
    return res.status(200).json(user);
  }

  // Save info about the user to the session (an encrypted cookie stored on the client)
  req.session = user;
  res.status(200).json(user);
}

/**
 * Logout the user and remove the cookie and session
 */
async function logout(req, res) {
  if (!req.session._id) {
    return res.status(400).json("Cannot logout when you are not logged in");
  }
  req.session = null;
  res.status(204).json(null);
}

async function authorize(req, res) {
  if (!req.session._id) {
    return res.status(401).json("You are not logged in");
  }
  res.status(200).json(req.session);
}

module.exports = { register, login, logout, authorize };
