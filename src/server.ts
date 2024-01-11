// Require library to exit fastify process, gracefully (if possible)
import closeWithGrace from "close-with-grace";
import * as dotenv from "dotenv";
// Require the framework
import Fastify from "fastify";

import { initGraphql } from "./graphql";
import { initSwagger } from "./swagger";

import { server as app } from "./src/server";
import app from "./app";

// Read the .env file.
dotenv.config({ path: '.env' });

// Add error handling code to the server shutdown process
server.setErrorHandler((error, _request, reply) => {
  server.log.error(error);
  reply.send({ error: 'Internal Server Error' });
});
server.setErrorHandler((error, _request, reply) => {
  server.log.error(error);
  reply.send({ error: 'Internal Server Error' });
});

const isProduction = process.env.NODE_ENV === "production";
// Instantiate Fastify with some config
const server = Fastify({
  logger: !isProduction,
});

import ghaFixPlugin from "./plugins/gha-fix";

// Register your application as a normal plugin.
void server.register(app);

// Init graphql
void initGraphql(server);

// Init Swagger
void initSwagger(server);

// Delay is the number of milliseconds for the graceful close to finish
const closeListeners = closeWithGrace({ delay: 500 }, async (opts: any) => {
  if (opts.err) {
    server.log.error(opts.err);
  console.log('Error occurred during graceful close:', opts.err);
  }

  await server.close();
});

// Handle potential errors during server listen
server.listen(Number(process.env.PORT ?? 3000), process.env.SERVER_HOSTNAME ?? '127.0.0.1', (err) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }

  server.log.info('Server listening on port ' + Number(process.env.PORT ?? 3000));
});

server.addHook("onClose", (_instance, done) => {
  closeListeners.uninstall();
  done();
});

// Start listening.
void server.listen({
  port: Number(process.env.PORT ?? 3000),
  host: process.env.SERVER_HOSTNAME ?? "127.0.0.1",
});

void server.ready((err: Error | undefined) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }

  server.log.info(
    'Routes are being loaded.',
  );

  console.log(server.printRoutes());

  server.log.info(
    `Server listening on port ${Number(process.env.PORT ?? 3000)}`,
  );
});

export { server as app };
