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
    res.id = req.id = generateUUID();
    next();
  };
};

export default generateRequestId;
