// src/plugins/gha-fix.ts

import { FastifyInstance, FastifyPluginCallback } from "fastify";

const ghaFixPlugin: FastifyPluginCallback = (fastify: FastifyInstance, _opts, done) => {
  // Add the necessary code to fix the failing GitHub Actions run
  // This could include error handling, debugging, or any other necessary steps

  done();
};

export default ghaFixPlugin;
