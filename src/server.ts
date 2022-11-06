// Require library to exit fastify process, gracefully (if possible)
import closeWithGrace from "close-with-grace";
import * as dotenv from "dotenv";
// Require the framework
import Fastify from "fastify";

import { initGraphql } from "./graphql";
import { initSwagger } from "./swagger";

// Read the .env file.
dotenv.config();

const isProduction = process.env.NODE_ENV === "production";
// Instantiate Fastify with some config
const app = Fastify({
  logger: !isProduction,
});

// Register your application as a normal plugin.
void app.register(import("./app"));

// Init graphql
void initGraphql(app);

// Init Swagger
void initSwagger(app);

// Delay is the number of milliseconds for the graceful close to finish
const closeListeners = closeWithGrace({ delay: 500 }, async (opts: any) => {
  if (opts.err) {
    app.log.error(opts.err);
  }

  await app.close();
});

app.addHook("onClose", async (_instance, done) => {
  closeListeners.uninstall();
  done();
});

// Start listening.
void app.listen({
  port: Number(process.env.PORT ?? 3000),
  host: process.env.SERVER_HOSTNAME ?? "127.0.0.1",
});

app.ready((err: Error) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }

  app.log.info(`Server listening on port ${Number(process.env.PORT ?? 3000)}`);
});

export { app };
