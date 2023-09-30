import { type Response } from 'express';
import logger from './logger';
import { Status } from '../interfaces/types';
// import config from '../config';

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
      name: error.name,
      publicMessage: 'An error occured - Please try again later.',
      message: error.message
      // only add a `stack` property in non-production environments
      // ...(config.ENV === 'production' ? null : { stack: error.stack })
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
