const { response, request } = require("express");
const jwt = require("jsonwebtoken");
const EnvConfig = require("../enviromentVariables");

const config = EnvConfig();
const secretKey = config.secretKey;

const validateJWT = (req = request, res = response, next) => {
  // console.log(req.headers);
  const token = req.header("x-token");
  //  console.log(token);

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "No hay token en la peticion",
    });
  }

  try {
    const payload = jwt.verify(token, secretKey);
    //console.log(payload);
    req.body = {
      ...req.body,
      uid: payload.uid,
      name: payload.name,
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
