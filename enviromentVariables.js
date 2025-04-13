require("dotenv").config();
const variablesEnv = ({
  PORT: port = 3000,
  DB_CNN: dbConnection = DB_CNN,
  DB_NAME: dbName = calendar_app,
  MONGO_USER: mongoUser,
  MONGO_PASSWORD: mongoPassword,
} = process.env);

const EnvConfig = () => ({
  port,
  dbConnection,
  dbName,
  mongoUser,
  mongoPassword,
});

module.exports = EnvConfig;
