const swaggerOptions = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Calendar API Documentation",
      version: "1.0.0",
      description: "API documentation for the Calendar App",
      contact: {
        name: "Luis Gustavo",
        url: "https://github.com/Luispolio1562000",
      },
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
  },
  apis: ["./routes/*.js", "./controllers/*.js"],
};

module.exports = swaggerOptions;
