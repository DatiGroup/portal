export class FastifyErrorType {
  message: string;
  error: string;
  statusCode?: number;

  constructor({ message, error, statusCode }: { message: string; error: string; statusCode?: number }) {
    this.message = message;
    this.error = error;
    this.statusCode = statusCode;
  }
}
