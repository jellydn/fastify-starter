import multipart from '@fastify/multipart'

import type { FastifyMultipartOptions } from '@fastify/multipart'
import fp from 'fastify-plugin'

/**
 * Multipart support for Fastify
 *
 * @link https://github.com/fastify/fastify-multipart
 */
export default fp<FastifyMultipartOptions>(async (fastify, _opts) => {
  await fastify.register(multipart, {
    attachFieldsToBody: true,
  })
})
