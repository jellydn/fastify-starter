import { FastifyPluginAsync } from 'fastify';

const loggingPlugin: FastifyPluginAsync = async (fastify) => {
  // Set up logging configuration here

  // Register error handler
  fastify.setErrorHandler((error, request, reply) => {
    fastify.log.error(error);
    reply.send({ error: 'Internal Server Error' });
  });

  // Register request logger
  fastify.addHook('onRequest', (request, reply, done) => {
    fastify.log.info(`Received ${request.method} request to ${request.url}`);
    done();
  });

  // Register response logger
  fastify.addHook('onSend', (request, reply, payload, done) => {
    fastify.log.info(`Sent ${reply.statusCode} response for ${request.method} request to ${request.url}`);
    done(null, payload);
  });
};

export default loggingPlugin;
