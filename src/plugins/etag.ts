import fp from "fastify-plugin";

import type { FastifyEtagOptions } from "@fastify/etag";
import etag from "@fastify/etag";

/**
 * This plugins adds rate limiter for your routes.
 *
 * @see https://github.com/fastify/fastify-rate-limit
 */
export default fp<FastifyEtagOptions>(
  async (
    fastify,
    opts = {
      // Generates weak ETags by default
      weak: false,
    }
  ) => {
    void fastify.register(etag, {
      ...opts,
    });
  }
);
