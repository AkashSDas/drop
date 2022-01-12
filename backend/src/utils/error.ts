export class BaseApiError extends Error {
  public msg: string;
  public statusCode: number;
  public isOperational: boolean;

  constructor(statusCode: number, msg: string) {
    super(msg);

    this.statusCode = statusCode;
    this.msg = msg;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}
