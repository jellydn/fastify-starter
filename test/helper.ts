// This file contains code that we reuse between our tests.
import Fastify from "fastify";
import fp from "fastify-plugin";
import type * as tap from "tap";

import App from "../src/app";
import { initGraphql } from "../src/graphql";

export type Test = typeof tap["Test"]["prototype"];

// Fill in this config with all the configurations
// needed for testing the application
async function config() {
  return {};
}

// Automatically build and tear down our instance
async function build(t: Test) {
  // eslint-disable-next-line new-cap
  const app = Fastify();

  // Fastify-plugin ensures that all decorators
  // are exposed for testing purposes, this is
  // different from the production setup
  void app.register(fp(App), await config());

  // Init graphql
  void initGraphql(app);

  await app.ready();

  // Tear down our app after we are done
  t.teardown(async () => app.close());

  return app;
}

export { config, build };
