const { response, request } = require("express");
const jwt = require("jsonwebtoken");
const EnvConfig = require("../enviromentVariables");

const config = EnvConfig();
const secretKey = config.secretKey;

const validateJWT = (req = request, res = response, next) => {
  console.log("Validating JWT", req.headers);

  // Get token from x-token header or Authorization header
  const token =
    req.header("x-token") ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "No hay token en la peticion",
    });
  }

  try {
    const payload = jwt.verify(token, secretKey);
    req.body = {
      ...req.body,
      uid: payload.uid,
      name: payload.name,
      email: payload.email,
    };
    req.uid = payload.uid;
    req.name = payload.name;
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      ok: false,
      msg: "Token no valido",
    });
  }

  next();
};

module.exports = { validateJWT };
