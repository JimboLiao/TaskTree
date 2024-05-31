import { Express } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import responses from "./swaggerResponse";
import requestBodies from "./swaggerRequestBody";

const initSwagger = (app: Express) => {
  const options: swaggerJsdoc.Options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "TaskTree Swagger API",
        version: "1.0.0",
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
        responses,
        requestBodies,
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
    apis: ["./routes/*.ts"],
  };
  const specs = swaggerJsdoc(options);
  app.use("/api/doc", swaggerUi.serve, swaggerUi.setup(specs));
};

export default initSwagger;
