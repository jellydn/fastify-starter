// Require library to exit fastify process, gracefully (if possible)
import closeWithGrace from 'close-with-grace'
import * as dotenv from 'dotenv'
// Require the framework
import Fastify from 'fastify'

import { initGraphql } from './graphql'
import { initSwagger } from './swagger'

import app from './app'

// Read the .env file.
dotenv.config()

const isProduction = process.env.NODE_ENV === 'production'
// Instantiate Fastify with some config
const server = Fastify({
  logger: !isProduction,
})

// Register your application as a normal plugin.
void server.register(app)

// Init graphql
void initGraphql(server)

// Init Swagger
void initSwagger(server)

// Delay is the number of milliseconds for the graceful close to finish
const closeListeners = closeWithGrace({ delay: 500 }, async (opts: any) => {
  if (opts.err) {
    server.log.error(opts.err)
  }

  await server.close()
})

server.addHook('onClose', (_instance, done) => {
  closeListeners.uninstall()
  done()
})

// Start listening.
void server.listen({
  port: Number(process.env.PORT ?? 3000),
  host: process.env.SERVER_HOSTNAME ?? '127.0.0.1',
})

void server.ready((err) => {
  if (err) {
    server.log.error(err)
    process.exit(1)
  }

  server.log.info(
    'All routes loaded! Check your console for the route details.',
  )

  console.log(server.printRoutes())

  server.log.info(
    `Server listening on port ${Number(process.env.PORT ?? 3000)}`,
  )
})

export { server as app }
