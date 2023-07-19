import fp from "fastify-plugin";

import type { FastifyCorsOptions } from "@fastify/cors";
import cors from "@fastify/cors";

/**
 * @fastify/cors enables the use of CORS in a Fastify application.
 *
 * @see https://github.com/fastify/fastify-cors
 */
export default fp<FastifyCorsOptions>(async (fastify, opts) => {
  await fastify.register(cors, {
    ...opts,
  });
});
