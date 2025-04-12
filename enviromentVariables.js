require("dotenv").config();
const variablesEnv = ({ PORT: port = 3000, DB_CNN: dbConnection = DB_CNN } =
  process.env);

const EnvConfig = () => ({
  port,
  dbConnection,
});

module.exports = EnvConfig;
