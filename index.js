const express = require("express");
const EnvConfig = require("./enviromentVariables");
const { dbConnection } = require("./database/config");
const cors = require("cors");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerOptions = require("./swagger");
const config = EnvConfig();
const swaggerDocs = swaggerJsDoc(swaggerOptions);
const path = require("path");

// (async () => {
//   const open = await require("open");

//   // Usar open dentro de esta función asíncrona
//   app.listen(config.port, () => {
//     // Abrir el navegador automáticamente
//     open(`http://localhost:${config.port}/api-docs`);
//   });
// })();

//* Crear servidor de express.
const app = express();
//? BD connections
dbConnection();
app.use(cors());
 app.use((req, res, next) => {
   res.setHeader("Access-Control-Allow-Origin", "*"); // Allow requests from any origin
   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
   next();
 });

//? Directorio publico.
//? Use es un middleware que se ejecuta antes de las rutas.
app.use(express.static("public"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
//? Lectura y parseo del body.
app.use(express.json());
//* Rutas
app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/calendar-events.route"));
//*Escuchar peticiones HTTP.
app.listen(config.port, () => {
  console.log(`Servidor corriendo en el puerto ${config.port}`);
});
