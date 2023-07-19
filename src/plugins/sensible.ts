import fp from "fastify-plugin";

import type { SensibleOptions } from "@fastify/sensible";
import sensible from "@fastify/sensible";

/**
 * This plugins adds some utilities to handle http errors
 *
 * @see https://github.com/fastify/fastify-sensible
 */
export default fp<SensibleOptions>(async (fastify, opts) => {
  await fastify.register(sensible, {
    ...opts,
  });
});
