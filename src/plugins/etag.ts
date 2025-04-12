import etag from '@fastify/etag'

import type { FastifyEtagOptions } from '@fastify/etag'
import fp from 'fastify-plugin'

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
