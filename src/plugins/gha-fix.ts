// src/plugins/gha-fix.ts

import { FastifyInstance, FastifyPluginCallback } from "fastify";

const ghaFixPlugin: FastifyPluginCallback = (fastify: FastifyInstance, _opts, done: (error?: Error) => void) => {
  try {
    try {
      // Relevant files to include src/plugins/gha-fix.ts
import { ghaFixPlugin } from "./src/plugins/gha-fix";
    } catch (error) {
      console.log('Error occurred:', error);
    }
  } catch (error) {
    console.log('Error occurred:', error);
  }
  // Add error handling and debugging to fix the failing GitHub Actions run

  done();
};

export default ghaFixPlugin;
