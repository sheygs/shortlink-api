import os from 'os';
import app from './app';
import logger from './helpers/logger';
import config from './config';

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
