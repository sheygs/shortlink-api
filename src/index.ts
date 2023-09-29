import os from 'os';
import express, { type Express } from 'express';
import { appMiddlewares } from './app';
import config from './config/config';
import logger from './helpers/logger';

const app: Express = express();

const PORT: string | number = config.port;

appMiddlewares(app);

app.listen(PORT, () => {
  logger.info(`Server ⚡️ is running on http://${os.hostname()}:${PORT}`);
});
