const jwt = require("jsonwebtoken");
const EnvConfig = require("../enviromentVariables");

const config = EnvConfig();
const secretKey = config.secretKey;
const generateJWT = (uid, name) => {
  return new Promise((resolve, reject) => {
    const payload = { uid, name };

    jwt.sign(
      payload,
      secretKey,
      {
        expiresIn: "2h",
      },
      (err, token) => {
        if (err) {
          console.log("Error generating JWT", err);
          reject("No se pudo generar el JWT");
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = { generateJWT };
