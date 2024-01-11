// src/plugins/error-handler.ts

import { FastifyInstance, FastifyPluginCallback } from "fastify";

const errorHandlerPlugin: FastifyPluginCallback = (fastify: FastifyInstance, _opts, done) => {
  try {
    // Add error handling and debugging to fix the failing GitHub Actions run
    // Add the necessary code to fix the potential error

    // Code block with potential error
    done();
  } catch (error) {
    console.log(error); // Log the error
  }
};

export default errorHandlerPlugin;
