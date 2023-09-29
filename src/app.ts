import express, { type Application } from 'express';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import cors from 'cors';
import config from './config';
import { baseRoute } from './routes/base';
import indexRoute from './routes/index';
import generateRequestId from './middlewares/request-id';
import { globalErrorHandler } from './middlewares/error';

export const middlewares = (app: Application) => {
  app.enable('trust proxy');

  app.set('port', config.PORT);

  // built-in middlewares
  app.use(compression());
  app.use(cors());
  app.use(express.json());

  if (config.ENV !== 'test') {
    app.use(morgan('dev'));
  }

  app.use(express.urlencoded({ extended: false }));
  app.use(helmet());
  app.disable('x-powered-by');

  // base route
  app.get('/', baseRoute);

  app.use(generateRequestId());

  app.use(indexRoute);

  // default error middleware
  globalErrorHandler(app);
};
