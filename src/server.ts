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
initGraphql(app);

// Init Swagger
initSwagger(app);

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
app.listen(process.env.PORT ?? 3000, "0.0.0.0", (err: any) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});

export { app };
