const { response } = require("express");
const { validationResult } = require("express-validator");
const registerUser = (req, res = response) => {
  console.log(req.body);
  const { name, email, password } = req.body;

  if (name.trim().length < 5) {
    return res.status(400).json({
      ok: false,
      msg: "El nombre debe de ser de minimo 5 letras",
    });
  }

  res.status(201).json({
    ok: true,
    msg: "post register",
    name,
    email,
    password,
  });
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
