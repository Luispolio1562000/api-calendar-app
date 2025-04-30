const { response, request } = require("express");
const bycrypt = require("bcryptjs");
const User = require("../../models/User");
const { generateJWT } = require("../../helpers/jwt");

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

    const token = await generateJWT(user.id, user.name, user.email);

    return res.status(200).json({
      ok: true,
      msg: "Login correcto",
      token,
      name: user.name,
      uid: user.id,
    });
  } catch (error) {
    console.error("Error saving user:", error);
    return res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

const loginUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({
        ok: false,
        msg: "El usuario email no se encuentra registrado.",
      });
    }

    //? Match passwords

    const validPassword = bycrypt.compareSync(password, existingUser.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Password incorrecto",
      });
    }

    //* Generate JWT
    const token = await generateJWT(
      existingUser.id,
      existingUser.name,
      existingUser.email
    );

    return res.status(200).json({
      ok: true,
      msg: "Login correcto",
      token,
      uid: existingUser.id,
      name: existingUser.name,
      email: existingUser.email,
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    return res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

const renewToken = async (req = request, res = response) => {
  console.log(req.body);
  const { uid, name, email } = req.body;

  try {
    //* Generate JWT
    const token = await generateJWT(uid, name, email);

    return res.status(200).json({
      ok: true,
      msg: "Login correcto",
      email,
      name,
      token,
      uid,
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    return res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

module.exports = { registerUser, loginUser, renewToken };
