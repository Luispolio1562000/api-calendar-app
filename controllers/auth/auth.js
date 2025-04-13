const { response } = require("express");
const bycrypt = require("bcryptjs");
const User = require("../../models/User");

const registerUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const user = new User(req.body);
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        ok: false,
        msg: "Email already exists",
      });
    }

    // Encrypt the password
    const salt = bycrypt.genSaltSync();
    user.password = bycrypt.hashSync(password, salt);

    // Save the new user to the database
    await user.save();

    res.status(201).json({
      ok: true,
      msg: "Usuario creado correctamente",
      uid: user.id,
      name: user.name,
    });
  } catch (error) {
    console.error("Error saving user:", error);
    return res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

const loginUser = (req, res = response) => {
  const { email, password } = req.body;

  res.json({
    ok: true,
    msg: "post login",
    email,
    password,
  });
};

const renewToken = (req, res = response) => {
  res.json({
    ok: true,
    msg: "get renew",
  });
};

module.exports = { registerUser, loginUser, renewToken };
