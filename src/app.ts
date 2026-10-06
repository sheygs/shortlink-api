import express, { type Application } from 'express';
import swaggerUi from 'swagger-ui-express';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import cors from 'cors';
import config from './config';
import { baseRoute } from './routes/base';
import indexRoute from './routes/index';
import { limiter } from './helpers/rate-limit';
import generateRequestId from './middlewares/request-id';
import { globalErrorHandler } from './middlewares/error';

import swaggerDocument from './swagger.json';

export const middlewares = (app: Application) => {
  app.set('trust proxy', false);
  app.set('query parser', 'simple');

  app.set('port', config.PORT);

  // built-in middlewares

  if (config.ENV === 'production') {
    app.use(compression());
  }

  app.use(helmet());
  app.use(cors());
  app.use(generateRequestId());
  if (config.ENV !== 'test') app.use('/api', limiter);
  app.use(express.json({ limit: '16kb' }));
  app.use(
    express.urlencoded({ extended: false, limit: '16kb', parameterLimit: 10 })
  );

  app.disable('x-powered-by');

  // base route
  app.get('/', baseRoute);

  if (config.ENV !== 'test') {
    app.use(morgan('dev'));
  }

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  app.use(indexRoute);

  // default error middleware
  globalErrorHandler(app);
};

const app = express();
middlewares(app);

export default app;
