import fastifySwagger from "@fastify/swagger";
import { FastifyInstance } from "fastify";
import { writeFileSync } from "fs";
import { join } from "path";
import swaggerJsdoc, { SwaggerDefinition } from "swagger-jsdoc";

// Swagger definition
// https://github.com/swagger-api/swagger-spec/blob/master/versions/2.0.md
const swaggerDefinition: SwaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Fastify starter",
    version: "0.0.1",
    description: "A sample API",
  },
  host: `0.0.0.0:${process.env.PORT ?? 3000}`,
};

const apiDirectory = join(__dirname, "routes");

const options: swaggerJsdoc.Options = {
  swaggerDefinition,
  // Path to the API docs
  apis: [`${apiDirectory}/**/*.js`, `${apiDirectory}/**/*.ts`],
};

export function initSwagger(app: FastifyInstance) {
  const swaggerSpec = swaggerJsdoc(options);

  // Write to generated swagger file on development
  if (process.env.NODE_ENV !== "production") {
    writeFileSync(
      join(__dirname, "generated", "swagger.json"),
      JSON.stringify(swaggerSpec, null, 2)
    );
  }

  void app.register(fastifySwagger, {
    mode: "static",
    specification: {
      path: join(__dirname, "generated", "swagger.json"),
      postProcessor(swaggerObject) {
        return swaggerObject;
      },
      baseDir: join(__dirname, "generated"),
    },
    exposeRoute: true,
  });
}
