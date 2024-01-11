// src/plugins/error-handler.ts

import { inspect } from 'util';

import { inspect } from 'util'; function errorHandler(error) {
  console.error('Error:', inspect(error));
};

export default logError;
