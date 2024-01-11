// src/plugins/gha-fix.ts

import { FastifyInstance, FastifyPluginCallback } from "fastify";

const ghaFixPlugin: FastifyPluginCallback = (fastify: FastifyInstance, _opts, done) => {
  // Add error handling and debugging to fix the failing GitHub Actions run

  done();
};

export default ghaFixPlugin;
