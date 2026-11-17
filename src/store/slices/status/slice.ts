import { baseApi } from 'apiServices/baseApi';
import type { StatusResponseType } from 'store/slices/status/types';
import { LookupValuesResponse } from 'store/slices/lookup/types';

const apiWithTag = baseApi.enhanceEndpoints({ addTagTypes: ['appStatus', 'appRegistrationCountries'] });

export const statusApi = apiWithTag.injectEndpoints({
  overrideExisting: false,
  endpoints: (build) => ({
    getStatus: build.query<StatusResponseType, void>({
      query: () => ({
        url: '/v1/api/status',
        method: 'GET'
      }),
      providesTags: ['appStatus']
    }),
    getRegistrationCountries: build.query<LookupValuesResponse, void>({
      query: () => ({
        url: '/v1/api/status/registration-countries',
        method: 'GET'
      }),
      providesTags: ['appRegistrationCountries']
    })
  })
});

export const { useGetStatusQuery, useGetRegistrationCountriesQuery } = statusApi;
