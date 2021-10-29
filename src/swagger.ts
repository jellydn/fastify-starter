 
 
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

const swaggerSpec = swaggerJsdoc(options);

export { swaggerSpec };
