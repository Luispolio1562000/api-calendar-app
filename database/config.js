const mongoose = require("mongoose");
const EnvConfig = require("../enviromentVariables");

const config = EnvConfig();

const urlDb = config.dbConnection;
const clientOptions = {
  serverApi: {
    version: "1",
    strict: true,
    deprecationErrors: true,
    autoIndex: true,
  },
};
console.log(urlDb);

const dbConnection = async () => {
  try {
    await mongoose.connect(urlDb, {});
    //await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Successfully connected to MongoDB!");
  } catch (error) {
    console.log(error);
    throw new Error("Error a la hora de iniciar la base de datos");
  }
};

module.exports = {
  dbConnection,
};
