import { generateUUID } from '../helpers/utils';
import { type Request, type Response, type NextFunction } from 'express';

declare global {
  namespace Express {
    interface Request {
      id?: string;
    }

    interface Response {
      id?: string;
    }
  }
}

const generateRequestId = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    req.id = generateUUID();
    res.id = req.id;
    next();
  };
};

export default generateRequestId;
