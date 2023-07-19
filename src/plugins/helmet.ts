import fp from "fastify-plugin";

import type { FastifyHelmetOptions } from "@fastify/helmet";
import helmet from "@fastify/helmet";

/**
 * @fastify/helmet enables the use of helmet in a Fastify application.
 *
 * @see https://github.com/fastify/fastify-helmet
 */
export default fp<FastifyHelmetOptions>(async (fastify, opts) => {
  await fastify.register(helmet, {
    ...opts,
  });
});
