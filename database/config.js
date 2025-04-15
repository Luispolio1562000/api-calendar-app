const mongoose = require("mongoose");
const EnvConfig = require("../enviromentVariables");

const config = EnvConfig();

const urlDb = config.dbConnection;
const dbName = config.dbName;
const mongoAuth = {
  username: config.mongoUser,
  password: config.mongoPassword,
};
const clientOptions = {
  serverApi: {
    version: "1",
    strict: true,
    deprecationErrors: true,
    autoIndex: true,
  },
};

const dbConnection = async () => {
  try {
    await mongoose.connect(urlDb, {
      autoIndex: true,
      dbName: dbName,
    });
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
