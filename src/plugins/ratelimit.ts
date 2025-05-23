import rateLimit from '@fastify/rate-limit'

import type { RateLimitOptions } from '@fastify/rate-limit'
import fp from 'fastify-plugin'

/**
 * This plugins adds rate limiter for your routes.
 *
 * @see https://github.com/fastify/fastify-rate-limit
 */
export default fp<RateLimitOptions>(
  async (
    fastify,
    opts = {
      max: 100,
      timeWindow: '1 minute',
    },
  ) => {
    await fastify.register(rateLimit, {
      ...opts,
    })
  },
)
