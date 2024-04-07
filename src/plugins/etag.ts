import fp from 'fastify-plugin'

import type { FastifyEtagOptions } from '@fastify/etag'
import etag from '@fastify/etag'

/**
 * This plugins adds etag to your routes.
 *
 * @see https://github.com/fastify/fastify-etag
 */
export default fp<FastifyEtagOptions>(
  async (
    fastify,
    opts = {
      // Generates weak ETags by default
      weak: false,
    },
  ) => {
    await fastify.register(etag, {
      ...opts,
    })
  },
)
