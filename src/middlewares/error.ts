import {
  type Request,
  type Response,
  type NextFunction,
  type Application
} from 'express';

import { type APIError } from '../exceptions/index';
import { type HttpStatusCode } from '../interfaces/types';
import { errorHandler } from '../exceptions/error-handler';
import { errorResponse } from '../helpers/response';
import logger from '../helpers/logger';

export const globalErrorHandler = (app: Application) =>
  app.use((error: APIError, _: Request, res: Response, _next: NextFunction) => {
    const isTrusted: boolean = errorHandler.isTrustedError(error);

    logger.info(JSON.stringify({ isTrusted }));

    const statusCode: HttpStatusCode = error.httpStatusCode ?? 400;

    errorResponse(error, res, statusCode);
  });
