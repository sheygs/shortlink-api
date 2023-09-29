import express, { type Express } from 'express';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import cors from 'cors';
import config from './config/config';
import { baseRoute } from './routes/base';
import indexRoute from './routes/index';
import { globalErrorHandler } from './middlewares/error';

export const appMiddlewares = (app: Express) => {
  // built-in middlewares
  app.use(compression());
  app.use(cors());
  app.use(express.json());

  if (config.environment === 'development') {
    app.use(morgan('dev'));
  }

  app.use(express.urlencoded({ extended: true, limit: '1mb' }));
  app.use(helmet());

  // base route
  app.get('/', baseRoute);

  app.use(indexRoute);

  // default error middleware
  globalErrorHandler(app);
};
