export enum Status {
  FAILURE = 'failure',
  SUCCESS = 'success'
}

export enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  UNPROCESSABLE_ENTITY = 422,
  INTERNAL_SERVER_ERROR = 500,
  SERVICE_UNAVAILABLE = 503,
  REQUEST_TIMEOUT = 408,
  CONFLICT = 409
}

interface IBrowser {
  name?: string;
  version?: string;
  major?: string;
}

interface IDevice {
  vendor?: string;
  model?: string;
  type?: string;
}

export interface IUrl {
  id: string;
  longUrl: string;
  shortUrl: string;
  dateCreated: Date;
  clicks?: number;
  browser?: IBrowser;
  device?: IDevice;
}
