import { baseApi } from 'apiServices/baseApi';
import { MeDataType } from './types';

const apiWithTag = baseApi.enhanceEndpoints({
  addTagTypes: [
    'me',
    'productResources',
    'productFullResources',
    'productActiveResourcesHierarchy',
    'productsTree',
    'productValues',
    'terms'
  ]
});

export const meApi = apiWithTag.injectEndpoints({
  overrideExisting: false,
  endpoints: (build) => ({
    getMeData: build.query<MeDataType, void>({
      query: () => ({
        url: '/v1/api/me',
        method: 'GET'
      }),
      providesTags: ['me']
    }),
    changeLang: build.mutation<string, string>({
      query: (code) => ({
        url: '/v1/api/me/language',
        method: 'PATCH',
        data: { languageCode: code }
      }),
      invalidatesTags: [
        'me',
        'productResources',
        'productFullResources',
        'productActiveResourcesHierarchy',
        'productsTree',
        'productValues'
      ]
    })
  })
});

export const { useGetMeDataQuery, useChangeLangMutation } = meApi;
