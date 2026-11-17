import { FastifyErrorType } from 'apiServices/serviceTypes';
import { t } from 'i18next';

export function getErrorMessage(error: unknown, fallback = 'An unexpected error occurred'): string {
  if (!error) {
    return t('alerts.genericError');
  }

  // Handle network errors
  if (error && typeof error === 'object' && 'code' in error) {
    const errorWithCode = error as any;
    if (errorWithCode.code === 'ERR_NETWORK') {
      return t('alerts.networkError');
    }
  }

  if (error && typeof error === 'object' && 'response' in error) {
    const axiosError = error as any;
    const data = axiosError.response?.data as FastifyErrorType | undefined;

    if (data?.message) {
      return data.message;
    }

    // Handle different status codes

    if (axiosError.response?.status === 403) {
      return t('alerts.forbiddedn');
    }
    if (axiosError.response?.status === 404) {
      return t('alerts.notFound');
    }
    if (axiosError.response?.status === 429) {
      return t('alerts.tooManyRequests');
    }
    if (axiosError.response?.status >= 500) {
      return t('alerts.genericError');
    }
  }

  // Fetch error response
  if (error && typeof error === 'object' && 'json' in error) {
    const fetchError = error as any;
    if (fetchError.message) {
      return fetchError.message;
    }
  }

  // Standard Error object
  if (error instanceof Error) {
    // Check for specific error messages
    if (error.message === 'NETWORK_ERROR') {
      return t('alerts.networkError');
    }
    return error.message;
  }

  // String error
  if (typeof error === 'string') {
    return error;
  }

  return fallback;
}
