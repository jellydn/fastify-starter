// src/plugins/gha-fix.ts

import { FastifyInstance, FastifyPluginCallback } from "fastify";
import { createRequire } from 'module';
import { inspect } from 'util';

const ghaFixPlugin: FastifyPluginCallback = (fastify: FastifyInstance, _opts, done) => {
  try {
    // Import the necessary modules for error handling and debugging
    
    const require = createRequire(import.meta.url);
    const { inspect } = require('util');
    
    import fastify from 'fastify';
    import { inspect } from 'util';
    
      
    
    // Add error handling and debugging to fix the failing GitHub Actions run
  } catch (error) {
    console.error('Error:', error);
  }
  // Add error handling and debugging to fix the failing GitHub Actions run

  done();
};

export default ghaFixPlugin;
