import { APIError } from './index';

class ErrorHandler {
  public isTrustedError(error: Error) {
    if (error instanceof APIError) {
      return error.isOperational;
    }
    return false;
  }
}

export const errorHandler = new ErrorHandler();
