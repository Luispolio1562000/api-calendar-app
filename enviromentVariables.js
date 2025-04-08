require("dotenv").config();
const variablesEnv = ({ PORT: port = 3000 } = process.env);

const EnvConfig = () => ({
  port,
});

module.exports = EnvConfig;
