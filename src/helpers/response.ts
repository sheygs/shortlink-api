import { type Response } from 'express';
import logger from './logger';
import { Status } from '../interfaces/types';

export const errorResponse = (
  error: any,
  res: Response,
  code: number
): Response<any, Record<string, any>> => {
  logger.error(error);
  return res.status(code).json({
    code,
    status: Status.FAILURE,
    error: {
      id: (res as any).id,
      name: code >= 500 ? 'INTERNAL_SERVER_ERROR' : error.name,
      publicMessage: 'An error occured - Please try again later.',
      message:
        code >= 500
          ? 'Internal Server Error'
          : code === 413
            ? 'Request body too large'
            : error.type === 'entity.parse.failed'
              ? 'Invalid JSON body'
              : error.message
    },
    data: null
  });
};

export const successResponse = (
  res: Response,
  code: number,
  message: string,
  data: any
): Response<any, Record<string, any>> => {
  logger.info(
    `\nstatusCode: ${code} | status: success | message: ${JSON.stringify(
      message
    )}`
  );
  return res.status(code).json({
    code,
    status: Status.SUCCESS,
    message,
    data
  });
};

export const baseResponse = (
  res: Response,
  code: number,
  message: string,
  data: any
): Response<any, Record<string, any>> => {
  logger.info(
    `\nstatusCode: ${code} | status: success | message: ${JSON.stringify(
      message
    )}`
  );
  return res.status(code).json({
    code,
    status: Status.SUCCESS,
    message,
    data
  });
};
