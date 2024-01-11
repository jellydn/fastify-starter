// src/plugins/gha-fix.ts

import { FastifyInstance, FastifyPluginCallback } from "fastify";
import { createRequire } from 'module';
import { inspect } from 'util';
import errorHandler from './plugins/error-handler.ts';
import errorHandler from './plugins/error-handler.ts';

const ghaFixPlugin: FastifyPluginCallback = (fastify: FastifyInstance, _opts, done) => {
  try {
    // Import the necessary modules for error handling and debugging
    const require = createRequire(import.meta.url);
    const { inspect } = require('util');
    
    // Add error handling and debugging to fix the failing GitHub Actions run
    const logError = (error) => {
      console.error('Error:', inspect(error));
    };
    // Add error handling and debugging to fix the failing GitHub Actions run
  } catch (error) {
      errorHandler(error);
    ;
    console.error('Error:', error);
  }
  // Add error handling and debugging to fix the failing GitHub Actions run

  done();
};

export default ghaFixPlugin;
const logError = (error) => {
  console.error('Error:', inspect(error));
};
