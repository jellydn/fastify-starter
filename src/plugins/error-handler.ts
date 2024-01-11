// src/plugins/error-handler.ts

import { FastifyInstance, FastifyPluginCallback } from "fastify";

const errorHandlerPlugin: FastifyPluginCallback = (fastify: FastifyInstance, _opts, done) => {
  fastify.setErrorHandler((error, _request, reply) => {
    console.error("Error:", error);
    reply.send(error);
  });

  done();
};

export default errorHandlerPlugin;
