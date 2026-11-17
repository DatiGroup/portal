import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import type { AxiosRequestConfig } from 'axios';

import { FastifyErrorType } from './serviceTypes';
import axiosInstance from './axiosInstances/request';
import config from 'config';

export const axiosBaseQuery =
  (): BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig['method'];
      data?: AxiosRequestConfig['data'];
      params?: AxiosRequestConfig['params'];
      headers?: AxiosRequestConfig['headers'];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params, headers }) => {
    try {
      const result = await axiosInstance({
        url: config.baseURL + url,
        method,
        data,
        params,
        headers
      });
      return { data: result.data };
    } catch (axiosError) {
      //NOTE: this is called after  AxiosInterceptors reject

      return { error: axiosError };
    }
  };

export function isFastifyError(err: unknown): err is FastifyErrorType {
  if (!err || typeof err !== 'object') return false;
  const e = err as Record<string, unknown>;
  return typeof e.message === 'string' && (typeof e.statusCode === 'number' || e.name === 'string' || 'validation' in e);
}
