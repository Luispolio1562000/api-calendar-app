require("dotenv").config();

const EnvConfig = () => {
  const {
    PORT = 3000,
    DB_CNN = "",
    DB_NAME = "calendar_app",
    MONGO_USER = "",
    MONGO_PASSWORD = "",
    SECRET_KEY = "",
    ENVIROMENT = "development",
  } = process.env;

  return {
    port: PORT,
    dbConnection: DB_CNN,
    dbName: DB_NAME,
    mongoUser: MONGO_USER,
    mongoPassword: MONGO_PASSWORD,
    secretKey: SECRET_KEY,
    enviroment: ENVIROMENT,
  };
};

module.exports = EnvConfig;
