import { AxiosError } from 'axios';
import { FastifyErrorType } from './serviceTypes';

export const castErrorMessage = (error: AxiosError | FastifyErrorType | any): AxiosError => {
  if (error instanceof AxiosError) {
    return error;
  }

  if (error instanceof FastifyErrorType) {
    const err = error as FastifyErrorType;
    const returnError = new AxiosError(err.message);
    returnError.code = `${err.statusCode}`;
    return returnError;
  } else {
    const err = error as any;
    const message = err?.response?.data?.message || err?.response?.statusText || err.code || err.message;
    const code = err?.response?.status ?? err?.statusCode ?? err?.code;
    const returnError = new AxiosError(message);
    returnError.code = code ? String(code) : undefined;
    return returnError;
  }
};
