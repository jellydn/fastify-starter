/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { FastifyInstance } from "fastify";
import fastifySwagger from "fastify-swagger";
import { join } from "path";
import swaggerJsdoc from "swagger-jsdoc";

// Swagger definition
// https://github.com/swagger-api/swagger-spec/blob/master/versions/2.0.md
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Fastify starter",
    version: "0.0.1",
    description: "A sample API",
  },
};

const apiDirectory = join(__dirname, "routes");

const options: swaggerJsdoc.Options = {
  swaggerDefinition,
  // Path to the API docs
  apis: [`${apiDirectory}/**/*.js`, `${apiDirectory}/**/*.ts`],
};

export function initSwagger(app: FastifyInstance) {
   
  const swaggerSpec = swaggerJsdoc(options);

  void app.register(fastifySwagger, {
    mode: "static",
    specification: {
      document: swaggerSpec as any,
    },
    exposeRoute: true,
  });
}
