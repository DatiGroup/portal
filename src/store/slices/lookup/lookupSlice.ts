import { baseApi } from 'apiServices/baseApi';
import { LookupAddPayload, LookupResponse, LookupValueAddPayload, LookupValuesResponse } from 'store/slices/lookup/types';
import { CrudReponseType } from 'store/type/CrudReponseType';

const apiWithTag = baseApi.enhanceEndpoints({
  addTagTypes: ['lookupData', 'exactLookupData', 'lookupValues', 'productResources', 'productFullResources']
});

export const lookupApi = apiWithTag.injectEndpoints({
  overrideExisting: false,
  endpoints: (build) => ({
    getLookups: build.query<LookupResponse[], void>({
      query: () => ({
        url: '/v1/api/lookups/codes',
        method: 'GET'
      }),
      providesTags: ['lookupData']
    }),
    getLookup: build.query<LookupResponse, string>({
      query: (lookupType: string) => ({
        url: `/v1/api/lookups/${lookupType}`,
        method: 'GET'
      }),
      providesTags: ['exactLookupData']
    }),
    addLookup: build.mutation<CrudReponseType, LookupAddPayload>({
      query: ({ lookupData }) => ({
        url: `/v1/api/lookups/codes`,
        method: 'POST',
        data: lookupData
      }),
      invalidatesTags: ['lookupData', 'productResources', 'productFullResources']
    }),
    getLookupValues: build.query<LookupValuesResponse, string>({
      query: (LookupType: string) => ({
        url: `/v1/api/lookups/${LookupType}`,
        method: 'GET'
      }),
      providesTags: ['lookupValues']
    }),
    addLookupValue: build.mutation<CrudReponseType, LookupValueAddPayload>({
      query: ({ lookupType, lookupValueData }) => ({
        url: `/v1/api/lookups/${lookupType}`,
        method: 'POST',
        data: lookupValueData
      }),
      invalidatesTags: ['lookupValues']
    })
  })
});

export const {
  useGetLookupsQuery,
  useGetLookupQuery,
  useAddLookupMutation,
  useGetLookupValuesQuery,
  useAddLookupValueMutation
  // useLazyGetLookupValuesQuery
} = lookupApi;
