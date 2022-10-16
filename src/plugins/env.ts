import type { fastifyEnvOpt } from "@fastify/env";
import env from "@fastify/env";
import fp from "fastify-plugin";

const schema = {
  type: "object",
  required: ["PORT"],
  properties: {
    PORT: {
      type: "string",
      default: 3000,
    },
  },
};

const options = {
  confKey: "config", // Optional, default: 'config'
  schema,
  dotenv: true, // Will read .env in root folder
};

/**
 * @fastify/env Fastify plugin to check environment variables.
 *
 * @see https://github.com/fastify/fastify-env
 */
export default fp<fastifyEnvOpt>(async (fastify) => {
  await fastify.register(env, options);
});
