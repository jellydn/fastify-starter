// src/plugins/error-handler.ts

import { FastifyInstance, FastifyPluginCallback } from "fastify";
import { createRequire } from 'module';
import { inspect } from 'util';

const errorHandlerPlugin: FastifyPluginCallback = (fastify: FastifyInstance, _opts, done) => {
  try {
    // Add error handling and debugging code here
    
  } catch (error) {
    console.error('Error occurred:', inspect(error));
  }

  done();
};

export default errorHandlerPlugin;
