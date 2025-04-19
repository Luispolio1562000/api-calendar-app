const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "API documentation for the project",
      contact: {
        name: "Luis Gustavo",
        url: "ghub.com/luisgustavo",
      },
      servers: [
        {
          url: "http://localhost:3000/api/v1",
          description: "Development server",
        },
      ],
    },
  },
  basePath: "/api-docs",
  apis: ["./routes/*.js", "./controllers/*.js"],
};

module.exports = swaggerOptions;
