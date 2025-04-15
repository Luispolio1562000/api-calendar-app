const express = require("express");
const EnvConfig = require("./enviromentVariables");
const { dbConnection } = require("./database/config");
const cors = require("cors");

const config = EnvConfig();

//* Crear servidor de express.
const app = express();
//? BD connections
dbConnection();
app.use(cors());

//? Directorio publico.
//? Use es un middleware que se ejecuta antes de las rutas.
app.use(express.static("public"));

//? Lectura y parseo del body.
app.use(express.json());
//* Rutas
app.use("/api/auth", require("./routes/auth"));

//*Escuchar peticiones HTTP.
app.listen(config.port, () => {
  console.log(`Servidor corriendo en el puerto ${config.port}`);
});
