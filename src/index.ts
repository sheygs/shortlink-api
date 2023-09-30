import 'module-alias/register';

import os from 'os';
import express, { type Express } from 'express';
import { middlewares } from './app';
import logger from './helpers/logger';
import config from './config';

const app: Express = express();

middlewares(app);

const port: string | number = app.get('port');

const env: string = config.ENV;

/***
 * start server
 */

const server = app.listen(port, () => {
  logger.info(`
      ${env}: server ⚡️ is listening on http://${os.hostname()}:${port}
      press ctrl-C to stop`);
});

export default server;
