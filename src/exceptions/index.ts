import { HttpStatusCode } from '../interfaces/types';

export class APIError extends Error {
  readonly name: string;
  readonly httpStatusCode: HttpStatusCode;
  readonly isOperational: boolean;

  constructor(
    name: string,
    httpStatusCode: HttpStatusCode,
    isOperational: boolean,
    description: string
  ) {
    super(description);
    Object.setPrototypeOf(this, new.target.prototype);

    this.name = name;
    this.httpStatusCode = httpStatusCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this);
  }
}

export class InternalServerErrorException extends APIError {
  constructor(description = 'Internal Server Error') {
    super(
      'INTERNAL_SERVER_ERROR',
      HttpStatusCode.INTERNAL_SERVER_ERROR,
      true,
      description
    );
  }
}

export class BadRequestException extends APIError {
  constructor(description = 'Bad Request') {
    super('BAD REQUEST', HttpStatusCode.BAD_REQUEST, true, description);
  }
}

export class NotFoundException extends APIError {
  constructor(description = 'Not Found') {
    super('NOT FOUND', HttpStatusCode.NOT_FOUND, true, description);
  }
}

export class UnprocessableEntityException extends APIError {
  constructor(description = 'Unprocessable Entity') {
    super(
      'UNPROCESSABLE ENTITY',
      HttpStatusCode.UNPROCESSABLE_ENTITY,
      true,
      description
    );
  }
}

export class UnauthorizedException extends APIError {
  constructor(description = 'Unauthorized') {
    super('UNAUTHORIZED', HttpStatusCode.UNAUTHORIZED, true, description);
  }
}

export class ForbiddenException extends APIError {
  constructor(description = 'Forbidden') {
    super('FORBIDDEN', HttpStatusCode.FORBIDDEN, true, description);
  }
}

export class ServiceUnavailableException extends APIError {
  constructor(description = 'Service Unavailable') {
    super(
      'SERVICE UNAVAILABLE',
      HttpStatusCode.SERVICE_UNAVAILABLE,
      true,
      description
    );
  }
}

export class RequestTimeoutException extends APIError {
  constructor(description = 'Request Timeout') {
    super('REQUEST TIMEOUT', HttpStatusCode.REQUEST_TIMEOUT, true, description);
  }
}

export class ConflictException extends APIError {
  constructor(description = 'Conflict') {
    super('CONFLICT', HttpStatusCode.CONFLICT, true, description);
  }
}
