import { type Request, type Response } from 'express';
import { baseResponse } from '../helpers/response';
import { NotFoundException } from '../exceptions/index';

export const invalidRoute = (req: Request) => {
  throw new NotFoundException(`Unable to find ${req.originalUrl}`);
};

export const baseRoute = (_: Request, res: Response) =>
  baseResponse(res, 200, 'okay', null);
