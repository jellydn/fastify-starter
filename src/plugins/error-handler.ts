// src/plugins/error-handler.ts

import { inspect } from 'util';

const logError = (error) => {
  console.error('Error:', inspect(error));
};

export default logError;
